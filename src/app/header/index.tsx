import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/ui/mode-toggle';
// import { Menubar } from '@radix-ui/react-menubar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

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
        {/* <Menubar/> */}
        <Menubar>
          <MenubarMenu>
            <Link href="/homepage">
              <MenubarTrigger>
              Home
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
            {/* <MenubarContent>
            </MenubarContent> */}
            <MenubarMenu>
            <Link href="/news">
              <MenubarTrigger>
              News
              </MenubarTrigger>
            </Link>
            </MenubarMenu>
            
            <MenubarMenu>
            <Link href="/screener">
              <MenubarTrigger>
              Screener
              </MenubarTrigger>
            </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/news">
                <MenubarTrigger>
                  News
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/screener">
                <MenubarTrigger>
                 Screener
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/maps">
                <MenubarTrigger>
                 Maps
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/groups">
                <MenubarTrigger>
                 Groups
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/portfolio">
                <MenubarTrigger>
                 Portfolio
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/insider">
                <MenubarTrigger>
                 Insider
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/future">
                <MenubarTrigger>
                 Future
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/forex">
                <MenubarTrigger>
                 Forex
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/crypto">
                <MenubarTrigger>
                 Crypto
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/backtests">
                <MenubarTrigger>
                 Backtests
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/elite">
                <MenubarTrigger>
                 Elite
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
             
    </Menubar>
      </div>
      </div>
  );
}

export default Header;
