import fitz
import json
import sys


def get_match_rects(page, text, text_dict):
    rects = page.search_for(text)
    if rects:
        return rects

    fallback_rects = []
    for block in text_dict.get("blocks", []):
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                if span.get("text") == text:
                    bbox = span.get("bbox")
                    fallback_rects.append(fitz.Rect(bbox))

    return fallback_rects

def replace_texts(input_pdf, output_pdf, texts_file):
    doc = fitz.open(input_pdf)

    with open(texts_file, "r", encoding="utf-8") as f:
        texts = json.load(f)

    changes = 0
    value_vertical_shift = 16

    for page in doc:
        text_dict = page.get_text("dict")

        for t in texts:
            old_text = t["old"]
            for rect in get_match_rects(page, old_text, text_dict):
                page.add_redact_annot(rect, fill=None)
                changes += 1

        page.apply_redactions()

        for t in texts:
            old_text = t["old"]
            new_text = t["new"]
            if new_text == old_text:
                continue

            matching_span = None
            for block in text_dict.get("blocks", []):
                if block.get("type") != 0:
                    continue
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        if span.get("text") == old_text:
                            matching_span = span
                            break
                    if matching_span:
                        break
                if matching_span:
                    break

            fontsize = matching_span.get("size", 11) if matching_span else 11
            color = matching_span.get("color", 0) if matching_span else 0
            r = ((color >> 16) & 255) / 255.0
            g = ((color >> 8) & 255) / 255.0
            bv = (color & 255) / 255.0

            font_str = str(matching_span.get("font", "") if matching_span else "").lower()
            fontname = "helv"
            if "times" in font_str:
                fontname = "ti-ro"
            elif "courier" in font_str:
                fontname = "cour"

            for rect in get_match_rects(page, old_text, text_dict):
                if old_text == "studentFullName":
                    fitted_fontsize = fontsize
                    text_width = fitz.get_text_length(
                        new_text,
                        fontname=fontname,
                        fontsize=fitted_fontsize,
                    )

                    centered_x = rect.x0 + (rect.width - text_width) / 2
                    baseline = fitz.Point(
                        centered_x,
                        rect.y1 - (fitted_fontsize * 0.15) - value_vertical_shift,
                    )

                    page.insert_text(
                        baseline,
                        new_text,
                        fontname=fontname,
                        fontsize=fitted_fontsize,
                        color=(r, g, bv),
                        overlay=True,
                    )
                else:
                    baseline = fitz.Point(
                        rect.x0,
                        rect.y1 - (fontsize * 0.15) - value_vertical_shift,
                    )

                    page.insert_text(
                        baseline,
                        new_text,
                        fontname=fontname,
                        fontsize=fontsize,
                        color=(r, g, bv),
                        overlay=True,
                    )

    doc.save(output_pdf, deflate=True)
    doc.close()
    print(f"Done. Processed {changes} instances. Output: {output_pdf}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python update_certificate.py <input_pdf> <output_pdf> <texts_file>")
        sys.exit(1)

    replace_texts(sys.argv[1], sys.argv[2], sys.argv[3])
