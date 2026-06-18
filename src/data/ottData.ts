/**
 * OTT Subscription Catalog and Management Source
 * Verified build for new production release.
 */
import { LOGO_IMAGES } from "./logos";

export interface OTTSubscription {
  id: string;
  name: string;
  price: number;
  duration: string;
  logoKey: string;
  benefits: string[];
  description: string;
  category: "entertainment" | "music" | "productivity";
  tagline: string;
}

export const OTT_SUBSCRIBERS: OTTSubscription[] = [
  {
    id: "youtube-premium",
    name: "YouTube Premium",
    price: 20,
    duration: "1 Month",
    logoKey: "youtube",
    tagline: "Ad-free videos, background play, and YouTube Music.",
    category: "entertainment",
    description: "Upgrade your YouTube experience. Watch videos uninterrupted by ads, keep playing them when you open other apps or lock your screen, and download videos to watch offline on your mobile device.",
    benefits: [
      "Ad-free YouTube & YouTube Kids",
      "Background Play: videos keep playing when using other apps",
      "Smart Downloads: save video files for offline mode",
      "Includes YouTube Music Premium subscription"
    ]
  },
  {
    id: "netflix-premium",
    name: "Netflix Premium 4K",
    price: 69,
    duration: "1 Month (TV/Mobile)",
    logoKey: "netflix",
    tagline: "Ultra HD streaming, spatial audio, and multiple screens.",
    category: "entertainment",
    description: "Get unlimited access to award-winning movies, TV shows, anime, documentaries, and more. Stream in Ultra HD 4K quality with dynamic HDR and immersive Netflix spatial audio formats.",
    benefits: [
      "Stunning Ultra HD (4K) and HDR video streaming",
      "Watch on up to 4 supported devices simultaneously",
      "Supported on TV, Mobile, Tablet, Laptop",
      "Ad-free experience with unlimited downloads"
    ]
  },
  {
    id: "spotify-premium",
    name: "Spotify Premium",
    price: 69,
    duration: "1 Month",
    logoKey: "spotify",
    tagline: "Unlimited ad-free music, offline play, and absolute high quality.",
    category: "music",
    description: "Get total access to over 100 million songs, offline storage, and high-fidelity 320kbps mobile listening. Skip tracks as much as you want with no advertisements interrupting your vibe.",
    benefits: [
      "Ad-free music listening with unlimited skips",
      "Download music directly for absolute offline play",
      "High-Fidelity audio (320kbps crystal clear)",
      "Collaborative playlist creation & group session modes"
    ]
  },
  {
    id: "jiohotstar-premium",
    name: "JioHotstar Premium",
    price: 110,
    duration: "1 Month",
    logoKey: "jio_hotstar",
    tagline: "Live sports, Disney+ Originals, blockbuster multiplexes.",
    category: "entertainment",
    description: "All-in-one entertainment hub. Watch high quality premium regional content, exclusive Disney+ Originals, latest Indian cinema multiplex releases, and non-stop live sports coverage.",
    benefits: [
      "Live Cricket, Football, Tennis, Formula 1, etc.",
      "Disney+ Originals, HBO Series, & Marvel shows",
      "Full HD 1080p high quality video streaming",
      "Support on Mobile, Laptop, and Smart TV"
    ]
  },
  {
    id: "jiohotstar-4k-premium",
    name: "JioHotstar 4K Premium",
    price: 159,
    duration: "1 Month",
    logoKey: "jio_hotstar",
    tagline: "The ultimate 4K movie and live sports cinematic feel.",
    category: "entertainment",
    description: "Step up to the absolute finest entertainment tier. Experience immersive Ultra HD 4K streaming resolution combined with premium audio, with multi-device flexibility.",
    benefits: [
      "Premium 4K Ultra HD video resolution",
      "Dolby Atmos multi-channel surround sound",
      "Watch on up to 4 devices simultaneously",
      "Ad-free experience on all premium show catalogues"
    ]
  },
  {
    id: "amazon-prime",
    name: "Amazon Prime Video",
    price: 149,
    duration: "1 Month",
    logoKey: "amazon_prime",
    tagline: "Exclusive Amazon Originals, global movies, and TV shows.",
    category: "entertainment",
    description: "Explore highly acclaimed Prime Originals, blockbuster global movies, regional Indian cinemas, and popular TV series. Watch seamlessly on any screen with smart X-Ray integration.",
    benefits: [
      "Prime exclusive films & award-winning global shows",
      "High definitions (1080p HD) and Dolby Digital Audio",
      "X-Ray detail overlay for cast & track listings",
      "Save video files directly for comfortable offline playback"
    ]
  },
  {
    id: "sony-liv",
    name: "Sony LIV Premium",
    price: 199,
    duration: "1 Month",
    logoKey: "sony_liv",
    tagline: "Top-tier Live sports, premium Sony shows, and movies.",
    category: "entertainment",
    description: "Stream premium sports like Champions League, Ashes cricket, and UFC matches live. Watch the latest regional movies, blockbuster original series, and daily popular television shows.",
    benefits: [
      "Live international sports (Football, Tennis, Cricket)",
      "Sony exclusive TV serials and original multiplex releases",
      "Stream in Full HD video with rich sounding quality",
      "Supported on TV and portable device screens"
    ]
  },
  {
    id: "crunchyroll-premium",
    name: "Crunchyroll Premium",
    price: 49,
    duration: "1 Month",
    logoKey: "crunchyroll",
    tagline: "Ad-free anime, fast offline downloads, and simulcast releases.",
    category: "entertainment",
    description: "The absolute home of anime. Stream thousands of premium subtitled and dubbed anime episodes without ads. Watch brand new episodes just 1 hour after their official broadcast in Japan.",
    benefits: [
      "Completely ad-free anime catalog streams",
      "Simulcast releases: episodes 1 hour after Japan broadcast",
      "Offline viewing downloads on up to 4 devices",
      "Access to premium digital manga libraries"
    ]
  },
  {
    id: "apple-music",
    name: "Apple Music",
    price: 130,
    duration: "1 Month",
    logoKey: "apple_music",
    tagline: "Lossless Audio and Dolby Atmos surround soundtrack streams.",
    category: "music",
    description: "Listen to over 100 million songs, completely ad-free. Experience premium spatial audio with dynamic head-tracking, custom daily playlist mixes, and download songs directly to your device.",
    benefits: [
      "100 million+ tracks of ad-free premium listening",
      "True Lossless Audio formats & Dolby Atmos Spatial Audio",
      "Live radio stations hosted by global music artists",
      "Download songs & playlists for high quality offline play"
    ]
  },
  {
    id: "gaana-plus",
    name: "Gaana Plus",
    price: 200,
    duration: "1 Month",
    logoKey: "gaana_plus",
    tagline: "Unlimited offline downloads, zero ads, high definition music.",
    category: "music",
    description: "Get the best of Indian and international tracks with Gaana Plus. Stream high definition audio formats, create custom tracks, read song lyrics as you listen, and play uninterrupted.",
    benefits: [
      "Ad-free commercial-free premium listening",
      "Unlimited song downloads for instant offline storage",
      "High definition audio quality streaming profile",
      "Real-time synchronized song lyrics display"
    ]
  },
  {
    id: "canva-pro",
    name: "Canva Pro",
    price: 250,
    duration: "1 Month",
    logoKey: "canva_pro",
    tagline: "Unlimited premium graphic elements, templates, and magic tools.",
    category: "productivity",
    description: "Design like a professional copywriter or graphic designer. Access over 100 million premium royalty-free photos, videos, audio clips, and template structures, and utilize AI-enhanced magic tools.",
    benefits: [
      "Unlimited premium asset files (Photos, Fonts, SVGs)",
      "Configurable brand kit styles and palette controls",
      "Magic Resize & background removal tools in one click",
      "Schedule content publishing across social media platforms"
    ]
  },
  {
    id: "chatgpt-premium",
    name: "ChatGPT Plus",
    price: 350,
    duration: "1 Month",
    logoKey: "chatgpt",
    tagline: "High capacity GPT-4o model access with fast responses.",
    category: "productivity",
    description: "Boost your productivity with ChatGPT Plus. Get high-priority access during peak load times, execute faster output generations, test GPT custom structures, and harness advanced data analytics tools.",
    benefits: [
      "Full priority access to high capabilities GPT-4o model",
      "Significantly faster response generation times",
      "Custom GPT models & DALL-E image prompt generations",
      "Advanced code execution, file analysis, and web search"
    ]
  }
];

