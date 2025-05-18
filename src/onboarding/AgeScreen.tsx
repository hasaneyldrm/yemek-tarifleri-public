import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLanguage } from '../context/LanguageContext';
import Svg, { Path } from 'react-native-svg';

// Eğer bu dosyalar henüz oluşturulmadıysa, daha sonra eklenecek
// import { storage } from '../services/storage';
// import { supabase } from '../services/supabase';
// import { NavigationProps } from '../types/navigation';
// import { useTheme } from '../context/ThemeContext';

type AgeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Age'
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

const AgeScreen = () => {
  const navigation = useNavigation<AgeScreenNavigationProp>();
  const [selectedAge, setSelectedAge] = useState(25);
  const flatListRef = useRef<FlatList>(null);
  const itemHeight = 45;
  const ages = Array.from({ length: 82 }, (_, i) => i + 18); // 18-99 yaş arası
  const { t } = useLanguage();

  // Turuncu renk teması
  const colors = {
    primary: '#FF6600', // Turuncu
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    buttonText: '#FFFFFF',
  };

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Başlangıçta 25 yaşına scroll
    const initialIndex = ages.findIndex(age => age === 25);
    flatListRef.current?.scrollToIndex({
      index: initialIndex,
      animated: false,
    });
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    if (ages[index]) {
      setSelectedAge(ages[index]);
    }
  };

  const handleContinue = () => {
    // CookingLevel ekranına yönlendir
    navigation.navigate('CookingLevel');
  };

  const renderItem = ({ item: age }: { item: number }) => (
    <View
      style={[
        styles.ageItem,
        selectedAge === age && styles.selectedAge,
      ]}
    >
      <Text
        style={[
          styles.ageText,
          selectedAge === age ? styles.selectedAgeText : styles.unselectedAgeText,
        ]}
      >
        {age}
      </Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 5,
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
      paddingHorizontal: width < 380 ? 16 : 20,
      paddingTop: height < 700 ? 0 : 10,
    },
    titleContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: height < 700 ? 20 : 30,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: width < 380 ? 30 : 32,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: height < 700 ? 8 : 16,
      letterSpacing: -0.5,
      color: colors.text,
    },
    subtitle: {
      fontSize: width < 380 ? 15 : 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: width < 380 ? 20 : 24,
    },
    pickerContainer: {
      height: height < 700 ? 280 : 360,
      width: '100%',
      marginBottom: height < 700 ? 20 : 40,
      overflow: 'visible',
    },
    selectionOverlay: {
      position: 'absolute',
      top: '50%',
      width: '100%',
      height: itemHeight,
      marginTop: -itemHeight/2,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: colors.primary,
      zIndex: 1,
      pointerEvents: 'none',
      borderRadius: 10,
    },
    scrollContent: {
      paddingVertical: height < 700 ? 117.5 : 157.5,
    },
    ageItem: {
      width: '100%',
      height: itemHeight,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    selectedAge: {
      // Seçili öğeyi vurgulamak için ek stiller ekleyebiliriz
    },
    ageText: {
      fontSize: width < 380 ? 20 : 22,
    },
    selectedAgeText: {
      fontSize: width < 380 ? 30 : 34,
      color: colors.primary,
      fontWeight: '700',
    },
    unselectedAgeText: {
      color: colors.textSecondary,
      fontWeight: '400',
    },
    continueButton: {
      width: '100%',
      height: height < 700 ? 50 : 56,
      backgroundColor: colors.primary,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: height < 700 ? 10 : 16,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    continueButtonText: {
      color: colors.buttonText,
      fontSize: width < 380 ? 16 : 18,
      fontWeight: '600',
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
          <Text style={styles.title}>{t('how_old')}</Text>
          <Text style={styles.subtitle}>
            {t('age_description')}
          </Text>
        </View>

        <View style={styles.pickerContainer}>
          <View style={styles.selectionOverlay} />
          <FlatList
            ref={flatListRef}
            data={ages}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={itemHeight}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            scrollEnabled={true}
            onMomentumScrollEnd={handleScroll}
            getItemLayout={(data, index) => ({
              length: itemHeight,
              offset: itemHeight * index,
              index,
            })}
            contentContainerStyle={styles.scrollContent}
          />
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.continueButtonText}>{t('continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AgeScreen;