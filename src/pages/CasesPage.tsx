import { useState } from 'react';
import { CASES } from '@/data/skins';
import Icon from '@/components/ui/icon';

interface CasesPageProps {
  onOpenCase: (caseId: string) => void;
}

// Реальные картинки кейсов CS2 с picsum + тематические meme/fun картинки
const CASE_IMAGES: Record<string, string> = {
  cs1:  'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=400&q=80', // neon abstract
  cs2:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', // dark fire
  cs3:  'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&q=80', // chrome/metal
  cs4:  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80', // gradient glow
  cs5:  'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80', // orange fire
  cs6:  'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=400&q=80', // blue deep
  cs7:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', // hawk
  cs8:  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80', // dark shadow
  cs9:  'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80', // spectrum colors
  cs10: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=400&q=80', // sniper scope
  cs11: 'https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80', // nuclear green
  cs12: 'https://images.unsplash.com/photo-1474002899526-f5da6b12f79d?w=400&q=80', // snake scales
  cs13: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80', // lightning
  cs14: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80', // sparks
  cs15: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', // wolf portrait
  cs16: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80', // cobra
  cs17: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80', // roman/ruins
  cs18: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=400&q=80', // map atlas
  cs19: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&q=80', // dark forest
  cs20: 'https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?w=400&q=80', // bronze
  cs21: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=400&q=80', // neon green
  cs22: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400&q=80', // dollar money
  cs23: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=400&q=80', // platinum
  cs24: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=400&q=80', // diamond
  cs25: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', // horizon sunset
  cs26: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80', // cave rocks
  cs27: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=400&q=80', // volcano
  cs28: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400&q=80', // storm lightning
  cs29: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80', // ice stars
  cs30: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=400&q=80', // fire
  cs31: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80', // delta triangle
  cs32: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', // mountains gamma
  cs33: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', // ocean wave
  cs34: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80', // dice gamble
  cs35: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&q=80', // skull dark
  cs36: 'https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?w=400&q=80', // trophy gold
  cs37: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', // blood red
  cs38: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80', // chaos swirl
  cs39: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&q=80', // dawn sunrise
  cs40: 'https://images.unsplash.com/photo-1438449805896-28a666819a20?w=400&q=80', // night moon
  cs41: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80', // electric
  cs42: 'https://images.unsplash.com/photo-1534796636912-3b952d9a5a19?w=400&q=80', // ghost fog
  cs43: 'https://images.unsplash.com/photo-1572301710938-f72945062b5e?w=400&q=80', // explosion
  cs44: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=400&q=80', // steel metal
  cs45: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80', // crystal purple
  cap1: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&q=80', // medal gold
  cap2: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80', // trophy silver
  cap3: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80', // rio colors
  cap4: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=400&q=80', // champions
  cap5: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=80', // stockholm
  cap6: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80', // paris eiffel
};

const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  'Все':        { icon: '🌐', color: '#6b7280' },
  'Новые':      { icon: '🆕', color: '#00d4ff' },
  'Популярные': { icon: '🔥', color: '#f0a500' },
  'Классика':   { icon: '🏛️', color: '#8b5cf6' },
  'Операции':   { icon: '⚔️', color: '#ef4444' },
  'Премиум':    { icon: '💎', color: '#caab05' },
  'Бюджетные':  { icon: '💸', color: '#22c55e' },
  'Капсулы':    { icon: '🏅', color: '#ec4899' },
};

const CATEGORIES = Object.keys(CATEGORY_META);

