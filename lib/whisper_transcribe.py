#!/usr/bin/env python3
"""
Whisper AI Transcription Script
This script handles real audio/video transcription using OpenAI's Whisper AI
"""

import sys
import json
import whisper
import os
import argparse
import time
from pathlib import Path

def transcribe_audio(input_file, model_size="base", language=None, word_timestamps=False):
    """
    Transcribe audio/video file using Whisper AI
    
    Args:
        input_file (str): Path to input audio/video file
        model_size (str): Whisper model size (tiny, base, small, medium, large)
        language (str): Language code (e.g., 'de', 'en', 'auto')
        word_timestamps (bool): Whether to include word-level timestamps
    
    Returns:
        dict: Transcription result with text, segments, and metadata
    """
    try:
        # Validate model size
        valid_models = ['tiny', 'base', 'small', 'medium', 'large']
        if model_size not in valid_models:
            raise ValueError(f"Invalid model size: {model_size}. Valid options: {valid_models}")
        
        # Load Whisper model
        print(f"Loading Whisper model: {model_size}")
        start_time = time.time()
        model = whisper.load_model(model_size)
        load_time = time.time() - start_time
        print(f"Model loaded in {load_time:.2f}s")
        
        # Prepare transcription options
        options = {
            "verbose": False,
            "word_timestamps": word_timestamps
        }
        
        # Set language if specified (not 'auto')
        if language and language != 'auto':
            options["language"] = language
        
        print(f"Transcribing: {input_file}")
        print(f"Options: {options}")
        
        # Check if file exists and is readable
        print(f"Checking file: {input_file}")
        print(f"File exists: {os.path.exists(input_file)}")
        print(f"File readable: {os.access(input_file, os.R_OK)}")
        print(f"File size: {os.path.getsize(input_file) if os.path.exists(input_file) else 'N/A'} bytes")
        
        if not os.path.exists(input_file):
            raise FileNotFoundError(f"Input file does not exist: {input_file}")
        
        if not os.access(input_file, os.R_OK):
            raise PermissionError(f"Cannot read input file: {input_file}")
        
        # Perform transcription with better error handling
        transcribe_start = time.time()
        try:
            print(f"Starting transcription with {model_size} model...")
            result = model.transcribe(input_file, **options)
            transcribe_time = time.time() - transcribe_start
            print(f"Transcription completed in {transcribe_time:.2f}s")
        except Exception as e:
            print(f"Whisper transcribe error: {str(e)}", file=sys.stderr)
            # Try with a simpler approach
            try:
                print("Trying with simplified options...")
                simple_options = {"verbose": False}
                if language and language != 'auto':
                    simple_options["language"] = language
                result = model.transcribe(input_file, **simple_options)
                transcribe_time = time.time() - transcribe_start
                print(f"Transcription completed in {transcribe_time:.2f}s (simplified)")
            except Exception as e2:
                print(f"Simplified transcribe also failed: {str(e2)}", file=sys.stderr)
                raise e2
        
        # Extract text and segments
        text = result["text"].strip()
        segments = result.get("segments", [])
        
        # Calculate duration
        duration = 0
        if segments:
            duration = segments[-1]["end"]
        
        # Calculate performance metrics
        total_time = load_time + transcribe_time
        word_count = len(text.split()) if text else 0
        char_count = len(text) if text else 0
        
        # Prepare result
        transcription_result = {
            "text": text,
            "language": result.get("language", language or "auto"),
            "duration": duration,
            "segments": segments,
            "performance": {
                "model_size": model_size,
                "load_time": load_time,
                "transcribe_time": transcribe_time,
                "total_time": total_time,
                "word_count": word_count,
                "char_count": char_count,
                "words_per_second": word_count / max(transcribe_time, 0.1)
            }
        }
        
        print(f"Transcription completed. Duration: {duration:.2f}s, Language: {transcription_result['language']}")
        print(f"Performance: {word_count} words in {transcribe_time:.2f}s ({transcription_result['performance']['words_per_second']:.1f} words/sec)")
        return transcription_result
        
    except Exception as e:
        print(f"Error during transcription: {str(e)}", file=sys.stderr)
        return {
            "error": str(e),
            "text": "",
            "language": language or "auto",
            "duration": 0,
            "segments": []
        }

def main():
    parser = argparse.ArgumentParser(description="Whisper AI Transcription")
    parser.add_argument("input_file", help="Input audio/video file path")
    parser.add_argument("--model", default="base", choices=["tiny", "base", "small", "medium", "large"], help="Whisper model size")
    parser.add_argument("--language", default=None, help="Language code (e.g., 'de', 'en') or 'auto'")
    parser.add_argument("--word-timestamps", action="store_true", help="Include word-level timestamps")
    parser.add_argument("--output", help="Output JSON file path")
    
    args = parser.parse_args()
    
    # Convert to absolute path
    input_file = os.path.abspath(args.input_file)
    
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)
    
    # Perform transcription
    result = transcribe_audio(
        input_file,
        model_size=args.model,
        language=args.language if args.language and args.language != "auto" else None,
        word_timestamps=args.word_timestamps
    )
    
    # Output result
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"Result saved to: {args.output}")
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
