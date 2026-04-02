import { useState } from 'react';
import { Skin, RARITY_COLORS, getWeaponEmoji, ALL_SKINS } from '@/data/skins';
import Icon from '@/components/ui/icon';

interface ContractsPageProps {
  inventory: Skin[];
  onContract: (items: Skin[], result: Skin) => void;
}

export default function ContractsPage({ inventory, onContract }: ContractsPageProps) {
  const [selected, setSelected] = useState<Skin[]>([]);
  const [result, setResult] = useState<Skin | null>(null);
  const [animating, setAnimating] = useState(false);

  const MAX = 10;
  const canContract = selected.length === MAX;

  const avgPrice = selected.length > 0
    ? Math.round(selected.reduce((s, x) => s + x.price, 0) / selected.length)
    : 0;
  const expectedPrice = Math.round(avgPrice * 1.8);

  function toggleSkin(skin: Skin) {
    if (result) return;
    setSelected(prev => {
      const exists = prev.find(s => s.id === skin.id);
      if (exists) return prev.filter(s => s.id !== skin.id);
      if (prev.length >= MAX) return prev;
      return [...prev, skin];
    });
  }

  function runContract() {
    if (!canContract || animating) return;
    setAnimating(true);

    const candidates = ALL_SKINS.filter(s =>
      s.price >= expectedPrice * 0.7 && s.price <= expectedPrice * 2
    );
    const winner = candidates[Math.floor(Math.random() * candidates.length)] || ALL_SKINS[0];

    setTimeout(() => {
      setResult(winner);
      setAnimating(false);
      onContract(selected, winner);
    }, 2000);
  }

  function reset() {
    setSelected([]);
    setResult(null);
  }

  return (
    <div className="page contracts-page">
      <div className="page-header">
        <h1 className="page-title">📄 Контракты</h1>
        <p className="page-sub">Обменяй 10 предметов на один более ценный</p>
      </div>

      <div className="contracts-layout">
        {/* Inventory */}
        <div className="contracts-inventory">
          <div className="contracts-inv-header">
            <span>Инвентарь</span>
            <span className="contracts-count">{inventory.length} предметов</span>
          </div>
          <div className="contracts-inv-grid">
            {inventory.map(skin => {
              const isSelected = selected.some(s => s.id === skin.id);
              return (
                <button
                  key={skin.id}
                  className={`contract-inv-item ${isSelected ? 'selected' : ''}`}
                  style={{ '--rc': RARITY_COLORS[skin.rarity] } as React.CSSProperties}
                  onClick={() => toggleSkin(skin)}
                  disabled={!!result}
                >
                  <span className="ci-emoji">{getWeaponEmoji(skin.weapon)}</span>
                  <span className="ci-name">{skin.finish}</span>
                  <span className="ci-price">{skin.price} ₽</span>
                  {isSelected && <div className="ci-check">✓</div>}
                </button>
              );
            })}
            {inventory.length === 0 && (
              <div className="empty-state">
                <span>📦</span>
                <p>Инвентарь пуст</p>
              </div>
            )}
          </div>
        </div>

        {/* Contract builder */}
        <div className="contracts-builder">
          <div className="contracts-slots-header">
            <span>Выбрано: {selected.length}/{MAX}</span>
          </div>
          <div className="contracts-slots">
            {Array.from({ length: MAX }).map((_, i) => {
              const skin = selected[i];
              return (
                <div
                  key={i}
                  className={`contract-slot ${skin ? 'filled' : 'empty'}`}
                  style={skin ? { borderColor: RARITY_COLORS[skin.rarity] } : {}}
                  onClick={() => skin && toggleSkin(skin)}
                >
                  {skin ? (
                    <>
                      <span className="cs-emoji">{getWeaponEmoji(skin.weapon)}</span>
                      <span className="cs-name">{skin.finish}</span>
                      <span className="cs-price">{skin.price} ₽</span>
                    </>
                  ) : (
                    <span className="cs-empty-num">{i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>

          {selected.length > 0 && (
            <div className="contract-info">
              <div className="contract-info-row">
                <span>Средняя цена:</span>
                <strong>{avgPrice.toLocaleString('ru-RU')} ₽</strong>
              </div>
              <div className="contract-info-row highlight">
                <span>Ожидаемая награда:</span>
                <strong>~{expectedPrice.toLocaleString('ru-RU')} ₽</strong>
              </div>
            </div>
          )}

          {result ? (
            <div className="contract-result">
              <div className="contract-result__label">🎉 Вы получили:</div>
              <div className="contract-result__item" style={{ borderColor: RARITY_COLORS[result.rarity] }}>
                <span className="cr-emoji">{getWeaponEmoji(result.weapon)}</span>
                <div className="cr-info">
                  <div className="cr-weapon">{result.weapon}</div>
                  <div className="cr-finish">{result.finish}</div>
                  <div className="cr-price" style={{ color: RARITY_COLORS[result.rarity] }}>
                    {result.price.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
              <button className="btn-primary" onClick={reset}>Новый контракт</button>
            </div>
          ) : (
            <button
              className={`btn-contract ${!canContract || animating ? 'disabled' : ''}`}
              onClick={runContract}
              disabled={!canContract || animating}
            >
              {animating ? (
                <>⏳ Обработка...</>
              ) : canContract ? (
                <><Icon name="Zap" size={18} /> Применить контракт</>
              ) : (
                `Выберите ${MAX - selected.length} ещё предметов`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
