import { useState, useRef, useEffect } from 'react';
import { Skin, ALL_SKINS, RARITY_COLORS, getWeaponEmoji } from '@/data/skins';
import Icon from '@/components/ui/icon';

interface UpgradePageProps {
  inventory: Skin[];
  onUpgrade: (from: Skin, to: Skin, won: boolean) => void;
}

const ARROW_COLORS = [
  { id: 'gold',   label: 'Золото',  hex: '#f0a500' },
  { id: 'neon',   label: 'Неон',    hex: '#00d4ff' },
  { id: 'purple', label: 'Фиолет', hex: '#a855f7' },
  { id: 'red',    label: 'Красный', hex: '#ef4444' },
  { id: 'green',  label: 'Зелёный', hex: '#22c55e' },
  { id: 'pink',   label: 'Розовый', hex: '#ec4899' },
  { id: 'white',  label: 'Белый',   hex: '#f1f5f9' },
];

const SPIN_MODES = [
  { id: 'normal', label: 'Обычная', icon: '🎯', desc: 'Плавная прокрутка', duration: 4000 },
  { id: 'gamble', label: 'Азартная', icon: '🎰', desc: 'Резкое замедление', duration: 3000 },
];

function polarToXY(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  if (endDeg - startDeg >= 360) {
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  }
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
}

