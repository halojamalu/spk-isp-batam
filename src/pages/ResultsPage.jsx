import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import RecommendationCard from '../components/user/RecommendationCard';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Get results from navigation state
    if (location.state && location.state.results) {
      setResults(location.state.results);
    } else {
      // If no results (direct URL access), redirect to home
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const handleNewSearch = () => {
    navigate('/');
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                🌐 Hasil Rekomendasi ISP
              </h1>
              <p className="text-gray-600 mt-1">
                Berdasarkan preferensi Anda
              </p>
            </div>
            
            <button
              onClick={handleNewSearch}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
            >
              <span>🔍</span>
              Cari Lagi
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Preference Summary Card */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📋 Preferensi Anda
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">📍 Lokasi</div>
              <div className="font-semibold text-gray-800 capitalize">
                {results.preferences.location.replace('-', ' ')}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">💰 Budget</div>
              <div className="font-semibold text-gray-800">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(results.preferences.budget)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">🎯 Kebutuhan</div>
              <div className="font-semibold text-gray-800 capitalize">
                {results.preferences.useCase}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">⭐ Prioritas</div>
              <div className="font-semibold text-gray-800 capitalize">
                {results.preferences.priority}
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <RecommendationCard results={results} />

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleNewSearch}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-all"
          >
            🔄 Ubah Preferensi
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            🖨️ Cetak Hasil
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 SPK ISP Batam | Metode TOPSIS</p>
          <p className="text-sm text-gray-400 mt-1">
            Data untuk tujuan simulasi penelitian
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ResultsPage;