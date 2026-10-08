import type { Localized } from './i18n'

export type Category = 'meat' | 'vegetable' | 'mushroom' | 'noodle' | 'soup' | 'sauce' | 'other'
export type Unit = 'kg' | 'L' | 'pack' | 'tray'
export type RestaurantType = 'bakery' | 'cafe' | 'buffet' | 'shabu' | 'bbq' | 'other'

export const CATEGORIES: Category[] = ['meat', 'vegetable', 'mushroom', 'noodle', 'soup', 'sauce', 'other']
export const UNITS: Unit[] = ['kg', 'L', 'pack', 'tray']
export const RESTAURANT_TYPES: RestaurantType[] = ['bakery', 'cafe', 'buffet', 'shabu', 'bbq', 'other']

export type Item = {
  id: string
  name: Localized
  sku: string
  category: Category
  unit: Unit
  stock: number
  minStock: number
  cost: number
  supplierId: string
  predictedDemand: number
  confidence: number
  reason: Localized
  active: boolean
}

export type Supplier = {
  id: string
  name: string
  contact: string
  phone: string
  email: string
  category: Category
  lastOrder: string | null
  leadTimeDays: number
  active: boolean
}

export type POStatus = 'draft' | 'ordered' | 'received'

export type POLine = { itemId: string; qty: number; supplierId: string; unitCost: number }

export type PurchaseOrder = {
  id: string
  createdAt: string
  lines: POLine[]
  notes: string
  status: POStatus
}

export type AppNotification = {
  id: string
  type: 'stock' | 'ai' | 'order' | 'forecast'
  title: Localized
  body: Localized
  time: Localized
  read: boolean
  href: string
}

export const TODAY = new Date(2026, 9, 8)

export const initialSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'ABC Food Supply',
    contact: 'คุณสมชาย ใจดี',
    phone: '081-234-5678',
    email: 'order@abcfood.co.th',
    category: 'other',
    lastOrder: '2026-10-06',
    leadTimeDays: 1,
    active: true,
  },
  {
    id: 's2',
    name: 'Fresh Farm Thailand',
    contact: 'คุณวิภา ศรีสุข',
    phone: '089-456-7890',
    email: 'sales@freshfarm.co.th',
    category: 'vegetable',
    lastOrder: '2026-10-07',
    leadTimeDays: 1,
    active: true,
  },
  {
    id: 's3',
    name: 'Premium Meat Co.',
    contact: 'คุณธนพล วงศ์ทอง',
    phone: '082-345-6789',
    email: 'contact@premiummeat.co.th',
    category: 'meat',
    lastOrder: '2026-10-03',
    leadTimeDays: 2,
    active: true,
  },
  {
    id: 's4',
    name: 'Local Vegetable Market',
    contact: 'คุณมาลี บุญมา',
    phone: '086-567-8901',
    email: 'malee.market@gmail.com',
    category: 'vegetable',
    lastOrder: '2026-09-28',
    leadTimeDays: 1,
    active: true,
  },
]

