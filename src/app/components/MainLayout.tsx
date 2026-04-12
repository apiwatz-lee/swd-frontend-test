'use client';

import { Layout } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import i18n from '../i18n';

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  background: 'linear-gradient(to right, #6eda78, #ffa200)',
  height: '100vh',
};

const langSelectStyle: React.CSSProperties = {
  width: 70,
  position: 'absolute',
  top: 10,
  right: 10,
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const langOptions = [
    { value: 'th', label: 'TH' },
    { value: 'en', label: 'EN' },
  ];

  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AntdRegistry>
      <Layout style={layoutStyle}>
        <Select
          defaultValue={i18n.language}
          style={langSelectStyle}
          onChange={handleChange}
          options={langOptions}
        />
        <Content>{children}</Content>
      </Layout>
    </AntdRegistry>
  );
}
