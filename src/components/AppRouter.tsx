import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import ThemeRenderer from "./ThemeRenderer";
import { ArticlesPage, ArticleDetailPage } from "../pages";
import { personalDataMultiLang } from "../data/personalData";

// 滚动重置组件
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 路由变化时立即滚动到顶部
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRouter: React.FC = () => {
  // 根据环境设置 basename
  const basename = process.env.NODE_ENV === "production" ? "/I-m-minna" : "";

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router basename={basename}>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={<ThemeRenderer data={personalDataMultiLang} />}
            />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default AppRouter;
