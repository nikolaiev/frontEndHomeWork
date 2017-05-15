(function(){
        window.addEventListener("load", init, false);

        let basketRect;
        let scoreSpan;
        let score=0;

        function init() {
            let ball = document.getElementById("ball");
            let basket = document.getElementById("basket");

            scoreSpan = document.getElementById("score");
            basketRect = basket.getBoundingClientRect();

            ball.addEventListener("mousedown", function (e) {
                drag(this, e);
             });
        }

        function drag(elementToDrag, event) {
            // координаты мыши в начале перетаскивания.
            let startX = event.clientX,
                startY = event.clientY;

            // начальные координаты элемента, который будет перемещаться.
            let origX = elementToDrag.offsetLeft,
                origY = elementToDrag.offsetTop;

            // разница между координатами мыши и координатами перетаскиваемого элемента.
            let deltaX = startX - origX,
                deltaY = startY - origY;

            // Регистрация событий mouseup и mousemove
            document.addEventListener("mousemove", moveHandler,true);
            document.addEventListener("mouseup", upHandler,true);

            function moveHandler(e) {
                if (!e) e = window.event;

                /*new ball coordinates*/
                let newLeft=(e.clientX - deltaX);
                let newTop=(e.clientY - deltaY);

                /*accuracy*/
                let delta=10;

                if( checkInDiapason(newLeft,basketRect.left-delta,basketRect.right+delta)
                    &&
                    checkInDiapason(newTop,basketRect.top-delta,basketRect.bottom+delta)
                ){
                    elementToDrag.style.left = "100px";
                    elementToDrag.style.top = "100px";

                    updateScore();
                }
                else
                {
                    // перемещаем элемент с учетом отступа от первоначального клика.
                    elementToDrag.style.left = newLeft + "px";
                    elementToDrag.style.top = newTop + "px";
                }
            }

            function upHandler(e) {
                if (!e) e = window.event;

                document.removeEventListener("mouseup", upHandler,true);
                document.removeEventListener("mousemove", moveHandler,true);
            }


            function updateScore(){
                scoreSpan.innerHTML=++score;

                document.removeEventListener("mouseup", upHandler,true);
                document.removeEventListener("mousemove", moveHandler,true);

            }

            function checkInDiapason(val,boundMin,boundMax){

                if(boundMax<boundMin){
                   let temp=boundMax;
                    boundMax=boundMin;
                    boundMin=temp;
                }

                return val<=boundMax && val>=boundMin;
            }
        }
    })();