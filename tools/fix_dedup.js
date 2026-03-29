const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '../img');
const processedDir = path.join(imgDir, 'Fotos_processed');
const duplicatesDir = path.join(imgDir, 'Fotos_duplicates');
const projectsDir = path.join(imgDir, 'galerie', 'projekte');

async function getDHash(imagePath) {
    try {
        const buffer = fs.readFileSync(imagePath);
        const { data } = await sharp(buffer)
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

async function run() {
    // 1. Move all duplicates back temporarily
    if (fs.existsSync(duplicatesDir)) {
        const dupFiles = fs.readdirSync(duplicatesDir).filter(f => f.endsWith('.webp'));
        for (const file of dupFiles) {
            fs.renameSync(path.join(duplicatesDir, file), path.join(processedDir, file));
        }
        console.log(`Habe temporär ${dupFiles.length} Bilder aus dem Duplikat-Ordner zurückgeholt.`);
    }

    const knownHashes = [];
    
    // 2. Learn project hashes
    if (fs.existsSync(projectsDir)) {
        const projFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.webp'));
        for (const file of projFiles) {
            const hash = await getDHash(path.join(projectsDir, file));
            if (hash) knownHashes.push({ file, hash });
        }
    }

    // 3. Re-run deduplication with BALANCED threshold (12 instead of 18)
    const procFiles = fs.readdirSync(processedDir).filter(f => f.endsWith('.webp'));
    let duplicatesFound = 0;

    for (const file of procFiles) {
        const filePath = path.join(processedDir, file);
        const hash = await getDHash(filePath);
        if (!hash) continue;

        let isDuplicate = false;
        for (const known of knownHashes) {
            // Balanced threshold allowing slight camera movement but distinctly different shots
            if (hammingDistance(hash, known.hash) < 15) {
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

    console.log(`Perfekte Reduzierung: ${duplicatesFound} wirklich sehr ähnliche Bilder aussortiert!`);
    console.log(`Es bleiben ${procFiles.length - duplicatesFound} Bilder im Tool für dich.`);
}

run();
