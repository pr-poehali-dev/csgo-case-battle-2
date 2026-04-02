import { CASES } from '@/data/skins';
import CaseCard from '@/components/CaseCard';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenCase: (caseId: string) => void;
  onDeposit: () => void;
}

const STATS = [
  { label: 'Игроков онлайн', value: '4,821', icon: '🟢' },
  { label: 'Кейсов открыто', value: '2.4М', icon: '📦' },
  { label: 'Выплачено сегодня', value: '1.8М ₽', icon: '💸' },
  { label: 'Макс. выигрыш', value: '48,000 ₽', icon: '🏆' },
];

const LIVE_DROPS = [
  { user: 'Pro***er', skin: 'AK-47 | Огненный змей', price: 4200, rarity: 'covert', emoji: '🔴' },
  { user: 'Sni***45', skin: 'AWP | Дракон Лор', price: 8500, rarity: 'covert', emoji: '🟣' },
  { user: 'Str***99', skin: 'Карамбит | Мраморный', price: 18500, rarity: 'extraordinary', emoji: '⭐' },
  { user: 'Fun***21', skin: 'USP-S | Убийца', price: 1200, rarity: 'classified', emoji: '🔵' },
  { user: 'Ace***77', skin: 'M4A1-S | Гиперзверь', price: 2800, rarity: 'covert', emoji: '🔥' },
  { user: 'Rus***k0', skin: 'Стикер | NaVi 2014', price: 48000, rarity: 'extraordinary', emoji: '🏅' },
];

const RARITY_COLORS: Record<string, string> = {
  covert: '#eb4b4b', classified: '#d32ce6', extraordinary: '#caab05', restricted: '#8847ff',
};

export default function HomePage({ onNavigate, onOpenCase, onDeposit }: HomePageProps) {
  const featuredCases = CASES.slice(0, 6);

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__grid" />
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>
        <div className="hero__content">
          <div className="hero__badge rounded-full bg-slate-900">🔥 Сезон 2024 · CS2</div>
          <h1 className="hero__title">
            ОТКРЫВАЙ КЕЙСЫ<br />
            <span className="hero__accent">ВЫИГРЫВАЙ СКИНЫ</span>
          </h1>
          <p className="hero__sub">50+ кейсов с реальными скинами CS2 по ценам Steam. Апгрейды, контракты, вывод на Steam.</p>
          <div className="hero__actions mx-[55px] px-[55px]">
            <button className="btn-hero-primary" onClick={() => onNavigate('cases')}>
              <Icon name="Package" size={20} />
              Открыть кейс
            </button>
            <button className="btn-hero-secondary" onClick={onDeposit}>
              <Icon name="Wallet" size={20} />
              Пополнить баланс
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Live drops ticker */}
      <section className="live-section">
        <div className="live-header">
          <span className="live-dot" />
          <span className="live-title">LIVE DROPS</span>
        </div>
        <div className="live-ticker">
          <div className="live-ticker__inner">
            {[...LIVE_DROPS, ...LIVE_DROPS].map((drop, i) => (
              <div key={i} className="live-drop" style={{ '--rc': RARITY_COLORS[drop.rarity] || '#fff' } as React.CSSProperties}>
                <span className="live-drop__emoji">{drop.emoji}</span>
                <span className="live-drop__user">{drop.user}</span>
                <span className="live-drop__skin">{drop.skin}</span>
                <span className="live-drop__price">{drop.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured cases */}
      <section className="section rounded-sm mx-[5px] my-[55px]">
        <div className="section__header">
          <h2 className="section__title">🔥 Популярные кейсы</h2>
          <button className="section__more" onClick={() => onNavigate('cases')}>
            Все кейсы <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <div className="cases-grid">
          {featuredCases.map(c => (
            <CaseCard key={c.id} caseItem={c} onClick={() => onOpenCase(c.id)} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🔓</div>
          <h3>Честное открытие</h3>
          <p>Все шансы прозрачны и проверяемы. Провабли фэйр система.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💸</div>
          <h3>Быстрый вывод</h3>
          <p>Вывод скинов на Steam за 5-10 минут. Поддержка Trade URL.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Безопасность</h3>
          <p>SSL шифрование, верификация аккаунта, защита от мошенников.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>СБП и карты РФ</h3>
          <p>Пополнение через СБП, Visa/МИР/Mastercard. Мгновенно.</p>
        </div>
      </section>
    </div>
  );
}