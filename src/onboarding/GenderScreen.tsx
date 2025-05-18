import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Svg, { Path, Circle } from 'react-native-svg';
import { useLanguage } from '../context/LanguageContext';

type GenderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Gender'
>;

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

// Erkek ikon komponenti - düzeltilmiş
const MaleIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Circle cx="10" cy="14" r="5" stroke="white" strokeWidth="2" />
      <Path
        d="M14 10L20 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M15 4H20V9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// Kadın ikon komponenti
const FemaleIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="9" r="5" stroke="white" strokeWidth="2" />
      <Path
        d="M12 14V20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M9 17H15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

const GenderScreen = () => {
  const navigation = useNavigation<GenderScreenNavigationProp>();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const { t } = useLanguage();

  // Turuncu renk teması
  const colors = {
    primary: '#FF6600', // Turuncu
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    buttonText: '#FFFFFF',
    male: '#007AFF', // Mavi
    female: '#FF2D55', // Pembe
  };

  const { width, height } = Dimensions.get('window');
  // Responsive boyutlar için yardımcı fonksiyonlar
  const wp = (percentage: number) => {
    return width * (percentage / 100);
  };

  const hp = (percentage: number) => {
    return height * (percentage / 100);
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    
    // Gerçek uygulamada veri kaydetme işlemleri burada yapılabilir
    try {
      // Sonraki ekrana git
      navigation.navigate('Age');
    } catch (error) {
      Alert.alert(
        t('error'),
        t('try_again'),
        [{ text: t('ok'), onPress: () => {} }]
      );
    }
  };

  const circleSize = wp(40); // Daire boyutunu ekran genişliğine göre ayarla

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
      marginBottom: hp(6),
      paddingHorizontal: wp(2),
    },
    titleWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: hp(2.5),
    },
    titleBlack: {
      fontSize: Math.min(32, wp(7.5)),
      fontWeight: '700',
      textAlign: 'center',
      color: '#000000',
      letterSpacing: -0.5,
    },
    titleOrange: {
      fontSize: Math.min(32, wp(7.5)),
      fontWeight: '700',
      textAlign: 'center',
      color: '#FF6600',
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
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginBottom: hp(5),
    },
    genderOption: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: hp(4),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    maleOption: {
      backgroundColor: '#007AFF', // Mavi
    },
    femaleOption: {
      backgroundColor: '#FF2D55', // Pembe
    },
    selectedOption: {
      transform: [{ scale: 1.05 }],
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 8,
    },
    genderText: {
      color: 'white',
      fontSize: Math.min(20, wp(5)),
      fontWeight: '600',
      marginTop: hp(1),
    },
  });

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
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleBlack}>{t('tell_about_yourself_black')}</Text>
            <Text style={styles.titleOrange}>{t('tell_about_yourself_orange')}</Text>
          </View>
          <Text style={styles.subtitle}>
            {t('gender_description')}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              styles.maleOption,
              selectedGender === 'male' && styles.selectedOption
            ]}
            onPress={() => handleGenderSelect('male')}
            activeOpacity={0.7}
          >
            <MaleIcon />
            <Text style={styles.genderText}>{t('male')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              styles.femaleOption,
              selectedGender === 'female' && styles.selectedOption
            ]}
            onPress={() => handleGenderSelect('female')}
            activeOpacity={0.7}
          >
            <FemaleIcon />
            <Text style={styles.genderText}>{t('female')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen; 