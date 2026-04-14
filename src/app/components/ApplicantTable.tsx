import React, { useState } from 'react';
import { Table, Button, Flex, Checkbox } from 'antd';
import type { TableColumnsType, TableProps, FormInstance } from 'antd';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store';
import { removeForm, removeMultipleForms } from '../store/slices/formSlice';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import dayjs from 'dayjs';
import { FormState } from '../store/slices/formSlice';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const onChange: TableProps<FormState>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ApplicantTable: React.FC<{ form: FormInstance }> = ({ form }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<FormState> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allKeys = formData.map((item: FormState) => item.key);
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleDeleteSelected = () => {
    dispatch(removeMultipleForms(selectedRowKeys));
    setSelectedRowKeys([]);
  };

  return (
    <Flex
      vertical
      justify='center'
      align='center'
      style={{ width: '100%', maxWidth: '1800px' }}
      gap={24}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <Checkbox
          onChange={handleSelectAll}
          checked={selectedRowKeys.length === formData.length}
        >
          Select All
        </Checkbox>
        <Button onClick={handleDeleteSelected} danger>
          Delete
        </Button>
      </div>

      <Table<FormState>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={formData}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </Flex>
  );
};

export default ApplicantTable;
