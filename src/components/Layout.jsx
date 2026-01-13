import React from 'react';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🌐 Sistem Pendukung Keputusan Pemilihan ISP
          </h1>
          <p className="text-gray-600 mt-1">
            Kota Batam - Metode TOPSIS
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 SPK ISP Batam | Metode TOPSIS</p>
          <p className="text-sm text-gray-400 mt-1">
            Developed for Research Purpose
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;