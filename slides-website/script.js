let slidesPerPage = 7;
let currentPage = 0;
let slideSets = []; // Define slideSets in the global scope

function createSlideSection(slideSet, index) {
    const section = document.createElement('section');
    section.classList.add('slide-section');
    
    const title = document.createElement('h2');
    title.textContent = slideSet.title;
    section.appendChild(title);

    const topics = document.createElement('div');
    topics.classList.add('topics');
    topics.textContent = slideSet.topics.join(' ');
    section.appendChild(topics);

    const img = document.createElement('img');
    img.id = `slide-image-${index}`;
    img.src = slideSet.paths[0];
    img.dataset.page = 0; // Initialize data-page attribute
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
    const slideSet = slideSets[index];
    const img = document.getElementById(`slide-image-${index}`);
    const pageInfo = document.getElementById(`page-info-${index}`);
    
    let currentPage = parseInt(img.dataset.page) || 0;
    currentPage += direction;
    
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= slideSet.total) currentPage = slideSet.total - 1;
    
    img.src = slideSet.paths[currentPage];
    img.dataset.page = currentPage; // Update data-page attribute
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

fetch('slideSets.json')
    .then(response => response.json())
    .then(data => {
        slideSets = data; // Assign fetched data to the global slideSets variable
        renderPage(0, slideSets);
    });
