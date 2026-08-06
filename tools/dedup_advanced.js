const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '../img');
const processedDir = path.join(imgDir, 'Fotos_processed');
const duplicatesDir = path.join(imgDir, 'Fotos_duplicates');
const projectsDir = path.join(imgDir, 'galerie', 'projekte');

async function getThumb(imagePath) {
    try {
        const buffer = fs.readFileSync(imagePath);
        const { data } = await sharp(buffer)
            .resize(16, 16, { fit: 'fill' }) // 16x16 = 256 pixels
            .removeAlpha()
            .raw() // R,G,B (3 channels per pixel, 768 values)
            .toBuffer({ resolveWithObject: true });
        return data; // Uint8Array
    } catch (e) {
        return null;
    }
}

// Calculate Root Mean Square Error (RMSE) between two 16x16 RGB arrays
function calculateRMSE(data1, data2) {
    let sumSquares = 0;
    for (let i = 0; i < data1.length; i++) {
        const diff = data1[i] - data2[i];
        sumSquares += (diff * diff);
    }
    return Math.sqrt(sumSquares / data1.length);
}

async function run() {
    const knownHashes = [];
    
    // Learn projects
    if (fs.existsSync(projectsDir)) {
        const projFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.webp'));
        for (const file of projFiles) {
            const data = await getThumb(path.join(projectsDir, file));
            if (data) knownHashes.push({ file, data });
        }
    }

    const procFiles = fs.readdirSync(processedDir).filter(f => f.endsWith('.webp'));
    let duplicatesFound = 0;

    for (const file of procFiles) {
        const filePath = path.join(processedDir, file);
        const data = await getThumb(filePath);
        if (!data) continue;

        let isDuplicate = false;
        let minScore = 999;
        
        for (const known of knownHashes) {
            const rmse = calculateRMSE(data, known.data);
            if (rmse < minScore) minScore = rmse;
            
            // RMSE < 18 out of 255 usually means "almost the same image" structurally and color-wise.
            if (rmse < 18) { 
                isDuplicate = true;
                break;
            }
        }

        if (isDuplicate) {
            fs.renameSync(filePath, path.join(duplicatesDir, file));
            duplicatesFound++;
        } else {
            knownHashes.push({ file, data });
        }
    }

    console.log(`Farb- & Struktur-Analyse abgeschlossen!`);
    console.log(`${duplicatesFound} weitere extrem ähnliche Bilder aussortiert.`);
    console.log(`Es bleiben noch ${procFiles.length - duplicatesFound} Bilder übrig.`);
}

run();
