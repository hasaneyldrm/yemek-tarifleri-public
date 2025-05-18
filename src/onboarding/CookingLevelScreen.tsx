import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Svg, { Path, Circle } from 'react-native-svg';
import { useLanguage } from '../context/LanguageContext';

type CookingLevelScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CookingLevel'
>;

type LevelOption = {
  id: string;
  title: string;
  description: string;
};

// Geri ikon komponenti
const BackIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
        fill="#000000"
      />
    </Svg>
  );
};

// Yemek ikonu komponenti
const CookingIcon = () => {
  return (
    <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
      <Path d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V16C16 17.1046 15.1046 18 14 18H10C8.89543 18 8 17.1046 8 16V10Z" stroke="#FF6600" strokeWidth="2" />
      <Path d="M12 6V4" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M10 10H14" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

// Orta seviye için ikon komponenti - Tencere
const MediumLevelIcon = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V8Z"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M4 6H20"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path 
        d="M8 3V6"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path 
        d="M16 3V6"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// Başlangıç seviyesi için ikon komponenti - Tarif Kitabı
const BeginnerLevelIcon = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"

      />
      <Path
        d="M9 7H15"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M9 11H15"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M9 15H13"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// Uzman seviyesi için ikon komponenti - Aşçı Şapkası
const ExpertLevelIcon = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4C8 4 6 7 6 10H18C18 7 16 4 12 4Z"
        stroke="#FF6600"
        strokeWidth="2"
      />
      <Path
        d="M5 14L5 20"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M19 14L19 20"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M5 20H19"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M12 4V2"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M4 14H20"
        stroke="#FF6600"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

const CookingLevelScreen = () => {
  const navigation = useNavigation<CookingLevelScreenNavigationProp>();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const { t } = useLanguage();

  // Turuncu renk teması
  const colors = {
    primary: '#FF6600', // Turuncu
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    buttonText: '#FFFFFF',
    cardBorder: '#EEEEEE',
  };

  const levelOptions: LevelOption[] = [
    {
      id: 'beginner',
      title: t('beginner'),
      description: t('beginner_description'),
    },
    {
      id: 'intermediate',
      title: t('intermediate'),
      description: t('intermediate_description'),
    },
    {
      id: 'expert',
      title: t('expert'),
      description: t('expert_description'),
    },
  ];

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    
    // Seçilen seviyeyi kaydet ve PreferencesScreen'e git
    try {
      // Burada gerçek uygulamada veri kaydetme işlemleri yapılabilir
      
      // PreferencesScreen'e git ve seçilen seviyeyi parametre olarak geçir
      navigation.navigate('Preferences', { cookingLevel: levelId });
    } catch (error) {
      Alert.alert(
        t('error'),
        t('try_again'),
        [{ text: t('ok'), onPress: () => {} }]
      );
    }
  };

  // İkon seçimi için yardımcı fonksiyon
  const getLevelIcon = (levelId: string) => {
    switch (levelId) {
      case 'beginner':
        return <BeginnerLevelIcon />;
      case 'intermediate':
        return <MediumLevelIcon />;
      case 'expert':
        return <ExpertLevelIcon />;
      default:
        return null;
    }
  };

  // Seçilen seviyenin ikon rengini belirle
  const getStrokeColor = (isSelected: boolean) => {
    return isSelected ? '#FF6600' : '#FF6600';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('cooking_level')}</Text>
            <Text style={styles.subtitle}>
              {t('cooking_level_description')}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {levelOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.levelOption,
                  selectedLevel === option.id && styles.selectedOption,
                ]}
                onPress={() => handleLevelSelect(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.levelContent}>
                  <View style={styles.levelRow}>
                    <View style={[
                      styles.iconContainer,
                      selectedLevel === option.id && styles.selectedIconContainer
                    ]}>
                      {getLevelIcon(option.id)}
                    </View>
                    <View style={styles.levelTextContainer}>
                      <Text style={[
                        styles.levelTitle,
                        selectedLevel === option.id && styles.selectedText,
                      ]}>
                        {option.title}
                      </Text>
                      <Text style={[
                        styles.levelDescription,
                        selectedLevel === option.id && styles.selectedText,
                      ]}>
                        {option.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(1),
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp(4),
    paddingHorizontal: wp(2),
  },
  title: {
    fontSize: Math.min(32, wp(7.5)),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(1.5),
    color: '#000000',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Math.min(16, wp(4)),
    color: '#666666',
    textAlign: 'center',
    lineHeight: Math.min(24, hp(3)),
  },
  optionsContainer: {
    width: '100%',
    marginTop: hp(2),
  },
  levelOption: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: hp(3),
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  levelContent: {
    padding: wp(5),
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: wp(4),
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconContainer: {
    backgroundColor: '#FFF2E9',
    borderWidth: 1,
    borderColor: '#FF6600',
  },
  levelTextContainer: {
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6600',
    borderWidth: 2,
    shadowColor: "#FF6600",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  levelTitle: {
    fontSize: Math.min(20, wp(5)),
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
  },
  levelDescription: {
    fontSize: Math.min(15, wp(3.8)),
    color: '#666666',
  },
  selectedText: {
    color: '#FF6600',
  },
});

export default CookingLevelScreen; 