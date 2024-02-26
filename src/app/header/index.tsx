import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/ui/mode-toggle';

function Header() {
  return (
    <div className='mx-8'>
      <div className='flex flex-row justify-between items-center w-100 pr-8'>
        <div>
        <Link href="/">
          <p className='m-4'>Home</p>
        </Link>
        </div>

      <div>
      <ModeToggle/>
      </div>
      </div>

      <div className='text-sm flex flex-wrap justify-start gap-5 my-6'>
        <Link href='/'>
        <Button variant="outline">Home</Button>
        </Link>
        <Link href='/news'>
          <Button variant="outline">News</Button>
        </Link>
        <Link href='/screener'>
          <Button variant="outline">Screener</Button>
        </Link>
        <Link href='/maps'>
          <Button variant="outline">Maps</Button>
        </Link>
        <Link href='/groups'>
          <Button variant="outline">Groups</Button>
        </Link>
        <Link href='/portfolio'>
          <Button variant="outline">Portfolio</Button>
        </Link>
        <Link href='/insider'>
          <Button variant="outline">Insider</Button>
        </Link>
        <Link href='/futures'>
          <Button variant="outline">Futures</Button>
        </Link>
        <Link href='/forex'>
          <Button variant="outline">Forex</Button>
        </Link>
        <Link href='/crypto'>
          <Button variant="outline">Crypto</Button>
        </Link>
        <Link href='/backtests'>
          <Button variant="outline">Backtests</Button>
        </Link>
        <Link href='/elite'>
          <Button variant="outline">Elite</Button>
        </Link>
      </div>
      </div>
  );
}

export default Header;
