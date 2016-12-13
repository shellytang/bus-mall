'use strict';

var allProducts = []
var newArray = []
var oldArray = []
var displayImages = document.getElementById('image_container');
var showResults = document.getElementById('show_results');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var clickCounter = 0;

var names = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'] //for line 45; fill this in completely

function ProductImage(productName) {
  this.productName = productName;
  this.filePath = 'images/' + productName + '.jpg';
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

for (var i = 0; i < names.length; i++){
  new ProductImage(names[i]);
}

console.table(allProducts);

function randNum() {   //generate random numbers
  return Math.floor(Math.random()*allProducts.length);
}

//generate array of three random numbers
function makeArrayofThreeNumbers(){

  oldArray[0] = newArray[0];   //take the previous and store it in old array to use for comparison
  oldArray[1] = newArray[1];
  oldArray[2] = newArray[2];

  newArray[0] = randNum();   //test that the new first doesnt match any of the old array numbers
  while (newArray[0] === oldArray[0] || newArray[0] === oldArray[1] || newArray[0] === oldArray[2]) {
    console.log(newArray, 'broken value in first position of new array');
    newArray[0] = randNum();  //if duplicate, get random number again
    console.log('fixed');
  }

  newArray[1] = randNum();   //fix this part
  while (newArray[1] === newArray[0] || newArray[1] === oldArray[0] || newArray[1] === oldArray[1] || newArray[1] === oldArray[2]) {
    newArray[1] = randNum();  //if duplicate, get random number again
    console.log('caught dupes btw first and second numbers');
  }

  newArray[2] = randNum();
  while (newArray[2] === newArray[0] || newArray[2] === newArray[1] || newArray[2] === oldArray[0] || newArray[2] === oldArray[1] || newArray[2] === oldArray[2]) {
    newArray[2] = randNum();  //if duplicate, get random number again
    console.log('caught dupes with the third number');
  }
}
// makeArrayofThreeNumbers();
// console.log('----NEW RUN-----');
// console.log(oldArray, 'old array')
// console.log(newArray,'new array');

for (var j =0; j < 100; j++) {      //this tests if you are catching the dupes and new is moving to old
  makeArrayofThreeNumbers();
  console.log('----NEW RUN-----');
  console.log(oldArray, 'old array')
  console.log(newArray,'new array');
}

function showThreePics() {    //this will get three pics and tally the views
  makeArrayofThreeNumbers();
  left.src = allProducts[newArray[0]].filePath;
  allProducts[newArray[0]].views +=1;
  center.src = allProducts[newArray[1]].filePath;
  allProducts[newArray[1]].views +=1;
  right.src = allProducts[newArray[2]].filePath;
  allProducts[newArray[2]].views +=1;
}

showThreePics();

function handleClick(event) {

  event.preventDefault(); //prevents reload of data
  console.log(event.target.src + 'was clicked');

  if (event.target.id === 'image_container') {
    return alert('Please click on a picture, not the background!');
  }
//tally the clicks
  if(event.target.id === 'left') {
    allProducts[newArray[0]].clicks +=1;
    console.log(allProducts[newArray[0]]);
  }
  if(event.target.id === 'center') {
    allProducts[newArray[1]].clicks +=1;
    console.log(allProducts[newArray[1]]);
  }
  if(event.target.id === 'right') {
    allProducts[newArray[2]].clicks +=1;
    console.log(allProducts[newArray[2]]);
  }
  //
  clickCounter += 1;
  console.log(clickCounter + 'total clicks so far')
  showThreePics();

  if (clickCounter >= 5){  //change to 25 when done testing
    displayImages.removeEventListener('click', handleClick);
    showResults.style.visibility = 'visible';  //show results button appears at end of test
  }
}

var resultList = document.getElementById('result_list');
function displayList() {
  displayImages.innerHTML = '';
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].productName + ' has been clicked ' + allProducts[i].clicks + ' times and viewed ' + allProducts[i].views + ' times';
    resultList.appendChild(liEl);
  }
}

//display a list of items and total clicks/views
function handleResults() {
  console.log(event.target + 'was clicked');
  displayList();
}

displayImages.addEventListener('click', handleClick); //add eventListener for clicks
showResults.addEventListener('click', handleResults);  //add eventListener for results button
showResults.style.visibility = 'hidden' //this hides the submit button before 25 clicks
