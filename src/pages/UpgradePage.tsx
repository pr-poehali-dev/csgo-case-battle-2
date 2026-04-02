import { useState } from 'react';
import { Skin, ALL_SKINS, RARITY_COLORS, getWeaponEmoji } from '@/data/skins';
import SkinCard from '@/components/SkinCard';
import Icon from '@/components/ui/icon';

interface UpgradePageProps {
  inventory: Skin[];
  onUpgrade: (from: Skin, to: Skin, won: boolean) => void;
}

export default function UpgradePage({ inventory, onUpgrade }: UpgradePageProps) {
  const [fromSkin, setFromSkin] = useState<Skin | null>(null);
  const [toSkin, setToSkin] = useState<Skin | null>(null);
  const [multiplier, setMultiplier] = useState(2);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [angle, setAngle] = useState(0);

  const targetPrice = fromSkin ? Math.round(fromSkin.price * multiplier) : 0;

  const possibleTargets = ALL_SKINS
    .filter(s => {
      if (!fromSkin) return false;
      const minP = targetPrice * 0.8;
      const maxP = targetPrice * 1.3;
      return s.price >= minP && s.price <= maxP && s.id !== fromSkin.id;
    })
    .slice(0, 6);

  const winChance = fromSkin && toSkin
    ? Math.min(Math.round((fromSkin.price / toSkin.price) * 100), 95)
    : 0;

  function runUpgrade() {
    if (!fromSkin || !toSkin || spinning) return;
    setSpinning(true);
    setResult(null);

    const won = Math.random() * 100 < winChance;
    const spinAngle = 720 + (won ? 45 : 225);
    setAngle(prev => prev + spinAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(won ? 'win' : 'lose');
      onUpgrade(fromSkin, toSkin, won);
      if (!won) {
        setFromSkin(null);
        setToSkin(null);
      }
    }, 2500);
  }

  return (
    <div className="page upgrade-page">
      <div className="page-header">
        <h1 className="page-title">📈 Апгрейд скинов</h1>
        <p className="page-sub">Рискни своим скином ради более ценного предмета</p>
      </div>

      <div className="upgrade-layout">
        {/* FROM */}
        <div className="upgrade-panel">
          <div className="upgrade-panel__label">Ваш предмет</div>
          {fromSkin ? (
            <div className="upgrade-selected">
              <SkinCard skin={fromSkin} size="lg" />
              <button className="upgrade-clear" onClick={() => { setFromSkin(null); setResult(null); }}>
                <Icon name="X" size={16} /> Убрать
              </button>
            </div>
          ) : (
            <div className="upgrade-empty">
              <span className="upgrade-empty__icon">📦</span>
              <p>Выберите скин из инвентаря</p>
              <div className="inventory-mini">
                {inventory.slice(0, 8).map(s => (
                  <button key={s.id} className="inventory-mini-item" onClick={() => { setFromSkin(s); setResult(null); }}>
                    <span>{getWeaponEmoji(s.weapon)}</span>
                    <span className="inv-mini-price">{s.price} ₽</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wheel */}
        <div className="upgrade-center">
          <div className="multiplier-selector">
            {[1.5, 2, 3, 5, 10].map(m => (
              <button
                key={m}
                className={`mult-btn ${multiplier === m ? 'active' : ''}`}
                onClick={() => { setMultiplier(m); setToSkin(null); setResult(null); }}
              >
                x{m}
              </button>
            ))}
          </div>

          <div className={`upgrade-wheel ${spinning ? 'spinning' : ''}`}>
            <div className="wheel-outer" style={{ transform: `rotate(${angle}deg)` }}>
              <div className="wheel-win-zone" />
            </div>
            <div className="wheel-pointer" />
            {winChance > 0 && !spinning && (
              <div className="wheel-chance">{winChance}%</div>
            )}
            {result === 'win' && <div className="wheel-result win">WIN!</div>}
            {result === 'lose' && <div className="wheel-result lose">LOSE</div>}
          </div>

          <button
            className={`btn-upgrade ${!fromSkin || !toSkin || spinning ? 'disabled' : ''}`}
            onClick={runUpgrade}
            disabled={!fromSkin || !toSkin || spinning}
          >
            {spinning ? '⏳ Крутим...' : '🎰 Апгрейд!'}
          </button>
        </div>

        {/* TO */}
        <div className="upgrade-panel">
          <div className="upgrade-panel__label">Целевой предмет · ~{targetPrice.toLocaleString('ru-RU')} ₽</div>
          {toSkin ? (
            <div className="upgrade-selected">
              <SkinCard skin={toSkin} size="lg" />
              <button className="upgrade-clear" onClick={() => { setToSkin(null); setResult(null); }}>
                <Icon name="X" size={16} /> Убрать
              </button>
            </div>
          ) : fromSkin ? (
            <div className="targets-grid">
              {possibleTargets.length > 0 ? possibleTargets.map(s => (
                <button key={s.id} className="target-item" onClick={() => setToSkin(s)}
                  style={{ borderColor: RARITY_COLORS[s.rarity] }}>
                  <span className="target-emoji">{getWeaponEmoji(s.weapon)}</span>
                  <span className="target-name">{s.weapon} | {s.finish}</span>
                  <span className="target-price">{s.price.toLocaleString('ru-RU')} ₽</span>
                </button>
              )) : (
                <p className="no-targets">Нет подходящих предметов для x{multiplier}</p>
              )}
            </div>
          ) : (
            <div className="upgrade-empty">
              <span className="upgrade-empty__icon">🎯</span>
              <p>Сначала выберите исходный скин</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
