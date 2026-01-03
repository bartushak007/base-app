import { useColors } from "@/theme";
import { ThemeContextProvider } from "@/theme/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ThemeContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Image Details",
            headerRight: () => (
              <Text
                onPress={() => router.back()}
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.content[500],
                }}
              >
                Close
              </Text>
            ),
          }}
        />
      </Stack>
    </ThemeContextProvider>
  );
}
