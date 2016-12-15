'use strict';
var allProducts = []
var newArray = []
var oldArray = []
var votes = [];
var views = [];
var percentage = [];
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
// ****** Constructor **********
function ProductImage(productName) {
  this.productName = productName;
  this.filePath = 'images/' + productName + '.jpg';
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

function createArray() {  //create instances by passing thru names
  for (var i = 0; i < names.length; i++){
    console.log(' making an array');
    new ProductImage(names[i]);
  }
}
//******** Generate random numbers and make an arry with three numbers****************
function randNum() {
  return Math.floor(Math.random()*allProducts.length);
}

function makeArrayofThreeNumbers(){  //generate array of three random numbers
  oldArray[0] = newArray[0];   //take the previous and store in array to use for comparison
  oldArray[1] = newArray[1];
  oldArray[2] = newArray[2];

  newArray[0] = randNum();   //test that the new first doesnt match any of the old array numbers
  while (newArray[0] === oldArray[0] || newArray[0] === oldArray[1] || newArray[0] === oldArray[2]) {
    newArray[0] = randNum();  //if duplicate, get random number again
  }
  newArray[1] = randNum();
  while (newArray[1] === newArray[0] || newArray[1] === oldArray[0] || newArray[1] === oldArray[1] || newArray[1] === oldArray[2]) {
    newArray[1] = randNum();
  }
  newArray[2] = randNum();
  while (newArray[2] === newArray[0] || newArray[2] === newArray[1] || newArray[2] === oldArray[0] || newArray[2] === oldArray[1] || newArray[2] === oldArray[2]) {
    newArray[2] = randNum();
  }
}

//********** Show three pictures and tally views **************
function showThreePics() {
  makeArrayofThreeNumbers();
  left.src = allProducts[newArray[0]].filePath;
  allProducts[newArray[0]].views +=1;
  center.src = allProducts[newArray[1]].filePath;
  allProducts[newArray[1]].views +=1;
  right.src = allProducts[newArray[2]].filePath;
  allProducts[newArray[2]].views +=1;
}
// ************ Show results list after clicking results button *****************
function displayList() {
  displayImages.innerHTML = '';
  for (var i = 0; i < allProducts.length; i++) {
    var percentage = Math.round(allProducts[i].clicks/allProducts[i].views * 100)/100;
    console.log(percentage);
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].productName + ' has been clicked ' + allProducts[i].clicks + ' times and viewed ' + allProducts[i].views + ' times. Percentage of clicks when viewed: ' + percentage + '%'
    resultList.appendChild(liEl);
  }
}
//************** Event handler for clicking on image **************
function handleClick(event) {
  event.preventDefault();
  if (event.target.id === 'image_container') {
    return alert('Please click on a picture, not the background!');
  }
  if(event.target.id === 'left') {
    allProducts[newArray[0]].clicks +=1; //tallies clicks for each image
  }
  if(event.target.id === 'center') {
    allProducts[newArray[1]].clicks +=1;
  }
  if(event.target.id === 'right') {
    allProducts[newArray[2]].clicks +=1;
  }
  clickCounter += 1;
  localStorage.setItem('myStorage', JSON.stringify(allProducts)); //puts into local storage
  showThreePics();
  if (clickCounter >= 25){  //tallies up until 25 clicks
    displayImages.removeEventListener('click', handleClick); //stops click at 25
    showResults.style.visibility = 'visible';  //show results button appears at end of test
  }
}
// ************ Event handler for clicking show results button ***************
function handleResults() {  //display a list of items and total clicks/views
  updateChartArrays();
  displayList();
  drawChart();
}

// ************ Chart stuff ***********************
function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    views[i] = allProducts[i].views; //takes the views and puts
    votes[i] = allProducts[i].clicks;  //takes the clicks and puts into array
  }
}

function drawChart() {
 var ctx = document.getElementById('result_chart').getContext("2d");
 var productChart = new Chart(ctx, {
   type: 'bar',
   data: {
     labels: names,
     datasets: [{
       label: 'Number of Views',
       data: views,
       backgroundColor: 'rgba(36, 123, 160, 1)'
     }, {
       label: 'Number of Clicks',
       data: votes,
       backgroundColor: 'rgba(237, 106, 90, 1)'
     },
     ]
   }
 });
}
// *********************Check for local storage******************************************
function checkForStorage() {
  if (!localStorage.myStorage) {
    // console.log('no local');
    createArray();
    showThreePics();
  } else {
    var tempDataHolder = localStorage.getItem('myStorage');
    var parseData = JSON.parse(tempDataHolder);
    allProducts = parseData;
    showThreePics();
  }
}
// ****************** start program ****************************
checkForStorage()
displayImages.addEventListener('click', handleClick); //eventListener for clicks
showResults.addEventListener('click', handleResults);  //eventListener for results button
showResults.style.visibility = 'hidden' //this hides the submit button before 25 clicks
