import os
import fitz  # PyMuPDF
from PIL import Image

def create_pdf(image_folder, output_pdf):
    # Get all jpeg files
    images = [f for f in os.listdir(image_folder) if f.lower().endswith(('.jpeg', '.jpg'))]
    # Sort them by name/time (WhatsApp names follow a sequence)
    images.sort()
    
    doc = fitz.open()
    
    for img_name in images:
        img_path = os.path.join(image_folder, img_name)
        try:
            # Open image to get size
            img = Image.open(img_path)
            width, height = img.size
            
            # Create a PDF page with image dimensions
            pdf_bytes = img.convert("RGB").tobytes() # Need to handle differently for fitz
            
            # Efficient way with fitz:
            img_doc = fitz.open(img_path)
            pdf_bytes = img_doc.convert_to_pdf()
            img_doc.close()
            
            temp_pdf = fitz.open("pdf", pdf_bytes)
            doc.insert_pdf(temp_pdf)
            temp_pdf.close()
            print(f"Added {img_name}")
            
        except Exception as e:
            print(f"Error adding {img_name}: {e}")

    doc.save(output_pdf)
    doc.close()
    print(f"\nSuccess! PDF created at: {output_pdf}")

if __name__ == "__main__":
    folder = r"c:\Users\donald\Documents\proba\old_exam"
    output = r"c:\Users\donald\Documents\proba\Epreuves_Groupées.pdf"
    create_pdf(folder, output)
