let image_sources = [
    "images/LAHU.jpg",
    "images/tiia.jpg",
    "images/kevin.JPG",
    "images/elias2.jpeg",
    "images/shampa.jpg",
    "images/JUHA.jpg",
    "images/hefo.jpg",
    "images/anni.jpg",
    "images/chong.png",
    "images/snoopy.png",
    "images/Teacher2048.png",
    "images/ari_with_glasses.png",
];



var gameObj = {

    used: 0,
    points: {
        score: 0,
        history: [],
        status: 1
    },
    stage: [],
    intiStage: function () {
        for (var cell = 0; cell < 4; cell++) {
            this.stage[cell] = [];
            for (var row = 0; row < 4; row++) {
                this.stage[cell][row] = {
                    boxObj: null,
                    position: [cell, row]
                };
            }
        }

    },
    
        empty: function () {
        var emptyList = [];
        for (var row = 0; row < 4; row++) {
            for (var cell = 0; cell < 4; cell++) {
                if (this.stage[cell][row].boxObj == null) {
                    emptyList.push(this.stage[cell][row]);
                }
            }
        }
        return emptyList;
    },
    newBox: function () {
        var _this = this;
        
        
        var box = function (obj) {
            var num = Math.random() > 0.9 ? 4 : 2;
            this.value = num;
            this.parent = obj;
            this.domObj = function () {
                let domBox = document.createElement("img");
                domBox.src = image_sources[Math.log2(num)-1];
                domBox.className = 'row' + obj.position[0] + ' ' + 'cell' + obj.position[1] + ' ' + 'num' + num;
                var root = document.getElementById('stage');
                root.appendChild(domBox);
                return  domBox;
            }();
            obj.boxObj = this;
        }
        var emptyList = this.empty();
        if (emptyList.length) {
            var randomIndex = Math.floor(Math.random() * emptyList.length);
            new box(emptyList[randomIndex]);
            return true;
        }
    },
    isEnd:function(){
        var emptyList = this.empty();
        if (!emptyList.length) {
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    var obj=this.stage[i][j];
                    var objLeft=(j==0)?{boxObj:{value:0}}:this.stage[i][j-1];
                    var objRight=(j==3)?{boxObj:{value:0}}:this.stage[i][j+1];
                    var objUp=(i==0)?{boxObj:{value:0}}:this.stage[i-1][j];
                    var objDown=(i==3)?{boxObj:{value:0}}:this.stage[i+1][j];
                    if(obj.boxObj.value==objLeft.boxObj.value
                        ||obj.boxObj.value==objDown.boxObj.value
                        ||obj.boxObj.value==objRight.boxObj.value
                        ||obj.boxObj.value==objUp.boxObj.value){
                        return false
                    }
                }
            }
            return true;
        }
        return false;
    },
    gameOver:function(){
        alert('GAME OVER!');
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                var obj=this.stage[i][j];
                obj.boxObj.domObj.parentNode.removeChild(obj.boxObj.domObj);
                obj.boxObj = null;
            }
        }
    },
    moveTo :function (obj1, obj2) {
            obj2.boxObj = obj1.boxObj;
            obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value;
//            obj1.boxObj.domObj.parentNode.removeChild(obj1.boxObj.domObj);
            obj1.boxObj = null;
        },
    addTo : function (obj1, obj2) {
            obj2.boxObj.domObj.parentNode.removeChild(obj2.boxObj.domObj);
            obj2.boxObj = obj1.boxObj;
            obj1.boxObj = null;
            obj2.boxObj.value = obj2.boxObj.value * 2;
            obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value;
            let ind = Math.log2(obj2.boxObj.value)-1;
            obj2.boxObj.domObj.src = image_sources[ind];
            this.points.score+=obj2.boxObj.value;
        var scoreBar = document.getElementById('score');
        scoreBar.innerText=this.points.score;
        scoreBar.textContent=this.points.score;

        if(ind == 9 && this.used == 0){
             approachingImage();
            this.used = 1
            appendImage("images/snoopy.png", 1);
            let audio = new Audio("sounds/villiressu.mp3");
            audio.play();
            setTimeout(function(){5;}, 10000);
        }
        if(ind == 10 && this.used == 1){
            this.used = 2
            let audio = new Audio("sounds/bach.mp3")
            audio.play();
            setTimeout(function(){5;}, 10000);
        }
        if(ind == 11 && this.used == 2){
            this.used = 3;
            let audio = new Audio("sounds/ressut_on_ikuisia.mp3");
            audio.play();
            ari_rain("images/ari_with_glasses.png"); 
        }

        return obj2.boxObj.value;

    },
    clear:function(x,y){
        var can=0;
      for(var i=0;i<4;i++){
          var fst=null;
          var fstEmpty=null;
          for(var j=0;j<4;j++){
              var objInThisWay=null;
              switch (""+x+y){
                  case '00': objInThisWay=this.stage[i][j];break;
                  case '10':objInThisWay=this.stage[j][i];break;
                  case '11':objInThisWay=this.stage[3-j][i];break;
                  case '01':objInThisWay=this.stage[i][3-j];break;
              }
              if(objInThisWay.boxObj!=null){
                 if(fstEmpty){
                   this.moveTo(objInThisWay,fstEmpty)
                    fstEmpty=null;
                    j=0;
                     can=1;
                 }
              }else if(!fstEmpty){
                   fstEmpty=objInThisWay;
              }
          }
      }
        return can;
    },
    
    move: function (x,y) {
        var can=0;
        can=this.clear(x,y)?1:0;
        var add=0;
        for(var i=0;i<4;i++){
            for(var j=0;j<3;j++){
                var objInThisWay=null;
                var objInThisWay2=null;
                switch (""+x+y){
                    case '00':{
                        objInThisWay=this.stage[i][j];
                        objInThisWay2=this.stage[i][j+1];break;
                    }
                    case '10':{
                        objInThisWay=this.stage[j][i];
                        objInThisWay2=this.stage[j+1][i];break;
                    }

                    case '11':{
                        objInThisWay=this.stage[3-j][i];
                        objInThisWay2=this.stage[2-j][i];break;
                    }
                    case '01':{
                        objInThisWay=this.stage[i][3-j];
                        objInThisWay2=this.stage[i][2-j];break;
                    }
                }
                if(objInThisWay2.boxObj&&objInThisWay.boxObj.value==objInThisWay2.boxObj.value){
                  add+=this.addTo(objInThisWay2,objInThisWay);
                    this.clear(x,y);
//                    j++;
                    can=1;
                }
//                console.log(this.stage);
            }
        }
        if(add){
            var addscore=document.getElementById('addScore');
            addscore.innerText="+"+add;
            addscore.textContent="+"+add;
            addscore.className="show";
            setTimeout(function(){
                addscore.className="hide";
            },500);
        }
        if(can){
            this.newBox();
        }
        if(this.isEnd()){
            this.gameOver();
        }
    },

    studyBreak: function(){
        
        if(this.points.score < 1000){
            alert("Can't afford a break yet!");
            return;
        }
        this.points.score -= 1000;
        var scoreBar = document.getElementById('score');
        scoreBar.innerText=this.points.score;
        scoreBar.textContent=this.points.score;

        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                var obj=this.stage[i][j];
                console.log("moi");
                if(obj && obj.boxObj && obj.boxObj.value <= 4){
                    obj.boxObj.domObj.parentNode.removeChild(obj.boxObj.domObj);
                    obj.boxObj = null;
                }
            }
        }
    },

    inti: null
}




