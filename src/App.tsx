import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ThemeRenderer from './components/ThemeRenderer';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import { personalDataMultiLang } from './data/personalData';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
           <div className='float-btn-container'>
            <LanguageSwitcher />
           <ThemeSwitcher />
         </div>
         <ThemeRenderer data={personalDataMultiLang} />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
