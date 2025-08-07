import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import ThemeRenderer from "./ThemeRenderer";
import { ArticlesPage, ArticleDetailPage, ProjectsPage, ProjectDetailPage, CraftsPage, CraftDetailPage } from '../pages';
import { personalDataMultiLang } from '../data/personalData';

const AppRouter: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<ThemeRenderer data={personalDataMultiLang} />}
            />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/crafts" element={<CraftsPage />} />
            <Route path="/crafts/:id" element={<CraftDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default AppRouter;
