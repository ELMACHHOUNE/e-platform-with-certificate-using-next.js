import fitz
import json
import sys
import os

def int_to_rgb(color_int):
    b = (color_int & 255) / 255.0
    g = ((color_int >> 8) & 255) / 255.0
    r = ((color_int >> 16) & 255) / 255.0
    return (r, g, b)

def get_text_formatting(page, search_text):
    text_dict = page.get_text("dict")
    for block in text_dict.get("blocks", []):
        if block.get("type") == 0:
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    if search_text in span.get("text", ""):
                        return {
                            "fontsize": span.get("size"),
                            "fontname": span.get("font"),
                            "color": span.get("color")
                        }
    return None

def update_pdf(input_pdf, output_pdf, replacements_json):
    doc = fitz.open(input_pdf)
    replacements = json.loads(replacements_json)
    changes = 0

    for page in doc:
        for r in replacements:
            old_text = r["old"]
            new_text = r["new"]

            fmt = get_text_formatting(page, old_text)
            if not fmt:
                print(f"  Skipping '{old_text}': not found on page {page.number + 1}")
                continue

            fontsize = fmt.get("fontsize", 11)
            color_rgb = int_to_rgb(fmt.get("color", 0))

            font_str = str(fmt.get("fontname", "")).lower() if fmt.get("fontname") else ""
            fontname = "helv"
            if "times" in font_str:
                fontname = "ti-ro"
            elif "courier" in font_str:
                fontname = "cour"

            text_instances = page.search_for(old_text)
            for inst in text_instances:
                page.add_redact_annot(inst, fill=None)
                page.apply_redactions()
                baseline = fitz.Point(inst.x0, inst.y1 - (fontsize * 0.15))
                page.insert_text(
                    baseline,
                    new_text,
                    fontname=fontname,
                    fontsize=fontsize,
                    color=color_rgb,
                    overlay=True
                )
                changes += 1

    doc.save(output_pdf, deflate=True)
    doc.close()
    print(f"Done. Replaced {changes} text instances. Output: {output_pdf}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python update_certificate.py <input_pdf> <output_pdf> <replacements_file>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]
    replacements_file = sys.argv[3]

    with open(replacements_file, "r", encoding="utf-8") as f:
        replacements_json = f.read()

    update_pdf(input_pdf, output_pdf, replacements_json)
