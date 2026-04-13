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
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
      }}
    >
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item name='title' label='Title' rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Mr.', label: 'Mr.' },
                { value: 'Ms.', label: 'Ms.' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name='firstname'
            label='Firstname'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
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
        <Col span={8}>
          <Form.Item
            name='birthday'
            label='Birthday'
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            name='nationality'
            label='Nationality'
            rules={[{ required: true }]}
          >
            <Select placeholder='Please select' />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label='CitizenID'>
        <Input.Group compact>
          <Input style={{ width: '15%' }} maxLength={1} />
          <Input style={{ width: '25%' }} maxLength={4} />
          <Input style={{ width: '30%' }} maxLength={5} />
          <Input style={{ width: '20%' }} maxLength={2} />
          <Input style={{ width: '10%' }} maxLength={1} />
        </Input.Group>
      </Form.Item>

      <Form.Item name='gender' label='Gender' rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value='Male'>Male</Radio>
          <Radio value='Female'>Female</Radio>
          <Radio value='Unsex'>Unsex</Radio>
        </Radio.Group>
      </Form.Item>

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

      <Form.Item
        name='expectedSalary'
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
