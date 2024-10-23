import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const TermUseScreen = () => {
  const [agreements, setAgreements] = useState([
    { id: 1, text: '필수 약관 모두 동의', checked: false },
    { id: 2, text: '(필수) 오늘의 야구 이용약관', checked: false },
    { id: 3, text: '(필수) 오늘의 야구 개인정보 수집 및\n이용에 대한 동의', checked: false },
  ]);

  const toggleAgreement = (id: number) => {
    if (id === 1) {
      // If the first agreement is clicked, toggle all agreements

      console.log("checking aggreements.checked ", agreements[0].checked);
      const newCheckedState = !agreements[0].checked;
      setAgreements(agreements.map(agreement => ({ ...agreement, checked: newCheckedState })));
    } 
    else if (id === 2) {

        router.push('/auth/term-of-service/privacy-policy');
      // For other agreements, toggle only the clicked one
    //   setAgreements(agreements.map(agreement => 
    //     agreement.id === id ? { ...agreement, checked: !agreement.checked } : agreement
    //   ));
    }
    else if (id === 3) {
        
        router.push('/auth/term-of-service/terms-of-service');

    };
}   

  const allChecked = agreements.every(agreement => agreement.checked);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.navigate('/auth/login')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>오늘의 야구{'\n'}서비스 이용에 동의해{'\n'}주세요</Text>
      </View>

      <View style={styles.content}>
      {agreements.map((agreement) => (
        <TouchableOpacity 
          key={agreement.id} 
          style={styles.agreementItem}
          onPress={() => toggleAgreement(agreement.id)}
        >
          {/* <Ionicons 
            name={agreement.checked ? "checkmark-circle" : "ellipse-outline"} 
            size={24} 
            color={agreement.checked ? "#1E5EF4" : "#D1D1D6"} 
          /> */}
            <View style={[styles.circle, agreement.checked && styles.checkedCircle]}>
                <Image source={require('../../../assets/icons/check.png')} style={styles.checkIcon} />
                </View>
          <Text style={styles.agreementText}>{agreement.text}</Text>
          {agreement.id !== 1 && (
            <Ionicons name="chevron-forward" size={24} color="#D1D1D6" style={styles.chevron} />
          )}
        </TouchableOpacity>
      ))}
      <TouchableOpacity 
        style={[styles.agreeButton, allChecked && styles.agreeButtonActive]}
        onPress={() => allChecked && router.push('/auth/nickname')}
        disabled={!allChecked}
      >
          <Text style={[styles.agreeButtonText, allChecked && styles.agreeButtonTextActive]}>동의하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
    // paddingHorizontal: 20,
  },
  header: {
    paddingHorizontal: 16,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 50, // Half of width/height
    backgroundColor: '#D1D1D6',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  checkedCircle: {
    backgroundColor: '#353430',
  },
  checkIcon: {
    // position: 'absolute',
    width: 10.29,
    height: 6.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 10,
  },
  backButton: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  agreementText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  chevron: {
    marginLeft: 'auto',
  },
  agreeButton: {
    backgroundColor: '#E4E2DC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  agreeButtonActive: {
    backgroundColor: '#1E5EF4',
  },
  agreeButtonText: {
    color: '#77756C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  agreeButtonTextActive: {
    color: '#FFFFFF',
  },
});

export default TermUseScreen;