var controller = function () {
    var startX = 0;
    var startY = 0;
    var ready = 0;
    this.start = function (x, y) {
        ready = 1;
        startX = x;
        startY = y;
    };
    this.move = function (x, y) {
        if (x - startX > 100 && ready) {
            gameObj.move(0, 1);
            ready = 0;
        } else if (startX - x > 100 && ready) {
            gameObj.move(0, 0);
            ready = 0;
        }
        else if (startY - y > 100 && ready) {
            gameObj.move(1, 0);
            ready = 0;
        }
        else if (y - startY > 100 && ready) {
            gameObj.move(1, 1);
            ready = 0;
        }
    }
    this.end = function (x, y) {
        ready = 0;
    }
    return {
        start: this.start,
        move: this.move,
        end: this.end
    }
}();
function disableSelection(target){
    if (typeof target.onselectstart!="undefined") //IE route
        target.onselectstart=function(){return false}
    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
        target.style.MozUserSelect="none"
    else //All other route (ie: Opera)
        target.onmousedown=function(){return false}
    target.style.cursor = "default"
}
window.onload = function () {
    gameObj.intiStage();
    gameObj.newBox();
//    gameObj.newBox();
    var stage = document.getElementById('stage');
    document.onmousedown = function (e) {
        var event = e || window.event;
        var obj = event.target || event.srcElement;
        var x = event.clientX;
        var y = event.clientY;
        controller.start(x, y);
    }
    document.onmousemove = function (e) {
        var event = e || window.event;
        var obj = event.target || event.srcElement;
        var x = event.clientX;
        var y = event.clientY;
        controller.move(x, y);
    }
    document.onmouseup = function (e) {
        var event = e || window.event;
        var obj = event.target || event.srcElement;
        var x = event.clientX;
        var y = event.clientY;
        controller.end(x, y);
    }
    function keyUp(e) {
        var currKey=0,e=e//||event;
        currKey=e.keyCode||e.which||e.charCode;
        var keyName = String.fromCharCode(currKey);
        switch (currKey){
            case 37:gameObj.move(0, 0);break;
            case 38:gameObj.move(1, 0);break;
            case 39:gameObj.move(0, 1);break;
            case 40:gameObj.move(1, 1);break;
        }
//        alert("key code: " + currKey + " Character: " + keyName);
    }
    
    document.onkeyup = keyUp;
//    disableSelection(document.body);
}


