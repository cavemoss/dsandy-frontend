'use client';

import { useAdminStore } from '@/features/admin';
import CustomizationSection from '@/features/admin/ui/Customization copy';

export default function Page() {
  const view = useAdminStore((state) => state.view);

  switch (view) {
    case 'tenant':
      return <>tenant</>;
    case 'overview':
      return <>overview</>;
    case 'products':
      return <>products</>;
    case 'customization':
      return (
        <>
          <CustomizationSection />
        </>
      );
    case 'analytics':
      return <>analytics</>;
    case 'settings':
      return <>settings</>;
    default:
      return <></>;
  }
}
