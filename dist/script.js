//User Story #1: I can see a wrapper element with a corresponding id="quote-box".

//User Story #2: Within #quote-box, I can see an element with a corresponding id="text".

//User Story #3: Within #quote-box, I can see an element with a corresponding id="author".

//User Story #4: Within #quote-box, I can see a clickable element with a corresponding id="new-quote".

//User Story #5: Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote".

//Us'er Story #6: On first load, my quote machine displays a random quote in the element with id="text".

//User Story #7: On first load, my quote machine displays the random quote's author in the element with id="author".

//User Story #8: When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element.

//User Story #9: My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.

//User Story #10: I can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote.

//User Story #11: The #quote-box wrapper element should be horizontally centered. Please run tests with browser's zoom level at 100% and page maximized.

//Idea:
//onload -> make 1 API call to fetch a JSON object which contains a bunch of quotes
//onClick() -> call pickRandomQuote() applied to that JSON object


const URL = "https://type.fit/api/quotes";
let QUOTES;
//invoked on <body> load
function init_quotes() {
  fetch(URL)
  //parses the response as a JSON object
  .then(response => response.json())
  //uses a callback to assign the retrieved data to a global var
  .then(function (data) {
    assignJSONtoVar(data);
    pickRandomQuote();
  })
  //error handling if promise fails
  .catch(err => alert(err));
}
function assignJSONtoVar(json) {
  QUOTES = json;
}
//off-by-one bug on Object.keys().length - 1642 distinct quotes
//works w/ several quotes in JSON format w/ [text,author] key-value pairs
//returns a dynamically generated text and author from the object
function pickRandomQuote() {
  var idx, currentQuote, currentAuthor;
  var numOfQuotes = Object.keys(QUOTES).length - 1;
  idx = Math.floor(Math.random() * numOfQuotes);
  currentQuote = QUOTES[idx].text;
  currentAuthor = QUOTES[idx].author;
  //edge case
  if (currentAuthor == null) {
    currentAuthor = "Anonymous";
  }
  childRemover("text");
  addTextToHTML(currentQuote, "text");
  childRemover("author");
  addTextToHTML(currentAuthor, "author");
  /* modify text @ tweet href */
  $('#tweet-quote').attr(
  'href',
  'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

}
//adds text in a new <p> elem, as child of elemId
function addTextToHTML(str, elemId) {
  const newP = document.createElement("p");
  const newContent = document.createTextNode(str);
  newP.appendChild(newContent);
  const parentDiv = document.getElementById(elemId);
  parentDiv.appendChild(newP);
}
//clear content of previous quote & author
function childRemover(elemId) {
  let elem = document.getElementById(elemId);
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}
//strong palette @ pair idx (bg)
//soft monochromatic complement @ odd idx (text)
const COLORS = [
'#4e74ff',
'#3d5bc4',
'#ffa2fc',
'#d15acb',
'#ff303e',
'#a83f44',
'#ffaf2f',
'#c29348',
'#1e962e',
'#2a6630',
'#694334',
'#523f37',
'#6c2f57',
'#59384c',
'#731a17',
'#5e2724'];

const numOfColorSchemes = 8;
// res: [BgColor,TextColor]
function pickRandomColorScheme() {
  var idx, currBgColor, currTextColor;
  idx = Math.floor(Math.random() * numOfColorSchemes) * 2;
  currBgColor = COLORS[idx];
  currTextColor = COLORS[idx + 1];
  var res = [];
  res.push(currBgColor);
  res.push(currTextColor);
  return res;
}
/* init color scheme pick */
$('document').ready(function () {
  var randomColorScheme = pickRandomColorScheme();
  var bgColor = randomColorScheme[0];
  var textColor = randomColorScheme[1];
  $('.colorScheme').css('background-color', bgColor);
  $('.colorScheme').css('color', textColor);
});
/* handling onClick changing color scheme */
function changeColor() {
  $('#new-quote').click(function () {
    var randomColorScheme = pickRandomColorScheme();
    var bgColor = randomColorScheme[0];
    var textColor = randomColorScheme[1];
    $('.colorScheme').css('background-color', bgColor);
    $('.colorScheme').css('color', textColor);
  });
}
//ToDo
//1. animar el cambio de color/size de quote-box
//2. hacer que @villagrat apunte al CV
/* KNOWN BUG: jQuery.css() returns wrong color on some browsers */
//changeColor() doesn't necessarily pick a diff color due to this known bug