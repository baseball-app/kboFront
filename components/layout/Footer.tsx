import { router_address } from "@/constants/router";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Footer Tab Menu 컴포넌트 */
const Footer = () => {
  const router = useRouter();
  const segments = useSegments();

  return (
    <SafeAreaView edges={["bottom"]} style={styles.footerContainer}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => {
              router.push(router_address.TAB.CALENDAR);
            }}
            style={styles.tabButton}
          >
            <Image
              source={
                segments.length === 1
                  ? require("@/assets/icons/tabMenu/calendarMenuActive.png")
                  : require("@/assets/icons/tabMenu/calendarMenu.png")
              }
              style={styles.tabImg}
            />
            <Text style={styles.tabText}>캘린더</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => {
              router.push(router_address.TAB.MATCH);
            }}
          >
            <Image
              source={
                segments[1] === "match"
                  ? require("@/assets/icons/tabMenu/gameMatchMenuActive.png")
                  : require("@/assets/icons/tabMenu/gameMatchMenu.png")
              }
              style={styles.tabImg}
              resizeMode="contain"
            />
            <Text style={styles.tabText}>경기 일정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/alarm`)}
            style={styles.tabButton}
          >
            <Image
              source={require("@/assets/icons/tabMenu/alarmMenu.png")}
              style={styles.tabImg}
              resizeMode="contain"
            />
            <Text style={styles.tabText}>알람</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/ticket`)}
            style={styles.tabButton}
          >
            <Image
              source={require("@/assets/icons/tabMenu/ticketMenu.png")}
              resizeMode="contain"
              style={styles.tabImg}
            />
            <Text style={styles.tabText}>티켓박스</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/my`)}
            style={styles.tabButton}
          >
            <Image
              source={require("@/assets/icons/tabMenu/myMenu.png")}
              style={styles.tabImg}
              resizeMode="contain"
            />
            <Text style={styles.tabText}>마이</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

/** Footer Tab Menu Style Css */
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#fff",
  },
  container: {
    height: 68,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
  },
  tabButton: {
    flexDirection: "column",
    alignItems: "center",
    width: 51,
    height: "100%",
    justifyContent: "center",
  },
  tabImg: {
    height: 24,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#171716",
  },
});

export default Footer;
