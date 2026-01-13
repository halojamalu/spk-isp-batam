import React, { useState } from 'react';
import Navigation from '../components/admin/Navigation';
import ISPList from '../components/admin/ISPList';
import ISPForm from '../components/admin/ISPForm';
import { ispData as initialISPData } from '../data/dataISP';

function AdminPage() {
  const [ispData, setISPData] = useState(initialISPData);
  const [editingISP, setEditingISP] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleEdit = (isp) => {
    setEditingISP(isp);
    setShowForm(true);
  };
  
  const handleSave = (ispObject) => {
    if (editingISP) {
      setISPData(prev => prev.map(isp => 
        isp.id === ispObject.id ? ispObject : isp
      ));
    } else {
      setISPData(prev => [...prev, ispObject]);
    }
    
    setShowForm(false);
    setEditingISP(null);
    alert('✅ ISP berhasil disimpan!');
  };
  
  const handleDelete = (id) => {
    if (window.confirm('⚠️ Yakin ingin menghapus ISP ini?')) {
      setISPData(prev => prev.filter(isp => isp.id !== id));
      alert('✅ ISP berhasil dihapus!');
    }
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingISP(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Card - Only show when not in form mode */}
        {!showForm && (
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👋</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Selamat Datang, Admin!
                </h2>
                <p className="text-gray-600 mt-1">
                  Kelola data ISP untuk sistem rekomendasi
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-2xl font-bold text-blue-600">
                  {ispData.length}
                </div>
                <div className="text-sm text-gray-600">Total ISP</div>
              </div>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="text-3xl mb-2">📍</div>
                <div className="text-2xl font-bold text-green-600">
                  {new Set(ispData.flatMap(isp => isp.availableAreas)).size}
                </div>
                <div className="text-sm text-gray-600">Area Coverage</div>
              </div>
              
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.max(...ispData.map(isp => isp.criteria.downloadSpeed))} Mbps
                </div>
                <div className="text-sm text-gray-600">Max Speed</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        {showForm ? (
          <ISPForm
            isp={editingISP}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ISPList
            ispData={ispData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default AdminPage;