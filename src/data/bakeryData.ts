import heroSourdoughImg from '../assets/images/hero_sourdough_hearth_1794550266597.jpg';
import countrySourdoughImg from '../assets/images/menu_country_sourdough_1794550267091.jpg';
import painAuChocolatImg from '../assets/images/menu_pain_au_chocolat_1794550267546.jpg';
import blueberryLemonTartImg from '../assets/images/menu_blueberry_lemon_tart_1794550267813.jpg';
import basqueCheesecakeImg from '../assets/images/menu_basque_cheesecake_1794550268446.jpg';
import pistachioMorningBunImg from '../assets/images/menu_pistachio_morning_bun_1794550269116.jpg';
import seededRyeLevainImg from '../assets/images/menu_seeded_rye_levain_1794550270120.jpg';
import spanishCortadoImg from '../assets/images/menu_spanish_cortado_1794550270081.jpg';
import kouignAmannImg from '../assets/images/menu_kouign_amann_1794550271274.jpg';
import doughScoringImg from '../assets/images/gallery_dough_scoring_1794550270540.jpg';
import hearthOvenImg from '../assets/images/gallery_hearth_oven_1794550271680.jpg';
import botanicalCakeImg from '../assets/images/gallery_botanical_cake_1794550271364.jpg';

export type MenuCategory = 'all' | 'breads' | 'pastries' | 'cakes' | 'coffee';

export type DietaryFilter = 'all' | 'vegan' | 'eggless';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'all'>;
  categoryLabel: string;
  price: number;
  weightOrPortion: string;
  description: string;
  tastingNotes: string;
  ingredients: string[];
  allergens: string;
  dietaryTags: ('100% Vegan' | 'Eggless' | 'Eggless Opt' | 'Gluten-Friendly' | 'Oat Milk Opt' | 'Contains Nuts' | 'High Fiber')[];
  highlightLabel?: string;
  batchTime: string;
  image: string;
  imageAlt: string;
}

export interface BakingSlot {
  id: string;
  step: number;
  time: string;
  hour24: number;
  minute: number;
  title: string;
  description: string;
  featuredItems: string[];
}

export interface CakeSizeOption {
  id: string;
  label: string;
  servings: string;
  priceLabel: string;
  basePrice: number;
}

export interface CakeFlavorOption {
  id: string;
  name: string;
  notes: string;
  surcharge: number;
}

