import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
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
    sorter: (a, b) => a.gender - b.gender,
    width: '20%',
  },
  {
    title: 'Mobile phone',
    dataIndex: 'mobilePhone',
    sorter: (a, b) => a.mobilePhone - b.mobilePhone,
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

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
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
  const getDataFromLocalStorage = (): DataType[] => {
    const existingData = JSON.parse(
      localStorage.getItem('applicantForm') || '[]',
    ) as DataType[];
    return existingData;
  };

  return (
    <Table<DataType>
      columns={columns}
      dataSource={getDataFromLocalStorage()}
      onChange={onChange}
      style={{ width: '100%', maxWidth: '1800px' }}
    />
  );
};

export default ApplicantTable;
