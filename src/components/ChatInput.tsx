import React from 'react';

interface ChatInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  userInput,
  setUserInput,
  onSubmit,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && userInput.trim()) {
        onSubmit(e as any);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center p-4 bg-slate-800 border-t border-slate-700 gap-4"
    >
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Vira'ya bir şeyler yazın..."
        rows={1}
        className="flex-grow bg-slate-700 text-slate-200 placeholder-slate-400 rounded-lg p-3 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 max-h-40"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !userInput.trim()}
        className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
      </button>
    </form>
  );
};