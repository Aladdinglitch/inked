#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const logoPath = path.join(process.cwd(), 'public/images/logo.png');
const outputDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(logoPath)) {
  console.error('Logo not found at', logoPath);
  console.log('\nPlease ensure logo.png is placed at public/images/logo.png');
  process.exit(1);
}

console.log('✓ Logo found at:', logoPath);
console.log('✓ Favicon assets will be generated at:', outputDir);
console.log('\nTo generate favicons, use an online tool like:');
console.log('  https://realfavicongenerator.net/');
console.log('\nSteps:');
console.log('1. Upload public/images/logo.png');
console.log('2. Select the logo area (the IA monogram)');
console.log('3. Generate and download all formats');
console.log('4. Extract to public/ directory');
