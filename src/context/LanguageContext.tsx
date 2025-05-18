import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '../translations/translations';
import { NativeModules, Platform, I18nManager, Dimensions } from 'react-native';

// Desteklenen diller
export type LanguageType = keyof typeof translations;

// Mevcut dil seçeneklerini dinamik olarak translations'dan al
export const supportedLanguages = Object.keys(translations) as LanguageType[];

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
  supportedLanguages: LanguageType[];
  getLanguageDisplayName: (code: LanguageType) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Dil kodlarının görüntülenecek isimleri
const languageDisplayNames: Record<LanguageType, string> = {
  tr: 'Türkçe',
  en: 'English',
  // Yeni diller eklendiğinde buraya da eklenmelidir
};

// Cihazın dilini alma - basitleştirilmiş ve daha güvenilir yöntem
const getDeviceLanguage = (): LanguageType => {
  try {
    // Varsayılan dil
    let deviceLanguage = 'en';

    // Cihaz dilini almak için daha basit bir yöntem
    const languageTag = 
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager?.settings?.AppleLocale ||
          NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
          'en_US'
        : (NativeModules.I18nManager?.localeIdentifier || 'en_US');

    console.log('Detected language tag:', languageTag);

    // Dil kodunu ayır ve ilk kısmını al (örn. "tr-TR" -> "tr")
    if (languageTag && typeof languageTag === 'string') {
      deviceLanguage = languageTag.split(/[-_]/)[0].toLowerCase();
    }

    console.log('Extracted language code:', deviceLanguage);

    // Desteklenen diller arasında mı kontrol et
    if (supportedLanguages.includes(deviceLanguage as LanguageType)) {
      console.log('Using device language:', deviceLanguage);
      return deviceLanguage as LanguageType;
    } else {
      console.log('Device language not supported, using default:', 'en');
      return 'en';
    }
  } catch (error) {
    console.warn('Error detecting device language:', error);
    return 'en';
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Başlangıçta varsayılan dil olarak 'tr' kullan
  // Eğer cihaz dili algılanamıyorsa en azından Türkçe ile başlayalım
  const [language, setLanguage] = useState<LanguageType>('tr');
  
  // Component mount olduğunda cihaz dilini almaya çalış
  useEffect(() => {
    try {
      const deviceLang = getDeviceLanguage();
      setLanguage(deviceLang);
    } catch (error) {
      console.error('Language detection error:', error);
    }
  }, []);

  // Çeviri fonksiyonu
  const t = (key: string): string => {
    // Eğer çeviri bulunamazsa anahtar değerini döndür
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Dil kodunun görüntülenecek ismini döndür
  const getLanguageDisplayName = (code: LanguageType): string => {
    return languageDisplayNames[code] || code;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      supportedLanguages,
      getLanguageDisplayName
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Kullanım kolaylığı için hook
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 