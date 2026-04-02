import { useState } from 'react';
import { Skin, RARITY_COLORS, getWeaponEmoji, RARITY_NAMES } from '@/data/skins';
import Icon from '@/components/ui/icon';

interface InventoryPageProps {
  inventory: Skin[];
  onSell: (skin: Skin) => void;
  onWithdraw: (skin: Skin) => void;
}

const SORT_OPTIONS = [
  { value: 'price_desc', label: 'Дороже' },
  { value: 'price_asc', label: 'Дешевле' },
  { value: 'name', label: 'По имени' },
  { value: 'rarity', label: 'По редкости' },
];

export default function InventoryPage({ inventory, onSell, onWithdraw }: InventoryPageProps) {
  const [sort, setSort] = useState('price_desc');
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [withdrawModal, setWithdrawModal] = useState<Skin | null>(null);

  const sorted = [...inventory]
    .filter(s => !filter || s.weapon.toLowerCase().includes(filter.toLowerCase()) || s.finish.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'name') return a.weapon.localeCompare(b.weapon);
      return 0;
    });

  const totalValue = inventory.reduce((s, x) => s + x.price, 0);
  const selectedValue = Array.from(selected).reduce((s, id) => {
    const skin = inventory.find(x => x.id === id);
    return s + (skin?.price || 0);
  }, 0);

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function sellSelected() {
    selected.forEach(id => {
      const skin = inventory.find(x => x.id === id);
      if (skin) onSell(skin);
    });
    setSelected(new Set());
  }

  return (
    <div className="page inventory-page">
      <div className="page-header">
        <h1 className="page-title">🎒 Инвентарь</h1>
        <div className="inv-stats">
          <span className="inv-stat">{inventory.length} предметов</span>
          <span className="inv-stat highlight">{totalValue.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>

      <div className="inv-toolbar">
        <div className="search-box">
          <Icon name="Search" size={16} />
          <input
            className="search-input"
            placeholder="Поиск..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {selected.size > 0 && (
          <div className="selection-bar">
            <span>{selected.size} выбрано · {selectedValue.toLocaleString('ru-RU')} ₽</span>
            <button className="btn-sell-multi" onClick={sellSelected}>
              💰 Продать все
            </button>
            <button className="btn-clear" onClick={() => setSelected(new Set())}>
              <Icon name="X" size={14} />
            </button>
          </div>
        )}
      </div>

      {inventory.length === 0 ? (
        <div className="empty-state large">
          <span className="empty-icon">🎒</span>
          <h3>Инвентарь пуст</h3>
          <p>Откройте кейсы чтобы получить скины</p>
        </div>
      ) : (
        <div className="inventory-grid">
          {sorted.map(skin => (
            <div
              key={skin.id}
              className={`inv-item ${selected.has(skin.id) ? 'selected' : ''}`}
              style={{ '--rc': RARITY_COLORS[skin.rarity] } as React.CSSProperties}
            >
              <div className="inv-item__top" onClick={() => toggleSelect(skin.id)}>
                <div className="inv-item__rarity-bar" />
                <div className="inv-item__img">
                  <span>{getWeaponEmoji(skin.weapon)}</span>
                </div>
                {skin.wear && <span className="inv-item__wear">{skin.wear}</span>}
                {selected.has(skin.id) && <div className="inv-item__check">✓</div>}
              </div>
              <div className="inv-item__info">
                <div className="inv-item__weapon">{skin.weapon}</div>
                <div className="inv-item__finish">{skin.finish}</div>
                <div className="inv-item__rarity" style={{ color: RARITY_COLORS[skin.rarity] }}>
                  {RARITY_NAMES[skin.rarity]}
                </div>
                <div className="inv-item__price">{skin.price.toLocaleString('ru-RU')} ₽</div>
                <div className="inv-item__actions">
                  <button className="inv-btn sell" onClick={() => onSell(skin)}>Продать</button>
                  <button className="inv-btn withdraw" onClick={() => setWithdrawModal(skin)}>
                    <Icon name="Send" size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {withdrawModal && (
        <div className="modal-overlay" onClick={() => setWithdrawModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">📤 Вывод на Steam</h2>
              <button className="modal__close" onClick={() => setWithdrawModal(null)}>
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="withdraw-info">
              <div className="withdraw-skin">
                <span className="ws-emoji">{getWeaponEmoji(withdrawModal.weapon)}</span>
                <div>
                  <div className="ws-weapon">{withdrawModal.weapon}</div>
                  <div className="ws-finish">{withdrawModal.finish}</div>
                  <div className="ws-price" style={{ color: RARITY_COLORS[withdrawModal.rarity] }}>
                    {withdrawModal.price.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
              <div className="withdraw-form">
                <label className="withdraw-label">Steam Trade URL</label>
                <input className="withdraw-input" placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..." />
                <p className="withdraw-note">⏱ Обычное время вывода: 5-10 минут</p>
              </div>
              <button className="btn-primary" onClick={() => { onWithdraw(withdrawModal); setWithdrawModal(null); }}>
                Вывести на Steam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
