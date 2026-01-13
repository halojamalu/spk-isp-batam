export const useCases = [
  {
    value: "keluarga",
    label: "Keluarga (Browsing, Streaming)",
    icon: "👨‍👩‍👧‍👦",
    weights: {
      downloadSpeed: 0.25,
      uploadSpeed: 0.10,
      price: 0.35,
      serviceQuality: 0.15,
      coverage: 0.10,
      stability: 0.05
    }
  },
  {
    value: "wfh",
    label: "Work From Home",
    icon: "💼",
    weights: {
      downloadSpeed: 0.20,
      uploadSpeed: 0.25,
      price: 0.20,
      serviceQuality: 0.15,
      coverage: 0.10,
      stability: 0.10
    }
  },
  {
    value: "gaming",
    label: "Gaming & E-sports",
    icon: "🎮",
    weights: {
      downloadSpeed: 0.35,
      uploadSpeed: 0.20,
      price: 0.15,
      serviceQuality: 0.10,
      coverage: 0.05,
      stability: 0.15
    }
  },
  {
    value: "streaming",
    label: "Streaming (YouTube, Netflix)",
    icon: "📺",
    weights: {
      downloadSpeed: 0.40,
      uploadSpeed: 0.15,
      price: 0.20,
      serviceQuality: 0.10,
      coverage: 0.05,
      stability: 0.10
    }
  },
  {
    value: "kantor",
    label: "Kantor Kecil (5-10 orang)",
    icon: "🏢",
    weights: {
      downloadSpeed: 0.20,
      uploadSpeed: 0.20,
      price: 0.25,
      serviceQuality: 0.20,
      coverage: 0.05,
      stability: 0.10
    }
  },
  {
    value: "kantorBesar",
    label: "Kantor Besar (10+ orang)",
    icon: "🏗️",
    weights: {
      downloadSpeed: 0.25,
      uploadSpeed: 0.25,
      price: 0.15,
      serviceQuality: 0.20,
      coverage: 0.05,
      stability: 0.10
    }
  },
  {
    value: "umum",
    label: "Penggunaan Umum",
    icon: "🌐",
    weights: {
      downloadSpeed: 0.25,
      uploadSpeed: 0.20,
      price: 0.25,
      serviceQuality: 0.15,
      coverage: 0.10,
      stability: 0.05
    }
  }
];

export const userCounts = [
  { value: "1-2", label: "1-2 orang" },
  { value: "3-5", label: "3-5 orang" },
  { value: "6-10", label: "6-10 orang" },
  { value: "10+", label: "Lebih dari 10 orang" }
];

export const priorities = [
  {
    value: "harga",
    label: "Harga Murah",
    icon: "💰",
    color: "green",
    description: "Prioritas budget hemat",
    weightAdjustment: {
      price: 0.50,
      downloadSpeed: 0.20,
      uploadSpeed: 0.10,
      serviceQuality: 0.10,
      coverage: 0.05,
      stability: 0.05
    }
  },
  {
    value: "kecepatan",
    label: "Kecepatan",
    icon: "⚡",
    color: "yellow",
    description: "Internet super cepat",
    weightAdjustment: {
      downloadSpeed: 0.40,
      uploadSpeed: 0.30,
      price: 0.10,
      serviceQuality: 0.10,
      coverage: 0.05,
      stability: 0.05
    }
  },
  {
    value: "keandalan",
    label: "Keandalan",
    icon: "🛡️",
    color: "blue",
    description: "Stabil dan reliable",
    weightAdjustment: {
      stability: 0.30,
      serviceQuality: 0.25,
      downloadSpeed: 0.20,
      uploadSpeed: 0.15,
      coverage: 0.05,
      price: 0.05
    }
  }
];