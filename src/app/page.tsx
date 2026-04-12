'use client';
import React from 'react';
import Link from 'next/link';
import { Card, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { Title, Text } = Typography;
  const { t } = useTranslation();

  const pages = [
    {
      key: 'layout',
      title: t('homepage.test1'),
      subtitle: t('homepage.layout'),
      path: '/layout',
    },
    {
      key: 'form',
      title: t('homepage.test2'),
      subtitle: t('homepage.form'),
      path: '/form',
    },
  ];

  return (
    <Flex
      vertical
      justify='center'
      align='center'
      style={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Flex gap='large' wrap='wrap' justify='center'>
        {pages.map((item) => (
          <Link key={item?.key} href={item?.path}>
            <Card
              hoverable
              style={{
                width: 320,
                borderRadius: 8,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Title level={4}>{item?.title}</Title>
              <Text type='secondary'>{item?.subtitle}</Text>
            </Card>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
