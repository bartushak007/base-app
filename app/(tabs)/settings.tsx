import { useColors, useThemeContext } from "@/theme";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const colors = useColors();
  const theme = useThemeContext();

  return (
    <View style={[styles.content, { backgroundColor: colors.surface[100] }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.content[500] }]}>
          Dark mode
        </Text>
        <Switch
          value={theme?.mode === "dark"}
          onValueChange={theme?.toggleMode}
          trackColor={{
            false: colors.surface[500],
            true: colors.surface[500],
          }}
          thumbColor={colors.content[500]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
