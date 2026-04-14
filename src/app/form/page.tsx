'use client';

import React, { useState, useEffect } from 'react';
import './form.css';
import { useTranslation } from 'react-i18next';
import ApplicantForm from '../components/ApplicantForm';
import ApplicantTable from '../components/ApplicantTable';
import { Form, Modal } from 'antd';

const FormPage: React.FC = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState<boolean>(false);
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
      <ApplicantForm
        form={form}
        modal={(props) => {
          return (
            <Modal
              title={props.title}
              centered
              open={props.isOpen}
              onOk={props.onOk}
              onCancel={props.onCancel}
            >
              <p>{props.description}</p>
            </Modal>
          );
        }}
      />
      <ApplicantTable
        form={form}
        modal={(props) => {
          return (
            <Modal
              title={props.title}
              centered
              open={props.isOpen}
              onOk={props.onOk}
              onCancel={props.onCancel}
            >
              <p>{props.description}</p>
            </Modal>
          );
        }}
      />
    </div>
  );
};

export default FormPage;
