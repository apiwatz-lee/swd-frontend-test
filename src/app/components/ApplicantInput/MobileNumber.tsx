import React from 'react';
import { Form, Space, Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const MobileNumber: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form.Item label={t('form.mobile_phone')} required>
      <Space.Compact
        style={{
          display: 'flex',
          gap: '12px',
          width: '100%',
        }}
      >
        <Form.Item
          name={['mobilePhone', 0]}
          noStyle
          rules={[
            {
              required: true,
              message: t('form.required.prefix_mobile_phone'),
            },
          ]}
          initialValue='+66'
        >
          <Select
            style={{ width: '140px', height: '100%' }}
            options={[
              { value: '+66', label: '🇹🇭 +66' },
              { value: '+86', label: '🇨🇳 +86' },
              { value: '+1', label: '🇺🇸 +1' },
            ]}
          />
        </Form.Item>
        <span>-</span>
        <Form.Item
          name={['mobilePhone', 1]}
          noStyle
          rules={[
            {
              required: true,
              message: t('form.required.mobile_phone'),
            },
            {
              pattern: /^[0-9]{9}$/,
              message: t('form.required.mobile_phone_pattern'),
            },
          ]}
        >
          <Input
            placeholder='919392839'
            maxLength={9}
            inputMode='tel'
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/\D/g, '');
            }}
          />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  );
};

export default MobileNumber;
