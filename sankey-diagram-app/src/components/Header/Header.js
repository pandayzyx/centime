import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/centime-logo.png';
import styles from './Header.module.css';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Centime Logo" className={styles.logo} />
      <h1>{t('header')}</h1>
      <div className={styles.languageSwitcher}>
        <label>{t('language')}: </label>
        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue="en">
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
    </header>
  );
};

export default Header;