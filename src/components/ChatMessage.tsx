import React from 'react';
import type { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { ExerciseCard } from './ExerciseCard';

interface ChatMessageProps {
  message: Message;
}

const UserIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center font-bold text-white flex-shrink-0">
    S
  </div>
);

const ViraIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22a6.5 6.5 0 0 0 6.5-6.5H12V22Z"/><path d="M12 15.5V9a6.5 6.5 0 0 0-6.5 6.5H12Z"/><path d="M15.5 12H9A6.5 6.5 0 0 0 15.5 12Z"/><path d="M15.5 12H22a6.5 6.5 0 0 0-6.5-6.5V12Z"/></svg>
    </div>
);

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-4 my-4 ${isModel ? '' : 'justify-end'}`}>
      {isModel && <ViraIcon />}
      <div
        className={`max-w-xl md:max-w-2xl px-5 py-3 rounded-2xl flex flex-col gap-2 ${
          isModel
            ? 'bg-slate-800 text-slate-200 rounded-tl-none'
            : 'bg-indigo-600 text-white rounded-br-none'
        }`}
      >
        {message.content && (
            <div className="prose prose-invert prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-li:marker:text-indigo-400">
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        )}
        {message.exercise && <ExerciseCard exercise={message.exercise} />}
      </div>
      {!isModel && <UserIcon />}
    </div>
  );
};