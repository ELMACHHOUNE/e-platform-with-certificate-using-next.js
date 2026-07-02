import fitz  # PyMuPDF

def get_text_formatting(page, search_text):
    """
    Extracts the font name, size, and color of the text from the page.
    """
    text_dict = page.get_text("dict")
    for block in text_dict.get("blocks", []):
        if block.get("type") == 0:  # Text block
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    if search_text in span.get("text", ""):
                        return {
                            "fontsize": span.get("size"),
                            "fontname": span.get("font"),
                            "color": span.get("color")
                        }
    return None

def int_to_rgb(color_int):
    """Converts PyMuPDF's integer color to an (R, G, B) tuple normalized to 0-1."""
    if not isinstance(color_int, int):
        return (0, 0, 0)
    b = (color_int & 255) / 255.0
    g = ((color_int >> 8) & 255) / 255.0
    r = ((color_int >> 16) & 255) / 255.0
    return (r, g, b)

def replace_text_in_pdf(input_pdf, output_pdf, text_to_replace, new_text, custom_font_file=None):
    """
    Finds and replaces text in a PDF by redacting the old text and inserting new text.
    """
    print(f"Opening '{input_pdf}'...")
    try:
        doc = fitz.open(input_pdf)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        return

    replacement_count = 0

    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # 1. Search for the formatting (font family, size, color) of the target text
        fmt = get_text_formatting(page, text_to_replace)
        print(f"Detected formatting for page {page_num + 1}: {fmt}")
        
        fontsize = fmt["fontsize"] if fmt else 11
        color_rgb = int_to_rgb(fmt["color"]) if fmt else (0, 0, 0)
        
        # PyMuPDF uses built-in base-14 fonts. We try to map the detected font to the closest match.
        font_str = str(fmt["font"]).lower() if (fmt and fmt.get("font")) else ""
        fontname = "helv"  # Default Helvetica/Arial
        
        if custom_font_file:
            fontname = "customfont"
        else:
            if "times" in font_str or "serif" in font_str:
                fontname = "ti-ro" # Times Roman
            elif "courier" in font_str or "mono" in font_str:
                fontname = "cour"  # Courier
        
        # Search for the exact string bounding boxes
        text_instances = page.search_for(text_to_replace)
        
        for inst in text_instances:
            # Add a redaction annotation over the old text 
            page.add_redact_annot(inst, fill=(1, 1, 1))
            page.apply_redactions()
            
            # Use insert_text instead of insert_textbox to avoid bounding box clipping entirely.
            # calculate the bottom-left baseline for the text
            baseline = fitz.Point(inst.x0, inst.y1 - (fontsize * 0.15))
            
            # Insert the new text using the detected font size, mapped font, and exact color
            page.insert_text(
                baseline, 
                new_text, 
                fontname=fontname, 
                fontfile=custom_font_file, # Explicitly pass the custom font file here
                fontsize=fontsize, 
                color=color_rgb,
                overlay=True
            )
            replacement_count += 1

    # Save the new document
    doc.save(output_pdf)
    print(f"Done! Replaced {replacement_count} instance(s) of '{text_to_replace}'.")
    print(f"Saved modified file as '{output_pdf}'.")

if __name__ == "__main__":
    # --- CONFIGURATION ---
    INPUT_FILE = "MSc_3.pdf"
    OUTPUT_FILE = "MSc_modified.pdf"
    
    # Change these variables to the text you want to replace
    OLD_TEXT = "4294982834"
    NEW_TEXT = "4295162819"
    
    # Best Practice: Explicitly point to the Windows Times New Roman font file.
    # If the original text was bold or italic, you can change this to 
    # "C:/Windows/Fonts/timesbd.ttf" (Bold) or "C:/Windows/Fonts/timesi.ttf" (Italic).
    FONT_FILE = "C:/Windows/Fonts/times.ttf"
    # ---------------------
    
    replace_text_in_pdf(INPUT_FILE, OUTPUT_FILE, OLD_TEXT, NEW_TEXT, custom_font_file=FONT_FILE)
