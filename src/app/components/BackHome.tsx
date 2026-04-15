import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const BackHome: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  if (pathname === '/') return null;
  return (
    <Link href='/' passHref>
      <Button style={{ position: 'absolute', top: 50, right: 10 }}>
        {t('homepage.default')}
      </Button>
    </Link>
  );
};

export default BackHome;
