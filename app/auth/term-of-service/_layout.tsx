import { View } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (    
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
        <Stack.Screen name="terms-of-service" options={{ headerShown: false }} />
      </Stack>
  );
}
