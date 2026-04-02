import { Case } from '@/data/skins';

interface CaseCardProps {
  caseItem: Case;
  onClick: () => void;
}

export default function CaseCard({ caseItem, onClick }: CaseCardProps) {
  const maxPrice = Math.max(...caseItem.items.map(s => s.price));

  return (
    <div className="case-card" onClick={onClick}>
      <div className="case-card__glow" />
      <div className="case-card__image">
        <span className="case-card__emoji">{caseItem.image}</span>
        <div className="case-card__shine" />
      </div>
      <div className="case-card__info">
        <div className="case-card__category">{caseItem.category}</div>
        <div className="case-card__name">{caseItem.name}</div>
        <div className="case-card__meta">
          <span className="case-card__items-count">{caseItem.items.length} предметов</span>
          <span className="case-card__max-price">до {maxPrice.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button className="case-card__btn">
          Открыть · {caseItem.price} ₽
        </button>
      </div>
    </div>
  );
}
