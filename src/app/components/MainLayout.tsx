'use client';

import { Layout } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Select } from 'antd';

const langOptions = [
  { value: 'th', label: 'TH' },
  { value: 'en', label: 'EN' },
];

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
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <AntdRegistry>
      <Layout style={layoutStyle}>
        <Select
          defaultValue='th'
          style={langSelectStyle}
          onChange={handleChange}
          options={langOptions}
        />
        <Content>{children}</Content>
      </Layout>
    </AntdRegistry>
  );
}
