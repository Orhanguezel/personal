'use client';

// =============================================================
// FILE: src/app/(main)/admin/_components/sidebar/app-sidebar.tsx
// FINAL — RTK/Redux uyumlu (zustand yok)
// - NavMain: NavGroup[] alır (senin nav-main.tsx böyle)
// =============================================================

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { buildAdminSidebarItems } from '@/navigation/sidebar/sidebar-items';
import type { NavGroup } from '@/navigation/sidebar/sidebar-items';

import { useAdminUiCopy } from '@/app/(main)/admin/_components/common/useAdminUiCopy';
import { useAdminSession } from '@/app/(main)/admin/_components/admin-session';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

type Role = 'admin' | string;

type SidebarMe = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  roles?: Role[];
};

function hasRole(me: SidebarMe, role: Role) {
  if (me.role === role) return true;
  const rs = Array.isArray(me.roles) ? me.roles : [];
  return rs.includes(role);
}

export function AppSidebar({
  appName,
  profile,
  variant,
  collapsible,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  appName?: string;
  profile: 'gwd' | 'gzl';
}) {
  const { copy } = useAdminUiCopy();
  const session = useAdminSession();
  const me: SidebarMe = {
    id: session.id,
    name: session.email?.split('@')[0] || 'Admin',
    email: session.email || '',
    role: session.role,
    roles: [session.role],
    avatar: '',
  };
  const label = (copy.app_name || appName || '').trim();

  // ✅ admin ise tüm menu, değilse sadece dashboard
  const groupsForMe: NavGroup[] = hasRole(me, 'admin')
    ? buildAdminSidebarItems(copy.nav)
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            if (profile === 'gzl' && ['/admin/resume', '/admin/skills'].includes(item.url)) {
              return false;
            }
            return !['/admin/chat', '/admin/mail', '/admin/support'].includes(item.url);
          }),
        }))
        .filter((group) => group.items.length > 0)
    : [
        {
          id: 1,
          label: '',
          items: [
            {
              title: copy.nav?.items?.dashboard || '',
              url: '/admin/dashboard',
              icon: LayoutDashboard,
            },
          ],
        },
      ];

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link prefetch={false} href="/admin/dashboard">
                <LayoutDashboard className="!size-5" />
                <span className="font-semibold text-base">{label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* ✅ NavMain NavGroup[] bekliyor */}
        <NavMain items={groupsForMe} showQuickCreate={false} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{ name: me.name, email: me.email, avatar: me.avatar }} />
      </SidebarFooter>
    </Sidebar>
  );
}
