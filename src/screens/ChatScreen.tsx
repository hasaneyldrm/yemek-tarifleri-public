import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLanguage } from '../context/LanguageContext';
import Svg, { Path, Circle } from 'react-native-svg';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

// Menü ikonu
const MenuIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
        fill="#000000"
      />
    </Svg>
  );
};

// Gönder butonu ikonu
const SendIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
        fill="#FF6600"
      />
    </Svg>
  );
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

// Yapay zeka yanıtlarını simüle eder (gerçek projede API'ye bağlanacak)
const simulateAIResponse = async (userMessage: string): Promise<string> => {
  // Bu fonksiyon gerçek uygulamada ChatGPT API'ye bağlanacak
  // Şimdilik demo amaçlı basit yanıtlar döndürüyoruz
  
  await new Promise(resolve => setTimeout(resolve, 1500)); // Yapay zeka düşünme süresi
  
  if (userMessage.toLowerCase().includes('kahvaltı') || userMessage.toLowerCase().includes('breakfast')) {
    return 'Kahvaltı için yumurta, peynir ve ekmek kullanarak harika bir sandviç hazırlayabilirsiniz. İşte tarifi: 2 yumurta kırıp çırpın, az yağda pişirin. Ekmeğinizi kızartın, üzerine peynir ve pişen yumurtayı koyun. Afiyet olsun!';
  } else if (userMessage.toLowerCase().includes('öğle') || userMessage.toLowerCase().includes('lunch')) {
    return 'Öğle yemeği için hızlı bir tavuk salatası yapabilirsiniz. Marul, domates, salatalık doğrayın. Tavuk göğsünü ızgarada pişirip dilimleyin ve sebzelerin üzerine ekleyin. Zeytinyağı ve limon ile sosunu hazırlayabilirsiniz.';
  } else if (userMessage.toLowerCase().includes('akşam') || userMessage.toLowerCase().includes('dinner')) {
    return 'Akşam yemeği için mantarlı risotto harika bir seçenek olabilir. İşte basit tarifi: Pirinçleri soğan ile soteleyin, mantarları ekleyin. Azar azar et suyu ekleyerek pirinçler pişene kadar karıştırın. Son olarak parmesan peyniri ilave edin.';
  } else if (userMessage.toLowerCase().includes('tarif') || userMessage.toLowerCase().includes('recipe')) {
    return 'Hangi yemek tarifini öğrenmek istersiniz? Kahvaltı, öğle veya akşam yemeği için seçenekler sunabilirim.';
  } else {
    return 'Merhaba! Size nasıl yardımcı olabilirim? Kahvaltı, öğle yemeği veya akşam yemeği için tarifler önerebilirim. Dolabınızdakileri söylerseniz size uygun bir tarif önerebilirim.';
  }
};

const ChatScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    // Uygulama açıldığında bir karşılama mesajı ekle
    const welcomeMessage: Message = {
      id: 'welcome',
      text: t('ai_greeting'),
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    const userMessageText = message;
    setMessage('');
    
    // Otomatik scroll
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // AI yanıt verirken yükleniyor durumunu göster
    setIsLoading(true);
    
    try {
      // API'den yanıt al (simülasyon)
      const response = await simulateAIResponse(userMessageText);
      
      // AI yanıtını ekle
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
      // Otomatik scroll
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('AI yanıtı alınamadı:', error);
      
      // Hata mesajı ekle
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('try_again'),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryPress = (category: string) => {
    // Kullanıcı kategoriye tıkladığında otomatik mesaj gönder
    let prompt = '';
    
    switch(category) {
      case 'breakfast':
        prompt = t('breakfast_option');
        break;
      case 'lunch':
        prompt = t('lunch_option');
        break;
      case 'dinner':
        prompt = t('dinner_option');
        break;
      case 'ask_recipe':
        prompt = t('ask_recipe');
        break;
      default:
        prompt = '';
    }
    
    if (prompt) {
      setMessage(prompt);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yemek Tarifleri</Text>
      </View>

      {/* Mesaj listesi */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={[
          styles.messagesContent,
          { paddingBottom: messages.length <= 1 ? 20 : hp(20) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble,
              msg.isUser ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.isUser ? styles.userMessageText : styles.aiMessageText
            ]}>
              {msg.text}
            </Text>
          </View>
        ))}
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF6600" />
            <Text style={styles.loadingText}>{t('ai_thinking')}</Text>
          </View>
        )}
      </ScrollView>

      {/* Öneri kategorileri - mesaj yoksa gösterilir */}
      {messages.length <= 1 && (
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryRow}>
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => handleCategoryPress('lunch')}
            >
              <Text style={styles.categoryTitle}>{t('lunch_option')}</Text>
              <Text style={styles.categoryDescription}>{t('lunch_description')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => handleCategoryPress('breakfast')}
            >
              <Text style={styles.categoryTitle}>{t('breakfast_option')}</Text>
              <Text style={styles.categoryDescription}>{t('breakfast_description')}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoryRow}>
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => handleCategoryPress('dinner')}
            >
              <Text style={styles.categoryTitle}>{t('dinner_option')}</Text>
              <Text style={styles.categoryDescription}>{t('dinner_description')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => handleCategoryPress('ask_recipe')}
            >
              <Text style={styles.categoryTitle}>{t('ask_recipe')}</Text>
              <Text style={styles.categoryDescription}>{t('ask_recipe_description')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Mesaj giriş alanı - TabNavigator'un üzerinde sabit */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder={t('type_message')}
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
// Responsive boyutlar için yardımcı fonksiyonlar
const wp = (percentage: number) => {
  return width * (percentage / 100);
};

const hp = (percentage: number) => {
  return height * (percentage / 100);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  messagesContent: {
    paddingTop: hp(1),
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6600',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#000000',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  categoriesContainer: {
    position: 'absolute',
    bottom: hp(20), // Kategorileri daha aşağı konumlandırıyorum
    left: 0,
    right: 0,
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    backgroundColor: '#FFFFFF',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  categoryCard: {
    width: wp(44),
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
  },
  inputContainer: {
    position: 'absolute',
    bottom: hp(15), // Daha yukarıda konumlandırıyoruz
    left: wp(4),
    right: wp(4),
    borderTopWidth: 0, // Üst çizgiyi kaldırıyoruz
    paddingVertical: hp(1),
    backgroundColor: 'transparent', // Container'ı transparent yapıyoruz
    zIndex: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25, // Border radius'u artırıyoruz
    paddingHorizontal: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    flex: 1,
    minHeight: hp(5),
    maxHeight: hp(12),
    paddingVertical: hp(1.2),
    paddingRight: wp(12),
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  sendButton: {
    position: 'absolute',
    right: wp(2),
    height: hp(4),
    width: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatScreen; 