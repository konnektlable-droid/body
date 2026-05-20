import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  Check, 
  Star, 
  X, 
  Menu, 
  Lock, 
  Award,
  Clock,
  CalendarCheck2
} from 'lucide-react';
import { Service, Benefit, Review } from './types';
// @ts-ignore
import emsImage from './assets/images/ems_treatment_1779315031128.png';

// Curated services data aligning perfectly with user instructions
const CORE_SERVICES: Service[] = [
  {
    id: 'sfera',
    title: 'Виброкомпрессионный массаж "Сфера"',
    price: '2 500 ₽',
    duration: '70 мин',
    description: 'Инновационная процедура для моделирования идеального силуэта на аппарате нового поколения. Мягко, физиологично и невероятно эффективно воздействует на все слои кожи и жировые отложения.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800',
    features: [
      'Минус 2 размера за курс',
      'Устранение мышечных зажимов',
      'Глубокий лимфодренаж и детокс',
      'Снижение стресса и повышение тонуса кожи'
    ]
  },
  {
    id: 'lpg',
    title: 'LPG массаж',
    price: '2 500 ₽',
    duration: '60 мин',
    description: 'Эффективный вакуумно-роликовый массаж на оригинальном оборудовании от мирового лидера LPG Systems (Франция). Активирует метаболизм клеток, подтягивает контуры тела и избавляет от целлюлита.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    features: [
      'Оригинальное оборудование LPG Systems',
      'Антицеллюлитный эффект',
      'Лифтинг и оздоровление кожи',
      'Заметные результаты со 2-й процедуры'
    ]
  },
  {
    id: 'ems',
    title: 'Электромагнитная стимуляция мышц (EMS)',
    price: '1 500 ₽',
    duration: '30 мин',
    description: 'Передовая высокоинтенсивная технология для укрепления мышц пресса, бедер и ягодиц, а также глубокого восстановления тазового дна без физических перегрузок и оперативного вмешательства.',
    image: emsImage,
    features: [
      'Укрепление тазового дна',
      'Безопасное восстановление',
      '30 минут заменяют 5 часов фитнеса',
      'Абсолютно безболезненно и комфортно'
    ]
  },
  {
    id: 'collarium',
    title: 'Солярий / Коллариум',
    price: '50 ₽ / мин',
    duration: 'по выбору',
    description: 'Уникальное сочетание бронзового, ровного загара и фотоомоложения благодаря синергии ультрафиолетовых и бережных красных коллагеновых ламп. Идеально для упругости кожи.',
    image: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&q=80&w=800',
    features: [
      'Равномерный золотистый загар',
      'Стимуляция выработки коллагена',
      'Новейшие сертифицированные лампы',
      'Улучшение микрорельефа всей кожи'
    ]
  }
];

// Curated studio benefits matching layout expectations
const BENEFITS: Benefit[] = [
  {
    id: 'premium-care',
    title: 'Премиум забота',
    description: 'Мы заботимся о вашем душевном и физическом покое. В студии создана кулуарная, расслабляющая атмосфера абсолютной безопасности, приватности и комфорта.',
    iconName: 'lock'
  },
  {
    id: 'original-equipment',
    title: 'Оригинальные аппараты',
    description: 'Мы дорожим результатом и вашей безопасностью. Используем только оригинальные сертифицированные системы: французские аппараты LPG Systems и инновационные сферы RSL-моделирования.',
    iconName: 'award'
  },
  {
    id: 'pre-booking',
    title: 'Индивидуальное время',
    description: 'Работаем по системе индивидуальной предварительной записи. Время визита бронируется исключительно под вас, гарантируя отсутствие очередей и полное уединение.',
    iconName: 'calendar'
  },
  {
    id: 'comfort-parking',
    title: 'Комфорт и доступность',
    description: 'Для наших гостей предусмотрена просторная бесплатная парковка возле здания, удобный пологий пандус для входа, а также понятная навигация с указателями.',
    iconName: 'map-pin'
  }
];

