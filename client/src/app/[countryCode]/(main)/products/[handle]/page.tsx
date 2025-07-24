"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCallback, useEffect, useState } from "react";

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
			quantity / housingData.max_modules_per_housing,
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
		const newQuantity = Number.parseInt(value) || 1;
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
			quantity / housingData.max_modules_per_housing,
		);

		const quoteDetails = {
			product: product.name,
			quantity,
			totalCapacity: (product.capacity_kwh * quantity).toFixed(1),
			totalPower: (product.power_kw * quantity).toFixed(1),
			requiredHousings,
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
			"newsletterEmail",
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
			(p) => p.name.toLowerCase().replace(/ /g, "-") === handle.toLowerCase(),
		);

		if (productToSelect) {
			const moduleType = productsData.power_modules.includes(productToSelect)
				? "power"
				: "energy";
			setCurrentConfig((prev) => ({
				...prev,
				moduleType,
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
				className="flex flex-col gap-3"
				onValueChange={(value) => {
					const selectedIndex = products.findIndex((p) => p.name === value);
					if (selectedIndex !== -1) {
						selectProduct(type, selectedIndex);
					}
				}}
				value={currentConfig.selectedProduct?.name || ""}
			>
				{products.map((product, index) => (
					<div
						className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all duration-200 ease-standard ${
							currentConfig.selectedProduct?.name === product.name
								? "border-primary bg-green-50/10"
								: "border-gray-200 hover:bg-gray-100"
						}`}
						key={product.name}
						onClick={() => selectProduct(type, index)}
					>
						<RadioGroupItem id={`product-${index}`} value={product.name} />
						<Label
							className="flex-1 cursor-pointer"
							htmlFor={`product-${index}`}
						>
							<div className="font-medium">{product.name}</div>
							<div className="text-gray-600 text-sm">
								{product.capacity_kwh} kWh | {product.power_kw} kW |{" "}
								{product.cells} Zellen
							</div>
							<div className="text-gray-600 text-sm">{product.description}</div>
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
			<header className="mb-8 grid grid-cols-1 items-center gap-8 rounded-lg bg-gradient-to-br from-primary-DEFAULT to-primary-hover py-8 text-primary-foreground md:mb-12 md:grid-cols-2 md:gap-12 md:py-12 lg:mb-16 lg:gap-16 lg:py-16">
				<div className="px-4 md:px-8 lg:px-12">
					<h1 className="mb-4 font-bold text-3xl md:text-4xl lg:text-5xl">
						Bluebox Batteriespeicher-Konfigurator
					</h1>
					<p className="m-0 text-lg leading-normal opacity-90">
						Konfigurieren Sie Ihr individuelles DIY-Batteriesystem für
						stationäre Speicher, Fahrzeuge und Marine-Anwendungen
					</p>
				</div>
				<div className="flex items-center justify-center px-4 md:px-8 lg:px-12">
					<img
						alt="Professionelle Batteriespeicher-Visualisierung"
						className="h-auto w-full max-w-xs rounded-md shadow-lg md:max-w-sm lg:max-w-md"
						src="https://pplx-res.cloudinary.com/image/upload/v1751359180/gpt4o_images/nnipvnkzcgd5usmev5mk.png"
					/>
				</div>
			</header>

			{/* Product Selection */}
			<section className="mb-8 md:mb-12 lg:mb-16">
				<h2 className="mb-6 text-center font-semibold text-2xl md:text-3xl lg:text-4xl">
					Wählen Sie Ihren Modultyp
				</h2>
				<div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-8 lg:mb-16 lg:gap-10">
					<Card
						className={`cursor-pointer rounded-lg border-2 p-6 transition-all duration-300 ease-standard md:p-8 ${
							currentConfig.moduleType === "power"
								? "border-primary bg-primary/5"
								: "hover:-translate-y-0.5 border-border hover:border-primary hover:shadow-md"
						}`}
						onClick={() => selectModuleType("power")}
					>
						<div className="mb-4 flex items-center justify-between">
							<h3 className="m-0 font-semibold text-xl md:text-2xl">
								Power-Module
							</h3>
							<span className="rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground text-sm">
								Hochleistung
							</span>
						</div>
						<p className="mb-4 text-muted-foreground">
							Optimiert für maximale Entladeleistung und hohe Ströme
						</p>
						<ul className="mb-5 list-none p-0">
							<li className="relative mb-2 pl-5 before:absolute before:left-0 before:font-bold before:text-success before:content-['✓']">
								Ideal für Fahrzeuge und Hochlast-Anwendungen
							</li>
							<li className="relative mb-2 pl-5 before:absolute before:left-0 before:font-bold before:text-success before:content-['✓']">
								Bis zu 4,0 kW Leistung pro Modul
							</li>
							<li className="relative mb-2 pl-5 before:absolute before:left-0 before:font-bold before:text-success before:content-['✓']">
								Basierend auf NCR18650B-Zellen
							</li>
						</ul>
						<Button
							className="w-full"
							onClick={() => selectModuleType("power")}
							variant={
								currentConfig.moduleType === "power" ? "default" : "outline"
							}
						>
							Power-Module auswählen
						</Button>
					</Card>

					<Card
						className={`cursor-pointer rounded-lg border-2 p-6 transition-all duration-300 ease-standard md:p-8 ${
							currentConfig.moduleType === "energy"
								? "border-primary bg-primary/5"
								: "hover:-translate-y-0.5 border-border hover:border-primary hover:shadow-md"
						}`}
						onClick={() => selectModuleType("energy")}
					>
						<div className="mb-4 flex items-center justify-between">
							<h3 className="m-0 font-semibold text-xl md:text-2xl">
								Energy-Module
							</h3>
							<span className="rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground text-sm">
								Kapazität
							</span>
						</div>
						<p className="mb-4 text-muted-foreground">
							Maximale Speicherkapazität für lange Autonomie
						</p>
						<ul className="mb-5 list-none p-0">
							<li className="relative mb-2 pl-5 before:absolute before:left-0 before:font-bold before:text-success before:content-['✓']">
								Ideal für Dauerbetrieb und Eigenverbrauch
							</li>
							<li className="relative mb-2 pl-5 before:absolute before:left-0 before:font-bold before:text-success before:content-['✓']">
								Bis zu 7,7 kWh Kapazität pro Modul
							</li>
							<li className="relative mb-2 pl-5 before:absolute before:left-0 before:font-bold before:text-success before:content-['✓']">
								Ausgewogenes Leistung-zu-Kapazität-Verhältnis
							</li>
						</ul>
						<Button
							className="w-full"
							onClick={() => selectModuleType("energy")}
							variant={
								currentConfig.moduleType === "energy" ? "default" : "outline"
							}
						>
							Energy-Module auswählen
						</Button>
					</Card>
				</div>
			</section>

			{/* Configuration Section */}
			{showConfigSection && (
				<section className="mb-8 md:mb-12 lg:mb-16">
					<h2 className="mb-6 text-center font-semibold text-2xl md:text-3xl lg:text-4xl">
						Systemkonfiguration
					</h2>

					<div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
						{/* Product Selection */}
						<Card className="rounded-lg border p-5">
							<h3 className="mb-4 font-semibold text-lg text-primary md:text-xl">
								Modulauswahl
							</h3>
							<div className="mb-4 rounded-md bg-gray-100 p-3 font-medium">
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
						<Card className="rounded-lg border p-5">
							<h3 className="mb-4 font-semibold text-lg text-primary md:text-xl">
								Anzahl Module
							</h3>
							<div className="mb-3 flex items-center gap-3">
								<Button
									className="h-10 w-10 font-bold text-lg"
									onClick={() => changeQuantity(-1)}
									size="icon"
									variant="outline"
								>
									-
								</Button>
								<Input
									className="w-20 text-center font-medium"
									id="moduleQuantity"
									max="30"
									min="1"
									onChange={(e) => setQuantity(e.target.value)}
									type="number"
									value={currentConfig.quantity}
								/>
								<Button
									className="h-10 w-10 font-bold text-lg"
									onClick={() => changeQuantity(1)}
									size="icon"
									variant="outline"
								>
									+
								</Button>
							</div>
							<p className="m-0 text-gray-600 text-sm">
								Maximal {housingData.max_modules_per_housing} Module pro Gehäuse
							</p>
						</Card>

						{/* System Overview */}
						<Card
							className="col-span-1 rounded-lg border p-5 md:col-span-2 lg:col-span-1"
							style={{ opacity: systemOverviewOpacity }}
						>
							<h3 className="mb-4 font-semibold text-lg text-primary md:text-xl">
								Systemübersicht
							</h3>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="rounded-md bg-gray-100 p-4 text-center">
									<span className="mb-2 block text-gray-600 text-sm">
										Gesamtkapazität
									</span>
									<span className="block font-bold text-2xl text-primary">
										{currentConfig.selectedProduct
											? (
													currentConfig.selectedProduct.capacity_kwh *
													currentConfig.quantity
												).toFixed(1)
											: "0"}{" "}
										kWh
									</span>
								</div>
								<div className="rounded-md bg-gray-100 p-4 text-center">
									<span className="mb-2 block text-gray-600 text-sm">
										Gesamtleistung
									</span>
									<span className="block font-bold text-2xl text-primary">
										{currentConfig.selectedProduct
											? (
													currentConfig.selectedProduct.power_kw *
													currentConfig.quantity
												).toFixed(1)
											: "0"}{" "}
										kW
									</span>
								</div>
								<div className="rounded-md bg-gray-100 p-4 text-center">
									<span className="mb-2 block text-gray-600 text-sm">
										Benötigte Gehäuse
									</span>
									<span className="block font-bold text-2xl text-primary">
										{currentConfig.selectedProduct
											? Math.ceil(
													currentConfig.quantity /
														housingData.max_modules_per_housing,
												)
											: "0"}
									</span>
								</div>
								<div className="rounded-md bg-gray-100 p-4 text-center">
									<span className="mb-2 block text-gray-600 text-sm">
										Geschätzte Kosten
									</span>
									<span className="block font-bold text-2xl text-primary">
										{(currentConfig.selectedProduct
											? currentConfig.selectedProduct.price_estimate *
													currentConfig.quantity +
												Math.ceil(
													currentConfig.quantity /
														housingData.max_modules_per_housing,
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
						<div className="mb-5 rounded-md border border-orange-300 bg-orange-100 p-4 text-orange-700">
							<strong>Wichtiger Hinweis:</strong> Power- und Energy-Module
							dürfen nicht im selben Gehäuse kombiniert werden. Jedes Gehäuse
							kann nur Module desselben Typs enthalten.
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex flex-wrap justify-center gap-4">
						<Button onClick={resetConfiguration} variant="outline">
							Konfiguration zurücksetzen
						</Button>
						<Button onClick={requestQuote} size="lg">
							Angebot anfordern
						</Button>
					</div>
				</section>
			)}

			{/* Product Comparison Chart */}
			<section className="mb-8 md:mb-12 lg:mb-16">
				<h2 className="mb-6 text-center font-semibold text-2xl md:text-3xl lg:text-4xl">
					Produktvergleich
				</h2>
				<Card className="rounded-lg border p-5 text-center">
					<img
						alt="Batterie-Module Produktvergleich: Kapazität vs. Leistung"
						className="mx-auto h-auto w-full max-w-2xl rounded-md"
						src="https://pplx-res.cloudinary.com/image/upload/v1751359379/pplx_code_interpreter/3fa10ab4_jl4mvx.jpg"
					/>
				</Card>
			</section>

			{/* Future Products */}
			<section className="mb-8 md:mb-12 lg:mb-16">
				<h2 className="mb-6 text-center font-semibold text-2xl md:text-3xl lg:text-4xl">
					Kommende Erweiterungen
				</h2>
				<div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
					<Card className="rounded-lg border p-5 text-center">
						<h3 className="mb-3 font-semibold text-lg text-primary md:text-xl">
							Maßgeschneidertes BMS
						</h3>
						<p className="mb-4 text-gray-600">
							Intelligentes Batteriemanagementsystem für optimale Sicherheit und
							Leistung
						</p>
						<span className="inline-flex items-center rounded-full border border-blue-300 bg-blue-100 px-3 py-1 font-medium text-blue-700 text-sm">
							In Entwicklung
						</span>
					</Card>
					<Card className="rounded-lg border p-5 text-center">
						<h3 className="mb-3 font-semibold text-lg text-primary md:text-xl">
							Photovoltaik-Komplettkit
						</h3>
						<p className="mb-4 text-gray-600">
							Perfekt abgestimmte PV-Module für Ihr Batteriesystem
						</p>
						<span className="inline-flex items-center rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 font-medium text-sm text-yellow-700">
							Bald verfügbar
						</span>
					</Card>
				</div>
				<Card className="rounded-lg border p-6 text-center">
					<h4 className="mb-3 font-semibold text-lg text-primary md:text-xl">
						Informiert bleiben
					</h4>
					<p className="mb-4 text-gray-600">
						Erhalten Sie Updates über neue Produkte und Features
					</p>
					<div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
						<Input
							className="flex-1"
							id="newsletterEmail"
							placeholder="Ihre E-Mail-Adresse"
							type="email"
						/>
						<Button
							disabled={newsletterBtnDisabled}
							onClick={subscribeNewsletter}
							variant={newsletterBtnVariant}
						>
							{newsletterBtnText}
						</Button>
					</div>
				</Card>
			</section>

			{/* Technical Information */}
			<section className="mb-8 md:mb-12 lg:mb-16">
				<h2 className="mb-6 text-center font-semibold text-2xl md:text-3xl lg:text-4xl">
					Technische Grundlagen
				</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
					<Card className="rounded-md border p-4 text-center">
						<h4 className="mb-2 font-semibold text-base text-primary">
							Zelltyp
						</h4>
						<p className="m-0 font-medium">NCR18650B Li-Ion Zellen</p>
					</Card>
					<Card className="rounded-md border p-4 text-center">
						<h4 className="mb-2 font-semibold text-base text-primary">
							Nennspannung
						</h4>
						<p className="m-0 font-medium">3,6V pro Zelle</p>
					</Card>
					<Card className="rounded-md border p-4 text-center">
						<h4 className="mb-2 font-semibold text-base text-primary">
							Zellkapazität
						</h4>
						<p className="m-0 font-medium">3350mAh</p>
					</Card>
					<Card className="rounded-md border p-4 text-center">
						<h4 className="mb-2 font-semibold text-base text-primary">
							Gehäusemaße
						</h4>
						<p className="m-0 font-medium">60×40×25 cm</p>
					</Card>
				</div>
			</section>

			{/* Applications */}
			<section className="mb-8 md:mb-12 lg:mb-16">
				<h2 className="mb-6 text-center font-semibold text-2xl md:text-3xl lg:text-4xl">
					Anwendungsbereiche
				</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					<Card className="hover:-translate-y-0.5 rounded-md bg-primary p-4 text-center font-medium text-btn-primary-text transition-all duration-200 ease-standard hover:bg-primary-hover">
						Stationäre Batteriespeichersysteme
					</Card>
					<Card className="hover:-translate-y-0.5 rounded-md bg-primary p-4 text-center font-medium text-btn-primary-text transition-all duration-200 ease-standard hover:bg-primary-hover">
						Elektrofahrzeuge
					</Card>
					<Card className="hover:-translate-y-0.5 rounded-md bg-primary p-4 text-center font-medium text-btn-primary-text transition-all duration-200 ease-standard hover:bg-primary-hover">
						Marine/Boote
					</Card>
					<Card className="hover:-translate-y-0.5 rounded-md bg-primary p-4 text-center font-medium text-btn-primary-text transition-all duration-200 ease-standard hover:bg-primary-hover">
						Off-Grid Systeme
					</Card>
					<Card className="hover:-translate-y-0.5 rounded-md bg-primary p-4 text-center font-medium text-btn-primary-text transition-all duration-200 ease-standard hover:bg-primary-hover">
						PV-Eigenverbrauchsoptimierung
					</Card>
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-8 border-gray-200 border-t bg-card-background py-6 md:mt-12 md:py-8 lg:mt-16">
				<div className="flex flex-col flex-wrap items-center justify-between gap-4 px-4 sm:flex-row">
					<p className="text-gray-600 text-sm">
						&copy; 2025 Bluebox Batteriesysteme. Alle Rechte vorbehalten.
					</p>
					<div className="flex gap-5">
						<a
							className="text-gray-600 text-sm hover:text-primary"
							href="#"
							rel="noopener"
							target="_blank"
						>
							Impressum
						</a>
						<a
							className="text-gray-600 text-sm hover:text-primary"
							href="#"
							rel="noopener"
							target="_blank"
						>
							Datenschutz
						</a>
						<a
							className="text-gray-600 text-sm hover:text-primary"
							href="#"
							rel="noopener"
							target="_blank"
						>
							AGB
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
