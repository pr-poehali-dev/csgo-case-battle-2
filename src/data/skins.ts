export type Rarity = 'consumer' | 'industrial' | 'milspec' | 'restricted' | 'classified' | 'covert' | 'extraordinary' | 'contraband';
export type ItemType = 'skin' | 'sticker' | 'capsule' | 'charm' | 'knife' | 'gloves';

export interface Skin {
  id: string;
  name: string;
  weapon: string;
  finish: string;
  rarity: Rarity;
  price: number;
  type: ItemType;
  wear?: string;
  image: string;
  collection?: string;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'case' | 'capsule' | 'souvenir';
  items: Skin[];
  category: string;
}

export const RARITY_COLORS: Record<Rarity, string> = {
  consumer: '#b0c3d9',
  industrial: '#5e98d9',
  milspec: '#4b69ff',
  restricted: '#8847ff',
  classified: '#d32ce6',
  covert: '#eb4b4b',
  extraordinary: '#caab05',
  contraband: '#e4ae39',
};

export const RARITY_NAMES: Record<Rarity, string> = {
  consumer: 'Ширпотреб',
  industrial: 'Промышленное',
  milspec: 'Армейское',
  restricted: 'Запрещённое',
  classified: 'Засекреченное',
  covert: 'Тайное',
  extraordinary: 'Экстраординарное',
  contraband: 'Контрабанда',
};

