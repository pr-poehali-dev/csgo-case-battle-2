import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  balance: number;
  onDeposit: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'cases', label: 'Кейсы', icon: 'Package' },
  { id: 'upgrade', label: 'Апгрейд', icon: 'TrendingUp' },
  { id: 'contracts', label: 'Контракты', icon: 'FileText' },
  { id: 'inventory', label: 'Инвентарь', icon: 'Archive' },
  { id: 'history', label: 'История', icon: 'Clock' },
];

export default function Navbar({ currentPage, onNavigate, balance, onDeposit }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner mx-0 px-0 rounded-full">
        <button className="logo" onClick={() => onNavigate('home')}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">SKINDROP<span className="logo-accent">.GG</span></span>
        </button>

        <div className="nav-links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon name={item.icon} fallback="Circle" size={16} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <button className="balance-btn font-semibold" onClick={onDeposit}>
            <Icon name="Wallet" size={16} />
            <span>{balance.toLocaleString('ru-RU')} ₽</span>
            <span className="deposit-plus">+</span>
          </button>
          <button className="nav-link profile-btn" onClick={() => onNavigate('profile')}>
            <Icon name="User" size={20} />
            <span>Профиль</span>
          </button>
          <button className="nav-link referral-btn" onClick={() => onNavigate('referrals')}>
            <Icon name="Users" size={18} />
          </button>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
            >
              <Icon name={item.icon} fallback="Circle" size={18} />
              {item.label}
            </button>
          ))}
          <button className="mobile-nav-link" onClick={() => { onNavigate('profile'); setMobileOpen(false); }}>
            <Icon name="User" size={18} /> Профиль
          </button>
          <button className="mobile-nav-link" onClick={() => { onNavigate('referrals'); setMobileOpen(false); }}>
            <Icon name="Users" size={18} /> Рефералы
          </button>
        </div>
      )}
    </nav>
  );
}