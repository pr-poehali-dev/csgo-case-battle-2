import { useState, useRef, useEffect } from 'react';
import { Case, Skin, RARITY_COLORS, RARITY_NAMES, getWeaponEmoji } from '@/data/skins';
import Icon from '@/components/ui/icon';

interface CaseOpenModalProps {
  caseItem: Case;
  onClose: () => void;
  onWin: (skin: Skin) => void;
  balance: number;
}

const WEIGHTS: Record<string, number> = {
  consumer: 40, industrial: 25, milspec: 18, restricted: 10,
  classified: 4, covert: 2, extraordinary: 0.8, contraband: 0.2,
};

function weightedRandom(items: Skin[]): Skin {
  const total = items.reduce((s, item) => s + (WEIGHTS[item.rarity] || 1), 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= WEIGHTS[item.rarity] || 1;
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

function buildReel(items: Skin[], winner: Skin, winnerPos = 46): Skin[] {
  const reel: Skin[] = Array.from({ length: 60 }, () => weightedRandom(items));
  reel[winnerPos] = winner;
  return reel;
}

const ITEM_W = 148; // px including gap

export default function CaseOpenModal({ caseItem, onClose, onWin, balance }: CaseOpenModalProps) {
  const [phase, setPhase] = useState<'preview' | 'spinning' | 'result'>('preview');
  const [reel, setReel] = useState<Skin[]>([]);
  const [winner, setWinner] = useState<Skin | null>(null);
  const [count, setCount] = useState(1);
  const [fast, setFast] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canOpen = balance >= caseItem.price * count;
  const duration = fast ? 1.6 : 4.0;

  function startSpin() {
    if (!canOpen) return;
    const w = weightedRandom(caseItem.items);
    const r = buildReel(caseItem.items, w);
    setReel(r);
    setWinner(w);
    setPhase('spinning');
    setTimeout(() => { setPhase('result'); onWin(w); }, (duration + 0.4) * 1000);
  }

  useEffect(() => {
    if (phase !== 'spinning' || !reelRef.current || !wrapRef.current) return;
    const el = reelRef.current;
    const containerW = wrapRef.current.clientWidth;
    const offset = 46 * ITEM_W - containerW / 2 + ITEM_W / 2 - 8;
    el.style.transition = 'none';
    el.style.transform = 'translateX(0px)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = `transform ${duration}s cubic-bezier(0.06, 0.85, 0.18, 1)`;
      el.style.transform = `translateX(-${offset}px)`;
    }));
  }, [phase, reel, duration]);

  function tryAgain() {
    setPhase('preview');
    setWinner(null);
    setReel([]);
  }

  const sortedItems = [...caseItem.items].sort((a, b) => b.price - a.price);

  return (
    <div className="co-overlay" onClick={phase === 'result' ? onClose : undefined}>
      <div className="co-modal" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="co-close" onClick={onClose}>
          <Icon name="X" size={18} />
        </button>

        {/* === PREVIEW === */}
        {phase === 'preview' && (
          <div className="co-preview">
            {/* Left: case info */}
            <div className="co-preview__left">
              <div className="co-case-badge">{caseItem.category}</div>
              <div className="co-case-icon">{caseItem.image}</div>
              <h2 className="co-case-name">{caseItem.name}</h2>
              <div className="co-case-meta">
                <span>{caseItem.items.length} предметов</span>
                <span>·</span>
                <span>до {Math.max(...caseItem.items.map(s => s.price)).toLocaleString('ru-RU')} ₽</span>
              </div>

              {/* Count */}
              <div className="co-count-row">
                {[1, 2, 3, 5].map(n => (
                  <button
                    key={n}
                    className={`co-count-btn ${count === n ? 'active' : ''}`}
                    onClick={() => setCount(n)}
                  >
                    ×{n}
                  </button>
                ))}
              </div>

              {/* Fast mode */}
              <label className="co-fast-toggle">
                <div className={`co-fast-switch ${fast ? 'on' : ''}`} onClick={() => setFast(f => !f)} />
                <span>Быстрое открытие</span>
              </label>

              {/* Open button */}
              <button
                className={`co-open-btn ${!canOpen ? 'disabled' : ''}`}
                onClick={startSpin}
                disabled={!canOpen}
              >
                {canOpen ? (
                  <>
                    <Icon name="Unlock" size={20} />
                    Открыть · {(caseItem.price * count).toLocaleString('ru-RU')} ₽
                  </>
                ) : (
                  <>
                    <Icon name="Lock" size={20} />
                    Недостаточно средств
                  </>
                )}
              </button>
            </div>

            {/* Right: items list */}
            <div className="co-preview__right">
              <div className="co-items-title">Содержимое кейса</div>
              <div className="co-items-list">
                {sortedItems.map(item => (
                  <div
                    key={item.id}
                    className="co-item-row"
                    style={{ '--rc': RARITY_COLORS[item.rarity] } as React.CSSProperties}
                  >
                    <div className="co-item-row__bar" />
                    <span className="co-item-row__emoji">{getWeaponEmoji(item.weapon)}</span>
                    <div className="co-item-row__info">
                      <span className="co-item-row__name">{item.weapon} | {item.finish}</span>
                      <span className="co-item-row__rarity" style={{ color: RARITY_COLORS[item.rarity] }}>
                        {RARITY_NAMES[item.rarity]}
                      </span>
                    </div>
                    <span className="co-item-row__price">{item.price.toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === SPINNING === */}
        {(phase === 'spinning' || (phase === 'result' && reel.length > 0 && !winner)) && (
          <div className="co-spin-stage">
            <div className="co-spin-bg">
              <div className="co-spin-bg__grid" />
            </div>
            <div className="co-spin-header">
              <span className="co-spin-case-icon">{caseItem.image}</span>
              <span className="co-spin-case-name">{caseItem.name}</span>
            </div>
            <div className="co-reel-area" ref={wrapRef}>
              {/* gradient masks */}
              <div className="co-reel-fade co-reel-fade--left" />
              <div className="co-reel-fade co-reel-fade--right" />
              {/* center marker */}
              <div className="co-reel-marker">
                <div className="co-reel-marker__top">▼</div>
                <div className="co-reel-marker__line" />
                <div className="co-reel-marker__bottom">▲</div>
              </div>
              <div className="co-reel-track">
                <div className="co-reel" ref={reelRef}>
                  {reel.map((skin, i) => (
                    <div
                      key={i}
                      className="co-reel-card"
                      style={{ '--rc': RARITY_COLORS[skin.rarity] } as React.CSSProperties}
                    >
                      <div className="co-reel-card__top-bar" />
                      <div className="co-reel-card__glow" />
                      <span className="co-reel-card__emoji">{getWeaponEmoji(skin.weapon)}</span>
                      <span className="co-reel-card__name">{skin.finish}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="co-spin-hint">
              {fast ? '⚡ Быстрый режим' : '🎰 Удача на вашей стороне...'}
            </p>
          </div>
        )}

        {/* === RESULT === */}
        {phase === 'result' && winner && (
          <div className="co-result">
            {/* ambient glow */}
            <div
              className="co-result-glow"
              style={{ background: `radial-gradient(circle, ${RARITY_COLORS[winner.rarity]}44 0%, transparent 70%)` }}
            />
            {/* confetti particles */}
            <div className="co-result-particles">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="co-particle"
                  style={{
                    '--angle': `${(i / 16) * 360}deg`,
                    '--dist': `${80 + Math.random() * 60}px`,
                    '--delay': `${Math.random() * 0.3}s`,
                    '--color': i % 3 === 0 ? RARITY_COLORS[winner.rarity] : i % 3 === 1 ? '#fff' : '#f0a500',
                  } as React.CSSProperties}
                />
              ))}
            </div>

            <div className="co-result-rarity" style={{ color: RARITY_COLORS[winner.rarity] }}>
              {RARITY_NAMES[winner.rarity]}
            </div>

            <div
              className="co-result-card"
              style={{ '--rc': RARITY_COLORS[winner.rarity] } as React.CSSProperties}
            >
              <div className="co-result-card__shine" />
              <div className="co-result-card__top-bar" />
              <div className="co-result-card__corner co-result-card__corner--tl" />
              <div className="co-result-card__corner co-result-card__corner--tr" />
              <div className="co-result-card__corner co-result-card__corner--bl" />
              <div className="co-result-card__corner co-result-card__corner--br" />
              <span className="co-result-card__emoji">{getWeaponEmoji(winner.weapon)}</span>
              {winner.wear && <span className="co-result-card__wear">{winner.wear}</span>}
            </div>

            <div className="co-result-info">
              <div className="co-result-weapon">{winner.weapon}</div>
              <div className="co-result-finish">| {winner.finish}</div>
              <div className="co-result-price" style={{ color: RARITY_COLORS[winner.rarity] }}>
                {winner.price.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <div className="co-result-actions">
              <button className="co-btn-sell" onClick={onClose}>
                <Icon name="DollarSign" size={16} />
                Продать
              </button>
              <button className="co-btn-keep" onClick={onClose}>
                <Icon name="Archive" size={16} />
                В инвентарь
              </button>
              <button className="co-btn-again" onClick={tryAgain}>
                <Icon name="RotateCcw" size={16} />
                Ещё раз
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