export const HERO_IMAGES = {
  main: heroSourdoughImg,
  inset: painAuChocolatImg,
};

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'breads', label: 'Sourdough & Breads' },
  { id: 'pastries', label: 'Viennoiserie & Pastries' },
  { id: 'cakes', label: 'Cakes & Tarts' },
  { id: 'coffee', label: 'Coffee & Drinks' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'country-sourdough',
    name: 'Signature Country Sourdough',
    category: 'breads',
    categoryLabel: 'Sourdough & Breads',
    price: 380,
    weightOrPortion: '850g Whole Boule',
    description:
      '36-hour cold-fermented rustic wheat boule with crisp blistered crust, creamy custard crumb, and gentle lactic tang.',
    tastingNotes: 'Toasted wheat, mild yogurt acidity, caramelized malty crust.',
    ingredients: ['Stone-ground Sharbati & Khapli wheat', 'Wild levain culture (est. 2021)', 'Filtered water', 'Sambhar sea salt'],
    allergens: 'Contains gluten (wheat). Baked in a facility handling nuts and dairy.',
    dietaryTags: ['100% Vegan'],
    highlightLabel: 'House Signature',
    batchTime: '8:00 AM & 11:30 AM',
    image: countrySourdoughImg,
    imageAlt: 'Rustic round country sourdough boule with scored wheat-leaf crust on natural linen cloth.',
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    category: 'pastries',
    categoryLabel: 'Viennoiserie & Pastries',
    price: 260,
    weightOrPortion: '115g Single Pastry',
    description:
      '72-layer laminated pastry made with cultured Normandy butter, folded around twin batons of 64% Valrhona dark chocolate.',
    tastingNotes: 'Shattering honeycomb pastry shell, toasted butter, bittersweet cocoa.',
    ingredients: ['French T45 pastry flour', 'Cultured Normandy butter', '64% dark chocolate batons', 'Raw cane sugar'],
    allergens: 'Contains wheat, dairy, soy lecithin. Eggless batch available until 11:00 AM.',
    dietaryTags: ['Eggless Opt'],
    highlightLabel: "Baker's Pick",
    batchTime: '9:30 AM',
    image: painAuChocolatImg,
    imageAlt: 'Flaky 72-layer laminated French pain au chocolat with dark chocolate batons on baking parchment.',
  },
  {
    id: 'blueberry-lemon-tart',
    name: 'Wild Blueberry & Lemon Tart',
    category: 'cakes',
    categoryLabel: 'Cakes & Tarts',
    price: 340,
    weightOrPortion: '140g Individual Tart',
    description:
      'Toasted almond frangipane tart shell filled with bright Meyer lemon curd, plump wild blueberries, and fresh garden thyme.',
    tastingNotes: 'Bright citrus zest, roasted almond crunch, sweet-tart berry burst.',
    ingredients: ['Californian almond flour', 'Meyer lemon juice & zest', 'Himalayan wild blueberries', 'Cultured unsalted butter'],
    allergens: 'Contains tree nuts (almonds), wheat, dairy. 100% Eggless.',
    dietaryTags: ['Eggless', 'Contains Nuts'],
    batchTime: '10:30 AM',
    image: blueberryLemonTartImg,
    imageAlt: 'Individual French almond tart filled with bright lemon curd and fresh wild blueberries on a stoneware plate.',
  },
  {
    id: 'basque-cheesecake',
    name: 'Burnt Basque Cheesecake',
    category: 'cakes',
    categoryLabel: 'Cakes & Tarts',
    price: 420,
    weightOrPortion: '180g Generous Slice',
    description:
      'Deeply caramelized blistered mahogany crust giving way to a velvety, spoonable Madagascar vanilla bean cheesecake center.',
    tastingNotes: 'Burnt caramel edge, lush salted cream cheese, floral vanilla bean.',
    ingredients: ['Artisanal cream cheese', 'Heavy whipping cream', 'Madagascar vanilla bean', 'Cornstarch', 'Raw cane sugar'],
    allergens: 'Contains dairy. 100% Eggless & naturally gluten-friendly.',
    dietaryTags: ['Eggless', 'Gluten-Friendly'],
    highlightLabel: 'Bestseller',
    batchTime: '11:00 AM',
    image: basqueCheesecakeImg,
    imageAlt: 'Slice of burnt Basque cheesecake with caramelized dark crust and creamy vanilla bean center on parchment.',
  },
  {
    id: 'pistachio-morning-bun',
    name: 'Pistachio Rose Morning Bun',
    category: 'pastries',
    categoryLabel: 'Viennoiserie & Pastries',
    price: 280,
    weightOrPortion: '125g Spiral Scroll',
    description:
      'Laminated brioche scroll layered with crushed Iranian green pistachios, freshly pounded green cardamom, and rose petal glaze.',
    tastingNotes: 'Warm aromatic cardamom, delicate Damask rose, roasted pistachio crunch.',
    ingredients: ['Sourdough laminated brioche', 'Iranian green pistachios', 'Kannauj rose water', 'Green cardamom pods'],
    allergens: 'Contains wheat, dairy, tree nuts (pistachios).',
    dietaryTags: ['Contains Nuts'],
    batchTime: '9:30 AM',
    image: pistachioMorningBunImg,
    imageAlt: 'Spiral laminated morning bun coated in rose sugar glaze and crushed green Iranian pistachios.',
  },
  {
    id: 'seeded-rye-levain',
    name: 'Seeded Rye Levain',
    category: 'breads',
    categoryLabel: 'Sourdough & Breads',
    price: 410,
    weightOrPortion: '900g Pan Loaf',
    description:
      '40% dark whole-grain rye fermented 48 hours, packed with toasted golden flax, pumpkin, sunflower, and sesame seeds.',
    tastingNotes: 'Nutty toasted seeds, earthy whole rye, moist tender crumb ideal for open-faced tartines.',
    ingredients: ['Whole-grain dark rye', 'Stone-ground wheat', 'Toasted flax, pumpkin & sunflower seeds', 'Wild rye levain'],
    allergens: 'Contains gluten (rye, wheat) and sesame seeds.',
    dietaryTags: ['100% Vegan', 'High Fiber'],
    batchTime: '8:00 AM',
    image: seededRyeLevainImg,
    imageAlt: 'Dark European-style seeded rye sourdough loaf sliced on a wooden board showing dense grain structure.',
  },
  {
    id: 'spanish-cortado',
    name: 'Spanish Cortado & Pourover',
    category: 'coffee',
    categoryLabel: 'Coffee & Drinks',
    price: 220,
    weightOrPortion: '150ml / 240ml',
    description:
      'Single-estate washed Arabica from Chikmagalur estates pulled as a velvety cortado or hand-poured V60 filter brew.',
    tastingNotes: 'Roasted hazelnut, dark cocoa nibs, sweet plum finish.',
    ingredients: ['Single-estate Chikmagalur Arabica', 'Micro-filtered mineral water', 'A2 farm milk or barista oat milk'],
    allergens: 'Dairy-free when ordered with Oat Milk or as black V60 Pourover.',
    dietaryTags: ['Oat Milk Opt', '100% Vegan'],
    batchTime: 'Brewed to Order',
    image: spanishCortadoImg,
    imageAlt: 'Silky Spanish cortado in a fluted glass tumbler on a marble bakery counter beside roasted coffee beans.',
  },
  {
    id: 'kouign-amann',
    name: 'Classic Kouign-Amann',
    category: 'pastries',
    categoryLabel: 'Viennoiserie & Pastries',
    price: 290,
    weightOrPortion: '110g Breton Pastry',
    description:
      'Traditional Breton caramelized laminated pastry folded with salted Normandy butter and demerara sugar to a crisp amber shell.',
    tastingNotes: 'Crisp salted toffee crust, delicate tender buttered pastry heart.',
    ingredients: ['French T45 flour', 'Salted Normandy butter', 'Demerara cane sugar', 'Fleur de sel'],
    allergens: 'Contains wheat and dairy. 100% Eggless.',
    dietaryTags: ['Eggless'],
    highlightLabel: 'Weekend Special',
    batchTime: '9:30 AM & 4:00 PM',
    image: kouignAmannImg,
    imageAlt: 'Breton Kouign-Amann pastry with crisp caramelized amber sugar shell on a speckled ceramic plate.',
  },
];

