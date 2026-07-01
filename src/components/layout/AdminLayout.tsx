'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  GraduationCap,
  Presentation,
  FileText,
  Image,
  Link2,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Research & Projects', icon: FolderOpen },
  { href: '/admin/teaching', label: 'Teaching', icon: GraduationCap },
  { href: '/admin/workshops', label: 'Workshops', icon: Presentation },
  { href: '/admin/posts', label: 'Blog / Vlog', icon: FileText },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/resources', label: 'Resources', icon: Link2 },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
]

async function handleLogout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/admin/login'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex bg-da-bg">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-da-surface border-r border-da-border-subtle flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-da-border-subtle">
          <Link href="/" className="font-serif text-sm font-semibold text-da-text hover:text-da-accent transition-colors">
            ← Albert Łukasik
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5" aria-label="Admin navigation">
          <p className="da-label px-3 pt-3 pb-2">Content</p>
          {adminNav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors group',
                  active
                    ? 'bg-da-accent-dim text-da-accent'
                    : 'text-da-text-muted hover:text-da-text hover:bg-da-surface-raised'
                )}
              >
                <item.icon size={15} className="shrink-0" />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={12} className="opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-da-border-subtle">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-da-text-muted hover:text-da-error hover:bg-da-surface-raised transition-colors"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
