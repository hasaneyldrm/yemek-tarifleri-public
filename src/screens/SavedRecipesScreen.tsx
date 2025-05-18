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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLanguage } from '../context/LanguageContext';
import Svg, { Path, Circle } from 'react-native-svg';

type SavedRecipesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SavedRecipes'>;

// Kalori ikonu
const CalorieIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
        fill="#666666"
      />
    </Svg>
  );
};

// Zaman ikonu
const TimeIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#666666" strokeWidth="2" />
      <Path d="M12 6V12L16 14" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

// Yıldız ikonu
const StarIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6600">
      <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </Svg>
  );
};

const SavedRecipesScreen = () => {
  const navigation = useNavigation<SavedRecipesScreenNavigationProp>();
  const { t } = useLanguage();

  // Örnek kaydedilmiş tarifler verisi
  const savedRecipes = [
    {
      id: '1',
      title: 'Göz Yumurta ve Avokadolu Tost',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=500&auto=format&fit=crop',
      rating: 5,
      calories: 120,
      time: 20,
    },
    {
      id: '2',
      title: 'Ev Yapımı Burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
      rating: 5,
      calories: 450,
      time: 30,
    },
    {
      id: '3',
      title: 'Tavuk Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop',
      rating: 5,
      calories: 380,
      time: 25,
    },
    {
      id: '4',
      title: 'Japon Stili Pankek',
      image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?q=80&w=500&auto=format&fit=crop',
      rating: 5,
      calories: 320,
      time: 20,
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, index) => (
      <StarIcon key={index} />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('saved_recipes')}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>{t('my_saved_recipes')}</Text>
        
        {savedRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeCard}
            activeOpacity={0.8}
            onPress={() => 
              navigation.navigate('RecipeDetail', {
                recipeId: recipe.id,
                recipeTitle: recipe.title,
                recipeImage: recipe.image,
                time: recipe.time.toString(),
                rating: recipe.rating.toString()
              })
            }
          >
            <Image
              source={{ uri: recipe.image }}
              style={styles.recipeImage}
              resizeMode="cover"
            />
            <View style={styles.timeOverlay}>
              <TimeIcon />
              <Text style={styles.timeText}>{recipe.time} dk</Text>
            </View>
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(recipe.rating)}
              </View>
              <View style={styles.recipeInfo}>
                <View style={styles.infoItem}>
                  <CalorieIcon />
                  <Text style={styles.infoText}>{recipe.calories} kcal</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.detailButton}
                onPress={() => 
                  navigation.navigate('RecipeDetail', {
                    recipeId: recipe.id,
                    recipeTitle: recipe.title,
                    recipeImage: recipe.image,
                    time: recipe.time.toString(),
                    rating: recipe.rating.toString()
                  })
                }
              >
                <Text style={styles.detailButtonText}>{t('view_recipe_detail')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    paddingBottom: hp(10),
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: hp(2),
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: wp(45),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  timeOverlay: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    marginLeft: 4,
  },
  recipeContent: {
    padding: wp(4),
  },
  recipeTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: hp(1),
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: hp(1),
    gap: 2,
  },
  recipeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  infoText: {
    marginLeft: wp(1),
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  detailButton: {
    backgroundColor: '#FF6600',
    borderRadius: 12,
    paddingVertical: hp(1.5),
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SavedRecipesScreen; 