const tagsEl = document.getElementById('tags');
const textarea = document.querySelector('.textarea');
const heading = document.querySelector('.container__heading');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  //Creating the random selector

  if (e.key === 'Enter') {
    textarea.blur();

    setTimeout(() => {
      e.target.value = '';
    }, 10);

    randomSelect();
  }
});

//making the list seperated by commas and printing it on the page
const createTags = (input) => {
  const tags = input
    .split(',') //here is the one that makes the comma seperate them dynamically
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim());

  tagsEl.innerHTML = '';

  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.textContent = tag;

    tagsEl.appendChild(tagEl);
  });
};

const randomSelect = () => {
  const times = 30;

  //this one keeps looping on each one randomly and highlights
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    //highlighting the random tag
    highlightTag(randomTag);

    //unhighlighting the random tag
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
    //
  }, 100);

  //this one stops the loop and pick a random to stop on

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);

      setTimeout(() => {
        const result = `The AI picked "${randomTag.textContent}" for you. `;
        heading.textContent = result + '\n Reload to pick again';
      }, 1000);
    }, 100);
  }, times * 100);
};

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}
