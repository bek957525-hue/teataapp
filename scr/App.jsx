import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Award, Phone, MessageCircle, Send, ChevronDown } from 'lucide-react';

// --- ДАННЫЕ УСЛУГ ---
const servicesData = [
  {
    category: "Ресницы",
    items: [
      { name: "Наращивание ресниц 1D", price: "3 000 ₽" },
      { name: "Наращивание ресниц 2D", price: "3 000 ₽" },
      { name: "Наращивание ресниц 3D", price: "3 500 ₽" },
      { name: "Наращивание ресниц 4D", price: "3 500 ₽" },
      { name: "Ламинирование ресниц", price: "2 500 ₽" }
    ]
  },
  {
    category: "Брови",
    items: [
      { name: "Оформление бровей (коррекция воск/пинцет + окрашивание)", price: "1 300 ₽" },
      { name: "Коррекция бровей (воск/пинцет)", price: "800 ₽" },
      { name: "Перманентный макияж бровей", price: "8 000 ₽" }
    ]
  },
  {
    category: "Перманентный макияж",
    items: [
      { name: "Перманентный макияж межресничка", price: "6 000 ₽" },
      { name: "Перманентный макияж губ", price: "9 000 ₽" }
    ]
  },
  {
    category: "Коррекция и удаление татуажа",
    items: [
      { name: "Удаление нежелательного татуажа (10 мин)", price: "2 500 ₽", desc: "Выведение нежелательных остатков старого татуажа" },
      { name: "Осветление татуажа ремувером (30 мин)", price: "3 000 ₽" }
    ]
  }
];

const reviewsData = [
  { name: "Анна", text: "Невероятно естественные брови! Марина — настоящий профессионал, учла все пожелания." },
  { name: "Елена", text: "Очень уютная студия и бережный подход. Стерильность на высшем уровне, рекомендую!" },
  { name: "Мария", text: "Делала губы, результат превзошел все ожидания. Цвет идеальный, заживление прошло легко." }
];

