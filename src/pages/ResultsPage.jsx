import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecommendationCard from '../components/user/RecommendationCard';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  // Redirect if no results
  if (!results || !results.ranking) {
    navigate('/');
    return null;
  }

  const ranking = results.ranking || [];
  const preferences = results.preferences || {};
  const ispDataMap = results.ispDataMap || {};
  const allISPMap = results.allISPMap || {};

  // Safety check: ensure ranking has items
  if (ranking.length === 0) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-card p-8 max-w-md">
          <p className="text-gray-800 font-semibold text-lg mb-4">
            Tidak ada ISP yang tersedia
          </p>
          <p className="text-gray-600 mb-6">
            Mohon coba dengan lokasi atau budget yang berbeda.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const topResult = ranking[0];
  const otherResults = ranking.slice(1, 4);
  
  // Try multiple sources for ISP data
  let topISP = ispDataMap[topResult.id] || allISPMap[topResult.id];
  
  if (!topISP) {
    // Last resort: use topResult itself if it has criteria
    console.warn('ISP data not found in maps, using topResult');
    topISP = topResult;
  }

  // Ensure topISP has all required fields
  const completeTopISP = {
    id: topResult.id,
    name: topResult.name || topISP.name,
    criteria: topISP.criteria || {},
    description: topISP.description || `${topResult.name} - Internet Service Provider`,
    availableAreas: topISP.availableAreas || [],
    preferenceValue: topResult.preferenceValue,
    rank: topResult.rank,
    distancePositive: topResult.distancePositive || 0,
    distanceNegative: topResult.distanceNegative || 0
  };

  console.log('=== FINAL TOP ISP ===');
  console.log(completeTopISP);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            📊 Hasil Rekomendasi ISP
          </h1>
          <p className="text-gray-600 mt-1">
            Berdasarkan preferensi dan kebutuhan Anda
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Preference Summary */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="font-semibold text-gray-800 mb-4">
              📋 Preferensi Anda
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-gray-500">📍 Lokasi</span>
                <p className="font-medium text-gray-800 capitalize">
                  {preferences.location?.replace('-', ' ') || 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">💰 Budget</span>
                <p className="font-medium text-gray-800">
                  Rp {preferences.budget?.toLocaleString('id-ID') || 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">🎯 Kebutuhan</span>
                <p className="font-medium text-gray-800 capitalize">
                  {preferences.useCase || 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">⭐ Prioritas</span>
                <p className="font-medium text-gray-800 capitalize">
                  {preferences.priority || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Single ISP Info */}
          {ranking.length === 1 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl">ℹ️</span>
                <div>
                  <p className="font-medium text-blue-900 mb-1">
                    Hanya 1 ISP Tersedia
                  </p>
                  <p className="text-sm text-blue-700">
                    Berdasarkan lokasi <strong>{preferences.location?.replace('-', ' ')}</strong> dan 
                    budget <strong>Rp {preferences.budget?.toLocaleString('id-ID')}</strong>, 
                    sistem menemukan <strong>{completeTopISP.name}</strong> sebagai satu-satunya pilihan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DEBUG: Check data before RecommendationCard */}
          {(() => {
            console.log('=== BEFORE RECOMMENDATION CARD ===');
            console.log('topResult:', topResult);
            console.log('completeTopISP:', completeTopISP);
            console.log('otherResults:', otherResults);
            console.log('About to render RecommendationCard');
            return null;
          })()}


          {/* Top Recommendation */}
          <RecommendationCard
            topResult={topResult}
            topISP={completeTopISP}
            otherResults={otherResults}
            ranking={ranking}
            ispDataMap={ispDataMap}
          />

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              🔄 Cari Lagi
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
            >
              🖨️ Cetak Hasil
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;