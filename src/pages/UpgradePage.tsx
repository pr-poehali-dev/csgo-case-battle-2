import { useState, useRef, useEffect } from 'react';
import { Skin, ALL_SKINS, RARITY_COLORS, getWeaponEmoji } from '@/data/skins';
import Icon from '@/components/ui/icon';

interface UpgradePageProps {
  inventory: Skin[];
  onUpgrade: (from: Skin, to: Skin, won: boolean) => void;
}

function ReelStrip({ items, running, won, onStop }: {
  items: Skin[];
  running: boolean;
  won: boolean | null;
  onStop: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running || !ref.current) return;
    const el = ref.current;
    const itemW = 112;
    const winnerIdx = 28;
    const offset = winnerIdx * itemW - el.parentElement!.clientWidth / 2 + itemW / 2;
    el.style.transition = 'none';
    el.style.transform = 'translateX(0px)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'transform 3.2s cubic-bezier(0.08, 0.82, 0.17, 1)';
        el.style.transform = `translateX(-${offset}px)`;
      });
    });
    const t = setTimeout(onStop, 3300);
    return () => clearTimeout(t);
  }, [running]);

  return (
    <div className="upg-reel" ref={ref}>
      {items.map((skin, i) => (
        <div
          key={i}
          className={`upg-reel-item ${i === 28 && won !== null ? (won ? 'winner-item' : 'loser-item') : ''}`}
          style={{ borderColor: RARITY_COLORS[skin.rarity] }}
        >
          <div className="upg-reel-item__glow" style={{ background: RARITY_COLORS[skin.rarity] }} />
          <span className="upg-reel-item__emoji">{getWeaponEmoji(skin.weapon)}</span>
          <span className="upg-reel-item__name">{skin.finish}</span>
          <span className="upg-reel-item__price">{skin.price.toLocaleString('ru-RU')} ₽</span>
        </div>
      ))}
    </div>
  );
}

