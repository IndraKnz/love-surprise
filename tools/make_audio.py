"""
make_audio.py — membuat lagu piano romantis orisinal (bebas royalti) untuk website.

Hasil: assets/music/our-song.wav
- 40 detik, loop mulus, mono 22050 Hz 16-bit (~1.7 MB)
- Disintesis sepenuhnya dari kode (tidak mengambil karya orang lain)

Jalankan:  python tools/make_audio.py
"""

import math
import os
import struct
import wave

SR = 22050
BPM = 72.0
BEAT = 60.0 / BPM
BAR = BEAT * 4          # 3.33 s per bar
PROGRESSION = [
    # (bass, [chord tones])  -> Am, F, C, G  (2 bar masing-masing)
    (110.00, [220.00, 261.63, 329.63]),   # A2  Am
    (87.31,  [174.61, 220.00, 261.63]),   # F2  F
    (130.81, [196.00, 261.63, 329.63]),   # C3  C
    (98.00,  [196.00, 246.94, 293.66]),   # G2  G
]

BARS = 12                      # 12 bar = 48 s
TOTAL = BAR * BARS
N = int(TOTAL * SR)
buf = [0.0] * N


def midi(n):
    return 440.0 * (2.0 ** ((n - 69) / 12.0))


def add_note(t0, dur, freq, amp, kind="piano"):
    """Tambahkan satu nada dengan envelope + harmonik (piano lembut / pad)."""
    i0 = int(round(t0 * SR))
    n = int(dur * SR)
    if i0 >= N:
        return
    n = min(n, N - i0)
    # freq dalam Hz; t dalam detik -> pakai radian per detik, bukan per sampel
    w = 2.0 * math.pi * freq
    if kind == "piano":
        # harmonik piano lembut, makin tinggi makin pelan
        harm = ((1, 1.0), (2, 0.42), (3, 0.20), (4, 0.10), (5, 0.05), (6, 0.025))
        attack = 0.008 * SR
        decay = max(0.12, dur * 0.45)
        for k in range(n):
            t = k / SR
            if k < attack:
                env = k / attack
            else:
                env = math.exp(-(t - 0.008) / decay)
                # berhenti hanya setelah attack; env = 0 di k = 0 bukan akhir nada
                if env < 0.0008:
                    break
            s = 0.0
            for mult, ga in harm:
                # sedikit detune pada harmonik atas -> kesan piano akustik
                s += ga * math.sin(w * mult * t * (1.0 + 0.0004 * mult))
            buf[i0 + k] += s * amp * env
    else:  # pad / strings
        attack = 0.9 * SR
        release = 0.9 * SR
        for k in range(n):
            if k < attack:
                env = (k / attack) ** 1.6
            elif k > n - release:
                env = max(0.0, (n - k) / release) ** 1.4
            else:
                env = 1.0
            t = k / SR
            s = (math.sin(w * t) + 0.30 * math.sin(2 * w * t)
                 + 0.12 * math.sin(3 * w * t))
            # vibrato halus
            s *= 1.0 + 0.05 * math.sin(2 * math.pi * 4.6 * t)
            buf[i0 + k] += s * amp * env


def build():
    for bar in range(BARS):
        chord = PROGRESSION[bar % 4]
        bass, tones = chord
        t_bar = bar * BAR

        # bass tiap 2 beat
        add_note(t_bar, BEAT * 1.9, bass, 0.16, "piano")
        add_note(t_bar + BEAT * 2, BEAT * 1.9, bass * 1.0, 0.12, "piano")

        # pad hangat sepanjang bar
        for f in tones:
            add_note(t_bar, BAR * 0.98, f * 0.5, 0.055, "pad")

        # arpeggio 8 not per bar (pola naik-turun yang lembut)
        pattern = [0, 1, 2, 3, 2, 1, 0, 2]
        seq = [tones[0], tones[1], tones[2], tones[0] * 2]
        for i, p in enumerate(pattern):
            if bar < 2 and i % 2 == 1:
                continue                       # intro lebih lapang
            vel = 0.10 if i % 4 == 0 else 0.072
            add_note(t_bar + i * BEAT / 2, BEAT * 1.6, seq[p], vel, "piano")

        # melodi sederhana di bar 5..12 (nada panjang, penuh perasaan)
        if bar >= 4:
            mel = [tones[2] * 2, tones[1] * 2, tones[0] * 2, tones[2] * 2]
            add_note(t_bar + BEAT * 0.0, BEAT * 2.2, mel[bar % 4], 0.085, "piano")
            add_note(t_bar + BEAT * 2.5, BEAT * 1.4, mel[(bar + 2) % 4] * 1.0,
                     0.062, "piano")


def reverb_and_master():
    # delay sederhana (reverb murah) + normalisasi lembut
    # baca dari salinan kering supaya tidak jadi feedback yang menumpuk
    dry = list(buf)
    d1, d2 = int(0.115 * SR), int(0.237 * SR)
    for i in range(N):
        v = dry[i]
        if i >= d1:
            v += 0.26 * dry[i - d1]
        if i >= d2:
            v += 0.16 * dry[i - d2]
        buf[i] = v

    peak = max(abs(x) for x in buf) or 1.0
    gain = 0.72 / peak
    fade = int(0.02 * SR)
    out = []
    for i, v in enumerate(buf):
        v *= gain
        # hindari klik saat loop
        if i < fade:
            v *= i / fade
        elif i > N - fade:
            v *= (N - i) / fade
        # saturasi lembut
        v = math.tanh(v * 1.08)
        out.append(v)
    return out


def write_wav(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with wave.open(path, "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SR)
        frames = bytearray()
        for v in data:
            frames += struct.pack("<h", int(max(-1.0, min(1.0, v)) * 32767))
        f.writeframes(bytes(frames))


if __name__ == "__main__":
    print("Menyintesis lagu...")
    build()
    master = reverb_and_master()
    out_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                            "assets", "music", "our-song.wav")
    write_wav(out_path, master)
    print("Selesai:", out_path, "%.1f detik" % TOTAL)
