import { Skin, RARITY_COLORS, getWeaponEmoji } from '@/data/skins';

interface HistoryEntry {
  id: string;
  type: 'case_open' | 'upgrade_win' | 'upgrade_lose' | 'contract' | 'deposit' | 'withdraw' | 'sell';
  skin?: Skin;
  amount?: number;
  caseName?: string;
  time: Date;
}

interface HistoryPageProps {
  history: HistoryEntry[];
}

const TYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  case_open: { label: 'Открытие кейса', icon: '📦', color: '#4b69ff' },
  upgrade_win: { label: 'Апгрейд: победа', icon: '📈', color: '#4caf50' },
  upgrade_lose: { label: 'Апгрейд: проигрыш', icon: '📉', color: '#eb4b4b' },
  contract: { label: 'Контракт', icon: '📄', color: '#caab05' },
  deposit: { label: 'Пополнение', icon: '💰', color: '#4caf50' },
  withdraw: { label: 'Вывод на Steam', icon: '📤', color: '#8847ff' },
  sell: { label: 'Продажа', icon: '💸', color: '#ff9800' },
};

function formatTime(date: Date): string {
  return date.toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function HistoryPage({ history }: HistoryPageProps) {
  if (history.length === 0) {
    return (
      <div className="page history-page">
        <div className="page-header">
          <h1 className="page-title">🕐 История</h1>
        </div>
        <div className="empty-state large">
          <span className="empty-icon">📋</span>
          <h3>История пуста</h3>
          <p>Здесь будут отображаться все ваши действия</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page history-page">
      <div className="page-header">
        <h1 className="page-title">🕐 История</h1>
        <span className="page-sub">{history.length} записей</span>
      </div>

      <div className="history-list">
        {history.map(entry => {
          const meta = TYPE_LABELS[entry.type] || { label: entry.type, icon: '❓', color: '#fff' };
          return (
            <div key={entry.id} className="history-item">
              <div className="history-item__icon" style={{ background: meta.color + '22', color: meta.color }}>
                {meta.icon}
              </div>
              <div className="history-item__info">
                <div className="history-item__type">{meta.label}</div>
                {entry.caseName && (
                  <div className="history-item__case">{entry.caseName}</div>
                )}
                {entry.skin && (
                  <div className="history-item__skin">
                    <span>{getWeaponEmoji(entry.skin.weapon)}</span>
                    <span>{entry.skin.weapon} | {entry.skin.finish}</span>
                  </div>
                )}
                <div className="history-item__time">{formatTime(entry.time)}</div>
              </div>
              <div className="history-item__value">
                {entry.skin && (
                  <span
                    className="history-item__price"
                    style={{ color: RARITY_COLORS[entry.skin.rarity] }}
                  >
                    {entry.skin.price.toLocaleString('ru-RU')} ₽
                  </span>
                )}
                {entry.amount && !entry.skin && (
                  <span className={`history-item__amount ${entry.type === 'deposit' ? 'green' : ''}`}>
                    {entry.type === 'deposit' ? '+' : ''}{entry.amount.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type { HistoryEntry };
