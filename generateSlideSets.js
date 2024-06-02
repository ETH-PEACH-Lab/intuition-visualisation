const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const slidesDir = path.join(__dirname, 'slides');
const csvFilePath = path.join(__dirname, 'leetcode-crawler', 'leetcode_intuition_visualization_statistics.csv');

function getSlideSets(slidesDir, topicsAndLinks) {
    const slideSets = [];

    const slideTitles = fs.readdirSync(slidesDir);

    slideTitles.forEach(title => {
        const titlePath = path.join(slidesDir, title);
        const pagesDir = path.join(titlePath, '1');

        if (fs.existsSync(pagesDir)) {
            const paths = fs.readdirSync(pagesDir)
                .filter(file => file.endsWith('.png'))
                .map(file => path.join('/slides', title, '1', file).replace(/\\/g, '/'));

            const slideData = topicsAndLinks[title] || { topics: ['Default Topic'], link: '#' };

            slideSets.push({
                title: title,
                paths: paths,
                total: paths.length,
                topics: slideData.topics, // Use topics from CSV or default topic
                link: slideData.link // Use link from CSV or default value
            });
        }
    });

    return slideSets;
}

function readTopicsAndLinksFromCSV(csvFilePath, callback) {
    const topicsAndLinks = {};

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row["Problem Name"] && row.Topics && row["Problem Link"]) {
                const title = row["Problem Name"];
                const topic = row.Topics.split(','); // Assuming topics are comma-separated
                const link = row["Problem Link"];
                topicsAndLinks[title] = { topics: topic, link: link };
            } else {
                console.warn(`Skipping row with missing data: ${JSON.stringify(row)}`);
            }
        })
        .on('end', () => {
            callback(topicsAndLinks);
        });
}

// Read topics and links from CSV and generate slideSets
readTopicsAndLinksFromCSV(csvFilePath, (topicsAndLinks) => {
    const slideSets = getSlideSets(slidesDir, topicsAndLinks);
    fs.writeFileSync(path.join(__dirname, 'slides-website', 'slideSets.json'), JSON.stringify(slideSets, null, 2));
    console.log('slideSets generated and saved to slides-website/slideSets.json');
});
