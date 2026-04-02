import { useState } from 'react';
import Navbar from '@/components/Navbar';
import DepositModal from '@/components/DepositModal';
import CaseOpenModal from '@/components/CaseOpenModal';
import HomePage from './HomePage';
import CasesPage from './CasesPage';
import UpgradePage from './UpgradePage';
import ContractsPage from './ContractsPage';
import InventoryPage from './InventoryPage';
import HistoryPage, { HistoryEntry } from './HistoryPage';
import ProfilePage from './ProfilePage';
import ReferralsPage from './ReferralsPage';
import { CASES, Skin, getUserInventory } from '@/data/skins';

export default function Index() {
  const [page, setPage] = useState('home');
  const [balance, setBalance] = useState(1500);
  const [inventory, setInventory] = useState<Skin[]>(getUserInventory());
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [depositOpen, setDepositOpen] = useState(false);
  const [openingCase, setOpeningCase] = useState<string | null>(null);

  const currentCase = openingCase ? CASES.find(c => c.id === openingCase) : null;

  function addHistory(entry: Omit<HistoryEntry, 'id' | 'time'>) {
    setHistory(prev => [{
      ...entry,
      id: Math.random().toString(36).slice(2),
      time: new Date(),
    }, ...prev]);
  }

  function handleDeposit(amount: number) {
    setBalance(prev => prev + amount);
    addHistory({ type: 'deposit', amount });
  }

  function handleOpenCase(caseId: string) {
    setOpeningCase(caseId);
  }

  function handleWin(skin: Skin) {
    const c = CASES.find(x => x.id === openingCase);
    setBalance(prev => prev - (c?.price || 0));
    setInventory(prev => [...prev, { ...skin, id: `win_${Date.now()}` }]);
    addHistory({ type: 'case_open', skin, caseName: c?.name });
  }

  function handleSell(skin: Skin) {
    setInventory(prev => prev.filter(s => s.id !== skin.id));
    setBalance(prev => prev + skin.price);
    addHistory({ type: 'sell', skin, amount: skin.price });
  }

  function handleWithdraw(skin: Skin) {
    setInventory(prev => prev.filter(s => s.id !== skin.id));
    addHistory({ type: 'withdraw', skin });
  }

  function handleUpgrade(from: Skin, to: Skin, won: boolean) {
    if (won) {
      setInventory(prev => prev.filter(s => s.id !== from.id).concat({ ...to, id: `upg_${Date.now()}` }));
      addHistory({ type: 'upgrade_win', skin: to });
    } else {
      setInventory(prev => prev.filter(s => s.id !== from.id));
      addHistory({ type: 'upgrade_lose', skin: from });
    }
  }

  function handleContract(items: Skin[], result: Skin) {
    const ids = new Set(items.map(s => s.id));
    setInventory(prev => prev.filter(s => !ids.has(s.id)).concat({ ...result, id: `con_${Date.now()}` }));
    addHistory({ type: 'contract', skin: result });
  }

  return (
    <div className="app">
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        balance={balance}
        onDeposit={() => setDepositOpen(true)}
      />

      <main className="main-content">
        {page === 'home' && (
          <HomePage
            onNavigate={setPage}
            onOpenCase={handleOpenCase}
            onDeposit={() => setDepositOpen(true)}
          />
        )}
        {page === 'cases' && (
          <CasesPage onOpenCase={handleOpenCase} />
        )}
        {page === 'upgrade' && (
          <UpgradePage inventory={inventory} onUpgrade={handleUpgrade} />
        )}
        {page === 'contracts' && (
          <ContractsPage inventory={inventory} onContract={handleContract} />
        )}
        {page === 'inventory' && (
          <InventoryPage inventory={inventory} onSell={handleSell} onWithdraw={handleWithdraw} />
        )}
        {page === 'history' && (
          <HistoryPage history={history} />
        )}
        {page === 'profile' && (
          <ProfilePage balance={balance} onDeposit={() => setDepositOpen(true)} onNavigate={setPage} />
        )}
        {page === 'referrals' && (
          <ReferralsPage onDeposit={() => setDepositOpen(true)} />
        )}
      </main>

      {depositOpen && (
        <DepositModal
          onClose={() => setDepositOpen(false)}
          onDeposit={handleDeposit}
        />
      )}

      {currentCase && (
        <CaseOpenModal
          caseItem={currentCase}
          balance={balance}
          onClose={() => setOpeningCase(null)}
          onWin={handleWin}
        />
      )}
    </div>
  );
}
