import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  StatusBar,
  Animated,
  Easing,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Svg, { Path, Circle } from 'react-native-svg';
import { useLanguage, supportedLanguages, LanguageType } from '../context/LanguageContext';
import LottieView from 'lottie-react-native';

// Responsive boyutlar için yardımcı fonksiyonlar
const { width, height } = Dimensions.get('window');
const wp = (percentage: number) => {
  return width * (percentage / 100);
};

const hp = (percentage: number) => {
  return height * (percentage / 100);
};

// Animasyon süreleri
const ANIMATION_DURATION = 150; // Daha hızlı animasyon

type FirstScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'First'
>;

// Dünya ikonu (dil değiştirme için)
const WorldIcon = () => {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
      <Path d="M12 2V22" stroke="black" strokeWidth="1" strokeLinecap="round" />
      <Path d="M2 12H22" stroke="black" strokeWidth="1" strokeLinecap="round" />
      <Path d="M3.5 7H20.5" stroke="black" strokeWidth="1" strokeLinecap="round" />
      <Path d="M3.5 17H20.5" stroke="black" strokeWidth="1" strokeLinecap="round" />
    </Svg>
  );
};

// İleri ok ikonu
const ArrowRightIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M12 4L20 12L12 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Yemek ikonu
const RecipeIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Path d="M6 2L6 22" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M18 8V22" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M18 2V4" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M10 9L10 22" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M10 2C10 2 10 6 10 6C10 7.65685 11.3431 9 13 9C14.6569 9 16 7.65685 16 6C16 6 16 2 16 2" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

// Öneri ikonu
const RecommendationIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6600" strokeWidth="2" />
      <Path d="M12 16V16.01" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M12 13C12 11 14 11 14 9C14 7.34315 12.6569 6 11 6C9.34315 6 8 7.34315 8 9" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

// Şef ikonu
const ChefIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Path d="M6 19V21" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M18 19V21" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      <Path d="M4 11H20C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11Z" stroke="#FF6600" strokeWidth="2" />
      <Path d="M12 4C10.3431 4 9 5.34315 9 7V11H15V7C15 5.34315 13.6569 4 12 4Z" stroke="#FF6600" strokeWidth="2" />
      <Path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="#FF6600" strokeWidth="2" />
    </Svg>
  );
};

const FirstScreen = () => {
  const navigation = useNavigation<FirstScreenNavigationProp>();
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Onboarding adımları
  const steps = [
    {
      id: 0,
      title: t('many_recipes'),
      description: t('recipes_description'),
      lottie: require('../../assets/lottie/1.json'),
    },
    {
      id: 1,
      title: t('personal_recommendations'),
      description: t('recommendations_description'),
      lottie: require('../../assets/lottie/2.json'),
    },
    {
      id: 2,
      title: t('be_chef'),
      description: t('app_description'),
      lottie: require('../../assets/lottie/3.json'),
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // Sonraki sayfaya kaydır
      flatListRef.current?.scrollToIndex({
        index: currentStep + 1,
        animated: true
      });
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Gender');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Gender');
  };

  const renderStep = ({ item, index }: { item: any, index: number }) => {
    return (
      <View style={styles.stepContainer}>
        <View style={styles.iconContainer}>
          <LottieView
            source={item.lottie}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
        <Text style={styles.stepTitle}>{item.title}</Text>
        <Text style={styles.stepDescription}>{item.description}</Text>
      </View>
    );
  };

  const onScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    
    if (newIndex !== currentStep) {
      setCurrentStep(newIndex);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Image 
          source={require('../../assets/yemektariflerlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <FlatList
          ref={flatListRef}
          data={steps}
          renderItem={renderStep}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          scrollEventThrottle={16}
        />
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>{t('skip')}</Text>
        </TouchableOpacity>
        
        <View style={styles.paginationContainer}>
          {steps.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot, 
                currentStep === index && styles.activeDot
              ]} 
            />
          ))}
        </View>
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <ArrowRightIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    alignItems: 'center',
    marginBottom: hp(3),
  },
  logo: {
    width: wp(60),
    height: hp(8),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(4),
    paddingBottom: hp(2),
  },
  stepContainer: {
    width: width,
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  iconContainer: {
    width: wp(60),
    height: wp(60),
    borderRadius: wp(30),
    backgroundColor: 'rgba(255, 102, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(6),
  },
  lottieStyle: {
    width: wp(50),
    height: wp(50),
  },
  stepTitle: {
    fontSize: Math.min(28, wp(7)),
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: hp(2.5),
  },
  stepDescription: {
    fontSize: Math.min(17, wp(4.2)),
    color: '#666666',
    textAlign: 'center',
    marginHorizontal: wp(5),
    lineHeight: Math.min(24, hp(3)),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  skipButton: {
    padding: wp(2),
  },
  skipButtonText: {
    color: '#666666',
    fontSize: wp(4),
  },
  paginationContainer: {
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF6600',
    width: 24,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  worldButton: {
    position: 'absolute',
    top: hp(5),
    right: wp(5),
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp(80),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  languageText: {
    fontSize: 18,
  },
  selectedLanguage: {
    fontWeight: '600',
    color: '#FF6600',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FF6600',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default FirstScreen; 