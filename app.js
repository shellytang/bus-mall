'use strict';

var allProducts = []
var newArray = []
var oldArray = []
var votes = [];
var views = [];
var chartDrawn = false;
var productChart;
var displayImages = document.getElementById('image_container');
var showResults = document.getElementById('show_results');
var resultList = document.getElementById('result_list');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var clickCounter = 0;
var myStorage = [];


var names = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass']

function ProductImage(productName) {
  this.productName = productName;
  this.filePath = 'images/' + productName + '.jpg';
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
//create instances by passing thru names which makes the prodcutname and filepath properties
function createArray() {
  for (var i = 0; i < names.length; i++){
    console.log(' making an array');
    new ProductImage(names[i]);
  }
}
// console.table(allProducts);
function randNum() {   //generate random numbers for products
  return Math.floor(Math.random()*allProducts.length);
}
//generate array of three random numbers
function makeArrayofThreeNumbers(){
  oldArray[0] = newArray[0];   //take the previous and store it in old array to use for comparison
  oldArray[1] = newArray[1];
  oldArray[2] = newArray[2];

  newArray[0] = randNum();   //test that the new first doesnt match any of the old array numbers
  while (newArray[0] === oldArray[0] || newArray[0] === oldArray[1] || newArray[0] === oldArray[2]) {
    // console.log(newArray, 'broken value in first position of new array');
    newArray[0] = randNum();  //if duplicate, get random number again
    // console.log('fixed');
  }
  newArray[1] = randNum();   //fix this part
  while (newArray[1] === newArray[0] || newArray[1] === oldArray[0] || newArray[1] === oldArray[1] || newArray[1] === oldArray[2]) {
    newArray[1] = randNum();  //if duplicate, get random number again
    // console.log('caught dupes btw first and second numbers');
  }
  newArray[2] = randNum();
  while (newArray[2] === newArray[0] || newArray[2] === newArray[1] || newArray[2] === oldArray[0] || newArray[2] === oldArray[1] || newArray[2] === oldArray[2]) {
    newArray[2] = randNum();  //if duplicate, get random number again
    // console.log('caught dupes with the third number');
  }
}
// for (var j =0; j < 100; j++) {   //this tests if you are catching the dupes and new is moving to old
//   makeArrayofThreeNumbers();
// console.log('----NEW RUN-----');
// console.log(oldArray, 'old array')
// console.log(newArray,'new array');
// }
function showThreePics() {    //this will get three pics and tally the views
  makeArrayofThreeNumbers();
  left.src = allProducts[newArray[0]].filePath;
  allProducts[newArray[0]].views +=1;
  center.src = allProducts[newArray[1]].filePath;
  allProducts[newArray[1]].views +=1;
  right.src = allProducts[newArray[2]].filePath;
  allProducts[newArray[2]].views +=1;
}
// showThreePics();

function handleClick(event) {
  event.preventDefault(); //prevents reload of data
  // console.log(event.target.src + 'was clicked'); //alert if dont click on pics
  if (event.target.id === 'image_container') {
    return alert('Please click on a picture, not the background!');
  }
//tally the clicks
  if(event.target.id === 'left') {
    allProducts[newArray[0]].clicks +=1;
    // console.log(allProducts[newArray[0]]);
  }
  if(event.target.id === 'center') {
    allProducts[newArray[1]].clicks +=1;
    // console.log(allProducts[newArray[1]]);
  }
  if(event.target.id === 'right') {
    allProducts[newArray[2]].clicks +=1;
    // console.log(allProducts[newArray[2]]);
  }
  clickCounter += 1;
  // console.log(clickCounter + ' total clicks so far'
//********************************************************************************************


  localStorage.setItem('myStorage', JSON.stringify(allProducts));


// *******************************************************************************************
  showThreePics();
  if (clickCounter >= 25){
    displayImages.removeEventListener('click', handleClick);
    showResults.style.visibility = 'visible';  //show results button appears at end of test
  }
}
function displayList() {    //shows list when you click on the see results button
  displayImages.innerHTML = '';
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].productName + ' has been clicked ' + allProducts[i].clicks + ' times and viewed ' + allProducts[i].views + ' times';
    resultList.appendChild(liEl);
  }
}
//display a list of items and total clicks/views
function handleResults() {
  // console.log(event.target + 'was clicked');
  updateChartArrays();
  displayList();
  drawChart(); //new line
}
function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    views[i] = allProducts[i].views; //takes the views and puts
    votes[i] = allProducts[i].clicks;  //takes the clicks and puts into array
  }
}
// ************************************Check for local storage******************************************
function checkForStorage() {

  if (!localStorage.myStorage) {
    console.log('no local');
    createArray();
    showThreePics();
  } else {
    console.log(' yes local');
    var tempDataHolder = localStorage.getItem('myStorage');
    var parseData = JSON.parse(tempDataHolder);
    allProducts = parseData;
    showThreePics();
  }
}
// ****************** start program ****************************
checkForStorage()
// //******************************************************************************************

displayImages.addEventListener('click', handleClick); //eventListener for clicks
showResults.addEventListener('click', handleResults);  //eventListener for results button
showResults.style.visibility = 'hidden' //this hides the submit button before 25 clicks

// chart stuff below
function drawChart () {
  var ctx = document.getElementById('result_chart').getContext('2d');
  productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Number of Votes',
        data: votes,
        backgroundColor: [
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)'
        ],
        borderColor: [
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)',
          'rgba(36, 123, 160, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
  chartDrawn = true;
}

// if (chartDrawn) {
//   productChart.update();
// }
