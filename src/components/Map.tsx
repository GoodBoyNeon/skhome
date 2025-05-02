"use client";

import { useCallback, useState } from "react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { env } from "@/data/env/server";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.GOOGLE_API_KEY ?? "",
  });

  const [_map, setMap] = useState<unknown | null>(null);

  const onLoad = useCallback((map: unknown) => {
    const bounds = new window.google.maps.LatLngBounds();

    if (
      map &&
      typeof map === "object" &&
      "fitBounds" in map &&
      typeof map.fitBounds === "function"
    ) {
      map.fitBounds(bounds);
    }

    setMap(map);
  }, []);

  const onUnmount = useCallback((_map: unknown) => {
    setMap(null);
  }, []);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      )}
    </>
  );
}
