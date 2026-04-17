import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Palette, 
  Type, Image as ImageIcon, Send, 
  ShoppingBag, Sparkles, Scissors,
  CheckCircle2, Globe, Download, MapPin, Truck
} from 'lucide-react';

// --- DATA & CONFIGURATION (WITH TRANSLATIONS) ---
const CATEGORIES = [
  {
    id: 'weddings',
    heroImage: './images/weddings/plum-wedding-hero.webp',
    en: {
      name: 'Weddings',
      description: 'Elegant menus, table numbers, and money holders for your special day.',
      products: ['Menus', 'Table Numbers', 'Money Holders', 'Invitations']
    },
    es: {
      name: 'Bodas',
      description: 'Menús elegantes, números de mesa y sobres para dinero para su día especial.',
      products: ['Menús', 'Números de Mesa', 'Sobres para Dinero', 'Invitaciones']
    }
  },
  {
    id: 'birthdays',
    heroImage: './images/birthdays/plum-birthdays-hero.webp',
    en: {
      name: 'Birthdays',
      description: 'Custom lunchboxes, chip bags, and cake toppers to celebrate life.',
      products: ['Lunchboxes', 'Chip Bags', 'Cake Toppers', 'Party Tags']
    },
    es: {
      name: 'Cumpleaños',
      description: 'Cajitas personalizadas, bolsas de papas y cake toppers para celebrar la vida.',
      products: ['Cajitas', 'Bolsas de Papas', 'Cake Toppers', 'Etiquetas de Fiesta']
    }
  },
  {
    id: 'school',
    heroImage: './images/school/plum-school-hero.webp',
    en: {
      name: 'School',
      description: 'Durable name tags, sticker sheets, and coloring books for the academic year.',
      products: ['Name Tags', 'School Stickers', 'Coloring Books']
    },
    es: {
      name: 'Escolar',
      description: 'Etiquetas con nombre duraderas, planillas de stickers y libros para colorear para el año escolar.',
      products: ['Etiquetas de Nombre', 'Stickers Escolares', 'Libros para Colorear']
    }
  },
  {
    id: 'stationery',
    heroImage: './images/stationery/plum-stationery-hero.webp',
    en: {
      name: 'Stationery',
      description: 'Versatile gift tags, product labels, and custom stationery with a premium finish.',
      products: ['Gift Tags', 'Product Labels', 'Thank You Cards']
    },
    es: {
      name: 'Papelería',
      description: 'Etiquetas de regalo versátiles, etiquetas de productos y papelería personalizada con un acabado premium.',
      products: ['Etiquetas de Regalo', 'Etiquetas de Producto', 'Tarjetas de Agradecimiento']
    }
  }
];

const BUILDER_PRODUCTS = [
  { id: 'money-holder', en: { name: 'Money Holder' }, es: { name: 'Sobre para Dinero' }, basePrice: '$4.50' },
  { id: 'wedding-menu', en: { name: 'Wedding Menu' }, es: { name: 'Menú de Boda' }, basePrice: '$3.00' },
  { id: 'lunchbox', en: { name: 'Custom Lunchbox' }, es: { name: 'Cajita Personalizada' }, basePrice: '$6.00' },
  { id: 'name-tag', en: { name: 'Name Tag Sheet' }, es: { name: 'Planilla de Nombres' }, basePrice: '$12.00' }
];

const PAPER_TYPES = {
  en: ['Cotton (300gsm)', 'Vellum (Translucent)', 'Linen Textured', 'Premium Cardstock'],
  es: ['Algodón (300g)', 'Vellum (Translúcido)', 'Textura Lino', 'Cartulina Premium']
};

const PAPER_COLORS = [
  { id: 'pearl', hex: '#FAFAFA', en: 'Pearl White', es: 'Blanco Perla' },
  { id: 'ivory', hex: '#FFFFF0', en: 'Ivory', es: 'Marfil' },
  { id: 'plum', hex: '#4A154B', en: 'Deep Plum', es: 'Ciruela Oscuro', textIsLight: true },
  { id: 'charcoal', hex: '#333333', en: 'Charcoal', es: 'Carbón', textIsLight: true },
  { id: 'sage', hex: '#8A9A86', en: 'Sage Green', es: 'Verde Salvia' }
];

const STYLES = {
  en: ['Minimalist', 'Classic Serif', 'Modern Bold', 'Botanical'],
  es: ['Minimalista', 'Serif Clásico', 'Moderno Negrita', 'Botánico']
};

