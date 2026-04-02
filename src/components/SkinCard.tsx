import { Skin, RARITY_COLORS, RARITY_NAMES, getWeaponEmoji } from '@/data/skins';

interface SkinCardProps {
  skin: Skin;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  selected?: boolean;
  showPrice?: boolean;
}

const WEAR_SHORT: Record<string, string> = {
  FN: 'FN', MW: 'MW', FT: 'FT', WW: 'WW', BS: 'BS',
};

export default function SkinCard({ skin, size = 'md', onClick, selected, showPrice = true }: SkinCardProps) {
  const rarityColor = RARITY_COLORS[skin.rarity];
  const emoji = getWeaponEmoji(skin.weapon);

  return (
    <div
      className={`skin-card skin-card--${size} ${selected ? 'skin-card--selected' : ''} ${onClick ? 'skin-card--clickable' : ''}`}
      style={{ '--rarity-color': rarityColor } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="skin-card__rarity-bar" />
      <div className="skin-card__image">
        {skin.image ? (
          <img src={skin.image} alt={skin.name} className="skin-card__img" />
        ) : (
          <span className="skin-card__emoji">{emoji}</span>
        )}
        {skin.wear && (
          <span className="skin-card__wear">{WEAR_SHORT[skin.wear] || skin.wear}</span>
        )}
      </div>
      <div className="skin-card__info">
        <div className="skin-card__weapon">{skin.weapon}</div>
        <div className="skin-card__finish">{skin.finish}</div>
        <div className="skin-card__rarity" style={{ color: rarityColor }}>
          {RARITY_NAMES[skin.rarity]}
        </div>
        {showPrice && (
          <div className="skin-card__price">{skin.price.toLocaleString('ru-RU')} ₽</div>
        )}
      </div>
      {selected && <div className="skin-card__check">✓</div>}
    </div>
  );
}
