import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PreferenceForm from '../components/user/PreferenceForm';
import { ispData } from '../data/dataISP';
import { calculateTOPSIS } from '../utils/topsisCalculator';
import { processRecommendation, getCriteriaTypes } from '../utils/weightMapper';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCalculate = (preferences) => {
    setLoading(true);
    
    setTimeout(() => {
      try {
        const { filteredISPs, weights } = processRecommendation(ispData, preferences);
        const criteriaTypes = getCriteriaTypes();
        const topsisResult = calculateTOPSIS(filteredISPs, weights, criteriaTypes);
        
        const ispDataMap = {};
        ispData.forEach(isp => {
          ispDataMap[isp.id] = isp;
        });
        
        const results = {
          ...topsisResult,
          ispDataMap,
          preferences
        };
        
        setLoading(false);
        navigate('/results', { state: { results } });
        
      } catch (error) {
        console.error('Error calculating TOPSIS:', error);
        alert('Terjadi error saat menghitung. Silakan coba lagi.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                🌐 Pemilihan ISP Batam
              </h1>
              <p className="text-gray-600 mt-1">
                Temukan ISP terbaik sesuai kebutuhan dan budget Anda
              </p>
            </div>
            
            <Link
              to="/admin"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <span className="text-xl group-hover:animate-pulse">🎛️</span>
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-sm">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
                  <p className="text-gray-800 font-semibold text-lg">
                    Menghitung Rekomendasi...
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Sedang memproses preferensi Anda
                  </p>
                </div>
              </div>
            </div>
          )}

          <PreferenceForm onCalculate={handleCalculate} />

          <div className="mt-6 bg-white rounded-lg shadow-card p-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>ℹ️</span>
              Cara Menggunakan
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
              <li>Pilih lokasi tempat tinggal Anda di Batam</li>
              <li>Atur budget bulanan untuk internet</li>
              <li>Pilih kebutuhan utama Anda (Gaming, WFH, dll)</li>
              <li>Pilih jumlah pengguna</li>
              <li>Pilih prioritas utama Anda</li>
              <li>Klik "Cari Rekomendasi ISP"</li>
            </ol>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 SPK ISP Batam | Metode TOPSIS</p>
          <p className="text-sm text-gray-400 mt-1">
            Rita Rianggun | Tunasidea
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;