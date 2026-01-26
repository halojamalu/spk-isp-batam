import { useCases, priorities } from '../data/useCases';

/**
 * Map user preferences to TOPSIS weights
 * Combines use case weights with priority adjustments
 */
export function mapPreferencesToWeights(preferences) {
  const useCase = useCases.find(uc => uc.value === preferences.useCase);
  const priority = priorities.find(p => p.value === preferences.priority);
  
  if (!useCase || !priority) {
    return {
      downloadSpeed: 0.25,
      uploadSpeed: 0.20,
      price: 0.25,
      serviceQuality: 0.15,
      coverage: 0.10,
      stability: 0.05
    };
  }
  
  const blendedWeights = {};
  const criteria = ['downloadSpeed', 'uploadSpeed', 'price', 'serviceQuality', 'coverage', 'stability'];
  
  criteria.forEach(criterion => {
    blendedWeights[criterion] = 
      (useCase.weights[criterion] * 0.6) + 
      (priority.weightAdjustment[criterion] * 0.4);
  });
  
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
    isp.criteria.price <= budget * 1.15
  );
}

/**
 * Get criteria types (benefit or cost)
 */
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

/**
 * Complete filtering and calculation pipeline with detailed logging
 */
export function processRecommendation(ispData, preferences) {
  console.log('=== FILTERING PROCESS ===');
  console.log('User preferences:', preferences);
  console.log('Initial ISPs count:', ispData.length);
  
  // Step 1: Filter by location
  let filteredISPs = filterByLocation(ispData, preferences.location);
  console.log(`After location filter (${preferences.location}):`, filteredISPs.length, 'ISPs');
  console.log('Remaining ISPs:', filteredISPs.map(isp => isp.name));
  
  // Step 2: Filter by budget
  const beforeBudget = filteredISPs.length;
  filteredISPs = filterByBudget(filteredISPs, preferences.budget);
  console.log(`After budget filter (Rp ${preferences.budget.toLocaleString('id-ID')}):`, filteredISPs.length, 'ISPs');
  console.log('Remaining ISPs:', filteredISPs.map(isp => isp.name));
  
  // Step 3: Fallback if empty
  if (filteredISPs.length === 0) {
    console.warn('⚠️ No ISPs match strict filters, relaxing constraints');
    console.warn(`Reason: ${beforeBudget === 0 ? 'No ISPs in selected location' : 'No ISPs within budget'}`);
    filteredISPs = ispData;
    console.log('Fallback: Using all', ispData.length, 'ISPs');
  }
  
  // Get weights
  const weights = mapPreferencesToWeights(preferences);
  console.log('Calculated weights:', weights);
  console.log('Weight sum:', Object.values(weights).reduce((a, b) => a + b, 0));
  
  return {
    filteredISPs,
    weights
  };
}