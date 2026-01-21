import { useState, useEffect } from 'react';

export function useSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await queryFn();
        if (isMounted) {
          if (result.error) {
            setError(result.error);
            setData(null);
          } else {
            setData(result.data);
            setError(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

export function useSupabaseMutation<T, V>(
  mutationFn: (variables: V) => Promise<{ data: T | null; error: any }>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (variables: V) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(variables);
      if (result.error) {
        setError(result.error);
        setData(null);
        throw result.error;
      } else {
        setData(result.data);
        return result.data;
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate };
}
