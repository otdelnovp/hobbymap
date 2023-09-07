'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import Button from '@mui/material/Button';
import AppleIcon from '@mui/icons-material/Apple';

const VKButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Button variant="contained" startIcon={<AppleIcon />} disableRipple fullWidth sx={{ mt: 1 }} onClick={() => signIn('vk', { callbackUrl })}>
      Sign in with VK
    </Button>
  );
};

export { VKButton };