export function getLogo(key: string): string {
  return LOGO_IMAGES[key] || "";
}

// Administrative Customization Getters and Setters (Saved securely in Local Storage)
export function getCustomPrice(id: string, defaultPrice: number): number {
  if (typeof window === "undefined") return defaultPrice;
  const saved = localStorage.getItem(`streamhub_price_${id}`);
  if (saved) {
    const parsed = parseFloat(saved);
    if (!isNaN(parsed)) return parsed;
  }
  return defaultPrice;
}

export function setCustomPrice(id: string, price: number): void {
  localStorage.setItem(`streamhub_price_${id}`, price.toString());
}

export function getCustomQrCode(): string {
  if (typeof window === "undefined") return "https://cdn.imageurlgenerator.com/uploads/b078839e-9a1c-45ee-9438-b4e5da61c61a.jpg";
  return localStorage.getItem("streamhub_qr_code") || "https://cdn.imageurlgenerator.com/uploads/b078839e-9a1c-45ee-9438-b4e5da61c61a.jpg";
}

export function setCustomQrCode(url: string): void {
  localStorage.setItem("streamhub_qr_code", url);
}

export function getCustomWhatsapp(): string {
  if (typeof window === "undefined") return "919024885265";
  return localStorage.getItem("streamhub_whatsapp") || "919024885265";
}

export function setCustomWhatsapp(num: string): void {
  localStorage.setItem("streamhub_whatsapp", num);
}

export function getUpdatedSubscribers(): OTTSubscription[] {
  return OTT_SUBSCRIBERS.map(sub => ({
    ...sub,
    price: getCustomPrice(sub.id, sub.price)
  }));
}

