import { motion } from 'motion/react';
import { Mic, Navigation, Activity, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function PermissionsScreen({ onComplete }: { onComplete: () => void }) {
  const [permissions, setPermissions] = useState({
    mic: false,
    loc: false,
    mot: false
  });

  const toggle = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allDone = permissions.mic && permissions.loc && permissions.mot;

  return (
    <div className="min-h-screen p-6 flex flex-col pt-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold mb-2">Stay Safe.</h2>
        <h3 className="text-3xl font-light text-slate-400">Enable Access</h3>
      </motion.div>

      <div className="space-y-4 flex-1">
        {[
          { id: 'mic', icon: Mic, title: 'Microphone', desc: 'Audio threat detection' },
          { id: 'loc', icon: Navigation, title: 'Location', desc: 'Live tracking & safety zones' },
          { id: 'mot', icon: Activity, title: 'Motion', desc: 'Fall and sudden impact detection' },
        ].map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => toggle(item.id as any)}
            className={`p-5 rounded-[24px] cursor-pointer flex items-center justify-between transition-all border ${
              permissions[item.id as keyof typeof permissions] 
                ? 'bg-brand-accent/10 border-brand-accent/30 glow-blue' 
                : 'bg-white/[0.03] border-white/10'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                permissions[item.id as keyof typeof permissions] ? 'bg-brand-accent text-white' : 'bg-slate-900 border border-white/5 text-slate-500'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
              permissions[item.id as keyof typeof permissions] ? 'bg-brand-accent border-brand-accent shadow-lg shadow-brand-accent/20' : 'border-slate-700 bg-slate-950'
            }`}>
              {permissions[item.id as keyof typeof permissions] && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto space-y-6">
        <p className="text-xs text-center text-slate-500 leading-relaxed">
          Your data is encrypted and processed securely on-device when possible.
        </p>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => allDone && onComplete()}
          className={`w-full p-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            allDone ? 'bg-brand-accent text-brand-blue shadow-lg shadow-brand-accent/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Allow & Continue
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
