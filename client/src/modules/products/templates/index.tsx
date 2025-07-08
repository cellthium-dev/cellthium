import type { HttpTypes } from '@medusajs/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type React from 'react';
import {
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Section,
  Text,
} from '@/components/ui/design-system';
import ProductActionsWrapper from './product-actions-wrapper';

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
  countryCode: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!(product && product.id)) {
    return notFound();
  }

  return (
    <>
      <Section className="bg-brand-light pt-24 pb-12">
        <Container>
          <Grid className="items-center" cols={2}>
            <div className="space-y-6">
              <Heading level="hero">{product.title}</Heading>
              <Text variant="body-lg">{product.subtitle}</Text>
              <ProductActionsWrapper id={product.id} region={region} />
            </div>
            <div className="flex justify-center">
              <Image
                alt={product.title || 'Product Image'}
                className="rounded-lg shadow-lg"
                height={500}
                src={product.thumbnail || '/images/hero-placeholder.png'}
                width={500}
              />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading className="text-center" level="section">
            Key Features
          </Heading>
          <Grid className="mt-12" cols={3}>
            <Card>
              <Heading level="subsection">Feature One</Heading>
              <Text>Description of the first key feature.</Text>
            </Card>
            <Card>
              <Heading level="subsection">Feature Two</Heading>
              <Text>Description of the second key feature.</Text>
            </Card>
            <Card>
              <Heading level="subsection">Feature Three</Heading>
              <Text>Description of the third key feature.</Text>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Placeholder for Product Comparison Section */}
      <Section className="bg-gray-50">
        <Container>
          <Heading className="text-center" level="section">
            Product Comparison
          </Heading>
          <div className="mt-12 text-center">
            <Text>Comparison table will be implemented here.</Text>
          </div>
        </Container>
      </Section>

      {/* Placeholder for DIY Components Section */}
      <Section>
        <Container>
          <Heading className="text-center" level="section">
            DIY Components
          </Heading>
          <div className="mt-12 text-center">
            <Text>DIY components will be showcased here.</Text>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ProductTemplate;
