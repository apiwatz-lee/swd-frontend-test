import React, { useState, useEffect } from 'react';
import { Form, Button, Flex } from 'antd';
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
import * as ApplicantInput from '../components/ApplicantInput';

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
  const { t } = useTranslation();
  const key = useWatch('key', form);

  const onAdd = (values: FormState) => {
    const formattedValues = {
      ...values,
      key: uuidv4(),
      birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
    };
    dispatch(addForm(formattedValues));
    setModalState({ ...modalState, isOpen: false });
    form.resetFields();
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
        <Flex wrap='wrap' gap={8}>
          <ApplicantInput.Title />
          <ApplicantInput.Name name='firstname' label={t('form.firstname')} />
          <ApplicantInput.Name name='lastname' label={t('form.lastname')} />
        </Flex>

        <Flex wrap='wrap' gap={8}>
          <ApplicantInput.Birthday />
          <ApplicantInput.Nationality />
        </Flex>

        <ApplicantInput.CitizenId />
        <ApplicantInput.Gender />

        <Flex>
          <ApplicantInput.MobileNumber />
        </Flex>

        <ApplicantInput.PassportNo />
        <ApplicantInput.Salary />

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
