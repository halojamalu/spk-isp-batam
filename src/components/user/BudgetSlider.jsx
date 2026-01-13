import React from 'react';

function BudgetSlider({ value, onChange }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-primary">
          {formatCurrency(value)}
        </span>
      </div>
      
      <input
        type="range"
        min="200000"
        max="1000000"
        step="50000"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${((value - 200000) / 800000) * 100}%, #E5E7EB ${((value - 200000) / 800000) * 100}%, #E5E7EB 100%)`
        }}
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Rp 200K</span>
        <span>Rp 1Jt</span>
      </div>
    </div>
  );
}

export default BudgetSlider;