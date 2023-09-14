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
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};
