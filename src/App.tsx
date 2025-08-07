import { ThemeProvider } from './contexts/ThemeContext';
import ThemeRenderer from './components/ThemeRenderer';
import ThemeSwitcher from './components/ThemeSwitcher';
import { personalData } from './data/personalData';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="relative w-full h-full">
        <ThemeSwitcher />
        <ThemeRenderer data={personalData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
