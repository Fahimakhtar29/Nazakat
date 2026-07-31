import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const InteractiveAudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startAmbientMusic = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Royal Tanpura/Drone harmonic frequencies in D (146.83 Hz, 220 Hz A, 293.66 Hz D4, 440 Hz A4)
      const freqs = [146.83, 220.0, 293.66, 440.0, 587.33];
      oscillatorsRef.current = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        oscGain.gain.setValueAtTime(0.02 + Math.random() * 0.03, ctx.currentTime);
        
        // LFO for subtle royal sitar shimmer
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + Math.random() * 0.3, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.01, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      setIsPlaying(true);
    } catch {
      console.warn('AudioContext failed to start');
    }
  };

  const stopAmbientMusic = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAmbientMusic();
    } else {
      startAmbientMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientMusic();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs font-serif font-bold uppercase tracking-widest shadow-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer ${
        isPlaying
          ? 'bg-[#141414]/90 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] ring-1 ring-[#D4AF37]/50'
          : 'bg-[#0B0B0B]/80 border-stone-800 text-stone-400 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]'
      }`}
      title={isPlaying ? 'Mute Royal Ambient Sitar' : 'Play Royal Palace Ambient Sound'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span className="hidden sm:inline">Royal Music On</span>
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 h-3 bg-[#D4AF37] animate-bounce" style={{ animationDuration: '0.6s' }} />
            <div className="w-0.5 h-2 bg-[#D4AF37] animate-bounce" style={{ animationDuration: '0.8s' }} />
            <div className="w-0.5 h-3.5 bg-[#D4AF37] animate-bounce" style={{ animationDuration: '0.5s' }} />
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="hidden sm:inline">Ambient Music</span>
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        </>
      )}
    </button>
  );
};
