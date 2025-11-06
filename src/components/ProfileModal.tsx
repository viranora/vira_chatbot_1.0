import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
  profile: UserProfile;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, profile }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? (value === '' ? '' : parseInt(value, 10)) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-700" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-white mb-6">Profilim</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">İsim</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">Yaş</label>
              <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="currentMood" className="block text-sm font-medium text-slate-300 mb-2">Şu Anki Ruh Halin</label>
              <input type="text" name="currentMood" id="currentMood" placeholder="Örn: Endişeli, yorgun..." value={formData.currentMood} onChange={handleChange} className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="therapyGoals" className="block text-sm font-medium text-slate-300 mb-2">Terapi Hedeflerin</label>
              <textarea name="therapyGoals" id="therapyGoals" rows={3} placeholder="Örn: Stresle başa çıkmak, daha pozitif düşünmek..." value={formData.therapyGoals} onChange={handleChange} className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none" />
            </div>
          </div>
          
          <div className="flex justify-end items-center gap-4 mt-8">
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors">İptal</button>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};