'use client';

import React, { useState, useEffect } from 'react';
import './form.css';
import { useTranslation } from 'react-i18next';
import ApplicantForm from '../components/ApplicantForm';
import ApplicantTable from '../components/ApplicantTable';
import { Form } from 'antd';

const FormPage: React.FC = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className='container'>
      <h1 className='title'>{t('form.title')}</h1>
      <ApplicantForm form={form} />
      <ApplicantTable form={form} />
    </div>
  );
};

export default FormPage;
