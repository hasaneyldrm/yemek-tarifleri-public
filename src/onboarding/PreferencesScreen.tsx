import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Svg, { Path, Circle } from 'react-native-svg';
import { useLanguage } from '../context/LanguageContext';

type PreferencesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Preferences'
>;

type PreferencesScreenRouteProp = RouteProp<RootStackParamList, 'Preferences'>;

type PreferenceOption = {
  id: string;
  title: string;
  icon: string;
  selected: boolean;
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

const PreferencesScreen = () => {
  const navigation = useNavigation<PreferencesScreenNavigationProp>();
  const route = useRoute<PreferencesScreenRouteProp>();
  const { cookingLevel } = route.params;
  const { t } = useLanguage();
  
  const [preferences, setPreferences] = useState<PreferenceOption[]>([
    {
      id: 'vegetarian',
      title: t('vegetarian'),
      icon: '🥗',
      selected: false,
    },
    {
      id: 'meat',
      title: t('meat'),
      icon: '🥩',
      selected: false,
    },
    {
      id: 'seafood',
      title: t('seafood'),
      icon: '🐟',
      selected: false,
    },
    {
      id: 'dessert',
      title: t('dessert'),
      icon: '🍰',
      selected: false,
    },
    {
      id: 'breakfast',
      title: t('breakfast'),
      icon: '🍳',
      selected: false,
    },
    {
      id: 'fastfood',
      title: t('fastfood'),
      icon: '🍔',
      selected: false,
    },
    {
      id: 'healthy',
      title: t('healthy'),
      icon: '🥦',
      selected: false,
    },
    {
      id: 'international',
      title: t('international'),
      icon: '🌮',
      selected: false,
    },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(
      preferences.map(pref =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref
      )
    );
  };

  const handleContinue = () => {
    const selectedPreferences = preferences
      .filter(pref => pref.selected)
      .map(pref => pref.id);
    
    // Burada seçilen tercihleri ve pişirme seviyesini kaydetme işlemleri yapılabilir
    // Örneğin: AsyncStorage, Context API veya Supabase gibi
    console.log('Selected preferences:', selectedPreferences);
    console.log('Cooking level:', cookingLevel);
    
    // Ana sayfaya git
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
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
            <Text style={styles.title}>{t('preferences_title')}</Text>
            <Text style={styles.subtitle}>
              {t('preferences_description')}
            </Text>
          </View>

          <View style={styles.preferencesContainer}>
            {preferences.map((preference) => (
              <TouchableOpacity
                key={preference.id}
                style={[
                  styles.preferenceOption,
                  preference.selected && styles.selectedOption,
                ]}
                onPress={() => togglePreference(preference.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.preferenceIcon}>{preference.icon}</Text>
                <Text 
                  style={[
                    styles.preferenceTitle,
                    preference.selected && styles.selectedText,
                  ]}
                >
                  {preference.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>{t('continue')}</Text>
        </TouchableOpacity>
      </View>
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp(8),
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
  title: {
    fontSize: Math.min(32, wp(7.5)),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(2.5),
    color: '#000000',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Math.min(16, wp(4)),
    color: '#666666',
    textAlign: 'center',
    lineHeight: Math.min(24, hp(3)),
  },
  preferencesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  preferenceOption: {
    width: wp(43),
    height: hp(15),
    borderRadius: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(3),
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
  preferenceIcon: {
    fontSize: 32,
    marginBottom: hp(1),
  },
  preferenceTitle: {
    fontSize: Math.min(16, wp(4)),
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  selectedText: {
    color: '#FF6600',
  },
  footer: {
    position: 'absolute',
    bottom: height < 700 ? hp(3) : hp(5),
    left: wp(5),
    right: wp(5),
    backgroundColor: '#FFFFFF',
    paddingVertical: height < 700 ? hp(1) : hp(2),
    borderRadius: 12,
  },
  continueButton: {
    width: '100%',
    height: height < 700 ? 50 : 56,
    backgroundColor: '#FF6600',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#FF6600",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: width < 380 ? 16 : 18,
    fontWeight: '600',
  },
});

export default PreferencesScreen; 