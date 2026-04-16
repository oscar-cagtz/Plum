import React, { useState } from 'react';
import { 
  Menu, X, ChevronRight, Palette, 
  Type, Image as ImageIcon, Send, 
  ShoppingBag, Sparkles, Scissors,
  CheckCircle2
} from 'lucide-react';

// --- DATA & CONFIGURATION ---
const CATEGORIES = [
  {
    id: 'weddings',
    name: 'Weddings',
    description: 'Elegant menus, table numbers, and money holders for your special day.',
    products: ['Menus', 'Table Numbers', 'Money Holders', 'Invitations']
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    description: 'Custom lunchboxes, chip bags, and cake toppers to celebrate life.',
    products: ['Lunchboxes', 'Chip Bags', 'Cake Toppers', 'Party Tags']
  },
  {
    id: 'school',
    name: 'School',
    description: 'Durable name tags, sticker sheets, and coloring books for the academic year.',
    products: ['Name Tags', 'School Stickers', 'Coloring Books']
  },
  {
    id: 'tags',
    name: 'Tags',
    description: 'Versatile gift tags and product labels with a premium finish.',
    products: ['Gift Tags', 'Product Labels', 'Thank You Tags']
  }
];

const BUILDER_PRODUCTS = [
  { id: 'money-holder', name: 'Money Holder', basePrice: '$4.50' },
  { id: 'wedding-menu', name: 'Wedding Menu', basePrice: '$3.00' },
  { id: 'lunchbox', name: 'Custom Lunchbox', basePrice: '$6.00' },
  { id: 'name-tag', name: 'Name Tag Sheet', basePrice: '$12.00' }
];

