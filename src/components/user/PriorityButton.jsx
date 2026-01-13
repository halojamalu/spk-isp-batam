import React from 'react';

function PriorityButton({ priority, isSelected, onClick }) {
  const colorClasses = {
    green: {
      selected: 'bg-green-500 text-white border-green-600',
      unselected: 'bg-white text-green-700 border-green-300 hover:border-green-500'
    },
    yellow: {
      selected: 'bg-yellow-500 text-white border-yellow-600',
      unselected: 'bg-white text-yellow-700 border-yellow-300 hover:border-yellow-500'
    },
    blue: {
      selected: 'bg-blue-500 text-white border-blue-600',
      unselected: 'bg-white text-blue-700 border-blue-300 hover:border-blue-500'
    }
  };

  const classes = isSelected 
    ? colorClasses[priority.color].selected 
    : colorClasses[priority.color].unselected;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${classes} border-2 rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95 cursor-pointer`}
    >
      <div className="text-3xl mb-2">{priority.icon}</div>
      <div className="font-semibold text-sm">{priority.label}</div>
    </button>
  );
}

export default PriorityButton;