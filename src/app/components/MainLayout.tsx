'use client';

import { Layout } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import LanguageSwitcher from './LanguageSwitcher';
import { Provider } from 'react-redux';
import { store } from '../store';

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  background: 'linear-gradient(to right, #6eda78, #ffa200)',
  height: '100vh',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <Layout style={layoutStyle}>
          <LanguageSwitcher />
          <Content>{children}</Content>
        </Layout>
      </AntdRegistry>
    </Provider>
  );
}
