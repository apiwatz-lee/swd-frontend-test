import React from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const Salary: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name='salary'
      label={t('form.expected_salary')}
      rules={[{ required: true, message: t('form.required.default') }]}
    >
      <InputNumber
        type='number'
        style={{ width: '200px' }}
        min={1}
        max={10000000}
      />
    </Form.Item>
  );
};

export default Salary;
