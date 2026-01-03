import { useColors } from "@/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PermissionView = ({
  requestPermission,
}: {
  requestPermission: () => void;
}) => {
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface[100], paddingHorizontal: 24 },
      ]}
    >
      <Text style={[styles.text, { color: colors.content[500] }]}>
        Allow access to your photos to view Gallery.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.content[500] }]}
        onPress={requestPermission}
      >
        <Text style={[styles.buttonText, { color: colors.surface[100] }]}>
          Grant access
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    fontWeight: "600",
  },
});
