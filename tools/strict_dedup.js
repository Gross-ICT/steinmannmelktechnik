const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '../img');
const processedDir = path.join(imgDir, 'Fotos_processed');
const duplicatesDir = path.join(imgDir, 'Fotos_duplicates');
const projectsDir = path.join(imgDir, 'galerie', 'projekte');

if (!fs.existsSync(duplicatesDir)) fs.mkdirSync(duplicatesDir, { recursive: true });

async function getDHash(imagePath) {
    try {
        const buffer = fs.readFileSync(imagePath);
        const { data } = await sharp(buffer)
            .resize(9, 8, { fit: 'fill' })
            .blur(2) // extra blur to ignore minor details
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

async function runStrictDedup() {
    const knownHashes = [];
    
    // 1. Learn hashes of already categorized images
    if (fs.existsSync(projectsDir)) {
        const projFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.webp'));
        console.log(`Lerne bereits kategorisierte Bilder (${projFiles.length})...`);
        for (const file of projFiles) {
            const hash = await getDHash(path.join(projectsDir, file));
            if (hash) knownHashes.push({ file, hash });
        }
    }

    // 2. Strict dedup on remaining images
    const remainingFiles = fs.readdirSync(processedDir).filter(f => f.endsWith('.webp'));
    console.log(`Prüfe ${remainingFiles.length} verbleibende Bilder sehr streng...`);
    
    let duplicatesFound = 0;

    for (const file of remainingFiles) {
        const filePath = path.join(processedDir, file);
        const hash = await getDHash(filePath);
        if (!hash) continue;

        let isDuplicate = false;
        for (const known of knownHashes) {
            // Strict threshold: < 18 distance means they are structurally very similar
            if (hammingDistance(hash, known.hash) < 18) {
                isDuplicate = true;
                break;
            }
        }

        if (isDuplicate) {
            fs.renameSync(filePath, path.join(duplicatesDir, file));
            duplicatesFound++;
        } else {
            knownHashes.push({ file, hash });
        }
    }

    console.log(`\nEs wurden ${duplicatesFound} weitere ähnliche Bilder in Fotos_duplicates verschoben!`);
}

runStrictDedup();
