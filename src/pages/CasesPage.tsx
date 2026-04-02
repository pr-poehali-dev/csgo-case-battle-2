import { useState } from 'react';
import { CASES, Case } from '@/data/skins';
import CaseCard from '@/components/CaseCard';
import Icon from '@/components/ui/icon';

interface CasesPageProps {
  onOpenCase: (caseId: string) => void;
}

const CATEGORIES = ['Все', 'Новые', 'Популярные', 'Классика', 'Операции', 'Премиум', 'Бюджетные', 'Капсулы'];

export default function CasesPage({ onOpenCase }: CasesPageProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'price_asc' | 'price_desc' | 'name'>('price_asc');

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

  return (
    <div className="page cases-page">
      <div className="page-header">
        <h1 className="page-title">📦 Кейсы CS2</h1>
        <p className="page-sub">{CASES.length} кейсов и капсул · Скины с ценами Steam</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <Icon name="Search" size={16} className="search-icon" />
          <input
            className="search-input"
            placeholder="Поиск кейса..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value as typeof sort)}>
          <option value="price_asc">Цена ↑</option>
          <option value="price_desc">Цена ↓</option>
          <option value="name">По названию</option>
        </select>
      </div>

      <div className="category-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="cases-count">{filtered.length} кейсов</div>

      <div className="cases-grid cases-grid--large">
        {filtered.map(c => (
          <CaseCard key={c.id} caseItem={c} onClick={() => onOpenCase(c.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p>Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}
