import React from 'react';
import { DatePicker, Form } from 'antd';
import { useTranslation } from 'react-i18next';

const Birthday: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name='birthday'
      label={t('form.birthday')}
      rules={[{ required: true, message: t('form.required.default') }]}
    >
      <DatePicker
        placeholder={t('form.date_format')}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};

export default Birthday;
