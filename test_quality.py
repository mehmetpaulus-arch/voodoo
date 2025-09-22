#!/usr/bin/env python3
"""
Quality test script for Whisper models
Tests actual transcription quality with different model sizes
"""

import whisper
import sys
import time
import os
import json
from pathlib import Path

def test_transcription_quality(model_size, test_file):
    """Test transcription quality with a specific model"""
    print(f"\n=== Testing {model_size.upper()} model quality ===")
    
    if not os.path.exists(test_file):
        print(f"❌ Test file not found: {test_file}")
        return None
    
    try:
        # Load model
        start_time = time.time()
        print(f"Loading {model_size} model...")
        model = whisper.load_model(model_size)
        load_time = time.time() - start_time
        
        # Transcribe
        transcribe_start = time.time()
        print(f"Transcribing with {model_size} model...")
        result = model.transcribe(test_file, verbose=False)
        transcribe_time = time.time() - transcribe_start
        
        # Analyze results
        text = result["text"].strip()
        segments = result.get("segments", [])
        language = result.get("language", "unknown")
        duration = segments[-1]["end"] if segments else 0
        
        # Quality metrics
        word_count = len(text.split())
        char_count = len(text)
        segment_count = len(segments)
        
        quality_result = {
            "model": model_size,
            "load_time": load_time,
            "transcribe_time": transcribe_time,
            "total_time": load_time + transcribe_time,
            "language": language,
            "duration": duration,
            "text": text,
            "word_count": word_count,
            "char_count": char_count,
            "segment_count": segment_count,
            "segments": segments[:3] if segments else []  # First 3 segments for preview
        }
        
        print(f"✅ {model_size.upper()} completed in {quality_result['total_time']:.2f}s")
        print(f"   Language: {language}")
        print(f"   Duration: {duration:.2f}s")
        print(f"   Words: {word_count}")
        print(f"   Segments: {segment_count}")
        print(f"   Preview: {text[:100]}...")
        
        return quality_result
        
    except Exception as e:
        print(f"❌ {model_size.upper()} failed: {str(e)}")
        return None

def main():
    print("🎯 Whisper Model Quality Test")
    print("=" * 50)
    
    # Look for test audio files
    test_files = []
    uploads_dir = Path("uploads")
    
    if uploads_dir.exists():
        for file_path in uploads_dir.glob("*.mp4"):
            test_files.append(str(file_path))
        for file_path in uploads_dir.glob("*.mp3"):
            test_files.append(str(file_path))
    
    if not test_files:
        print("❌ No test audio files found in uploads/ directory")
        print("Please upload some audio/video files first to test quality")
        return 1
    
    # Use the first available test file
    test_file = test_files[0]
    print(f"Using test file: {test_file}")
    
    # Test all model sizes
    model_sizes = ["tiny", "base", "small", "medium", "large"]
    results = []
    
    for model_size in model_sizes:
        result = test_transcription_quality(model_size, test_file)
        if result:
            results.append(result)
    
    if not results:
        print("❌ No models produced results")
        return 1
    
    # Compare results
    print("\n" + "=" * 50)
    print("📊 QUALITY COMPARISON")
    print("=" * 50)
    
    # Sort by total time
    results.sort(key=lambda x: x['total_time'])
    
    print(f"{'Model':<8} {'Time':<8} {'Words':<6} {'Quality':<10}")
    print("-" * 40)
    
    for result in results:
        # Simple quality estimation based on word count and time
        quality_score = result['word_count'] / max(result['total_time'], 1)
        quality_rating = "Excellent" if quality_score > 10 else "Good" if quality_score > 5 else "Fair"
        
        print(f"{result['model']:<8} {result['total_time']:<8.1f}s {result['word_count']:<6} {quality_rating:<10}")
    
    # Save detailed results
    output_file = "quality_test_results.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f"\n📄 Detailed results saved to: {output_file}")
    
    # Recommendations
    print("\n💡 RECOMMENDATIONS:")
    print("-" * 20)
    
    fastest = min(results, key=lambda x: x['total_time'])
    most_words = max(results, key=lambda x: x['word_count'])
    
    print(f"⚡ Fastest: {fastest['model'].upper()} ({fastest['total_time']:.1f}s)")
    print(f"📝 Most detailed: {most_words['model'].upper()} ({most_words['word_count']} words)")
    
    # Model recommendations
    print(f"\n🎯 MODEL RECOMMENDATIONS:")
    print(f"• TINY: Fastest, good for quick previews")
    print(f"• BASE: Balanced speed/quality (recommended default)")
    print(f"• SMALL: Better accuracy, still reasonably fast")
    print(f"• MEDIUM: High accuracy, slower")
    print(f"• LARGE: Best accuracy, slowest")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
