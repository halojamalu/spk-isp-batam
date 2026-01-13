export const criteriaConfig = [
  {
    code: 'downloadSpeed',
    name: 'Kecepatan Download',
    unit: 'Mbps',
    type: 'benefit',
    defaultWeight: 0.25,
    icon: '⬇️',
    description: 'Kecepatan unduh rata-rata'
  },
  {
    code: 'uploadSpeed',
    name: 'Kecepatan Upload',
    unit: 'Mbps',
    type: 'benefit',
    defaultWeight: 0.20,
    icon: '⬆️',
    description: 'Kecepatan unggah rata-rata'
  },
  {
    code: 'price',
    name: 'Harga Paket',
    unit: 'Rp',
    type: 'cost',
    defaultWeight: 0.25,
    icon: '💰',
    description: 'Biaya langganan per bulan'
  },
  {
    code: 'serviceQuality',
    name: 'Kualitas Layanan',
    unit: 'Skor',
    type: 'benefit',
    defaultWeight: 0.15,
    icon: '⭐',
    description: 'Rating customer service'
  },
  {
    code: 'coverage',
    name: 'Coverage Area',
    unit: '%',
    type: 'benefit',
    defaultWeight: 0.10,
    icon: '📍',
    description: 'Jangkauan wilayah Batam'
  },
  {
    code: 'stability',
    name: 'Stabilitas Koneksi',
    unit: '%',
    type: 'benefit',
    defaultWeight: 0.05,
    icon: '🔒',
    description: 'Uptime percentage'
  }
];

// Helper function untuk format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Helper function untuk format percentage
export const formatPercentage = (value) => {
  return `${value}%`;
};