import React, { useState, useEffect } from 'react';
import { batamLocations } from '../../data/locations';

function ISPForm({ isp, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    logo: '📡',
    description: '',
    downloadSpeed: 50,
    uploadSpeed: 50,
    price: 350000,
    serviceQuality: 80,
    coverage: 70,
    stability: 95,
    availableAreas: []
  });
  
  useEffect(() => {
    if (isp) {
      setFormData({
        name: isp.name,
        logo: isp.logo,
        description: isp.description,
        downloadSpeed: isp.criteria.downloadSpeed,
        uploadSpeed: isp.criteria.uploadSpeed,
        price: isp.criteria.price,
        serviceQuality: isp.criteria.serviceQuality,
        coverage: isp.criteria.coverage,
        stability: isp.criteria.stability,
        availableAreas: isp.availableAreas
      });
    }
  }, [isp]);
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAreaToggle = (areaLabel) => {
    setFormData(prev => ({
      ...prev,
      availableAreas: prev.availableAreas.includes(areaLabel)
        ? prev.availableAreas.filter(a => a !== areaLabel)
        : [...prev.availableAreas, areaLabel]
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ispObject = {
      id: isp?.id || Date.now(),
      name: formData.name,
      logo: formData.logo,
      description: formData.description,
      criteria: {
        downloadSpeed: parseFloat(formData.downloadSpeed),
        uploadSpeed: parseFloat(formData.uploadSpeed),
        price: parseFloat(formData.price),
        serviceQuality: parseFloat(formData.serviceQuality),
        coverage: parseFloat(formData.coverage),
        stability: parseFloat(formData.stability)
      },
      availableAreas: formData.availableAreas,
      bestFor: ['umum'],
      recommendedUsers: '1-10 orang',
      packages: []
    };
    
    onSave(ispObject);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isp ? '✏️ Edit ISP' : '➕ Tambah ISP Baru'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama ISP
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Logo (Emoji)
            </label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => handleChange('logo', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="📡"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deskripsi
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            rows="3"
            required
          />
        </div>
        
        {/* Criteria */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-700 mb-4">Kriteria Teknis</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kecepatan Download (Mbps)
              </label>
              <input
                type="number"
                value={formData.downloadSpeed}
                onChange={(e) => handleChange('downloadSpeed', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kecepatan Upload (Mbps)
              </label>
              <input
                type="number"
                value={formData.uploadSpeed}
                onChange={(e) => handleChange('uploadSpeed', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Harga (Rp/bulan)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                min="1"
                step="1000"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kualitas Layanan (0-100)
              </label>
              <input
                type="number"
                value={formData.serviceQuality}
                onChange={(e) => handleChange('serviceQuality', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                min="0"
                max="100"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Coverage (%)
              </label>
              <input
                type="number"
                value={formData.coverage}
                onChange={(e) => handleChange('coverage', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                min="0"
                max="100"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stabilitas (%)
              </label>
              <input
                type="number"
                value={formData.stability}
                onChange={(e) => handleChange('stability', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                min="0"
                max="100"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Available Areas */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-700 mb-4">Area Tersedia</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {batamLocations.map(loc => (
              <label
                key={loc.value}
                className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.availableAreas.includes(loc.label)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.availableAreas.includes(loc.label)}
                  onChange={() => handleAreaToggle(loc.label)}
                  className="hidden"
                />
                <span className="text-sm font-semibold">
                  {formData.availableAreas.includes(loc.label) ? '✓' : '○'} {loc.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all"
          >
            💾 Simpan ISP
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-all"
          >
            ✕ Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default ISPForm;