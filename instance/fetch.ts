import { NextResponse } from 'next/server';

export const getServerSideData = async ({
  url,
  id,
  cache,
}: {
  url: string;
  id?: string | number;
  cache?: RequestCache;
}) => {
  const res = await fetch(process.env.NEXTAUTH_URL + (id ? `${url}/${id}` : url), { cache });
  if (!res?.ok) NextResponse.json({ message: 'Failed' }, { status: 500 });
  return res.json();
};
