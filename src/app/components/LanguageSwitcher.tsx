import React from 'react';
import i18n from '../i18n';
import { Select } from 'antd';

const langSelectStyle: React.CSSProperties = {
  width: 70,
  position: 'absolute',
  top: 10,
  right: 10,
};

const LanguageSwitcher = () => {
  const langOptions = [
    { value: 'en', label: 'EN' },
    { value: 'th', label: 'TH' },
  ];

  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Select
        defaultValue={i18n.language}
        style={langSelectStyle}
        onChange={handleChange}
        options={langOptions}
      />
    </>
  );
};

export default LanguageSwitcher;
