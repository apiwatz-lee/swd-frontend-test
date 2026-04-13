'use client';

import React from 'react';
import './form.css';
import { useTranslation } from 'react-i18next';
import ApplicantForm from '../components/ApplicantForm';

const FormPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='container'>
      <h1 className='title'>{t('form.title')}</h1>
      <ApplicantForm />
      <div className='table'>table</div>
    </div>
  );
};

export default FormPage;
