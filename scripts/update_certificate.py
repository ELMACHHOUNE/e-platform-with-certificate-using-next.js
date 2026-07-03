import fitz
import json
import sys

def get_label_formatting(text_dict, label_text):
    for block in text_dict.get("blocks", []):
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                if span.get("text") == label_text:
                    bbox = span.get("bbox")
                    return {
                        "x": bbox[0],
                        "y": bbox[3],
                        "size": span.get("size", 55),
                        "color": span.get("color", 0),
                        "font": str(span.get("font", "")).lower(),
                    }
    return None

def redact_texts(input_pdf, output_pdf, texts_file):
    doc = fitz.open(input_pdf)

    with open(texts_file, "r", encoding="utf-8") as f:
        texts = json.load(f)

    removed = 0

    for page in doc:
        text_dict = page.get_text("dict")

        label_instructor = get_label_formatting(text_dict, "Instructor Signature")
        label_training = get_label_formatting(text_dict, "Training Academy")

        for t in texts:
            old_text = t["old"]
            for block in text_dict.get("blocks", []):
                if block.get("type") != 0:
                    continue
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        if span.get("text") == old_text:
                            bbox = span.get("bbox")
                            page.add_redact_annot((bbox[0], bbox[1], bbox[2], bbox[3]), fill=None)
                            removed += 1

        page.apply_redactions()

        for t in texts:
            old_text = t["old"]
            new_text = t["new"]
            if new_text == old_text:
                continue

            for block in text_dict.get("blocks", []):
                if block.get("type") != 0:
                    continue
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        if span.get("text") == old_text:
                            bbox = span.get("bbox")
                            fontsize = span.get("size", 11)
                            color = span.get("color", 0)
                            r = ((color >> 16) & 255) / 255.0
                            g = ((color >> 8) & 255) / 255.0
                            bv = (color & 255) / 255.0

                            baseline = fitz.Point(bbox[0], bbox[3] - (fontsize * 0.15))
                            font_str = str(span.get("font", "")).lower()
                            fontname = "helv"
                            if "times" in font_str:
                                fontname = "ti-ro"
                            elif "courier" in font_str:
                                fontname = "cour"

                            page.insert_text(
                                baseline,
                                new_text,
                                fontname=fontname,
                                fontsize=fontsize,
                                color=(r, g, bv),
                                overlay=True,
                            )

        # Re-draw labels that were in the same block
        for label_info, label_text in [
            (label_instructor, "Instructor Signature"),
            (label_training, "Training Academy"),
        ]:
            if label_info:
                c = label_info["color"]
                r = ((c >> 16) & 255) / 255.0
                g = ((c >> 8) & 255) / 255.0
                bv = (c & 255) / 255.0
                baseline = fitz.Point(label_info["x"], label_info["y"] - (label_info["size"] * 0.15))
                page.insert_text(
                    baseline,
                    label_text,
                    fontname="helv",
                    fontsize=label_info["size"],
                    color=(r, g, bv),
                    overlay=True,
                )

    doc.save(output_pdf, deflate=True)
    doc.close()
    print(f"Done. Processed {removed} instances. Output: {output_pdf}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python update_certificate.py <input_pdf> <output_pdf> <texts_file>")
        sys.exit(1)

    redact_texts(sys.argv[1], sys.argv[2], sys.argv[3])
