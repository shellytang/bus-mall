'use strict';

var allProducts = []

// var newArray = []
// var oldArray = []
var displayImages = document.getElementById('image_container');
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

var newArray = [];
var oldArray = [];

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

    return alert('Please click on a picture, not the background!'); //this still needs to be tested

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
  if (clickCounter >= 5){  //change to 25 when done testing
  //   picContainer.removeEventListener('click', handleClick);
  // //   showResults.style.visibility = 'visible';  //show results button appears at end of test
  }
}
showThreePics();
// function renderList(){
//   //display a list of items and total clicks/views
// }
// function handleResults() {
//   // show table....
//   console.log(event.target + 'was clicked');
// }
// //add eventListener for clicks
displayImages.addEventListener('click', handleClick);

//add eventListener for results
// var showResults = document.getElementById('show_results');
// showResults.addEventListener('click', handleResults);
// showResults.style.visibility = 'hidden' //this hides the submit button before 25 clicks

//count click for each product
// function countClicks {
//   if (event.target.id === 'left') {
//     allProducts[leftRandomIndexes].clicks += 1;
//     console.log(allProducts[leftRandomIndexes].productName + ' ' + allProducts[leftRandomIndexes].clicks);
//   }
//   if (event.target.id === 'center') {
//     allProducts[centerRandomIndexes].clicks += 1;
//     console.log(allProducts[centerRandomIndexes].productName + ' ' + allProducts[centerRandomIndexes].clicks);
//   }
//   if (event.target.id === 'right') {
//     allProducts[rightRandomIndexes].clicks += 1;
//     console.log(allProducts[rightRandomIndexes].productName + ' ' + allProducts[rightRandomIndexes].clicks);
//   }
//   totalClicks += 1;
//
//   if (totalClicks > 10){
//   picContainer.removeEventListener('click', handleClick);
//   }
// }
//
//   while (leftRandomIndexes === centerRandomIndexes || leftRandomIndexes === rightRandomIndexes || centerRandomIndexes === rightRandomIndexes) {
//     var leftRandomIndexes = Math.floor(Math.random()*allProducts.length);
//     console.log(leftRandomIndexes);
//     var centerRandomIndexes = Math.floor(Math.random()*allProducts.length);
//     console.log(centerRandomIndexes);
//     var rightRandomIndexes = Math.floor(Math.random()*allProducts.length);
//     console.log(rightRandomIndexes);
//   } //if they are all different numbers, then set the source with code below
//
//   var left = document.getElementById('left');
//   left.src = allProducts[leftRandomIndexes].filePath;
//   allProducts[leftRandomIndexes].views += 1;  //add to the views total
//
//   var center = document.getElementById('center');
//   center.src = allProducts[centerRandomIndexes].filePath;
//   allProducts[centerRandomIndexes].views += 1;
//
//   var right = document.getElementById('right');
//   right.src = allProducts[rightRandomIndexes].filePath;
//   allProducts[rightRandomIndexes].views += 1;
//
// }
// showThreePics();
