'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// BlueBox Page React Component
export default function BlueBoxPage() {
  const [activeTab, setActiveTab] = useState<'companies' | 'consumers'>(
    'companies'
  );

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <section
        className="section-container text-center content-container"
        id="home"
      >
        <h1 className="heading-hero mb-4 text-brand-primary">
          Bluebox Seal - Zertifizierung für nachhaltige Batteriegehäuse
        </h1>
        <p className="mb-8 text-gray-600 text-xl">
          Das erste spezialisierte Qualitätssiegel für umweltfreundliche
          Aluminiumgehäuse von Hochvoltbatterien
        </p>
        <Button className="btn-primary mr-4">Für Unternehmen</Button>
        <Button className="btn-secondary">Für Privatkunden</Button>
        <div className="mt-8">
          <img
            alt="Hochwertiges Aluminium-Batteriegehäuse mit Bluebox Siegel"
            className="mx-auto rounded-lg shadow-xs"
            src="https://pplx-res.cloudinary.com/image/upload/v1751898222/gpt4o_images/xibadulbrljsibtycyse.png"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="section-container content-container" id="about">
        <h2 className="heading-section mb-12 text-center">
          Über das Bluebox Seal
        </h2>
        <p className="mx-auto max-w-4xl text-center text-body-lg">
          Das Bluebox Seal ist eine innovative Zertifizierung für
          Aluminiumgehäuse von Hochvoltbatterien, die von der Bluebox Advanced
          Technologies AG entwickelt wurde. Es handelt sich um ein
          systembasiertes Konzept, das einen ganzheitlichen Ansatz zur
          kontinuierlichen Verbesserung der Produktion von Batteriegehäusen
          verwendet.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {[
            'Ressourceneffizienz',
            'Verbraucherschutz',
            'Wasserschutz',
            'Emissionsschutz',
            'Arbeitssicherheit',
          ].map((principle, index) => (
            <Card className="rounded-lg" key={index}>
              <CardHeader>
                <CardTitle>{principle}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="mb-4">Icon</Badge>
                <p className="text-body">
                  Beispieltext zu den Prinzipien und deren Bedeutung für das
                  Seal.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-container content-container" id="benefits">
        <h2 className="heading-section mb-12 text-center">
          Vorteile des Bluebox Seals
        </h2>
        <div className="mb-8 flex justify-center space-x-4">
          <Button
            className={
              activeTab === 'companies' ? 'btn-primary' : 'btn-secondary'
            }
            onClick={() => setActiveTab('companies')}
          >
            Für Unternehmen
          </Button>
          <Button
            className={
              activeTab === 'consumers' ? 'btn-primary' : 'btn-secondary'
            }
            onClick={() => setActiveTab('consumers')}
          >
            Für Privatkunden
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {(activeTab === 'companies'
            ? [
                'EU-Batterieverordnung',
                'ESG-Ziele',
                'Risikominimierung',
                'Imagegewinn',
                'Marktzugang',
              ]
            : [
                'Sicherheit',
                'Umweltverträglichkeit',
                'Qualitätsstandards',
                'Energiewende',
                'Werterhaltung',
              ]
          ).map((benefit, index) => (
            <Card className="rounded-lg" key={index}>
              <CardHeader>
                <CardTitle>{benefit}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body">
                  Beschreibung des Vorteils für die jeweilige Zielgruppe.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
