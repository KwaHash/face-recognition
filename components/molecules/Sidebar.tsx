'use client';

import React from 'react';
import Link from 'next/link';
import { Paper, Divider } from '@mui/material';
import { Clapperboard, Images } from 'lucide-react';
import Logo from '@/components/atoms/Logo';

const menues = [
  { label: '顔登録', icon: <Clapperboard />, link: '/' as const },
  { label: '顔一覧', icon: <Images />, link: 'list' as const },
];

const Sidebar = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: 250,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Logo />
      <Divider />

      {menues.map((item, index) => (
        <div key={index}>
          <Link
            className={`w-full flex items-center pl-8 py-4`}
            href={item.link}
          >
            <span className="mr-4 text-3xl">{item.icon}</span>
            <span className='font-bold'>{item.label}</span>
          </Link>
          <Divider />
        </div>
      ))}
    </Paper>
  );
}

export default Sidebar;