export default function UpgradePage({ inventory, onUpgrade }: UpgradePageProps) {
  const [fromSkin, setFromSkin] = useState<Skin | null>(null);
  const [toSkin,   setToSkin]   = useState<Skin | null>(null);
  const [multiplier, setMultiplier] = useState(2);
  const [arrowColor, setArrowColor] = useState('#f0a500');
  const [spinMode, setSpinMode] = useState<'normal' | 'gamble'>('normal');
  const [phase,  setPhase]  = useState<'idle' | 'spinning' | 'result'>('idle');
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [angle,  setAngle]  = useState(0);
  const animRef    = useRef<number | null>(null);
  const startRef   = useRef(0);
  const fromAngle  = useRef(0);
  const targetAngle = useRef(0);
  const durRef     = useRef(4000);

  const targetPrice = fromSkin ? Math.round(fromSkin.price * multiplier) : 0;

  const possibleTargets = ALL_SKINS.filter(s => {
    if (!fromSkin) return false;
    return s.price >= targetPrice * 0.7 && s.price <= targetPrice * 1.5 && s.id !== fromSkin.id;
  }).slice(0, 12);

  const winChance = fromSkin && toSkin
    ? Math.min(Math.round((fromSkin.price / toSkin.price) * 100), 95)
    : 0;

  const winSectorDeg = (winChance / 100) * 360;

  function easeNormal(t: number) { return 1 - Math.pow(1 - t, 4); }
  function easeGamble(t: number) {
    if (t < 0.6) return t / 0.6 * 0.85;
    const s = (t - 0.6) / 0.4;
    return 0.85 + Math.sin(s * Math.PI * 1.5) * 0.05 * (1 - s) + s * 0.15;
  }

  function runUpgrade() {
    if (!fromSkin || !toSkin || phase !== 'idle') return;
    const won = Math.random() * 100 < winChance;
    setResult(null);

    const spins = spinMode === 'gamble' ? 8 : 5;
    const base  = spins * 360;
    let land: number;
    if (won) {
      land = winSectorDeg * 0.1 + Math.random() * winSectorDeg * 0.8;
    } else {
      const loseSize = 360 - winSectorDeg;
      land = winSectorDeg + loseSize * 0.1 + Math.random() * loseSize * 0.8;
    }

    fromAngle.current  = angle % 360;
    targetAngle.current = base + land;
    startRef.current    = performance.now();
    durRef.current      = SPIN_MODES.find(m => m.id === spinMode)!.duration;

    setPhase('spinning');

    const ease = spinMode === 'gamble' ? easeGamble : easeNormal;

    function tick(now: number) {
      const t = Math.min((now - startRef.current) / durRef.current, 1);
      const cur = fromAngle.current + targetAngle.current * ease(t);
      setAngle(cur);
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setAngle(fromAngle.current + targetAngle.current);
        setPhase('result');
        setResult(won ? 'win' : 'lose');
        onUpgrade(fromSkin!, toSkin!, won);
        if (!won) setTimeout(() => {
          setFromSkin(null); setToSkin(null);
          setPhase('idle'); setResult(null);
        }, 2200);
      }
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  function reset() {
    setFromSkin(null); setToSkin(null);
    setPhase('idle'); setResult(null); setAngle(0);
  }

  const displayAngle = angle % 360;

  return (
    <div className="upg2-page">
      {/* Header */}
      <div className="upg2-header">
        <div>
          <h1 className="page-title">⚡ Апгрейд</h1>
          <p className="page-sub">Поставь скин — выиграй лучше</p>
        </div>
        <div className="upg2-header-controls">
          <div className="upg2-mode-tabs">
            {SPIN_MODES.map(m => (
              <button
                key={m.id}
                className={`upg2-mode-tab ${spinMode === m.id ? 'active' : ''}`}
                onClick={() => setSpinMode(m.id as 'normal' | 'gamble')}
                disabled={phase === 'spinning'}
              >
                <span className="upg2-mode-tab__icon">{m.icon}</span>
                <span className="upg2-mode-tab__label">{m.label}</span>
                <span className="upg2-mode-tab__desc">{m.desc}</span>
              </button>
            ))}
          </div>
          <div className="upg2-mult-pills">
            {[1.5, 2, 3, 5, 10].map(m => (
              <button
                key={m}
                className={`upg2-mult-pill ${multiplier === m ? 'active' : ''}`}
                onClick={() => { setMultiplier(m); setToSkin(null); }}
                disabled={phase === 'spinning'}
              >×{m}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Arena */}
      <div className="upg2-arena">

        {/* FROM slot */}
        <div className="upg2-slot">
          <div className="upg2-slot__label">
            <div className="upg2-slot__dot" style={{ background: '#4b69ff' }} />
            Ваш скин
          </div>
          {fromSkin ? (
            <div className="upg2-skin-card" style={{ '--rc': RARITY_COLORS[fromSkin.rarity] } as React.CSSProperties}>
              <div className="upg2-skin-card__bar" />
              <div className="upg2-skin-card__shine" />
              <span className="upg2-skin-card__emoji">{getWeaponEmoji(fromSkin.weapon)}</span>
              <div className="upg2-skin-card__info">
                <div className="upg2-skin-card__weapon">{fromSkin.weapon}</div>
                <div className="upg2-skin-card__finish">{fromSkin.finish}</div>
                <div className="upg2-skin-card__price" style={{ color: RARITY_COLORS[fromSkin.rarity] }}>
                  {fromSkin.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <button className="upg2-skin-remove" onClick={() => { setFromSkin(null); setResult(null); setPhase('idle'); }}>
                <Icon name="X" size={13} />
              </button>
            </div>
          ) : (
            <div className="upg2-slot__empty">
              <span className="upg2-slot__empty-icon">📦</span>
              <p>Выбери скин ниже</p>
            </div>
          )}
        </div>

        {/* WHEEL */}
        <div className="upg2-wheel-wrap">
          {/* Color picker */}
          <div className="upg2-color-picker">
            <span className="upg2-color-label">Цвет стрелки</span>
            <div className="upg2-color-dots">
              {ARROW_COLORS.map(c => (
                <button
                  key={c.id}
                  className={`upg2-color-dot ${arrowColor === c.hex ? 'active' : ''}`}
                  style={{ background: c.hex, boxShadow: arrowColor === c.hex ? `0 0 12px ${c.hex}` : 'none' }}
                  title={c.label}
                  onClick={() => setArrowColor(c.hex)}
                />
              ))}
            </div>
          </div>

          {/* Wheel container */}
          <div className="upg2-wheel-outer">
            {/* Rotating disc */}
            <svg
              className="upg2-wheel-disc"
              viewBox="0 0 260 260"
              style={{ transform: `rotate(${displayAngle}deg)` }}
            >
              <defs>
                <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2a3550" />
                  <stop offset="100%" stopColor="#0f1117" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* BG */}
              <circle cx="130" cy="130" r="128" fill="#0f1117" />

              {/* WIN sector */}
              <path d={arcPath(130, 130, 118, 0, winSectorDeg)} fill="rgba(34,197,94,0.2)" />
              {/* LOSE sector */}
              {winSectorDeg < 360 && (
                <path d={arcPath(130, 130, 118, winSectorDeg, 360)} fill="rgba(239,68,68,0.16)" />
              )}

              {/* Outer ring */}
              <circle cx="130" cy="130" r="118" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

              {/* Separator line */}
              {winSectorDeg > 0 && winSectorDeg < 360 && (() => {
                const p = polarToXY(130, 130, 118, winSectorDeg);
                return <line x1="130" y1="130" x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />;
              })()}

              {/* Tick marks */}
              {Array.from({ length: 60 }).map((_, i) => {
                const deg  = i * 6;
                const big  = i % 5 === 0;
                const inner = big ? 104 : 110;
                const s = polarToXY(130, 130, inner, deg);
                const e = polarToXY(130, 130, 118, deg);
                return <line key={i} x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                  stroke="rgba(255,255,255,0.12)" strokeWidth={big ? 1.5 : 0.7} />;
              })}

              {/* WIN text */}
              {winChance > 10 && (() => {
                const p = polarToXY(130, 130, 78, winSectorDeg / 2);
                return <>
                  <circle cx={p.x} cy={p.y} r="18" fill="rgba(34,197,94,0.18)" />
                  <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                    fill="#4ade80" fontSize="10" fontWeight="800" fontFamily="Rajdhani,sans-serif" letterSpacing="1">WIN</text>
                </>;
              })()}

              {/* LOSE text */}
              {winChance < 90 && (() => {
                const mid = winSectorDeg + (360 - winSectorDeg) / 2;
                const p = polarToXY(130, 130, 78, mid);
                return <>
                  <circle cx={p.x} cy={p.y} r="18" fill="rgba(239,68,68,0.18)" />
                  <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                    fill="#f87171" fontSize="10" fontWeight="800" fontFamily="Rajdhani,sans-serif" letterSpacing="1">LOSE</text>
                </>;
              })()}

              {/* Hub */}
              <circle cx="130" cy="130" r="24" fill="url(#hubGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle cx="130" cy="130" r="6" fill="rgba(255,255,255,0.2)" />
            </svg>

            {/* Fixed arrow overlay */}
            <svg className="upg2-arrow-svg" viewBox="0 0 260 260">
              <defs>
                <filter id="arrowGlow">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Arrow pointing UP (12 o'clock) */}
              <g filter="url(#arrowGlow)">
                <polygon points="130,4 141,34 119,34" fill={arrowColor} />
                <rect x="127" y="34" width="6" height="74" rx="3" fill={arrowColor} />
              </g>
            </svg>

            {/* Center label */}
            <div className="upg2-wheel-center">
              {phase === 'idle' && (
                <div className="upg2-center-idle">
                  <span className="upg2-center-pct">{winChance > 0 ? `${winChance}%` : '—'}</span>
                  {winChance > 0 && <span className="upg2-center-sub">шанс</span>}
                </div>
              )}
              {phase === 'spinning' && (
                <div className="upg2-center-spin" style={{ color: arrowColor }}>⟳</div>
              )}
              {phase === 'result' && (
                <div className={`upg2-center-result ${result}`}>
                  {result === 'win' ? '✓' : '✗'}
                </div>
              )}
            </div>
          </div>

          {/* Go button */}
          <button
            className={`upg2-go-btn ${phase !== 'idle' || !fromSkin || !toSkin ? 'disabled' : ''}`}
            style={fromSkin && toSkin && phase === 'idle' ? {
              background: `linear-gradient(135deg, ${arrowColor}cc, ${arrowColor}88)`,
              boxShadow: `0 6px 28px ${arrowColor}55`,
              color: '#000',
            } : {}}
            onClick={runUpgrade}
            disabled={phase !== 'idle' || !fromSkin || !toSkin}
          >
            {phase === 'spinning' ? '⏳ Вращается...'
              : phase === 'result' ? (result === 'win' ? '🏆 Победа!' : '💀 Проигрыш')
              : <><Icon name="Zap" size={18} /> Апгрейд!</>}
          </button>

          {phase === 'result' && result === 'win' && (
            <button className="upg2-reset-btn" onClick={reset}>
              <Icon name="RotateCcw" size={14} /> Новый апгрейд
            </button>
          )}

          {fromSkin && toSkin && (
            <div className="upg2-price-row">
              <span className="upg2-price-from">{fromSkin.price.toLocaleString('ru-RU')} ₽</span>
              <span className="upg2-price-arrow" style={{ color: arrowColor }}>→ ×{multiplier} →</span>
              <span className="upg2-price-to">{toSkin.price.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}
        </div>

        {/* TO slot */}
        <div className="upg2-slot">
          <div className="upg2-slot__label">
            <div className="upg2-slot__dot" style={{ background: arrowColor }} />
            Цель · ~{targetPrice > 0 ? targetPrice.toLocaleString('ru-RU') + ' ₽' : '???'}
          </div>
          {toSkin ? (
            <div className="upg2-skin-card upg2-skin-card--target" style={{ '--rc': RARITY_COLORS[toSkin.rarity] } as React.CSSProperties}>
              <div className="upg2-skin-card__bar" />
              <div className="upg2-skin-card__shine" />
              <span className="upg2-skin-card__emoji">{getWeaponEmoji(toSkin.weapon)}</span>
              <div className="upg2-skin-card__info">
                <div className="upg2-skin-card__weapon">{toSkin.weapon}</div>
                <div className="upg2-skin-card__finish">{toSkin.finish}</div>
                <div className="upg2-skin-card__price" style={{ color: RARITY_COLORS[toSkin.rarity] }}>
                  {toSkin.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <button className="upg2-skin-remove" onClick={() => { setToSkin(null); setResult(null); setPhase('idle'); }}>
                <Icon name="X" size={13} />
              </button>
            </div>
          ) : fromSkin ? (
            <div className="upg2-targets">
              {possibleTargets.length > 0 ? possibleTargets.map(s => (
                <button key={s.id} className="upg2-target-row"
                  style={{ '--rc': RARITY_COLORS[s.rarity] } as React.CSSProperties}
                  onClick={() => setToSkin(s)}>
                  <div className="upg2-target-row__bar" />
                  <span className="upg2-target-row__emoji">{getWeaponEmoji(s.weapon)}</span>
                  <div className="upg2-target-row__info">
                    <span className="upg2-target-row__name">{s.weapon} | {s.finish}</span>
                    <span className="upg2-target-row__price">{s.price.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Icon name="ChevronRight" size={15} />
                </button>
              )) : (
                <div className="upg2-slot__empty">
                  <span>🔍</span><p>Нет предметов для ×{multiplier}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="upg2-slot__empty">
              <span className="upg2-slot__empty-icon">🎯</span>
              <p>Сначала выбери скин слева</p>
            </div>
          )}
        </div>
      </div>

      {/* Inventory strip */}
      {phase === 'idle' && !fromSkin && (
        <div className="upg2-inv-section">
          <div className="upg2-inv-title">
            <Icon name="Archive" size={15} />
            Инвентарь — выбери скин для апгрейда
          </div>
          <div className="upg2-inv-strip">
            {inventory.length > 0 ? inventory.map(s => (
              <button key={s.id} className="upg2-inv-card"
                style={{ '--rc': RARITY_COLORS[s.rarity] } as React.CSSProperties}
                onClick={() => setFromSkin(s)}>
                <div className="upg2-inv-card__bar" />
                <span className="upg2-inv-card__emoji">{getWeaponEmoji(s.weapon)}</span>
                {s.wear && <span className="upg2-inv-card__wear">{s.wear}</span>}
                <div className="upg2-inv-card__name">{s.finish}</div>
                <div className="upg2-inv-card__price">{s.price.toLocaleString('ru-RU')} ₽</div>
              </button>
            )) : (
              <div className="upg2-inv-empty">
                <Icon name="Package" size={18} />
                <span>Инвентарь пуст. Сначала открой кейс.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
