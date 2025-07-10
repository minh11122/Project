import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatGemeni() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      // Giả lập phản hồi từ Gemini
      const geminiReply = { role: 'gemini', text: `Bạn vừa nói: ${input}` };
      setMessages((prev) => [...prev, geminiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'gemini', text: 'Đã xảy ra lỗi khi gọi Gemini API' },
      ]);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>TRÒ CHUYỆN</Text>
      <TouchableOpacity>
        <View style={styles.iconButton}>
          <Ionicons name="information-circle-outline" size={20} color={colors.text} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.fixedHeaderContainer}>
        <Header />
      </View>

      {/* Scrollable Chat Area */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Bắt đầu trò chuyện với Gemini! Gõ tin nhắn của bạn dưới đây.
              </Text>
            </View>
          ) : (
            messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.message,
                  msg.role === 'user' ? styles.userMessage : styles.geminiMessage,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Nhập tin nhắn..."
            style={styles.input}
            placeholderTextColor={colors.muted}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color={colors.card} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const colors = {
  primary: '#2563eb',
  secondary: '#9ca3af',
  background: '#f9fafb',
  card: '#fff',
  text: '#000',
  muted: '#6b7280',
  border: '#e5e7eb',
  accent: '#f9d8a6',
  accentText: '#6b4b00',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.background,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  iconButton: {
    padding: 8,
    backgroundColor: colors.border,
    borderRadius: 12,
  },
  chatContainer: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 20,
    paddingTop: 60, // Adjust for header
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  message: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    maxWidth: '75%',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  geminiMessage: {
    backgroundColor: colors.card,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});