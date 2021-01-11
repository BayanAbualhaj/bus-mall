'use strict';

var arrayOforders = [];
var leftOrderImg = document.getElementById('left_order_img');
var middleOrderImg = document.getElementById('middle_order_img');
var rightOrderImg = document.getElementById('right_order_img');

var leftOrderText =document.getElementById('left_order_h2');
var middleOrderText  =document.getElementById('middle_order_h2');
var rightOrderText  =document.getElementById('right_order_h2');

var listItemResulets = document.getElementById('list_Item_results')

var orderSection = document.getElementById('all_orders');

var listitem = document.getElementById('list');

var chartItem = document.getElementById('chart');

var chartOrder =document.getElementById('orderPickChart').getContext('2d');

var trialsleft= 25;

var arrayOfclicks =[];

var arrayOfshowImged =[];

var arrayOfnames=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog duck','dragon','pen','pet sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water can','wine glass']

var arrayOfpics =['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg']

var arrayOfcolors= ["#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
"#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
"#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e"]

for (var index = 0; index < arrayOfpics.length; index++) {
   
  new Order (arrayOfnames[index],arrayOfpics[index]);
  
}  

function Order(name,image){
    this.name=name;
    this.image=image;
    this.url= 'img/'+image;
    this.counterClick=0;
    this.counterShowImages=0;

    arrayOforders.push(this);

}


function renderOrder(leftImg,middleImg,rightImg){
    leftOrderImg.setAttribute('src', arrayOforders[leftImg].url);
    middleOrderImg.setAttribute('src', arrayOforders[middleImg].url);
    rightOrderImg.setAttribute('src', arrayOforders[rightImg].url);

    arrayOforders[rightImg].counterShowImages++;
    arrayOforders[middleImg].counterShowImages++;
    arrayOforders[leftImg].counterShowImages++;
    
    

    leftOrderText.textContent = arrayOforders[leftImg].name;
    middleOrderText.textContent = arrayOforders[middleImg].name;
    rightOrderText.textContent = arrayOforders[rightImg].name;
}

function checkAvailability (selectedImageName){
  for (var index = 0; index < shownImgAlready.length; index++) {
    if (shownImgAlready[index].name===selectedImageName) {
      return true;
    }
    
  }
  return false;
}
var shownImgAlready=[];

function pickAnOrder(){
    var leftImg = Math.round(Math.random()*(arrayOforders.length-1));
    var leftImgName= arrayOforders[leftImg].name;
    checkAvailability(leftImgName);
    
    do{
        var middleImg =  Math.round(Math.random()*(arrayOforders.length-1));
        var rightImg= Math.round(Math.random()*(arrayOforders.length-1));
    }while(leftImg===rightImg || middleImg===rightImg||leftImg===middleImg|| checkAvailability(arrayOforders[rightImg].name)||checkAvailability(arrayOforders[middleImg].name));


    shownImgAlready=[];

    shownImgAlready.push(
      arrayOforders[leftImg],arrayOforders[middleImg],arrayOforders[rightImg]
    )
    renderOrder(leftImg,middleImg,rightImg);
  
}



function checkOrders (objectIndicator){
    for (let index = 0; index < arrayOforders.length; index++) {
        if (arrayOforders[index].url=== objectIndicator){
            arrayOforders[index].counterClick++;
            trialsleft--;
        }
        
    }
}



function countOrders(event){
    var targetId = event.target.id;

    if(trialsleft !==0){
        if (targetId=== 'left_order_img'|| targetId==='middle_order_img' || targetId==='right_order_img'){
            var objectIndicator = event.target.getAttribute('src');
            checkOrders(objectIndicator);
            pickAnOrder();

        }
    }else{
        orderSection.removeEventListener('click',countOrders);
        for (var index = 0; index < arrayOfnames.length; index++) {
          arrayOfshowImged.push(arrayOforders[index].counterShowImages); 
          arrayOfclicks.push(arrayOforders[index].counterClick++);
        }
        console.log(arrayOfshowImged);
        console.log(arrayOfclicks);
        chartItem.addEventListener('click' ,chartForOrders);

        
    }
}



pickAnOrder();
orderSection.addEventListener('click', countOrders);
listitem.addEventListener('click', fillList);


function fillList(){

    for (var index = 0; index < arrayOfnames.length; index++) {
        var li = document.createElement('li');
        li.textContent= arrayOforders[index].name+ ' had been choosing: '+arrayOforders[index].counterClick+ ' out of '+arrayOforders[index].counterShowImages;
        listItemResulets.appendChild(li);
        
    }
}

function chartForOrders (){

  var chartOrder =document.getElementById('orderPickChart').getContext('2d');

  var myChart = new Chart(chartOrder, {
    type: 'bar',
    data: {
        labels: arrayOfnames,
        datasets: [{
            label: '# show Image',
            data: arrayOfshowImged,
            backgroundColor:arrayOfcolors,
            borderColor: arrayOfcolors,
            borderWidth: 1
        },
        {
          label: '# clicks',
          data: arrayOfclicks,
          backgroundColor: arrayOfcolors,
          borderColor: arrayOfcolors,
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}