import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
  InputNumber,
  Space,
} from 'antd';
import type { FormInstance } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { addForm, updateForm } from '../store/slices/formSlice';
import { applicantInitialValues } from '../store/slices/formSlice';
import type { FormState } from '../store/slices/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { setDataToLocalStorage } from '../hooks/localStorage';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const { useWatch } = Form;

const ApplicantForm: React.FC<{ form: FormInstance; modal: React.FC<any> }> = ({
  form,
  modal: ModalComponent,
}) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    description: '',
  });
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state: RootState) => state.applicantForm);
  const { t, i18n } = useTranslation();
  const key = useWatch('key', form);

  const onAdd = (values: FormState) => {
    const formattedValues = {
      ...values,
      key: uuidv4(),
      birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
    };
    dispatch(addForm(formattedValues));
    setModalState({ ...modalState, isOpen: false });
    // form.resetFields();
  };

  const onEdit = (values: FormState) => {
    const formattedValues = {
      ...values,
      birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
    };
    dispatch(updateForm(formattedValues));
    setModalState({ ...modalState, isOpen: false });
    form.resetFields();
  };

  const handleReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    setDataToLocalStorage('applicantForm', formData);
  }, [formData]);

  return (
    <>
      <ModalComponent
        isOpen={modalState.isOpen}
        title={modalState.title}
        description={modalState.description}
        onOk={
          key
            ? () => onEdit(form.getFieldsValue())
            : () => onAdd(form.getFieldsValue())
        }
        onCancel={() => setModalState({ ...modalState, isOpen: false })}
      />

      <Form
        form={form}
        initialValues={applicantInitialValues}
        layout='horizontal'
        onFinish={() =>
          setModalState({
            title: t('modal.submit.title'),
            description: t('modal.submit.content'),
            isOpen: true,
          })
        }
        style={{
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid black',
          width: '100%',
          maxWidth: '1024px',
        }}
      >
        <Form.Item name='key' hidden />
        <Row gutter={16}>
          {/* Title */}
          <Col span={5}>
            <Form.Item
              name='title'
              label={t('form.title')}
              rules={[{ required: true, message: t('form.required.default') }]}
            >
              <Select
                placeholder={t('form.title')}
                options={[
                  { value: 'Mr.', label: t('form.mr') },
                  { value: 'Ms.', label: t('form.ms') },
                ]}
              />
            </Form.Item>
          </Col>
          {/* Firstname */}
          <Col span={8}>
            <Form.Item
              name='firstname'
              label={t('form.firstname')}
              rules={[{ required: true, message: t('form.required.default') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* Lastname */}
          <Col span={8}>
            <Form.Item
              name='lastname'
              label={t('form.lastname')}
              rules={[{ required: true, message: t('form.required.default') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Birthday */}
          <Col span={8}>
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
          </Col>

          {/* Nationality */}
          <Col span={12}>
            <Form.Item
              name='nationality'
              label={t('form.nationality')}
              rules={[{ required: true, message: t('form.required.default') }]}
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
          </Col>
        </Row>

        {/* Citizen ID */}
        <Form.Item label='Citizen ID'>
          <Space size='small'>
            <Form.Item name={['citizenId', 0]} noStyle>
              <Input maxLength={1} style={{ width: 50 }} />
            </Form.Item>
            <span>-</span>
            <Form.Item name={['citizenId', 1]} noStyle>
              <Input maxLength={4} style={{ width: 120 }} />
            </Form.Item>
            <span>-</span>
            <Form.Item name={['citizenId', 2]} noStyle>
              <Input maxLength={5} style={{ width: 120 }} />
            </Form.Item>
            <span>-</span>
            <Form.Item name={['citizenId', 3]} noStyle>
              <Input maxLength={2} style={{ width: 80 }} />
            </Form.Item>
            <span>-</span>
            <Form.Item name={['citizenId', 4]} noStyle>
              <Input maxLength={1} style={{ width: 70 }} />
            </Form.Item>
          </Space>
        </Form.Item>

        {/* gender */}
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

        {/* Mobile Phone */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t('form.mobile_phone')} required>
              <Space.Compact
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
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
                    style={{ width: '120px', height: '100%' }}
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
                      message: 'Phone number must be 9 digits!',
                    },
                  ]}
                >
                  <Input
                    placeholder='919392839'
                    maxLength={9}
                    inputMode='tel'
                    onInput={(e) => {
                      (e.target as HTMLInputElement).value = (
                        e.target as HTMLInputElement
                      ).value.replace(/\D/g, '');
                    }}
                  />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>

        {/* Passport No */}
        <Form.Item
          name='passportNo'
          label={t('form.passport_no')}
          rules={[
            {
              pattern: /^[A-Z0-9]{7,9}$/,
              message:
                'Passport number must be 7-9 characters (Letters & Numbers)',
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

        {/* Expected Salary */}
        <Form.Item
          name='salary'
          label={t('form.expected_salary')}
          rules={[{ required: true, message: t('form.required.default') }]}
        >
          <InputNumber type='number' style={{ width: '200px' }} />
        </Form.Item>

        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            {t('button.reset')}
          </Button>

          {key ? (
            <Button
              type='primary'
              onClick={() => {
                setModalState({
                  title: t('modal.edit.title'),
                  description: t('modal.edit.content'),
                  isOpen: true,
                });
              }}
            >
              {t('button.edit')}
            </Button>
          ) : (
            <Button type='primary' htmlType='submit'>
              {t('button.submit')}
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default ApplicantForm;
