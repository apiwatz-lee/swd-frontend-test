'use client';

import React, { useState } from 'react';

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

const Layout: React.FC = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<string[]>(itemsShape);

  const handlePrev = () => {
    const firstItems = shapes[0];
    const othersItems = shapes.slice(1);
    const prev = [...othersItems, firstItems];
    setShapes(prev);
  };

  const handleForward = () => {
    const lastItems = shapes[shapes.length - 1];
    const othersItems = shapes.slice(0, shapes.length - 1);
    const forward = [lastItems, ...othersItems];
    setShapes(forward);
  };

  const handleSwap = () => {
    const firstGroup = shapes.slice(0, shapes.length / 2);
    const secondGroup = shapes.slice(shapes.length / 2);
    const swap = [...secondGroup, ...firstGroup];
    setShapes(swap);
  };

  const handleShuffle = () => {
    const shuffle = [...shapes].sort(() => Math.random() - 0.5);
    setShapes(shuffle);
  };

  return (
    <div className='container'>
      <h1>{t('layout.title')}</h1>

      {/* controller */}
      <div className='controller-container'>
        <div className='move-shape' onClick={handlePrev}>
          <Controller arrow='prev' />
          <div className='tag'>{t('layout.forward_prev')}</div>
        </div>

        <div className='move-position' onClick={handleSwap}>
          <Controller arrow='up' className='card-up' />
          <Controller arrow='down' className='card-down' />
          <div className='tag'>{t('layout.up_down')}</div>
        </div>

        <div className='move-shape' onClick={handleForward}>
          <Controller arrow='forward' />
          <div className='tag'>{t('layout.forward_prev')}</div>
        </div>
      </div>

      <Divider />

      {/* shape */}
      <div className='shape-container'>
        {shapes.map((item) => (
          <Card hoverable style={style.card} key={item} onClick={handleShuffle}>
            <div className={item}></div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Layout;
