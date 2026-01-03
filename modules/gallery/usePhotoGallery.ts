import * as MediaLibrary from "expo-media-library";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 30;

type Permission = MediaLibrary.PermissionResponse | null;

export const usePhotoGallery = () => {
  const [permission, setPermission] = useState<Permission>(null);
  const requestPermission = useCallback(async () => {
    const res = await MediaLibrary.requestPermissionsAsync();
    setPermission(res);
    return res.granted;
  }, []);

  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);

  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const loadingRef = useRef(false);
  const didInitialLoad = useRef(false);

  const ensurePermission = useCallback(async () => {
    if (permission) {
      return permission.granted;
    }
    return requestPermission();
  }, [permission, requestPermission]);

  const loadPage = useCallback(
    async (reset = false) => {
      if (loadingRef.current) return;

      const hasPermission = await ensurePermission();
      if (!hasPermission) return;

      loadingRef.current = true;
      reset ? setLoadingInitial(true) : setLoadingMore(true);
      try {
        const result = await MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.photo,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          first: PAGE_SIZE,
          after: reset ? undefined : endCursor ?? undefined,
        });

        setAssets((prev) => {
          if (reset) return result.assets;
          const existingIds = new Set(prev.map((asset) => asset.id));
          const newAssets = result.assets.filter(
            (asset) => !existingIds.has(asset.id)
          );
          return [...prev, ...newAssets];
        });
        setEndCursor(result.endCursor ?? null);
        setHasNextPage(result.hasNextPage);
      } finally {
        loadingRef.current = false;
        reset ? setLoadingInitial(false) : setLoadingMore(false);
      }
    },
    [endCursor, ensurePermission]
  );

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const refresh = useCallback(async () => {
    if (refreshing || loadingRef.current) return;
    setRefreshing(true);
    await loadPage(true);
    setRefreshing(false);
  }, [loadPage, refreshing]);

  useEffect(() => {
    if (permission?.granted) {
      if (!didInitialLoad.current) {
        didInitialLoad.current = true;
        loadPage(true);
      }
    }
  }, [permission?.granted, loadPage]);

  return {
    hasPermission: !!permission?.granted,
    requestPermission,

    loadingInitial,
    assets,

    loadingMore,
    hasNextPage,
    loadMore: () => loadPage(false),

    refresh,
    refreshing,
  };
};
