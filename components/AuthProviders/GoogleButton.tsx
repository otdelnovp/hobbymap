'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Button variant="contained" color="error" startIcon={<GoogleIcon />} disableRipple onClick={() => signIn('google', { callbackUrl })}>
      Sign in with Google
    </Button>
  );
};

export { GoogleButton };
