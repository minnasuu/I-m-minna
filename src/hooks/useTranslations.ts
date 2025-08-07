import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../data/translations';

export const useTranslations = () => {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    return getTranslation(language, key);
  };
  
  return { t, language };
};