export const BAKING_SCHEDULE: BakingSlot[] = [
  {
    id: 'slot-1',
    step: 1,
    time: '08:00 AM',
    hour24: 8,
    minute: 0,
    title: 'Country Sourdough & Seeded Rye',
    description: 'First stone-deck oven pull: crackling blistered boules, Seeded Rye Levain, and sesame batons.',
    featuredItems: ['Signature Country Sourdough', 'Seeded Rye Levain'],
  },
  {
    id: 'slot-2',
    step: 2,
    time: '09:30 AM',
    hour24: 9,
    minute: 30,
    title: 'Laminated Viennoiserie & Morning Buns',
    description: 'Cultured butter lamination at peak puff: Pain au Chocolat, Pistachio Rose Buns, and Kouign-Amann.',
    featuredItems: ['Pain au Chocolat', 'Pistachio Rose Morning Bun', 'Classic Kouign-Amann'],
  },
  {
    id: 'slot-3',
    step: 3,
    time: '11:30 AM',
    hour24: 11,
    minute: 30,
    title: 'Midday Hearth Pull & Tarts',
    description: 'Second wave of warm Country Sourdough alongside chilled Basque Cheesecake and Blueberry Lemon Tarts.',
    featuredItems: ['Signature Country Sourdough', 'Wild Blueberry & Lemon Tart', 'Burnt Basque Cheesecake'],
  },
  {
    id: 'slot-4',
    step: 4,
    time: '04:00 PM',
    hour24: 16,
    minute: 0,
    title: 'Afternoon Pastries & Single-Estate Brews',
    description: 'Fresh Kouign-Amann trays, rosemary focaccia slabs, and single-estate Chikmagalur pour-overs.',
    featuredItems: ['Classic Kouign-Amann', 'Spanish Cortado & Pourover'],
  },
];

