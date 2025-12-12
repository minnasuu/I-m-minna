import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import ComponentGrid from '../components/ComponentGrid';
import CreateDrawer from '../components/CreateDrawer';
import ComponentDetailModal from "../components/ComponentDetailModal";
import { useComponentFilter } from "../hooks/useComponentFilter";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Icon, LandButton, message } from "@suminhan/land-design";
import type { ComponentItem } from "../types";

export default function Home() {
  const { user } = useAuth();
  const {
    selectedRatio,
    setSelectedRatio,
    ratios,
    filteredComponents,
    loading,
    error,
  } = useComponentFilter();

  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [editingComponent, setEditingComponent] =
    useState<ComponentItem | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailComponent, setDetailComponent] = useState<ComponentItem | null>(
    null
  );
  const welcomeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 监听用户登录状态变化，显示欢迎消息
  useEffect(() => {
    if (user && !showWelcome) {
      setShowWelcome(true);

      // 清除之前的定时器
      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
      }

      // 5秒后隐藏欢迎消息
      welcomeTimerRef.current = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
    }

    // 清理函数
    return () => {
      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
      }
    };
  }, [user, showWelcome]);

  // 处理上传点击
  const handleUploadClick = () => {
    if (!user) {
      message.error("请先登录");
      return;
    }
    setEditingComponent(null); // 清除编辑状态
    setShowCreateDrawer(true);
  };

  // 处理编辑点击
  const handleEditClick = (component: ComponentItem) => {
    setEditingComponent(component);
    setShowCreateDrawer(true);
  };

  // 处理详情点击
  const handleDetailClick = (component: ComponentItem) => {
    setDetailComponent(component);
    setShowDetailModal(true);
  };

  // 处理导航切换
  const handleNavigate = (component: ComponentItem) => {
    setDetailComponent(component);
  };

  // 加载状态
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          title="Insignificant Elements in Web"
          description="A collection of refined UI components and interactions"
        />
        <div className="flex-1 flex items-center justify-center pb-20">
          <div className="text-center">
            <div className="w-5 h-5 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          title="Insignificant Elements in Web"
          description="A collection of refined UI components and interactions"
        />
        <div className="flex-1 flex flex-col items-center justify-center pb-16">
          <Icon name="error-fill" color="#f56c6c" size={32} />
          <p className="text-gray-500 mb-4">{error}</p>

          <LandButton
            type="background"
            text="点击重试"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="广告版位模板"
        description="A collection of refined ad templates"
      />

      <CategoryNav
        ratios={ratios}
        selectedRatio={selectedRatio}
        onCategoryChange={setSelectedRatio}
        onUpload={handleUploadClick}
      />

      <ComponentGrid
        components={filteredComponents}
        selectedRatio={selectedRatio}
        onEdit={handleEditClick}
        onDetail={handleDetailClick}
      />

      <CreateDrawer
        show={showCreateDrawer}
        onClose={() => {
          setShowCreateDrawer(false);
          setEditingComponent(null); // 清除编辑状态
        }}
        initialRatio={
          selectedRatio === "all" ? "16:9" : selectedRatio
        }
        editingComponent={editingComponent}
        onSuccess={() => {
          setShowCreateDrawer(false);
          setEditingComponent(null); // 清除编辑状态
          // 刷新组件列表
          window.location.reload();
        }}
      />

      <ComponentDetailModal
        component={detailComponent}
        components={filteredComponents}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setDetailComponent(null);
        }}
        onNavigate={handleNavigate}
      />
    </div>
  );
}