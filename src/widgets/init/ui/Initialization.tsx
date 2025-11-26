'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useInitStore } from '../model';
import { useNavStore } from '../model/navigation.store';

export function Initialization() {
  const router = useRouter();

  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    useNavStore.setState({
      push: (href: string) => routerRef.current.push(href),
      replace: (href: string) => routerRef.current.replace(href),
      back: () => routerRef.current.back(),
      prefetch: (href: string) => routerRef.current.prefetch(href),
    });

    useInitStore.getState().init();
  }, []);

  return <></>;
}
