import './styles.css';

console.log('JavaScript loaded');

let slidesPerPage = 20;
let currentPage = 0;
let slideSets = [];
let filteredSlideSets = [];

const topicColorMapping = {
    'array': '#ADD8E6',
    'tree': '#90EE90',
    'graph': '#FFB6C1',
    'dynamic programming': '#FFD700',
    'string': '#FF69B4',
    'math': '#CD5C5C',
    'hash table': '#FFA07A',
    'depth-first search': '#20B2AA',
    'breadth-first search': '#778899',
    'two pointers': '#B0E0E6',
    'binary search': '#32CD32',
    'backtracking': '#FF4500',
    'greedy': '#DA70D6',
    'heap': '#EEE8AA',
    'default': '#D3D3D3'
};

function getColorForTopic(topic) {
    const normalizedTopic = topic.trim().toLowerCase();
    return topicColorMapping[normalizedTopic] || topicColorMapping['default'];
}

function createTopicElement(topic, isClickable = false) {
    const topicElement = document.createElement('span');
    topicElement.classList.add('topic-label');
    topicElement.textContent = topic;
    topicElement.style.backgroundColor = getColorForTopic(topic);
    if (isClickable) {
        topicElement.classList.add('clickable');
        topicElement.addEventListener('click', () => filterSlidesByTopics([topic]));
    }
    return topicElement;
}

function createSlideSection(slideSet, index) {
    const section = document.createElement('section');
    section.classList.add('slide-section');
    
    const title = document.createElement('h2');
    title.textContent = slideSet.title;
    section.appendChild(title);

    const link = document.createElement('a');
    link.href = slideSet.link;
    link.textContent = 'Problem Link';
    link.target = '_blank';
    section.appendChild(link);

    const topics = document.createElement('div');
    topics.classList.add('topics');
    slideSet.topics.forEach(topic => {
        const topicElement = createTopicElement(topic);
        topics.appendChild(topicElement);
    });
    section.appendChild(topics);

    const img = document.createElement('img');
    img.id = `slide-image-${index}`;
    img.src = `/intuition-visualisation/${slideSet.paths[0]}`;
    img.dataset.page = 0;
    section.appendChild(img);

    const controls = document.createElement('div');
    controls.classList.add('controls');
    
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    
    const prevButton = document.createElement('button');
    prevButton.textContent = '◀';
    prevButton.addEventListener('click', () => updateSlide(index, -1));
    buttonGroup.appendChild(prevButton);
    
    const nextButton = document.createElement('button');
    nextButton.textContent = '▶';
    nextButton.addEventListener('click', () => updateSlide(index, 1));
    buttonGroup.appendChild(nextButton);
    
    controls.appendChild(buttonGroup);
    
    const pageInfo = document.createElement('div');
    pageInfo.id = `page-info-${index}`;
    pageInfo.textContent = `1 / ${slideSet.total}`;
    controls.appendChild(pageInfo);
    
    section.appendChild(controls);
    
    document.getElementById('slides-container').appendChild(section);
}

function updateSlide(index, direction) {
    const slideSet = filteredSlideSets[index];
    const img = document.getElementById(`slide-image-${index}`);
    const pageInfo = document.getElementById(`page-info-${index}`);
    
    let currentPage = parseInt(img.dataset.page) || 0;
    currentPage += direction;
    
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= slideSet.total) currentPage = slideSet.total - 1;
    
    img.src = `/intuition-visualisation/${slideSet.paths[currentPage]}`;
    img.dataset.page = currentPage;
    pageInfo.textContent = `${currentPage + 1} / ${slideSet.total}`;
}

function renderPage(page, slideSets) {
    const container = document.getElementById('slides-container');
    container.innerHTML = '';

    const start = page * slidesPerPage;
    const end = Math.min(start + slidesPerPage, slideSets.length);

    for (let i = start; i < end; i++) {
        createSlideSection(slideSets[i], i);
    }

    updatePaginationControls(page, slideSets);
    updateSlideCount(slideSets.length);
}

function updatePaginationControls(currentPage, slideSets) {
    const totalPages = Math.ceil(slideSets.length / slidesPerPage);
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i + 1;
        if (i === currentPage) {
            pageButton.disabled = true;
        } else {
            pageButton.addEventListener('click', () => renderPage(i, slideSets));
        }
        paginationControls.appendChild(pageButton);
    }
}

function updateSlideCount(count) {
    const slideCountContainer = document.getElementById('slide-count-container');
    slideCountContainer.textContent = `Slides found: ${count}`;
}

function filterSlidesByTopics(topics) {
    const normalizedTopics = topics.map(topic => topic.trim().toLowerCase());
    filteredSlideSets = slideSets.filter(slideSet =>
        normalizedTopics.every(topic => slideSet.topics.map(t => t.trim().toLowerCase()).includes(topic))
    );
    renderPage(0, filteredSlideSets);
}

function renderTopics(topics) {
    const container = document.getElementById('topic-tags-container');
    container.innerHTML = '';

    const uniqueTopics = [...new Set(topics.flat().map(topic => topic.trim().toLowerCase()))];
    uniqueTopics.sort();

    uniqueTopics.forEach(topic => {
        const topicElement = createTopicElement(topic, true);
        container.appendChild(topicElement);
    });
}

document.getElementById('filter-button').addEventListener('click', () => {
    const topicFilterInput = document.getElementById('topic-filter').value;
    const topics = topicFilterInput.split(',');
    filterSlidesByTopics(topics);
});

fetch('/intuition-visualisation/slideSets.json')
    .then(response => response.json())
    .then(data => {
        console.log('Data fetched:', data);
        slideSets = data;
        filteredSlideSets = slideSets;
        const allTopics = slideSets.map(slideSet => slideSet.topics);
        renderTopics(allTopics);
        renderPage(0, slideSets);
    });
