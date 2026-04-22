import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, AlertCircle, Phone, Navigation, Siren, CheckCircle2, User, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AppState } from '../../types';

export default function AlertScreens({ 
  currentStep, 
  onCancel, 
  onEscalate,
  onRestart 
}: { 
  currentStep: AppState; 
  onCancel: () => void;
  onEscalate: () => void;
  onRestart: () => void;
}) {
  const [timer, setTimer] = useState(30);
  const [activeActions, setActiveActions] = useState<string[]>([]);

  useEffect(() => {
    let t: any;
    if (currentStep === AppState.PRE_DANGER_VALIDATION) {
      setTimer(30);
      t = setInterval(() => setTimer(v => {
        if (v <= 1) {
          onEscalate();
          return 0;
        }
        return v - 1;
      }), 1000);
    } else if (currentStep === AppState.DANGER_DETECTED) {
      setTimer(5);
      t = setInterval(() => setTimer(v => {
        if (v <= 1) {
          onEscalate();
          return 0;
        }
        return v - 1;
      }), 1000);
    }
    return () => clearInterval(t);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === AppState.EMERGENCY_ACTIVATED) {
      const steps = ['Sending Live Location...', 'Calling Emergency Contact...', 'Alerting Nearby Authorities...'];
      steps.forEach((s, i) => {
        setTimeout(() => {
          setActiveActions(prev => [...prev, s]);
        }, (i + 1) * 1500);
      });
    } else {
      setActiveActions([]);
    }
  }, [currentStep]);

  if (currentStep === AppState.PRE_DANGER_VALIDATION) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fixed inset-0 bg-slate-950/95 flex flex-col p-8 pt-20 text-white z-50 text-center backdrop-blur-xl"
      >
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-[32px] p-8 glow-orange flex-1 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 0.5, repeat: Infinity }}
            className="mb-8 p-6 rounded-full text-orange-500"
          >
            <AlertCircle className="w-16 h-16" />
          </motion.div>
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-4">PRE-DANGER CHECK</h2>
          <p className="text-xl font-bold leading-relaxed mb-4">Unusual "Thud" sound detected. Are you safe?</p>
          <p className="text-xs text-slate-400 mb-12">AI environment scan indicates irregular pattern.</p>
          
          <div className="relative h-48 w-48 flex items-center justify-center mb-12">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="4" />
              <motion.circle 
                cx="96" cy="96" r="88" fill="none" stroke="#f59e0b" strokeWidth="6" 
                strokeDasharray={553} 
                animate={{ strokeDashoffset: 553 - (timer / 30) * 553 }}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-6xl font-black">{timer}</span>
          </div>

          <div className="w-full space-y-3 mt-auto">
            <button onClick={onCancel} className="w-full py-4 bg-safe text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-emerald-600 transition-colors">I'M SAFE</button>
            <button onClick={onEscalate} className="w-full py-4 border border-red-500 text-red-500 rounded-2xl font-bold text-sm tracking-widest uppercase">TRIGGER HELP</button>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-tighter">Auto-Escalation in {timer}s</p>
        </div>
      </motion.div>
    );
  }

  if (currentStep === AppState.DANGER_DETECTED) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fixed inset-0 bg-danger-gradient flex flex-col p-8 pt-20 text-white z-50 text-center backdrop-blur-2xl"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 0.2, repeat: Infinity }}
          className="mx-auto mb-10 bg-white/10 p-8 rounded-full border-4 border-white/50 backdrop-blur-md"
        >
          <Siren className="w-20 h-20 text-white" />
        </motion.div>
        
        <h2 className="text-sm font-black text-white/50 uppercase tracking-[0.3em] mb-4">Immediate Danger</h2>
        <h3 className="text-5xl font-black mb-4 tracking-tighter uppercase leading-none">Risk Level:<br/>CRITICAL</h3>
        <p className="text-lg font-medium opacity-70 mb-12 italic">Human distress signals detected.</p>

        <div className="flex flex-col items-center justify-center mb-20">
           <span className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">Auto-Alert System Trigger in</span>
           <span className="text-9xl font-black tracking-tighter">{timer}</span>
        </div>

        <div className="mt-auto space-y-4">
          <button onClick={onCancel} className="w-full p-6 bg-safe text-white rounded-[32px] font-black text-2xl shadow-2xl border-b-8 border-safe/30 active:translate-y-1 active:border-b-0 transition-all">YES, I'M SAFE</button>
          <button onClick={onEscalate} className="w-full p-6 bg-white text-danger rounded-[32px] font-black text-2xl shadow-2xl border-b-8 border-slate-200 active:translate-y-1 active:border-b-0 transition-all">NO, I NEED HELP</button>
        </div>
      </motion.div>
    );
  }

  if (currentStep === AppState.EMERGENCY_ACTIVATED) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col p-6 pt-16">
        <header className="flex justify-between items-center mb-10">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-danger rounded-full animate-pulse" />
              <h2 className="text-danger font-black uppercase tracking-widest text-sm">Emergency Active</h2>
           </div>
           <button onClick={onCancel} className="text-slate-500 font-bold text-xs">CANCEL</button>
        </header>

        <div className="glass-card p-6 rounded-3xl mb-8 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-danger/20 p-3 rounded-2xl">
               <Navigation className="w-6 h-6 text-danger" />
            </div>
            <div>
               <h3 className="font-bold text-lg">Live Map Preview</h3>
               <p className="text-xs text-slate-400">Broadcasting to emergency services</p>
            </div>
          </div>
          <div className="h-40 bg-slate-900/80 rounded-2xl border border-white/5 relative flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', backgroundSize: '16px 16px' }} />
             <div className="relative">
                <div className="w-4 h-4 bg-danger rounded-full animate-ping" />
                <div className="absolute inset-0 w-4 h-4 bg-danger rounded-full" />
             </div>
          </div>
        </div>

        <div className="space-y-4">
          {['Sending Live Location...', 'Calling Emergency Contact...', 'Alerting Nearby Authorities...'].map((text, i) => (
             <motion.div 
               key={i}
               initial={{ x: -20, opacity: 0 }}
               animate={activeActions.includes(text) ? { x: 0, opacity: 1 } : {}}
               className={`p-4 rounded-2xl flex items-center justify-between ${activeActions.includes(text) ? 'bg-white/5 border border-white/10' : 'opacity-20'}`}
             >
                <div className="flex items-center gap-3">
                   {i === 0 && <Navigation className="w-4 h-4" />}
                   {i === 1 && <Phone className="w-4 h-4" />}
                   {i === 2 && <ShieldCheck className="w-4 h-4" />}
                   <span className="text-sm font-medium">{text}</span>
                </div>
                {activeActions.includes(text) && <CheckCircle2 className="w-4 h-4 text-safe" />}
             </motion.div>
          ))}
        </div>

        {activeActions.length === 3 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-10 glass p-6 rounded-3xl border-brand-accent/30 border-2"
          >
             <div className="flex items-center gap-4 mb-4">
                <div className="bg-brand-accent p-3 rounded-full text-brand-blue">
                   <Volume2 className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-bold text-brand-accent">AI Call Agent Active</h4>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">Synthesizing Voice Report...</p>
                </div>
             </div>
             <p className="text-sm text-slate-300 italic bg-black/40 p-4 rounded-xl leading-relaxed">
               "This is an automated emergency alert. The user may be in danger. Current location is 37.7749° N, 122.4194° W. Detected event: High Distress Distress. Assistance required."
             </p>
          </motion.div>
        )}
      </div>
    );
  }

  if (currentStep === AppState.POST_EMERGENCY) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fixed inset-0 bg-safe/90 flex flex-col items-center justify-center p-8 text-white z-50 overflow-hidden"
      >
        {/* Confetti-like bits */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ y: -10, x: Math.random() * 400 - 200 }}
              animate={{ y: 1000, rotate: 360 }}
              transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: 'linear' }}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </div>

        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="bg-white text-safe p-8 rounded-full mb-8 shadow-2xl"
        >
          <ShieldCheck className="w-24 h-24" />
        </motion.div>
        <h2 className="text-4xl font-black mb-4">You are safe now</h2>
        <p className="text-lg opacity-90 text-center mb-12 max-w-xs">All emergency protocols have been paused and responders notified.</p>

        <button 
          onClick={onRestart}
          className="w-full max-w-sm p-6 bg-brand-blue text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
        >
          Restart Monitoring
        </button>
      </motion.div>
    );
  }

  return null;
}