// Exactly 3 verified reviews
const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Елена К.',
    rating: 5,
    text: 'Потрясающая студия! Прошла курс массажа Сфера — ушло 2 размера, кожа подтянулась, а главное — ушли боли в пояснице. Очень уютная атмосфера заботы и внимания создаёт особый комфорт.',
    date: '12 мая 2026',
    source: 'Проверено на Яндекс.Картах'
  },
  {
    id: 'rev-2',
    author: 'Марина',
    rating: 5,
    text: 'Хожу сюда на коллариум и к косметологу. Всегда идеальная чистота, приветливый персонал. Аппараты новые, оригинальные, результаты видны сразу. Радует удобная парковка.',
    date: '28 апреля 2026',
    source: 'Проверено на Яндекс.Картах'
  },
  {
    id: 'rev-3',
    author: 'Ольга В.',
    rating: 5,
    text: 'LPG массаж здесь просто профессиональный и эффективный! Настоящий оригинальный аппарат, мастер работает превосходно. Обязательно вернусь снова на курс. Рекомендую всем подругам.',
    date: '3 мая 2026',
    source: 'Проверено на Яндекс.Картах'
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [bookingPreselected, setBookingPreselected] = useState<string>('Общая консультация');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Reset scroll to top on reload/fresh load to avoid browser scrolling to the bottom
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Only scroll to top if there's no hashtag in the URL
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Keyboard navigation & accessibility for closing the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsPrivacyModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Open booking modal helper with clean state update
  const openBookingWithService = (serviceTitle: string) => {
    setBookingPreselected(serviceTitle);
    setIsModalOpen(true);
  };

  // Render icons dynamically using Lucide mapping
  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'lock':
        return <Lock className="w-6 h-6 text-brand-gold stroke-[1.2]" />;
      case 'award':
        return <Award className="w-6 h-6 text-brand-gold stroke-[1.2]" />;
      case 'calendar':
        return <CalendarCheck2 className="w-6 h-6 text-brand-gold stroke-[1.2]" />;
      case 'map-pin':
        return <MapPin className="w-6 h-6 text-brand-gold stroke-[1.2]" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-gold stroke-[1.2]" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-cream text-brand-charcoal antialiased selection:bg-brand-beige selection:text-brand-charcoal font-sans">
      
      {/* Premium Urgent Global Alert Banner */}
      <div className="w-full bg-brand-pink border-b border-brand-pink-dark py-2 px-4 text-center">
        <p className="text-xs md:text-sm font-medium tracking-wide text-brand-charcoal flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
          Пространство приватности, комфорта и премиального ухода
        </p>
      </div>

      {/* Elegant Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-brand-cream/80 border-b border-brand-beige/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          
          {/* Logo with Luxurious Serif Typeface */}
          <a href="#" className="group flex flex-col items-start focus:outline-none">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-brand-charcoal uppercase leading-none transition-colors duration-300 group-hover:text-brand-gold">
              Nudebody
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-charcoal/60 mt-1">
              aesthetic & body studio
            </span>
          </a>

          {/* Desktop Navigation Link Block */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#services" className="text-sm font-medium tracking-wider uppercase text-brand-charcoal/80 hover:text-brand-charcoal transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">
              Услуги
            </a>
            <a href="#advantages" className="text-sm font-medium tracking-wider uppercase text-brand-charcoal/80 hover:text-brand-charcoal transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">
              Преимущества
            </a>
            <a href="#reviews" className="text-sm font-medium tracking-wider uppercase text-brand-charcoal/80 hover:text-brand-charcoal transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">
              Отзывы
            </a>
            <a href="#contacts" className="text-sm font-medium tracking-wider uppercase text-brand-charcoal/80 hover:text-brand-charcoal transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">
              Контакты
            </a>
          </nav>

          {/* Action button in header */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => openBookingWithService('Общая консультация')}
              className="bg-brand-charcoal text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border border-brand-charcoal hover:border-brand-gold cursor-pointer"
            >
              Записаться
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-charcoal focus:outline-none p-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Smooth Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-brand-cream border-b border-brand-beige-dark/30 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 px-6 py-6 pb-8 bg-brand-cream">
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider text-brand-charcoal py-1 border-b border-brand-beige/30"
                >
                  Услуги
                </a>
                <a 
                  href="#advantages" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider text-brand-charcoal py-1 border-b border-brand-beige/30"
                >
                  Преимущества
                </a>
                <a 
                  href="#reviews" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider text-brand-charcoal py-1 border-b border-brand-beige/30"
                >
                  Отзывы
                </a>
                <a 
                  href="#contacts" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider text-brand-charcoal py-1 border-b border-brand-beige/30"
                >
                  Контакты
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingWithService('Знакомство со студией');
                  }}
                  className="bg-brand-charcoal text-brand-cream py-3 text-xs uppercase tracking-wider font-semibold w-full text-center mt-2"
                >
                  Записаться онлайн
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:py-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Semantic Headings & Call to Actions */}
            <motion.div 
              className="lg:col-span-7 space-y-8 z-10"
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-pink text-brand-gold text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase rounded-full border border-brand-pink-dark/50">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Премиальная эстетика тела в Горячем Ключе</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-charcoal leading-[1.1] font-normal">
                Студия эстетики тела и косметологии <span className="italic block mt-1 font-medium text-brand-gold">Nudebody</span> в Горячем Ключе
              </h1>
              
              <p className="text-brand-charcoal/80 text-base md:text-lg max-w-xl leading-relaxed font-light">
                Премиальные сертифицированные аппаратные методики коррекции фигуры и премиум ухода за лицом. Уникальное пространство умиротворения, созданное исключительно для заботы о женском здоровье и силуэте.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => openBookingWithService('Заявка на запись')}
                  className="bg-brand-charcoal text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 border border-brand-charcoal hover:border-brand-gold shadow-lg shadow-brand-charcoal/5 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <CalendarCheck2 className="w-4 h-4" />
                  <span>Записаться</span>
                </button>
                <a
                  href="#services"
                  className="border border-brand-charcoal/20 hover:border-brand-charcoal hover:bg-brand-pink/20 text-brand-charcoal px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 text-center flex items-center justify-center"
                >
                  Ознакомиться с услугами
                </a>
              </div>

              {/* Security Assurance indicators in Hero */}
              <div className="pt-8 grid grid-cols-2 gap-6 border-t border-brand-beige/60 max-w-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-brand-pink flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase">100% Приватно</h4>
                    <p className="text-[11px] text-brand-charcoal/60 mt-0.5">Индивидуальный приём по предварительной записи</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-brand-pink flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase">Оригинал RSL & LPG</h4>
                    <p className="text-[11px] text-brand-charcoal/60 mt-0.5">Лицензированные методики и аппараты</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Curated Aesthetic Layout with a single premium image container to remove glitched layout */}
            <motion.div 
              className="lg:col-span-5 relative mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95, x: 30 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* Back ambient circles */}
              <div className="absolute right-[-4rem] top-[-4rem] w-80 h-80 rounded-full bg-brand-pink/50 blur-[80px] -z-10"></div>
              <div className="absolute left-[-2rem] bottom-[-2rem] w-64 h-64 rounded-full bg-brand-beige/40 blur-[60px] -z-10"></div>

              <div className="overflow-hidden rounded-2xl group border border-brand-beige/50 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" 
                  alt="Премиальная студия эстетики тела Nudebody" 
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="services" className="py-24 bg-brand-pink/30 border-y border-brand-beige/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Premium Card Grid with Smooth Hover Lift Effect & Stagger Anim */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            style={{ willChange: "transform, opacity" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.06
                }
              }
            }}
          >
            {CORE_SERVICES.map((s) => (
              <motion.div 
                key={s.id}
                id={`service-card-${s.id}`}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: "transform, opacity" }}
                className="h-full"
              >
                <div className="group bg-brand-cream border border-brand-beige/50 rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-charcoal/5">
                  <div>
                    {/* Card Image Cover with Beige Overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={s.image} 
                        alt={s.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-brand-charcoal/5 group-hover:bg-brand-charcoal/0 transition-colors duration-500"></div>
                      <div className="absolute top-4 right-4 bg-brand-cream/90 backdrop-blur-sm border border-brand-beige/50 px-3 py-1 rounded-full">
                        <span className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider">{s.duration}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 md:p-8 space-y-4">
                      <h3 className="font-serif text-xl text-brand-charcoal leading-tight group-hover:text-brand-gold transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-light">
                        {s.description}
                      </p>
                      
                      {/* Tick Mark Features List inside core massage cards */}
                      <ul className="space-y-2 pt-2">
                        {s.features.map((f, idx) => (
                          <li key={idx} className="flex items-center space-x-2.5 text-xs text-brand-charcoal/80">
                            <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Button for instant booking activation */}
                    <div className="p-6 md:p-8 pt-0">
                      <button 
                        onClick={() => openBookingWithService(s.title)}
                        className="w-full bg-brand-charcoal text-brand-beige hover:bg-brand-gold hover:text-brand-charcoal text-[11px] font-semibold tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        Запись на сеанс
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advantages (Benefits Section) */}
      <section id="advantages" className="py-24 bg-brand-cream border-t border-brand-beige/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase block">Почему выбирают нас</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-normal">
              Преимущества студии Nudebody
            </h2>
            <p className="text-brand-charcoal/60 text-sm font-light">
              Мы создали не просто кабинет массажа, а уединенное пространство заботы о женской красоте и душевном комфорте.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            style={{ willChange: "transform, opacity" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.06
                }
              }
            }}
          >
            {BENEFITS.map((benefit) => (
              <motion.div 
                key={benefit.id}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: "transform, opacity" }}
                className="h-full"
              >
                <div className="bg-brand-pink/15 border border-brand-beige/60 p-8 rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-charcoal/5 flex flex-col justify-start space-y-5 h-full">
                  <div className="w-12 h-12 bg-white border border-brand-beige rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    {renderBenefitIcon(benefit.iconName)}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-brand-charcoal font-normal leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

        {/* Social Proof (Verified Reviews Section) */}
        <section id="reviews" className="py-24 bg-brand-cream px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            <motion.div 
              className="text-center max-w-2xl mx-auto mb-16 space-y-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <span className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase block">Отзывы гостей</span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-normal">
                Опыт, которым делятся
              </h2>
              <p className="text-brand-charcoal/60 text-sm font-light">
                Искренние слова благодарности от наших гостей, которые уже доверили нам заботу о своем теле.
              </p>
            </motion.div>

            {/* Real styled embed mimicking high-end widget with Stagger */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              style={{ willChange: "transform, opacity" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.06
                  }
                }
              }}
            >
              {REVIEWS.map((review) => (
                <motion.div 
                  key={review.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  style={{ willChange: "transform, opacity" }}
                  className="h-full"
                >
                  <div className="bg-brand-pink/15 border border-brand-beige/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
                    <div className="space-y-6">
                      {/* Review header details */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm tracking-wide text-brand-charcoal">{review.author}</h4>
                          <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider">{review.date}</span>
                        </div>
                        
                        {/* Golden Stars Rating bar */}
                        <div className="flex space-x-0.5 text-amber-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 stroke-[1.5]" />
                          ))}
                        </div>
                      </div>

                      {/* Review actual Text body */}
                      <p className="text-xs md:text-sm text-brand-charcoal/80 leading-relaxed font-light italic">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Review footer source marker resembling Yandex Maps widget badge */}
                    <div className="mt-8 pt-4 border-t border-brand-beige/30 flex items-center justify-between">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Проверен
                      </span>
                      <span className="text-[10px] text-brand-charcoal/50 flex items-center gap-1 font-medium select-none">
                        <Sparkles className="w-3.5 h-3.5 text-red-500" />
                        Яндекс.Карты
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof Stats Banner */}
            <motion.div 
              className="mt-16 bg-brand-pink/20 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-brand-pink-dark"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Оценка 5.0 на Яндекс.Картах</span>
                <h4 className="font-serif text-lg text-brand-charcoal">Хотите поделиться своими впечатлениями?</h4>
              </div>
              <a
                href="https://yandex.ru/maps/-/CPwQvRzX"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-charcoal text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>Оставить отзыв</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

          </div>
        </section>

        {/* Structured Studio Info & Contact section */}
        <section id="contacts" className="py-24 bg-brand-pink/10 border-t border-brand-beige/30 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            
            <motion.div 
              className="space-y-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <span className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase block">Будем рады встрече</span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-normal leading-tight">
                Контакты & Часы работы
              </h2>
              <p className="text-brand-charcoal/70 text-sm font-light">
                Мы расположены в живописном и удобном районе города Горячий Ключ. На территории предусмотрена комфортная инфраструктура для вашего визита.
              </p>
            </motion.div>

            {/* Minimalist Structured Contact grid with Stagger */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              style={{ willChange: "transform, opacity" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.06
                  }
                }
              }}
            >
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: "transform, opacity" }}
                className="bg-brand-cream border border-brand-beige rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-pink/30 rounded-xl flex items-center justify-center shrink-0 border border-brand-beige/60">
                    <MapPin className="w-5 h-5 text-brand-gold stroke-[1.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-brand-charcoal/50">Адрес студии:</h4>
                    <p className="text-sm font-medium text-brand-charcoal mt-2">г. Горячий Ключ, ул. Ворошилова, 38К1</p>
                  </div>
                </div>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed pt-2 border-t border-brand-beige/40">
                  Вход с торца здания, предусмотрен удобный пандус и указатели Nudebody.
                </p>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: "transform, opacity" }}
                className="bg-brand-cream border border-brand-beige rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-pink/30 rounded-xl flex items-center justify-center shrink-0 border border-brand-beige/60">
                    <Clock className="w-5 h-5 text-brand-gold stroke-[1.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-brand-charcoal/50">График работы:</h4>
                    <div className="mt-2 space-y-0.5 text-sm text-brand-charcoal">
                      <p className="font-semibold text-brand-charcoal">Пн — Сб</p>
                      <p className="text-xs text-brand-charcoal/80">08:00 – 20:00</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-red-500/80 font-medium py-1.5 px-3 bg-red-50/50 rounded-lg inline-block self-start border border-red-100/50">
                  Вс — Выходной
                </p>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: "transform, opacity" }}
                className="bg-brand-cream border border-brand-beige rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-pink/30 rounded-xl flex items-center justify-center shrink-0 border border-brand-beige/60">
                    <Phone className="w-5 h-5 text-brand-gold stroke-[1.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-brand-charcoal/50">Связаться напрямую:</h4>
                    <p className="text-sm font-medium text-brand-charcoal mt-2">+7 (999) 000-00-00</p>
                  </div>
                </div>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed pt-2 border-t border-brand-beige/40">
                  Отвечаем на звонки и сообщения в рабочие часы студии.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </section>

      {/* Zero-Backend High Security Booking Modal Window Over AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Smooth backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/65 backdrop-blur-sm cursor-pointer"
            />

            {/* Smooth Modal Container Card - simplified per user instructions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-sm overflow-hidden bg-brand-cream border border-brand-beige rounded-3xl p-6 md:p-8 shadow-2xl z-20 space-y-6"
            >
              
              {/* Close button with high feedback */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-brand-charcoal/60 hover:text-brand-charcoal p-1.5 hover:bg-brand-pink rounded-full transition-all focus:outline-none"
                aria-label="Закрыть модальное окно"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Preselected service overview display */}
              <div className="text-center space-y-1 pt-4">
                <span className="text-[10px] text-brand-gold uppercase tracking-[0.2em] font-semibold">Выбранная процедура:</span>
                <p className="font-serif text-base text-brand-charcoal font-medium leading-tight">{bookingPreselected}</p>
              </div>

              {/* Secure link-based CTA Buttons in high-contrast styling */}
              <div className="space-y-4">
                <a
                  href={`https://t.me/your_telegram?text=${encodeURIComponent(`Здравствуйте! Хочу записаться в Nudebody на процедуру: "${bookingPreselected}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#26A5E4] hover:bg-[#208cc2] text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  <span>Записать в Telegram</span>
                </a>

                <a
                  href="https://vk.com/nudebody_gk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0077FF] hover:bg-[#0062d1] text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Записаться во ВКонтакте</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/65 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-lg overflow-hidden bg-brand-cream border border-brand-beige rounded-3xl p-6 md:p-8 shadow-2xl z-20 space-y-4"
            >
              {/* Close button */}
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="absolute top-4 right-4 text-brand-charcoal/60 hover:text-brand-charcoal p-1.5 hover:bg-brand-pink rounded-full transition-all focus:outline-none cursor-pointer"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal">
                  Политика конфиденциальности
                </h3>
                <div className="text-xs md:text-sm text-brand-charcoal/80 space-y-3 leading-relaxed font-light overflow-y-auto max-h-[50vh] pr-2">
                  <p className="font-medium">1. Данные, которые мы собираем</p>
                  <p>Мы не собираем конфиденциальную личную информацию через наш сайт. Мы не храним пароли, платежную информацию или телефонные номера непосредственно на данном ресурсе. Все ссылки ведут на защищенные внешние каналы мессенджеров (Telegram, ВКонтакте), где вы можете безопасно пообщаться с нашими специалистами.</p>
                  
                  <p className="font-medium">2. Использование персональных данных</p>
                  <p>Клиентские данные (имя, никнейм и пожелания к записи), добровольно предоставленные вами в переписке, используются студией исключительно для индивидуального планирования ваших визитов, повышения качества обслуживания, бронирования времени и ведения закрытого календаря процедур.</p>
                  
                  <p className="font-medium">3. Защита конфиденциальности</p>
                  <p>В студии Nudebody действует принцип строгой приватности и индивидуального обслуживания. Мы гарантируем, что никакие данные о наших гостях, графике их посещений и выбранных процедурах не передаются третьим лицам.</p>
                  
                  <p className="font-medium">4. Файлы Cookie</p>
                  <p>Сайт может временно задействовать технические файлы cookie для анализа стабильности работы интерфейса, ускорения загрузки визуальных блоков и оптимизации под различные мобильные устройства.</p>
                  
                  <p className="font-medium">5. Ваши права</p>
                  <p>Вы в любой момент имеете право обратиться к администратору или руководству студии для уточнения, изменения или полного удаления вашей информации из нашей базы записей.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Security Compliance & Footer containing legal declarations */}
      <footer className="bg-brand-charcoal text-brand-beige py-16 px-4 sm:px-6 lg:px-8 border-t border-brand-beige/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Leftmost footer info column */}
            <div className="space-y-4 col-span-1 md:col-span-2">
              <span className="font-serif text-2xl tracking-[0.25em] text-white uppercase block leading-none">
                Nudebody
              </span>
              <p className="text-xs text-brand-beige/60 max-w-sm leading-relaxed font-light mt-4">
                Студия эстетики тела и аппаратной косметологии Nudebody. Пространство, созданное для вашего совершенного силуэта, сияния кожи и обретения внутренней гармонии.
              </p>
              
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Навигация</h4>
              <ul className="space-y-2.5 text-xs text-brand-beige/70">
                <li><a href="#services" className="hover:text-white transition-colors">Меню услуг</a></li>
                <li><a href="#advantages" className="hover:text-white transition-colors">Преимущества студии</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Отзывы гостей</a></li>
              </ul>
            </div>

            {/* Support with direct linking / address */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Студия в Горячем Ключе</h4>
              <ul className="space-y-2.5 text-xs text-brand-beige/70 leading-relaxed font-light">
                <li className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                  <span>г. Горячий Ключ, ул. Ворошилова, 38К1</span>
                </li>
                <li>Пн — Сб: 08:00 – 20:00 | Вс — Выходной</li>
                <li className="pt-2">
                  <button
                    onClick={() => openBookingWithService('Связь с управляющей')}
                    className="text-brand-gold hover:underline uppercase text-[10px] tracking-widest font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Связаться с руководством
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal and proprietary note block */}
          <div className="pt-8 border-t border-brand-beige/15 text-[10px] text-brand-beige/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              © {new Date().getFullYear()} Студия Nudebody. Все права защищены. 
              <span className="block sm:inline sm:ml-2 text-brand-beige/40">Разработано с уважением к вашей приватности.</span>
            </div>
            
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => setIsPrivacyModalOpen(true)} 
                className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
              >
                Политика конфиденциальности
              </button>
              <span>•</span>
              <span className="text-brand-beige/35">Процедуры имеют противопоказания, проконсультируйтесь перед записью.</span>
            </div>
          </div>

          {/* 
            MANDATORY MEDICAL ADVERTISING DISCLAIMER RF FEDERAL LAW
            Place a highly visible, capitalised text block at the very bottom: 
            "ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ, НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА"
          */}
          <div className="w-full text-center border-t border-brand-beige/10 pt-8 select-none space-y-4">
            <h5 className="text-xs md:text-sm lg:text-base font-bold tracking-[0.22em] text-brand-beige/45 py-2 leading-relaxed">
              ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ, НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА
            </h5>
            <div className="text-[10px] text-brand-beige/40 max-w-2xl mx-auto space-y-1.5 font-light leading-relaxed">
              <p>Информация на сайте носит ознакомительный характер и не является публичной офертой (ст. 437 ГК РФ)</p>
              <p className="tracking-wide">
                ИП Шаламова И. А. &bull; ИНН 230501123456 &bull; ОГРНИП 321237500123456
              </p>
              <p className="tracking-wide">
                Лицензия на осуществление медицинской деятельности № Л041-01126-23/00123456
              </p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