function buildReel(items: Skin[], winner: Skin): Skin[] {
  const pool = items.length ? items : ALL_SKINS.slice(0, 10);
  const reel: Skin[] = [];
  for (let i = 0; i < 50; i++) {
    reel.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  reel[28] = winner;
  return reel;
}

export default function UpgradePage({ inventory, onUpgrade }: UpgradePageProps) {
  const [fromSkin, setFromSkin] = useState<Skin | null>(null);
  const [toSkin, setToSkin] = useState<Skin | null>(null);
  const [multiplier, setMultiplier] = useState(2);
  const [phase, setPhase] = useState<'idle' | 'spinning' | 'result'>('idle');
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [fromReel, setFromReel] = useState<Skin[]>([]);
  const [toReel, setToReel] = useState<Skin[]>([]);
  const [stopped, setStopped] = useState(0);

  const targetPrice = fromSkin ? Math.round(fromSkin.price * multiplier) : 0;

  const possibleTargets = ALL_SKINS.filter(s => {
    if (!fromSkin) return false;
    const minP = targetPrice * 0.7;
    const maxP = targetPrice * 1.5;
    return s.price >= minP && s.price <= maxP && s.id !== fromSkin.id;
  }).slice(0, 12);

  const winChance = fromSkin && toSkin
    ? Math.min(Math.round((fromSkin.price / toSkin.price) * 100), 95)
    : 0;

  function runUpgrade() {
    if (!fromSkin || !toSkin || phase !== 'idle') return;
    const won = Math.random() * 100 < winChance;
    setResult(null);
    setStopped(0);

    const fReel = buildReel(inventory, fromSkin);
    const tReel = buildReel(possibleTargets.length ? possibleTargets : ALL_SKINS.slice(0, 10), toSkin);
    setFromReel(fReel);
    setToReel(tReel);
    setPhase('spinning');

    setTimeout(() => {
      setResult(won ? 'win' : 'lose');
      setPhase('result');
      onUpgrade(fromSkin, toSkin, won);
      if (!won) {
        setTimeout(() => {
          setFromSkin(null);
          setToSkin(null);
          setPhase('idle');
          setResult(null);
        }, 2400);
      }
    }, 3500);
  }

  function reset() {
    setFromSkin(null);
    setToSkin(null);
    setPhase('idle');
    setResult(null);
    setFromReel([]);
    setToReel([]);
  }

  const showReel = phase === 'spinning' || phase === 'result';

  return (
    <div className="page upgrade-page-v2">
      {/* Header */}
      <div className="upg-header">
        <div>
          <h1 className="page-title">⚡ Апгрейд</h1>
          <p className="page-sub">Поставь скин — получи лучше</p>
        </div>
        <div className="upg-mult-row">
          {[1.5, 2, 3, 5, 10].map(m => (
            <button
              key={m}
              className={`upg-mult-btn ${multiplier === m ? 'active' : ''}`}
              onClick={() => { setMultiplier(m); setToSkin(null); setPhase('idle'); setResult(null); }}
              disabled={phase === 'spinning'}
            >
              <span className="mult-x">×{m}</span>
              <span className="mult-sub">{m < 2 ? 'safe' : m < 5 ? 'risk' : 'yolo'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main arena */}
      <div className="upg-arena">

        {/* FROM skin */}
        <div className="upg-side upg-side--from">
          <div className="upg-side__label">
            <span className="upg-side__dot" style={{ background: '#4b69ff' }} />
            Ваш скин
          </div>

          {!showReel ? (
            fromSkin ? (
              <div className="upg-skin-display" style={{ '--rc': RARITY_COLORS[fromSkin.rarity] } as React.CSSProperties}>
                <div className="upg-skin-card">
                  <div className="upg-skin-card__shine" />
                  <div className="upg-skin-card__rarity-line" />
                  <span className="upg-skin-card__emoji">{getWeaponEmoji(fromSkin.weapon)}</span>
                  <div className="upg-skin-card__info">
                    <div className="upg-skin-card__weapon">{fromSkin.weapon}</div>
                    <div className="upg-skin-card__finish">{fromSkin.finish}</div>
                    <div className="upg-skin-card__price" style={{ color: RARITY_COLORS[fromSkin.rarity] }}>
                      {fromSkin.price.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <button className="upg-skin-remove" onClick={() => { setFromSkin(null); setResult(null); }}>
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="upg-skin-empty">
                <div className="upg-empty-icon">📦</div>
                <p>Выбери скин</p>
              </div>
            )
          ) : (
            <div className="upg-reel-stage upg-reel-stage--from">
              <div className="upg-reel-mask" />
              <div className="upg-reel-wrapper">
                <ReelStrip
                  items={fromReel}
                  running={phase === 'spinning'}
                  won={result === 'win' ? true : result === 'lose' ? false : null}
                  onStop={() => setStopped(p => p + 1)}
                />
              </div>
              <div className="upg-reel-center-line" />
            </div>
          )}
        </div>

        {/* Center */}
        <div className="upg-center-panel">
          {/* Chance arc */}
          <div className="upg-chance-ring">
            <svg viewBox="0 0 120 120" className="upg-chance-svg">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke={winChance > 60 ? '#4caf50' : winChance > 30 ? '#f0a500' : '#eb4b4b'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(winChance / 100) * 326.7} 326.7`}
                strokeDashoffset="81.7"
                style={{ transition: 'all 0.6s ease', filter: `drop-shadow(0 0 8px ${winChance > 60 ? '#4caf50' : winChance > 30 ? '#f0a500' : '#eb4b4b'})` }}
              />
            </svg>
            <div className="upg-chance-inner">
              {phase === 'result' ? (
                <div className={`upg-result-badge ${result}`}>
                  {result === 'win' ? '🏆' : '💀'}
                  <span>{result === 'win' ? 'WIN' : 'LOSE'}</span>
                </div>
              ) : (
                <>
                  <span className="upg-chance-num">{winChance > 0 ? winChance : '—'}%</span>
                  <span className="upg-chance-label">шанс</span>
                </>
              )}
            </div>
          </div>

          {/* VS */}
          <div className="upg-vs">VS</div>

          {/* Arrow price */}
          {fromSkin && toSkin && (
            <div className="upg-price-flow">
              <span className="upg-price-from">{fromSkin.price.toLocaleString('ru-RU')} ₽</span>
              <div className="upg-price-arrow">
                <div className="upg-price-arrow__line" />
                <div className="upg-price-arrow__mult">×{multiplier}</div>
              </div>
              <span className="upg-price-to">{toSkin.price.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}

          <button
            className={`upg-go-btn ${phase !== 'idle' || !fromSkin || !toSkin ? 'disabled' : ''}`}
            onClick={runUpgrade}
            disabled={phase !== 'idle' || !fromSkin || !toSkin}
          >
            {phase === 'spinning' ? (
              <><span className="upg-go-spin">⟳</span> Крутится...</>
            ) : phase === 'result' ? (
              result === 'win' ? '🎉 Вы выиграли!' : '💀 Потеряно'
            ) : (
              <><Icon name="Zap" size={18} /> Апгрейд</>
            )}
          </button>

          {phase === 'result' && (
            <button className="upg-reset-btn" onClick={reset}>
              <Icon name="RotateCcw" size={14} /> Новый апгрейд
            </button>
          )}
        </div>

        {/* TO skin */}
        <div className="upg-side upg-side--to">
          <div className="upg-side__label">
            <span className="upg-side__dot" style={{ background: '#f0a500' }} />
            Цель · ~{targetPrice > 0 ? targetPrice.toLocaleString('ru-RU') + ' ₽' : '???'}
          </div>

          {!showReel ? (
            toSkin ? (
              <div className="upg-skin-display" style={{ '--rc': RARITY_COLORS[toSkin.rarity] } as React.CSSProperties}>
                <div className="upg-skin-card upg-skin-card--target">
                  <div className="upg-skin-card__shine" />
                  <div className="upg-skin-card__rarity-line" />
                  <span className="upg-skin-card__emoji">{getWeaponEmoji(toSkin.weapon)}</span>
                  <div className="upg-skin-card__info">
                    <div className="upg-skin-card__weapon">{toSkin.weapon}</div>
                    <div className="upg-skin-card__finish">{toSkin.finish}</div>
                    <div className="upg-skin-card__price" style={{ color: RARITY_COLORS[toSkin.rarity] }}>
                      {toSkin.price.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <button className="upg-skin-remove" onClick={() => { setToSkin(null); setResult(null); }}>
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
            ) : fromSkin ? (
              <div className="upg-targets-scroll">
                {possibleTargets.length > 0 ? possibleTargets.map(s => (
                  <button
                    key={s.id}
                    className="upg-target-card"
                    style={{ '--rc': RARITY_COLORS[s.rarity] } as React.CSSProperties}
                    onClick={() => setToSkin(s)}
                  >
                    <div className="upg-target-card__bar" />
                    <span className="upg-target-card__emoji">{getWeaponEmoji(s.weapon)}</span>
                    <div className="upg-target-card__info">
                      <span className="upg-target-card__name">{s.weapon} | {s.finish}</span>
                      <span className="upg-target-card__price">{s.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="upg-target-card__arrow" />
                  </button>
                )) : (
                  <div className="upg-skin-empty">
                    <div className="upg-empty-icon">🔍</div>
                    <p>Нет предметов для ×{multiplier}.<br />Попробуй другой множитель.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="upg-skin-empty">
                <div className="upg-empty-icon">🎯</div>
                <p>Сначала выбери исходный скин</p>
              </div>
            )
          ) : (
            <div className="upg-reel-stage upg-reel-stage--to">
              <div className="upg-reel-mask" />
              <div className="upg-reel-wrapper">
                <ReelStrip
                  items={toReel}
                  running={phase === 'spinning'}
                  won={result === 'win' ? true : result === 'lose' ? false : null}
                  onStop={() => setStopped(p => p + 1)}
                />
              </div>
              <div className="upg-reel-center-line" />
            </div>
          )}
        </div>
      </div>

      {/* Inventory picker */}
      {!fromSkin && phase === 'idle' && (
        <div className="upg-inv-section">
          <div className="upg-inv-title">
            <Icon name="Archive" size={16} />
            Инвентарь · выбери скин для апгрейда
          </div>
          <div className="upg-inv-strip">
            {inventory.length > 0 ? inventory.map(s => (
              <button
                key={s.id}
                className="upg-inv-card"
                style={{ '--rc': RARITY_COLORS[s.rarity] } as React.CSSProperties}
                onClick={() => { setFromSkin(s); setResult(null); }}
              >
                <div className="upg-inv-card__top">
                  <div className="upg-inv-card__bar" />
                  <span className="upg-inv-card__emoji">{getWeaponEmoji(s.weapon)}</span>
                  {s.wear && <span className="upg-inv-card__wear">{s.wear}</span>}
                </div>
                <div className="upg-inv-card__info">
                  <div className="upg-inv-card__name">{s.finish}</div>
                  <div className="upg-inv-card__price">{s.price.toLocaleString('ru-RU')} ₽</div>
                </div>
              </button>
            )) : (
              <div className="upg-inv-empty">
                <Icon name="Package" size={20} />
                <span>Инвентарь пуст. Сначала открой кейс.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
