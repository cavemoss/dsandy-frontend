export interface PhoneFormat {
  code: string;
  iso: string;
  mask: string;
  placeholder: string;
}

export const phoneFormats: PhoneFormat[] = [
  { code: '+1', iso: 'US', mask: '(###) ###-####', placeholder: '(555) 123-4567' },
  { code: '+44', iso: 'GB', mask: '#### ######', placeholder: '7700 900123' },
  { code: '+91', iso: 'IN', mask: '##### #####', placeholder: '98765 43210' },
  { code: '+86', iso: 'CN', mask: '### #### ####', placeholder: '138 1234 5678' },
  { code: '+55', iso: 'BR', mask: '(##) #####-####', placeholder: '(11) 98765-4321' },
  { code: '+7', iso: 'RU', mask: '(###) ###-##-##', placeholder: '(495) 123-45-67' },
  { code: '+81', iso: 'JP', mask: '###-####-####', placeholder: '090-1234-5678' },
  { code: '+49', iso: 'DE', mask: '(###) ###', placeholder: '(030) 123 456' },
  { code: '+33', iso: 'FR', mask: '# ## ## ## ##', placeholder: '6 12 34 56 78' },
  { code: '+52', iso: 'MX', mask: '## #### ####', placeholder: '55 1234 5678' },
  { code: '+234', iso: 'NG', mask: '## ### ####', placeholder: '80 123 4567' },
  { code: '+62', iso: 'ID', mask: '## ### ### ##', placeholder: '81 2345 6789' },
  { code: '+90', iso: 'TR', mask: '(###) ### ## ##', placeholder: '(212) 123 45 67' },
  { code: '+971', iso: 'AE', mask: '# ### ####', placeholder: '50 123 4567' },
  { code: '+966', iso: 'SA', mask: '# ### ####', placeholder: '50 123 4567' },
  { code: '+380', iso: 'UA', mask: '(##) ### ####', placeholder: '(50) 123 4567' },
  { code: '+39', iso: 'IT', mask: '### #### ####', placeholder: '340 123 4567' },
  { code: '+34', iso: 'ES', mask: '### ### ###', placeholder: '612 345 678' },
  { code: '+82', iso: 'KR', mask: '### #### ####', placeholder: '010 1234 5678' },
  { code: '+60', iso: 'MY', mask: '##-### ###', placeholder: '19-123 4567' },
  { code: '+65', iso: 'SG', mask: '#### ####', placeholder: '9123 4567' },
  { code: '+61', iso: 'AU', mask: '# #### ####', placeholder: '4 1234 5678' },
  { code: '+27', iso: 'ZA', mask: '## ### ####', placeholder: '82 123 4567' },
  { code: '+54', iso: 'AR', mask: '(##) ####-####', placeholder: '(11) 1234-5678' },
  { code: '+20', iso: 'EG', mask: '(###) ### ####', placeholder: '(100) 123 4567' },
  { code: '+63', iso: 'PH', mask: '### ### ####', placeholder: '917 123 4567' },
  { code: '+66', iso: 'TH', mask: '## ### ####', placeholder: '95 123 4567' },
  { code: '+351', iso: 'PT', mask: '### ### ###', placeholder: '912 345 678' },
  { code: '+31', iso: 'NL', mask: '(##) ### ####', placeholder: '(06) 1234 5678' },
  { code: '+46', iso: 'SE', mask: '## ### ####', placeholder: '70 123 4567' },
  { code: '+41', iso: 'CH', mask: '## ### ## ##', placeholder: '79 123 45 67' },
  { code: '+972', iso: 'IL', mask: '# ### ####', placeholder: '5 123 4567' },
  { code: '+84', iso: 'VN', mask: '### #### ###', placeholder: '091 234 5678' },
  { code: '+880', iso: 'BD', mask: '## ### #####', placeholder: '17 123 45678' },
];
