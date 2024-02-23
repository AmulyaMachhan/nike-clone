document.addEventListener("DOMContentLoaded",function (){
    let itemClassName = "iconic-items";
    let items = document.getElementsByClassName(itemClassName);
    let totalItems = items.length;
    let slide = 0;
    let moving = true;

    function setInitialClasses(){

        items[totalItems - 2].classList.add("oldPrev")
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
        items[2].classList.add("oldNext");
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
                    oldNext = (slide + 1)
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