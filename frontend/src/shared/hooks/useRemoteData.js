import { useEffect, useState } from 'react';

export function useRemoteData(loader, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not load the latest data.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loader]);

  return { data, loading, error };
}
