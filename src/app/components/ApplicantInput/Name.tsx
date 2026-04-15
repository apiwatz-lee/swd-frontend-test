import React from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Name: React.FC<{ name: string; label: string }> = ({ name, label }) => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name={name}
      label={t(label)}
      rules={[{ required: true, message: t('form.required.default') }]}
    >
      <Input />
    </Form.Item>
  );
};

export default Name;
