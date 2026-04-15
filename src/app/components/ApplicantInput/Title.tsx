import React from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const Title: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name='title'
      label={t('form.title')}
      rules={[{ required: true, message: t('form.required.default') }]}
      style={{ minWidth: '180px' }}
    >
      <Select
        placeholder={t('form.title')}
        options={[
          { value: 'Mr.', label: t('form.mr') },
          { value: 'Ms.', label: t('form.ms') },
        ]}
      />
    </Form.Item>
  );
};

export default Title;
