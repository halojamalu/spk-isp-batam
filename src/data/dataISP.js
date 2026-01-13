export const ispData = [
  {
    id: 1,
    name: "Telkom IndiHome",
    logo: "🏢",
    description: "Provider terluas dengan coverage di seluruh Batam",
    criteria: {
      downloadSpeed: 50,
      uploadSpeed: 50,
      price: 380000,
      serviceQuality: 85,
      coverage: 95,
      stability: 98
    },
    // NEW: Coverage per area
    availableAreas: [
      "Batam Kota",
      "Nongsa",
      "Sekupang",
      "Batu Aji",
      "Lubuk Baja",
      "Sagulung",
      "Bengkong",
      "Sei Beduk"
    ],
    // NEW: Best for scenarios
    bestFor: ["keluarga", "kantor", "umum"],
    // NEW: User count recommendation
    recommendedUsers: "1-10 orang",
    // NEW: Package tiers
    packages: [
      { speed: "30 Mbps", price: 325000, name: "Paket 2P" },
      { speed: "50 Mbps", price: 380000, name: "Paket 3P" },
      { speed: "100 Mbps", price: 590000, name: "Paket Premium" }
    ]
  },
  {
    id: 2,
    name: "Biznet Home",
    logo: "⚡",
    description: "Internet super cepat dengan fiber optic",
    criteria: {
      downloadSpeed: 75,
      uploadSpeed: 75,
      price: 450000,
      serviceQuality: 90,
      coverage: 70,
      stability: 99
    },
    availableAreas: [
      "Batam Kota",
      "Nongsa",
      "Batu Ampar",
      "Baloi"
    ],
    bestFor: ["gaming", "streaming", "kantorBesar"],
    recommendedUsers: "3-15 orang",
    packages: [
      { speed: "50 Mbps", price: 330000, name: "Go Faster" },
      { speed: "75 Mbps", price: 450000, name: "Go Extreme" },
      { speed: "150 Mbps", price: 650000, name: "Go Ultimate" }
    ]
  },
  {
    id: 3,
    name: "MyRepublic",
    logo: "🚀",
    description: "Unlimited speed tanpa FUP untuk heavy users",
    criteria: {
      downloadSpeed: 100,
      uploadSpeed: 100,
      price: 400000,
      serviceQuality: 80,
      coverage: 60,
      stability: 96
    },
    availableAreas: [
      "Batam Kota",
      "Nongsa",
      "Baloi"
    ],
    bestFor: ["gaming", "streaming", "wfh"],
    recommendedUsers: "1-8 orang",
    packages: [
      { speed: "50 Mbps", price: 299000, name: "Gamer" },
      { speed: "100 Mbps", price: 400000, name: "Gamer Pro" },
      { speed: "200 Mbps", price: 699000, name: "Gamer Xtreme" }
    ]
  },
  {
    id: 4,
    name: "First Media",
    logo: "📡",
    description: "Bundling TV Cable & Internet hemat",
    criteria: {
      downloadSpeed: 50,
      uploadSpeed: 25,
      price: 350000,
      serviceQuality: 75,
      coverage: 65,
      stability: 95
    },
    availableAreas: [
      "Batam Kota",
      "Nongsa",
      "Sekupang"
    ],
    bestFor: ["keluarga", "umum"],
    recommendedUsers: "1-5 orang",
    packages: [
      { speed: "35 Mbps", price: 315000, name: "Fast 1" },
      { speed: "50 Mbps", price: 350000, name: "Fast 2" }
    ]
  },
  {
    id: 5,
    name: "CBN",
    logo: "🌐",
    description: "Provider dengan harga kompetitif",
    criteria: {
      downloadSpeed: 60,
      uploadSpeed: 30,
      price: 360000,
      serviceQuality: 78,
      coverage: 55,
      stability: 94
    },
    availableAreas: [
      "Batam Centre",
      "Nagoya"
    ],
    bestFor: ["keluarga", "umum"],
    recommendedUsers: "1-6 orang",
    packages: [
      { speed: "40 Mbps", price: 319000, name: "Paket A" },
      { speed: "60 Mbps", price: 360000, name: "Paket B" }
    ]
  },
  {
    id: 6,
    name: "Oxygen.id",
    logo: "💨",
    description: "Fiber optic berkualitas premium",
    criteria: {
      downloadSpeed: 100,
      uploadSpeed: 50,
      price: 500000,
      serviceQuality: 88,
      coverage: 50,
      stability: 97
    },
    availableAreas: [
      "Batam Kota",
      "Nongsa"
    ],
    bestFor: ["kantorBesar", "streaming"],
    recommendedUsers: "5-20 orang",
    packages: [
      { speed: "100 Mbps", price: 500000, name: "Oxygen Pro" },
      { speed: "200 Mbps", price: 800000, name: "Oxygen Max" }
    ]
  }
];