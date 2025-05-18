import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLanguage, LanguageType } from '../context/LanguageContext';
import Svg, { Path, Circle } from 'react-native-svg';

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Account'>;

// Geri ok ikonu komponenti
const BackIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M19 12H5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 19L5 12L12 5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Profil ikonu komponenti
const ProfileIcon = () => {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke="#333333" strokeWidth="2" />
      <Path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

// Bildirim ikonu komponenti
const NotificationIcon = () => {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Dil ikonu komponenti
const LanguageIcon = () => {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#333333" strokeWidth="2" />
      <Path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2 12H22" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 6H20" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 18H20" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Hakkında ikonu komponenti
const InfoIcon = () => {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#333333" strokeWidth="2" />
      <Path d="M12 16V12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 8H12.01" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Çıkış ikonu komponenti
const LogoutIcon = () => {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 17L21 12L16 7" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 12H9" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Ok ikonu komponenti
const ChevronRightIcon = () => {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path d="M9 18L15 12L9 6" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { t, language, setLanguage, supportedLanguages, getLanguageDisplayName } = useLanguage();
  const [notifications, setNotifications] = React.useState(true);
  
  const handleLanguageChange = (lang: LanguageType) => {
    setLanguage(lang);
  };
  
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('account_settings')}</Text>
        <View style={styles.emptySpace} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}
      >
        {/* Profil Bölümü */}
        <View style={styles.profileSection}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>HE</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Hasan CodePush</Text>
            <Text style={styles.profileEmail}>hasan@codepush.com</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>{t('edit_profile')}</Text>
          </TouchableOpacity>
        </View>

        {/* Ayarlar Bölümü */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>{t('preferences')}</Text>
          
          {/* Bildirimler */}
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <NotificationIcon />
            </View>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>{t('notifications')}</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#DDDDDD', true: '#FFE8D6' }}
              thumbColor={notifications ? '#FF6600' : '#F4F3F4'}
            />
          </View>
          
          {/* Dil Ayarları */}
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <LanguageIcon />
            </View>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>{t('language')}</Text>
              <Text style={styles.settingValue}>{getLanguageDisplayName(language)}</Text>
            </View>
            <TouchableOpacity style={styles.settingAction}>
              <ChevronRightIcon />
            </TouchableOpacity>
          </View>
          
          {/* Dil Seçenekleri */}
          <View style={styles.languageOptions}>
            {supportedLanguages.map((lang) => (
              <TouchableOpacity 
                key={lang}
                style={[
                  styles.languageOption,
                  language === lang && styles.languageOptionSelected
                ]}
                onPress={() => handleLanguageChange(lang)}
              >
                <Text 
                  style={[
                    styles.languageOptionText,
                    language === lang && styles.languageOptionTextSelected
                  ]}
                >
                  {getLanguageDisplayName(lang)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hakkında Bölümü */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>{t('about')}</Text>
          
          {/* Hakkında */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <InfoIcon />
            </View>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>{t('about_app')}</Text>
            </View>
            <View style={styles.settingAction}>
              <ChevronRightIcon />
            </View>
          </TouchableOpacity>
          
          {/* Versiyon */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>1.0.1</Text>
          </View>
        </View>

        {/* Çıkış Yap Butonu */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogoutIcon />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  emptySpace: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 8,
    borderBottomColor: '#F8F8F8',
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFE8D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6600',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#888888',
  },
  editProfileButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF6600',
  },
  editProfileText: {
    fontSize: 14,
    color: '#FF6600',
    fontWeight: '500',
  },
  settingsSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#F8F8F8',
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabelContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
  },
  settingValue: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  settingAction: {
    padding: 4,
  },
  languageOptions: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingLeft: 58,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    marginRight: 10,
  },
  languageOptionSelected: {
    backgroundColor: '#FFE8D6',
  },
  languageOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  languageOptionTextSelected: {
    color: '#FF6600',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FFF2F2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF3B30',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  versionText: {
    fontSize: 14,
    color: '#999999',
  },
});

export default AccountScreen; 