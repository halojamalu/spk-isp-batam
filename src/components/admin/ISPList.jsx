import React, { useState } from 'react';

function ISPList({ ispData, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const filteredISPs = ispData.filter(isp =>
    isp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📡 Data ISP ({ispData.length})
        </h2>
        
        <button
          onClick={() => onEdit(null)}
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg transition-all"
        >
          ➕ Tambah ISP Baru
        </button>
      </div>
      
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Cari ISP..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                ISP
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Kecepatan
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Harga
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Coverage
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Rating
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredISPs.map((isp, index) => (
              <tr
                key={isp.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition-colors border-b border-gray-200`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{isp.logo}</span>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {isp.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {isp.availableAreas.length} area
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="font-semibold text-gray-800">
                    {isp.criteria.downloadSpeed} Mbps
                  </div>
                  <div className="text-xs text-gray-500">
                    ↑ {isp.criteria.uploadSpeed} Mbps
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-semibold text-gray-800">
                  {formatCurrency(isp.criteria.price)}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                    {isp.criteria.coverage}%
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-gray-800">
                      {isp.criteria.serviceQuality}/100
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(isp)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(isp.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredISPs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Tidak ada ISP ditemukan
        </div>
      )}
    </div>
  );
}

export default ISPList;