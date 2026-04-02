import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface DepositModalProps {
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const AMOUNTS = [100, 300, 500, 1000, 2000, 5000];
const METHODS = [
  { id: 'card', label: 'Карта РФ', icon: '💳', desc: 'Visa / Mastercard / МИР' },
  { id: 'sbp', label: 'СБП', icon: '⚡', desc: 'Система быстрых платежей' },
  { id: 'qiwi', label: 'QIWI', icon: '🥝', desc: 'QIWI Кошелёк' },
  { id: 'yoo', label: 'ЮMoney', icon: '💰', desc: 'Яндекс Пэй' },
];

export default function DepositModal({ onClose, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState(500);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState('sbp');
  const [step, setStep] = useState<'amount' | 'success'>('amount');

  const finalAmount = custom ? parseInt(custom) || 0 : amount;

  function handlePay() {
    if (finalAmount >= 50) {
      onDeposit(finalAmount);
      setStep('success');
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">💰 Пополнение баланса</h2>
          <button className="modal__close" onClick={onClose}>
            <Icon name="X" size={20} />
          </button>
        </div>

        {step === 'success' ? (
          <div className="modal__success">
            <div className="success-icon">✅</div>
            <h3>Баланс пополнен!</h3>
            <p>+{finalAmount.toLocaleString('ru-RU')} ₽ зачислено на ваш счёт</p>
            <button className="btn-primary" onClick={onClose}>Закрыть</button>
          </div>
        ) : (
          <>
            <div className="modal__section">
              <div className="modal__label">Сумма пополнения</div>
              <div className="amount-grid">
                {AMOUNTS.map(a => (
                  <button
                    key={a}
                    className={`amount-btn ${!custom && amount === a ? 'active' : ''}`}
                    onClick={() => { setAmount(a); setCustom(''); }}
                  >
                    {a.toLocaleString('ru-RU')} ₽
                  </button>
                ))}
              </div>
              <input
                className="amount-input"
                placeholder="Своя сумма (мин. 50 ₽)"
                value={custom}
                onChange={e => setCustom(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="modal__section">
              <div className="modal__label">Способ оплаты</div>
              <div className="methods-grid">
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    className={`method-btn ${method === m.id ? 'active' : ''}`}
                    onClick={() => setMethod(m.id)}
                  >
                    <span className="method-icon">{m.icon}</span>
                    <span className="method-name">{m.label}</span>
                    <span className="method-desc">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn-primary btn-pay"
              onClick={handlePay}
              disabled={finalAmount < 50}
            >
              Оплатить {finalAmount > 0 ? finalAmount.toLocaleString('ru-RU') + ' ₽' : ''}
            </button>
            <p className="modal__note">🔒 Безопасная оплата. Деньги зачисляются мгновенно.</p>
          </>
        )}
      </div>
    </div>
  );
}