export const initialItems: Item[] = [
  {
    id: 'i1',
    name: { th: 'หมูสไลด์', en: 'Sliced pork' },
    sku: 'MEAT-001',
    category: 'meat',
    unit: 'kg',
    stock: 20,
    minStock: 15,
    cost: 250,
    supplierId: 's1',
    predictedDemand: 35,
    confidence: 92,
    reason: { th: 'วันศุกร์ + เงินเดือนออก ยอดขายชุดหมูเพิ่มขึ้น 35%', en: 'Friday + payday lifts pork set sales by 35%' },
    active: true,
  },
  {
    id: 'i2',
    name: { th: 'เนื้อวัว', en: 'Beef' },
    sku: 'MEAT-002',
    category: 'meat',
    unit: 'kg',
    stock: 30,
    minStock: 15,
    cost: 420,
    supplierId: 's3',
    predictedDemand: 27,
    confidence: 85,
    reason: { th: 'สต็อกเพียงพอ ยอดสั่งเนื้อวัวช่วงฝนตกมักลดลง', en: 'Stock is sufficient; beef orders usually dip on rainy days' },
    active: true,
  },
  {
    id: 'i3',
    name: { th: 'ผักกาดขาว', en: 'Napa cabbage' },
    sku: 'VEG-001',
    category: 'vegetable',
    unit: 'kg',
    stock: 10,
    minStock: 8,
    cost: 100,
    supplierId: 's2',
    predictedDemand: 15,
    confidence: 88,
    reason: { th: 'ใช้คู่กับชุดหมู คาดว่าใช้เพิ่มตามยอดขาย', en: 'Paired with pork sets — rises with sales' },
    active: true,
  },
  {
    id: 'i4',
    name: { th: 'ผักบุ้ง', en: 'Morning glory' },
    sku: 'VEG-002',
    category: 'vegetable',
    unit: 'kg',
    stock: 4,
    minStock: 6,
    cost: 60,
    supplierId: 's4',
    predictedDemand: 10,
    confidence: 84,
    reason: { th: 'ต่ำกว่าระดับขั้นต่ำ ควรสั่งด่วน', en: 'Below minimum level — order urgently' },
    active: true,
  },
  {
    id: 'i5',
    name: { th: 'เห็ดเข็มทอง', en: 'Enoki mushroom' },
    sku: 'MUSH-001',
    category: 'mushroom',
    unit: 'kg',
    stock: 6,
    minStock: 5,
    cost: 120,
    supplierId: 's2',
    predictedDemand: 9,
    confidence: 81,
    reason: { th: 'เมนูยอดนิยมในชุด Delivery', en: 'Popular item in delivery sets' },
    active: true,
  },
  {
    id: 'i6',
    name: { th: 'เส้นบุก', en: 'Konjac noodles' },
    sku: 'NOOD-001',
    category: 'noodle',
    unit: 'kg',
    stock: 12,
    minStock: 10,
    cost: 90,
    supplierId: 's1',
    predictedDemand: 20,
    confidence: 87,
    reason: { th: 'Delivery เพิ่มขึ้นช่วงฝนตก ใช้เส้นมากขึ้น', en: 'Rainy-day delivery orders use more noodles' },
    active: true,
  },
  {
    id: 'i7',
    name: { th: 'น้ำซุป', en: 'Soup base' },
    sku: 'SOUP-001',
    category: 'soup',
    unit: 'L',
    stock: 25,
    minStock: 20,
    cost: 45,
    supplierId: 's1',
    predictedDemand: 40,
    confidence: 90,
    reason: { th: 'จำนวนหม้อที่คาดการณ์เพิ่มขึ้น 12%', en: 'Predicted hot-pot count up 12%' },
    active: true,
  },
  {
    id: 'i8',
    name: { th: 'น้ำจิ้มสุกี้', en: 'Suki dipping sauce' },
    sku: 'SAUC-001',
    category: 'sauce',
    unit: 'L',
    stock: 8,
    minStock: 10,
    cost: 80,
    supplierId: 's1',
    predictedDemand: 14,
    confidence: 89,
    reason: { th: 'ต่ำกว่าขั้นต่ำ และใช้มากขึ้นกับ Delivery', en: 'Below minimum and used more for delivery' },
    active: true,
  },
  {
    id: 'i9',
    name: { th: 'ไข่ไก่', en: 'Eggs' },
    sku: 'EGG-001',
    category: 'other',
    unit: 'tray',
    stock: 5,
    minStock: 6,
    cost: 110,
    supplierId: 's4',
    predictedDemand: 8,
    confidence: 86,
    reason: { th: 'ต่ำกว่าขั้นต่ำเล็กน้อย', en: 'Slightly below minimum' },
    active: true,
  },
  {
    id: 'i10',
    name: { th: 'เต้าหู้ไข่', en: 'Egg tofu' },
    sku: 'OTH-002',
    category: 'other',
    unit: 'pack',
    stock: 15,
    minStock: 10,
    cost: 35,
    supplierId: 's1',
    predictedDemand: 12,
    confidence: 83,
    reason: { th: 'สต็อกเพียงพอสำหรับพรุ่งนี้', en: "Enough stock for tomorrow" },
    active: true,
  },
]

export const reduceRecommendations = [{ itemId: 'i2', percent: 10 }]

export const initialOrders: PurchaseOrder[] = [
  {
    id: 'PO-2026-0141',
    createdAt: '2026-10-07',
    lines: [
      { itemId: 'i3', qty: 8, supplierId: 's2', unitCost: 100 },
      { itemId: 'i5', qty: 4, supplierId: 's2', unitCost: 120 },
    ],
    notes: 'ส่งก่อน 10:00 น.',
    status: 'received',
  },
  {
    id: 'PO-2026-0140',
    createdAt: '2026-10-06',
    lines: [
      { itemId: 'i1', qty: 20, supplierId: 's1', unitCost: 250 },
      { itemId: 'i7', qty: 30, supplierId: 's1', unitCost: 45 },
      { itemId: 'i6', qty: 10, supplierId: 's1', unitCost: 90 },
    ],
    notes: '',
    status: 'received',
  },
]

