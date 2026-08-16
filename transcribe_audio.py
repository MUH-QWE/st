import os
import sys
import glob

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

import speech_recognition as sr
from pydub import AudioSegment

audio_dir = r"C:\st-main\extracted_audio"
wav_files = sorted(glob.glob(os.path.join(audio_dir, "*.wav")))
output_file = os.path.join(audio_dir, "transcription_results.txt")

r = sr.Recognizer()

with open(output_file, "w", encoding="utf-8") as out:
    for idx, wav_path in enumerate(wav_files):
        filename = os.path.basename(wav_path)
        print(f"\nProcessing {idx+1}/{len(wav_files)}: {filename}", flush=True)
        out.write(f"==============================\nFILE: {filename}\n==============================\n")
        out.flush()

        sound = AudioSegment.from_wav(wav_path)
        duration_ms = len(sound)
        chunk_len_ms = 15000 # 15 seconds
        
        full_text = []

        for start_ms in range(0, duration_ms, chunk_len_ms):
            end_ms = min(start_ms + chunk_len_ms, duration_ms)
            chunk = sound[start_ms:end_ms]
            chunk_path = os.path.join(audio_dir, f"temp_chunk_{idx}_{start_ms}.wav")
            chunk.export(chunk_path, format="wav")

            with sr.AudioFile(chunk_path) as source:
                audio_data = r.record(source)
                text = ""
                try:
                    text = r.recognize_google(audio_data, language="ar-EG")
                except sr.UnknownValueError:
                    try:
                        text = r.recognize_google(audio_data, language="ar-SA")
                    except Exception:
                        text = ""
                except Exception as e:
                    print(f"Error on chunk: {e}", flush=True)
                
                if text:
                    print(f"  [{start_ms//1000}s - {end_ms//1000}s]: {text}", flush=True)
                    full_text.append(text)
            
            if os.path.exists(chunk_path):
                os.remove(chunk_path)

        combined_text = " ".join(full_text)
        print(f"-> Full Transcript: {combined_text}", flush=True)
        out.write(combined_text + "\n\n")
        out.flush()

print("\nALL AUDIO FILES TRANSCRIBED SUCCESSFULLY!", flush=True)
