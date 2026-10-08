'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  initialItems,
  initialNotifications,
  initialOrders,
  initialSuppliers,
  type AppNotification,
  type Item,
  type PurchaseOrder,
  type RestaurantType,
  type Supplier,
} from './mock-data'

export type User = {
  name: string
  email: string
  restaurant: string
  restaurantType: RestaurantType
}

export type Settings = {
  notifications: { lowStock: boolean; aiRec: boolean; purchaseReminder: boolean; forecastUpdates: boolean }
  defaultHorizon: '7' | '14' | '30'
  safetyStock: number
  autoSuggest: boolean
  branches: number
  openingHours: string
}

const defaultSettings: Settings = {
  notifications: { lowStock: true, aiRec: true, purchaseReminder: true, forecastUpdates: false },
  defaultHorizon: '7',
  safetyStock: 10,
  autoSuggest: false,
  branches: 1,
  openingHours: '11:00 – 22:00',
}

const USER_KEY = 'smartstock-user'
const SIDEBAR_KEY = 'smartstock-sidebar-collapsed'

type AppStore = {
  hydrated: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (patch: Partial<User>) => void

  items: Item[]
  updateStock: (id: string, stock: number) => void
  upsertItem: (item: Item) => void
  deleteItem: (id: string) => void

  suppliers: Supplier[]
  upsertSupplier: (supplier: Supplier) => void
  deleteSupplier: (id: string) => void

  orders: PurchaseOrder[]
  upsertOrder: (order: PurchaseOrder) => void
  setOrderStatus: (id: string, status: PurchaseOrder['status']) => void
  nextOrderId: () => string

  notifications: AppNotification[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void

  sidebarCollapsed: boolean
  toggleSidebar: () => void

  settings: Settings
  updateSettings: (patch: Partial<Settings>) => void
}

const AppStoreContext = createContext<AppStore | null>(null)

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [items, setItems] = useState<Item[]>(initialItems)
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [orders, setOrders] = useState<PurchaseOrder[]>(initialOrders)
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY) ?? window.sessionStorage.getItem(USER_KEY)
      if (raw) setUser(JSON.parse(raw) as User)
      setSidebarCollapsed(window.localStorage.getItem(SIDEBAR_KEY) === '1')
    } catch {
      // Corrupt storage is ignored; the user simply logs in again.
    }
    setHydrated(true)
  }, [])

  const login = useCallback((next: User) => {
    setUser(next)
    window.localStorage.setItem(USER_KEY, JSON.stringify(next))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    window.localStorage.removeItem(USER_KEY)
    window.sessionStorage.removeItem(USER_KEY)
  }, [])

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...patch }
      window.localStorage.setItem(USER_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const updateStock = useCallback((id: string, stock: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, stock: Math.max(0, stock) } : i)))
  }, [])

  const upsertItem = useCallback((item: Item) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev.map((i) => (i.id === item.id ? item : i)) : [...prev, item]))
  }, [])

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const upsertSupplier = useCallback((supplier: Supplier) => {
    setSuppliers((prev) =>
      prev.some((s) => s.id === supplier.id) ? prev.map((s) => (s.id === supplier.id ? supplier : s)) : [...prev, supplier],
    )
  }, [])

  const deleteSupplier = useCallback((id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const upsertOrder = useCallback((order: PurchaseOrder) => {
    setOrders((prev) => (prev.some((o) => o.id === order.id) ? prev.map((o) => (o.id === order.id ? order : o)) : [order, ...prev]))
    if (order.status === 'ordered') {
      const supplierIds = new Set(order.lines.map((l) => l.supplierId))
      setSuppliers((prev) => prev.map((s) => (supplierIds.has(s.id) ? { ...s, lastOrder: order.createdAt } : s)))
    }
  }, [])

  const setOrderStatus = useCallback(
    (id: string, status: PurchaseOrder['status']) => {
      const order = orders.find((o) => o.id === id)
      if (!order) return
      upsertOrder({ ...order, status })
      if (status === 'received') {
        setItems((prev) =>
          prev.map((i) => {
            const qty = order.lines.filter((l) => l.itemId === i.id).reduce((sum, l) => sum + l.qty, 0)
            return qty ? { ...i, stock: i.stock + qty } : i
          }),
        )
      }
    },
    [orders, upsertOrder],
  )

  const nextOrderId = useCallback(() => {
    const max = orders.reduce((m, o) => Math.max(m, Number(o.id.split('-').pop()) || 0), 0)
    return `PO-2026-${String(max + 1).padStart(4, '0')}`
  }, [orders])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      window.localStorage.setItem(SIDEBAR_KEY, prev ? '0' : '1')
      return !prev
    })
  }, [])

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  const value = useMemo<AppStore>(
    () => ({
      hydrated,
      user,
      login,
      logout,
      updateUser,
      items,
      updateStock,
      upsertItem,
      deleteItem,
      suppliers,
      upsertSupplier,
      deleteSupplier,
      orders,
      upsertOrder,
      setOrderStatus,
      nextOrderId,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      sidebarCollapsed,
      toggleSidebar,
      settings,
      updateSettings,
    }),
    [
      hydrated,
      user,
      login,
      logout,
      updateUser,
      items,
      updateStock,
      upsertItem,
      deleteItem,
      suppliers,
      upsertSupplier,
      deleteSupplier,
      orders,
      upsertOrder,
      setOrderStatus,
      nextOrderId,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      sidebarCollapsed,
      toggleSidebar,
      settings,
      updateSettings,
    ],
  )

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}
