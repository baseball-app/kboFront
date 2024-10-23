import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>

        <View>
          <Text style={styles.headerTitle}>이용약관</Text>
          <Text style={styles.paragraph}>
            이 이용약관(이하 "본 약관")은 오늘의 야구 (이하 "회사")가 제공하는 오늘의 야구-야구 모바일 애플리케이션 및 관련 서비스 (이하 "서비스")의 이용 조건을 정하는 것을 목적으로 합니다. 이 약관은 회사와 이용자 사이의 권리와 의무를 규정하며, 서비스 이용 시 준수해야 할 사항을 안내합니다
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>
            1. 약관의 효력과 변경 항목 및 수집 방법
          </Text>
          <Text style={styles.paragraph}>
            1.1. 이 약관은 서비스를 이용하고자 하는 모든 사용자에게 적용됩니다. {"\n"}
            1.2. 회사는 필요한 경우 본 약관을 변경할 수 있습니다. 변경된 약관은 서비스 내 공지사항을 통해 공지됩니다. 변경된 약관은 공지 후 이용자에게 통지되며, 이 기간 내에 약관 변경에 대한 이의를 제기하지 않은 이용자는 변경된 약관에 동의한 것으로 간주됩니다.
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>
            2. 서비스 이용
          </Text>
          <Text style={styles.paragraph}>
            2.1. 이용자는 서비스를 약관 및 관련 법률, 규정을 준수하여 사용해야 합니다. {"\n"}
            2.2. 서비스 내에서 무단으로 다른 이용자의 개인정보를 수집하거나 제3자의 권리를 침해하는 행위는 금지됩니다. {"\n"}
            2.3. 서비스 이용 중에 발생하는 모든 활동에 대한 책임은 이용자 본인에게 있습니다.
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>
            3. 개인정보 처리
          </Text>
          <Text style={styles.paragraph}>
            3.1. 회사는 개인정보 보호 정책에 따라 이용자의 개인정보를 처리합니다. 자세한 내용은 회사의 개인정보 보호 정책을 확인하시기 바랍니다.
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>4. 책임과 면책</Text>
          <Text style={styles.paragraph}>
          4.1. 회사는 서비스 제공과 관련하여 합리적인 주의를 기울이겠지만, 다음과 같은 상황에서 발생하는 손해에 대해 책임지지 않습니다.
          </Text>
          <Text style={styles.bulletPoint}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.bulletText}>
              {" "}서비스 이용으로 인한 직접적인 또는 간접적인 손해
            </Text>
          </Text>
          <Text style={styles.bulletPoint}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.bulletText}>
              {" "}서비스 내 정보의 정확성, 완전성, 신뢰성 등에 관한 손해 4.2. 이용자가 서비스 이용으로 다른 이용자 또는 제3자에게 손해를 입힌 경우, 이용자는 해당 손해를 배상할 책임이 있습니다.
            </Text>
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>5. 계약의 해지</Text>
          <Text style={styles.paragraph}>
            5.1. 이용자는 언제든지 본 약관 및 회사의 정책에 따라 서비스 이용 계약을 해지할 수 있습니다. {"\n"}
            5.2. 회사는 이용자가 본 약관 또는 관련 법률, 규정을 위반한 경우 이용 계약을 해지할 수 있습니다.
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>6. 지적재산권</Text>
          <Text style={styles.paragraph}>
            6.1. 서비스 내에 포함된 콘텐츠 및 자료의 지적재산권은 회사에 소유권이 있습니다.  {"\n"}
            6.2. 이용자는 회사의 사전 승인 없이 서비스 내 콘텐츠 및 자료를 무단으로 복제, 수정, 배포 등의 행위를 하여서는 안 됩니다.
          </Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>7. 준거법 및 분쟁해결</Text>
          <Text style={styles.paragraph}>
            7.1. 본 약관의 해석과 관련하여 발생하는 분쟁은 관련 법률에 따라 해결됩니다.  {"\n"}
            7.2. 서비스 이용으로 발생하는 분쟁은 회사와 이용자 간의 협의를 통해 해결하려 노력해야 합니다.
          </Text>
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.agreeButton}>
        <Text style={styles.agreeButtonText}>동의하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    // borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    // marginBottom: 16,
  },
  agreeButton: {
    backgroundColor: "#1A73E8",
    padding: 16,
    alignItems: "center",
    margin: 16,
    borderRadius: 8,
  },
  agreeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bulletPoint: {
    flexDirection: "row",
    marginLeft: 10,
    // marginBottom: 10,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;
