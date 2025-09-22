import base64
import mimetypes
import os
import json
import sys
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

def generate_image_with_gemini(prompt, input_image_path=None, output_dir="uploads"):
    """
    Generate or edit images using Gemini 2.5 Flash Image Preview
    Returns a list of base64 encoded images
    """
    try:
        # Initialize Gemini client
        client = genai.Client(
            api_key=os.environ.get("GEMINI_API_KEY"),
        )

        model = "gemini-2.5-flash-image-preview"
        
        # Prepare content parts
        parts = [types.Part.from_text(text=prompt)]
        
        # If input image is provided, add it to the content
        if input_image_path and os.path.exists(input_image_path):
            with open(input_image_path, "rb") as image_file:
                image_data = image_file.read()
                image_base64 = base64.b64encode(image_data).decode('utf-8')
                
                # Determine MIME type
                mime_type = mimetypes.guess_type(input_image_path)[0] or 'image/png'
                
                # Add image part
                parts.append(types.Part.from_inline_data(
                    mime_type=mime_type,
                    data=image_data
                ))
        
        contents = [
            types.Content(
                role="user",
                parts=parts,
            ),
        ]
        generate_content_config = types.GenerateContentConfig(
            response_modalities=[
                "IMAGE",
                "TEXT",
            ],
        )

        images = []
        file_index = 0
        
        # Ensure output directory exists
        os.makedirs(output_dir, exist_ok=True)
        
        for chunk in client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
        ):
            if (
                chunk.candidates is None
                or chunk.candidates[0].content is None
                or chunk.candidates[0].content.parts is None
            ):
                continue
                
            if chunk.candidates[0].content.parts[0].inline_data and chunk.candidates[0].content.parts[0].inline_data.data:
                # Save file to disk
                file_name = f"gemini_image_{file_index}"
                file_index += 1
                inline_data = chunk.candidates[0].content.parts[0].inline_data
                data_buffer = inline_data.data
                file_extension = mimetypes.guess_extension(inline_data.mime_type) or '.png'
                
                # Save to file
                file_path = os.path.join(output_dir, f"{file_name}{file_extension}")
                with open(file_path, "wb") as f:
                    f.write(data_buffer)
                
                # Convert to base64 for web display
                base64_data = base64.b64encode(data_buffer).decode('utf-8')
                mime_type = inline_data.mime_type or 'image/png'
                data_url = f"data:{mime_type};base64,{base64_data}"
                images.append(data_url)
                
                print(f"Generated image saved to: {file_path}")
            else:
                # Print any text responses
                if hasattr(chunk, 'text') and chunk.text:
                    print(f"Text response: {chunk.text}")

        result = {
            "success": True,
            "images": images,
            "count": len(images),
            "model": model
        }
        
        # Print JSON result for API parsing
        print(json.dumps(result))
        return result

    except Exception as e:
        result = {
            "success": False,
            "error": str(e),
            "images": [],
            "count": 0
        }
        
        # Print JSON result for API parsing
        print(json.dumps(result))
        return result

if __name__ == "__main__":
    # Test function
    if len(sys.argv) > 1:
        prompt = sys.argv[1]
        input_image = sys.argv[2] if len(sys.argv) > 2 else None
        result = generate_image_with_gemini(prompt, input_image)
        print(json.dumps(result, indent=2))
    else:
        print("Usage: python gemini_image_generator.py 'your prompt here' [input_image_path]")
