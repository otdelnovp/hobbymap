'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';

const FacebookButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Button
      variant="contained"
      startIcon={<FacebookIcon />}
      disableRipple
      fullWidth
      sx={{ mt: 1 }}
      onClick={() => signIn('facebook', { callbackUrl })}>
      Sign in with Facebook
    </Button>
  );
};

export { FacebookButton };
