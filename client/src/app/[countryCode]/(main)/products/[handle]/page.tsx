"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { notFound } from "next/navigation"; // Assuming this is how notFound is handled in Next.js 15

interface Product {
  name: string;
  capacity_kwh: number;
  power_kw: number;
  cells: number;
  price_estimate: number;
  description: string;
}

interface Housing {
  max_modules_per_housing: number;
  price_per_housing: number;
  dimensions: string;
}

interface CurrentConfig {
  moduleType: "power" | "energy" | null;
  selectedProduct: Product | null;
  quantity: number;
}

const productsData = {
  power_modules: [
    {
      name: "Bluebox 569 Power",
      capacity_kwh: 5.7,
      power_kw: 4.0,
      cells: 569,
      price_estimate: 2850,
      description: "Hochleistungsmodul für maximale Entladeleistung",
    },
    {
      name: "Bluebox 455 Power",
      capacity_kwh: 4.6,
      power_kw: 3.5,
      cells: 455,
      price_estimate: 2275,
      description: "Kompaktes Powermodul für hohe Ströme",
    },
  ],
  energy_modules: [
    {
      name: "Bluebox 774 Energy",
      capacity_kwh: 7.7,
      power_kw: 3.0,
      cells: 774,
      price_estimate: 3080,
      description: "Maximale Speicherkapazität für lange Autonomie",
    },
    {
      name: "Bluebox 619 Energy",
      capacity_kwh: 6.2,
      power_kw: 2.5,
      cells: 619,
      price_estimate: 2480,
      description: "Ausgewogenes Energie-zu-Preis-Verhältnis",
    },
  ],
};

const housingData: Housing = {
  max_modules_per_housing: 5,
  price_per_housing: 450,
  dimensions: "60x40x25 cm",
};

