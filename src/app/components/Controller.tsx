import React from 'react';
import { Card } from 'antd';

type Props = {
  arrow: 'prev' | 'up' | 'down' | 'forward';
  className?: string;
};

const Controller: React.FC<Props> = ({ arrow, className }: Props) => {
  return (
    <Card
      hoverable
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        height: 230,
        padding: 90,
        cursor: 'pointer',
        border: 'none',
      }}
      className={className}
    >
      <div className={arrow}></div>
    </Card>
  );
};

export default Controller;
