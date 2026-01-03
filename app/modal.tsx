import { useColors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Params = {
  uri?: string;
  filename?: string;
  width?: string;
  height?: string;
  creationTime?: string;
};

const safeNumber = (value?: string) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

export default function ModalScreen() {
  const colors = useColors();
  const router = useRouter();
  const { uri, filename, width, height, creationTime } =
    useLocalSearchParams<Params>();

  const widthNum = safeNumber(width);
  const heightNum = safeNumber(height);
  const creationDate = React.useMemo(() => {
    const timestamp = safeNumber(creationTime);
    if (!timestamp) return null;
    return new Date(timestamp * 1000);
  }, [creationTime]);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface[100] }]}>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={8}
          style={[
            styles.closeButton,
            {
              borderColor: colors.surface[200],
              backgroundColor: colors.surface[100],
            },
          ]}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={20} color={colors.content[500]} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface[300],
            borderColor: colors.surface[200],
            shadowColor: colors.content[500],
          },
        ]}
      >
        {uri ? (
          <Image source={{ uri }} style={styles.media} />
        ) : (
          <View
            style={[
              styles.mediaFallback,
              { backgroundColor: colors.surface[300] },
            ]}
          >
            <Text
              style={[styles.mediaFallbackText, { color: colors.content[300] }]}
            >
              No photo selected
            </Text>
          </View>
        )}

        <View style={styles.details}>
          <Text
            style={[styles.title, { color: colors.content[500] }]}
            numberOfLines={1}
          >
            {filename || "Untitled"}
          </Text>
          <Text style={[styles.meta, { color: colors.content[400] }]}>
            {widthNum && heightNum
              ? `${widthNum} × ${heightNum}`
              : "Unknown size"}
          </Text>
          {creationDate ? (
            <Text style={[styles.meta, { color: colors.content[300] }]}>
              {creationDate.toLocaleString()}
            </Text>
          ) : (
            <Text style={[styles.meta, { color: colors.content[300] }]}>
              Unknown capture time
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  media: {
    width: "100%",
    height: 320,
  },
  mediaFallback: {
    width: "100%",
    height: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaFallbackText: {
    fontSize: 15,
  },
  details: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  meta: {
    fontSize: 14,
  },
  closeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
});
