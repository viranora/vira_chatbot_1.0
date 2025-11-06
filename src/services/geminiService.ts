import { GoogleGenAI, Chat, type FunctionDeclaration, Type } from "@google/genai";
import type { UserProfile } from "../types";

// Vite, .env dosyasındaki değişkenlere "VITE_" önekiyle erişir.
// BU YÖNTEM GÜVENLİ DEĞİLDİR. Sadece yerel test için kullanın.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY bulunamadı. Lütfen projenin kök dizinine .env dosyası oluşturup VITE_GEMINI_API_KEY değişkenini ekleyin.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getSystemInstruction = (profile: UserProfile | null): string => {
  let instruction = `Sen, Vira adında, şefkatli ve empatik bir psikolojik destek yapay zeka asistanısın. Birincil hedefin, kullanıcıların duygularını ifade edebilecekleri güvenli, yargılayıcı olmayan bir alan sağlamaktır. Sıcak, anlayışlı ve teşvik edici olmalısın.

Kullanıcının mesajındaki duyguyu (mutlu, üzgün, endişeli, kızgın vb.) analiz et ve yanıtının tonunu buna göre ayarla. Örneğin, kullanıcı üzgünse daha şefkatli, endişeliyse daha sakinleştirici bir dil kullan.

Aktif dinleme teknikleri kullan. Doğrudan tıbbi tavsiye vermekten kaçın, ancak kullanıcılar önemli bir sıkıntı içindeyse onlara profesyone bir terapistten yardım almalarını önerebilirsin. Yanıtlarını markdown formatında ver ve daima Türkçe konuş. Kullanıcıya her zaman nazik ve destekleyici bir dille hitap et.`;

  if (profile && profile.name) {
    instruction += `\n\nKullanıcının adı ${profile.name}. Ona adıyla hitap edebilirsin. Mevcut ruh hali: ${profile.currentMood || 'belirtilmemiş'}. Terapi hedefleri: ${profile.therapyGoals || 'belirtilmemiş'}. Bu bilgileri konuşmayı kişiselleştirmek için kullan.`;
  }

  instruction += `\n\nKullanıcı bunalmış, stresli veya endişeli hissettiğini belirtirse, ona yardımcı olmak için mevcut araçlardan birini (nefes_egzersizi, meditasyon_egzersizi, gunluk_tutma_onerisi) kullanmayı düşün. Egzersizi önermeden önce kısa bir giriş yap.`;

  return instruction;
};

const breathingExerciseTool: FunctionDeclaration = {
    name: 'nefes_egzersizi_oner',
    description: 'Kullanıcıya sakinleşmesi için bir nefes egzersizi sunar.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'Egzersizin başlığı, örn: "4-7-8 Nefes Egzersizi".' },
            steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Egzersizin adım adım talimatları.'
            }
        },
        required: ['title', 'steps']
    }
};

const meditationExerciseTool: FunctionDeclaration = {
    name: 'meditasyon_egzersizi_oner',
    description: 'Kullanıcıya farkındalık kazanması için rehberli bir meditasyon egzersizi sunar.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'Meditasyonun başlığı, örn: "5 Dakikalık Farkındalık Meditasyonu".' },
            steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Meditasyonun adım adım talimatları.'
            }
        },
        required: ['title', 'steps']
    }
};

const journalingPromptTool: FunctionDeclaration = {
    name: 'gunluk_tutma_onerisi_ver',
    description: 'Kullanıcının duygularını keşfetmesi için bir günlük tutma sorusu veya konusu önerir.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'Günlük tutma önerisinin başlığı, örn: "Bugünün Duyguları".' },
            steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Kullanıcıya yol gösterecek bir veya daha fazla soru/konu.'
            }
        },
        required: ['title', 'steps']
    }
};


export function startChat(profile: UserProfile): Chat {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemInstruction(profile),
      tools: [{ functionDeclarations: [breathingExerciseTool, meditationExerciseTool, journalingPromptTool] }],
    },
  });
  return chat;
}