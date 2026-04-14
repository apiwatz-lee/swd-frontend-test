import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';

interface DataType {
  key: React.Key;
  firstname: string;
  gender: string;
  mobilePhone: string;
  nationality: string;
}

const columns: TableColumnsType<DataType> = [
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
  },
];

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ApplicantTable: React.FC = () => {
  const formData = useAppSelector((state: RootState) => state.applicantForm);

  return (
    <Table<DataType>
      columns={columns}
      dataSource={formData}
      onChange={onChange}
      style={{ width: '100%', maxWidth: '1800px' }}
    />
  );
};

export default ApplicantTable;
