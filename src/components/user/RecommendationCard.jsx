import React from 'react';

function RecommendationCard({ results, preferences }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Empty state
  if (!results) {
    return (
      <div className="bg-white rounded-card shadow-card p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Rekomendasi untuk Anda
        </h3>
        <p className="text-gray-500">
          Silakan isi preferensi Anda untuk mendapatkan rekomendasi ISP terbaik
        </p>
      </div>
    );
  }

  const topISP = results.ranking[0];
  const topISPData = results.ispDataMap[topISP.id];

  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-primary">🎯</span>
        Rekomendasi untuk Anda
      </h2>

      {/* Top Recommendation */}
      <div className="bg-primary-bg border-2 border-primary rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl">{topISPData.logo}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                #1 TERBAIK
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {topISP.name}
            </h3>
            <p className="text-sm text-gray-600">
              {topISPData.description}
            </p>
          </div>
        </div>

        {/* Score */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Skor Kesesuaian
            </span>
            <span className="text-2xl font-bold text-primary">
              {(topISP.preferenceValue * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${topISP.preferenceValue * 100}%` }}
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Kecepatan</div>
            <div className="font-bold text-gray-800">
              {topISPData.criteria.downloadSpeed} Mbps
            </div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Harga</div>
            <div className="font-bold text-gray-800">
              {formatCurrency(topISPData.criteria.price)}
            </div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Rating Layanan</div>
            <div className="font-bold text-gray-800">
              {topISPData.criteria.serviceQuality}/100
            </div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Stabilitas</div>
            <div className="font-bold text-gray-800">
              {topISPData.criteria.stability}%
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all">
          Lihat Detail & Paket
        </button>
      </div>

      {/* Other Options */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">
          Pilihan Lainnya
        </h4>
        <div className="space-y-3">
          {results.ranking.slice(1, 4).map((isp, index) => {
            const ispData = results.ispDataMap[isp.id];
            return (
              <div
                key={isp.id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{ispData.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">
                        #{index + 2}
                      </span>
                      <h4 className="font-bold text-gray-800">
                        {isp.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>⚡ {ispData.criteria.downloadSpeed} Mbps</span>
                      <span>💰 {formatCurrency(ispData.criteria.price)}</span>
                      <span className="text-primary font-semibold">
                        {(isp.preferenceValue * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Button */}
      <button className="w-full mt-4 border-2 border-gray-300 hover:border-primary text-gray-700 font-semibold py-3 rounded-lg transition-all">
        Lihat Semua ISP (6)
      </button>
    </div>
  );
}

export default RecommendationCard;