export default function CasesPage({ onOpenCase }: CasesPageProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'price_asc' | 'price_desc' | 'name'>('price_asc');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = CASES
    .filter(c => {
      if (activeCategory !== 'Все' && c.category !== activeCategory) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  const activeMeta = CATEGORY_META[activeCategory];

  return (
    <div className="cp-page">
      {/* Hero banner */}
      <div className="cp-hero">
        <div className="cp-hero__bg" />
        <div className="cp-hero__content">
          <h1 className="cp-hero__title">Магазин кейсов CS2</h1>
          <p className="cp-hero__sub">{CASES.length} кейсов и капсул · Скины по ценам Steam · Мгновенный дроп</p>
          <div className="cp-hero__stats">
            <div className="cp-hero__stat"><span>51</span><small>кейс</small></div>
            <div className="cp-hero__stat-sep" />
            <div className="cp-hero__stat"><span>6</span><small>капсул</small></div>
            <div className="cp-hero__stat-sep" />
            <div className="cp-hero__stat"><span>20+</span><small>скинов в кейсе</small></div>
            <div className="cp-hero__stat-sep" />
            <div className="cp-hero__stat"><span>48 000 ₽</span><small>макс выигрыш</small></div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="cp-toolbar">
        <div className="cp-search">
          <Icon name="Search" size={16} />
          <input
            className="cp-search__input"
            placeholder="Поиск кейса..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="cp-search__clear" onClick={() => setSearch('')}>
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
        <select className="cp-sort" value={sort} onChange={e => setSort(e.target.value as typeof sort)}>
          <option value="price_asc">Цена ↑</option>
          <option value="price_desc">Цена ↓</option>
          <option value="name">А–Я</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="cp-cats">
        {CATEGORIES.map(cat => {
          const meta = CATEGORY_META[cat];
          return (
            <button
              key={cat}
              className={`cp-cat ${activeCategory === cat ? 'active' : ''}`}
              style={activeCategory === cat ? { borderColor: meta.color, color: meta.color, background: meta.color + '18' } : {}}
              onClick={() => setActiveCategory(cat)}
            >
              <span>{meta.icon}</span>
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Count */}
      <div className="cp-count">
        <span style={{ color: activeMeta.color }}>{activeMeta.icon}</span>
        {filtered.length} кейсов
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="cp-grid">
          {filtered.map(c => {
            const imgUrl = CASE_IMAGES[c.id];
            const maxPrice = Math.max(...c.items.map(s => s.price));
            const isHot = c.category === 'Популярные' || c.category === 'Премиум';
            const isNew = c.category === 'Новые';
            return (
              <div
                key={c.id}
                className={`cp-card ${hoveredId === c.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredId(c.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onOpenCase(c.id)}
              >
                {/* Badges */}
                <div className="cp-card__badges">
                  {isHot && <span className="cp-badge cp-badge--hot">🔥 ХИТ</span>}
                  {isNew && <span className="cp-badge cp-badge--new">✨ НОВЫЙ</span>}
                  {c.type === 'capsule' && <span className="cp-badge cp-badge--cap">🏅 КАПСУЛА</span>}
                </div>

                {/* Image */}
                <div className="cp-card__img-wrap">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={c.name}
                      className="cp-card__img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="cp-card__img-fallback">
                      <span>{c.image}</span>
                    </div>
                  )}
                  <div className="cp-card__img-overlay" />
                  {/* Hover overlay */}
                  <div className="cp-card__hover-overlay">
                    <div className="cp-card__hover-items">
                      {c.items.slice(0, 5).map((item, i) => (
                        <span key={i} className="cp-card__hover-item">{item.finish}</span>
                      ))}
                      {c.items.length > 5 && (
                        <span className="cp-card__hover-more">+{c.items.length - 5} ещё</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="cp-card__body">
                  <div className="cp-card__cat">{CATEGORY_META[c.category]?.icon} {c.category}</div>
                  <div className="cp-card__name">{c.name}</div>
                  <div className="cp-card__meta">
                    <span className="cp-card__items">{c.items.length} предметов</span>
                    <span className="cp-card__max">до {maxPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <button className="cp-card__btn">
                    <Icon name="Unlock" size={15} />
                    Открыть · {c.price} ₽
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state large">
          <span className="empty-icon">🔍</span>
          <h3>Ничего не найдено</h3>
          <p>Попробуй изменить фильтр или поисковый запрос</p>
        </div>
      )}
    </div>
  );
}
