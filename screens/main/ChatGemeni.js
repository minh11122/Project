import React, { useState, useEffect, useRef, useContext } from 'react';
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
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PhotoService } from '../../services/PhotoService';
import { AIService } from '../../services/AIService';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';

export default function ChatGemeni() {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState(i18n.language);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in ChatGemeni:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const geminiReply = await AIService._callGeminiAPI(null, input);
      const geminiMsg = { role: 'gemini', text: geminiReply };
      setMessages((prev) => [...prev, geminiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'gemini', text: t('gemini_api_error') },
      ]);
    }
  };

  const handleTakePhoto = async () => {
    const photo = await PhotoService.takePhoto();
    if (!photo) return;

    const userMsg = {
      role: 'user',
      text: t('photo_sent'),
      photo,
    };
    setMessages((prev) => [...prev, userMsg]);

    const description = await AIService.generateDescription(photo.uri);
    const geminiMsg = { role: 'gemini', text: description, photo };
    setMessages((prev) => [...prev, geminiMsg]);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const Header = () => (
    <View style={styles(colors).header}>
      <Text style={styles(colors).headerTitle}>{t('chat')}</Text>
      <TouchableOpacity onPress={handleTakePhoto}>
        <View style={styles(colors).iconButton}>
          <Ionicons name="camera-outline" size={20} color={colors.text} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles(colors).container}>
      <View style={styles(colors).fixedHeaderContainer}>
        <Header />
      </View>
      <KeyboardAvoidingView
        style={styles(colors).chatContainer}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles(colors).chatArea}
          contentContainerStyle={styles(colors).chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles(colors).emptyState}>
              <Text style={styles(colors).emptyStateText}>
                {t('empty_state_text')}
              </Text>
            </View>
          ) : (
            messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles(colors).message,
                  msg.role === 'user' ? styles(colors).userMessage : styles(colors).geminiMessage,
                ]}
              >
                {msg.photo && (
                  <Image
                    source={{ uri: msg.photo.uri }}
                    style={{ width: 200, height: 150, borderRadius: 12, marginBottom: 8 }}
                  />
                )}
                <Text style={styles(colors).messageText}>{msg.text}</Text>
              </View>
            ))
          )}
        </ScrollView>
        <View style={styles(colors).inputArea}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={t('input_placeholder')}
            style={styles(colors).input}
            placeholderTextColor={colors.muted}
          />
          <TouchableOpacity onPress={sendMessage} style={styles(colors).sendButton}>
            <Ionicons name="send" size={20} color={colors.card} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
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
    paddingTop: 60,
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