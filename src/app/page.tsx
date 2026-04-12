'use client';
import React from 'react';
import Link from 'next/link';
import { Card, Flex, Typography } from 'antd';

const { Title, Text } = Typography;

const pages = [
  { key: '1', title: 'Test 1', subtitle: 'Layout & Style', path: '/layout' },
  { key: '2', title: 'Test 2', subtitle: 'Form & Table', path: '/form' },
];

const Home: React.FC = () => {
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
          <Link
            key={item?.key}
            href={item?.path}
            style={{ textDecoration: 'none' }}
          >
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
