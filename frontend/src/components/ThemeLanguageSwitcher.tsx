import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function ThemeLanguageSwitcher() {
    const { theme, toggleTheme } = useTheme();
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN';
        i18n.changeLanguage(newLang);
    };

    const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh';

    return (
        <div className="btn-group btn-group-sm" role="group">
            <button
                className="btn btn-outline-secondary"
                onClick={toggleLanguage}
                title={isZh ? 'Switch to English' : '切换到中文'}
            >
                <i className="bi bi-globe2 me-1"></i>
                <span>{isZh ? 'EN' : '中'}</span>
            </button>
            <button
                className="btn btn-outline-secondary"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
                <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
            </button>
        </div>
    );
}