const T = {
  en: {
    navCollections: 'Collections',
    navStudio: 'The Studio',
    heroTitle: 'Elegance in every fiber.',
    heroDesc: 'From heavy cotton wedding menus to durable school tags. Fine paper tailored to your exact specifications.',
    enterStudio: 'Enter The Studio',
    ourCollections: 'Our Collections',
    
    // Landing Page Sections
    craftTitle: 'The Craft',
    craftDesc: 'Engineering meets elegance. Every piece is produced with meticulous attention to detail in our studio.',
    craft1Title: 'Architecture',
    craft1Desc: 'Precision engineered layouts designed to balance white space, typography, and visual weight.',
    craft2Title: 'Press',
    craft2Desc: 'High-fidelity printing on tactile, heavy-weight stocks that feel substantial in the hand.',
    craft3Title: 'Finish',
    craft3Desc: 'Hand-inspected, precisely cut, and packed with uncompromising care.',
    materialsTitle: 'The Paper Library',
    materialsDesc: 'We source only the finest materials, ensuring your stationery makes a lasting physical impression.',
    
    // Contact Section
    contactTitle: 'Get in Touch',
    contactDesc: 'Have a specific vision? Let\'s bring it to life.',
    contactNameLabel: 'Your Name',
    contactTypeLabel: 'Project Type',
    contactTypeOptions: ['Wedding Stationery', 'Birthday & Party', 'School Supplies', 'Custom Corporate', 'Other'],
    contactMessageLabel: 'Tell us about your project...',
    contactSendBtn: 'Send via WhatsApp',
    contactGreeting: 'Hello Plum! 🕊️\n\nI have a new project inquiry:',
    contactMessageField: 'Message',
    
    // Delivery Section
    deliveryTitle: 'Shipping & Logistics',
    localDeliveryTitle: 'Local Delivery (Monterrey)',
    localDeliveryDesc: 'Direct delivery available for the following zones:',
    localZones: 'San Pedro Garza García, Carretera Nacional, Cumbres, San Jerónimo, Sur de Monterrey.',
    nationalDeliveryTitle: 'National Shipping (Mexico)',
    nationalDeliveryDesc: 'We ship safely and quickly to anywhere in the Republic via FedEx or DHL.',
    nationalPricing: 'Standard flat rate: $150 MXN (3-5 business days). Free shipping on orders over $1,500 MXN.',

    // Studio
    studioTitle: 'The Studio',
    studioDesc: 'Design your perfect stationery in real-time.',
    requestQuote: 'Request Quote via WhatsApp',
    downloadPreview: 'Download Design',
    downloading: 'Saving...',
    step1: '1. Select Product',
    from: 'From',
    step2: '2. Material & Color',
    paperQuality: 'Paper Quality',
    baseColor: 'Base Color',
    selected: 'Selected:',
    step3: '3. Typography & Content',
    customInscription: 'Custom Inscription',
    placeholderText: 'Enter names, dates, or menu details...',
    defaultPreviewText: 'Your Text Here',
    includeLogo: 'Include Logo/Monogram?',
    artworkAttached: 'Artwork Attached',
    clickToUpload: 'Click to upload artwork',
    fileSize: 'PNG, JPG up to 5MB',
    livePreview: 'Live Preview',
    previewNote: '*Preview is a digital approximation. Textures and exact hues vary on physical material.',
    footerDesc: 'Fine paper and tactile design for the moments that matter.',
    footerBrand: 'A Fold Group Brand.',
    footerStudioLinks: ['Custom Builder', 'Material Guide', 'Contact via WhatsApp'],
    waGreeting: 'Hello Plum! 🕊️\n\nI would like a quote for a custom stationery order. Here are my details:',
    waProduct: 'Product',
    waPaper: 'Paper Type',
    waColor: 'Color',
    waStyle: 'Style',
    waText: 'Custom Text',
    waNone: 'None',
    waLogo: 'Logo/Art',
    waLogoYes: 'I will attach it in this chat.',
    waLogoNo: 'None needed.',
    waOutro: 'Please let me know the estimated delivery and next steps!'
  },
  es: {
    navCollections: 'Colecciones',
    navStudio: 'El Estudio',
    heroTitle: 'Elegancia en cada fibra.',
    heroDesc: 'Desde menús de boda en algodón grueso hasta etiquetas escolares duraderas. Papel fino adaptado a sus especificaciones exactas.',
    enterStudio: 'Entrar al Estudio',
    ourCollections: 'Nuestras Colecciones',
    
    // Landing Page Sections
    craftTitle: 'El Arte',
    craftDesc: 'La ingeniería se encuentra con la elegancia. Cada pieza se produce con meticulosa atención al detalle en nuestro estudio.',
    craft1Title: 'Arquitectura',
    craft1Desc: 'Diseños creados con precisión para equilibrar el espacio en blanco, la tipografía y el peso visual.',
    craft2Title: 'Impresión',
    craft2Desc: 'Impresión de alta fidelidad en papeles táctiles y de alto gramaje que se sienten sustanciales.',
    craft3Title: 'Acabado',
    craft3Desc: 'Inspeccionado a mano, cortado con precisión y empacado con un cuidado inflexible.',
    materialsTitle: 'La Biblioteca de Papel',
    materialsDesc: 'Obtenemos solo los mejores materiales, asegurando que su papelería deje una impresión física duradera.',

    // Contact Section
    contactTitle: 'Contáctanos',
    contactDesc: '¿Tienes una visión específica? Hagámosla realidad.',
    contactNameLabel: 'Tu Nombre',
    contactTypeLabel: 'Tipo de Proyecto',
    contactTypeOptions: ['Papelería para Boda', 'Cumpleaños y Fiestas', 'Material Escolar', 'Corporativo Personalizado', 'Otro'],
    contactMessageLabel: 'Cuéntanos sobre tu proyecto...',
    contactSendBtn: 'Enviar por WhatsApp',
    contactGreeting: '¡Hola Plum! 🕊️\n\nTengo una consulta para un nuevo proyecto:',
    contactMessageField: 'Mensaje',
    
    // Delivery Section
    deliveryTitle: 'Envíos y Logística',
    localDeliveryTitle: 'Entrega Local (Monterrey)',
    localDeliveryDesc: 'Entrega directa disponible para las siguientes zonas:',
    localZones: 'San Pedro Garza García, Carretera Nacional, Cumbres, San Jerónimo, Sur de Monterrey.',
    nationalDeliveryTitle: 'Envío Nacional (México)',
    nationalDeliveryDesc: 'Enviamos de forma segura y rápida a toda la República a través de FedEx o DHL.',
    nationalPricing: 'Tarifa estándar: $150 MXN (3-5 días hábiles). Envío gratis en pedidos superiores a $1,500 MXN.',

    // Studio
    studioTitle: 'El Estudio',
    studioDesc: 'Diseñe su papelería perfecta en tiempo real.',
    requestQuote: 'Solicitar Cotización',
    downloadPreview: 'Descargar Diseño',
    downloading: 'Guardando...',
    step1: '1. Seleccionar Producto',
    from: 'Desde',
    step2: '2. Material y Color',
    paperQuality: 'Calidad del Papel',
    baseColor: 'Color Base',
    selected: 'Seleccionado:',
    step3: '3. Tipografía y Contenido',
    customInscription: 'Inscripción Personalizada',
    placeholderText: 'Ingrese nombres, fechas o detalles del menú...',
    defaultPreviewText: 'Su Texto Aquí',
    includeLogo: '¿Incluir Logotipo/Monograma?',
    artworkAttached: 'Arte Adjunto',
    clickToUpload: 'Clic para subir arte',
    fileSize: 'PNG, JPG hasta 5MB',
    livePreview: 'Vista Previa en Vivo',
    previewNote: '*La vista previa es una aproximación digital. Las texturas y los tonos exactos varían en el material físico.',
    footerDesc: 'Papel fino y diseño táctil para los momentos que importan.',
    footerBrand: 'Una Marca de Fold Group.',
    footerStudioLinks: ['Constructor Personalizado', 'Guía de Materiales', 'Contacto por WhatsApp'],
    waGreeting: '¡Hola Plum! 🕊️\n\nMe gustaría una cotización para un pedido de papelería personalizada. Aquí están mis detalles:',
    waProduct: 'Producto',
    waPaper: 'Tipo de Papel',
    waColor: 'Color',
    waStyle: 'Estilo',
    waText: 'Texto Personalizado',
    waNone: 'Ninguno',
    waLogo: 'Logotipo/Arte',
    waLogoYes: 'Lo adjuntaré en este chat.',
    waLogoNo: 'No es necesario.',
    waOutro: '¡Por favor, háganme saber el tiempo estimado de entrega y los siguientes pasos!'
  }
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'builder', or category id
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');

  const t = T[lang];

  // Builder State (Using indices to allow seamless language switching)
  const [buildState, setBuildState] = useState({
    productIndex: 0,
    paperTypeIndex: 0,
    colorIndex: 0,
    styleIndex: 0,
    customText: '',
    logoUploaded: false
  });

  // Set default localized text when language changes and custom text is empty
  useEffect(() => {
    if (!buildState.customText || buildState.customText === 'The Smith Wedding\nOctober 12th, 2026' || buildState.customText === 'Boda de los Smith\n12 de Octubre, 2026') {
      setBuildState(prev => ({
        ...prev,
        customText: lang === 'en' ? 'The Smith Wedding\nOctober 12th, 2026' : 'Boda de los Smith\n12 de Octubre, 2026'
      }));
    }
  }, [lang]);

  const handleNav = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleWhatsAppQuote = () => {
    const pName = BUILDER_PRODUCTS[buildState.productIndex][lang].name;
    const paperName = PAPER_TYPES[lang][buildState.paperTypeIndex];
    const colorName = PAPER_COLORS[buildState.colorIndex][lang];
    const styleName = STYLES[lang][buildState.styleIndex];
    
    const message = `${t.waGreeting}\n\n*${t.waProduct}:* ${pName}\n*${t.waPaper}:* ${paperName}\n*${t.waColor}:* ${colorName}\n*${t.waStyle}:* ${styleName}\n*${t.waText}:*\n"${buildState.customText || t.waNone}"\n*${t.waLogo}:* ${buildState.logoUploaded ? t.waLogoYes : t.waLogoNo}\n\n${t.waOutro}`;
    
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
              className="flex-shrink-0 flex items-center cursor-pointer group py-4"
              onClick={() => handleNav('landing')}
            >
              <img 
                src="./plum-logo-horizontal-color.svg" 
                alt="Plum" 
                className="h-7 md:h-8 w-auto group-hover:opacity-70 transition-opacity duration-300" 
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => handleNav(cat.id)}
                  className={`text-sm tracking-wide uppercase transition-colors ${currentView === cat.id ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-900'}`}
                >
                  {cat[lang].name}
                </button>
              ))}
              
              <span className="text-stone-300 font-light">|</span>

              <button 
                onClick={() => handleNav('builder')}
                className={`text-sm tracking-wide uppercase transition-colors ${currentView === 'builder' ? 'text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-900'}`}
              >
                {t.navStudio}
              </button>
              
              {/* Language Switcher */}
              <div className="relative flex items-center group pl-2">
                <Globe size={16} className="text-stone-400 group-hover:text-stone-900 transition-colors mr-1.5" />
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-sm tracking-wide uppercase text-stone-500 hover:text-stone-900 transition-colors cursor-pointer focus:outline-none appearance-none font-medium"
                >
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="relative flex items-center">
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-sm tracking-wide uppercase text-stone-900 font-medium cursor-pointer focus:outline-none appearance-none"
                >
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </div>
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
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => handleNav(cat.id)}
                  className={`block w-full text-left px-3 py-3 text-sm font-medium border-b border-stone-100 uppercase tracking-wide ${currentView === cat.id ? 'text-stone-900 bg-stone-100' : 'text-stone-600'}`}
                >
                  {cat[lang].name}
                </button>
              ))}
              <button 
                onClick={() => handleNav('builder')}
                className={`block w-full text-left px-3 py-4 text-base font-medium border-b border-stone-100 uppercase tracking-wide ${currentView === 'builder' ? 'bg-stone-200 text-stone-900' : 'bg-stone-100 text-stone-900'}`}
              >
                {t.navStudio}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main>
        {currentView === 'landing' ? (
          <LandingView onStartBuilding={() => handleNav('builder')} onNavCategory={handleNav} lang={lang} t={t} />
        ) : currentView === 'builder' ? (
          <BuilderView 
            buildState={buildState} 
            setBuildState={setBuildState} 
            onQuote={handleWhatsAppQuote}
            lang={lang}
            t={t}
          />
        ) : (
          <CategoryView 
            categoryId={currentView}
            onStartBuilding={() => handleNav('builder')}
            lang={lang}
            t={t}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-16 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img 
              src="./plum-icon-horizontal-white.svg" 
              alt="Plum" 
              className="h-8 w-auto mb-6 opacity-90" 
            />
            <p className="text-sm">{t.footerDesc}</p>
            <p className="text-xs mt-8 text-stone-500">{t.footerBrand}</p>
          </div>
          <div>
            <h4 className="text-stone-50 uppercase tracking-wider text-sm mb-6">{t.navCollections}</h4>
            <ul className="space-y-3 text-sm">
              <li onClick={() => handleNav('weddings')} className="hover:text-stone-200 cursor-pointer transition-colors">{CATEGORIES[0][lang].name}</li>
              <li onClick={() => handleNav('birthdays')} className="hover:text-stone-200 cursor-pointer transition-colors">{CATEGORIES[1][lang].name}</li>
              <li onClick={() => handleNav('school')} className="hover:text-stone-200 cursor-pointer transition-colors">{CATEGORIES[2][lang].name} & {CATEGORIES[3][lang].name}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-50 uppercase tracking-wider text-sm mb-6">{t.navStudio}</h4>
            <ul className="space-y-3 text-sm">
              <li onClick={() => handleNav('builder')} className="hover:text-stone-200 cursor-pointer transition-colors">{t.footerStudioLinks[0]}</li>
              <li className="hover:text-stone-200 cursor-pointer transition-colors">{t.footerStudioLinks[1]}</li>
              <li onClick={handleWhatsAppQuote} className="hover:text-stone-200 cursor-pointer transition-colors">{t.footerStudioLinks[2]}</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- LANDING PAGE COMPONENT ---
function LandingView({ onStartBuilding, onNavCategory, lang, t }) {
  const [contactForm, setContactForm] = useState({ name: '', projectTypeIndex: 0, message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const selectedType = t.contactTypeOptions[contactForm.projectTypeIndex];
    const message = `${t.contactGreeting}\n\n*${t.contactNameLabel}:* ${contactForm.name}\n*${t.contactTypeLabel}:* ${selectedType}\n*${t.contactMessageField}:*\n"${contactForm.message}"`;
    const whatsappUrl = `https://wa.me/5211234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center bg-stone-200 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #4A154B 0%, transparent 40%), radial-gradient(circle at 80% 70%, #8A9A86 0%, transparent 40%)' }}>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tight mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-stone-700 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.heroDesc}
          </p>
          <button 
            onClick={onStartBuilding}
            className="inline-flex items-center space-x-2 bg-stone-900 text-stone-50 px-8 py-4 uppercase tracking-widest text-sm hover:bg-stone-800 transition-all rounded-sm hover:shadow-lg"
          >
            <span>{t.enterStudio}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-stone-900 mb-4">{t.ourCollections}</h2>
          <div className="w-12 h-px bg-stone-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} onClick={() => onNavCategory(cat.id)} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-stone-100 mb-6 p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-stone-200 rounded-sm">
                {cat.id === 'weddings' && <Sparkles className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                {cat.id === 'birthdays' && <ShoppingBag className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                {cat.id === 'school' && <Scissors className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                {cat.id === 'stationery' && <CheckCircle2 className="w-12 h-12 text-stone-300 group-hover:text-stone-400 transition-colors mb-4" strokeWidth={1} />}
                
                <h3 className="text-xl font-serif text-stone-900 z-10">{cat[lang].name}</h3>
              </div>
              <p className="text-sm text-stone-500 mb-4 h-12">{cat[lang].description}</p>
              <ul className="space-y-1">
                {cat[lang].products.map(prod => (
                  <li key={prod} className="text-sm text-stone-700 flex items-center before:content-[''] before:w-1 before:h-1 before:bg-stone-300 before:mr-2 before:rounded-full">
                    {prod}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* The Craft Section */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">{t.craftTitle}</h2>
            <div className="w-12 h-px bg-stone-300 mx-auto mb-6"></div>
            <p className="text-stone-500 max-w-2xl mx-auto">{t.craftDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900 font-serif text-xl">
                1
              </div>
              <h3 className="font-medium text-stone-900 uppercase tracking-widest text-xs">{t.craft1Title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{t.craft1Desc}</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900 font-serif text-xl">
                2
              </div>
              <h3 className="font-medium text-stone-900 uppercase tracking-widest text-xs">{t.craft2Title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{t.craft2Desc}</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900 font-serif text-xl">
                3
              </div>
              <h3 className="font-medium text-stone-900 uppercase tracking-widest text-xs">{t.craft3Title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{t.craft3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Materials Section */}
      <section className="py-24 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-serif mb-4">{t.materialsTitle}</h2>
           <div className="w-12 h-px bg-stone-700 mx-auto mb-6"></div>
           <p className="text-stone-400 max-w-2xl mx-auto mb-16">{t.materialsDesc}</p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PAPER_TYPES[lang].map((paper, idx) => (
                <div key={idx} className="aspect-square border border-stone-800 bg-stone-900 p-6 flex flex-col justify-end text-left relative overflow-hidden group hover:border-stone-600 transition-colors duration-500">
                   {/* Subtle texture overlay for visual interest */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}></div>
                   <span className="relative z-10 text-sm tracking-wide font-medium">{paper}</span>
                   <span className="relative z-10 text-xs text-stone-500 mt-1 uppercase tracking-widest">Weight / Texture</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact & Delivery Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">{t.contactTitle}</h2>
            <div className="w-12 h-px bg-stone-300 mx-auto mb-6"></div>
            <p className="text-stone-500">{t.contactDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
            
            {/* Left Column: Form */}
            <form onSubmit={handleContactSubmit} className="space-y-8 bg-white p-8 md:p-12 shadow-sm rounded-sm">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">{t.contactNameLabel}</label>
                <input 
                  type="text" 
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" 
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">{t.contactTypeLabel}</label>
                <select 
                  value={contactForm.projectTypeIndex}
                  onChange={(e) => setContactForm({...contactForm, projectTypeIndex: Number(e.target.value)})}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg cursor-pointer"
                >
                  {t.contactTypeOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>{opt}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">{t.contactMessageLabel}</label>
                <textarea 
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center justify-center space-x-2 bg-[#25D366] text-white px-8 py-4 rounded-sm hover:bg-[#128C7E] transition-colors shadow-sm font-medium tracking-wide w-full md:w-auto"
                >
                  <Send size={18} />
                  <span>{t.contactSendBtn}</span>
                </button>
              </div>
            </form>

            {/* Right Column: Delivery Information */}
            <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm flex flex-col justify-center">
              <h3 className="text-xl font-serif text-stone-900 mb-10">{t.deliveryTitle}</h3>

              <div className="space-y-10">
                {/* Local Delivery */}
                <div className="relative pl-12">
                  <MapPin className="absolute left-0 top-1 text-stone-400" size={24} strokeWidth={1.5} />
                  <h4 className="text-sm uppercase tracking-widest text-stone-900 font-medium mb-2">
                    {t.localDeliveryTitle}
                  </h4>
                  <p className="text-stone-500 text-sm leading-relaxed mb-2">
                    {t.localDeliveryDesc}
                  </p>
                  <p className="text-stone-800 text-sm font-medium leading-relaxed">
                    {t.localZones}
                  </p>
                </div>

                <div className="w-full h-px bg-stone-100"></div>

                {/* National Delivery */}
                <div className="relative pl-12">
                  <Truck className="absolute left-0 top-1 text-stone-400" size={24} strokeWidth={1.5} />
                  <h4 className="text-sm uppercase tracking-widest text-stone-900 font-medium mb-2">
                    {t.nationalDeliveryTitle}
                  </h4>
                  <p className="text-stone-500 text-sm leading-relaxed mb-2">
                    {t.nationalDeliveryDesc}
                  </p>
                  <p className="text-stone-800 text-sm font-medium leading-relaxed">
                    {t.nationalPricing}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

// --- DEDICATED CATEGORY COMPONENT ---
function CategoryView({ categoryId, onStartBuilding, lang, t }) {
  const category = CATEGORIES.find(c => c.id === categoryId);
  if (!category) return null;

  // Determine icon based on category ID
  const Icon = categoryId === 'weddings' ? Sparkles : 
               categoryId === 'birthdays' ? ShoppingBag : 
               categoryId === 'school' ? Scissors : CheckCircle2;

  return (
    <div className="animate-in fade-in duration-700 min-h-screen bg-stone-50 pb-24">
      {/* Category Hero */}
      <section 
        className={`relative pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden border-b border-stone-300 ${category.heroImage ? '' : 'bg-stone-200'}`}
        style={category.heroImage ? { backgroundImage: `url('${category.heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
         {category.heroImage && <div className="absolute inset-0 bg-stone-900/60"></div>}
         
         <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <Icon className={`w-16 h-16 mx-auto mb-6 ${category.heroImage ? 'text-stone-200 drop-shadow-md' : 'text-stone-400'}`} strokeWidth={1} />
            <h1 className={`text-4xl md:text-6xl font-serif tracking-tight mb-6 ${category.heroImage ? 'text-white drop-shadow-lg' : 'text-stone-900'}`}>
              {category[lang].name}
            </h1>
            <p className={`text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed ${category.heroImage ? 'text-stone-100 drop-shadow-md' : 'text-stone-700'}`}>
              {category[lang].description}
            </p>
            <button 
              onClick={onStartBuilding}
              className={`inline-flex items-center space-x-2 px-8 py-4 uppercase tracking-widest text-sm transition-all rounded-sm hover:shadow-lg ${category.heroImage ? 'bg-white text-stone-900 hover:bg-stone-100 shadow-md' : 'bg-stone-900 text-stone-50 hover:bg-stone-800'}`}
            >
              <span>{t.enterStudio}</span>
              <ChevronRight size={16} />
            </button>
         </div>
      </section>

      {/* Placeholder Product Grid for this category */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category[lang].products.map((prod, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-stone-100 mb-6 p-8 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-stone-200 rounded-sm border border-stone-200">
                   <span className="font-serif text-2xl text-stone-400 group-hover:text-stone-600 transition-colors text-center px-4">{prod}</span>
                </div>
                <h3 className="text-lg font-serif text-stone-900 uppercase tracking-widest text-center">{prod}</h3>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}

// --- BUILDER (STUDIO) COMPONENT ---
function BuilderView({ buildState, setBuildState, onQuote, lang, t }) {
  const previewRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const updateState = (key, value) => {
    setBuildState(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e) => {
    if(e.target.files && e.target.files[0]) {
      updateState('logoUploaded', true);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
    try {
      const module = await import('https://esm.sh/html2canvas');
      const html2canvas = module.default;
      
      const canvas = await html2canvas(previewRef.current, { 
        scale: 2, // Double resolution for higher quality
        backgroundColor: null // Maintain transparency if applicable
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Plum-Design-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to capture image", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const currentProduct = BUILDER_PRODUCTS[buildState.productIndex];
  const currentColor = PAPER_COLORS[buildState.colorIndex];
  const currentStyle = STYLES[lang][buildState.styleIndex];
  const currentPaper = PAPER_TYPES[lang][buildState.paperTypeIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-8 duration-700">
      
      <div className="mb-10 border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif text-stone-900 tracking-tight">{t.studioTitle}</h1>
          <p className="text-stone-500 mt-2">{t.studioDesc}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center space-x-2 bg-stone-100 text-stone-700 border border-stone-200 px-6 py-3 rounded-sm hover:bg-stone-200 transition-colors shadow-sm font-medium tracking-wide disabled:opacity-50"
          >
            <Download size={18} />
            <span>{isDownloading ? t.downloading : t.downloadPreview}</span>
          </button>
          <button 
            onClick={onQuote}
            className="flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-sm hover:bg-[#128C7E] transition-colors shadow-sm font-medium tracking-wide"
          >
            <Send size={18} />
            <span>{t.requestQuote}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="w-full lg:w-1/3 space-y-10">
          
          {/* Product Selection */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">{t.step1}</h3>
            <div className="grid grid-cols-2 gap-3">
              {BUILDER_PRODUCTS.map((p, index) => (
                <button
                  key={p.id}
                  onClick={() => updateState('productIndex', index)}
                  className={`p-4 text-left border rounded-sm transition-all ${buildState.productIndex === index ? 'border-stone-900 bg-stone-900 text-stone-50' : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-white'}`}
                >
                  <div className="font-serif">{p[lang].name}</div>
                  <div className={`text-xs mt-1 ${buildState.productIndex === index ? 'text-stone-300' : 'text-stone-400'}`}>{t.from} {p.basePrice}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Material & Color */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold flex items-center"><Palette size={14} className="mr-2"/> {t.step2}</h3>
            <div className="space-y-6">
              {/* Paper Select */}
              <div>
                <label className="block text-sm text-stone-600 mb-2">{t.paperQuality}</label>
                <select 
                  value={buildState.paperTypeIndex}
                  onChange={(e) => updateState('paperTypeIndex', Number(e.target.value))}
                  className="w-full p-3 border border-stone-200 bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 font-sans text-stone-700 cursor-pointer"
                >
                  {PAPER_TYPES[lang].map((pt, idx) => <option key={idx} value={idx}>{pt}</option>)}
                </select>
              </div>

              {/* Color Swatches */}
              <div>
                <label className="block text-sm text-stone-600 mb-3">{t.baseColor}</label>
                <div className="flex flex-wrap gap-3">
                  {PAPER_COLORS.map((color, idx) => (
                    <button
                      key={color.id}
                      onClick={() => updateState('colorIndex', idx)}
                      className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${buildState.colorIndex === idx ? 'border-stone-900 scale-110 shadow-md' : 'border-stone-200 shadow-sm'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color[lang]}
                      aria-label={`Select ${color[lang]}`}
                    />
                  ))}
                </div>
                <div className="text-xs text-stone-500 mt-2">{t.selected} {currentColor[lang]}</div>
              </div>
            </div>
          </section>

          {/* Typography & Content */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold flex items-center"><Type size={14} className="mr-2"/> {t.step3}</h3>
            <div className="space-y-6">
              
              {/* Style Select */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {STYLES[lang].map((style, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateState('styleIndex', idx)}
                    className={`px-4 py-2 text-sm whitespace-nowrap border rounded-sm transition-colors ${buildState.styleIndex === idx ? 'border-stone-900 bg-stone-100 text-stone-900 font-medium' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm text-stone-600 mb-2">{t.customInscription}</label>
                <textarea 
                  rows={4}
                  value={buildState.customText}
                  onChange={(e) => updateState('customText', e.target.value)}
                  className="w-full p-3 border border-stone-200 bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 font-sans text-stone-700 resize-none"
                  placeholder={t.placeholderText}
                />
              </div>

              {/* Logo Upload Mock */}
              <div>
                <label className="block text-sm text-stone-600 mb-2">{t.includeLogo}</label>
                <div className="relative border-2 border-dashed border-stone-200 bg-white rounded-sm p-6 text-center hover:border-stone-400 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    accept="image/*"
                  />
                  <div className="flex flex-col items-center group-hover:opacity-80 transition-opacity">
                    <ImageIcon className={`w-8 h-8 mb-2 ${buildState.logoUploaded ? 'text-stone-900' : 'text-stone-400'}`} />
                    <span className="text-sm font-medium text-stone-700">
                      {buildState.logoUploaded ? t.artworkAttached : t.clickToUpload}
                    </span>
                    <span className="text-xs text-stone-500 mt-1">{t.fileSize}</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: PREVIEW */}
        <div className="w-full lg:w-2/3">
          <div className="sticky top-28">
            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">{t.livePreview}</h3>
            
            {/* Canvas Area */}
            <div className="bg-stone-200 rounded-sm p-8 md:p-16 flex items-center justify-center min-h-[600px] border border-stone-300 shadow-inner overflow-hidden relative">
              
              {/* The Paper Component (Targeted by html2canvas) */}
              <div 
                ref={previewRef}
                className="relative shadow-2xl transition-all duration-700 flex items-center justify-center text-center p-12"
                style={{
                  backgroundColor: currentColor.hex,
                  color: currentColor.textIsLight ? '#FAFAFA' : '#1C1917',
                  width: currentProduct.id === 'money-holder' ? '280px' : 
                         currentProduct.id === 'wedding-menu' ? '220px' : 
                         currentProduct.id === 'name-tag' ? '300px' : '260px',
                  height: currentProduct.id === 'money-holder' ? '400px' : 
                          currentProduct.id === 'wedding-menu' ? '480px' : 
                          currentProduct.id === 'name-tag' ? '200px' : '320px',
                  opacity: currentPaper.includes('Vellum') ? 0.9 : 1,
                  backgroundImage: currentPaper.includes('Linen') || currentPaper.includes('Lino') ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)' : 'none',
                }}
              >
                {/* Product specific geometry accents */}
                {currentProduct.id === 'money-holder' && (
                  <div className="absolute bottom-1/4 left-0 w-full h-px bg-current opacity-20"></div>
                )}
                {currentProduct.id === 'wedding-menu' && (
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
                    fontFamily: currentStyle.includes('Serif') ? 'Georgia, serif' : 
                                currentStyle.includes('Bold') || currentStyle.includes('Negrita') ? 'Impact, sans-serif' : 
                                currentStyle.includes('Botanic') ? '"Palatino Linotype", serif' : 'ui-sans-serif, system-ui, sans-serif',
                    fontWeight: currentStyle.includes('Bold') || currentStyle.includes('Negrita') ? 700 : 
                                currentStyle.includes('Minimalist') ? 300 : 400,
                    letterSpacing: currentStyle.includes('Minimalist') ? '0.1em' : 'normal',
                    whiteSpace: 'pre-wrap',
                    fontSize: currentProduct.id === 'name-tag' ? '1.5rem' : '1.125rem',
                    lineHeight: 1.8
                  }}>
                    {buildState.customText || t.defaultPreviewText}
                  </div>
                </div>
              </div>

              {/* Decorative elements to show it's a studio space */}
              <div className="absolute bottom-4 right-4 text-stone-400 opacity-50">
                 <Scissors size={24} />
              </div>
            </div>
            
            <p className="text-center text-xs text-stone-500 mt-4 max-w-xl mx-auto">
              {t.previewNote}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}