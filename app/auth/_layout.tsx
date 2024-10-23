
import {useRef} from "react";
import { Stack} from "expo-router";

export default function RootLayout() {

  // const navigationRef = useRef(null);

  // console.log(navigationRef);
  
  return (

      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="term-of-service" options={{ headerShown: false }} />
        <Stack.Screen name="nickname" options={{ headerShown: false }} />
        <Stack.Screen name="my-team" options={{ headerShown: false }} />
        <Stack.Screen name="profile-image" options={{ headerShown: false }} />
      </Stack>
  );
}
