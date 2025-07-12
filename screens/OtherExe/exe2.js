import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path as needed
import { useTranslation } from 'react-i18next';

const Exe2 = () => {
  const { colors } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const onLanguageChange = () => {
      console.log('Language changed in Exe1:', i18n.language);
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', onLanguageChange);
    return () => i18n.off('languageChanged', onLanguageChange);
  }, [i18n]);

  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).title}>{t('full_body_challenge_7x4')}</Text>
    </View>
  );
};

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
});

export default Exe2;