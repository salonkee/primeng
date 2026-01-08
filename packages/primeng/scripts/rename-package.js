const fs = require('fs');
const path = require('path');

// 1. Define the path to the BUILT package.json (inside dist)
// Adjust 'dist/packages/primeng' if your build output location differs
const distPath = path.join(__dirname, '../dist/package.json');

console.log(`Processing: ${distPath}`);

try {
    // 2. Read the file
    const packageJson = JSON.parse(fs.readFileSync(distPath, 'utf8'));

    // 3. Modify the Name
    console.log(`Renaming ${packageJson.name} -> @salonkee/primeng`);
    packageJson.name = '@salonkee/primeng';

    // 4. Ensure Publish Config points to GitHub
    packageJson.publishConfig = {
        registry: 'https://npm.pkg.github.com/'
    };

    // 5. Write it back
    fs.writeFileSync(distPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Success: Package renamed and config updated in dist.');
} catch (err) {
    console.error('❌ Error updating package.json:', err.message);
    process.exit(1);
}
