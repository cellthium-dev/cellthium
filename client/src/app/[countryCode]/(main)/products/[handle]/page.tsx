import type { Metadata } from 'next';
import ProductConfigurator from '@/components/product-configurator';

export const metadata: Metadata = {
  title: 'Batterie-Konfigurator | Cellthium',
  description:
    'Konfigurieren Sie Ihr maßgeschneidertes Batteriesystem mit Cellthium. Hochleistungsfähige Lithium-Ionen-Module für optimale Energiespeicherung.',
  keywords: [
    'Batterie',
    'Konfigurator',
    'Lithium-Ionen',
    'Energiespeicher',
    'Cellthium',
  ],
};

export default function ProductsPage() {
  return <ProductConfigurator />;
}
