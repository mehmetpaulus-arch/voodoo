#!/usr/bin/env python3
"""
Test script to verify all Whisper model sizes work correctly
"""

import whisper
import sys
import time
import os

def test_model(model_size):
    """Test a specific Whisper model"""
    print(f"\n=== Testing {model_size.upper()} model ===")
    
    try:
        start_time = time.time()
        print(f"Loading {model_size} model...")
        model = whisper.load_model(model_size)
        load_time = time.time() - start_time
        
        print(f"✅ {model_size.upper()} model loaded successfully in {load_time:.2f}s")
        
        # Get model info
        print(f"Model type: {type(model)}")
        print(f"Model device: {next(model.parameters()).device if hasattr(model, 'parameters') else 'N/A'}")
        
        return True
        
    except Exception as e:
        print(f"❌ {model_size.upper()} model failed: {str(e)}")
        return False

def main():
    print("🔍 Testing Whisper AI Model Availability")
    print("=" * 50)
    
    # Test all available model sizes
    model_sizes = ["tiny", "base", "small", "medium", "large"]
    results = {}
    
    for model_size in model_sizes:
        results[model_size] = test_model(model_size)
    
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    
    for model_size, success in results.items():
        status = "✅ WORKING" if success else "❌ FAILED"
        print(f"{model_size.upper():<8}: {status}")
    
    working_models = sum(results.values())
    total_models = len(model_sizes)
    
    print(f"\nWorking models: {working_models}/{total_models}")
    
    if working_models == total_models:
        print("🎉 All models are working correctly!")
        return 0
    else:
        print("⚠️  Some models are not working. Check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
