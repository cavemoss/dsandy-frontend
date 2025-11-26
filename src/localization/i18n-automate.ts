import fs from 'fs';
import path from 'path';
import { Node, Project, SyntaxKind } from 'ts-morph';

// Config: Adjust these
const project = new Project({ tsConfigFilePath: 'tsconfig.json' }); // Point to your tsconfig
const filesToProcess = project.getSourceFiles('src/**/*.tsx'); // Glob for your components/pages
const translationFilePath = 'src/localization/locales/en.json'; // Output JSON
let translations: Record<string, string> = {};

if (fs.existsSync(translationFilePath)) {
  translations = JSON.parse(fs.readFileSync(translationFilePath, 'utf-8'));
}

filesToProcess.forEach((sourceFile) => {
  // Add import if missing
  const hasImport = sourceFile.getImportDeclaration((imp) => imp.getModuleSpecifierValue() === 'react-i18next');
  if (!hasImport) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: 'react-i18next',
      namedImports: ['useTranslation'],
    });
  }

  // Traverse JSX text nodes
  sourceFile.forEachDescendant((node) => {
    if (Node.isJsxText(node) && node.getText().trim().length > 0) {
      const text = node.getText().trim();
      const fileName = path.basename(sourceFile.getFilePath(), '.tsx');
      const key = `${fileName}.${text.replace(/\s+/g, '_').toLowerCase()}`; // Unique key

      // Add to translations if new
      if (!translations[key]) {
        translations[key] = text;
      }

      // Replace with t call (as JSX expression)
      node.replaceWithText(`{t('${key}', { defaultValue: '${text}' })}`);
    }
  });

  // Add useTranslation hook to functional components if missing
  sourceFile.getFunctions().forEach((func) => {
    if (func.isExported() || func.getName()?.startsWith('YourComponent')) {
      // Target components
      const hasHook = func
        .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
        .some((decl) => decl.getText().includes('useTranslation'));
      if (!hasHook) {
        func.insertStatements(0, 'const { t } = useTranslation();');
      }
    }
  });

  sourceFile.saveSync();
});

// Write updated translations
fs.mkdirSync(path.dirname(translationFilePath), { recursive: true });
fs.writeFileSync(translationFilePath, JSON.stringify(translations, null, 2));

console.log('Automation complete! Check changes and run git diff to review.');
