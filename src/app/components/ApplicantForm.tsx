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

const { useWatch } = Form;

const ApplicantForm: React.FC<{ form: FormInstance; modal: React.FC<any> }> = ({
  form,
  modal: ModalComponent,
}) => {
  const dispatch = useAppDispatch();
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    description: '',
  });
  const formData = useAppSelector((state: RootState) => state.applicantForm);
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
            title: 'Are you sure you want to submit the form?',
            description: 'Please review your information before submitting.',
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
            <Form.Item name='title' label='Title' rules={[{ required: true }]}>
              <Select
                options={[
                  { value: 'Mr.', label: 'Mr.' },
                  { value: 'Ms.', label: 'Ms.' },
                ]}
              />
            </Form.Item>
          </Col>
          {/* Firstname */}
          <Col span={8}>
            <Form.Item
              name='firstname'
              label='Firstname'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* Lastname */}
          <Col span={8}>
            <Form.Item
              name='lastname'
              label='Lastname'
              rules={[{ required: true }]}
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
              label='Birthday'
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          {/* Nationality */}
          <Col span={12}>
            <Form.Item
              name='nationality'
              label='Nationality'
              rules={[{ required: true }]}
            >
              <Select
                placeholder='Please select'
                options={[
                  { value: 'Thai', label: 'Thai' },
                  { value: 'Chinese', label: 'Chinese' },
                  { value: 'American', label: 'American' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Citizen ID */}
        <Form.Item label='Citizen ID' required>
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
        <Form.Item name='gender' label='Gender' rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value='male'>Male</Radio>
            <Radio value='female'>Female</Radio>
            <Radio value='unsex'>Unisex</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Mobile Phone */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Mobile Phone' required>
              <Space.Compact style={{ width: '100%' }}>
                <Form.Item
                  name={['mobilePhone', 0]}
                  noStyle
                  rules={[{ required: true, message: 'Code is required' }]}
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

                <Form.Item
                  name={['mobilePhone', 1]}
                  noStyle
                  rules={[
                    { required: true, message: 'Phone number is required' },
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
                      e.target.value = e.target.value.replace(/\D/g, '');
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
          label='Passport No'
          rules={[
            { required: true, message: 'Please input your passport number!' },
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
          label='Expected Salary'
          rules={[{ required: true }]}
        >
          <InputNumber type='number' style={{ width: '200px' }} />
        </Form.Item>

        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            RESET
          </Button>

          {key ? (
            <Button
              type='primary'
              onClick={() => {
                setModalState({
                  title: 'Are you sure you want to edit the form?',
                  description: 'Please review your information before editing.',
                  isOpen: true,
                });
              }}
            >
              Edit
            </Button>
          ) : (
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default ApplicantForm;