// Базовые скины CS2 с реальными ценами
export const ALL_SKINS: Skin[] = [
  // Ножи
  { id: 'k1', name: 'Карамбит', weapon: 'Нож', finish: 'Мраморный градиент', rarity: 'extraordinary', price: 18500, type: 'knife', image: 'https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKaQIUpy58yUQwj4_T_lWiS0B6pMmh9gShFnTREfMy94EH5zVeK5LHrDfKQW5mNgxHaSZq4dspX9GviCBo4RmzAVXyMY1CbooBvYIk5A', wear: 'FN' },
  { id: 'k2', name: 'M9 Байонет', weapon: 'Нож', finish: 'Бараний рог', rarity: 'extraordinary', price: 12300, type: 'knife', image: 'https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKaQIUpy58yUQwj4_T_lWiS0B6pMmh9gShFnTREfMy94EH5zVeK5LHrDfKQW5mNgxHaSZq4dspX9GviCBo4RmzAVXyMY1CbooBvYIk5A', wear: 'MW' },
  { id: 'k3', name: 'Складной', weapon: 'Нож', finish: 'Дамасская сталь', rarity: 'extraordinary', price: 8900, type: 'knife', image: 'https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKaQIUpy58yUQwj4_T_lWiS0B6pMmh9gShFnTREfMy94EH5zVeK5LHrDfKQW5mNgxHaSZq4dspX9GviCBo4RmzAVXyMY1CbooBvYIk5A', wear: 'FT' },
  { id: 'k4', name: 'Керамбит', weapon: 'Нож', finish: 'Убийство', rarity: 'extraordinary', price: 22000, type: 'knife', image: 'https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKaQIUpy58yUQwj4_T_lWiS0B6pMmh9gShFnTREfMy94EH5zVeK5LHrDfKQW5mNgxHaSZq4dspX9GviCBo4RmzAVXyMY1CbooBvYIk5A', wear: 'FN' },

  // AK-47
  { id: 'ak1', name: 'AK-47', weapon: 'AK-47', finish: 'Огненный змей', rarity: 'covert', price: 4200, type: 'skin', wear: 'FN', image: '' },
  { id: 'ak2', name: 'AK-47', weapon: 'AK-47', finish: 'Вавилон', rarity: 'classified', price: 180, type: 'skin', wear: 'FN', image: '' },
  { id: 'ak3', name: 'AK-47', weapon: 'AK-47', finish: 'Нео-Нуар', rarity: 'classified', price: 320, type: 'skin', wear: 'FN', image: '' },
  { id: 'ak4', name: 'AK-47', weapon: 'AK-47', finish: 'Ягуар', rarity: 'covert', price: 1800, type: 'skin', wear: 'FN', image: '' },
  { id: 'ak5', name: 'AK-47', weapon: 'AK-47', finish: 'Случайность', rarity: 'restricted', price: 45, type: 'skin', wear: 'FT', image: '' },
  { id: 'ak6', name: 'AK-47', weapon: 'AK-47', finish: 'Красная линия', rarity: 'restricted', price: 25, type: 'skin', wear: 'FT', image: '' },
  { id: 'ak7', name: 'AK-47', weapon: 'AK-47', finish: 'Загадочный фронт', rarity: 'milspec', price: 8, type: 'skin', wear: 'BS', image: '' },
  { id: 'ak8', name: 'AK-47', weapon: 'AK-47', finish: 'Оружие поддержки', rarity: 'milspec', price: 3, type: 'skin', wear: 'WW', image: '' },

  // AWP
  { id: 'awp1', name: 'AWP', weapon: 'AWP', finish: 'Дракон Лор', rarity: 'covert', price: 8500, type: 'skin', wear: 'FN', image: '' },
  { id: 'awp2', name: 'AWP', weapon: 'AWP', finish: 'Азимов', rarity: 'covert', price: 950, type: 'skin', wear: 'FN', image: '' },
  { id: 'awp3', name: 'AWP', weapon: 'AWP', finish: 'Ахерон', rarity: 'classified', price: 280, type: 'skin', wear: 'FN', image: '' },
  { id: 'awp4', name: 'AWP', weapon: 'AWP', finish: 'Хайперзверь', rarity: 'classified', price: 195, type: 'skin', wear: 'FN', image: '' },
  { id: 'awp5', name: 'AWP', weapon: 'AWP', finish: 'Принт-спринт', rarity: 'restricted', price: 38, type: 'skin', wear: 'FN', image: '' },

  // M4A4 / M4A1-S
  { id: 'm4a41', name: 'M4A4', weapon: 'M4A4', finish: 'Цезарь', rarity: 'covert', price: 480, type: 'skin', wear: 'FN', image: '' },
  { id: 'm4a42', name: 'M4A4', weapon: 'M4A4', finish: 'Вой', rarity: 'covert', price: 350, type: 'skin', wear: 'FN', image: '' },
  { id: 'm4a43', name: 'M4A4', weapon: 'M4A4', finish: 'Штурмовой волк', rarity: 'classified', price: 120, type: 'skin', wear: 'FN', image: '' },
  { id: 'm4s1', name: 'M4A1-S', weapon: 'M4A1-S', finish: 'Гиперзверь', rarity: 'covert', price: 2800, type: 'skin', wear: 'FN', image: '' },
  { id: 'm4s2', name: 'M4A1-S', weapon: 'M4A1-S', finish: 'Ниобий', rarity: 'covert', price: 680, type: 'skin', wear: 'FN', image: '' },
  { id: 'm4s3', name: 'M4A1-S', weapon: 'M4A1-S', finish: 'Изменник', rarity: 'classified', price: 145, type: 'skin', wear: 'FN', image: '' },

  // Desert Eagle
  { id: 'de1', name: 'Desert Eagle', weapon: 'Desert Eagle', finish: 'Одиночная выживание', rarity: 'classified', price: 380, type: 'skin', wear: 'FN', image: '' },
  { id: 'de2', name: 'Desert Eagle', weapon: 'Desert Eagle', finish: 'Изумруд Джунглей', rarity: 'classified', price: 290, type: 'skin', wear: 'FN', image: '' },
  { id: 'de3', name: 'Desert Eagle', weapon: 'Desert Eagle', finish: 'Кобра', rarity: 'restricted', price: 42, type: 'skin', wear: 'FN', image: '' },
  { id: 'de4', name: 'Desert Eagle', weapon: 'Desert Eagle', finish: 'Корридида', rarity: 'restricted', price: 28, type: 'skin', wear: 'FN', image: '' },

  // Glock-18
  { id: 'g1', name: 'Glock-18', weapon: 'Glock-18', finish: 'Лунный свет', rarity: 'covert', price: 580, type: 'skin', wear: 'FN', image: '' },
  { id: 'g2', name: 'Glock-18', weapon: 'Glock-18', finish: 'Ультрафиолет', rarity: 'restricted', price: 35, type: 'skin', wear: 'FN', image: '' },
  { id: 'g3', name: 'Glock-18', weapon: 'Glock-18', finish: 'Лесник', rarity: 'milspec', price: 5, type: 'skin', wear: 'FT', image: '' },

  // USP-S
  { id: 'u1', name: 'USP-S', weapon: 'USP-S', finish: 'Убийца', rarity: 'covert', price: 1200, type: 'skin', wear: 'FN', image: '' },
  { id: 'u2', name: 'USP-S', weapon: 'USP-S', finish: 'Нишевик', rarity: 'classified', price: 240, type: 'skin', wear: 'FN', image: '' },
  { id: 'u3', name: 'USP-S', weapon: 'USP-S', finish: 'Принт', rarity: 'restricted', price: 48, type: 'skin', wear: 'FN', image: '' },

  // MP5-SD / MP7
  { id: 'mp1', name: 'MP5-SD', weapon: 'MP5-SD', finish: 'Азулежу', rarity: 'classified', price: 95, type: 'skin', wear: 'FN', image: '' },
  { id: 'mp2', name: 'MP7', weapon: 'MP7', finish: 'Заряженный', rarity: 'classified', price: 78, type: 'skin', wear: 'FN', image: '' },

  // Перчатки
  { id: 'gl1', name: 'Спортивные перчатки', weapon: 'Перчатки', finish: 'Пандора', rarity: 'extraordinary', price: 4800, type: 'gloves', wear: 'FN', image: '' },
  { id: 'gl2', name: 'Мотоциклетные перчатки', weapon: 'Перчатки', finish: 'Бронирование', rarity: 'extraordinary', price: 3200, type: 'gloves', wear: 'MW', image: '' },
  { id: 'gl3', name: 'Перчатки-бокс', weapon: 'Перчатки', finish: 'Бумага', rarity: 'extraordinary', price: 2100, type: 'gloves', wear: 'FT', image: '' },

  // SG 553
  { id: 'sg1', name: 'SG 553', weapon: 'SG 553', finish: 'Углеродный волк', rarity: 'classified', price: 135, type: 'skin', wear: 'FN', image: '' },
  { id: 'sg2', name: 'SG 553', weapon: 'SG 553', finish: 'Кибер-сила', rarity: 'restricted', price: 18, type: 'skin', wear: 'FN', image: '' },

  // FAMAS
  { id: 'fa1', name: 'FAMAS', weapon: 'FAMAS', finish: 'Мушка', rarity: 'classified', price: 88, type: 'skin', wear: 'FN', image: '' },
  { id: 'fa2', name: 'FAMAS', weapon: 'FAMAS', finish: 'Аквамарин-реванш', rarity: 'restricted', price: 22, type: 'skin', wear: 'FN', image: '' },

  // AUG
  { id: 'au1', name: 'AUG', weapon: 'AUG', finish: 'Запятнанный', rarity: 'covert', price: 420, type: 'skin', wear: 'FN', image: '' },
  { id: 'au2', name: 'AUG', weapon: 'AUG', finish: 'Атомный уголь', rarity: 'classified', price: 110, type: 'skin', wear: 'FN', image: '' },

  // SSG 08
  { id: 'ss1', name: 'SSG 08', weapon: 'SSG 08', finish: 'Кровавая паутина', rarity: 'classified', price: 165, type: 'skin', wear: 'FN', image: '' },
  { id: 'ss2', name: 'SSG 08', weapon: 'SSG 08', finish: 'Охотник', rarity: 'restricted', price: 28, type: 'skin', wear: 'FN', image: '' },

  // P250
  { id: 'p1', name: 'P250', weapon: 'P250', finish: 'Атомный', rarity: 'restricted', price: 15, type: 'skin', wear: 'FN', image: '' },
  { id: 'p2', name: 'P250', weapon: 'P250', finish: 'Экваториальная линия', rarity: 'milspec', price: 4, type: 'skin', wear: 'FT', image: '' },

  // Стикеры
  { id: 'st1', name: 'Стикер', weapon: 'Стикер', finish: 'Natus Vincere | Катовице 2014', rarity: 'extraordinary', price: 48000, type: 'sticker', image: '' },
  { id: 'st2', name: 'Стикер', weapon: 'Стикер', finish: 'NINJAS IN PYJAMAS | Антверп 2022', rarity: 'covert', price: 280, type: 'sticker', image: '' },
  { id: 'st3', name: 'Стикер', weapon: 'Стикер', finish: 'Cloud9 | Кёльн 2015', rarity: 'classified', price: 185, type: 'sticker', image: '' },
  { id: 'st4', name: 'Стикер', weapon: 'Стикер', finish: 'FaZe Clan | Рио 2022', rarity: 'classified', price: 95, type: 'sticker', image: '' },
  { id: 'st5', name: 'Стикер', weapon: 'Стикер', finish: 'TEAM LIQUID | Берлин 2019', rarity: 'restricted', price: 45, type: 'sticker', image: '' },
  { id: 'st6', name: 'Стикер', weapon: 'Стикер', finish: 'Astralis | Краков 2017', rarity: 'restricted', price: 65, type: 'sticker', image: '' },
  { id: 'st7', name: 'Стикер', weapon: 'Стикер', finish: 'Virtus.pro | Стокгольм 2021', rarity: 'milspec', price: 12, type: 'sticker', image: '' },
  { id: 'st8', name: 'Стикер', weapon: 'Стикер', finish: 'G2 Esports | Антверп 2022', rarity: 'milspec', price: 18, type: 'sticker', image: '' },

  // Брелки
  { id: 'ch1', name: 'Брелок', weapon: 'Брелок', finish: 'Резиновая уточка', rarity: 'extraordinary', price: 980, type: 'charm', image: '' },
  { id: 'ch2', name: 'Брелок', weapon: 'Брелок', finish: 'Металлическая корзина', rarity: 'covert', price: 245, type: 'charm', image: '' },
  { id: 'ch3', name: 'Брелок', weapon: 'Брелок', finish: 'Хот-дог', rarity: 'classified', price: 85, type: 'charm', image: '' },
  { id: 'ch4', name: 'Брелок', weapon: 'Брелок', finish: 'Диамантовая звезда', rarity: 'classified', price: 68, type: 'charm', image: '' },
  { id: 'ch5', name: 'Брелок', weapon: 'Брелок', finish: 'Хрустальная призма', rarity: 'restricted', price: 22, type: 'charm', image: '' },
  { id: 'ch6', name: 'Брелок', weapon: 'Брелок', finish: 'Медальон', rarity: 'milspec', price: 8, type: 'charm', image: '' },
];

