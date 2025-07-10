//npm install expo-image-picker expo-location expo-file-system
//npm install react-native-image-picker react-native-geolocation-service
//npx react-native link

import * as FileSystem from 'expo-file-system';

const GEMINI_API_KEY = 'AIzaSyDhDJgrk0qBRrkwCCY8iUZTYu9A7XLon24'; // ⚠️ Nên thay bằng biến môi trường nếu build production
const GEMINI_MODEL_ID = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL_ID}:generateContent`;

export class AIService {
  static async imageToBase64(uri) {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }

  static async _callGeminiAPI(imageUri, promptText = 'Mô tả ảnh', maxTokens = 512) {
    let parts = [{ text: promptText }];
    if (imageUri) {
      const base64 = await this.imageToBase64(imageUri);
      parts.push({
        inline_data: {
          mime_type: 'image/jpeg',
          data: base64,
        },
      });
    }

    const body = {
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: maxTokens,
      },
    };

    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi';
  }

  static async generateDescription(imageUri) {
    const prompt = `
      Phân tích bức ảnh người trong hình. Cho biết:
      1. Tình trạng cơ thể tổng thể (gầy, mập, cân đối...).
      2. Các nhóm cơ nổi bật hoặc cần cải thiện (ví dụ: cơ tay, cơ bụng, chân...).
      3. Gợi ý bài tập phù hợp để cải thiện vóc dáng hoặc phát triển cơ thể.
      Trả lời bằng tiếng Việt chi tiết, dễ hiểu.
    `;
    return await this._callGeminiAPI(imageUri, prompt, 512);
  }
}
