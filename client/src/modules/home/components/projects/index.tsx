'use client';

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';

export default function ProjectPage() {
  const [currentDetail, setCurrentDetail] = useState('overview');

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const selectProductType = (
    type: 'energy' | 'power',
    buttonElement: HTMLButtonElement
  ) => {
    const typeNames = {
      energy: 'Energy-Module',
      power: 'Power-Module',
    };

    showProductConfigModal(type, typeNames[type]);

    if (buttonElement) {
      const originalText = buttonElement.textContent;
      buttonElement.textContent = 'Wird geladen...';
      buttonElement.disabled = true;

      setTimeout(() => {
        if (buttonElement) {
          // Check if buttonElement is still valid
          buttonElement.textContent = originalText;
          buttonElement.disabled = false;
        }
      }, 2000);
    }
  };

  const showProductConfigModal = (
    type: 'energy' | 'power',
    typeName: string
  ) => {
    const products = {
      energy: [
        { name: 'Bluebox 774 Energy', capacity: '7.74 kWh', price: '3.080 €' },
        { name: 'Bluebox 619 Energy', capacity: '6.19 kWh', price: '2.480 €' },
      ],
      power: [
        { name: 'Bluebox 569 Power', power: '5.69 kW', price: '2.850 €' },
        { name: 'Bluebox 455 Power', power: '4.55 kW', price: '2.275 €' },
      ],
    };

    const productList = products[type]
      .map((product) => {
        const spec = type === 'energy' ? product.capacity : product.power;
        return `• ${product.name}: ${spec} - ab ${product.price}`;
      })
      .join('\n');

    const message = `${typeName} Konfiguration\n\nVerfügbare Produkte:\n${productList}\n\nMöchten Sie eine detaillierte Konfiguration starten oder eine persönliche Beratung anfordern?\n\nHinweis: Eine vollständige Online-Konfiguration wird in Kürze verfügbar sein.`;
    const result = window.confirm(message + '\n\nJetzt Beratung anfordern?');

    if (result) {
      requestConsultation();
    }
  };

  const requestConsultation = () => {
    const email = window.prompt(
      'Für eine technische Beratung benötigen wir Ihre E-Mail-Adresse:'
    );

    if (email && isValidEmail(email)) {
      window.alert(
        `Vielen Dank! Wir werden uns in Kürze unter ${email} bei Ihnen melden.\n\nUnser Expertenteam wird mit Ihnen die optimale Batteriekonfiguration für Ihr Projekt besprechen.`
      );
    } else if (email) {
      window.alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    }
  };

  const downloadDocumentation = () => {
    const documents = [
      'BMW 315E Projekt-Dokumentation (PDF)',
      'DIY-Module Installationsanleitung (PDF)',
      'Sicherheitshinweise für Batteriesysteme (PDF)',
      'NCR18650B Technische Datenblätter (PDF)',
      'TÜV-Zertifizierungsrichtlinien (PDF)',
    ];

    const message = `Verfügbare Dokumentation:\n\n${documents.map((doc, index) => `${index + 1}. ${doc}`).join('\n')}\n\nDiese Dokumente stehen in der Vollversion der Website zum Download bereit.`;

    window.alert(message);
  };

  const viewMoreProjects = () => {
    const projects = [
      'E-Boot Retrofit mit 24V System',
      'Wohnmobil Energiespeicher 48V',
      'PV-Speicher für Einfamilienhaus',
      'E-Bike Akku-Upgrade Projekt',
      'Off-Grid Hütte Energieversorgung',
    ];

    const message = `Weitere erfolgreiche Projekte:\n\n${projects.map((project, index) => `${index + 1}. ${project}`).join('\n')}\n\nDiese Case Studies finden Sie in der vollständigen Website-Version.`;

    window.alert(message);
  };

  const showLegalInfo = (type: string) => {
    const info: { [key: string]: string } = {
      Impressum:
        'Musterfirma GmbH\nGeschäftsführer: Max Mustermann\nMusterstraße 123, 12345 Musterstadt\nTelefon: +49 123 456789\nE-Mail: info@musterfirma.de\nHRB 12345, Amtsgericht Musterstadt\nUSt-IdNr.: DE123456789',
      Datenschutz:
        'Datenschutzerklärung (Auszug):\n\nWir erheben und verarbeiten personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen der DSGVO.\n\nIhre Rechte:\n- Auskunft über gespeicherte Daten\n- Berichtigung unrichtiger Daten  \n- Löschung nicht mehr benötigter Daten\n- Widerspruch gegen Datenverarbeitung\n\nKontakt: datenschutz@musterfirma.de',
      AGB: 'Allgemeine Geschäftsbedingungen (Auszug):\n\n§1 Geltungsbereich\nDiese AGB gelten für alle Lieferungen und Leistungen.\n\n§2 Produkthaftung\nBatteriemodule sind nur mit geeignetem BMS zu verwenden.\nMischbestückung verschiedener Modultypen ist untersagt.\n\n§3 Gewährleistung\n24 Monate Herstellergarantie bei sachgemäßer Verwendung.',
    };

    window.alert(info[type] || 'Information nicht verfügbar.');
  };

  const isValidEmail = (email: string) => {
    // biome-ignore lint/performance/useTopLevelRegex: <explanation>
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary to-primary-hover py-32 text-primary-foreground">
        <MaxWidthWrapper className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="text-center md:text-left">
              <div className="mb-4 flex flex-wrap justify-center gap-4 md:justify-start">
                <span className="rounded-md bg-primary-foreground px-3 py-1 font-medium text-primary text-sm">
                  TÜV-Zertifiziert
                </span>
                <span className="rounded-md bg-primary-foreground px-3 py-1 font-medium text-primary text-sm">
                  Straßenzulassung
                </span>
              </div>
              <h1 className="mb-3 font-bold text-4xl md:text-5xl">
                BMW 315E Elektroretrofit
              </h1>
              <p className="mb-6 text-lg opacity-90">
                Vom Verbrenner zum Elektromotor – Ein erfolgreiches
                Referenzprojekt mit DIY-Batteriemodulnen und offizieller
                TÜV-Einzelbetriebserlaubnis
              </p>
              <div className="mb-6 flex flex-wrap justify-center gap-6 md:justify-start">
                <div className="text-center">
                  <span className="block font-bold text-2xl">12.8 kWh</span>
                  <span className="text-sm opacity-80">Batteriekapazität</span>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-2xl">4 Module</span>
                  <span className="text-sm opacity-80">DIY Blueboxen</span>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-2xl">3.25 kW</span>
                  <span className="text-sm opacity-80">AC-Ladeleistung</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <Button
                  className="rounded-lg bg-primary-foreground px-6 py-3 font-medium text-primary transition-colors hover:bg-gray-100"
                  onClick={() => scrollToSection('konfigurator')}
                >
                  Eigenes DIY-Kit konfigurieren
                </Button>
                <Button
                  className="rounded-lg border border-primary-foreground px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
                  onClick={() => scrollToSection('technische-details')}
                >
                  Technische Details ansehen
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <Image
                alt="BMW 315E Elektroretrofit mit professioneller Batteriesystem-Integration"
                className="h-auto w-full max-w-sm rounded-lg shadow-lg md:max-w-md lg:max-w-lg"
                height={2000}
                src="/images/bmw-hero.png"
                width={1000}
              />
              <div className="absolute right-8 bottom-4 flex items-center gap-2 rounded-full bg-background px-3 py-1 text-foreground shadow-md">
                <CheckCircle2 className="w-5 text-primary" />
                <div>
                  <p className="font-bold">TÜV-Zertifiziert</p>
                  <span className="text-xs">Einzelbetriebserlaubnis</span>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>

      {/* Project Overview Section */}
      <section className="py-32" id="projekt-uebersicht">
        <MaxWidthWrapper className="container mx-auto px-4">
          <h2 className="mb-6 text-center font-semibold text-3xl">
            Projekt-Übersicht: Erfolgreiche Fahrzeug-Elektrifizierung
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-20 md:grid-cols-3">
            <div className="rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <h3 className="mb-3 font-semibold text-primary text-xl">
                Herausforderung
              </h3>
              <p className="text-muted-foreground">
                Umrüstung eines BMW 315 von Verbrenner- auf Elektroantrieb mit
                normenkonformer Integration von DIY-Batteriemodulnen und
                erfolgreicher TÜV-Zulassung.
              </p>
            </div>
            <div className="rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <h3 className="mb-3 font-semibold text-primary text-xl">
                Lösung
              </h3>
              <p className="text-muted-foreground">
                4x DIY-Batteriemodule strategisch platziert (2x Motorraum, 2x
                Kofferraum), Bluetooth-BMS, CCS Typ2-Ladeanschluss und
                professionelle Hochvolt-Verkabelung.
              </p>
            </div>
            <div className="rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <h3 className="mb-3 font-semibold text-primary text-xl">
                Ergebnis
              </h3>
              <p className="text-muted-foreground">
                Straßenzugelassener BMW 315E mit 12.8 kWh Batteriekapazität,
                3.25 kW Ladeleistung und vollständiger
                TÜV-Einzelbetriebserlaubnis (EBE).
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Interactive Battery System Section */}
      <section className="bg-secondary py-32" id="batteriesystem">
        <MaxWidthWrapper className="container mx-auto px-4">
          <h2 className="mb-6 text-center font-semibold text-3xl">
            Interaktive Batteriesystem-Konfiguration
          </h2>
          <div className="grid grid-cols-1 items-start gap-32 md:grid-cols-2">
            <div className="relative">
              <Image
                alt="Technisches Layout der BMW 315E Batteriesystem-Konfiguration"
                className="w-full rounded-lg shadow-md"
                height={200}
                src="/images/bmw-diagram.png"
                width={400}
              />

              {/* Hotspots */}
              <Button
                className="group absolute top-[20%] left-[30%] cursor-pointer"
                onClick={() => setCurrentDetail('front')}
              >
                <div className="rounded-full bg-primary px-2 py-1 font-bold text-primary-foreground text-xs transition-transform group-hover:scale-105">
                  2
                </div>
                <div className="pointer-events-none absolute top-[-10px] left-full ml-2 whitespace-nowrap rounded-md border border-card-border bg-surface p-3 text-text opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <h4 className="font-semibold">Vordere Module</h4>
                  <p className="text-sm">
                    2x DIY-Module unter der Motorhaube
                    <br />
                    Kompakte Bauweise, optimaler Schwerpunkt
                  </p>
                </div>
              </Button>

              <Button
                className="group absolute right-[30%] bottom-[20%] cursor-pointer"
                onClick={() => setCurrentDetail('rear')}
              >
                <div className="rounded-full bg-primary px-2 py-1 font-bold text-primary-foreground text-xs transition-transform group-hover:scale-105">
                  2
                </div>
                <div className="pointer-events-none absolute top-[-10px] right-full mr-2 whitespace-nowrap rounded-md border border-card-border bg-surface p-3 text-text opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <h4 className="font-semibold">Hintere Module</h4>
                  <p className="text-sm">
                    2x DIY-Module im Kofferraum
                    <br />
                    Zusätzliche Kapazität, sichere Integration
                  </p>
                </div>
              </Button>

              <Button
                className="group absolute top-[40%] left-[55%] cursor-pointer"
                onClick={() => setCurrentDetail('bms')}
              >
                <div className="rounded-full bg-primary px-2 py-1 font-bold text-primary-foreground text-xs transition-transform group-hover:scale-105">
                  BMS
                </div>
                <div className="pointer-events-none absolute top-[-10px] left-full ml-2 whitespace-nowrap rounded-md border border-card-border bg-surface p-3 text-text opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <h4 className="font-semibold">Batteriemanagementsystem</h4>
                  <p className="text-sm">
                    Separate Schaltbox mit BMS
                    <br />
                    Bluetooth-Konnektivität, SOC/SOH-Monitoring
                  </p>
                </div>
              </Button>

              <Button
                className="group absolute bottom-[10%] left-[45%] cursor-pointer"
                onClick={() => setCurrentDetail('charging')}
              >
                <div className="rounded-full bg-primary px-2 py-1 font-bold text-primary-foreground text-xs transition-transform group-hover:scale-105">
                  ⚡
                </div>
                <div className="pointer-events-none absolute top-[-10px] left-full ml-2 whitespace-nowrap rounded-md border border-card-border bg-surface p-3 text-text opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <h4 className="font-semibold">Ladesystem</h4>
                  <p className="text-sm">
                    Professionelles AC-Ladesystem mit CCS Typ2-Anschluss für
                    standardkonformes Laden an öffentlichen Ladesäulen.
                    <br />
                    3.25 kW AC max, On-Board-Charger
                  </p>
                </div>
              </Button>
            </div>

            {/* System Details Panel */}
            <div className="rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              {currentDetail === 'overview' && (
                <div>
                  <h3 className="mb-4 font-semibold text-xl">
                    System-Übersicht
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-md bg-secondary p-3 text-center">
                      <span className="block text-secondary text-xs">
                        Gesamtkapazität
                      </span>
                      <span className="font-bold text-lg">12.8 kWh</span>
                    </div>
                    <div className="rounded-md bg-secondary p-3 text-center">
                      <span className="block text-muted-foreground text-xs">
                        Spannung
                      </span>
                      <span className="font-bold text-lg">96V - 400V</span>
                    </div>
                    <div className="rounded-md bg-secondary p-3 text-center">
                      <span className="block text-muted-foreground text-xs">
                        Zelltyp
                      </span>
                      <span className="font-bold text-lg">NCR18650B</span>
                    </div>
                    <div className="rounded-md bg-secondary p-3 text-center">
                      <span className="block text-muted-foreground text-xs">
                        Schutzklasse
                      </span>
                      <span className="font-bold text-lg">IP65</span>
                    </div>
                  </div>
                </div>
              )}
              {currentDetail === 'front' && (
                <div>
                  <h3 className="mb-4 font-semibold text-xl">
                    Vordere Batteriemodule
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Zwei DIY-Modules strategisch unter der Motorhaube platziert
                    für optimale Gewichtsverteilung und kompakte Integration.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Platzsparende Installation</li>
                    <li>Optimaler Fahrzeug-Schwerpunkt</li>
                    <li>Einfache Wartungszugänglichkeit</li>
                  </ul>
                </div>
              )}
              {currentDetail === 'rear' && (
                <div>
                  <h3 className="mb-4 font-semibold text-xl">
                    Hintere Batteriemodule
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Zusätzliche Kapazität durch zwei weitere Module im
                    Kofferraum, ohne Beeinträchtigung des Stauraums.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Maximale Kapazitätserweiterung</li>
                    <li>Sichere Kofferraum-Integration</li>
                    <li>Modularer Aufbau</li>
                  </ul>
                </div>
              )}
              {currentDetail === 'bms' && (
                <div>
                  <h3 className="mb-4 font-semibold text-xl">
                    Batteriemanagementsystem
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Separates BMS mit Bluetooth-Konnektivität für
                    professionelles Monitoring und Systemsteuerung.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Bluetooth-Schnittstelle</li>
                    <li>SOC/SOH-Überwachung</li>
                    <li>Mobile App-Integration</li>
                  </ul>
                </div>
              )}
              {currentDetail === 'charging' && (
                <div>
                  <h3 className="mb-4 font-semibold text-xl">Ladesystem</h3>
                  <p className="mb-4 text-muted-foreground">
                    Professionelles AC-Ladesystem mit CCS Typ2-Anschluss für
                    standardkonformes Laden an öffentlichen Ladesäulen.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>CCS Typ2-Standard</li>
                    <li>3.25 kW Ladeleistung</li>
                    <li>On-Board-Charger integriert</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-32" id="technische-details">
        <MaxWidthWrapper className="container mx-auto px-4">
          <h2 className="mb-6 text-center font-semibold text-3xl">
            Technische Spezifikationen & NCR18650B-Basis
          </h2>
          <div className="grid grid-cols-1 items-start gap-32 md:grid-cols-2">
            <div className="text-center">
              <Image
                alt="NCR18650B Batteriezellen - Grundlage der DIY-Modules"
                className="mx-auto w-full max-w-xs rounded-lg shadow-md"
                height={400}
                src="/images/bmw-cell.png"
                width={400}
              />
              <div className="mt-3">
                <h4 className="font-semibold text-lg">
                  NCR18650B Lithium-Ionen-Zellen
                </h4>
                <p className="text-muted-foreground">
                  Industriestandard für höchste Qualität und Langlebigkeit
                </p>
              </div>
            </div>
            <div>
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-primary text-xl">
                  Batteriesystem
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Gesamtkapazität:</span>
                    <strong>12.8 kWh</strong>
                  </div>
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Modulanzahl:</span>
                    <strong>4x DIY-Module</strong>
                  </div>
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Zelltechnik:</span>
                    <strong>NCR18650B (3.350 mAh)</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Nennspannung:</span>
                    <strong>96V - 400V konfigurierbar</strong>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-primary text-xl">
                  Ladesystem
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Ladeart:</span>
                    <strong>AC-Laden</strong>
                  </div>
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Max. Ladeleistung:</span>
                    <strong>3.25 kW</strong>
                  </div>
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Anschluss:</span>
                    <strong>CCS Typ2</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Charger:</span>
                    <strong>On-Board integriert</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-primary text-xl">
                  Sicherheit & Normen
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Schutzklasse:</span>
                    <strong>IP65 spritzwassergeschützt</strong>
                  </div>
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>HV-Kennzeichnung:</span>
                    <strong>Orange Hochvoltkabel</strong>
                  </div>
                  <div className="flex justify-between border-gray-200 border-b pb-1 text-sm">
                    <span>Normen:</span>
                    <strong>UN ECE R 100, ISO 6469</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Zertifizierung:</span>
                    <strong>TÜV-Einzelbetriebserlaubnis</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Retrofit Process Section */}
      <section className="bg-secondary py-32" id="retrofit-prozess">
        <MaxWidthWrapper className="container mx-auto px-4">
          <h2 className="mb-6 text-center font-semibold text-3xl">
            Schritt-für-Schritt Retrofit-Prozess
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center">
            Von der Planung bis zur TÜV-Zulassung – unser systematischer Ansatz
            für erfolgreiche Fahrzeug-Elektrifizierung
          </p>

          <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="-top-4 -left-4 absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                1
              </div>
              <h4 className="mb-2 font-semibold text-lg">
                Motorentfernung und Vorbereitung
              </h4>
              <p className="text-muted-foreground">
                Ausbau des Verbrennungsmotors und Vorbereitung des Fahrzeugs für
                die Elektrifizierung
              </p>
            </div>
            <div className="relative rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="-top-4 -left-4 absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                2
              </div>
              <h4 className="mb-2 font-semibold text-lg">
                Elektromotor-Installation
              </h4>
              <p className="text-muted-foreground">
                Einbau des Elektromotors mit präziser Ausrichtung und
                Befestigung
              </p>
            </div>
            <div className="relative rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="-top-4 -left-4 absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                3
              </div>
              <h4 className="mb-2 font-semibold text-lg">
                Batteriemodule-Platzierung
              </h4>
              <p className="text-muted-foreground">
                Strategische Installation der 4 DIY-Module (2x vorne, 2x hinten)
                für optimale Gewichtsverteilung
              </p>
            </div>
            <div className="relative rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="-top-4 -left-4 absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                4
              </div>
              <h4 className="mb-2 font-semibold text-lg">
                BMS und Peripherie-Installation
              </h4>
              <p className="text-muted-foreground">
                Integration des Batteriemanagementsystems, Schütz und
                Stromsensoren in separater Box
              </p>
            </div>
            <div className="relative rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="-top-4 -left-4 absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                5
              </div>
              <h4 className="mb-2 font-semibold text-lg">
                Hochvolt-Verkabelung
              </h4>
              <p className="text-muted-foreground">
                Professionelle Verkabelung aller Systeme mit normativer
                Orange-Kennzeichnung
              </p>
            </div>
            <div className="relative rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="-top-4 -left-4 absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                6
              </div>
              <h4 className="mb-2 font-semibold text-lg">
                Ladesystem-Integration
              </h4>
              <p className="text-muted-foreground">
                Installation des On-Board-Chargers und CCS Typ2-Ladeanschlusses
              </p>
            </div>
            <div className="relative rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="-top-4 -left-4 absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                7
              </div>
              <h4 className="mb-2 font-semibold text-lg">
                TÜV-Prüfung und Zulassung
              </h4>
              <p className="text-muted-foreground">
                Erfolgreiche TÜV-Abnahme und Erteilung der
                Einzelbetriebserlaubnis für Straßenzulassung
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Product Configurator Section */}
      <section className="py-32" id="konfigurator">
        <MaxWidthWrapper className="container mx-auto px-4">
          <h2 className="mb-6 text-center font-semibold text-3xl">
            Jetzt eigenes DIY-Kit konfigurieren
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center text-muted-foreground">
            Basierend auf unserem BMW 315E-Projekt – konfigurieren Sie Ihr
            individuelles Batteriesystem
          </p>

          <div className="mt-6 grid grid-cols-1 gap-20 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl">Bluebox Energy-Serie</h3>
                <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs">
                  Langzeitspeicher
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bluebox 774 Energy</span>
                  <span>7.74 kWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bluebox 619 Energy</span>
                  <span>6.19 kWh</span>
                </div>
              </div>
              <p className="flex-grow text-muted-foreground">
                Optimiert für maximale Speicherkapazität und lange
                Entladezyklen. Ideal für stationäre Speichersysteme und
                Eigenverbrauchsoptimierung.
              </p>
              <Button
                className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                onClick={(e) => selectProductType('energy', e.currentTarget)}
              >
                Energy-Module konfigurieren
              </Button>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-card-border bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl">Bluebox Power-Serie</h3>
                <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs">
                  Hochleistung
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bluebox 569 Power</span>
                  <span>5.69 kW</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bluebox 455 Power</span>
                  <span>4.55 kW</span>
                </div>
              </div>
              <p className="flex-grow text-muted-foreground">
                Speziell für hohe Stromstärken entwickelt. Perfekt für
                Elektrofahrzeuge, Wechselrichter und leistungsintensive
                Anwendungen.
              </p>
              <Button
                className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                onClick={(e) => selectProductType('power', e.currentTarget)}
              >
                Power-Module konfigurieren
              </Button>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 flex gap-4 rounded-lg border border-yellow-300 bg-yellow-100 p-5">
            <div className="text-3xl text-yellow-600">⚠️</div>
            <div>
              <h4 className="mb-1 font-semibold text-lg">
                Wichtiger Sicherheitshinweis
              </h4>
              <p className="text-gray-700">
                <strong>
                  Power- und Energy-Module dürfen nicht im selben
                  Batteriegehäuse kombiniert werden.
                </strong>{' '}
                Dies gewährleistet optimale Leistung und Sicherheit Ihres
                Systems.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-primary py-8 text-primary-foreground">
        <MaxWidthWrapper className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-primary-foreground p-6 text-center text-primary shadow-sm">
              <h3 className="mb-3 font-semibold text-xl">
                Technische Beratung anfordern
              </h3>
              <p className="mb-4 text-gray-700">
                Lassen Sie sich von unseren Experten bei der optimalen
                Systemauslegung für Ihr Projekt beraten.
              </p>
              <Button
                className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                onClick={requestConsultation}
              >
                Beratungstermin vereinbaren
              </Button>
            </div>

            <div className="rounded-lg bg-white p-6 text-center text-gray-900 shadow-sm">
              <h3 className="mb-3 font-semibold text-xl">
                Technische Unterlagen
              </h3>
              <p className="mb-4 text-muted-foreground">
                Installationsanleitungen, Datenblätter und Sicherheitshinweise
                zum Download.
              </p>
              <Button
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium transition-colors hover:bg-gray-100"
                onClick={downloadDocumentation}
              >
                Dokumentation herunterladen
              </Button>
            </div>

            <div className="rounded-lg bg-white p-6 text-center text-gray-900 shadow-sm">
              <h3 className="mb-3 font-semibold text-xl">
                Weitere Retrofit-Projekte
              </h3>
              <p className="mb-4 text-muted-foreground">
                Entdecken Sie weitere erfolgreiche Elektrifizierungsprojekte und
                Anwendungsbeispiele.
              </p>
              <Button
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium transition-colors hover:bg-gray-100"
                onClick={viewMoreProjects}
              >
                Weitere Projekte ansehen
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Footer */}
      <footer className="border-gray-200 border-t bg-white py-8">
        <MaxWidthWrapper className="container mx-auto px-4">
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-semibold text-lg text-primary">
                Kontakt & Beratung
              </h4>
              <p className="mb-4 text-muted-foreground">
                Unser Expertenteam berät Sie bei der optimalen Systemauslegung
                und Anwendung.
              </p>
              <Button
                className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-300"
                onClick={requestConsultation}
              >
                Kontakt aufnehmen
              </Button>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-lg text-primary">
                Rechtliche Hinweise
              </h4>
              <p className="mb-4 text-muted-foreground">
                Alle technischen Daten entsprechen den Herstellerangaben. Die
                Verwendung der Batteriemodule erfolgt unter Beachtung der
                Sicherheitshinweise.
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <Link
                  className="text-primary text-sm hover:underline"
                  href="#"
                  onClick={() => showLegalInfo('Impressum')}
                >
                  Impressum
                </Link>
                <Link
                  className="text-primary text-sm hover:underline"
                  href="#"
                  onClick={() => showLegalInfo('Datenschutz')}
                >
                  Datenschutz
                </Link>
                <Link
                  className="text-primary text-sm hover:underline"
                  href="#"
                  onClick={() => showLegalInfo('AGB')}
                >
                  AGB
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-gray-500 text-xs">
            <p>
              Alle Rechte vorbehalten. BMW 315E ist ein erfolgreiches
              Referenzprojekt unserer DIY-Batteriemodule.
            </p>
          </div>
        </MaxWidthWrapper>
      </footer>
    </>
  );
}
