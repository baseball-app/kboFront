import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Footer from "@/components/layout/Footer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={() => <Footer />}
    >
      {/* 캘린더 탭 화면 */}
      <Tabs.Screen name="index" />
      {/* 경기 일정 탭 화면 */}
      <Tabs.Screen name="match" />
      {/* 티켓 박스 탭 화면 */}
      <Tabs.Screen name="ticket" />
      {/* 알림 탭 화면 */}
      <Tabs.Screen name="alarm" />
      {/* 마이 페이지 탭 화면 */}
      <Tabs.Screen name="my" />
    </Tabs>
  );
}
