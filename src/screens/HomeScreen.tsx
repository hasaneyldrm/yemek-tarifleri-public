import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLanguage } from '../context/LanguageContext';
import Svg, { Path, Circle } from 'react-native-svg';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Profil ikonu komponenti
const ProfileIcon = () => {
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
      <Circle cx="12" cy="10" r="4" stroke="#FF6600" strokeWidth="2" />
      <Path d="M4.5 19.5C4.5 19.5 6 15.5 12 15.5C18 15.5 19.5 19.5 19.5 19.5" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

// Yıldız ikonu
const StarIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107" />
  </Svg>
);

// Zaman ikonu
const TimeIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#666666" strokeWidth="2" />
    <Path d="M12 6V12L16 14" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Yemek ikonu SVG - daha yumuşak tasarım
const FoodIcon = () => (
  <Svg width={wp(24)} height={hp(10)} viewBox="0 0 100 100" fill="none">
    <Circle cx="50" cy="50" r="45" fill="rgba(255, 102, 0, 0.08)" />
    <Path d="M35 35H65C68 35 70 37 70 40V60C70 63 68 65 65 65H35C32 65 30 63 30 60V40C30 37 32 35 35 35Z" fill="rgba(255, 102, 0, 0.12)" />
    <Path d="M40 45L60 65M40 65L60 45" stroke="rgba(255, 102, 0, 0.6)" strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

// Kategori ikonları kaldırıldı

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useLanguage();
  
  const navigateToAccount = () => {
    navigation.navigate('Account');
  };

  // Kategoriler - gerçek fotoğraflarla
  const categories = [
    {
      id: '1',
      title: t('burger'),
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop',
      color: '#FFC107',
      background: '#FFF5E0',
    },
    {
      id: '2',
      title: t('pizza'),
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop',
      color: '#F44336',
      background: '#FFEBEE',
    },
    {
      id: '3',
      title: t('salad'),
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop',
      color: '#4CAF50',
      background: '#E8F5E9',
    },
    {
      id: '4',
      title: t('pasta'),
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=300&auto=format&fit=crop',
      color: '#FF9800',
      background: '#FFF3E0',
    },
    {
      id: '5',
      title: t('chicken'),
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=300&auto=format&fit=crop',
      color: '#795548',
      background: '#EFEBE9',
    },
    {
      id: '6',
      title: t('soup'),
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=300&auto=format&fit=crop',
      color: '#2196F3',
      background: '#E3F2FD',
    },
  ];

  // Popüler tarifler
  const popularRecipes = [
    {
      id: '1',
      title: t('chicken_burger'),
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
      price: '12.99',
      time: '20',
      rating: '4.8',
    },
    {
      id: '2',
      title: t('cheese_burger'),
      image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=500&auto=format&fit=crop',
      price: '10.99',
      time: '15',
      rating: '4.6',
    },
    {
      id: '3',
      title: t('cheese_burger'),
      image: 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=500&auto=format&fit=crop',
      price: '11.99',
      time: '17',
      rating: '4.7',
    },
    {
      id: '4',
      title: t('chicken_burger'),
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop',
      price: '13.99',
      time: '22',
      rating: '4.9',
    },
  ];

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      activeOpacity={0.7}
      onPress={() => 
        navigation.navigate('CategoryDetail', {
          categoryId: item.id,
          categoryTitle: item.title,
          categoryImage: item.image
        })
      }
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.background }]}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.categoryImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderRecipeItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity
      style={[
        styles.recipeCard,
        { marginLeft: index % 2 === 0 ? 0 : wp(2.5) }
      ]}
      activeOpacity={0.8}
      onPress={() => 
        navigation.navigate('RecipeDetail', {
          recipeId: item.id,
          recipeTitle: item.title,
          recipeImage: item.image,
          time: item.time,
          rating: item.rating
        })
      }
    >
      <Image 
        source={{ uri: item.image }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <View style={styles.statItem}>
            <TimeIcon />
            <Text style={styles.statText}>{item.time} {t('min')}</Text>
          </View>
          <View style={styles.statItem}>
            <StarIcon />
            <Text style={styles.statText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Üst kısım: Logo ve Profil */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/yemektariflerlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={navigateToAccount}
        >
          <ProfileIcon />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 80 }}
      >
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity 
            style={styles.bannerCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('CategoryDetail', {
              categoryId: '1',
              categoryTitle: t('special_recipes'),
              categoryImage: categories[0].image
            })}
          >
            <View style={styles.gradientContainer}>
              <View style={[styles.gradientBase, { backgroundColor: '#FF5500', right: '85%' }]} />
              <View style={[styles.gradientBase, { backgroundColor: '#FF6200', right: '70%' }]} />
              <View style={[styles.gradientBase, { backgroundColor: '#FF7000', right: '55%' }]} />
              <View style={[styles.gradientBase, { backgroundColor: '#FF7E00', right: '40%' }]} />
              <View style={[styles.gradientBase, { backgroundColor: '#FF8C00', right: '25%' }]} />
              <View style={[styles.gradientBase, { backgroundColor: '#FF9A00', right: '10%' }]} />
            </View>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{t('special_recipes')}</Text>
              <Text style={styles.bannerSubtitle}>{t('special_recipes_description')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Kategoriler */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('categories')}</Text>
          </View>
          
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Popüler Tarifler */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('popular_recipes')}</Text>
          </View>
          
          <View style={styles.recipeGrid}>
            {popularRecipes.map((recipe, index) => (
              index < 2 && <React.Fragment key={recipe.id}>
                {renderRecipeItem({ item: recipe, index })}
              </React.Fragment>
            ))}
          </View>
          
          <View style={styles.recipeGrid}>
            {popularRecipes.map((recipe, index) => (
              index >= 2 && index < 4 && <React.Fragment key={recipe.id}>
                {renderRecipeItem({ item: recipe, index: index - 2 })}
              </React.Fragment>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(1) : hp(2),
    paddingBottom: hp(1),
  },
  logo: {
    width: wp(45),
    height: hp(3.5),
  },
  profileButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    paddingHorizontal: wp(5),
    marginBottom: hp(2.5),
  },
  bannerCard: {
    width: '100%',
    height: hp(18),
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFA700',
  },
  gradientBase: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 300,
    borderBottomRightRadius: 300,
  },
  bannerContent: {
    padding: wp(4),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '70%',
  },
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
    paddingHorizontal: wp(5),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6600',
    fontWeight: '500',
  },
  categoriesList: {
    paddingLeft: wp(5),
    paddingRight: wp(2),
    paddingVertical: hp(1),
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: wp(5),
    width: wp(20),
  },
  categoryIcon: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp(9),
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  recipeGrid: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    marginBottom: hp(2.5),
  },
  recipeCard: {
    width: wp(44),
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 4,
  },
  recipeImage: {
    width: '100%',
    height: wp(32),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recipeInfo: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'left',
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  statText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 3,
  },
});

export default HomeScreen; 