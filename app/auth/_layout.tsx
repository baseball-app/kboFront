
  import { useEffect } from "react";
  
  import { Stack } from "expo-router";
  
  export default function RootLayout() {

    return (
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          {/* <Stack.Screen name="+not-found" /> */}
          <Stack.Screen name="nickname" options={{ headerShown: false }} />
        </Stack>
    );
  }
  