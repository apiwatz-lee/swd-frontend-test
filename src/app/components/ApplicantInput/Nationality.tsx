import React from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const Nationality: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name='nationality'
      label={t('form.nationality')}
      rules={[{ required: true, message: t('form.required.default') }]}
      style={{ minWidth: '180px' }}
    >
      <Select
        placeholder={t('form.nationality')}
        options={[
          { value: 'thai', label: t('nationality.thai') },
          { value: 'chinese', label: t('nationality.chinese') },
          { value: 'american', label: t('nationality.american') },
        ]}
      />
    </Form.Item>
  );
};

export default Nationality;
