import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KaiStream",
    short_name: "KaiStream",
    description: "Premium anime streaming platform with immersive discovery and adaptive watch playback.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/brand/kaistream-mark.svg",
        sizes: "256x256",
        type: "image/svg+xml"
      }
    ]
  };
}
