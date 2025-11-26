import { SubdomainDTO, TenantDTO } from '@/api/entities';

export type AdminPanelView = 'tenant' | 'overview' | 'products' | 'customization' | 'analytics' | 'settings';

export interface AdminState {
  view: AdminPanelView;
  tenant: TenantDTO | null;
  subdomain: SubdomainDTO | null;
  // actions
  init: () => Promise<void>;
}
