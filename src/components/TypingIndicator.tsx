import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-2 my-4">
    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22a6.5 6.5 0 0 0 6.5-6.5H12V22Z"/><path d="M12 15.5V9a6.5 6.5 0 0 0-6.5 6.5H12Z"/><path d="M15.5 12H9A6.5 6.5 0 0 0 15.5 12Z"/><path d="M15.5 12H22a6.5 6.S 0 0 0-6.5-6.5V12Z"/></svg>
    </div>
    <div className="flex items-center space-x-1 bg-slate-800 px-5 py-4 rounded-2xl rounded-tl-none">
      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
    </div>
  </div>
);