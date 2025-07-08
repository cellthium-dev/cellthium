'use client';

import {
  Battery,
  CheckCircle,
  Minus,
  Plus,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Product {
  name: string;
  capacity_kwh: number;
  power_kw: number;
  cells: number;
  price_estimate: number;
  description: string;
}

interface Products {
  power_modules: Product[];
  energy_modules: Product[];
}

interface Housing {
  max_modules_per_housing: number;
  price_per_housing: number;
  dimensions: string;
}

interface Configuration {
  moduleType: 'power' | 'energy' | null;
  selectedProduct: Product | null;
  quantity: number;
}

const products: Products = {
  power_modules: [
    {
      name: 'Cellthium Power Pro 569',
      capacity_kwh: 5.7,
      power_kw: 4.0,
      cells: 569,
      price_estimate: 2850,
      description: 'Hochleistungsmodul für maximale Entladeleistung',
    },
    {
      name: 'Cellthium Power Compact 455',
      capacity_kwh: 4.6,
      power_kw: 3.5,
      cells: 455,
      price_estimate: 2275,
      description: 'Kompaktes Powermodul für hohe Ströme',
    },
  ],
  energy_modules: [
    {
      name: 'Cellthium Energy Max 774',
      capacity_kwh: 7.7,
      power_kw: 3.0,
      cells: 774,
      price_estimate: 3080,
      description: 'Maximale Speicherkapazität für lange Autonomie',
    },
    {
      name: 'Cellthium Energy Balance 619',
      capacity_kwh: 6.2,
      power_kw: 2.5,
      cells: 619,
      price_estimate: 2480,
      description: 'Ausgewogenes Energie-zu-Preis-Verhältnis',
    },
  ],
};

const housing: Housing = {
  max_modules_per_housing: 5,
  price_per_housing: 450,
  dimensions: '60x40x25 cm',
};

export default function ProductConfigurator() {
  const [config, setConfig] = useState<Configuration>({
    moduleType: null,
    selectedProduct: null,
    quantity: 1,
  });

  const [showConfig, setShowConfig] = useState(false);

  const selectModuleType = (type: 'power' | 'energy') => {
    const newProducts =
      type === 'power' ? products.power_modules : products.energy_modules;
    setConfig({
      moduleType: type,
      selectedProduct: newProducts[0] || null,
      quantity: 1,
    });
    setShowConfig(true);
  };

  const selectProduct = (product: Product) => {
    setConfig((prev) => ({ ...prev, selectedProduct: product }));
  };

  const updateQuantity = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(30, newQuantity));
    setConfig((prev) => ({ ...prev, quantity: clampedQuantity }));
  };

  const resetConfiguration = () => {
    setConfig({
      moduleType: null,
      selectedProduct: null,
      quantity: 1,
    });
    setShowConfig(false);
  };

  const requestQuote = () => {
    if (!config.selectedProduct) return;

    const totalCapacity = (
      config.selectedProduct.capacity_kwh * config.quantity
    ).toFixed(1);
    const totalPower = (
      config.selectedProduct.power_kw * config.quantity
    ).toFixed(1);
    const requiredHousings = Math.ceil(
      config.quantity / housing.max_modules_per_housing
    );
    const totalCost =
      config.selectedProduct.price_estimate * config.quantity +
      requiredHousings * housing.price_per_housing;

    alert(`Angebot angefordert für:

Produkt: ${config.selectedProduct.name}
Anzahl Module: ${config.quantity}
Gesamtkapazität: ${totalCapacity} kWh
Gesamtleistung: ${totalPower} kW
Benötigte Gehäuse: ${requiredHousings}
Geschätzte Kosten: ${totalCost.toLocaleString('de-DE')} €

Diese Anfrage würde normalerweise an unser Vertriebsteam weitergeleitet werden.`);
  };

  // Calculate system overview
  const getSystemOverview = () => {
    if (!config.selectedProduct) return null;

    const totalCapacity = (
      config.selectedProduct.capacity_kwh * config.quantity
    ).toFixed(1);
    const totalPower = (
      config.selectedProduct.power_kw * config.quantity
    ).toFixed(1);
    const requiredHousings = Math.ceil(
      config.quantity / housing.max_modules_per_housing
    );
    const totalModuleCost =
      config.selectedProduct.price_estimate * config.quantity;
    const totalHousingCost = requiredHousings * housing.price_per_housing;
    const estimatedCost = totalModuleCost + totalHousingCost;

    return {
      totalCapacity,
      totalPower,
      requiredHousings,
      estimatedCost,
    };
  };

  const overview = getSystemOverview();
  const currentProducts =
    config.moduleType === 'power'
      ? products.power_modules
      : products.energy_modules;

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-brand-primary to-brand-secondary text-white">
        <div className="section-container content-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 font-bold text-4xl leading-tight lg:text-6xl">
                Cellthium Batterie-Konfigurator
              </h1>
              <p className="text-xl leading-relaxed opacity-90">
                Konfigurieren Sie Ihr maßgeschneidertes Batteriesystem mit
                unseren hochleistungsfähigen Lithium-Ionen-Modulen für optimale
                Energiespeicherung.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xs">
                <div className="flex aspect-square items-center justify-center rounded-xl bg-linear-to-br from-brand-accent to-cyan-400">
                  <Battery className="h-32 w-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 content-container">
        {/* Module Type Selection */}
        <section className="mb-16">
          <h2 className="heading-section mb-12 text-center">
            Wählen Sie Ihren Modultyp
          </h2>

          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            {/* Power Module Card */}
            <Card
              className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-xl ${
                config.moduleType === 'power'
                  ? 'border-brand-primary bg-brand-primary/5'
                  : 'border-border hover:border-brand-primary/50'
              }`}
              onClick={() => selectModuleType('power')}
            >
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <CardTitle className="text-2xl text-brand-primary">
                    Power-Module
                  </CardTitle>
                  <Badge className="bg-brand-accent text-white">
                    <Zap className="mr-1 h-4 w-4" />
                    Hochleistung
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  Für Anwendungen mit hohen Leistungsanforderungen und maximaler
                  Entladerate.
                </p>
                <ul className="mb-6 space-y-3">
                  {[
                    'Maximale Entladeleistung',
                    'Hohe Stromabgabe',
                    'Optimiert für Leistung',
                    'Kompaktes Design',
                  ].map((feature) => (
                    <li className="flex items-center gap-3" key={feature}>
                      <CheckCircle className="h-5 w-5 shrink-0 text-brand-accent" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={
                    config.moduleType === 'power' ? 'default' : 'outline-solid'
                  }
                >
                  Power-Module wählen
                </Button>
              </CardContent>
            </Card>

            {/* Energy Module Card */}
            <Card
              className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-xl ${
                config.moduleType === 'energy'
                  ? 'border-brand-primary bg-brand-primary/5'
                  : 'border-border hover:border-brand-primary/50'
              }`}
              onClick={() => selectModuleType('energy')}
            >
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <CardTitle className="text-2xl text-brand-primary">
                    Energy-Module
                  </CardTitle>
                  <Badge className="bg-brand-secondary text-white">
                    <Battery className="mr-1 h-4 w-4" />
                    Kapazität
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  Für maximale Speicherkapazität und lange Autonomiezeiten.
                </p>
                <ul className="mb-6 space-y-3">
                  {[
                    'Maximale Speicherkapazität',
                    'Lange Autonomie',
                    'Optimiert für Energie',
                    'Kosteneffizient',
                  ].map((feature) => (
                    <li className="flex items-center gap-3" key={feature}>
                      <CheckCircle className="h-5 w-5 shrink-0 text-brand-accent" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={
                    config.moduleType === 'energy' ? 'default' : 'outline-solid'
                  }
                >
                  Energy-Module wählen
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Configuration Section */}
        {showConfig && (
          <section className="mb-16">
            <h2 className="heading-section mb-12 text-center">Konfiguration</h2>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Product Selection */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-primary">
                      Produktauswahl:{' '}
                      {config.moduleType === 'power'
                        ? 'Power-Module'
                        : 'Energy-Module'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentProducts.map((product, index) => (
                        <div
                          className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                            config.selectedProduct?.name === product.name
                              ? 'border-brand-primary bg-brand-primary/5'
                              : 'border-border hover:border-brand-primary/50'
                          }`}
                          key={index}
                          onClick={() => selectProduct(product)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="mb-2 font-semibold text-brand-primary">
                                {product.name}
                              </h4>
                              <p className="mb-3 text-gray-600 text-sm">
                                {product.description}
                              </p>
                              <div className="flex gap-4 text-gray-500 text-sm">
                                <span>{product.capacity_kwh} kWh</span>
                                <span>{product.power_kw} kW</span>
                                <span>{product.cells} Zellen</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-brand-primary text-xl">
                                {product.price_estimate.toLocaleString('de-DE')}{' '}
                                €
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-8 border-t pt-6">
                      <h4 className="mb-4 font-semibold text-brand-primary">
                        Anzahl Module
                      </h4>
                      <div className="flex items-center gap-4">
                        <Button
                          disabled={config.quantity <= 1}
                          onClick={() => updateQuantity(config.quantity - 1)}
                          size="icon"
                          variant="outline"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          className="w-20 text-center"
                          max="30"
                          min="1"
                          onChange={(e) =>
                            updateQuantity(Number.parseInt(e.target.value) || 1)
                          }
                          type="number"
                          value={config.quantity}
                        />
                        <Button
                          disabled={config.quantity >= 30}
                          onClick={() => updateQuantity(config.quantity + 1)}
                          size="icon"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="ml-4 text-gray-500 text-sm">
                          (1-30 Module möglich)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Overview */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-brand-primary">
                      <ShieldCheck className="h-5 w-5" />
                      System-Übersicht
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {overview && (
                      <div className="space-y-4">
                        <div className="rounded-lg bg-brand-light p-4 text-center">
                          <div className="mb-1 text-gray-500 text-sm">
                            Gesamtkapazität
                          </div>
                          <div className="font-bold text-2xl text-brand-primary">
                            {overview.totalCapacity} kWh
                          </div>
                        </div>

                        <div className="rounded-lg bg-brand-light p-4 text-center">
                          <div className="mb-1 text-gray-500 text-sm">
                            Gesamtleistung
                          </div>
                          <div className="font-bold text-2xl text-brand-primary">
                            {overview.totalPower} kW
                          </div>
                        </div>

                        <div className="rounded-lg bg-brand-light p-4 text-center">
                          <div className="mb-1 text-gray-500 text-sm">
                            Benötigte Gehäuse
                          </div>
                          <div className="font-bold text-2xl text-brand-primary">
                            {overview.requiredHousings}
                          </div>
                        </div>

                        <div className="rounded-lg bg-linear-to-r from-brand-primary to-brand-secondary p-4 text-center text-white">
                          <div className="mb-1 text-sm opacity-90">
                            Geschätzte Kosten
                          </div>
                          <div className="font-bold text-2xl">
                            {overview.estimatedCost.toLocaleString('de-DE')} €
                          </div>
                        </div>

                        {overview.requiredHousings > 1 && (
                          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                            <p className="text-sm text-yellow-800">
                              <strong>Hinweis:</strong> Bei mehreren Gehäusen
                              sollten Module nicht gemischt werden.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full"
                    disabled={!config.selectedProduct}
                    onClick={requestQuote}
                  >
                    Angebot anfordern
                  </Button>
                  <Button
                    className="w-full"
                    onClick={resetConfiguration}
                    variant="outline"
                  >
                    Konfiguration zurücksetzen
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="heading-section mb-12 text-center">
            Warum Cellthium wählen?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-primary">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 font-semibold text-brand-primary text-xl">
                Höchste Leistung
              </h3>
              <p className="text-gray-600">
                Modernste Lithium-Ionen-Technologie für maximale Effizienz und
                Langlebigkeit.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-accent">
                <Battery className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 font-semibold text-brand-primary text-xl">
                Modulares Design
              </h3>
              <p className="text-gray-600">
                Flexible Skalierung durch modularen Aufbau - wachsen Sie mit
                Ihren Anforderungen.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-secondary">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 font-semibold text-brand-primary text-xl">
                Zuverlässigkeit
              </h3>
              <p className="text-gray-600">
                Deutsche Qualität und Engineering für langfristige, zuverlässige
                Energiespeicherung.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
