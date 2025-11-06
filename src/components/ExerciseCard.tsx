import React from 'react';
import type { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
}

const getIcon = (type: string) => {
    switch(type) {
        case 'breathing':
        case 'nefes':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M3 12h1M5 19.5v-15"/><path d="M12 3h1M12 21h1M19.5 5v15M21 12h-1M8.5 8.5v8"/><path d="M15.5 8.5v8"/></svg>;
        case 'meditation':
        case 'meditasyon':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M14.2 2.2a2 2 0 0 1 2.35 2.35l-12 12a2 2 0 0 1-2.35-2.35l12-12Z"/><path d="M12 12 9.8 9.8a2 2 0 0 1 0-2.82l0 0a2 2 0 0 1 2.82 0L12 12Zm0 0 2.2 2.2a2 2 0 0 1 0 2.82l0 0a2 2 0 0 1-2.82 0L12 12Z"/><path d="M4.9 19.1 2.1 16.3a2 2 0 0 1 0-2.82l0 0a2 2 0 0 1 2.82 0l2.8 2.8"/><path d="M19.1 4.9 16.3 2.1a2 2 0 0 0-2.82 0l0 0a2 2 0 0 0 0 2.82l2.8 2.8"/></svg>;
        case 'journaling':
        case 'gunluk':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><path d="M4 22h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2Z"/><path d="M16 8h-6"/><path d="M16 12h-6"/></svg>;
        default:
            return null;
    }
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <div className="bg-slate-700/50 rounded-lg p-4 mt-2 border border-slate-600 w-full">
      <div className="flex items-center gap-3 mb-3">
        {getIcon(exercise.type)}
        <h3 className="font-bold text-lg text-white">{exercise.title}</h3>
      </div>
      <ol className="list-decimal list-inside space-y-2 text-slate-300">
        {exercise.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};