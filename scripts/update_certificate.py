import fitz
import json
import sys

def redact_texts(input_pdf, output_pdf, texts_file):
    doc = fitz.open(input_pdf)

    with open(texts_file, "r", encoding="utf-8") as f:
        texts = json.load(f)

    removed = 0

    for page in doc:
        for t in texts:
            old_text = t["old"]
            instances = page.search_for(old_text)
            for inst in instances:
                page.add_redact_annot(inst, fill=None)
                removed += 1

        page.apply_redactions()

    doc.save(output_pdf, deflate=True)
    doc.close()
    print(f"Done. Redacted {removed} text instances. Output: {output_pdf}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python update_certificate.py <input_pdf> <output_pdf> <texts_file>")
        sys.exit(1)

    redact_texts(sys.argv[1], sys.argv[2], sys.argv[3])
