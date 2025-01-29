import { useState, useEffect, useCallback } from 'react';
import { Type } from '../../services/plantsTypes';
import { fetchTypes } from '../../services/plantsService';

const useFetchTypes = () => {
  const [data, setData] = useState<Type[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [validPlantTypeIds, setValidPlantTypeIds] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const types = await fetchTypes();

      const uniqueTypes: Type[] = Array.from(new Map<string, Type>(types.map((type: Type) => [type.typeName, type])).values());

      setData(uniqueTypes);
      setValidPlantTypeIds(uniqueTypes.map((type) => type.id));
      setError(null);
    } catch (err: any) {
      console.error('Error fetching types:', err.message);
      setError('Unable to load types. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, validPlantTypeIds };
};

export default useFetchTypes;