const PAPER_TYPES = ['Cotton (300gsm)', 'Vellum (Translucent)', 'Linen Textured', 'Premium Cardstock'];
const PAPER_COLORS = [
  { name: 'Pearl White', hex: '#FAFAFA' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Deep Plum', hex: '#4A154B', textIsLight: true },
  { name: 'Charcoal', hex: '#333333', textIsLight: true },
  { name: 'Sage Green', hex: '#8A9A86' }
];
const STYLES = ['Minimalist', 'Classic Serif', 'Modern Bold', 'Botanical'];

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'builder'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Builder State
  const [buildState, setBuildState] = useState({
    product: BUILDER_PRODUCTS[0].id,
    paperType: PAPER_TYPES[0],
    color: PAPER_COLORS[0],
    style: STYLES[0],
    customText: 'The Smith Wedding\nOctober 12th, 2026',
    logoUploaded: false
  });

  const handleNav = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleWhatsAppQuote = () => {
    const productDef = BUILDER_PRODUCTS.find(p => p.id === buildState.product);
    const message = `Hello Plum! 🕊️\n\nI would like a quote for a custom stationery order. Here are my details:\n\n*Product:* ${productDef.name}\n*Paper Type:* ${buildState.paperType}\n*Color:* ${buildState.color.name}\n*Style:* ${buildState.style}\n*Custom Text:*\n"${buildState.customText}"\n*Logo/Art:* ${buildState.logoUploaded ? 'I will attach it in this chat.' : 'None needed.'}\n\nPlease let me know the estimated delivery and next steps!`;
    
    const whatsappUrl = `https://wa.me/5211234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer group"
              onClick={() => handleNav('landing')}
            >
              <span className="font-serif text-3xl tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors">
                Plum.
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNav('landing')}
                className={`text-sm tracking-wide uppercase ${currentView === 'landing' ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-900 transition-colors'}`}
              >
                Collections
              </button>
              <button 
                onClick={() => handleNav('builder')}
                className={`text-sm tracking-wide uppercase ${currentView === 'builder' ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-900 transition-colors'}`}
              >
                The Studio
              </button>
              <button 
                onClick={() => handleNav('builder')}
                className="bg-stone-900 text-stone-50 px-5 py-2 text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors rounded-sm"
              >
                Start Building
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-900 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-stone-50 border-b border-stone-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => handleNav('landing')}
                className="block w-full text-left px-3 py-4 text-base font-medium text-stone-900 border-b border-stone-100 uppercase tracking-wide"
              >
                Collections
              </button>
              <button 
                onClick={() => handleNav('builder')}
                className="block w-full text-left px-3 py-4 text-base font-medium text-stone-900 border-b border-stone-100 uppercase tracking-wide"
              >
                The Studio (Builder)
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main>
        {currentView === 'landing' ? (
          <LandingView onStartBuilding={() => handleNav('builder')} />
        ) : (
          <BuilderView 
            buildState={buildState} 
            setBuildState={setBuildState} 
            onQuote={handleWhatsAppQuote} 
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-serif text-2xl text-stone-50 block mb-4">Plum.</span>
            <p className="text-sm">Fine paper and tactile design for the moments that matter.</p>
            <p className="text-xs mt-6 text-stone-500">A Fold Group Brand.</p>
          </div>
          <div>
            <h4 className="text-stone-50 uppercase tracking-wider text-sm mb-4">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li>Weddings</li>
              <li>Birthdays</li>
              <li>School & Tags</li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-50 uppercase tracking-wider text-sm mb-4">Studio</h4>
            <ul className="space-y-2 text-sm">
              <li>Custom Builder</li>
              <li>Material Guide</li>
              <li>Contact via WhatsApp</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- LANDING PAGE COMPONENT ---
function LandingView({ onStartBuilding }) {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center bg-stone-200 overflow-hidden">
        {/* Abstract shapes/texture representation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #4A154B 0%, transparent 40%), radial-gradient(circle at 80% 70%, #8A9A86 0%, transparent 40%)' }}>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tight mb-6">
            Elegance in every fiber.
          </h1>
          <p className="text-lg md:text-xl text-stone-700 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            From heavy cotton wedding menus to durable school tags. Fine paper tailored to your exact specifications.
          </p>
          <button 
            onClick={onStartBuilding}
            className="inline-flex items-center space-x-2 bg-stone-900 text-stone-50 px-8 py-4 uppercase tracking-widest text-sm hover:bg-stone-800 transition-all rounded-sm hover:shadow-lg"
          >
            <span>Enter The Studio</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-stone-900 mb-4">Our Collections</h2>
          <div className="w-12 h-px bg-stone-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-stone-100 mb-6 p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-stone-200 rounded-sm">
                {/* Minimalist icon representation */}
                {cat.id === 'weddings' && <Sparkles className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                {cat.id === 'birthdays' && <ShoppingBag className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                {cat.id === 'school' && <Scissors className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                {cat.id === 'tags' && <CheckCircle2 className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                
                <h3 className="text-xl font-serif text-stone-900 z-10">{cat.name}</h3>
              </div>
              <p className="text-sm text-stone-500 mb-4 h-10">{cat.description}</p>
              <ul className="space-y-1">
                {cat.products.map(prod => (
                  <li key={prod} className="text-sm text-stone-700 flex items-center before:content-[''] before:w-1 before:h-1 before:bg-stone-300 before:mr-2 before:rounded-full">
                    {prod}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- BUILDER (STUDIO) COMPONENT ---
function BuilderView({ buildState, setBuildState, onQuote }) {
  const updateState = (key, value) => {
    setBuildState(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e) => {
    // In a real app, you'd process the file. Here we just toggle the state.
    if(e.target.files && e.target.files[0]) {
      updateState('logoUploaded', true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-8 duration-700">
      
      <div className="mb-10 border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif text-stone-900 tracking-tight">The Studio</h1>
          <p className="text-stone-500 mt-2">Design your perfect stationery in real-time.</p>
        </div>
        <button 
          onClick={onQuote}
          className="flex items-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-sm hover:bg-[#128C7E] transition-colors shadow-sm font-medium tracking-wide"
        >
          <Send size={18} />
          <span>Request Quote via WhatsApp</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="w-full lg:w-1/3 space-y-10">
          
          {/* Product Selection */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">1. Select Product</h3>
            <div className="grid grid-cols-2 gap-3">
              {BUILDER_PRODUCTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => updateState('product', p.id)}
                  className={`p-4 text-left border rounded-sm transition-all ${buildState.product === p.id ? 'border-stone-900 bg-stone-900 text-stone-50' : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-white'}`}
                >
                  <div className="font-serif">{p.name}</div>
                  <div className={`text-xs mt-1 ${buildState.product === p.id ? 'text-stone-300' : 'text-stone-400'}`}>From {p.basePrice}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Material & Color */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold flex items-center"><Palette size={14} className="mr-2"/> 2. Material & Color</h3>
            <div className="space-y-6">
              {/* Paper Select */}
              <div>
                <label className="block text-sm text-stone-600 mb-2">Paper Quality</label>
                <select 
                  value={buildState.paperType}
                  onChange={(e) => updateState('paperType', e.target.value)}
                  className="w-full p-3 border border-stone-200 bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 font-sans text-stone-700"
                >
                  {PAPER_TYPES.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                </select>
              </div>

              {/* Color Swatches */}
              <div>
                <label className="block text-sm text-stone-600 mb-3">Base Color</label>
                <div className="flex flex-wrap gap-3">
                  {PAPER_COLORS.map(color => (
                    <button
                      key={color.name}
                      onClick={() => updateState('color', color)}
                      className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${buildState.color.name === color.name ? 'border-stone-900 scale-110 shadow-md' : 'border-stone-200 shadow-sm'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
                <div className="text-xs text-stone-500 mt-2">Selected: {buildState.color.name}</div>
              </div>
            </div>
          </section>

          {/* Typography & Content */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold flex items-center"><Type size={14} className="mr-2"/> 3. Typography & Content</h3>
            <div className="space-y-6">
              
              {/* Style Select */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {STYLES.map(style => (
                  <button
                    key={style}
                    onClick={() => updateState('style', style)}
                    className={`px-4 py-2 text-sm whitespace-nowrap border rounded-sm transition-colors ${buildState.style === style ? 'border-stone-900 bg-stone-100 text-stone-900 font-medium' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm text-stone-600 mb-2">Custom Inscription</label>
                <textarea 
                  rows={4}
                  value={buildState.customText}
                  onChange={(e) => updateState('customText', e.target.value)}
                  className="w-full p-3 border border-stone-200 bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 font-sans text-stone-700 resize-none"
                  placeholder="Enter names, dates, or menu details..."
                />
              </div>

              {/* Logo Upload Mock */}
              <div>
                <label className="block text-sm text-stone-600 mb-2">Include Logo/Monogram?</label>
                <div className="relative border-2 border-dashed border-stone-200 bg-white rounded-sm p-6 text-center hover:border-stone-400 transition-colors">
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    accept="image/*"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <ImageIcon className={`w-8 h-8 mb-2 ${buildState.logoUploaded ? 'text-stone-900' : 'text-stone-400'}`} />
                    <span className="text-sm font-medium text-stone-700">
                      {buildState.logoUploaded ? 'Artwork Attached' : 'Click to upload artwork'}
                    </span>
                    <span className="text-xs text-stone-500 mt-1">PNG, JPG up to 5MB</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: PREVIEW */}
        <div className="w-full lg:w-2/3">
          <div className="sticky top-28">
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">Live Preview</h3>
            
            {/* Canvas Area */}
            <div className="bg-stone-200 rounded-sm p-8 md:p-16 flex items-center justify-center min-h-[600px] border border-stone-300 shadow-inner overflow-hidden relative">
              
              {/* The Paper Component (Dynamic based on state) */}
              <div 
                className="relative shadow-2xl transition-all duration-700 flex items-center justify-center text-center p-12"
                style={{
                  backgroundColor: buildState.color.hex,
                  color: buildState.color.textIsLight ? '#FAFAFA' : '#1C1917',
                  width: buildState.product === 'money-holder' ? '280px' : 
                         buildState.product === 'wedding-menu' ? '220px' : 
                         buildState.product === 'name-tag' ? '300px' : '260px',
                  height: buildState.product === 'money-holder' ? '400px' : 
                          buildState.product === 'wedding-menu' ? '480px' : 
                          buildState.product === 'name-tag' ? '200px' : '320px',
                  opacity: buildState.paperType.includes('Vellum') ? 0.9 : 1,
                  backgroundImage: buildState.paperType.includes('Linen') ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)' : 'none',
                }}
              >
                {/* Product specific geometry accents */}
                {buildState.product === 'money-holder' && (
                  <div className="absolute bottom-1/4 left-0 w-full h-px bg-current opacity-20"></div>
                )}
                {buildState.product === 'wedding-menu' && (
                  <div className="absolute inset-4 border border-current opacity-20"></div>
                )}

                {/* Content Layout */}
                <div className="z-10 w-full">
                  {buildState.logoUploaded && (
                    <div className="w-12 h-12 border border-current opacity-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <ImageIcon size={16} opacity={0.5} />
                    </div>
                  )}
                  
                  <div style={{
                    fontFamily: buildState.style === 'Classic Serif' ? 'Georgia, serif' : 
                                buildState.style === 'Modern Bold' ? 'Impact, sans-serif' : 
                                buildState.style === 'Botanical' ? '"Palatino Linotype", serif' : 'ui-sans-serif, system-ui, sans-serif',
                    fontWeight: buildState.style === 'Modern Bold' ? 700 : 
                                buildState.style === 'Minimalist' ? 300 : 400,
                    letterSpacing: buildState.style === 'Minimalist' ? '0.1em' : 'normal',
                    whiteSpace: 'pre-wrap',
                    fontSize: buildState.product === 'name-tag' ? '1.5rem' : '1.125rem',
                    lineHeight: 1.8
                  }}>
                    {buildState.customText || "Your Text Here"}
                  </div>
                </div>
              </div>

              {/* Decorative elements to show it's a studio space */}
              <div className="absolute bottom-4 right-4 text-stone-400 opacity-50">
                 <Scissors size={24} />
              </div>
            </div>
            
            <p className="text-center text-xs text-stone-500 mt-4">
              *Preview is a digital approximation. Textures and exact hues vary on physical material.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}