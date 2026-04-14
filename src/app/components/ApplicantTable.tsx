import React from 'react';
import { Table, Button } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store';
import { removeForm, updateForm } from '../store/slices/formSlice';
import type { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { FormState } from '../store/slices/formSlice';

const onChange: TableProps<FormState>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ApplicantTable: React.FC<{ form: FormInstance }> = ({ form }) => {
  const formData = useAppSelector((state: RootState) => state.applicantForm);
  const dispatch = useAppDispatch();
  const columns: TableColumnsType<FormState> = [
    {
      title: 'Name',
      dataIndex: 'firstname',
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      width: '20%',
    },
    {
      title: 'Mobile phone',
      dataIndex: 'mobilePhone',
      sorter: (a, b) => a.mobilePhone.localeCompare(b.mobilePhone),
      width: '20%',
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      width: '20%',
    },
    {
      title: 'Manage',
      dataIndex: 'manage',
      width: '20%',
      render: (_, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                form.setFieldsValue({
                  ...record,
                  birthday: dayjs(record.birthday),
                });
              }}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button onClick={() => dispatch(removeForm(record.key))} danger>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table<FormState>
      columns={columns}
      dataSource={formData}
      onChange={onChange}
      style={{ width: '100%', maxWidth: '1800px' }}
    />
  );
};

export default ApplicantTable;
