import React from 'react';

function ResultCard({ ranking, ispData }) {
  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-600 text-white';
    return 'bg-blue-500 text-white';
  };

  const getRankEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  const getFullISPData = (rankItem) => {
    return ispData.find(isp => isp.id === rankItem.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🏆 Hasil Ranking ISP
      </h2>

      {/* Top Recommendation */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 mb-6 text-white">
        <h3 className="text-xl font-bold mb-2">
          ⭐ Rekomendasi Terbaik
        </h3>
        <p className="text-3xl font-bold">
          {ranking[0].name}
        </p>
        <p className="text-lg mt-2">
          Nilai Preferensi: {(ranking[0].preferenceValue * 100).toFixed(2)}%
        </p>
      </div>

      {/* All Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ranking.map(item => {
          const fullData = getFullISPData(item);
          
          return (
            <div
              key={item.id}
              className={`border-2 rounded-lg p-4 transition-all hover:shadow-lg ${
                item.rank <= 3 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              {/* Rank Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`${getRankBadgeColor(item.rank)} px-3 py-1 rounded-full font-bold text-sm`}>
                  {getRankEmoji(item.rank)} Rank #{item.rank}
                </span>
                <span className="text-3xl">{fullData?.logo}</span>
              </div>

              {/* ISP Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {item.name}
              </h3>

              {/* Preference Value */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Nilai Preferensi</span>
                  <span className="font-semibold">
                    {item.preferenceValue.toFixed(4)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${item.preferenceValue * 100}%` }}
                  />
                </div>
              </div>

              {/* Distance Info */}
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>D+ (Ideal Positif):</span>
                  <span>{item.distancePositive.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>D- (Ideal Negatif):</span>
                  <span>{item.distanceNegative.toFixed(4)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultCard;