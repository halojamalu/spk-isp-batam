/**
 * TOPSIS Calculator untuk SPK Pemilihan ISP
 * Updated for enhanced UI - uses weights and criteriaTypes objects
 */

/**
 * Step 1: Normalize Decision Matrix
 * Formula: r_ij = x_ij / sqrt(sum(x_ij^2))
 */
export function normalizeMatrix(ispData, weights) {
    
    console.log('=== STEP 1: NORMALIZATION ===');
    console.log('Input ISP Data:', ispData);
    console.log('Weights:', weights);
    
    const normalized = [];

  // Get criteria codes from weights object
  const criteriaCodes = Object.keys(weights);
  
  // Calculate divisors for each criterion
  const divisors = {};
  criteriaCodes.forEach(code => {
    const sumOfSquares = ispData.reduce((sum, isp) => {
      return sum + Math.pow(isp.criteria[code], 2);
    }, 0);
    divisors[code] = Math.sqrt(sumOfSquares);
  });
  
  console.log('Divisors (sqrt of sum of squares):', divisors);

  // Normalize each value
  ispData.forEach(isp => {
    const normalizedCriteria = {};
    
    criteriaCodes.forEach(code => {
      const value = isp.criteria[code];
      normalizedCriteria[code] = value / divisors[code];
    });
    
    normalized.push({
      id: isp.id,
      name: isp.name,
      criteria: normalizedCriteria
    });
  });

    console.log('Normalized Matrix:', normalized);
  console.table(normalized.map(isp => ({ name: isp.name, ...isp.criteria })));
  
  return normalized;
}

/**
 * Step 2: Apply Weights to Normalized Matrix
 * Formula: y_ij = w_j * r_ij
 */
export function applyWeights(normalizedData, weights) {
    console.log('=== STEP 2: APPLY WEIGHTS ===');
  console.log('Weights:', weights);
  
    const weighted = [];
  
  normalizedData.forEach(isp => {
    const weightedCriteria = {};
    
    Object.keys(isp.criteria).forEach(code => {
      weightedCriteria[code] = isp.criteria[code] * weights[code];
    });
    
    weighted.push({
      id: isp.id,
      name: isp.name,
      criteria: weightedCriteria
    });
  });
  
    console.log('Weighted Matrix:');
  console.table(weighted.map(isp => ({ name: isp.name, ...isp.criteria })));

  return weighted;
}

/**
 * Step 3: Determine Ideal Positive and Negative Solutions
 * A+ = max for benefit, min for cost
 * A- = min for benefit, max for cost
 */
export function calculateIdealSolutions(weightedData, criteriaTypes) {
    console.log('=== STEP 3: IDEAL SOLUTIONS ===');
  console.log('Criteria Types:', criteriaTypes);
  
    const idealPositive = {};
  const idealNegative = {};
  
  Object.keys(criteriaTypes).forEach(code => {
    const values = weightedData.map(isp => isp.criteria[code]);
    const type = criteriaTypes[code];
    
    if (type === 'benefit') {
      idealPositive[code] = Math.max(...values);
      idealNegative[code] = Math.min(...values);
    } else { // cost
      idealPositive[code] = Math.min(...values);
      idealNegative[code] = Math.max(...values);
    }
  });
  
  console.log('A+ (Ideal Positive):', idealPositive);
  console.log('A- (Ideal Negative):', idealNegative);

  return { idealPositive, idealNegative };
}

/**
 * Step 4: Calculate Euclidean Distance
 * D+ = sqrt(sum((y_ij - y_j+)^2))
 * D- = sqrt(sum((y_ij - y_j-)^2))
 */
export function calculateDistances(weightedData, idealPositive, idealNegative) {
  console.log('=== STEP 4: CALCULATE DISTANCES ===');
  
    const distances = [];
  
  weightedData.forEach(isp => {
    let distancePositive = 0;
    let distanceNegative = 0;
    
    Object.keys(isp.criteria).forEach(code => {
      const value = isp.criteria[code];
      
      // Distance to positive ideal
      distancePositive += Math.pow(value - idealPositive[code], 2);
      
      // Distance to negative ideal
      distanceNegative += Math.pow(value - idealNegative[code], 2);
    });
    
    distances.push({
      id: isp.id,
      name: isp.name,
      distancePositive: Math.sqrt(distancePositive),
      distanceNegative: Math.sqrt(distanceNegative)
    });
  });

   console.log('Distances:');
  console.table(distances);
  
  return distances;
}

/**
 * Calculate preference values and ranking
 * Handles special case when only 1 ISP available
 */
export function calculatePreferenceValues(distances) {
  console.log('=== STEP 5: PREFERENCE VALUES & RANKING ===');
  
  // Special case: Only 1 ISP available
  if (distances.length === 1) {
    console.warn('⚠️ Only 1 ISP available - assigning V = 1.0 (100%)');
    
    return [{
      id: distances[0].id,
      name: distances[0].name,
      distancePositive: 0,
      distanceNegative: 0,
      preferenceValue: 1.0,  // 100% - only available option
      rank: 1
    }];
  }
  
  // Normal case: 2+ ISPs
  const preferences = distances.map(dist => {
    const preferenceValue = dist.distanceNegative / 
                           (dist.distancePositive + dist.distanceNegative);
    
    return {
      id: dist.id,
      name: dist.name,
      distancePositive: dist.distancePositive,
      distanceNegative: dist.distanceNegative,
      preferenceValue: preferenceValue
    };
  });
  
  // Sort by preference value (descending)
  preferences.sort((a, b) => b.preferenceValue - a.preferenceValue);
  
  // Assign ranks
  preferences.forEach((pref, index) => {
    pref.rank = index + 1;
  });
  
  console.log('Final Ranking:');
  console.table(preferences);
  
  return preferences;
}

/**
 * Master Function: Complete TOPSIS Calculation
 * @param {Array} ispData - Array of ISP objects with criteria
 * @param {Object} weights - Weights object {downloadSpeed: 0.25, ...}
 * @param {Object} criteriaTypes - Types object {downloadSpeed: 'benefit', price: 'cost', ...}
 */
export function calculateTOPSIS(ispData, weights, criteriaTypes) {
  // Validate inputs
  if (!ispData || ispData.length === 0) {
    throw new Error('ISP data is empty');
  }
  
  if (!weights || Object.keys(weights).length === 0) {
    throw new Error('Weights object is empty');
  }
  
  if (!criteriaTypes || Object.keys(criteriaTypes).length === 0) {
    throw new Error('Criteria types object is empty');
  }
  
  // Step 1: Normalize
  const normalized = normalizeMatrix(ispData, weights);
  
  // Step 2: Apply weights
  const weighted = applyWeights(normalized, weights);
  
  // Step 3: Calculate ideal solutions
  const { idealPositive, idealNegative } = calculateIdealSolutions(
    weighted, 
    criteriaTypes
  );
  
  // Step 4: Calculate distances
  const distances = calculateDistances(weighted, idealPositive, idealNegative);
  
  // Step 5: Calculate preference values and ranking
  const ranking = calculatePreferenceValues(distances);
  
  return {
    normalized,
    weighted,
    idealPositive,
    idealNegative,
    distances,
    ranking
  };
}