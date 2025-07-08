import type { Metadata } from 'next';
import BlueBoxPage from '@/components/blue-box';

export const metadata: Metadata = {
  title: 'Bluebox Seal | Cellthium',
  description:
    'Erfahren Sie mehr über die Bluebox Seal Zertifizierung für nachhaltige Batteriegehäuse.',
  keywords: [
    'Bluebox Seal',
    'Zertifizierung',
    'Nachhaltigkeit',
    'Batteriegehäuse',
    'Cellthium',
  ],
};

export default function Page() {
  return <BlueBoxPage />;
}