export const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'ai',
    title: { th: 'คำแนะนำใหม่จาก AI', en: 'New AI recommendation' },
    body: { th: 'พรุ่งนี้ควรสั่งหมูสไลด์เพิ่ม 15 กก.', en: 'Order 15 kg more sliced pork for tomorrow' },
    time: { th: '10 นาทีที่แล้ว', en: '10 min ago' },
    read: false,
    href: '/purchase-orders',
  },
  {
    id: 'n2',
    type: 'stock',
    title: { th: 'ผักบุ้งต่ำกว่าขั้นต่ำ', en: 'Morning glory below minimum' },
    body: { th: 'คงเหลือ 4 กก. (ขั้นต่ำ 6 กก.)', en: '4 kg left (minimum 6 kg)' },
    time: { th: '1 ชั่วโมงที่แล้ว', en: '1 hour ago' },
    read: false,
    href: '/inventory',
  },
  {
    id: 'n3',
    type: 'forecast',
    title: { th: 'อัปเดตการพยากรณ์', en: 'Forecast updated' },
    body: { th: 'ยอดขายวันเสาร์คาดว่าจะสูงถึง ฿38,500', en: 'Saturday sales expected to reach ฿38,500' },
    time: { th: '3 ชั่วโมงที่แล้ว', en: '3 hours ago' },
    read: false,
    href: '/forecast',
  },
  {
    id: 'n4',
    type: 'order',
    title: { th: 'รับของเรียบร้อย', en: 'Delivery received' },
    body: { th: 'PO-2026-0141 จาก Fresh Farm Thailand', en: 'PO-2026-0141 from Fresh Farm Thailand' },
    time: { th: 'เมื่อวาน', en: 'Yesterday' },
    read: true,
    href: '/purchase-orders',
  },
]

const WEEKDAY_BASE = [35200, 18200, 19500, 21200, 23500, 31200, 38500]

function noise(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function iso(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export type SalesPoint = { date: string; actual: number | null; forecast: number | null }

const FIXED_WEEK: Record<string, number> = {
  '2026-10-05': 18200,
  '2026-10-06': 19500,
  '2026-10-07': 21200,
  '2026-10-08': 28450,
  '2026-10-09': 31200,
  '2026-10-10': 38500,
  '2026-10-11': 35200,
}

export function getSalesSeries(range: 7 | 30 | 90): SalesPoint[] {
  const forecastDays = 3
  const historyDays = range === 7 ? 4 : range - forecastDays
  const points: SalesPoint[] = []
  for (let i = historyDays - 1; i >= -forecastDays; i--) {
    const d = new Date(TODAY)
    d.setDate(TODAY.getDate() - i)
    const key = iso(d)
    const trend = 1 - i * 0.0012
    const value =
      FIXED_WEEK[key] ?? Math.round((WEEKDAY_BASE[d.getDay()] * trend * (0.9 + noise(i + 7) * 0.2)) / 10) * 10
    const isFuture = i < 0
    const isToday = i === 0
    points.push({
      date: key,
      actual: isFuture ? null : value,
      forecast: isFuture || isToday ? value : null,
    })
  }
  return points
}

export type ForecastPoint = { date: string; predicted: number; range: [number, number] }

export function getForecastSeries(days: 7 | 14 | 30): ForecastPoint[] {
  const points: ForecastPoint[] = []
  for (let i = 1; i <= days; i++) {
    const d = new Date(TODAY)
    d.setDate(TODAY.getDate() + i)
    const key = iso(d)
    const base = FIXED_WEEK[key] ?? Math.round((WEEKDAY_BASE[d.getDay()] * (1 + i * 0.002) * (0.94 + noise(i + 101) * 0.12)) / 10) * 10
    const spread = 0.06 + i * 0.006
    points.push({
      date: key,
      predicted: base,
      range: [Math.round(base * (1 - spread)), Math.round(base * (1 + spread))],
    })
  }
  return points
}

export const forecastConfidence: Record<7 | 14 | 30, number> = { 7: 82, 14: 76, 30: 68 }

export const factorWeights = [
  { key: 'history', weight: 42 },
  { key: 'dayOfWeek', weight: 21 },
  { key: 'payday', weight: 13 },
  { key: 'weather', weight: 11 },
  { key: 'holidays', weight: 8 },
  { key: 'inventory', weight: 5 },
] as const

export const importHistory = [
  { file: 'wongnai_pos_sep_2026.csv', date: '2026-10-01', rows: 3842, source: 'Wongnai POS' },
  { file: 'sales_aug_2026.csv', date: '2026-09-02', rows: 3615, source: 'CSV' },
  { file: 'sales_jul_2026.csv', date: '2026-08-01', rows: 3530, source: 'CSV' },
]

export const sampleCsv = `วันที่,ชื่อสินค้า,รหัสสินค้า,จำนวน,ราคาต่อหน่วย,ยอดรวม
2026-10-01,หมูสไลด์,MEAT-001,25,250,6250
2026-10-01,เนื้อวัว,MEAT-002,18,420,7560
2026-10-01,ผักกาดขาว,VEG-001,12,100,1200
2026-10-01,ผักบุ้ง,VEG-002,8,60,480
2026-10-02,เห็ดเข็มทอง,MUSH-001,7,120,840
2026-10-02,เส้นบุก,NOOD-001,15,90,1300
2026-10-02,น้ำซุป,SOUP-001,32,45,1440
2026-10-02,น้ำจิ้มสุกี้,,10,80,800
2026-10-03,ไข่ไก่,EGG-001,abc,110,0
2026-10-03,หมูสไลด์,MEAT-001,28,250,7000
2026-10-03,เต้าหู้ไข่,OTH-002,9,35,315
2026-10-03,ชาเย็น,DRK-009,20,25,500`

export const SAMPLE_SUMMARY = { rows: 1245, valid: 1230, warnings: 10, errors: 5 }
