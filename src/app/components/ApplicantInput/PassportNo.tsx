import React from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const PassportNo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name='passportNo'
      label={t('form.passport_no')}
      rules={[
        {
          pattern: /^[A-Z0-9]{7,9}$/,
          message: t('form.required.passport_no_pattern'),
        },
      ]}
      normalize={(value) => value?.toUpperCase().replace(/[^A-Z0-9]/g, '')}
    >
      <Input
        placeholder='A1234567'
        style={{ width: '100%', maxWidth: '400px' }}
        maxLength={9}
      />
    </Form.Item>
  );
};

export default PassportNo;
