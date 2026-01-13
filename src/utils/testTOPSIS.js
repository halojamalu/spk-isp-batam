import { calculateTOPSIS } from './topsisCalculator';
import { ispData } from '../data/dataISP';
import { criteriaConfig } from '../data/criteriaConfig';

export function testTOPSISCalculation() {
  console.log('=== TESTING TOPSIS CALCULATION ===');
  
  // Create default weights object
  const weights = {};
  criteriaConfig.forEach(criterion => {
    weights[criterion.code] = criterion.defaultWeight;
  });
  
  console.log('Weights:', weights);
  
  // Calculate TOPSIS
  const result = calculateTOPSIS(ispData, criteriaConfig, weights);
  
  console.log('\n--- NORMALIZED MATRIX ---');
  console.table(result.normalized.map(isp => ({
    name: isp.name,
    ...isp.criteria
  })));
  
  console.log('\n--- WEIGHTED MATRIX ---');
  console.table(result.weighted.map(isp => ({
    name: isp.name,
    ...isp.criteria
  })));
  
  console.log('\n--- IDEAL SOLUTIONS ---');
  console.log('A+ (Positive):', result.idealPositive);
  console.log('A- (Negative):', result.idealNegative);
  
  console.log('\n--- DISTANCES ---');
  console.table(result.distances);
  
  console.log('\n--- FINAL RANKING ---');
  console.table(result.ranking);
  
  console.log('\n=== TEST COMPLETE ===');
  
  return result;
}