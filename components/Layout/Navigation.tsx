'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type NavLink = {
  label: string;
  href: string;
};
interface INavigation {
  navLinks: NavLink[];
}

const Navigation = ({ navLinks }: INavigation) => {
  const pathname = usePathname();
  const session = useSession();

  console.log(session);

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {navLinks.map(link => {
        const isActive = pathname === link.href;

        return (
          <Link key={link.label} href={link.href} className={isActive ? 'active' : ''}>
            {link.label}
          </Link>
        );
      })}
      {session?.data && <Link href="/profile">Profile</Link>}
      {session?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </Link>
      ) : (
        <Link href="/signin">SignIn</Link>
      )}
    </Box>
  );
};

export { Navigation };
