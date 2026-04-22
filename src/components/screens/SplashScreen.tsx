import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'logo' | 'login'>('logo');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-brand-blue p-6"
    >
      <AnimatePresence mode="wait">
        {stage === 'logo' ? (
          <motion.div
            key="logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-brand-accent/20 rounded-full blur-2xl glow-blue"
              />
              <Shield className="w-20 h-20 text-brand-accent relative z-10" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Predictive Emergency AI</h1>
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">
              AI That Protects Before It Happens
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-sm flex flex-col items-center"
          >
            <Shield className="w-12 h-12 text-brand-accent mb-8" />
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm mb-10 text-center">Secure your safety with biometric or phone OTP authentication.</p>
            
            <div className="w-full space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-bold">+1</div>
                <input 
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:border-brand-accent/50 transition-all font-medium"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => phoneNumber.length > 5 && onComplete()}
                className={`w-full p-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all glow-blue ${
                  phoneNumber.length > 5 ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                Authenticate Now
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              
              <button className="w-full p-4 text-xs font-bold text-slate-500 tracking-widest uppercase hover:text-slate-300 transition-colors">
                Use Biometric Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
