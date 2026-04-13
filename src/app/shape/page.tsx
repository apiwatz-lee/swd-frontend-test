'use client';

import React from 'react';
import './shape.css';
import { Card } from 'antd';
import { Divider } from 'antd';
import Controller from '../components/Controller';
import { useTranslation } from 'react-i18next';

const itemsShape: string[] = [
  'trapezoid',
  'parallelogram',
  'rectangle',
  'ellipse',
  'square',
  'circle',
];

const Layout: React.FC = () => {
  const { t } = useTranslation();
  const style = {
    card: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 400,
      height: 230,
      padding: 90,
      cursor: 'pointer',
      border: 'none',
    },
  };

  return (
    <div className='container'>
      <h1>{t('layout.title')}</h1>

      {/* controller */}
      <div className='controller-container'>
        <div className='move-shape'>
          <Controller arrow='prev' />
          <div className='tag'>{t('layout.forward_prev')}</div>
        </div>

        <div className='move-position'>
          <Controller arrow='up' className='card-up' />
          <Controller arrow='down' className='card-down' />
          <div className='tag'>{t('layout.up_down')}</div>
        </div>

        <div className='move-shape'>
          <Controller arrow='forward' />
          <div className='tag'>{t('layout.forward_prev')}</div>
        </div>
      </div>

      <Divider />

      {/* shape */}
      <div className='shape-container'>
        {itemsShape.map((item) => (
          <Card hoverable style={style.card} key={item}>
            <div className={item}></div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Layout;
