import { fetchTypes } from '../services/plantsService';

let validPlantTypeIds: number[] = [];

export async function loadValidPlantTypes() {
  try {
    const types = await fetchTypes();
    validPlantTypeIds = types.map((type: { id: number }) => type.id);
  } catch (error) {
    console.error('Error loading plant types:', error);
    validPlantTypeIds = [];
  }
}

export function getValidPlantTypeIds() {
  return validPlantTypeIds;
}