// --- КОМПОНЕНТ АККОРДЕОНА ---
const AccordionItem = ({ category, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-4 rounded-2xl overflow-hidden shadow-soft bg-secondaryBg border border-accentPink/20"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left active:scale-[0.98] transition-transform duration-200"
      >
        <span className="font-serif text-xl text-darkBrown font-semibold">{category}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
          className="text-accentGold"
        >
          <ChevronDown size={24} />
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start border-b border-accentPink/10 pb-3 last:border-0 last:pb-0">
                  <div className="pr-4">
                    <p className="text-darkBrown font-medium leading-snug">{item.name}</p>
                    {item.desc && <p className="text-sm text-gray-500 mt-1 italic">{item.desc}</p>}
                  </div>
                  <span className="text-accentGold font-semibold whitespace-nowrap text-lg">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- ОСНОВНОЙ КОМПОНЕНТ ---
export default function App() {
  useEffect(() => {
    // Инициализация Telegram Web App
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      // Настройка MainButton
      tg.MainButton.setText("Записаться");
      tg.MainButton.setParams({
        color: "#C9A961", // Золотой
        text_color: "#FFFFFF"
      });
      tg.MainButton.onClick(() => {
        window.open("tel:+79198850501", "_blank");
      });
      tg.MainButton.show();
    }
  }, []);

  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-24">
      
      {/* ЭКРАН 1: HERO */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6 pt-10 pb-8"
      >
        <h1 className="font-serif text-3xl md:text-4xl text-darkBrown mb-3 leading-tight">
          Студия перманентного макияжа <br/>
          <span className="text-accentGold">Марины Славенко</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 font-sans font-light tracking-wide">
          Подчеркни свою естественную красоту
        </p>
        
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8 shadow-soft">
          <img 
            src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80&w=800" 
            alt="Эстетика перманентного макияжа" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darkBrown/40 to-transparent"></div>
        </div>

        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <a 
            href="tel:+79198850501"
            className="w-full py-4 rounded-2xl bg-accentGold text-white font-semibold text-lg shadow-gold active:scale-[0.98] transition-transform duration-200 text-center"
          >
            Записаться
          </a>
          <button 
            onClick={scrollToServices}
            className="w-full py-4 rounded-2xl border-2 border-accentPink text-darkBrown font-semibold text-lg active:scale-[0.98] transition-transform duration-200 bg-secondaryBg/50"
          >
            Прайс-лист
          </button>
        </div>
      </motion.section>

      {/* ПОЧЕМУ ВЫБИРАЮТ НАС */}
      <section className="px-6 py-10 bg-secondaryBg/60">
        <h2 className="font-serif text-2xl text-center text-darkBrown mb-8">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { icon: <Award className="w-8 h-8 text-accentGold" />, title: "Опыт", desc: "Более 5 лет безупречной практики" },
            { icon: <ShieldCheck className="w-8 h-8 text-accentGold" />, title: "Стерильность", desc: "Только одноразовые расходные материалы" },
            { icon: <Sparkles className="w-8 h-8 text-accentGold" />, title: "Качество", desc: "Премиальные гипоаллергенные пигменты" }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-bg border border-accentPink/10"
            >
              <div className="mb-3 p-3 rounded-full bg-accentGold/10">{feature.icon}</div>
              <h3 className="font-serif text-lg font-semibold text-darkBrown mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ЭКРАН 2: УСЛУГИ И ЦЕНЫ */}
      <section id="services" className="px-6 py-10">
        <h2 className="font-serif text-3xl text-center text-darkBrown mb-8">Услуги и цены</h2>
        <div className="max-w-2xl mx-auto">
          {servicesData.map((service, idx) => (
            <AccordionItem key={idx} category={service.category} items={service.items} />
          ))}
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="px-6 py-10 bg-secondaryBg/60">
        <h2 className="font-serif text-2xl text-center text-darkBrown mb-8">Отзывы клиентов</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {reviewsData.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-bg border border-accentPink/20 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-accentPink/30 flex items-center justify-center text-accentGold font-serif font-bold">
                  {review.name[0]}
                </div>
                <span className="font-semibold text-darkBrown">{review.name}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">"{review.text}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ЭКРАН 3: КОНТАКТЫ И ЗАПИСЬ */}
      <section className="px-6 py-12 text-center">
        <h2 className="font-serif text-3xl text-darkBrown mb-8">Записаться на процедуру</h2>
        
        <div className="max-w-sm mx-auto space-y-4 mb-10">
          <a 
            href="tel:+79198850501"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-accentGold text-white font-semibold text-lg shadow-gold active:scale-[0.98] transition-transform"
          >
            <Phone size={20} /> Позвонить
          </a>
          <a 
            href="https://wa.me/79198850501"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-semibold text-lg shadow-lg active:scale-[0.98] transition-transform"
          >
            <MessageCircle size={20} /> Написать в WhatsApp
          </a>
          <a 
            href="https://t.me/+79198850501"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#0088cc] text-white font-semibold text-lg shadow-lg active:scale-[0.98] transition-transform"
          >
            <Send size={20} /> Написать в Telegram
          </a>
        </div>

        <div className="max-w-sm mx-auto p-6 rounded-2xl bg-secondaryBg border border-accentPink/20 shadow-soft">
          <a href="tel:+79198850501" className="font-serif text-2xl text-accentGold font-bold block mb-4 hover:underline">
            +7 (919) 885-05-01
          </a>
          <div className="space-y-2 text-gray-600 text-sm">
            <p className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accentPink"></span>
              г. [город], ул. [адрес]
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accentGold"></span>
              Ежедневно с 10:00 до 20:00
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-accentPink/10">
        <p>© Студия Марины Славенко, 2026</p>
        <p className="mt-1 text-xs opacity-60">Все права защищены</p>
      </footer>

      {/* STICKY КНОПКА (дублирует MainButton для надежности внутри UI) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg/90 backdrop-blur-md border-t border-accentPink/20 z-40 md:hidden">
        <a 
          href="tel:+79198850501"
          className="block w-full py-4 rounded-2xl bg-accentGold text-white font-semibold text-lg shadow-gold active:scale-[0.98] transition-transform text-center"
        >
          Записаться
        </a>
      </div>

    </div>
  );
}
