import { motion } from 'motion/react';
import { User, Phone, Mail, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function UserSetupScreen({ onComplete }: { onComplete: (data: any) => void }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    emergency: ''
  });

  const isFormValid = form.name && form.phone && form.email && form.emergency;

  return (
    <div className="min-h-screen p-6 flex flex-col pt-16">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2 text-white">Setup Your</h2>
        <h3 className="text-3xl font-light text-slate-400">Safety Profile</h3>
      </motion.div>

      <div className="space-y-4 flex-1">
        <div className="space-y-4">
          <Input 
            icon={User} 
            placeholder="Full Name" 
            value={form.name} 
            onChange={v => setForm(f => ({ ...f, name: v }))} 
          />
          <Input 
            icon={Phone} 
            placeholder="Phone Number" 
            value={form.phone} 
            onChange={v => setForm(f => ({ ...f, phone: v }))} 
          />
          <Input 
            icon={Mail} 
            placeholder="Email Address" 
            value={form.email} 
            onChange={v => setForm(f => ({ ...f, email: v }))} 
          />
          
          <div className="pt-4">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-2 mb-2 block">Critical Contact</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Heart className="h-4 w-4 text-red-500" />
              </div>
              <input
                type="text"
                className="w-full bg-white/[0.03] border-2 border-red-500/20 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-red-500 transition-all placeholder:text-slate-600 text-sm font-medium"
                placeholder="Emergency Contact Phone"
                value={form.emergency}
                onChange={e => setForm(f => ({ ...f, emergency: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => isFormValid && onComplete(form)}
          className={`w-full p-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            isFormValid ? 'bg-brand-accent text-white glow-blue' : 'bg-white/[0.05] text-slate-600'
          }`}
        >
          Save & Begin Monitoring
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

function Input({ icon: Icon, placeholder, value, onChange }: any) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <input
        type="text"
        className="w-full bg-white/[0.03] border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-accent/30 focus:bg-white/[0.05] transition-all placeholder:text-slate-600 text-sm font-medium"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