export default function BatteryConfiguratorPage({
  params,
}: {
  params: { handle: string; countryCode: string };
}) {
  const { handle } = params;

  const [currentConfig, setCurrentConfig] = useState<CurrentConfig>({
    moduleType: null,
    selectedProduct: null,
    quantity: 1,
  });

  const [showConfigSection, setShowConfigSection] = useState(false);
  const [showMixingWarning, setShowMixingWarning] = useState(false);
  const [systemOverviewOpacity, setSystemOverviewOpacity] = useState(0.5);
  const [newsletterBtnText, setNewsletterBtnText] = useState("Anmelden");
  const [newsletterBtnDisabled, setNewsletterBtnDisabled] = useState(false);
  const [newsletterBtnVariant, setNewsletterBtnVariant] = useState<
    "default" | "secondary"
  >("default");

  const updateConfiguration = useCallback(() => {
    if (!currentConfig.selectedProduct) {
      setSystemOverviewOpacity(0.5);
      return;
    }

    const product = currentConfig.selectedProduct;
    const quantity = currentConfig.quantity;

    const totalCapacity = (product.capacity_kwh * quantity).toFixed(1);
    const totalPower = (product.power_kw * quantity).toFixed(1);
    const requiredHousings = Math.ceil(
      quantity / housingData.max_modules_per_housing
    );
    const totalModuleCost = product.price_estimate * quantity;
    const totalHousingCost = requiredHousings * housingData.price_per_housing;
    const estimatedCost = totalModuleCost + totalHousingCost;

    // Update display values (these would typically be state variables or derived values in React)
    // For now, we'll just log them or prepare them for display in JSX
    console.log("Total Capacity:", totalCapacity);
    console.log("Total Power:", totalPower);
    console.log("Required Housings:", requiredHousings);
    console.log("Estimated Cost:", estimatedCost);

    setShowMixingWarning(requiredHousings > 1);
    setSystemOverviewOpacity(1);
  }, [currentConfig]);

  useEffect(() => {
    updateConfiguration();
  }, [currentConfig, updateConfiguration]);

  const selectModuleType = (type: "power" | "energy") => {
    setCurrentConfig((prev) => ({
      ...prev,
      moduleType: type,
      selectedProduct: null,
    }));
    setShowConfigSection(true);
  };

  const selectProduct = (type: "power" | "energy", index: number) => {
    const products =
      type === "power"
        ? productsData.power_modules
        : productsData.energy_modules;
    setCurrentConfig((prev) => ({
      ...prev,
      selectedProduct: products[index],
    }));
  };

  const changeQuantity = (delta: number) => {
    setCurrentConfig((prev) => {
      const newQuantity = Math.max(1, Math.min(30, prev.quantity + delta));
      return { ...prev, quantity: newQuantity };
    });
  };

  const setQuantity = (value: string) => {
    const newQuantity = parseInt(value) || 1;
    setCurrentConfig((prev) => ({
      ...prev,
      quantity: Math.max(1, Math.min(30, newQuantity)),
    }));
  };

  const resetConfiguration = () => {
    setCurrentConfig({
      moduleType: null,
      selectedProduct: null,
      quantity: 1,
    });
    setShowConfigSection(false);
    setShowMixingWarning(false);
    setSystemOverviewOpacity(0.5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const requestQuote = () => {
    if (!currentConfig.selectedProduct) {
      alert("Bitte wählen Sie zunächst ein Modultyp und Produkt aus.");
      return;
    }

    const product = currentConfig.selectedProduct;
    const quantity = currentConfig.quantity;
    const requiredHousings = Math.ceil(
      quantity / housingData.max_modules_per_housing
    );

    const quoteDetails = {
      product: product.name,
      quantity: quantity,
      totalCapacity: (product.capacity_kwh * quantity).toFixed(1),
      totalPower: (product.power_kw * quantity).toFixed(1),
      requiredHousings: requiredHousings,
      estimatedCost:
        product.price_estimate * quantity +
        requiredHousings * housingData.price_per_housing,
    };

    const quoteSummary = `
Angebot angefordert für:

Produkt: ${quoteDetails.product}
Anzahl Module: ${quoteDetails.quantity}
Gesamtkapazität: ${quoteDetails.totalCapacity} kWh
Gesamtleistung: ${quoteDetails.totalPower} kW
Benötigte Gehäuse: ${quoteDetails.requiredHousings}
Geschätzte Kosten: ${quoteDetails.estimatedCost.toLocaleString("de-DE")} €

Diese Anfrage würde normalerweise an unser Vertriebsteam weitergeleitet werden.
        `.trim();

    alert(quoteSummary);
    console.log("Quote request:", quoteDetails);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const subscribeNewsletter = () => {
    const emailInput = document.getElementById(
      "newsletterEmail"
    ) as HTMLInputElement;
    const email = emailInput.value.trim();

    if (!email) {
      alert("Bitte geben Sie eine E-Mail-Adresse ein.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setNewsletterBtnText("Angemeldet ✓");
    setNewsletterBtnDisabled(true);
    setNewsletterBtnVariant("secondary");

    emailInput.value = "";

    setTimeout(() => {
      setNewsletterBtnText("Anmelden");
      setNewsletterBtnDisabled(false);
      setNewsletterBtnVariant("default");
    }, 3000);

    console.log("Newsletter subscription:", email);
  };

  // Pre-select product based on handle
  useEffect(() => {
    const allProducts = [
      ...productsData.power_modules,
      ...productsData.energy_modules,
    ];
    const productToSelect = allProducts.find(
      (p) => p.name.toLowerCase().replace(/ /g, "-") === handle.toLowerCase()
    );

    if (productToSelect) {
      const moduleType = productsData.power_modules.includes(productToSelect)
        ? "power"
        : "energy";
      setCurrentConfig((prev) => ({
        ...prev,
        moduleType: moduleType,
        selectedProduct: productToSelect,
      }));
      setShowConfigSection(true);
    } else {
      // If handle doesn't match any product, you might want to show a default state or 404
      // For now, we'll just log and let the page render in its initial state
      console.log(`Product with handle "${handle}" not found.`);
      // If you want to strictly 404, uncomment the line below:
      // notFound();
    }
  }, [handle]);

  const renderProductOptions = (type: "power" | "energy") => {
    const products =
      type === "power"
        ? productsData.power_modules
        : productsData.energy_modules;
    return (
      <RadioGroup
        value={currentConfig.selectedProduct?.name || ""}
        onValueChange={(value) => {
          const selectedIndex = products.findIndex((p) => p.name === value);
          if (selectedIndex !== -1) {
            selectProduct(type, selectedIndex);
          }
        }}
        className="flex flex-col gap-3"
      >
        {products.map((product, index) => (
          <div
            key={product.name}
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ease-standard
              ${
                currentConfig.selectedProduct?.name === product.name
                  ? "border-primary bg-green-50/10"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            onClick={() => selectProduct(type, index)}
          >
            <RadioGroupItem value={product.name} id={`product-${index}`} />
            <Label htmlFor={`product-${index}`} className="flex-1 cursor-pointer">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-600">
                {product.capacity_kwh} kWh | {product.power_kw} kW |{" "}
                {product.cells} Zellen
              </div>
              <div className="text-sm text-gray-600">{product.description}</div>
            </Label>
            <div className="font-bold text-primary">
              {product.price_estimate.toLocaleString("de-DE")} €
            </div>
          </div>
        ))}
      </RadioGroup>
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-primary-DEFAULT to-primary-hover text-primary-foreground py-8 md:py-12 lg:py-16 mb-8 md:mb-12 lg:mb-16 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div className="px-4 md:px-8 lg:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Bluebox Batteriespeicher-Konfigurator
          </h1>
          <p className="text-lg opacity-90 leading-normal m-0">
            Konfigurieren Sie Ihr individuelles DIY-Batteriesystem für
            stationäre Speicher, Fahrzeuge und Marine-Anwendungen
          </p>
        </div>
        <div className="flex justify-center items-center px-4 md:px-8 lg:px-12">
          <img
            src="https://pplx-res.cloudinary.com/image/upload/v1751359180/gpt4o_images/nnipvnkzcgd5usmev5mk.png"
            alt="Professionelle Batteriespeicher-Visualisierung"
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-md shadow-lg"
          />
        </div>
      </header>

      {/* Product Selection */}
      <section className="mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
          Wählen Sie Ihren Modultyp
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-12 lg:mb-16">
          <Card
            className={`p-6 md:p-8 border-2 rounded-lg transition-all duration-300 ease-standard cursor-pointer
              ${
                currentConfig.moduleType === "power"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              }`}
            onClick={() => selectModuleType("power")}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl md:text-2xl font-semibold m-0">
                Power-Module
              </h3>
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Hochleistung
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Optimiert für maximale Entladeleistung und hohe Ströme
            </p>
            <ul className="list-none p-0 mb-5">
              <li className="relative pl-5 mb-2 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">
                Ideal für Fahrzeuge und Hochlast-Anwendungen
              </li>
              <li className="relative pl-5 mb-2 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">
                Bis zu 4,0 kW Leistung pro Modul
              </li>
              <li className="relative pl-5 mb-2 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">
                Basierend auf NCR18650B-Zellen
              </li>
            </ul>
            <Button
              className="w-full"
              onClick={() => selectModuleType("power")}
              variant={currentConfig.moduleType === "power" ? "default" : "outline"}
            >
              Power-Module auswählen
            </Button>
          </Card>

          <Card
            className={`p-6 md:p-8 border-2 rounded-lg transition-all duration-300 ease-standard cursor-pointer
              ${
                currentConfig.moduleType === "energy"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              }`}
            onClick={() => selectModuleType("energy")}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl md:text-2xl font-semibold m-0">
                Energy-Module
              </h3>
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Kapazität
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Maximale Speicherkapazität für lange Autonomie
            </p>
            <ul className="list-none p-0 mb-5">
              <li className="relative pl-5 mb-2 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">
                Ideal für Dauerbetrieb und Eigenverbrauch
              </li>
              <li className="relative pl-5 mb-2 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">
                Bis zu 7,7 kWh Kapazität pro Modul
              </li>
              <li className="relative pl-5 mb-2 before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">
                Ausgewogenes Leistung-zu-Kapazität-Verhältnis
              </li>
            </ul>
            <Button
              className="w-full"
              onClick={() => selectModuleType("energy")}
              variant={currentConfig.moduleType === "energy" ? "default" : "outline"}
            >
              Energy-Module auswählen
            </Button>
          </Card>
        </div>
      </section>

      {/* Configuration Section */}
      {showConfigSection && (
        <section className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
            Systemkonfiguration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {/* Product Selection */}
            <Card className="p-5 border rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-primary">
                Modulauswahl
              </h3>
              <div className="bg-gray-100 p-3 rounded-md mb-4 font-medium">
                Ausgewählt:{" "}
                {currentConfig.moduleType === "power"
                  ? "Power-Module"
                  : currentConfig.moduleType === "energy"
                  ? "Energy-Module"
                  : "Kein Modultyp ausgewählt"}
              </div>
              <div className="flex flex-col gap-3">
                {currentConfig.moduleType &&
                  renderProductOptions(currentConfig.moduleType)}
              </div>
            </Card>

            {/* Quantity Configuration */}
            <Card className="p-5 border rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-primary">
                Anzahl Module
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 text-lg font-bold"
                  onClick={() => changeQuantity(-1)}
                >
                  -
                </Button>
                <Input
                  type="number"
                  id="moduleQuantity"
                  className="w-20 text-center font-medium"
                  value={currentConfig.quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  max="30"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 text-lg font-bold"
                  onClick={() => changeQuantity(1)}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-gray-600 m-0">
                Maximal {housingData.max_modules_per_housing} Module pro Gehäuse
              </p>
            </Card>

            {/* System Overview */}
            <Card
              className="p-5 border rounded-lg col-span-1 md:col-span-2 lg:col-span-1"
              style={{ opacity: systemOverviewOpacity }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-primary">
                Systemübersicht
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-100 rounded-md">
                  <span className="block text-sm text-gray-600 mb-2">
                    Gesamtkapazität
                  </span>
                  <span className="block text-2xl font-bold text-primary">
                    {currentConfig.selectedProduct
                      ? (
                          currentConfig.selectedProduct.capacity_kwh *
                          currentConfig.quantity
                        ).toFixed(1)
                      : "0"}{" "}
                    kWh
                  </span>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md">
                  <span className="block text-sm text-gray-600 mb-2">
                    Gesamtleistung
                  </span>
                  <span className="block text-2xl font-bold text-primary">
                    {currentConfig.selectedProduct
                      ? (
                          currentConfig.selectedProduct.power_kw *
                          currentConfig.quantity
                        ).toFixed(1)
                      : "0"}{" "}
                    kW
                  </span>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md">
                  <span className="block text-sm text-gray-600 mb-2">
                    Benötigte Gehäuse
                  </span>
                  <span className="block text-2xl font-bold text-primary">
                    {currentConfig.selectedProduct
                      ? Math.ceil(
                          currentConfig.quantity /
                            housingData.max_modules_per_housing
                        )
                      : "0"}
                  </span>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md">
                  <span className="block text-sm text-gray-600 mb-2">
                    Geschätzte Kosten
                  </span>
                  <span className="block text-2xl font-bold text-primary">
                    {(currentConfig.selectedProduct
                      ? currentConfig.selectedProduct.price_estimate *
                          currentConfig.quantity +
                        Math.ceil(
                          currentConfig.quantity /
                            housingData.max_modules_per_housing
                        ) *
                          housingData.price_per_housing
                      : 0
                    ).toLocaleString("de-DE")}{" "}
                    €
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Warning Messages */}
          {showMixingWarning && (
            <div className="bg-orange-100 border border-orange-300 text-orange-700 p-4 rounded-md mb-5">
              <strong>Wichtiger Hinweis:</strong> Power- und Energy-Module
              dürfen nicht im selben Gehäuse kombiniert werden. Jedes Gehäuse
              kann nur Module desselben Typs enthalten.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="outline" onClick={resetConfiguration}>
              Konfiguration zurücksetzen
            </Button>
            <Button size="lg" onClick={requestQuote}>
              Angebot anfordern
            </Button>
          </div>
        </section>
      )}

      {/* Product Comparison Chart */}
      <section className="mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
          Produktvergleich
        </h2>
        <Card className="p-5 border rounded-lg text-center">
          <img
            src="https://pplx-res.cloudinary.com/image/upload/v1751359379/pplx_code_interpreter/3fa10ab4_jl4mvx.jpg"
            alt="Batterie-Module Produktvergleich: Kapazität vs. Leistung"
            className="w-full max-w-2xl h-auto rounded-md mx-auto"
          />
        </Card>
      </section>

      {/* Future Products */}
      <section className="mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
          Kommende Erweiterungen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Card className="p-5 border rounded-lg text-center">
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
              Maßgeschneidertes BMS
            </h3>
            <p className="mb-4 text-gray-600">
              Intelligentes Batteriemanagementsystem für optimale Sicherheit
              und Leistung
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full font-medium text-sm bg-blue-100 text-blue-700 border border-blue-300">
              In Entwicklung
            </span>
          </Card>
          <Card className="p-5 border rounded-lg text-center">
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
              Photovoltaik-Komplettkit
            </h3>
            <p className="mb-4 text-gray-600">
              Perfekt abgestimmte PV-Module für Ihr Batteriesystem
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full font-medium text-sm bg-yellow-100 text-yellow-700 border border-yellow-300">
              Bald verfügbar
            </span>
          </Card>
        </div>
        <Card className="p-6 border rounded-lg text-center">
          <h4 className="text-lg md:text-xl font-semibold mb-3 text-primary">
            Informiert bleiben
          </h4>
          <p className="mb-4 text-gray-600">
            Erhalten Sie Updates über neue Produkte und Features
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              id="newsletterEmail"
              className="flex-1"
            />
            <Button
              onClick={subscribeNewsletter}
              disabled={newsletterBtnDisabled}
              variant={newsletterBtnVariant}
            >
              {newsletterBtnText}
            </Button>
          </div>
        </Card>
      </section>

      {/* Technical Information */}
      <section className="mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
          Technische Grundlagen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border rounded-md text-center">
            <h4 className="text-base font-semibold mb-2 text-primary">
              Zelltyp
            </h4>
            <p className="m-0 font-medium">NCR18650B Li-Ion Zellen</p>
          </Card>
          <Card className="p-4 border rounded-md text-center">
            <h4 className="text-base font-semibold mb-2 text-primary">
              Nennspannung
            </h4>
            <p className="m-0 font-medium">3,6V pro Zelle</p>
          </Card>
          <Card className="p-4 border rounded-md text-center">
            <h4 className="text-base font-semibold mb-2 text-primary">
              Zellkapazität
            </h4>
            <p className="m-0 font-medium">3350mAh</p>
          </Card>
          <Card className="p-4 border rounded-md text-center">
            <h4 className="text-base font-semibold mb-2 text-primary">
              Gehäusemaße
            </h4>
            <p className="m-0 font-medium">60×40×25 cm</p>
          </Card>
        </div>
      </section>

      {/* Applications */}
      <section className="mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
          Anwendungsbereiche
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-primary text-btn-primary-text p-4 rounded-md text-center font-medium transition-all duration-200 ease-standard hover:bg-primary-hover hover:-translate-y-0.5">
            Stationäre Batteriespeichersysteme
          </Card>
          <Card className="bg-primary text-btn-primary-text p-4 rounded-md text-center font-medium transition-all duration-200 ease-standard hover:bg-primary-hover hover:-translate-y-0.5">
            Elektrofahrzeuge
          </Card>
          <Card className="bg-primary text-btn-primary-text p-4 rounded-md text-center font-medium transition-all duration-200 ease-standard hover:bg-primary-hover hover:-translate-y-0.5">
            Marine/Boote
          </Card>
          <Card className="bg-primary text-btn-primary-text p-4 rounded-md text-center font-medium transition-all duration-200 ease-standard hover:bg-primary-hover hover:-translate-y-0.5">
            Off-Grid Systeme
          </Card>
          <Card className="bg-primary text-btn-primary-text p-4 rounded-md text-center font-medium transition-all duration-200 ease-standard hover:bg-primary-hover hover:-translate-y-0.5">
            PV-Eigenverbrauchsoptimierung
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card-background border-t border-gray-200 py-6 md:py-8 mt-8 md:mt-12 lg:mt-16">
        <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-4 px-4">
          <p className="text-gray-600 text-sm">
            &copy; 2025 Bluebox Batteriesysteme. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-5">
            <a href="#" target="_blank" className="text-gray-600 hover:text-primary text-sm">
              Impressum
            </a>
            <a href="#" target="_blank" className="text-gray-600 hover:text-primary text-sm">
              Datenschutz
            </a>
            <a href="#" target="_blank" className="text-gray-600 hover:text-primary text-sm">
              AGB
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
