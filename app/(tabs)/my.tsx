import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import {
  moderateScale,
  horizontalScale,
  verticalScale,
  scaleFontSize,
  } from "../../utils/metrics";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>

        <View style={styles.profileImageBox}>
          <Image
            source={require("../../assets/profile_images/glove.png")}
            style={styles.profileImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.profileInfoBox}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>최강야구님</Text>
            <Ionicons name="checkmark-circle" size={24} color="blue" />
          </View>
          <View style={styles.winRateContainer}>
            <Text style={styles.winRateLabel}>승요력</Text>
            <Text style={styles.winRateValue}>76%</Text>
          </View>
        </View>
      </View>

      <View style={styles.teamCard}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamLogo}>SL</Text>
          <Text style={styles.teamName}>삼성 라이온즈</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statItem, styles.statBox]}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>팔로워</Text>
        </View>
        <View style={[styles.statItem, styles.statBox]}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>팔로잉</Text>
        </View>
        <View style={[styles.statItem, styles.statBox]}>
          <Ionicons name="card-outline" size={24} color="black" />
          <Text style={styles.statLabel}>초대코드</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>로그아웃</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>회원탈퇴</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    // paddingVertical: 10,
  },
  profileImageBox: {
    backgroundColor: "#F3F2EE",
    width: horizontalScale(80),
    height: verticalScale(80),
    borderRadius: moderateScale(50),
    marginRight: horizontalScale(18),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: moderateScale(0.8), 
    borderColor: "#D0CEC7",
  },
  profileImage: {
    width: horizontalScale(46.44),
    height: verticalScale(50.57),
    backgroundColor: "#F5F5F5", // Light background color
  },
  profileInfo: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  profileInfoBox: {
    // paddingTop: verticalScale(6),
    // paddingBottom: verticalScale(7),
    
    gap: verticalScale(10),
    // flex:1,
    justifyContent: 'center',
    
    flexDirection: "column",
  },
  profileName: {
    fontSize: scaleFontSize(20),
    fontWeight: "bold",
  },
  winRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  winRateLabel: {
    fontSize: scaleFontSize(16),
    marginRight: verticalScale(3),
    color: "gray",
  },
  winRateValue: {
    fontSize: scaleFontSize(16),
    color: "#2D68FF", // Blue color for the percentage
    fontWeight: "bold",
  },
  teamCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  teamLogo: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  teamName: {
    fontSize: scaleFontSize(16),
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    margin: 20,
    gap: horizontalScale(12),
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statBox: {
    backgroundColor: "white",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: "100%",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  statValue: {
    fontSize: scaleFontSize(18),
    fontWeight: "bold",
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: scaleFontSize(14),
    color: "gray",
  },
  menuContainer: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: 'space-between',
    backgroundColor: "white",
    padding: 15,
    marginVertical: 1,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 1,
  },
  menuText: {
    fontSize: 16,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfileScreen;
