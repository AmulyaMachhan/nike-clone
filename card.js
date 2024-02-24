
document.addEventListener("DOMContentLoaded", function(){

    const container = document.querySelector(".iconic-content");

    const itemsData = [
        {image : "images/shoes-1.png" , name : "Air Force 1"},
        {image : "images/shoes-2.png" , name : "Air Jordan 1"},
        {image : "images/shoes-3.png" , name : "Air Max"},
        {image : "images/shoes-4.png" , name : "Dunk"},
        {image : "images/shoes-5.png" , name : "Nike Blazer"},
        {image : "images/shoes-6.png" , name : "Metcon"},
        {image : "images/shoes-7.png" , name : "Pegasus Running Shoes"},
    ];

    itemsData.forEach( item => {
        const card = createCard( item );
        container.appendChild( card ) ;
    } );

    function createCard( data ){

        const card = document.createElement("div");
        card.classList.add("iconic-items");

        card.innerHTML = `<div class="iconic-items-image"><img src="${data.image}"></div>`;

        card.innerHTML += `<h3>${data.name}</h3>`

        return card;
    }

    const right = document.createElement("button");
    right.classList.add("right");  
    
    right.innerHTML = `<span><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M15.525 18.966L8.558 12l6.967-6.967"></path></svg></span>`;
    container.appendChild(right);

    const left = document.createElement("button");
    left.classList.add("left");  
    
    left.innerHTML = `<span><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"></path></svg></span>`;
    container.appendChild(left);

    let itemClassName = "iconic-items";
    let items = document.getElementsByClassName(itemClassName);
    let totalItems = items.length;
    let slide = 0;
    let moving = true;


    const countShow = document.createElement("div");
    countShow.classList.add("count-show");
    container.appendChild(countShow);
  
    function updateCount() {
      countShow.innerHTML = `<span>${slide + 1}/${totalItems}</span>`;
    }

    function setInitialClasses(){

        items[totalItems - 2].classList.add("oldPrev")
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
        items[2].classList.add("oldNext");

        updateCount();
    }
    
    function setEventListeners(){

        let next = document.querySelector(".left");
        let prev = document.querySelector(".right");

        next.addEventListener("click" , moveNext);
        prev.addEventListener("click", movePrev);        
    }

    function disableInteractions(){
        moving = true;

        setTimeout(function(){
            moving = false;
        } , 200);
    }

    function moveSliderTo( slide ){

        if(!moving){

            disableInteractions();

            let newPrevious = slide - 1,
                newNext = slide + 1 ,
                oldPrevious = slide - 2,
                oldNext = slide + 2;

            if((totalItems - 1 ) > 3){
                if(newPrevious <= 0){
                    oldPrevious = totalItems - 1;
                }
                else if(newNext >= (totalItems -1)){
                    oldNext = 0;
                }

                if( slide === 0){
                    newPrevious = (totalItems - 1);
                    oldPrevious = (totalItems -2);
                    oldNext = (slide + 2)
                }
                else if( slide === totalItems - 1){
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }
    
                items[oldPrevious].className = itemClassName + " oldPrev";
                items[oldNext].className =itemClassName + " oldNext";
    
                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className =itemClassName + " next";

                updateCount();
            }
        }
    }

    function moveNext(){

        if(!moving){
            if(slide === (totalItems -1)){
                slide = 0;
            }else{
                slide++;
            }

            moveSliderTo(slide);
        }
    }

    function movePrev(){
        if(!moving){
            if(slide === 0){
                slide = totalItems - 1;
            }else{
                slide--
            }
        moveSliderTo(slide);
        }
    }

    function initSlider(){
        setInitialClasses();
        setEventListeners();

        moving = false;
    }

    initSlider();

});