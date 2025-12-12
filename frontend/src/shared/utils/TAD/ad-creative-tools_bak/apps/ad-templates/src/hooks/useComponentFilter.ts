import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useComponents, useComponentsByRatio, useUserComponents } from './useComponents';

export function useComponentFilter() {
  const { user } = useAuth();
  const [selectedRatio, setSelectedRatio] = useState<string>('all');

  // 获取所有组件数据
  const { components: allComponents, loading: allLoading, error: allError } = useComponents();

  // 获取按分类过滤的组件数据
  const { components: categoryComponents, loading: categoryLoading, error: categoryError } = useComponentsByRatio(
    selectedRatio !== 'all' && selectedRatio !== 'my' ? selectedRatio : ''
  );

  // 获取用户组件数据
  const { components: userComponents, loading: userLoading, error: userError } = useUserComponents();

  const ratios = useMemo(() => {
    const baseRatios = [
      { key: 'all', label: '全部' },
      { key: '16:9', label: '16:9' },
      { key: '9:16', label: '9:16' },
      { key: '4:5', label: '4:5' },
      { key: '5:4', label: '5:4' },
      { key: '3:4', label: '3:4' },
      { key: '4:3', label: '4:3' }
    ];

    // 如果用户已登录，在全部前面添加"我的"分类
    if (user) {
      return [
        { key: 'my', label: '我的' },
        ...baseRatios
      ];
    }

    return baseRatios;
  }, [user]);

  // 当用户登录状态变化时，如果当前选中的是"我的"但用户未登录，则切换到"全部"
  useEffect(() => {
    if (!user && selectedRatio === 'my') {
      setSelectedRatio('all');
    }
  }, [user, selectedRatio]);

  const { components, loading, error } = useMemo(() => {
    if (selectedRatio === 'all') {
      return {
        components: allComponents,
        loading: allLoading,
        error: allError
      };
    } else if (selectedRatio === 'my') {
      return {
        components: userComponents,
        loading: userLoading,
        error: userError
      };
    } else {
      return {
        components: categoryComponents,
        loading: categoryLoading,
        error: categoryError
      };
    }
  }, [
    selectedRatio,
    allComponents, allLoading, allError,
    categoryComponents, categoryLoading, categoryError,
    userComponents, userLoading, userError
  ]);

  const filteredComponents = useMemo(() => {
    return components.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [components]);

  return {
    selectedRatio,
    setSelectedRatio,
    ratios,
    filteredComponents,
    loading,
    error
  };
}