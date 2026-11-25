export type NavCategory =
  | 'All'
  | 'Women'
  | 'Men'
  | 'Kids'
  | 'Accessories'
  | 'Collection'
  | 'Brands';

export type BrandName = 'Converse' | 'Puma' | 'Nike';

export interface Product {
  id: string;
  name: string;
  brand: BrandName;
  category: Exclude<NavCategory, 'All' | 'Brands'>;
  colorway: string;
  price: number;
  image: string;
  description: string;
  materials: string;
  sizes: string[];
  featuredTag?: string;
}

export interface HeroSlide {
  id: string;
  headlineLines: string[];
  ctaLabel: string;
  targetCategory: NavCategory;
  image: string;
  imageAlt: string;
  bgGradient: string;
}

export interface ShowcaseCard {
  id: string;
  title: string;
  subtitle: string;
  brandFilter?: BrandName;
  categoryFilter?: NavCategory;
  image: string;
  imageAlt: string;
  logoType: 'puma' | 'nike' | 'style-stack';
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-everyday',
    headlineLines: ['Sneakers That', 'Defy Your Every', 'day Look'],
    ctaLabel: 'Shop Now',
    targetCategory: 'All',
    image: '/src/assets/images/hero_sneaker_model_1795592826999.jpg',
    imageAlt:
      'Editorial studio campaign showing model crouching in light-wash denim and cream, crimson, and houndstooth sneakers',
    bgGradient: 'from-[#5D4937] via-[#7A634C] to-[#C8BAA6]',
  },
  {
    id: 'slide-heritage',
    headlineLines: ['Sculpted For', 'Modern Street', 'Silhouettes'],
    ctaLabel: 'Explore Drop',
    targetCategory: 'Collection',
    image: '/src/assets/images/hero_sneaker_slide_two_1795592828384.jpg',
    imageAlt:
      'Editorial fashion model seated on travertine block wearing charcoal trousers and bone-sienna high-top sneakers',
    bgGradient: 'from-[#473728] via-[#68523D] to-[#BDAE9A]',
  },
];

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'showcase-puma',
    title: 'Heritage Runners',
    subtitle: 'Puma Archive & Gum Soles',
    brandFilter: 'Puma',
    image: '/src/assets/images/card_runner_topdown_1795592828831.jpg',
    imageAlt: 'Overhead shot of cream suede gum-sole retro runner with burgundy socks',
    logoType: 'puma',
  },
  {
    id: 'showcase-nike',
    title: 'Court Icons',
    subtitle: 'Nike Leather Low-Tops',
    brandFilter: 'Nike',
    image: '/src/assets/images/card_court_bronze_1795592829873.jpg',
    imageAlt: 'Sculpted cream and espresso leather court sneaker on warm bronze backdrop',
    logoType: 'nike',
  },
  {
    id: 'showcase-stylestack',
    title: 'STYLE STACK',
    subtitle: 'Seasonal Apparel & Footwear Edit',
    categoryFilter: 'Collection',
    image: '/src/assets/images/card_style_stack_1795592830071.jpg',
    imageAlt: 'Outdoor golden-hour lookbook portrait featuring beige plaid overshirt and olive cargo trousers',
    logoType: 'style-stack',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'cv-houndstooth-low',
    name: 'Houndstooth Court Low',
    brand: 'Converse',
    category: 'Men',
    colorway: 'Chalk / Crimson / Houndstooth',
    price: 128,
    image: '/src/assets/images/product_retro_crimson_1795592830714.jpg',
    description:
      'Low-profile court sneaker pairing tumbled cream leather with brushed crimson suede overlays and woven houndstooth quarter panels.',
    materials: 'Full-grain leather, suede mudguard, natural gum outsole',
    sizes: ['US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11', 'US 12'],
    featuredTag: 'Campaign Hero',
  },
  {
    id: 'cv-chuck-70-bone',
    name: 'Chuck 70 Heritage High',
    brand: 'Converse',
    category: 'Collection',
    colorway: 'Vintage Bone / Obsidian',
    price: 95,
    image: '/src/assets/images/product_chuck_bone_1795592831182.jpg',
    description:
      'Heavyweight 12oz organic canvas high-top with elevated winged-tongue stitching, vintage foxing tape, and OrthoLite cushioning.',
    materials: '12oz organic cotton canvas, vulcanized rubber sole',
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    featuredTag: 'Iconic',
  },
  {
    id: 'pm-palermo-gum',
    name: 'Palermo Archive Runner',
    brand: 'Puma',
    category: 'Women',
    colorway: 'Warm Cream / Charcoal / Gum',
    price: 105,
    image: '/src/assets/images/card_runner_topdown_1795592828831.jpg',
    description:
      'Low-cut terrace trainer anchored by supple cream suede T-toe construction, contrast leather stripes, and classic honey-gum grip.',
    materials: 'Pigskin suede, soft leather lining, natural gum sole',
    sizes: ['US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9'],
  },
  {
    id: 'nk-court-espresso',
    name: 'Killshot Leather Court',
    brand: 'Nike',
    category: 'Men',
    colorway: 'Ivory / Roasted Espresso',
    price: 115,
    image: '/src/assets/images/card_court_bronze_1795592829873.jpg',
    description:
      'Minimalist low-profile leather sneaker with exposed foam collar detailing, warm espresso suede heel tab, and cupsole stability.',
    materials: 'Smooth calf leather, brushed suede, cupsole rubber',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    featuredTag: 'New Arrival',
  },
  {
    id: 'cv-sage-suede-low',
    name: 'Sage Suede Studio Low',
    brand: 'Converse',
    category: 'Women',
    colorway: 'Olive Sage / Chalk / Gum',
    price: 132,
    image: '/src/assets/images/product_suede_olive_1795592831313.jpg',
    description:
      'Clean architectural silhouette crafted in Italian olive-sage suede with tonal leather eyestays and a translucent honey-gum cupsole.',
    materials: 'Italian suede upper, leather footbed, stitched gum sole',
    sizes: ['US 5.5', 'US 6', 'US 7', 'US 8', 'US 8.5', 'US 9', 'US 10'],
  },
  {
    id: 'cv-sienna-high',
    name: 'Apex Sienna High-Top',
    brand: 'Nike',
    category: 'Kids',
    colorway: 'Bone White / Burnt Sienna',
    price: 88,
    image: '/src/assets/images/hero_sneaker_slide_two_1795592828384.jpg',
    description:
      'Padded collar high-top engineered for all-day movement with breathable perforated vamp and durable burnt-sienna suede overlays.',
    materials: 'Perforated leather, suede panelling, padded textile collar',
    sizes: ['US 3Y', 'US 4Y', 'US 5Y', 'US 6Y', 'US 7Y'],
  },
  {
    id: 'cv-plaid-utility-pack',
    name: 'Style Stack Overshirt Kit',
    brand: 'Converse',
    category: 'Accessories',
    colorway: 'Sand Plaid / Olive',
    price: 78,
    image: '/src/assets/images/card_style_stack_1795592830071.jpg',
    description:
      'Curated seasonal lookbook bundle pairing a heavyweight brushed plaid overshirt layer with braided waxed laces and shoe care kit.',
    materials: 'Brushed cotton flannel, cedar brush, waxed cotton laces',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'pm-terrace-junior',
    name: 'Terrace Suede Junior',
    brand: 'Puma',
    category: 'Kids',
    colorway: 'Oatmeal / Crimson Suede',
    price: 74,
    image: '/src/assets/images/product_retro_crimson_1795592830714.jpg',
    description:
      'Scaled-down terrace classic with wide elastic-assisted lace entry, cushioned EVA midsole, and non-marking rubber outsole.',
    materials: 'Soft suede, cushioned EVA midsole, rubber outsole',
    sizes: ['US 3Y', 'US 4Y', 'US 5Y', 'US 6Y'],
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    product: PRODUCTS[0],
    size: 'US 9.5',
    quantity: 2,
  },
  {
    product: PRODUCTS[1],
    size: 'US 9',
    quantity: 1,
  },
  {
    product: PRODUCTS[3],
    size: 'US 10',
    quantity: 1,
  },
  {
    product: PRODUCTS[4],
    size: 'US 8',
    quantity: 1,
  },
];
