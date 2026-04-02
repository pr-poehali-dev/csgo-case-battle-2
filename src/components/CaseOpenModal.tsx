import { useState, useRef, useEffect } from 'react';
import { Case, Skin, RARITY_COLORS, getWeaponEmoji } from '@/data/skins';
import Icon from '@/components/ui/icon';

interface CaseOpenModalProps {
  caseItem: Case;
  onClose: () => void;
  onWin: (skin: Skin) => void;
  balance: number;
}

function weightedRandom(items: Skin[]): Skin {
  const weights: Record<string, number> = {
    consumer: 40, industrial: 25, milspec: 18, restricted: 10,
    classified: 4, covert: 2, extraordinary: 0.8, contraband: 0.2,
  };
  const total = items.reduce((s, item) => s + (weights[item.rarity] || 1), 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= weights[item.rarity] || 1;
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

function generateReel(items: Skin[], winner: Skin): Skin[] {
  const reel: Skin[] = [];
  for (let i = 0; i < 55; i++) {
    reel.push(weightedRandom(items));
  }
  reel[48] = winner;
  return reel;
}

export default function CaseOpenModal({ caseItem, onClose, onWin, balance }: CaseOpenModalProps) {
  const [phase, setPhase] = useState<'preview' | 'spinning' | 'result'>('preview');
  const [reel, setReel] = useState<Skin[]>([]);
  const [winner, setWinner] = useState<Skin | null>(null);
  const [count, setCount] = useState(1);
  const reelRef = useRef<HTMLDivElement>(null);

  const canOpen = balance >= caseItem.price * count;

  function startSpin() {
    if (!canOpen) return;
    const w = weightedRandom(caseItem.items);
    const r = generateReel(caseItem.items, w);
    setReel(r);
    setWinner(w);
    setPhase('spinning');

    setTimeout(() => {
      setPhase('result');
      onWin(w);
    }, 4200);
  }

  useEffect(() => {
    if (phase === 'spinning' && reelRef.current) {
      const itemW = 140;
      const offset = 48 * itemW - (reelRef.current.clientWidth / 2) + itemW / 2;
      reelRef.current.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
      reelRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [phase, reel]);

  return (
    <div className="modal-overlay" onClick={phase === 'result' ? onClose : undefined}>
      <div className="case-modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close case-modal__close" onClick={onClose}>
          <Icon name="X" size={20} />
        </button>

        {phase === 'preview' && (
          <div className="case-open-preview">
            <div className="case-open-emoji">{caseItem.image}</div>
            <h2 className="case-open-name">{caseItem.name}</h2>
            <div className="case-open-items">
              {caseItem.items.slice(0, 10).map(item => (
                <div
                  key={item.id}
                  className="case-preview-item"
                  style={{ borderColor: RARITY_COLORS[item.rarity] }}
                >
                  <span>{getWeaponEmoji(item.weapon)}</span>
                  <span className="case-preview-item__name">{item.finish}</span>
                  <span className="case-preview-item__price">{item.price.toLocaleString('ru-RU')} ₽</span>
                </div>
              ))}
              {caseItem.items.length > 10 && (
                <div className="case-preview-more">+{caseItem.items.length - 10} ещё</div>
              )}
            </div>
            <div className="case-open-controls">
              <div className="count-selector">
                {[1, 2, 3, 5].map(n => (
                  <button
                    key={n}
                    className={`count-btn ${count === n ? 'active' : ''}`}
                    onClick={() => setCount(n)}
                  >
                    x{n}
                  </button>
                ))}
              </div>
              <button
                className={`btn-open ${!canOpen ? 'disabled' : ''}`}
                onClick={startSpin}
                disabled={!canOpen}
              >
                {canOpen
                  ? `🔓 Открыть · ${(caseItem.price * count).toLocaleString('ru-RU')} ₽`
                  : '💸 Недостаточно средств'
                }
              </button>
            </div>
          </div>
        )}

        {phase === 'spinning' && (
          <div className="case-reel-container">
            <div className="reel-arrow top">▼</div>
            <div className="reel-wrapper">
              <div className="reel" ref={reelRef}>
                {reel.map((skin, i) => (
                  <div
                    key={i}
                    className="reel-item"
                    style={{ borderColor: RARITY_COLORS[skin.rarity] }}
                  >
                    <span className="reel-item__emoji">{getWeaponEmoji(skin.weapon)}</span>
                    <span className="reel-item__name">{skin.finish}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reel-arrow bottom">▲</div>
            <div className="reel-glow" />
          </div>
        )}

        {phase === 'result' && winner && (
          <div className="case-result">
            <div className="result-glow" style={{ background: RARITY_COLORS[winner.rarity] }} />
            <div className="result-particles">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="particle" style={{ '--i': i } as React.CSSProperties} />
              ))}
            </div>
            <div className="result-item">
              <div
                className="result-item__box"
                style={{ borderColor: RARITY_COLORS[winner.rarity] }}
              >
                <span className="result-item__emoji">{getWeaponEmoji(winner.weapon)}</span>
              </div>
              <div className="result-item__weapon">{winner.weapon}</div>
              <div className="result-item__finish">{winner.finish}</div>
              <div className="result-item__price" style={{ color: RARITY_COLORS[winner.rarity] }}>
                {winner.price.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            <div className="result-actions">
              <button className="btn-sell" onClick={onClose}>💰 Продать</button>
              <button className="btn-keep" onClick={onClose}>🎒 В инвентарь</button>
              <button className="btn-open" onClick={() => { setPhase('preview'); setWinner(null); }}>
                🔄 Открыть ещё
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