// Функция для получения emoji/цвет оружия
export function getWeaponEmoji(weapon: string): string {
  const map: Record<string, string> = {
    'AK-47': '🔴', 'AWP': '🟣', 'M4A4': '🔵', 'M4A1-S': '🔵',
    'Desert Eagle': '🟡', 'Glock-18': '⚪', 'USP-S': '⚪',
    'Нож': '🔱', 'Перчатки': '🧤', 'Стикер': '⭐', 'Брелок': '💎',
    'MP5-SD': '🟢', 'MP7': '🟢', 'SG 553': '🟠', 'FAMAS': '🟠',
    'AUG': '🟠', 'SSG 08': '🟣', 'P250': '⚪',
  };
  return map[weapon] || '🎯';
}

// Генерация кейсов (50+)
function makeCaseItems(ids: string[]): Skin[] {
  return ids.map(id => ALL_SKINS.find(s => s.id === id)!).filter(Boolean);
}

export const CASES: Case[] = [
  {
    id: 'cs1', name: 'Кейс «Революция»', price: 120, image: '🔫', type: 'case', category: 'Новые',
    items: makeCaseItems(['k1', 'k2', 'ak1', 'ak2', 'ak3', 'awp1', 'awp2', 'm4s1', 'u1', 'de1', 'g1', 'gl1', 'sg1', 'fa1', 'au1', 'ss1', 'mp1', 'p1', 'ch1', 'st1']),
  },
  {
    id: 'cs2', name: 'Кейс «Килловит»', price: 85, image: '⚔️', type: 'case', category: 'Новые',
    items: makeCaseItems(['k3', 'k4', 'ak4', 'ak5', 'awp3', 'awp4', 'm4a41', 'm4s2', 'u2', 'de2', 'g2', 'gl2', 'sg2', 'fa2', 'au2', 'ss2', 'mp2', 'p2', 'ch2', 'st2']),
  },
  {
    id: 'cs3', name: 'Кейс «Хромовый»', price: 95, image: '🌐', type: 'case', category: 'Новые',
    items: makeCaseItems(['k1', 'k3', 'ak6', 'ak7', 'awp5', 'm4a42', 'm4s3', 'u3', 'de3', 'de4', 'g3', 'gl3', 'sg1', 'sg2', 'fa1', 'au1', 'ss1', 'p1', 'ch3', 'st3']),
  },
  {
    id: 'cs4', name: 'Кейс «Боевой дух»', price: 110, image: '💥', type: 'case', category: 'Новые',
    items: makeCaseItems(['k2', 'k4', 'ak1', 'ak8', 'awp1', 'awp3', 'm4a43', 'm4s1', 'u1', 'u2', 'de1', 'de2', 'gl1', 'sg1', 'fa2', 'au2', 'ss2', 'p2', 'ch4', 'st4']),
  },
  {
    id: 'cs5', name: 'Кейс «Ярость»', price: 75, image: '🔥', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k1', 'k2', 'ak2', 'ak3', 'awp2', 'awp4', 'm4a41', 'm4s2', 'u3', 'de3', 'g1', 'g2', 'sg2', 'fa1', 'au1', 'ss1', 'mp1', 'p1', 'ch5', 'st5']),
  },
  {
    id: 'cs6', name: 'Кейс «Синий металл»', price: 130, image: '💙', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k3', 'k4', 'ak4', 'ak5', 'awp1', 'awp5', 'm4a42', 'm4s3', 'u1', 'de4', 'g3', 'gl2', 'sg1', 'fa2', 'au2', 'ss2', 'mp2', 'p2', 'ch6', 'st6']),
  },
  {
    id: 'cs7', name: 'Кейс «Феникс»', price: 90, image: '🦅', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k1', 'k2', 'ak6', 'ak7', 'awp2', 'awp3', 'm4a43', 'm4s1', 'u2', 'de1', 'de2', 'g1', 'gl3', 'sg2', 'fa1', 'au1', 'ss1', 'p1', 'ch1', 'st7']),
  },
  {
    id: 'cs8', name: 'Кейс «Тень»', price: 100, image: '🌑', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k2', 'k3', 'ak1', 'ak8', 'awp4', 'awp5', 'm4a41', 'm4s2', 'u3', 'de3', 'de4', 'g2', 'gl1', 'sg1', 'fa2', 'au2', 'ss2', 'p2', 'ch2', 'st8']),
  },
  {
    id: 'cs9', name: 'Кейс «Спектр 2»', price: 115, image: '🌈', type: 'case', category: 'Классика',
    items: makeCaseItems(['k4', 'k1', 'ak2', 'ak3', 'awp1', 'awp2', 'm4a42', 'm4s3', 'u1', 'de1', 'g3', 'gl2', 'sg2', 'fa1', 'au1', 'ss1', 'mp1', 'p1', 'ch3', 'st1']),
  },
  {
    id: 'cs10', name: 'Кейс «Снайпер»', price: 105, image: '🎯', type: 'case', category: 'Классика',
    items: makeCaseItems(['k1', 'k3', 'ak4', 'ak5', 'awp3', 'awp4', 'awp5', 'm4a43', 'm4s1', 'u2', 'de2', 'de3', 'g1', 'gl3', 'sg1', 'fa2', 'ss2', 'p2', 'ch4', 'st2']),
  },
  {
    id: 'cs11', name: 'Кейс «Гамма»', price: 88, image: '☢️', type: 'case', category: 'Классика',
    items: makeCaseItems(['k2', 'k4', 'ak6', 'ak7', 'awp1', 'awp3', 'm4a41', 'm4s2', 'u3', 'de4', 'g2', 'gl1', 'sg2', 'fa1', 'au2', 'ss1', 'mp2', 'p1', 'ch5', 'st3']),
  },
  {
    id: 'cs12', name: 'Кейс «Операция Хайдра»', price: 145, image: '🐍', type: 'case', category: 'Классика',
    items: makeCaseItems(['k1', 'k2', 'ak8', 'ak1', 'awp2', 'awp4', 'm4a42', 'm4s3', 'u1', 'de1', 'de2', 'g3', 'gl2', 'sg1', 'fa2', 'au1', 'ss2', 'p2', 'ch6', 'st4']),
  },
  {
    id: 'cs13', name: 'Кейс «Прорыв»', price: 78, image: '⚡', type: 'case', category: 'Бюджетные',
    items: makeCaseItems(['k3', 'k4', 'ak2', 'ak3', 'awp5', 'awp1', 'm4a43', 'm4s1', 'u2', 'de3', 'g1', 'g2', 'sg2', 'fa1', 'au2', 'ss1', 'mp1', 'p1', 'ch1', 'st5']),
  },
  {
    id: 'cs14', name: 'Кейс «Искра»', price: 65, image: '✨', type: 'case', category: 'Бюджетные',
    items: makeCaseItems(['k1', 'k2', 'ak4', 'ak5', 'awp2', 'awp3', 'm4a41', 'm4s2', 'u3', 'de4', 'g3', 'gl3', 'sg1', 'fa2', 'au1', 'ss2', 'mp2', 'p2', 'ch2', 'st6']),
  },
  {
    id: 'cs15', name: 'Кейс «Сломанная клыкастость»', price: 92, image: '🐺', type: 'case', category: 'Бюджетные',
    items: makeCaseItems(['k2', 'k3', 'ak6', 'ak7', 'awp4', 'awp5', 'm4a42', 'm4s3', 'u1', 'de1', 'de2', 'g1', 'gl1', 'sg2', 'fa1', 'au2', 'ss1', 'p1', 'ch3', 'st7']),
  },
  {
    id: 'cs16', name: 'Кейс «Кобра»', price: 98, image: '🐉', type: 'case', category: 'Бюджетные',
    items: makeCaseItems(['k4', 'k1', 'ak8', 'ak1', 'awp1', 'awp2', 'm4a43', 'm4s1', 'u2', 'de3', 'de4', 'g2', 'gl2', 'sg1', 'fa2', 'au1', 'ss2', 'p2', 'ch4', 'st8']),
  },
  {
    id: 'cs17', name: 'Кейс «Операция Рим»', price: 125, image: '🏛️', type: 'case', category: 'Операции',
    items: makeCaseItems(['k1', 'k3', 'ak2', 'ak3', 'awp3', 'awp4', 'm4a41', 'm4s2', 'u3', 'de1', 'g3', 'gl3', 'sg2', 'fa1', 'au2', 'ss1', 'mp1', 'p1', 'ch5', 'st1']),
  },
  {
    id: 'cs18', name: 'Кейс «Операция Атлас»', price: 135, image: '🗺️', type: 'case', category: 'Операции',
    items: makeCaseItems(['k2', 'k4', 'ak4', 'ak5', 'awp5', 'awp1', 'm4a42', 'm4s3', 'u1', 'de2', 'de3', 'g1', 'gl1', 'sg1', 'fa2', 'au1', 'ss2', 'p2', 'ch6', 'st2']),
  },
  {
    id: 'cs19', name: 'Кейс «Операция Тень»', price: 118, image: '👥', type: 'case', category: 'Операции',
    items: makeCaseItems(['k1', 'k2', 'ak6', 'ak7', 'awp2', 'awp3', 'm4a43', 'm4s1', 'u2', 'de4', 'g2', 'gl2', 'sg2', 'fa1', 'au2', 'ss1', 'mp2', 'p1', 'ch1', 'st3']),
  },
  {
    id: 'cs20', name: 'Кейс «Операция Бронза»', price: 108, image: '🥉', type: 'case', category: 'Операции',
    items: makeCaseItems(['k3', 'k4', 'ak8', 'ak1', 'awp4', 'awp5', 'm4a41', 'm4s2', 'u3', 'de1', 'de2', 'g3', 'gl3', 'sg1', 'fa2', 'au1', 'ss2', 'p2', 'ch2', 'st4']),
  },
  {
    id: 'cs21', name: 'Кейс «Неоновый»', price: 82, image: '🟢', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k1', 'k3', 'ak2', 'ak3', 'awp1', 'awp2', 'm4a42', 'm4s3', 'u1', 'de3', 'g1', 'gl1', 'sg2', 'fa1', 'au2', 'ss1', 'mp1', 'p1', 'ch3', 'st5']),
  },
  {
    id: 'cs22', name: 'Кейс «Кровь и деньги»', price: 155, image: '💸', type: 'case', category: 'Премиум',
    items: makeCaseItems(['k1', 'k2', 'k3', 'k4', 'ak1', 'awp1', 'm4s1', 'gl1', 'gl2', 'de1', 'u1', 'g1', 'sg1', 'au1', 'ss1', 'ch1', 'ch2', 'st1', 'st2', 'st3']),
  },
  {
    id: 'cs23', name: 'Кейс «Платиновый»', price: 180, image: '💠', type: 'case', category: 'Премиум',
    items: makeCaseItems(['k2', 'k4', 'ak4', 'awp2', 'm4s2', 'gl2', 'gl3', 'de2', 'u2', 'g2', 'sg2', 'au2', 'ss2', 'ch2', 'ch3', 'st2', 'st4', 'fa1', 'mp1', 'p1']),
  },
  {
    id: 'cs24', name: 'Кейс «Алмазный»', price: 220, image: '💎', type: 'case', category: 'Премиум',
    items: makeCaseItems(['k1', 'k2', 'k3', 'k4', 'gl1', 'gl2', 'gl3', 'ak1', 'awp1', 'm4s1', 'de1', 'u1', 'ch1', 'ch2', 'st1', 'st2', 'sg1', 'au1', 'fa1', 'g1']),
  },
  {
    id: 'cs25', name: 'Кейс «Горизонт»', price: 95, image: '🌅', type: 'case', category: 'Классика',
    items: makeCaseItems(['k3', 'k4', 'ak6', 'ak7', 'awp3', 'awp4', 'm4a43', 'm4s3', 'u3', 'de3', 'de4', 'g3', 'sg2', 'fa2', 'au1', 'ss2', 'mp2', 'p2', 'ch4', 'st6']),
  },
  {
    id: 'cs26', name: 'Кейс «Пещера»', price: 72, image: '🪨', type: 'case', category: 'Бюджетные',
    items: makeCaseItems(['k1', 'k2', 'ak8', 'ak1', 'awp5', 'awp1', 'm4a41', 'm4s1', 'u1', 'de1', 'g1', 'gl1', 'sg1', 'fa1', 'au2', 'ss1', 'mp1', 'p1', 'ch5', 'st7']),
  },
  {
    id: 'cs27', name: 'Кейс «Вулкан»', price: 88, image: '🌋', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k2', 'k4', 'ak2', 'ak3', 'awp2', 'awp3', 'm4a42', 'm4s2', 'u2', 'de2', 'de3', 'g2', 'gl2', 'sg2', 'fa2', 'au1', 'ss2', 'p2', 'ch6', 'st8']),
  },
  {
    id: 'cs28', name: 'Кейс «Буря»', price: 102, image: '⛈️', type: 'case', category: 'Новые',
    items: makeCaseItems(['k1', 'k3', 'ak4', 'ak5', 'awp4', 'awp5', 'm4a43', 'm4s3', 'u3', 'de4', 'g3', 'gl3', 'sg1', 'fa1', 'au2', 'ss1', 'mp2', 'p1', 'ch1', 'st1']),
  },
  {
    id: 'cs29', name: 'Кейс «Лёд»', price: 93, image: '❄️', type: 'case', category: 'Новые',
    items: makeCaseItems(['k2', 'k4', 'ak6', 'ak7', 'awp1', 'awp2', 'm4a41', 'm4s1', 'u1', 'de1', 'de2', 'g1', 'gl1', 'sg2', 'fa2', 'au1', 'ss2', 'p2', 'ch2', 'st2']),
  },
  {
    id: 'cs30', name: 'Кейс «Огонь»', price: 107, image: '🔥', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k1', 'k3', 'ak8', 'ak1', 'awp3', 'awp4', 'm4a42', 'm4s2', 'u2', 'de3', 'de4', 'g2', 'gl2', 'sg1', 'fa1', 'au2', 'ss1', 'mp1', 'p1', 'ch3', 'st3']),
  },
  {
    id: 'cs31', name: 'Кейс «Дельта»', price: 115, image: '🔺', type: 'case', category: 'Операции',
    items: makeCaseItems(['k2', 'k4', 'ak2', 'ak3', 'awp5', 'awp1', 'm4a43', 'm4s3', 'u3', 'de1', 'g3', 'gl3', 'sg2', 'fa2', 'au1', 'ss2', 'mp2', 'p2', 'ch4', 'st4']),
  },
  {
    id: 'cs32', name: 'Кейс «Гамма 2»', price: 86, image: '🔻', type: 'case', category: 'Классика',
    items: makeCaseItems(['k1', 'k3', 'ak4', 'ak5', 'awp2', 'awp3', 'm4a41', 'm4s1', 'u1', 'de2', 'de3', 'g1', 'gl1', 'sg1', 'fa1', 'au2', 'ss1', 'p1', 'ch5', 'st5']),
  },
  {
    id: 'cs33', name: 'Кейс «Спектр»', price: 112, image: '🌊', type: 'case', category: 'Классика',
    items: makeCaseItems(['k2', 'k4', 'ak6', 'ak7', 'awp4', 'awp5', 'm4a42', 'm4s2', 'u2', 'de4', 'g2', 'gl2', 'sg2', 'fa2', 'au1', 'ss2', 'mp1', 'p2', 'ch6', 'st6']),
  },
  {
    id: 'cs34', name: 'Кейс «Клатч»', price: 97, image: '🎲', type: 'case', category: 'Бюджетные',
    items: makeCaseItems(['k1', 'k2', 'ak8', 'ak1', 'awp1', 'awp2', 'm4a43', 'm4s3', 'u3', 'de1', 'de2', 'g3', 'gl3', 'sg1', 'fa1', 'au2', 'ss1', 'mp2', 'p1', 'ch1']),
  },
  {
    id: 'cs35', name: 'Кейс «Смерть»', price: 140, image: '💀', type: 'case', category: 'Премиум',
    items: makeCaseItems(['k3', 'k4', 'ak2', 'ak3', 'awp3', 'awp4', 'm4a41', 'm4s1', 'u1', 'de3', 'de4', 'g1', 'gl1', 'sg2', 'fa2', 'au1', 'ss2', 'p2', 'ch2', 'st7']),
  },
  {
    id: 'cs36', name: 'Кейс «Победа»', price: 128, image: '🏆', type: 'case', category: 'Премиум',
    items: makeCaseItems(['k1', 'k2', 'k3', 'ak4', 'ak5', 'awp5', 'm4a42', 'm4s2', 'u2', 'de1', 'g2', 'gl2', 'sg1', 'fa1', 'au2', 'ss1', 'mp1', 'p1', 'ch3', 'st8']),
  },
  {
    id: 'cs37', name: 'Кейс «Кровавый»', price: 83, image: '🩸', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k2', 'k4', 'ak6', 'ak7', 'awp1', 'awp2', 'm4a43', 'm4s3', 'u3', 'de2', 'de3', 'g3', 'gl3', 'sg2', 'fa2', 'au1', 'ss2', 'p2', 'ch4', 'st1']),
  },
  {
    id: 'cs38', name: 'Кейс «Хаос»', price: 99, image: '🌀', type: 'case', category: 'Новые',
    items: makeCaseItems(['k1', 'k3', 'ak8', 'ak1', 'awp3', 'awp4', 'm4a41', 'm4s1', 'u1', 'de4', 'g1', 'gl1', 'sg1', 'fa1', 'au2', 'ss1', 'mp2', 'p1', 'ch5', 'st2']),
  },
  {
    id: 'cs39', name: 'Кейс «Рассвет»', price: 91, image: '🌄', type: 'case', category: 'Новые',
    items: makeCaseItems(['k2', 'k4', 'ak2', 'ak3', 'awp5', 'awp1', 'm4a42', 'm4s2', 'u2', 'de1', 'de2', 'g2', 'gl2', 'sg2', 'fa2', 'au1', 'ss2', 'p2', 'ch6', 'st3']),
  },
  {
    id: 'cs40', name: 'Кейс «Ночь»', price: 106, image: '🌙', type: 'case', category: 'Популярные',
    items: makeCaseItems(['k1', 'k3', 'ak4', 'ak5', 'awp2', 'awp3', 'm4a43', 'm4s3', 'u3', 'de3', 'de4', 'g3', 'gl3', 'sg1', 'fa1', 'au2', 'ss1', 'mp1', 'p1', 'ch1', 'st4']),
  },
  {
    id: 'cs41', name: 'Кейс «Электро»', price: 79, image: '⚡', type: 'case', category: 'Бюджетные',
    items: makeCaseItems(['k2', 'k4', 'ak6', 'ak7', 'awp4', 'awp5', 'm4a41', 'm4s1', 'u1', 'de1', 'g1', 'gl1', 'sg2', 'fa2', 'au1', 'ss2', 'mp2', 'p2', 'ch2', 'st5']),
  },
  {
    id: 'cs42', name: 'Кейс «Призрак»', price: 118, image: '👻', type: 'case', category: 'Операции',
    items: makeCaseItems(['k1', 'k3', 'ak8', 'ak1', 'awp1', 'awp2', 'm4a42', 'm4s2', 'u2', 'de2', 'de3', 'g2', 'gl2', 'sg1', 'fa1', 'au2', 'ss1', 'p1', 'ch3', 'st6']),
  },
  {
    id: 'cs43', name: 'Кейс «Взрыв»', price: 87, image: '💣', type: 'case', category: 'Операции',
    items: makeCaseItems(['k2', 'k4', 'ak2', 'ak3', 'awp3', 'awp4', 'm4a43', 'm4s3', 'u3', 'de4', 'g3', 'gl3', 'sg2', 'fa2', 'au1', 'ss2', 'mp1', 'p2', 'ch4', 'st7']),
  },
  {
    id: 'cs44', name: 'Кейс «Сталь»', price: 103, image: '🔩', type: 'case', category: 'Классика',
    items: makeCaseItems(['k1', 'k3', 'ak4', 'ak5', 'awp5', 'awp1', 'm4a41', 'm4s1', 'u1', 'de1', 'de2', 'g1', 'gl1', 'sg1', 'fa1', 'au2', 'ss1', 'mp2', 'p1', 'ch5']),
  },
  {
    id: 'cs45', name: 'Кейс «Кристалл»', price: 97, image: '🔮', type: 'case', category: 'Классика',
    items: makeCaseItems(['k2', 'k4', 'ak6', 'ak7', 'awp2', 'awp3', 'm4a42', 'm4s2', 'u2', 'de3', 'de4', 'g2', 'gl2', 'sg2', 'fa2', 'au1', 'ss2', 'p2', 'ch6', 'st8']),
  },

  // Капсулы
  {
    id: 'cap1', name: 'Капсула Антверп 2022 — Претенденты', price: 35, image: '🏅', type: 'capsule', category: 'Капсулы',
    items: makeCaseItems(['st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'st8', 'st1', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7']),
  },
  {
    id: 'cap2', name: 'Капсула Антверп 2022 — Легенды', price: 48, image: '🥇', type: 'capsule', category: 'Капсулы',
    items: makeCaseItems(['st1', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'st8', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'st1', 'st2', 'st3', 'st4', 'st5', 'st6']),
  },
  {
    id: 'cap3', name: 'Капсула Рио 2022 — Претенденты', price: 28, image: '🎗️', type: 'capsule', category: 'Капсулы',
    items: makeCaseItems(['st4', 'st5', 'st6', 'st7', 'st8', 'st2', 'st3', 'ch3', 'ch4', 'ch5', 'ch6', 'ch1', 'ch2', 'st4', 'st5', 'st6', 'st7', 'st8', 'st2', 'st3']),
  },
  {
    id: 'cap4', name: 'Капсула Рио 2022 — Чемпионы', price: 65, image: '🏆', type: 'capsule', category: 'Капсулы',
    items: makeCaseItems(['st1', 'st2', 'st3', 'ch1', 'ch2', 'st4', 'st5', 'ch3', 'ch4', 'st6', 'st7', 'ch5', 'ch6', 'st8', 'st1', 'st2', 'st3', 'ch1', 'ch2', 'st4']),
  },
  {
    id: 'cap5', name: 'Капсула Стокгольм 2021 — Легенды', price: 55, image: '⚜️', type: 'capsule', category: 'Капсулы',
    items: makeCaseItems(['st7', 'st8', 'st1', 'st2', 'ch1', 'ch2', 'ch3', 'st3', 'st4', 'ch4', 'ch5', 'st5', 'st6', 'ch6', 'st7', 'st8', 'st1', 'st2', 'ch1', 'ch2']),
  },
  {
    id: 'cap6', name: 'Капсула Paris 2023 — Претенденты', price: 42, image: '🗼', type: 'capsule', category: 'Капсулы',
    items: makeCaseItems(['st3', 'st4', 'st5', 'st6', 'ch1', 'ch2', 'ch3', 'ch4', 'st7', 'st8', 'st1', 'st2', 'ch5', 'ch6', 'st3', 'st4', 'st5', 'st6', 'ch1', 'ch2']),
  },
];

export function getUserInventory(): Skin[] {
  return [
    { ...ALL_SKINS.find(s => s.id === 'ak2')!, id: 'inv_ak2' },
    { ...ALL_SKINS.find(s => s.id === 'awp3')!, id: 'inv_awp3' },
    { ...ALL_SKINS.find(s => s.id === 'de3')!, id: 'inv_de3' },
    { ...ALL_SKINS.find(s => s.id === 'g2')!, id: 'inv_g2' },
    { ...ALL_SKINS.find(s => s.id === 'st5')!, id: 'inv_st5' },
    { ...ALL_SKINS.find(s => s.id === 'ch3')!, id: 'inv_ch3' },
    { ...ALL_SKINS.find(s => s.id === 'm4s3')!, id: 'inv_m4s3' },
    { ...ALL_SKINS.find(s => s.id === 'u3')!, id: 'inv_u3' },
    { ...ALL_SKINS.find(s => s.id === 'sg1')!, id: 'inv_sg1' },
    { ...ALL_SKINS.find(s => s.id === 'p1')!, id: 'inv_p1' },
  ];
}
