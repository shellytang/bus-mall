'use strict';

var allProducts = [] //all image objects, like stores / images have names and filepath
// var displayImages = document.getElementById('image_container');

function ProductImage(name,filepath) {
  this.name = name;
  this.filepath = filepath;
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
new ProductImage('cthulhu','images/cthulu.jpg');
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
new ProductImage('wineglass','images/wineglass.jpg');


function selectRandomImages() {
  var leftRandomIndexes = Math.floor(Math.random()*allProducts.length);
  var left = document.getElementById('left');
  left.src = allProducts[leftRandomIndexes].filepath;

  var centerRandomIndexes = Math.floor(Math.random()*allProducts.length);
  var center = document.getElementById('center');
  center.src = allProducts[centerRandomIndexes].filepath;

  var rightRandomIndexes = Math.floor(Math.random()*allProducts.length);
  var right = document.getElementById('right');
  right.src = allProducts[rightRandomIndexes].filepath;
}

selectRandomImages();
