import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLanguage } from '../context/LanguageContext';
import Svg, { Path, Circle } from 'react-native-svg';

type CategoryDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CategoryDetail'>;
type CategoryDetailScreenRouteProp = RouteProp<RootStackParamList, 'CategoryDetail'>;

// Geri ikonu komponenti
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 19L5 12L12 5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

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

const CategoryDetailScreen = () => {
  const navigation = useNavigation<CategoryDetailScreenNavigationProp>();
  const route = useRoute<CategoryDetailScreenRouteProp>();
  const { t } = useLanguage();
  
  const { categoryId, categoryTitle, categoryImage } = route.params;
  
  // Ekran genişliğine göre yüzde hesaplama
  const windowWidth = Dimensions.get('window').width;
  const wp = (percentage: number) => {
    return windowWidth * (percentage / 100);
  };
  
  // Ekran yüksekliğine göre yüzde hesaplama
  const windowHeight = Dimensions.get('window').height;
  const hp = (percentage: number) => {
    return windowHeight * (percentage / 100);
  };

  // Seçilen kategoriye göre yemek listesi
  const getCategoryRecipes = () => {
    // Burada kategoriye göre filtrelenen yemekler olacak
    const recipes = [
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
      {
        id: '5',
        title: t('cheese_burger'),
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=500&auto=format&fit=crop',
        price: '10.99',
        time: '16',
        rating: '4.5',
      },
      {
        id: '6',
        title: t('chicken_burger'),
        image: 'https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?q=80&w=500&auto=format&fit=crop',
        price: '11.99',
        time: '18',
        rating: '4.7',
      },
    ];
    
    return recipes;
  };

  const renderRecipeItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.recipeCard}
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
      
      {/* Üst kısım: Başlık ve Geri butonu */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryTitle}</Text>
        <View style={styles.placeholder} />
      </View>



      {/* Yemek Listesi */}
      <FlatList
        data={getCategoryRecipes()}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipesContainer}
        columnWrapperStyle={styles.recipeRow}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// Ekran genişliğine göre hesaplamalar için
const Dimensions = require('react-native').Dimensions;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wp = (percentage: number) => {
  return windowWidth * (percentage / 100);
};

const hp = (percentage: number) => {
  return windowHeight * (percentage / 100);
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
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 40,
  },
  bannerContainer: {
    width: '100%',
    height: hp(25),
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: wp(5),
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  recipesContainer: {
    padding: wp(4),
    paddingBottom: Platform.OS === 'ios' ? hp(10) : hp(8),
  },
  recipeRow: {
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  recipeCard: {
    width: wp(44),
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: hp(15),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  recipeInfo: {
    padding: wp(3),
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666666',
  },
});

export default CategoryDetailScreen; 