export const CAKE_SIZES: CakeSizeOption[] = [
  { id: '0.5kg', label: '0.5 kg', servings: '4–6 Servings', priceLabel: 'From ₹1,400', basePrice: 1400 },
  { id: '1kg', label: '1.0 kg', servings: '8–12 Servings', priceLabel: 'From ₹2,400', basePrice: 2400 },
  { id: '2kg', label: '2.0 kg', servings: '16–20 Servings', priceLabel: 'From ₹4,200', basePrice: 4200 },
  { id: 'tiered', label: 'Tiered Tower', servings: '30+ Servings', priceLabel: 'From ₹6,800', basePrice: 6800 },
];

export const CAKE_FLAVORS: CakeFlavorOption[] = [
  {
    id: 'chocolate_hazelnut',
    name: 'Belgian Dark Chocolate & Roasted Hazelnut',
    notes: '70% Callebaut ganache, gianduja crunch, dark cocoa sponge',
    surcharge: 0,
  },
  {
    id: 'pistachio_raspberry',
    name: 'Roasted Pistachio & Wild Raspberry',
    notes: 'Bronte pistachio mousse, tart wild raspberry coulis',
    surcharge: 250,
  },
  {
    id: 'salted_caramel_pecan',
    name: 'Salted Amber Caramel & Candied Pecan',
    notes: 'Fleur de sel caramel diplomat cream, roasted butter crunch',
    surcharge: 150,
  },
  {
    id: 'vanilla_strawberry',
    name: 'Classic Vanilla Bean & Fresh Strawberry',
    notes: 'Madagascar pod mascarpone cream, seasonal Mahabaleshwar berries',
    surcharge: 0,
  },
];

export const STORY_PILLARS = [
  {
    index: '01',
    title: 'The 36-Hour Levain',
    body: 'Our wild yeast starter has been fed daily in Gurgaon since 2021. Long, cool fermentation naturally breaks down complex starches and phytic acid for rich flavor and gentle digestibility.',
    proof: 'Wild ambient microflora · Zero commercial yeast',
  },
  {
    index: '02',
    title: 'Heritage Stone-Ground Grains',
    body: 'We mill and source single-origin ancient wheat cultivars including Khapli and Emmer from organic family farms in Madhya Pradesh and Punjab, preserving the wheat germ and natural oils.',
    proof: 'Unbleached stone-milled flour · Traceable farms',
  },
  {
    index: '03',
    title: 'Handcrafted in Sector 43',
    body: 'No offsite central freezers or shortcuts. Every loaf and pastry is mixed, laminated, scored by hand, and baked directly on stone-deck hearth ovens inside our Gurgaon studio.',
    proof: 'Stone-deck hearth baking · Small batches daily',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'scoring',
    src: doughScoringImg,
    alt: 'Baker hands scoring a wheat-leaf pattern into cold-fermented sourdough boule.',
    caption: 'Dawn Scoring · 5:30 AM Bench',
  },
  {
    id: 'lamination',
    src: painAuChocolatImg,
    alt: 'Crisp laminated pain au chocolat showing 72 delicate butter layers.',
    caption: '72-Layer Butter Lamination',
  },
  {
    id: 'hearth',
    src: hearthOvenImg,
    alt: 'Baker pulling blistered sourdough loaves from a stone-deck hearth oven on a wooden peel.',
    caption: 'Stone-Deck Hearth Pull',
  },
  {
    id: 'bespoke',
    src: botanicalCakeImg,
    alt: 'Bespoke botanical celebration cake adorned with pressed edible flowers and fresh figs.',
    caption: 'Bespoke Botanical Cakes',
  },
];
