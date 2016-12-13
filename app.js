'use strict';

var allProducts = []
// var displayImages = document.getElementById('image_container');
var totalClicks = 0;

function ProductImage(productName,filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
new ProductImage('bag','images/bag.jpg');
new ProductImage('banana','images/banana.jpg');
new ProductImage('bathroom','images/bathroom.jpg');
new ProductImage('boots','images/boots.jpg');
new ProductImage('breakfast','images/breakfast.jpg');
new ProductImage('bubblegum','images/bubblegum.jpg');
new ProductImage('chair','images/chair.jpg');
new ProductImage('cthulhu','images/cthulhu.jpg');
new ProductImage('dogduck','images/dog-duck.jpg');
new ProductImage('dragon','images/dragon.jpg');
new ProductImage('pen','images/pen.jpg');
new ProductImage('petsweep','images/pet-sweep.jpg');
new ProductImage('scissors','images/scissors.jpg');
new ProductImage('shark','images/shark.jpg');
new ProductImage('sweep','images/sweep.jpg');
new ProductImage('tauntaun','images/tauntaun.jpg');
new ProductImage('unicorn','images/unicorn.jpg');
new ProductImage('usb','images/usb.jpg');
new ProductImage('watercan','images/water-can.jpg');
new ProductImage('wineglass','images/wine-glass.jpg');

// while any numbers match, keep reassigning random numbers until they are not matching and then set your source
function generateRandomImages() {

  while (leftRandomIndexes === centerRandomIndexes || leftRandomIndexes === rightRandomIndexes || centerRandomIndexes === rightRandomIndexes) {
    var leftRandomIndexes = Math.floor(Math.random()*allProducts.length);
    console.log(leftRandomIndexes);
    var centerRandomIndexes = Math.floor(Math.random()*allProducts.length);
    console.log(centerRandomIndexes);
    var rightRandomIndexes = Math.floor(Math.random()*allProducts.length);
    console.log(rightRandomIndexes);
  } //if they are all different numbers, then set the source with code below

  var left = document.getElementById('left');
  left.src = allProducts[leftRandomIndexes].filePath;
  allProducts[leftRandomIndexes].views += 1;  //add to the views total

  var center = document.getElementById('center');
  center.src = allProducts[centerRandomIndexes].filePath;
  allProducts[centerRandomIndexes].views += 1;

  var right = document.getElementById('right');
  right.src = allProducts[rightRandomIndexes].filePath;
  allProducts[rightRandomIndexes].views += 1;

}
generateRandomImages();

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
//   clickImage.removeEventListener('click', handleClick);
//   }
// }
function handleClick(event) {
  event.preventDefault(); //prevents reload of data
  // console.log(event.target);
  if (event.target.id === 'image_container') {
    alert('Please click on a photo'); //this still needs to be tested
    return;
  }
  totalClicks += 1;
  console.log('Total clicks: '+ totalClicks);
  if (totalClicks >= 3){
    clickImage.removeEventListener('click', handleClick);
    showResults.style.visibility = 'visible';  //show results button appears at end of test
  }
  generateRandomImages();
}

function handleResults() {
  // show table....
  console.log(event.target);
}

// //add eventListener for clicks
var clickImage = document.getElementById('image_container');
clickImage.addEventListener('click', handleClick);

//add eventListener for results
var showResults = document.getElementById('show_results');
showResults.addEventListener('click', handleResults);
showResults.style.visibility = 'hidden' //this hides the submit button before 25 clicks
