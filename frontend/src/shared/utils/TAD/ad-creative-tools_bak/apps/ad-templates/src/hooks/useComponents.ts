import { useState, useEffect } from 'react';
import { getComponents, getComponentsByRatio, getUserComponents } from '../services/componentService';
import type { ComponentItem } from '../types';
import { useAuth } from '../contexts/AuthContext';

export function useComponents() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getComponents();
      setComponents(data);
    } catch (err) {
      console.error('Error fetching components:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return {
    components,
    loading,
    error,
    refetch: fetchComponents
  };
}

export function useComponentsByRatio(ratio: string) {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getComponentsByRatio(ratio);
      setComponents(data);
    } catch (err) {
      console.error('Error fetching components by ratio:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ratio) {
      fetchComponents();
    }
  }, [ratio]);

  return {
    components,
    loading,
    error,
    refetch: fetchComponents
  };
}

export function useUserComponents() {
  const { user } = useAuth();
  
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComponents = async () => {
    if (!user) {
      setComponents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getUserComponents(user.id);
      setComponents(data);
    } catch (err) {
      console.error('Error fetching user components:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [user]);

  return {
    components,
    loading,
    error,
    refetch: fetchComponents
  };
}
