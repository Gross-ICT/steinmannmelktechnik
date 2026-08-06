const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rawDir = path.join(__dirname, '../img/Fotos_roh');
const processedDir = path.join(__dirname, '../img/Fotos_processed');
const duplicatesDir = path.join(__dirname, '../img/Fotos_duplicates');

// Ensure output directories exist
if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir, { recursive: true });
if (!fs.existsSync(duplicatesDir)) fs.mkdirSync(duplicatesDir, { recursive: true });

// Simple dHash algorithm using sharp
async function getDHash(imagePath) {
    try {
        const { data } = await sharp(imagePath)
            .resize(9, 8, { fit: 'fill' })
            .grayscale()
            .raw()
            .toBuffer({ resolveWithObject: true });

        let hash = '';
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const leftPixel = data[y * 9 + x];
                const rightPixel = data[y * 9 + x + 1];
                hash += leftPixel > rightPixel ? '1' : '0';
            }
        }
        return hash;
    } catch (e) {
        console.error(`Error calculating hash for ${imagePath}:`, e.message);
        return null;
    }
}

function hammingDistance(hash1, hash2) {
    let distance = 0;
    for (let i = 0; i < 64; i++) {
        if (hash1[i] !== hash2[i]) distance++;
    }
    return distance;
}

async function processImages() {
    const files = fs.readdirSync(rawDir).filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    console.log(`Finde ${files.length} Bilder im Ordner Fotos_roh...`);

    const knownHashes = [];
    let duplicatesCount = 0;
    let processedCount = 0;

    for (const [index, file] of files.entries()) {
        const filePath = path.join(rawDir, file);
        process.stdout.write(`\rVerarbeite Bild ${index + 1}/${files.length}...`);
        
        const hash = await getDHash(filePath);
        if (!hash) continue;

        let isDuplicate = false;
        for (const known of knownHashes) {
            if (hammingDistance(hash, known.hash) < 10) {
                isDuplicate = true;
                break;
            }
        }

        if (isDuplicate) {
            const destPath = path.join(duplicatesDir, file);
            fs.copyFileSync(filePath, destPath);
            duplicatesCount++;
        } else {
            knownHashes.push({ file, hash });
            
            // Enhance and save to processed
            const ext = path.extname(file);
            const base = path.basename(file, ext);
            const outPath = path.join(processedDir, `${base}.webp`);
            
            try {
                await sharp(filePath)
                    .rotate() // Auto-orient based on EXIF
                    .normalize() // Auto-contrast / enhance
                    .resize(1200, undefined, { withoutEnlargement: true }) // Max 1200px width
                    .webp({ quality: 80 }) // High quality webp
                    .toFile(outPath);
                processedCount++;
            } catch (err) {
                console.error(`\nFehler bei der Verarbeitung von ${file}: ${err.message}`);
            }
        }
    }

    console.log(`\n\nFertig!`);
    console.log(`Verarbeitete und verbesserte Bilder: ${processedCount} (gespeichert in img/Fotos_processed)`);
    console.log(`Erkannte Duplikate oder sehr ähnliche Bilder: ${duplicatesCount} (kopiert in img/Fotos_duplicates)`);
}

processImages();
