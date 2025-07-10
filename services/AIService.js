import * as FileSystem from 'expo-file-system';

const GEMINI_API_KEY = 'AIzaSyDhDJgrk0qBRrkwCCY8iUZTYu9A7XLon24'; // ⚠️ Thay bằng key của bạn
const GEMINI_MODEL_ID = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL_ID}:generateContent`;

export class AIService {
  static async imageToBase64(uri) {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }

  static async _callGeminiAPI(imageUri, promptText = 'Mô tả ảnh', maxTokens = 256) {
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
        temperature: 0.5,
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
    return await this._callGeminiAPI(
      imageUri,
      'Hãy mô tả chi tiết bức ảnh này bằng tiếng Việt',
      512
    );
  }
}
