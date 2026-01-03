import { useColors } from "@/theme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  uri?: string;
  onPress?: () => void;
};

export const PhotoTile = ({ uri, onPress }: Props) => {
  const colors = useColors();

  return (
    <View style={styles.mediaBoxWrapper}>
      <TouchableOpacity
        style={styles.mediaBox}
        activeOpacity={0.8}
        onPress={onPress}
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
            <Text style={[styles.infoText, { color: colors.content[300] }]}>
              N/A
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaBoxWrapper: {
    flex: 1,
    aspectRatio: 1,
    padding: 2,
  },
  mediaBox: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  mediaFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
  },
});
