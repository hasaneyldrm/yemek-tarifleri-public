import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import SavedRecipesScreen from '../screens/SavedRecipesScreen';
import { useLanguage } from '../context/LanguageContext';
import Svg, { Path, Circle } from 'react-native-svg';
import { View, Platform, SafeAreaView } from 'react-native';

// Ev ikonu komponenti (alt navigasyon için)
const HomeIcon = ({ color }: { color: string }) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <Path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Mesaj ikonu komponenti (alt navigasyon için)
const MessageIcon = ({ color }: { color: string }) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <Path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Kayıtlı tarifler ikonu komponenti (alt navigasyon için)
const SavedRecipesIcon = ({ color }: { color: string }) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <Path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

const Tab = createBottomTabNavigator();

export type TabParamList = {
  HomeTab: undefined;
  ChatTab: undefined;
  SavedRecipesTab: undefined;
};

const TabNavigator = () => {
  const { t } = useLanguage();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 2,
          borderTopColor: '#EEEEEE',
          height: Platform.OS === 'ios' ? 110 : 90,
          paddingTop: Platform.OS === 'ios' ? 25 : 20,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: '#FF6600',
        tabBarInactiveTintColor: '#333333',
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <HomeIcon color={color} />
              {focused && (
                <View 
                  style={{ 
                    marginTop: 8,
                    width: 30,
                    height: 4,
                    backgroundColor: '#FF6600',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="ChatTab" 
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <MessageIcon color={color} />
              {focused && (
                <View 
                  style={{ 
                    marginTop: 8,
                    width: 30,
                    height: 4,
                    backgroundColor: '#FF6600',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="SavedRecipesTab" 
        component={SavedRecipesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <SavedRecipesIcon color={color} />
              {focused && (
                <View 
                  style={{ 
                    marginTop: 8,
                    width: 30,
                    height: 4,
                    backgroundColor: '#FF6600',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 