import Icon from '@/components/ui/icon';

interface ProfilePageProps {
  balance: number;
  onDeposit: () => void;
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ balance, onDeposit, onNavigate }: ProfilePageProps) {
  return (
    <div className="page profile-page">
      <div className="page-header">
        <h1 className="page-title">👤 Профиль</h1>
      </div>

      <div className="profile-layout">
        {/* Avatar & info */}
        <div className="profile-card">
          <div className="profile-avatar">
            <span className="profile-avatar__emoji">👾</span>
            <div className="profile-avatar__ring" />
          </div>
          <div className="profile-username">Player_01</div>
          <div className="profile-level">
            <span className="level-badge">🏅 Уровень 7</span>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="ps-value">142</span>
              <span className="ps-label">Кейсов открыто</span>
            </div>
            <div className="profile-stat">
              <span className="ps-value">84,500 ₽</span>
              <span className="ps-label">Всего выиграно</span>
            </div>
            <div className="profile-stat">
              <span className="ps-value">23</span>
              <span className="ps-label">Апгрейдов</span>
            </div>
          </div>
        </div>

        <div className="profile-right">
          {/* Balance */}
          <div className="profile-balance-card">
            <div className="pb-label">Баланс</div>
            <div className="pb-amount">{balance.toLocaleString('ru-RU')} ₽</div>
            <button className="btn-primary" onClick={onDeposit}>
              <Icon name="Plus" size={18} />
              Пополнить
            </button>
          </div>

          {/* Steam */}
          <div className="profile-section-card">
            <div className="profile-section-title">
              <Icon name="Link" size={18} /> Steam аккаунт
            </div>
            <div className="steam-status not-linked">
              <span>⚠️ Steam не привязан</span>
            </div>
            <input className="profile-input" placeholder="Trade URL для вывода скинов" />
            <button className="btn-secondary">Привязать Steam</button>
          </div>

          {/* Settings */}
          <div className="profile-section-card">
            <div className="profile-section-title">
              <Icon name="Settings" size={18} /> Настройки
            </div>
            <div className="profile-settings">
              <div className="setting-row">
                <span>Звуковые эффекты</span>
                <div className="toggle active" />
              </div>
              <div className="setting-row">
                <span>Анимации открытия</span>
                <div className="toggle active" />
              </div>
              <div className="setting-row">
                <span>Уведомления</span>
                <div className="toggle" />
              </div>
            </div>
          </div>

          {/* Navigation shortcuts */}
          <div className="profile-shortcuts">
            <button className="shortcut-btn" onClick={() => onNavigate('history')}>
              <Icon name="Clock" size={18} /> История операций
            </button>
            <button className="shortcut-btn" onClick={() => onNavigate('referrals')}>
              <Icon name="Users" size={18} /> Реферальная программа
            </button>
            <button className="shortcut-btn" onClick={() => onNavigate('inventory')}>
              <Icon name="Archive" size={18} /> Мой инвентарь
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
