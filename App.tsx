/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Animated, Dimensions, Easing } from 'react-native';
import FirstScreen from './src/onboarding/FirstScreen';
import GenderScreen from './src/onboarding/GenderScreen';
import AgeScreen from './src/onboarding/AgeScreen';
import CookingLevelScreen from './src/onboarding/CookingLevelScreen';
import PreferencesScreen from './src/onboarding/PreferencesScreen';
import TabNavigator from './src/navigation/TabNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import codePush from "@revopush/react-native-code-push";
import AccountScreen from './src/screens/AccountScreen';
import CategoryDetailScreen from './src/screens/CategoryDetailScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';

export type RootStackParamList = {
  First: undefined; // Yeni eklenen FirstScreen için tip tanımı
  Gender: undefined; // Parametre almıyorsa undefined
  Age: undefined; // Parametresiz hale getirildi
  CookingLevel: undefined; // Yeni ekran için tip tanımı
  Preferences: { cookingLevel: string }; // Yeni eklenen Preferences ekranı için tip tanımı
  MainTabs: undefined; // Tab Navigator için tip tanımı
  Account: undefined; // Hesap ayarları ekranı için tip tanımı
  Home: undefined; // Ana sayfa ekranı için tip tanımı
  Chat: undefined; // Yapay zeka sohbet ekranı için tip tanımı
  SavedRecipes: undefined; // Geçmiş tarifler ekranı için tip tanımı
  CategoryDetail: { 
    categoryId: string; 
    categoryTitle: string; 
    categoryImage: string;
  }; // Kategori detay sayfası için tip tanımı
  RecipeDetail: {
    recipeId: string;
    recipeTitle: string;
    recipeImage: string;
    time: string;
    rating: string;
  }; // Yemek tarifi detay sayfası için tip tanımı
};

const Stack = createStackNavigator<RootStackParamList>();
const { width } = Dimensions.get('window');

// CodePush yapılandırmasını güvenli bir şekilde ayarlayalım
const codePushOptions = { 
  checkFrequency: codePush?.CheckFrequency?.ON_APP_START || 0,
  installMode: codePush?.InstallMode?.IMMEDIATE || 0
};

// Uygulama ana bileşeni
function App(): React.JSX.Element {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="First" 
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS
          }}
        >
          {/* headerShown: false ile başlık çubuğunu gizliyoruz */}
          <Stack.Screen name="First" component={FirstScreen} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="Age" component={AgeScreen} />
          <Stack.Screen name="CookingLevel" component={CookingLevelScreen} />
          <Stack.Screen name="Preferences" component={PreferencesScreen} />
          
          {/* Ana ekranlar için Tab Navigator kullanıyoruz */}
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          
          {/* Tab dışında kalan ve stack içinde kalması gereken ekranlar */}
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}

// RevoPush ile uygulamayı sarmalıyoruz
export default codePush ? codePush(codePushOptions)(App) : App;
