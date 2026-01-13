import React, { useState } from 'react';
import { batamLocations } from '../../data/locations';
import { useCases, userCounts, priorities } from '../../data/useCases';
import BudgetSlider from './BudgetSlider';
import PriorityButton from './PriorityButton';

function PreferenceForm({ onCalculate }) {
  const [preferences, setPreferences] = useState({
    location: '',
    budget: 400000,
    useCase: '',
    userCount: '',
    priority: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user fills field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!preferences.location) {
      newErrors.location = 'Pilih lokasi Anda';
    }
    if (!preferences.useCase) {
      newErrors.useCase = 'Pilih kebutuhan utama';
    }
    if (!preferences.userCount) {
      newErrors.userCount = 'Pilih jumlah pengguna';
    }
    if (!preferences.priority) {
      newErrors.priority = 'Pilih prioritas utama';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCalculate(preferences);
    }
  };

  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-primary">⚙️</span>
        Preferensi Anda
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Lokasi */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-red-500">📍</span>
            Lokasi
          </label>
          <select
            value={preferences.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.location ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <option value="">Pilih lokasi Anda</option>
            {batamLocations.map(loc => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-orange-500">💰</span>
            Budget Bulanan
          </label>
          <BudgetSlider
            value={preferences.budget}
            onChange={(value) => handleChange('budget', value)}
          />
        </div>

        {/* Kebutuhan Utama */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-purple-500">🎯</span>
            Kebutuhan Utama
          </label>
          <select
            value={preferences.useCase}
            onChange={(e) => handleChange('useCase', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.useCase ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <option value="">Pilih kebutuhan utama</option>
            {useCases.map(uc => (
              <option key={uc.value} value={uc.value}>
                {uc.icon} {uc.label}
              </option>
            ))}
          </select>
          {errors.useCase && (
            <p className="text-red-500 text-sm mt-1">{errors.useCase}</p>
          )}
        </div>

        {/* Jumlah Pengguna */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-blue-500">👥</span>
            Jumlah Pengguna
          </label>
          <select
            value={preferences.userCount}
            onChange={(e) => handleChange('userCount', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.userCount ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <option value="">Berapa orang yang akan menggunakan?</option>
            {userCounts.map(uc => (
              <option key={uc.value} value={uc.value}>
                {uc.label}
              </option>
            ))}
          </select>
          {errors.userCount && (
            <p className="text-red-500 text-sm mt-1">{errors.userCount}</p>
          )}
        </div>

        {/* Prioritas Utama */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-pink-500">⭐</span>
            Prioritas Utama (pilih satu)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {priorities.map(priority => (
              <PriorityButton
                key={priority.value}
                priority={priority}
                isSelected={preferences.priority === priority.value}
                onClick={() => handleChange('priority', priority.value)}
              />
            ))}
          </div>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-2">{errors.priority}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>🔍</span>
          Cari Rekomendasi ISP
        </button>
      </form>
    </div>
  );
}

export default PreferenceForm;