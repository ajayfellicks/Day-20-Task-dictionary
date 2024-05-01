// selecting ids
const wordInput = document.getElementById("wordInput");
const searchButton = document.getElementById("searchButton");
const dictionary = document.getElementById("dictionary");

// eventlistener for search button

searchButton.addEventListener("click", () => {
  const word = wordInput.value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      getWordMeaning(data);
    })
    .catch((error) => {
      console.log(error);
      dictionary.innerHTML = `<h2 class="mt-5">No Definitions Found</h2>
        <p class="mt-2">Sorry pal, we couldn't find definitions for the word you were looking for.</p>`;
    });
});

// function for dictionary pronunciation audio
function play() {
  const word = wordInput.value;
  let audio = new Audio(
    `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-us.mp3`
  );
  audio.play();
}

// function for printing input to the UI from API

function getWordMeaning(data) {
  dictionary.innerHTML = `<div class="word-box ps-sm-0 ps-2">
  <h1 class="mb-0 word" style="color: rgb(0, 132, 255)">${data[0].word}</h1>
  <div class="phonetic-audio d-flex">
    <p class="phonetic">${data[0].meanings[0].partOfSpeech}</p>
    <p class="phonetic ms-2">${data[0].phonetic || ""}</p>
   <button id="sound" class="btnIcon" onclick="play()"><i class="fa-solid fa-volume-high "></i></button> 
  </div>
</div>
<div
  class="meaning-example-box d-flex align-items-center mt-sm-5 ps-sm-5 mb-sm-2 mt-4 pe-4 ps-4 mb-0"
>
  <div>
    <p class="meaning">
    ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="example">
      <i
        >${
          data[0].meanings[0].definitions[0].example ||
          `click More Info to refer example for the word " ${data[0].word} "`
        }</i
      >
    </p>
  </div>
</div>
<div class="d-flex justify-content-center mb-5">
  <button class="button-info mt-5" >
    <a target="_blank" href="${data[0].sourceUrls}">more info </a>
  </button>
</div>`;
}
