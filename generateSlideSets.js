const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const slidesDir = path.join(__dirname, 'slides');
const csvFilePath = path.join(__dirname, 'leetcode-crawler', 'leetcode_intuition_visualization_statistics.csv');

function getSlideSets(slidesDir, topics) {
    const slideSets = [];

    const slideTitles = fs.readdirSync(slidesDir);

    slideTitles.forEach(title => {
        const titlePath = path.join(slidesDir, title);
        const pagesDir = path.join(titlePath, '1');

        if (fs.existsSync(pagesDir)) {
            const paths = fs.readdirSync(pagesDir)
                .filter(file => file.endsWith('.png'))
                .map(file => path.join('/slides', title, '1', file).replace(/\\/g, '/'));

            const slideTopics = topics[title] || ['Default Topic'];

            slideSets.push({
                title: title,
                paths: paths,
                total: paths.length,
                topics: slideTopics // Use topics from CSV or default topic
            });
        }
    });

    return slideSets;
}

function readTopicsFromCSV(csvFilePath, callback) {
    const topics = {};

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row["Problem Name"] && row.Topics) {
                const title = row["Problem Name"];
                const topic = row.Topics.split(','); // Assuming topics are comma-separated
                topics[title] = topic;
            } else {
                console.warn(`Skipping row with missing data: ${JSON.stringify(row)}`);
            }
        })
        .on('end', () => {
            callback(topics);
        });
}

// Read topics from CSV and generate slideSets
readTopicsFromCSV(csvFilePath, (topics) => {
    const slideSets = getSlideSets(slidesDir, topics);
    fs.writeFileSync(path.join(__dirname, 'slides-website', 'slideSets.json'), JSON.stringify(slideSets, null, 2));
    console.log('slideSets generated and saved to slides-website/slideSets.json');
});
