'use client';

import { useEffect } from 'react';

import { useInitStore, useNavStore } from '@/widgets/init';

export default function MainPage() {
  const navStore = useNavStore();

  const landingPage = useInitStore((state) => state.subdomain.config.landingPage);

  useEffect(() => {
    navStore.replace(landingPage);
  }, []);

  return <></>;
}
