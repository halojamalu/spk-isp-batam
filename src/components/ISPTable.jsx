import React from 'react';
import { criteriaConfig, formatCurrency, formatPercentage } from '../data/criteriaConfig';

function ISPTable({ ispData }) {
  const formatValue = (code, value) => {
    const criterion = criteriaConfig.find(c => c.code === code);
    
    if (criterion.unit === 'Rp') {
      return formatCurrency(value);
    } else if (criterion.unit === '%') {
      return formatPercentage(value);
    } else {
      return `${value} ${criterion.unit}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📊 Data ISP di Kota Batam
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">ISP</th>
              {criteriaConfig.map(criterion => (
                <th key={criterion.code} className="px-4 py-3 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">{criterion.icon}</span>
                    <span className="text-sm">{criterion.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ispData.map((isp, index) => (
              <tr 
                key={isp.id} 
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{isp.logo}</span>
                    <span>{isp.name}</span>
                  </div>
                </td>
                {criteriaConfig.map(criterion => (
                  <td key={criterion.code} className="px-4 py-3 text-center">
                    {formatValue(criterion.code, isp.criteria[criterion.code])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ISPTable;