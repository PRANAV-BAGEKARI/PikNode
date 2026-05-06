import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, Volume2 } from 'lucide-react';

const MaitraWidget = () => {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // TODO (GSSoC Contributor): Implement browser Web Speech API for actual voice-to-text recording
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Sending to Maitra AI:", query);
    // TODO (GSSoC Contributor): Wire this up to the `POST /api/maitra` backend route using Axios
    setQuery('');
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 text-green-700 rounded-lg">
            <Volume2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-stone-800">Maitra AI</h2>
            <p className="text-sm text-stone-500">Your agricultural voice assistant</p>
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-100 min-h-[120px]">
          <p className="text-stone-600 italic">
            "Namaskar! I noticed soil moisture is dropping in Sector 4. Would you like me to schedule irrigation for tomorrow morning?"
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-3 mt-auto">
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`relative p-3 rounded-full flex-shrink-0 transition-colors ${
            isListening ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {isListening && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-red-400 rounded-full z-0"
            />
          )}
          <Mic size={20} className="relative z-10" />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isListening ? "Listening..." : "Ask Maitra about crop health..."}
          className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />

        <button 
          type="submit"
          className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex-shrink-0"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MaitraWidget;