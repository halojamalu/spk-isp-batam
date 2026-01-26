/**
 * Format preference value for display
 * Handles NaN, Infinity, and edge cases
 */
export function formatPreferenceValue(value) {
  // Check for invalid values
  if (value === undefined || value === null) {
    return 'N/A';
  }
  
  if (!isFinite(value) || isNaN(value)) {
    return '100'; // Only option or perfect match
  }
  
  // Clamp between 0 and 100
  const percentage = Math.max(0, Math.min(100, Math.round(value * 100)));
  
  return percentage;
}

/**
 * Check if this is a single ISP scenario
 */
export function isSingleISPScenario(ranking) {
  return ranking && ranking.length === 1;
}

/**
 * Get display message for single ISP
 */
export function getSingleISPMessage() {
  return 'Hanya 1 ISP tersedia di lokasi dan budget Anda';
}