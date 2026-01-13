import React, { useState, useEffect } from 'react';
import { criteriaConfig } from '../data/criteriaConfig';

function WeightForm({ onCalculate, onReset }) {
  const [weights, setWeights] = useState({});
  const [totalWeight, setTotalWeight] = useState(100);

  // Initialize with default weights
  useEffect(() => {
    const defaultWeights = {};
    criteriaConfig.forEach(criterion => {
      defaultWeights[criterion.code] = criterion.defaultWeight * 100;
    });
    setWeights(defaultWeights);
  }, []);

  // Calculate total whenever weights change
  useEffect(() => {
    const total = Object.values(weights).reduce((sum, val) => sum + val, 0);
    setTotalWeight(total);
  }, [weights]);

  const handleWeightChange = (code, value) => {
    setWeights(prev => ({
      ...prev,
      [code]: parseFloat(value) || 0
    }));
  };

  const handleReset = () => {
    const defaultWeights = {};
    criteriaConfig.forEach(criterion => {
      defaultWeights[criterion.code] = criterion.defaultWeight * 100;
    });
    setWeights(defaultWeights);
    if (onReset) onReset();
  };

  const handleCalculate = () => {
    // Convert percentage to decimal
    const decimalWeights = {};
    Object.keys(weights).forEach(code => {
      decimalWeights[code] = weights[code] / 100;
    });
    onCalculate(decimalWeights);
  };

  const isValid = Math.abs(totalWeight - 100) < 0.01;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ⚖️ Atur Bobot Kriteria
      </h2>
      
      <p className="text-gray-600 mb-4">
        Sesuaikan bobot kriteria sesuai preferensi Anda. Total harus 100%.
      </p>

      <div className="space-y-4">
        {criteriaConfig.map(criterion => (
          <div key={criterion.code} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-xl">{criterion.icon}</span>
                {criterion.name}
              </label>
              <span className="text-lg font-bold text-blue-600">
                {weights[criterion.code]?.toFixed(0)}%
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={weights[criterion.code] || 0}
              onChange={(e) => handleWeightChange(criterion.code, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            
            <p className="text-xs text-gray-500 mt-1">
              {criterion.description}
            </p>
          </div>
        ))}
      </div>

      {/* Total Weight Indicator */}
      <div className={`mt-6 p-4 rounded-lg ${
        isValid ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
      } border-2`}>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total Bobot:</span>
          <span className={`text-xl font-bold ${
            isValid ? 'text-green-700' : 'text-red-700'
          }`}>
            {totalWeight.toFixed(0)}%
          </span>
        </div>
        {!isValid && (
          <p className="text-sm text-red-600 mt-2">
            ⚠️ Total bobot harus 100%. Saat ini: {totalWeight.toFixed(0)}%
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleCalculate}
          disabled={!isValid}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
            isValid 
              ? 'bg-blue-600 hover:bg-blue-700 active:scale-95' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          🧮 Hitung Rekomendasi
        </button>
        
        <button
          onClick={handleReset}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-all"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default WeightForm;