const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// ->Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//->hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//->get quote from API
async function getQuote() {
  //->show loading screen
  loading();
  //->getting quotes
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //->if no author found
    if (data.quoteAuthor === '') {
      quoteAuthor.innerText = 'Unknown';
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }
    //->Reduce font size for long-quotes
    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    //->Stop loader show the code
    complete();
  } catch (err) {
    getQuote();
  }
}

//->Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, '_blank');
}

//->Adding event listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//->on lode
getQuote();
