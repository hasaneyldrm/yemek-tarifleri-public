import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLanguage } from '../context/LanguageContext';
import Svg, { Path, Circle } from 'react-native-svg';

type RecipeDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecipeDetail'>;
type RecipeDetailScreenRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;

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

// Kaydetme ikonu
const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" 
      fill={filled ? "#FF6600" : "none"} 
      stroke={filled ? "#FF6600" : "#333333"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

// Porsiyon ikonu
const ServingIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 8H18V17C18 18.0609 17.5786 19.0783 16.8284 19.8284C16.0783 20.5786 15.0609 21 14 21H6C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V8Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 1V4" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 1V4" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 1V4" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Zorluk ikonu
const DifficultyIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M4 22H20V12L12 3L4 12V22Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 22V15" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const RecipeDetailScreen = () => {
  const navigation = useNavigation<RecipeDetailScreenNavigationProp>();
  const route = useRoute<RecipeDetailScreenRouteProp>();
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = React.useState(false);
  
  const { recipeId, recipeTitle, recipeImage, time, rating } = route.params;
  
  // Slider için durum
  const [activeSlide, setActiveSlide] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  
  // Slider için örnek fotoğraflar 
  const sliderImages = [
    recipeImage,
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop',
  ];
  
  // Scroll olduğunda slider pozisyonunu güncelle
  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveSlide(viewableItems[0].index);
    }
  }).current;
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };
  
  // Malzemeleri translation'dan al
  const getIngredients = () => {
    const totalItems = 9; // Toplam malzeme sayısı
    const ingredientsList = [];
    
    for (let i = 1; i <= totalItems; i++) {
      ingredientsList.push({
        id: i.toString(),
        name: t(`burger_ingredients_${i}`),
        checked: false
      });
    }
    
    return ingredientsList;
  };
  
  // Hazırlanış adımlarını translation'dan al
  const getInstructions = () => {
    const totalSteps = 7; // Toplam adım sayısı
    const instructionsList = [];
    
    for (let i = 1; i <= totalSteps; i++) {
      instructionsList.push({
        id: i.toString(),
        step: i.toString(),
        description: t(`burger_instructions_${i}`)
      });
    }
    
    return instructionsList;
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Üst kısım - Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipeTitle}</Text>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={toggleSave}
        >
          <BookmarkIcon filled={isSaved} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Yemek Fotoğrafı - Slider */}
        <View style={styles.imageContainer}>
          <FlatList
            ref={flatListRef}
            data={sliderImages}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.recipeImage}
                resizeMode="cover"
              />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          
          {/* Dot İndikatörler */}
          <View style={styles.dotsContainer}>
            {sliderImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === activeSlide ? '#FF6600' : '#DDDDDD' }
                ]}
              />
            ))}
          </View>
        </View>
        
        {/* Tarif Bilgileri */}
        <View style={styles.infoContainer}>
          <Text style={styles.recipeTitle}>{recipeTitle}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <TimeIcon />
              <Text style={styles.statText}>{time} {t('min')}</Text>
            </View>
            <View style={styles.statItem}>
              <StarIcon />
              <Text style={styles.statText}>{rating}</Text>
            </View>
            <View style={styles.statItem}>
              <ServingIcon />
              <Text style={styles.statText}>1 {t('serving')}</Text>
            </View>
            <View style={styles.statItem}>
              <DifficultyIcon />
              <Text style={styles.statText}>{t('easy')}</Text>
            </View>
          </View>
          
          <Text style={styles.recipeDescription}>
            {t('recipe_description')}
          </Text>
        </View>
        
        {/* İçindekiler Bölümü */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('ingredients')}</Text>
          
          <View style={styles.ingredientsList}>
            {getIngredients().map((ingredient: { id: string, name: string, checked: boolean }) => (
              <View key={ingredient.id} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>{ingredient.name}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Hazırlanış Bölümü */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('instructions')}</Text>
          
          <View style={styles.instructionsList}>
            {getInstructions().map((instruction: { id: string, step: string, description: string }) => (
              <View key={instruction.id} style={styles.instructionItem}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{instruction.step}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction.description}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Alt Boşluk */}
        <View style={styles.bottomPadding} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    maxWidth: wp(60),
    textAlign: 'center',
  },
  saveButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: hp(30),
    position: 'relative',
  },
  recipeImage: {
    width: width,
    height: hp(30),
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  infoContainer: {
    padding: wp(5),
    borderBottomWidth: 8,
    borderBottomColor: '#F6F6F6',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: hp(1.5),
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp(2),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(5),
    marginBottom: hp(1),
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666666',
  },
  recipeDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
  },
  sectionContainer: {
    padding: wp(5),
    borderBottomWidth: 8,
    borderBottomColor: '#F6F6F6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: hp(2),
  },
  ingredientsList: {
    marginBottom: hp(1),
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6600',
    marginRight: wp(3),
  },
  ingredientText: {
    fontSize: 16,
    color: '#333333',
  },
  instructionsList: {
    marginBottom: hp(1),
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
    marginTop: 2,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  bottomPadding: {
    height: hp(10),
  },
});

export default RecipeDetailScreen; 