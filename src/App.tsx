import React, { useState, useEffect, useRef } from 'react';
import type { Message, UserProfile, Exercise, ExerciseType } from './types';
import { startChat } from './services/geminiService';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';
import { ProfileModal } from './components/ProfileModal';
import type { Chat } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    age: '',
    currentMood: '',
    therapyGoals: '',
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const chatSessionRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const savedProfile = localStorage.getItem('viraUserProfile');
      const profile = savedProfile
        ? JSON.parse(savedProfile)
        : { name: '', age: '', currentMood: '', therapyGoals: '' };
      setUserProfile(profile);

      chatSessionRef.current = startChat(profile);

      setMessages([
        {
          role: 'model',
          content:
            'Merhaba, ben Vira. Nasıl hissediyorsun? Konuşmak istersen buradayım. Başlamadan önce, sağ üstteki profil simgesine tıklayarak bilgilerini güncelleyebilirsin.',
        },
      ]);
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem('viraUserProfile', JSON.stringify(newProfile));
    setIsProfileModalOpen(false);
    chatSessionRef.current = startChat(newProfile);
    setMessages((prev) => [
      ...prev,
      {
        role: 'model',
        content:
          'Profil bilgilerin güncellendi. Artık sana daha kişisel tavsiyeler verebilirim.',
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading || !chatSessionRef.current) return;

    const userMessage: Message = { role: 'user', content: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatSessionRef.current.sendMessage({
        message: trimmedInput,
      });

      const modelResponseText = response.text ?? ''; // null safety eklendi
      const functionCalls = response.functionCalls;

      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0] as {
          id: string;
          name: string;
          args: {
            title: string;
            steps: string[];
          };
        };

        const args = call.args;

        const newExercise: Exercise = {
          type: call.name.split('_')[0] as ExerciseType,
          title: args.title,
          steps: args.steps,
        };

        const messageWithExercise: Message = {
          role: 'model',
          content: modelResponseText,
          exercise: newExercise,
        };
        setMessages((prev) => [...prev, messageWithExercise]);

        // toolResponse kısmı düzenlendi
        const toolResponseResult = await chatSessionRef.current.sendMessage({
          message: '',
          toolResponse: {
            functionResponses: [
              {
                id: call.id,
                name: call.name,
                response: {
                  result: `Kullanıcıya ${args.title} egzersizi gösterildi.`,
                },
              },
            ],
          },
        } as any); // TypeScript tip uyuşmazlığı için geçici çözüm

        if (toolResponseResult.text) {
          const followupMessage: Message = {
            role: 'model',
            content: toolResponseResult.text,
          };
          setMessages((prev) => [...prev, followupMessage]);
        }
      } else {
        const modelMessage: Message = {
          role: 'model',
          content: modelResponseText,
        };
        setMessages((prev) => [...prev, modelMessage]);
      }
    } catch (err) {
      console.error(err);
      setError('Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        profile={userProfile}
      />
      <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
        <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 z-10">
          <div className="text-center flex-grow">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Vira
            </h1>
            <p className="text-sm text-slate-400">
              Şefkatli Yapay Zeka Yoldaşınız
            </p>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Profili Düzenle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </header>
        <main ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
          <style>
            {`
              main::-webkit-scrollbar {
                width: 8px;
              }
              main::-webkit-scrollbar-track {
                background: #1e293b;
              }
              main::-webkit-scrollbar-thumb {
                background: #4f46e5;
                border-radius: 4px;
              }
              main::-webkit-scrollbar-thumb:hover {
                background: #4338ca;
              }
            `}
          </style>
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {error && (
              <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg my-4">
                {error}
              </div>
            )}
          </div>
        </main>
        <footer className="sticky bottom-0">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              userInput={userInput}
              setUserInput={setUserInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
