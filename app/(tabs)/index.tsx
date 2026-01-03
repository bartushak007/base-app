import { PermissionView } from "@/modules/gallery/PermissionView";
import { PhotoTile } from "@/modules/gallery/image";
import { usePhotoGallery } from "@/modules/gallery/usePhotoGallery";
import { useColors } from "@/theme";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View
} from "react-native";

export default function GalleryScreen() {
  const colors = useColors();
  const {
    hasPermission,
    requestPermission,

    assets,
    hasNextPage,
    loadingMore,
    refreshing,
    loadMore,
    refresh,
  } = usePhotoGallery();

  const footerLoading = loadingMore && hasNextPage && assets.length > 0;

  if (!hasPermission) {
    return <PermissionView requestPermission={requestPermission} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface[100] }]}>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <PhotoTile uri={item.uri} />}
        contentContainerStyle={styles.contentContainer}
        onEndReached={() => {
          if (hasNextPage && !loadingMore) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.content[500]}
          />
        }
        ListFooterComponent={
          footerLoading ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator size="small" color={colors.content[500]} />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 15,
    textAlign: "center",
  },
  footerLoading: {
    padding: 12,
  },
});