function toggleLanguage(lang){

    console.log('moi');
    let description = document.getElementById("description");
    let score = document.getElementById("scorenow");
    let butt = document.getElementById("butt");
    let warning = document.getElementById("warning");
    
    if(lang == 'Finnish'){
        description.innerHTML = "Yhdistä opettajia saavuttaaksesi Ari H!";
        score.innerHTML = "Pisteet:";
        butt.innerHTML = "Loma!";
        warning.innerHTML = "Varoitus! Peli saattaa sisältää välkkyviä valoja!";
    }
    else if(lang == 'English'){
        description.innerHTML = "Connect teachers to achieve Ari H!";
        score.innerHTML = "Score:";
        butt.innerHTML = "Vacation!";
        warning.innerHTML = "Warning! The game may contain flashy lights!";
    }
}



var rainDiv = document.querySelector('#action');
var rainDiv2 = document.querySelector('#action2');

function ari_rain(img_src){

    setTimeout(function(){
        for(let i = 0; i < 500; ++i){
            setTimeout(function(){
                var img = document.createElement('img');
                img.id = "ari";
                img.setAttribute('src', img_src);
                img.style.left = Math.floor(Math.random() * 100) + 'vw';
                rainDiv2.appendChild(img);
            }, 25 * i);
        }
        for(let i = 0; i < 190; ++i){
            setTimeout(function(){
                if(i == 189){
                    var cov = document.body;
                    cov.style.backgroundColor = '#234423';
                }else ariLights(i);
            }, 150 * i)
        }
    },  5000);
}
function appendImage(img_src, lights) {

    setTimeout(function(){
        for(let i = 0; i < 500; ++i){
            setTimeout(function(){
                var img = document.createElement('img');
                img.id = "snoopy";
                img.setAttribute('src', img_src);
                img.style.left = Math.floor(Math.random() * 100) + 'vw';
                rainDiv.appendChild(img);
            }, 25 * i);
        }
        if(lights==1)for(let i = 0; i < 110; ++i){
            setTimeout(function(){
                if(i == 109){
                    var cov = document.body;
                    cov.style.backgroundColor = '#234423';
                }else discoLights(i);
            }, 128 * i)
        }
    }, 5400);
    

  setTimeout(function(){
    for(let i = 0; i < 200; ++i){
        var img = document.createElement('img');
        img.id = "snoopy";
        img.setAttribute('src', img_src);
        img.style.left = Math.floor(Math.random() * 100) + 'vw';
        rainDiv.remove(img);
    }
  }, 20000);
  return;
}
function ariLights(i){
    var cov = document.body;
    var colors = [
        "#000000",
        "#4b0082",
    ];
    var ind;
    if(Math.random() > 0.5)ind=0;
    else ind = 1;
    ind = i % 4;
    var randomColour = colors[ind];
    cov.style.backgroundColor = randomColour;
}

function discoLights(i){
    var cov = document.body;
    var colors = [
        "#F0F000",
        "#4b0082",
        "8B00FF",    
        "000000",
        "FFFFFF",
    ];
    let ind = i % 4;
    var randomColour = colors[ind];
    cov.style.backgroundColor = randomColour;
}