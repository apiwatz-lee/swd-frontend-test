import React from 'react';
import { Form, Space, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const CitizenId: React.FC = () => {
  const { t } = useTranslation();
  const citizenIdFields = [
    { name: 0, maxLength: 1, width: 50 },
    { name: 1, maxLength: 4, width: 100 },
    { name: 2, maxLength: 5, width: 110 },
    { name: 3, maxLength: 2, width: 80 },
    { name: 4, maxLength: 1, width: 50 },
  ];

  return (
    <Form.Item label={t('form.citizen_id')}>
      <Space size='small' style={{ flexWrap: 'wrap' }}>
        {citizenIdFields.map((field, index) => (
          <React.Fragment key={field.name}>
            <Form.Item name={['citizenId', field.name]} noStyle>
              <Input
                maxLength={field.maxLength}
                style={{ width: field.width, textAlign: 'center' }}
                placeholder={'0'.repeat(field.maxLength)}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^0-9]/g, '');
                  if (
                    target.value.length === field.maxLength &&
                    index < citizenIdFields.length - 1
                  ) {
                    const nextField =
                      target.parentElement?.nextElementSibling?.nextElementSibling?.querySelector(
                        'input',
                      );
                    nextField?.focus();
                  }
                }}
              />
            </Form.Item>

            {index < citizenIdFields.length - 1 && <span>-</span>}
          </React.Fragment>
        ))}
      </Space>
    </Form.Item>
  );
};

export default CitizenId;
