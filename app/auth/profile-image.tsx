import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {DEFAULT_PROFILE_IMAGE, PROFILE_IMAGES} from '@/constants/join'

export default function ProfileImageScreen() {
    const {profile, setProfile, moveToNextStep, moveToPrevStep} = useUserJoin()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={moveToPrevStep}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>프로필 이미지를{'\n'}선택해주세요</Text>
                <Text style={styles.subtitle}>내가 응원하는 선수의 포지션에 맞는{'\n'}이미지를 선택해도 좋아요.</Text>
                <View style={styles.selectedImageContainer}>
                    <View style={styles.selectedImageWrapper}>
                        <Image
                            source={!profile ? DEFAULT_PROFILE_IMAGE : profile.image}
                            style={styles.selectedImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={styles.imagesGrid}>
                    {PROFILE_IMAGES.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.imageButton, profile?.id === item.id && styles.selectedImageButton]}
                            onPress={() => setProfile(item)}>
                            <View
                                style={[
                                    styles.imageOptionWrapper,
                                    profile?.id === item.id && styles.selectedImageOptionWrapper,
                                ]}>
                                <Image source={item.image} style={styles.imageOption} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.nextButton, Boolean(profile) && styles.nextButtonActive]}
                    onPress={moveToNextStep}>
                    <Text style={[styles.nextButtonText, Boolean(profile) && styles.nextButtonTextActive]}>
                        시작하기
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF3',
    },
    header: {
        paddingHorizontal: 16,
    },
    backButton: {
        marginBottom: 30,
    },
    content: {
        paddingHorizontal: 16,
        flex: 1,
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
        transform: [{scale: 1.1}],
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
    },
})
