import React, { useState } from 'react';
import { Table, Button, Flex, Checkbox, Modal } from 'antd';
import type { TableColumnsType, TableProps, FormInstance } from 'antd';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store';
import { removeForm, removeMultipleForms } from '../store/slices/formSlice';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import dayjs from 'dayjs';
import { FormState } from '../store/slices/formSlice';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const ApplicantTable: React.FC<{
  form: FormInstance;
  modal: React.FC<any>;
}> = ({ form, modal: ModalComponent }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const formData = useAppSelector((state: RootState) => state.applicantForm);
  const dispatch = useAppDispatch();
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    description: '',
  });

  const columns: TableColumnsType<FormState> = [
    {
      title: 'Name',
      dataIndex: 'firstname',
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
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
      sorter: (a, b) =>
        a.mobilePhone.join(' ').localeCompare(b.mobilePhone.join(' ')),
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
            <Button
              onClick={() => {
                setModalState({
                  title: 'Are you sure you want to delete the form?',
                  description: 'This action cannot be undone.',
                  isOpen: true,
                });
                setSelectedRowKeys([record.key]);
              }}
              danger
            >
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

  const onDeleteOne = (key: React.Key) => {
    dispatch(removeForm(key));
    setSelectedRowKeys([]);
    setModalState({ ...modalState, isOpen: false });
  };

  const onDeleteMultiple = (keys: React.Key[]) => {
    dispatch(removeMultipleForms(keys));
    setSelectedRowKeys([]);
    setModalState({ ...modalState, isOpen: false });
  };

  const onCancel = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <>
      <ModalComponent
        title={modalState.title}
        description={modalState.description}
        isOpen={modalState.isOpen}
        onOk={
          selectedRowKeys.length > 1
            ? () => onDeleteMultiple(selectedRowKeys)
            : () => onDeleteOne(selectedRowKeys[0])
        }
        onCancel={onCancel}
      />
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
            checked={
              selectedRowKeys.length === formData.length && formData.length > 0
            }
          >
            Select All
          </Checkbox>
          <Button
            disabled={selectedRowKeys.length === 0}
            onClick={() =>
              setModalState({
                title: 'Are you sure you want to delete the selected forms?',
                description: 'This action cannot be undone.',
                isOpen: true,
              })
            }
            danger
          >
            Delete
          </Button>
        </div>

        <Table<FormState>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={formData}
          style={{ width: '100%' }}
          pagination={{
            pageSize: 5,
            position: ['topRight'],
          }}
        />
      </Flex>
    </>
  );
};

export default ApplicantTable;
