import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ChatGemeni() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      // Giả lập phản hồi từ Gemini
      const geminiReply = { role: 'gemini', text: `Bạn vừa nói: ${input}` };

      // Thêm reply vào danh sách tin nhắn
      setMessages((prev) => [...prev, geminiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'gemini', text: 'Đã xảy ra lỗi khi gọi Gemini API' },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 16 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.message,
              msg.role === 'user' ? styles.userMessage : styles.geminiMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatArea: {
    flex: 1,
  },
  message: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: '#f3f4f6',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputArea: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: '700',
  },
});
