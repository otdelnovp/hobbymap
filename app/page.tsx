import dynamic from 'next/dynamic';
import { Loader } from '@/components/Loader/Loader';

const Map = dynamic(() => import('@/components/Map/Map'), {
  loading: () => <Loader />,
  ssr: false,
});

export default function Home() {
  return <Map />;
}
