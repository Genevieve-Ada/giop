import React, {useState, useEffect, useRef} from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Menu,
  X,
  Plus,
} from 'lucide-react';
import {
  HERO_SLIDES,
  SHOWCASE_CARDS,
  PRODUCTS,
  INITIAL_CART_ITEMS,
  NavCategory,
  BrandName,
  Product,
  CartItem,
} from './data/catalog';
import {ConverseEmblem, PumaCatMark, NikeSwooshMark} from './components/BrandLogos';
import {ImageWithFallback} from './components/ImageWithFallback';
import {CartDrawer} from './components/CartDrawer';
import {ProductModal} from './components/ProductModal';
import {SearchOverlay} from './components/SearchOverlay';
import {WishlistDrawer} from './components/WishlistDrawer';
import {AccountModal} from './components/AccountModal';

const NAV_LINKS: Exclude<NavCategory, 'All'>[] = [
  'Women',
  'Men',
  'Kids',
  'Accessories',
  'Collection',
  'Brands',
];

export default function App() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState<NavCategory>('All');
  const [selectedBrand, setSelectedBrand] = useState<BrandName | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['cv-houndstooth-low']);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const collectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const duration = 6000;
    const step = 100;
    const timer = window.setInterval(() => {
      setSlideProgress((prev) => {
        const next = prev + (step / duration) * 100;
        if (next >= 100) {
          setActiveSlideIndex((idx) => (idx + 1) % HERO_SLIDES.length);
          return 0;
        }
        return next;
      });
    }, step);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setSlideProgress(0);
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setSlideProgress(0);
  };

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  const handleNavClick = (category: NavCategory) => {
    if (category === 'Brands') {
      setSelectedCategory('All');
      setSelectedBrand('All');
    } else {
      setSelectedCategory(category);
      setSelectedBrand('All');
    }
    setIsMobileMenuOpen(false);
    scrollToCollection();
  };

  const handleShowcaseClick = (brand?: BrandName, category?: NavCategory) => {
    if (brand) {
      setSelectedBrand(brand);
      setSelectedCategory('All');
    } else if (category) {
      setSelectedCategory(category);
      setSelectedBrand('All');
    }
    scrollToCollection();
  };

  const handleAddToCart = (product: Product, size?: string) => {
    const chosenSize = size || product.sizes[Math.min(2, product.sizes.length - 1)];
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === chosenSize,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === chosenSize
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...prev, {product, size: chosenSize, quantity: 1}];
    });
    setAddedToast(`${product.name} (${chosenSize}) added to bag`);
    window.setTimeout(() => setAddedToast(null), 2400);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? {...item, quantity: item.quantity + delta}
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size)),
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      selectedCategory === 'Brands' ||
      product.category === selectedCategory;
    const matchesBrand =
      selectedBrand === 'All' || product.brand === selectedBrand;
    return matchesCategory && matchesBrand;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const ringRadius = 17;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset =
    ringCircumference - (slideProgress / 100) * ringCircumference;

  return (
    <div className="min-h-screen bg-white text-[#1C1917]">
      {/* Hero Section with Integrated Top Navigation */}
      <section className="relative w-full overflow-hidden bg-[#6A5542]">
        <div className="relative mx-auto h-[600px] w-full max-w-[1600px] sm:h-[640px] lg:h-[680px]">
          {/* Active Slide Photography */}
          <ImageWithFallback
            src={currentSlide.image}
            alt={currentSlide.imageAlt}
            className="h-full w-full object-cover object-[72%_center] transition-opacity duration-500 sm:object-right"
          />

          {/* Measured Left Contrast Scrim for Crisp Headline Readability */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${currentSlide.bgGradient} opacity-35`}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#4E3D2D]/85 via-[#5F4B38]/40 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 to-transparent"
          />

          {/* Top Navigation Bar (3-Zone Contract) */}
          <header className="relative z-20 mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-6 py-6 lg:px-12">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory('All');
                setSelectedBrand('All');
              }}
              className="flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md"
            >
              <ConverseEmblem className="h-7 w-7 text-white/95" />
              <span className="font-display text-2xl font-bold tracking-tight">
                Converse
              </span>
            </a>

            {/* Zone 2: Concise Single-Line Nav Links */}
            <nav
              aria-label="Primary categories"
              className="hidden items-center gap-7 md:flex"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  selectedCategory === link ||
                  (link === 'Brands' && selectedBrand !== 'All');
                return (
                  <button
                    key={link}
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className={`relative py-1 text-[13px] font-medium tracking-wide text-white/90 transition-colors hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded ${
                      isActive ? 'text-white' : ''
                    }`}
                  >
                    {link}
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#F5EFE6]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search sneakers"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => setIsAccountOpen(true)}
                aria-label="Member account"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
              >
                <User className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                aria-label={`Saved wishlist (${wishlistIds.length})`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {wishlistIds.length > 0 && (
                  <span className="sr-only">{wishlistIds.length} saved</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping bag with ${totalBagCount} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {totalBagCount > 0 && (
                  <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F5EFE6] px-1 text-[10px] font-bold text-[#1C1917] tabular-nums">
                    {totalBagCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </header>

          {/* Mobile Drawer Menu */}
          {isMobileMenuOpen && (
            <div className="relative z-30 mx-6 rounded-2xl bg-[#29211A]/95 p-5 backdrop-blur-md md:hidden">
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white hover:bg-white/10"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hero Editorial Headline & CTA */}
          <div className="relative z-10 mx-auto flex h-[calc(100%-96px)] max-w-[1360px] flex-col justify-center px-6 pb-12 lg:px-12">
            <div className="max-w-xl">
              <h1 className="font-display text-[clamp(2.75rem,5.1vw,4.5rem)] font-black leading-[0.98] tracking-[-0.025em] text-[#F5EFE6]">
                {currentSlide.headlineLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleNavClick(currentSlide.targetCategory)}
                  className="inline-flex items-center justify-center rounded-xl bg-[#F4EFE7] px-8 py-3.5 text-sm font-semibold text-[#1C1917] shadow-sm transition-all duration-150 hover:bg-white active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5D4937]"
                >
                  {currentSlide.ctaLabel}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom-Right Carousel Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5 lg:bottom-8 lg:right-12">
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'Pause campaign slider' : 'Play campaign slider'}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                className="absolute inset-0 h-10 w-10 -rotate-90"
                viewBox="0 0 40 40"
                aria-hidden="true"
              >
                <circle
                  cx="20"
                  cy="20"
                  r={ringRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="2"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={ringRadius}
                  fill="none"
                  stroke="#F5EFE6"
                  strokeWidth="2"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                />
              </svg>
              {isAutoPlaying ? (
                <Pause className="relative h-3.5 w-3.5" fill="currentColor" />
              ) : (
                <Play className="relative h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1917] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1C1917] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: 3-Column Brand & Editorial Showcase Cards (Exact Visual Match) */}
      <section
        aria-label="Featured Brand Collections"
        className="mx-auto max-w-[1360px] px-6 pt-12 pb-8 lg:px-12 lg:pt-14"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SHOWCASE_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleShowcaseClick(card.brandFilter, card.categoryFilter)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#EAE5DC] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] focus-visible:ring-offset-2"
            >
              <ImageWithFallback
                src={card.image}
                alt={card.imageAlt}
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />

              {/* Top Brand Mark Overlay (Puma / Nike cards) */}
              {card.logoType === 'puma' && (
                <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center text-[#1C1917]">
                  <PumaCatMark className="h-7 w-12" />
                </div>
              )}

              {card.logoType === 'nike' && (
                <div className="pointer-events-none absolute inset-x-0 top-7 flex justify-center text-[#1C1917]">
                  <NikeSwooshMark className="h-5 w-12" />
                </div>
              )}

              {/* Style Stack Editorial Overlay */}
              {card.logoType === 'style-stack' ? (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center px-4 text-center">
                    <span className="font-display text-3xl font-black tracking-tight text-white lg:text-[2.2rem]">
                      STYLE STACK
                    </span>
                  </div>
                </>
              ) : (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 via-black/15 to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div>
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="text-xs text-white/80">{card.subtitle}</p>
                  </div>
                  <span className="text-xs font-semibold text-white underline">
                    Shop
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Section 3: Curated Sneaker Catalog Grid */}
      <section
        ref={collectionRef}
        id="collection"
        className="mx-auto max-w-[1360px] px-6 py-12 lg:px-12 lg:py-16"
      >
        <div className="flex flex-col gap-6 border-b border-stone-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-stone-500">
              Curated Footwear · {filteredProducts.length} Silhouettes
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-[#1C1917]">
              Seasonal Rotation
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Category Filter */}
            <div
              role="tablist"
              aria-label="Filter by category"
              className="flex flex-wrap items-center gap-1 rounded-xl bg-[#F6F4F0] p-1"
            >
              {(['All', 'Women', 'Men', 'Kids', 'Accessories', 'Collection'] as NavCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-stone-600 hover:text-[#1C1917]'
                    }`}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            {/* Brand Selector */}
            <select
              aria-label="Filter by brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value as BrandName | 'All')}
              className="h-9 rounded-xl border border-stone-200 bg-white px-3 text-xs font-medium text-[#1C1917] focus:border-[#1C1917] focus:outline-none"
            >
              <option value="All">All Brands</option>
              <option value="Converse">Converse</option>
              <option value="Nike">Nike</option>
              <option value="Puma">Puma</option>
            </select>

            {/* Sort Selector */}
            <select
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')
              }
              className="h-9 rounded-xl border border-stone-200 bg-white px-3 text-xs font-medium text-[#1C1917] focus:border-[#1C1917] focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="my-12 rounded-2xl bg-[#FAF8F5] py-14 text-center">
            <p className="text-base font-medium text-[#1C1917]">
              No sneakers match this filter combination.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
              }}
              className="mt-4 rounded-xl bg-[#1C1917] px-5 py-2.5 text-xs font-semibold text-white hover:bg-stone-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              const isSaved = wishlistIds.includes(product.id);
              return (
                <article key={product.id} className="group flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F6F4F0]">
                    <button
                      type="button"
                      onClick={() => setActiveProduct(product)}
                      className="h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917]"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${product.name} from wishlist`
                          : `Save ${product.name} to wishlist`
                      }
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1C1917] shadow-xs backdrop-blur-xs transition-transform duration-150 hover:scale-105"
                    >
                      <Heart
                        className="h-4 w-4"
                        fill={isSaved ? 'currentColor' : 'none'}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Quick add ${product.name} to bag`}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-xl bg-[#1C1917]/90 px-3 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-xs transition-all duration-150 hover:bg-[#1C1917] group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Quick Add</span>
                    </button>
                  </div>

                  <div className="mt-3.5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-stone-500">
                        {product.brand} · {product.category}
                        {product.featuredTag ? ` · ${product.featuredTag}` : ''}
                      </p>
                      <h3 className="mt-0.5 truncate text-base font-semibold text-[#1C1917]">
                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
                          className="text-left hover:underline"
                        >
                          {product.name}
                        </button>
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-stone-500">
                        {product.colorway}
                      </p>
                    </div>
                    <p className="shrink-0 text-[15px] font-semibold text-[#1C1917] tabular-nums">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 4: Editorial Craftsmanship Split */}
      <section className="mx-auto max-w-[1360px] px-6 py-8 lg:px-12 lg:py-12">
        <div className="grid overflow-hidden rounded-2xl bg-[#F6F4F0] lg:grid-cols-2 lg:items-stretch">
          <div className="aspect-[4/3] w-full lg:aspect-auto lg:h-full">
            <ImageWithFallback
              src="/src/assets/images/product_chuck_bone_1795592831182.jpg"
              alt="Vintage bone canvas sneaker resting on natural travertine stone"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-medium tracking-wide text-[#6B5742]">
              Craftsmanship · Archival Construction
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-[#1C1917] sm:text-4xl">
              Built in Heavy Canvas, Full-Grain Leather & Gum Rubber
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-600">
              Every silhouette in our seasonal lineup balances archival court proportions
              with cushioned OrthoLite footbeds and durable vulcanized outsoles crafted
              for everyday wear.
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => handleNavClick('Collection')}
                className="rounded-xl bg-[#1C1917] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 whitespace-nowrap"
              >
                Explore Heritage Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Footer */}
      <footer className="mt-12 border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-8 px-6 py-10 sm:flex-row sm:items-center lg:px-12">
          <div className="flex items-center gap-2.5 text-[#1C1917]">
            <ConverseEmblem className="h-6 w-6" />
            <span className="font-display text-lg font-bold tracking-tight">
              Converse
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className="transition-colors hover:text-[#1C1917]"
              >
                {link}
              </button>
            ))}
          </div>

          <p className="text-xs text-stone-400">
            Complimentary shipping over $150 · 30-day returns
          </p>
        </div>
      </footer>

      {/* Subtle Toast Notification for Quick Add */}
      {addedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-xl bg-[#1C1917] px-5 py-3 text-xs font-medium text-white shadow-lg"
        >
          {addedToast}
        </div>
      )}

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={activeProduct ? wishlistIds.includes(activeProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setActiveProduct(p)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistProducts}
        onRemove={toggleWishlist}
        onSelectProduct={(p) => setActiveProduct(p)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}
