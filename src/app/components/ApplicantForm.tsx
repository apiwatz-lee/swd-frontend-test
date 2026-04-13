import React from 'react';
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
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { addForm, resetForm } from '../store/slices/formSlice';

const ApplicantForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state: RootState) => state.applicantForm);

  const onFinish = (values: any) => {
    dispatch(addForm(values));
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(resetForm());
  };

  return (
    <Form
      form={form}
      layout='horizontal'
      onFinish={onFinish}
      initialValues={formData}
      style={{
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid black',
        width: '100%',
        maxWidth: '1024px',
      }}
    >
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
      <Form.Item label='CitizenId' required>
        <Space size='small'>
          <Form.Item name='citizenId1' noStyle>
            <Input maxLength={1} style={{ width: 50 }} />
          </Form.Item>
          <span>-</span>
          <Form.Item name='citizenId2' noStyle>
            <Input maxLength={4} style={{ width: 120 }} />
          </Form.Item>
          <span>-</span>
          <Form.Item name='citizenId3' noStyle>
            <Input maxLength={5} style={{ width: 120 }} />
          </Form.Item>
          <span>-</span>
          <Form.Item name='citizenId4' noStyle>
            <Input maxLength={2} style={{ width: 80 }} />
          </Form.Item>
          <span>-</span>
          <Form.Item name='citizenId5' noStyle>
            <Input maxLength={1} style={{ width: 70 }} />
          </Form.Item>
        </Space>
      </Form.Item>

      {/* gender */}
      <Form.Item name='gender' label='Gender' rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value='male'>Male</Radio>
          <Radio value='female'>Female</Radio>
          <Radio value='unsex'>Unsex</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Mobile Phone */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='mobilePhone'
            label='Mobile Phone'
            rules={[{ required: true }]}
          >
            <Input addonBefore='+66' placeholder='0123456789' />
          </Form.Item>
        </Col>
      </Row>

      {/* Passport Number */}
      <Form.Item
        name='passportNo'
        label='Passport No'
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: '400px' }} />
      </Form.Item>

      {/* Expected Salary */}
      <Form.Item
        name='salary'
        label='Expected Salary'
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: '200px' }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
        />
      </Form.Item>

      <div style={{ textAlign: 'right' }}>
        <Button onClick={handleReset} style={{ marginRight: 8 }}>
          RESET
        </Button>
        <Button type='primary' htmlType='submit'>
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default ApplicantForm;
