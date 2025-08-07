import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import ThemeRenderer from './ThemeRenderer';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { ArticlesPage, ArticleDetailPage, ProjectsPage, ProjectDetailPage } from '../pages';
import { personalDataMultiLang } from '../data/personalData';

const AppRouter: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className='float-btn-container'>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          
          <Routes>
            <Route path="/" element={<ThemeRenderer data={personalDataMultiLang} />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default AppRouter;
