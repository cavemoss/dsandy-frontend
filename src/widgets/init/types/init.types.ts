import { subdomains } from '../lib';

export type SubdomainName = (typeof subdomains)[number];

export interface InitState {
  initialized: boolean;
  // getters
  isDev: () => boolean;
  getSubdomain: () => SubdomainName;
  getInitLogic: () => { [S in SubdomainName]: () => Promise<void> };
  // actions
  init: () => Promise<void>;
}
