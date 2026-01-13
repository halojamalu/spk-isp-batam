import { useCases, priorities } from '../data/useCases';

/**
 * Map user preferences to TOPSIS weights
 * Combines use case weights with priority adjustments
 */
export function mapPreferencesToWeights(preferences) {
  // Get base weights from use case
  const useCase = useCases.find(uc => uc.value === preferences.useCase);
  const priority = priorities.find(p => p.value === preferences.priority);
  
  if (!useCase || !priority) {
    // Default balanced weights
    return {
      downloadSpeed: 0.25,
      uploadSpeed: 0.20,
      price: 0.25,
      serviceQuality: 0.15,
      coverage: 0.10,
      stability: 0.05
    };
  }
  
  // Blend use case weights (60%) with priority weights (40%)
  const blendedWeights = {};
  const criteria = ['downloadSpeed', 'uploadSpeed', 'price', 'serviceQuality', 'coverage', 'stability'];
  
  criteria.forEach(criterion => {
    blendedWeights[criterion] = 
      (useCase.weights[criterion] * 0.6) + 
      (priority.weightAdjustment[criterion] * 0.4);
  });
  
  // Normalize to ensure sum = 1
  const sum = Object.values(blendedWeights).reduce((a, b) => a + b, 0);
  Object.keys(blendedWeights).forEach(key => {
    blendedWeights[key] = blendedWeights[key] / sum;
  });
  
  return blendedWeights;
}

/**
 * Filter ISPs by location availability
 */
export function filterByLocation(ispData, location) {
  if (!location) return ispData;
  
  // Convert location value to label format
  const locationLabel = location
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return ispData.filter(isp => 
    isp.availableAreas.includes(locationLabel)
  );
}

/**
 * Filter ISPs by budget
 */
export function filterByBudget(ispData, budget) {
  return ispData.filter(isp => 
    isp.criteria.price <= budget * 1.15 // Allow 15% tolerance
  );
}

/**
 * Complete filtering and calculation pipeline
 */
export function processRecommendation(ispData, preferences) {
  // Filter by location
  let filteredISPs = filterByLocation(ispData, preferences.location);
  
  // Filter by budget
  filteredISPs = filterByBudget(filteredISPs, preferences.budget);
  
  // If no ISPs match, relax filters
  if (filteredISPs.length === 0) {
    console.warn('No ISPs match strict filters, relaxing constraints');
    filteredISPs = ispData;
  }
  
  // Get weights from preferences
  const weights = mapPreferencesToWeights(preferences);
  
  return {
    filteredISPs,
    weights
  };
}

export function getCriteriaTypes() {
  return {
    downloadSpeed: 'benefit',
    uploadSpeed: 'benefit',
    price: 'cost',
    serviceQuality: 'benefit',
    coverage: 'benefit',
    stability: 'benefit'
  };
}