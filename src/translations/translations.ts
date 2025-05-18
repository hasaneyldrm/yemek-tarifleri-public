interface Translation {
  [key: string]: string;
}

interface Translations {
  tr: Translation;
  en: Translation;
}

export const translations: Translations = {
  tr: {
    // RecipeDetailScreen
    "ingredients": "Malzemeler",
    "instructions": "Hazırlanışı",
    "serving": "porsiyon",
    "easy": "Kolay",
    
    // Burger Tarifleri - Malzemeler
    "burger_ingredients_1": "200g burger köftesi",
    "burger_ingredients_2": "2 dilim cheddar peyniri",
    "burger_ingredients_3": "1 hamburger ekmeği",
    "burger_ingredients_4": "2 yaprak marul",
    "burger_ingredients_5": "1 dilim domates",
    "burger_ingredients_6": "1 dilim soğan",
    "burger_ingredients_7": "Ketçap",
    "burger_ingredients_8": "Mayonez",
    "burger_ingredients_9": "Hardal",
    
    // Burger Tarifleri - Hazırlanışı
    "burger_instructions_1": "Köfteleri düz bir tavada veya ızgarada pişirin.",
    "burger_instructions_2": "Her köftenin üzerine bir dilim peynir koyun ve eriyene kadar bekleyin.",
    "burger_instructions_3": "Hamburger ekmeğini ortadan ikiye kesin ve hafifçe ısıtın.",
    "burger_instructions_4": "Ekmeğin alt kısmına ketçap, mayonez ve hardal sürün.",
    "burger_instructions_5": "Marul, domates ve soğanı ekmeğin üzerine yerleştirin.",
    "burger_instructions_6": "Peynirli köfteyi yerleştirin ve ekmeğin üst kısmıyla kapatın.",
    "burger_instructions_7": "Sıcak servis yapın. Afiyet olsun!",
    
    // CategoryDetailScreen
    "category_detail": "Kategori Detayı",
    "back": "Geri",
    // FirstScreen
    "app_name": "Yemek Tarifleri",
    "app_description": "Damak tadınıza uygun birbirinden lezzetli ve özel yemek tariflerini keşfedin",
    "many_recipes": "Binlerce Birbirinden Lezzetli Tarif",
    "recipes_description": "Her damak tadına ve mutfak kültürüne uygun binlerce tarif arasından dilediğinizi seçin ve hemen uygulamaya başlayın",
    "personal_recommendations": "Kişisel Özel Tavsiyeler",
    "recommendations_description": "Tercihlerinize ve damak zevkinize göre özel olarak özelleştirilmiş birbirinden lezzetli tarifler keşfedin",
    "start_now": "Hemen Başla",
    "be_chef": "Kendi mutfağınızın profesyonel şefi olun!",
    "recipe_description": "Lezzetli ve kolay hazırlanabilen bu tarifi mutlaka denemelisiniz. Misafirlerinizi etkileyecek sonuçlar elde edeceksiniz.",
    "master_chef_title": "Şef olmayı öğrenin!",
    "master_chef_description": "Hemen şimdi usta bir şef olmanın yollarını keşfedin",
    "next": "İleri",
    "skip": "Atla",
    "quick_start": "Hızlı Başlangıç",
    "quick_start_subtitle": "Boş bir tarif ile başlayalım",
    "new_recipe": "Yeni Tarif",
    "search": "Ara",
    "my_recipes": "Tariflerim",
    "breakfast_recipe": "Kahvaltı Tarifi",
    "view_recipe": "Tarifi Görüntüle",
    "read_more": "Daha fazla",

    // GenderScreen
    "tell_about_yourself": "Bize kendinden bahset!",
    "tell_about_yourself_black": "Bize kendinden ",
    "tell_about_yourself_orange": "bahset!",
    "gender_description": "Daha iyi bir deneyim sunmak için cinsiyetini bilmemiz gerekiyor",
    "male": "Erkek",
    "female": "Kadın",
    "error": "Hata",
    "try_again": "Bir sorun oluştu. Lütfen tekrar deneyin.",
    "ok": "Tamam",

    // AgeScreen
    "how_old": "Kaç yaşındasın?",
    "age_description": "Size daha iyi bir deneyim sunmak için yaşınızı bilmemiz gerekiyor",
    "continue": "Devam",

    // CookingLevelScreen
    "cooking_level": "Yemek yapma seviyeniz nedir?",
    "cooking_level_description": "Size daha iyi bir deneyim sunmak için seviyenizi bilmemiz gerekiyor",
    "beginner": "Başlangıç",
    "beginner_description": "Yemek yapmaya yeni başladım.",
    "intermediate": "Orta Seviye",
    "intermediate_description": "Ara ara yemek yapıyorum.",
    "expert": "Uzman",
    "expert_description": "Her tarifi yapabilirim.",
    "selection_made": "Seçim Yapıldı",
    "selected_level": "Seçilen seviye:",

    // PreferencesScreen
    "preferences_title": "Hangi mutfakları tercih edersiniz?",
    "preferences_description": "Damak tadınıza uygun tarifleri önerirken kullanacağız",
    "vegetarian": "Vejetaryen",
    "meat": "Et Yemekleri",
    "seafood": "Deniz Ürünleri",
    "dessert": "Tatlılar",
    "breakfast": "Kahvaltı",
    "fastfood": "Fast Food",
    "healthy": "Sağlıklı",
    "international": "Dünya Mutfakları",

    // HomeScreen
    "good_morning": "Günaydın",
    "most_made_recipes": "En Çok Yapılan Tarifler",
    "categories": "Kategoriler",
    "recipe_categories": "Tarif Kategorileri",
    "recipes": "tarif",
    "popular_recipes": "Popüler Tarifler",
    "see_all": "Tümünü Gör",
    "min": "dk",
    "egg_and_avocado_toast": "Göz Yumurta ve Avokadolu Tost",
    "homemade_burger": "Ev Hamburgeri ve Patates Kızartması",
    "japanese_style_pancake": "Japon Stili Pankek",
    "tako_salad": "Tako Salatası",
    "vegetable_fruit_salad": "Sebze & Meyve Vejetaryen Salatası",
    "mexican_taco": "Lezzetli & Kolay Meksika Taco Tarifi",
    "chicken": "Tavuk",
    "bowl": "Bowl",
    "burger": "Burger",
    "pasta": "Makarna",
    "soup": "Çorba",
    "salad": "Salata",
    "chicken_burger": "Tavuk Burger",
    "cheese_burger": "Peynirli Burger",
    
    // Banner Titles
    "special_recipes": "Özel Tarifler",
    "special_recipes_description": "Şeflerden özel tarifler",
    "healthy_choices": "Sağlıklı Seçimler",
    "healthy_choices_description": "Hafif ve besleyici tarifler",
    "dessert_corner": "Tatlı Köşesi",
    "dessert_corner_description": "En sevilen tatlı tarifleri",
    
    // AccountScreen
    "account_settings": "Hesap Ayarları",
    "edit_profile": "Profili Düzenle",
    "preferences": "Tercihler",
    "notifications": "Bildirimler",
    "language": "Dil",
    "about": "Hakkında",
    "about_app": "Uygulama Hakkında",
    "logout": "Çıkış Yap",
    
    // ChatScreen
    "chat_title": "YemekTarifleriAI",
    "message_placeholder": "Mesaj",
    "send_button": "Gönder",
    "lunch_option": "Öğle Yemeği",
    "lunch_description": "Dolabının fotoğrafını çekip atabilirsin",
    "breakfast_option": "Kahvaltı",
    "breakfast_description": "Buzdolabının içindekileri söyleyebilirsin",
    "dinner_option": "Akşam Yemeği",
    "dinner_description": "Ne yemek istediğini söyle",
    "ask_recipe": "Tarif Sor",
    "ask_recipe_description": "İstediğin bir yemeğin tarifini sor",
    "type_message": "Bir mesaj yazın...",
    "ai_thinking": "YemekTarifleriAI düşünüyor...",
    "ai_greeting": "Merhaba! Size nasıl yardımcı olabilirim? Hangi yemeği yapmak istiyorsunuz?",

    // SavedScreen
    "saved_recipes": "Kaydedilenler",
    "my_saved_recipes": "Kayıtlı Tariflerim",
    "view_recipe_detail": "Tarif Detayını Gör"
  },
  en: {
    // RecipeDetailScreen
    "ingredients": "Ingredients",
    "instructions": "Instructions",
    "serving": "serving",
    "easy": "Easy",
    
    // Burger Recipes - Ingredients
    "burger_ingredients_1": "200g burger patty",
    "burger_ingredients_2": "2 slices of cheddar cheese",
    "burger_ingredients_3": "1 hamburger bun",
    "burger_ingredients_4": "2 lettuce leaves",
    "burger_ingredients_5": "1 slice of tomato",
    "burger_ingredients_6": "1 slice of onion",
    "burger_ingredients_7": "Ketchup",
    "burger_ingredients_8": "Mayonnaise",
    "burger_ingredients_9": "Mustard",
    
    // Burger Recipes - Instructions
    "burger_instructions_1": "Cook the patties on a flat pan or grill.",
    "burger_instructions_2": "Place a slice of cheese on each patty and wait until it melts.",
    "burger_instructions_3": "Cut the hamburger bun in half and warm it slightly.",
    "burger_instructions_4": "Spread ketchup, mayonnaise and mustard on the bottom part of the bun.",
    "burger_instructions_5": "Place lettuce, tomato and onion on the bun.",
    "burger_instructions_6": "Place the cheesy patty and close with the top part of the bun.",
    "burger_instructions_7": "Serve hot. Enjoy!",
    
    // CategoryDetailScreen
    "category_detail": "Category Detail",
    "back": "Back",
    // FirstScreen
    "app_name": "Food Recipes",
    "app_description": "Discover delicious and special food recipes that perfectly suit your taste preferences",
    "many_recipes": "Thousands of Delicious Recipes",
    "recipes_description": "Choose from thousands of recipes suitable for every taste and cuisine culture and start preparing them immediately",
    "personal_recommendations": "Personal Custom Recommendations",
    "recommendations_description": "Discover delicious recipes specially customized according to your preferences and taste preferences",
    "start_now": "Start Now",
    "be_chef": "Become a professional chef in your own kitchen!",
    "recipe_description": "You must try this delicious and easy-to-prepare recipe. You'll get impressive results that will amaze your guests.",
    "master_chef_title": "Learn how to become a chef!",
    "master_chef_description": "Discover how to become a master chef right now",
    "next": "Next",
    "skip": "Skip",
    "quick_start": "Quick Start",
    "quick_start_subtitle": "Let's start with an empty recipe",
    "new_recipe": "New Recipe",
    "search": "Search",
    "my_recipes": "My Recipes",
    "breakfast_recipe": "Breakfast Recipe",
    "view_recipe": "View Recipe",
    "read_more": "Read more",

    // GenderScreen
    "tell_about_yourself": "Tell us about yourself!",
    "tell_about_yourself_black": "Tell us about ",
    "tell_about_yourself_orange": "yourself!",
    "gender_description": "We need to know your gender to provide you a better experience",
    "male": "Male",
    "female": "Female",
    "error": "Error",
    "try_again": "A problem occurred. Please try again.",
    "ok": "OK",

    // AgeScreen
    "how_old": "How old are you?",
    "age_description": "We need to know your age to provide you a better experience",
    "continue": "Continue",

    // CookingLevelScreen
    "cooking_level": "What is your cooking level?",
    "cooking_level_description": "We need to know your level to provide you a better experience",
    "beginner": "Beginner",
    "beginner_description": "I'm new to cooking.",
    "intermediate": "Intermediate",
    "intermediate_description": "I cook occasionally.",
    "expert": "Expert",
    "expert_description": "I can cook any recipe.",
    "selection_made": "Selection Made",
    "selected_level": "Selected level:",

    // PreferencesScreen
    "preferences_title": "Which cuisines do you prefer?",
    "preferences_description": "We'll use this to recommend recipes that match your taste",
    "vegetarian": "Vegetarian",
    "meat": "Meat Dishes",
    "seafood": "Seafood",
    "dessert": "Desserts",
    "breakfast": "Breakfast",
    "fastfood": "Fast Food",
    "healthy": "Healthy",
    "international": "International Cuisines",

    // HomeScreen
    "good_morning": "Good Morning",
    "most_made_recipes": "Most Made Recipes",
    "categories": "Categories",
    "recipe_categories": "Recipe Categories",
    "recipes": "recipes",
    "popular_recipes": "Popular Recipes",
    "see_all": "See All",
    "min": "min",
    "egg_and_avocado_toast": "Egg and Avocado Toast",
    "homemade_burger": "Homemade Burger and Fries",
    "japanese_style_pancake": "Japanese Style Pancake",
    "tako_salad": "Tako Salad",
    "vegetable_fruit_salad": "Vegetable & Fruit Vegetarian Salad",
    "mexican_taco": "Delicious & Easy Mexican Taco Recipe",
    "chicken": "Chicken",
    "bowl": "Bowl",
    "burger": "Burger",
    "pasta": "Pasta",
    "soup": "Soup",
    "salad": "Salad",
    "chicken_burger": "Chicken Burger",
    "cheese_burger": "Cheese Burger",
    
    // Banner Titles
    "special_recipes": "Special Recipes",
    "special_recipes_description": "Special recipes from chefs",
    "healthy_choices": "Healthy Choices",
    "healthy_choices_description": "Light and nutritious recipes",
    "dessert_corner": "Dessert Corner",
    "dessert_corner_description": "Most loved dessert recipes",
    
    // AccountScreen
    "account_settings": "Account Settings",
    "edit_profile": "Edit Profile",
    "preferences": "Preferences",
    "notifications": "Notifications",
    "language": "Language",
    "about": "About",
    "about_app": "About App",
    "logout": "Logout",
    
    // ChatScreen
    "chat_title": "FoodRecipesAI",
    "message_placeholder": "Message",
    "send_button": "Send",
    "lunch_option": "Lunch",
    "lunch_description": "You can take a photo of your fridge",
    "breakfast_option": "Breakfast",
    "breakfast_description": "Tell us what's in your refrigerator",
    "dinner_option": "Dinner",
    "dinner_description": "Tell us what you want to eat",
    "ask_recipe": "Ask Recipe",
    "ask_recipe_description": "Ask for any recipe you want",
    "type_message": "Type a message...",
    "ai_thinking": "FoodRecipesAI is thinking...",
    "ai_greeting": "Hello! How can I help you today? What would you like to cook?",

    // SavedScreen
    "saved_recipes": "Saved Recipes",
    "my_saved_recipes": "My Saved Recipes",
    "view_recipe_detail": "View Recipe Detail"
  }
}; 