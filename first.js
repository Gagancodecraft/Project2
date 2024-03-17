const clientId = 'NYn399csI15CtAdcHgEkH68QgGqmVwsvKoqug9bKxLA';
let page = 1;
let currentQuery = '';
let showMoreButton = document.getElementById('show-more');
let noResultsMessage = document.getElementById('no-results');

function searchImages() {
const searchInput = document.getElementById('search-input');
const resultContainer = document.getElementById('result-container');

currentQuery = searchInput.value.trim();
page = 1;

if (currentQuery !== '') {
const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${currentQuery}&client_id=${clientId}`;
fetch(apiUrl).then(response => response.json()).then(data => {
resultContainer.innerHTML = '';
displayImages(data.results);
showMoreButton.style.display = data.results.length === 0 ? 'none' : 'block';
noResultsMessage.textContent = data.results.length === 0 ? 'No results found.' : '';
}).catch(error => console.error('Error fetching images:', error));
} else {
noResultsMessage.textContent = 'Please enter a keyword to search.';
}
};

function loadMoreImages() {
const resultContainer = document.getElementById('result-container');
page++;

if (currentQuery !== '') {
const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${currentQuery}&client_id=${clientId}`;
fetch(apiUrl).then(response => response.json()).then(data => {
displayImages(data.results);
showMoreButton.style.display = data.results.length === 0 ? 'none' : 'block';
noResultsMessage.textContent = data.results.length === 0 ? 'No more results.' : '';
}).catch(error => console.error('Error fetching more images:', error));
}
}

function displayImages(images) {
const resultContainer = document.getElementById('result-container');
images.forEach(image => {
const imageContainer = document.createElement('div');
imageContainer.classList.add('image-container');
const imgElement = document.createElement('img');
imgElement.src = image.urls.small;
imgElement.alt = image.alt_description;

const downloadBtn = document.createElement('button');
downloadBtn.textContent = 'Download';
downloadBtn.classList.add('download-btn');
downloadBtn.addEventListener('click', () => downloadImage(image.urls.full, image.alt_description));
imageContainer.appendChild(imgElement);
imageContainer.appendChild(downloadBtn);
resultContainer.appendChild(imageContainer);
})
};

function downloadImage(url, alt) {
const a = document.createElement('a');
a.href = url;
a.download = alt;
a.click();
}