const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../img');
const processedDir = path.join(imgDir, 'Fotos_processed');
const duplicatesDir = path.join(imgDir, 'Fotos_duplicates');

const files = fs.readdirSync(processedDir).filter(f => f.endsWith('.webp'));
const seenMinutes = new Set();
let duplicatesFound = 0;

for (const file of files) {
    // "WhatsApp Image 2026-03-28 at 12.11.04.webp" -> Extract "12.11"
    const match = file.match(/at (\d{2}\.\d{2})\.\d{2}/);
    if (match) {
        const hourMinute = match[1];
        if (seenMinutes.has(hourMinute)) {
            // Already have a photo from this exact minute, move to duplicates
            fs.renameSync(path.join(processedDir, file), path.join(duplicatesDir, file));
            duplicatesFound++;
        } else {
            seenMinutes.add(hourMinute);
        }
    }
}

console.log(`Zeit-Filter (1 Bild pro Aufnahmeminute) hat ${duplicatesFound} Burst-Bilder aussortiert!`);
console.log(`Es bleiben noch ${files.length - duplicatesFound} Bilder übrig.`);
