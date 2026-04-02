import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ReferralsPageProps {
  onDeposit: () => void;
}

const MOCK_REFS = [
  { name: 'Pro***er', joined: '28.03.2024', deposits: 2400, earned: 120, active: true },
  { name: 'Sni***45', joined: '15.03.2024', deposits: 800, earned: 40, active: true },
  { name: 'Fun***21', joined: '02.02.2024', deposits: 500, earned: 25, active: false },
];

export default function ReferralsPage({ onDeposit }: ReferralsPageProps) {
  const [copied, setCopied] = useState(false);
  const refCode = 'SKINDROP-USER01';
  const refLink = `https://skindrop.gg/r/${refCode}`;

  function copyLink() {
    navigator.clipboard.writeText(refLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const totalEarned = MOCK_REFS.reduce((s, r) => s + r.earned, 0);
  const totalRefs = MOCK_REFS.length;

  return (
    <div className="page referrals-page">
      <div className="page-header">
        <h1 className="page-title">👥 Реферальная программа</h1>
        <p className="page-sub">Приглашай друзей — получай 5% с их пополнений навсегда</p>
      </div>

      {/* Stats */}
      <div className="ref-stats">
        <div className="ref-stat-card">
          <div className="ref-stat-icon">👥</div>
          <div className="ref-stat-value">{totalRefs}</div>
          <div className="ref-stat-label">Рефералов</div>
        </div>
        <div className="ref-stat-card">
          <div className="ref-stat-icon">💰</div>
          <div className="ref-stat-value">{totalEarned.toLocaleString('ru-RU')} ₽</div>
          <div className="ref-stat-label">Заработано</div>
        </div>
        <div className="ref-stat-card">
          <div className="ref-stat-icon">📊</div>
          <div className="ref-stat-value">5%</div>
          <div className="ref-stat-label">Комиссия</div>
        </div>
        <div className="ref-stat-card highlight">
          <div className="ref-stat-icon">⭐</div>
          <div className="ref-stat-value">0 ₽</div>
          <div className="ref-stat-label">К выводу</div>
        </div>
      </div>

      {/* Ref link */}
      <div className="ref-link-section">
        <div className="ref-link-label">Ваша реферальная ссылка</div>
        <div className="ref-link-box">
          <span className="ref-link-text">{refLink}</span>
          <button className={`ref-copy-btn ${copied ? 'copied' : ''}`} onClick={copyLink}>
            <Icon name={copied ? 'Check' : 'Copy'} size={16} />
            {copied ? 'Скопировано!' : 'Копировать'}
          </button>
        </div>
        <div className="ref-code-row">
          <span className="ref-code-label">Промокод:</span>
          <span className="ref-code">{refCode}</span>
        </div>
      </div>

      {/* How it works */}
      <div className="ref-how">
        <h3 className="ref-how__title">Как это работает</h3>
        <div className="ref-steps">
          <div className="ref-step">
            <div className="ref-step__num">1</div>
            <div className="ref-step__text">Поделись ссылкой с другом</div>
          </div>
          <div className="ref-step__arrow">→</div>
          <div className="ref-step">
            <div className="ref-step__num">2</div>
            <div className="ref-step__text">Друг регистрируется и пополняет баланс</div>
          </div>
          <div className="ref-step__arrow">→</div>
          <div className="ref-step">
            <div className="ref-step__num">3</div>
            <div className="ref-step__text">Ты получаешь 5% с каждого его пополнения</div>
          </div>
        </div>
      </div>

      {/* Referrals list */}
      <div className="ref-list-section">
        <h3 className="ref-list-title">Ваши рефералы</h3>
        {MOCK_REFS.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">👥</span>
            <p>Пока нет рефералов. Поделись ссылкой!</p>
          </div>
        ) : (
          <div className="ref-list">
            <div className="ref-list-header">
              <span>Игрок</span>
              <span>Дата</span>
              <span>Пополнения</span>
              <span>Заработано</span>
              <span>Статус</span>
            </div>
            {MOCK_REFS.map((ref, i) => (
              <div key={i} className="ref-list-item">
                <span className="ref-player">{ref.name}</span>
                <span className="ref-date">{ref.joined}</span>
                <span className="ref-deposits">{ref.deposits.toLocaleString('ru-RU')} ₽</span>
                <span className="ref-earned">+{ref.earned} ₽</span>
                <span className={`ref-status ${ref.active ? 'active' : 'inactive'}`}>
                  {ref.active ? '🟢 Активен' : '⚪ Неактивен'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalEarned > 0 && (
        <div className="ref-withdraw-section">
          <button className="btn-primary" onClick={onDeposit}>
            💰 Вывести {totalEarned} ₽ на баланс
          </button>
        </div>
      )}
    </div>
  );
}
