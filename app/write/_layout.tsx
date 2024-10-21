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
    >
      {/* 캘린더 탭 화면 */}
      <Tabs.Screen name="write" />
    </Tabs>
  );
}
