# Yemek Tarifleri AI

Bu proje, kullanıcıların damak tatlarına uygun yemek tarifleri bulmasına yardımcı olan bir React Native uygulamasıdır.

## Özellikler

- Kullanıcıların tercihlerine göre yemek tarifi önerileri
- Farklı dil seçenekleri (Türkçe, İngilizce)
- Modern ve kullanıcı dostu arayüz
- Yemek kategorileri ve filtreleme seçenekleri

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- Yarn veya npm
- iOS için: XCode ve CocoaPods
- Android için: Android Studio ve JDK

### Adımlar

1. Projeyi klonlayın:
```sh
git clone https://github.com/KULLANICI_ADINIZ/yemek-tarifleri-ai.git
cd yemek-tarifleri-ai
```

2. Bağımlılıkları yükleyin:
```sh
yarn install
# veya
npm install
```

3. iOS için (yalnızca macOS'ta):
```sh
# iOS klasörü repoda bulunmamaktadır. Güvenlik nedeniyle silinmiştir.
# iOS klasörünü oluşturmak için:
npx react-native init YemekTarifleri --template react-native-template-typescript --directory temp
cp -R temp/ios ./ios
rm -rf temp
cd ios && pod install
cd ..

# İOS klasörünüz oluştuktan sonra, gerekli konfigürasyonları yapmanız gerekecektir:
# 1. Info.plist dosyasında uygulamanızın adını düzenleyin
# 2. Gerekli izinleri ekleyin
# 3. Kendi CodePush anahtarlarınızı ekleyin (isteğe bağlı)
```

4. Android için:
```sh
# Android klasörü repoda bulunmamaktadır. Güvenlik nedeniyle silinmiştir.
# Android klasörünü oluşturmak için:
npx react-native init YemekTarifleri --template react-native-template-typescript --directory temp
cp -R temp/android ./android
rm -rf temp

# Android klasörünüz oluştuktan sonra, gerekli konfigürasyonları yapmanız gerekecektir:
# 1. build.gradle dosyalarında uygulamanızın adını ve paket adını düzenleyin
# 2. AndroidManifest.xml dosyasında gerekli izinleri ekleyin
# 3. Kendi Google API anahtarlarınızı ekleyin (isteğe bağlı)
```

5. Uygulamayı çalıştırın:
```sh
# iOS için
npx react-native run-ios
# Android için
npx react-native run-android
```

## Geliştirme

### Yeni Dil Ekleme

Yeni bir dil eklemek için aşağıdaki adımları izleyin:

1. `src/translations/translations.ts` dosyasını açın
2. Yeni dil için bir nesne ekleyin
3. Tüm mevcut çeviri anahtarları için çeviriler sağlayın
4. `LanguageType` türüne yeni dili ekleyin
5. `languageDisplayNames` nesnesine dil adını ekleyin

## Proje Yapısı

```
src/
  ├── assets/            # Görsel ve kaynak dosyaları
  ├── components/        # Yeniden kullanılabilir bileşenler
  ├── context/           # Context API dosyaları
  ├── navigation/        # Navigasyon yapılandırması
  ├── screens/           # Uygulama ekranları
  ├── translations/      # Çeviriler
  └── utils/             # Yardımcı fonksiyonlar
```

## Güvenlik ve Hassas Bilgiler

Bu repo halka açık olduğundan, güvenlik nedeniyle aşağıdaki adımlar alınmıştır:

1. iOS ve Android klasörleri kaldırılmıştır (platform-specific kodlar içerebilir)
2. Tüm API anahtarları, sertifikalar ve diğer hassas bilgiler çıkarılmıştır
3. Geliştirici kendi yerel ortamında bu dosyaları oluşturmalıdır

Geliştirme yaparken kendi API anahtarlarınızı ve yapılandırmalarınızı kullanın. Bunları asla repoya commit etmeyin.

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
