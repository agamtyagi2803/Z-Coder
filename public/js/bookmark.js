window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});

// Function to add text bar
function addText() {
  var container = document.getElementById('container');
  var link = prompt("Enter your link:");
  if (link !== null && link !== '') {
    var textBar = document.createElement('div');
    textBar.classList.add('text-bar');
    
    var removeCheckbox = document.createElement('input');
    removeCheckbox.type = 'checkbox';
    removeCheckbox.classList.add('remove-checkbox');
    removeCheckbox.addEventListener('change', function() {
      if (this.checked) {
        setTimeout(() => {
          container.removeChild(textBar);
          removeText(link);
        }, 100); // .1 second delay
      }
    });
    textBar.appendChild(removeCheckbox);
    
    var textContent = document.createElement('a');
    textContent.href = link;
    textContent.textContent = link;
    textContent.classList.add('text-content');
    textContent.target = '_blank'; // Open link in a new tab
    textBar.appendChild(textContent);
    
    container.appendChild(textBar);
    saveText(link);
  }
}

// Function to save text to localStorage
function saveText(text) {
  var savedText = localStorage.getItem('savedText');
  var texts = savedText ? JSON.parse(savedText) : [];
  texts.push(text);
  localStorage.setItem('savedText', JSON.stringify(texts));
}

// Function to remove text from localStorage
function removeText(text) {
  var savedText = localStorage.getItem('savedText');
  if (savedText) {
    var texts = JSON.parse(savedText);
    var index = texts.indexOf(text);
    if (index !== -1) {
      texts.splice(index, 1);
      localStorage.setItem('savedText', JSON.stringify(texts));
    }
  }
}

// Load saved text when the page loads
window.addEventListener('load', function() {
  var container = document.getElementById('container');
  var savedText = localStorage.getItem('savedText');
  if (savedText) {
    var texts = JSON.parse(savedText);
    texts.forEach(function(link) {
      var textBar = document.createElement('div');
      textBar.classList.add('text-bar');
      
      var removeCheckbox = document.createElement('input');
      removeCheckbox.type = 'checkbox';
      removeCheckbox.classList.add('remove-checkbox');
      removeCheckbox.addEventListener('change', function() {
        if (this.checked) {
          setTimeout(() => {
            container.removeChild(textBar);
            removeText(link);
          }, 100); // .1 second delay
        }
      });
      textBar.appendChild(removeCheckbox);
      
      var textContent = document.createElement('a');
      textContent.href = link;
      textContent.textContent = link;
      textContent.classList.add('text-content');
      textContent.target = '_blank'; // Open link in a new tab
      textBar.appendChild(textContent);
      
      container.appendChild(textBar);
    });
  }
});
