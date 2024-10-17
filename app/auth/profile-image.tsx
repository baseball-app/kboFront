import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const profileImages = [
  { id: 0, image: require('../../assets/profile_images/profile.png') },
  { id: 1, image: require('../../assets/profile_images/ball.png') },
  { id: 2, image: require('../../assets/profile_images/bat.png') },
  { id: 3, image: require('../../assets/profile_images/glove.png') },
];

export default function ProfileImageScreen() {
  const [selectedImage, setSelectedImage] = useState(profileImages[0]);
  const router = useRouter();

  const handleImageSelect = (image: any) => {
    setSelectedImage(image);
  };

  const handleNext = () => {
    if (selectedImage) {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>프로필 이미지를{'\n'}선택해주세요</Text>
        <Text style={styles.subtitle}>내가 응원하는 선수의 포지션에 맞는{'\n'}이미지를 선택해도 좋아요.</Text>
        <View style={styles.selectedImageContainer}>
          <View style={styles.selectedImageWrapper}>
            <Image source={!selectedImage.image ? require('../../assets/profile_images/profile.png') : selectedImage.image} style={styles.selectedImage} resizeMode='contain'/>
          </View>
        </View>
        <View style={styles.imagesGrid}>
          {profileImages.filter(item => item.id !== 0).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.imageButton,
                selectedImage.id === item.id && styles.selectedImageButton
              ]}
              onPress={() => handleImageSelect(item)}
            >
              <View style={[
                styles.imageOptionWrapper,
                selectedImage.id === item.id && styles.selectedImageOptionWrapper
              ]}>
                <Image source={item.image} style={styles.imageOption}/>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, selectedImage.id !== 0 && styles.nextButtonActive]}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, selectedImage.id !== 0 && styles.nextButtonTextActive]}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImageWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '70%',
    height: '70%',
  },
  imagesGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageButton: {
    marginHorizontal: 10,
  },
  selectedImageButton: {
    transform: [{ scale: 1.1 }],
  },
  imageOptionWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImageOptionWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#353430',
  },
  imageOption: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  imageDimensions: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#E4E2DC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#77756C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonActive: {
    backgroundColor: '#1E5EF4',
  },
  nextButtonTextActive: {
    color: '#FFFFFF',
  }
});

