import React from 'react';
import { Form, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

const Gender: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name='gender'
      label={t('form.gender')}
      rules={[{ required: true, message: t('form.required.default') }]}
    >
      <Radio.Group>
        <Radio value='male'>{t('form.male')}</Radio>
        <Radio value='female'>{t('form.female')}</Radio>
        <Radio value='unisex'>{t('form.unisex')}</Radio>
      </Radio.Group>
    </Form.Item>
  );
};

export default Gender;
