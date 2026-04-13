import React from 'react';
import './shape.css';
import { Card } from 'antd';
import { Divider } from 'antd';

const itemsShape: string[] = [
  'trapezoid',
  'parallelogram',
  'rectangle',
  'ellipse',
  'square',
  'circle',
];

const Layout: React.FC = () => {
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
      <h1>Layout & Style</h1>

      {/* controller */}
      <div className='controller-container'>
        <div className='move-shape'>
          <Card hoverable style={style.card}>
            <div className='prev'></div>
          </Card>
          <div className='tag'>Move shape</div>
        </div>

        <div className='move-position'>
          <Card hoverable style={style.card} className='card-up'>
            <div className='up'></div>
          </Card>
          <Card hoverable style={style.card} className='card-down'>
            <div className='down'></div>
          </Card>
          <div className='tag'>Move position</div>
        </div>

        <div className='move-shape'>
          <Card hoverable style={style.card}>
            <div className='forward'></div>
          </Card>
          <div className='tag'>Move shape</div>
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
