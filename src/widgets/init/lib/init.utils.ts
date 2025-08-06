import { SubdomainName } from '../types';
import { subdomains } from './init.constants';

export const isSubdomain = (str: string | null): str is SubdomainName => subdomains.includes(str as SubdomainName);
