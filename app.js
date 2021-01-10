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

var trialsleft= 25;




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



function pickAnOrder(){
    var leftImg = Math.round(Math.random()*(arrayOforders.length-1));


    do{
        var middleImg =  Math.round(Math.random()*(arrayOforders.length-1));
        var rightImg= Math.round(Math.random()*(arrayOforders.length-1));
    }while(leftImg===rightImg || middleImg===rightImg||leftImg===middleImg);

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
        orderSection.removeEventListener('click',countOrders)
    }
}



var arrayOfnames=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog duck','dragon','pen','pet sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water can','wine glass']

var arrayOfpics =['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg']

for (var index = 0; index < arrayOfpics.length; index++) {
   
    new Order (arrayOfnames[index],arrayOfpics[index]);
    
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

