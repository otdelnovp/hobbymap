import dynamic from 'next/dynamic';
import { Loader } from '@/components/Loader/Loader';

const MapView = dynamic(() => import('@/components/MapView/MapView'), {
  loading: () => <Loader />,
  ssr: false,
});

export default function Home() {
  return <MapView />;
}
