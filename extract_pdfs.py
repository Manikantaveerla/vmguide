import os
import fitz  # PyMuPDF
import sys

def extract_text_from_pdfs(pdf_dir, output_file):
    if not os.path.exists(pdf_dir):
        print(f"Error: Directory {pdf_dir} does not exist.")
        sys.exit(1)

    all_text = ""
    pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print(f"No PDF files found in {pdf_dir}")
        sys.exit(0)

    print(f"Found {len(pdf_files)} PDF files. Starting extraction...")

    for filename in sorted(pdf_files):
        filepath = os.path.join(pdf_dir, filename)
        try:
            doc = fitz.open(filepath)
            text = f"\n\n{'='*80}\n--- START OF FILE: {filename} ---\n{'='*80}\n\n"
            for page_num, page in enumerate(doc):
                text += f"\n--- Page {page_num + 1} ---\n"
                text += page.get_text()
            
            text += f"\n\n--- END OF FILE: {filename} ---\n\n"
            all_text += text
            print(f"Successfully extracted text from: {filename}")
        except Exception as e:
            print(f"Error reading {filename}: {e}")

    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(all_text)
        print(f"\nSuccessfully wrote all extracted text to {output_file}")
    except Exception as e:
        print(f"Error writing to output file: {e}")

if __name__ == "__main__":
    pdf_directory = r"c:\Users\manik\Desktop\v m\Aptimaster\pdfs"
    output_filename = "raw_extracted_text.txt"
    extract_text_from_pdfs(pdf_directory, output_filename)
