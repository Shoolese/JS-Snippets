let start;
let previous;
let buttonMap = ["AButton","BButton","XButton","YButton","LeftBumper","RightBumper","LeftTrigger","RightTrigger","BackButton","StartButton","LeftStick","RightStick","D-Up","D-Down","D-Left","D-Right"];
let functionMap = {
    "AButton" : AButtonPressed,
    "BButton" : AButtonPressed,
    "XButton" : AButtonPressed,
    "YButton" : AButtonPressed,
    "LeftBumper" : AButtonPressed,
    "RightBumper" : AButtonPressed,
    "LeftTrigger" : AButtonPressed,
    "RightTrigger" : AButtonPressed,
    "BackButton" : AButtonPressed,
    "StartButton" : AButtonPressed,
    "LeftStick" : AButtonPressed,
    "RightStick" : AButtonPressed,
    "D-Up" : AButtonPressed,
    "D-Down" : AButtonPressed,
    "D-Left" : AButtonPressed,
    "D-Right" : AButtonPressed,
}

var y = 0;

var body = document.body;
var html = document.documentElement;
var heightOfDocument = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);



let axesMap = ["LeftStickLR", "LeftStickUD", "RightStickLR", "RightStickUD"];

let axesFunctions = {
    "LeftStickLR" : {
        true : AButtonPressed,
        false : AButtonPressed
    },  
    "LeftStickUD" : {
        true : GoDown,
        false : GoUp
    },
    "RightStickLR" : {
        true : AButtonPressed,
        false : AButtonPressed
    },
    "RightStickUD" : {
        true : GoDown,
        false : GoUp
    }  
}

window.addEventListener("gamepadconnected", (event) => {
    gamepad = navigator.getGamepads()[0];
    console.log("A gamepad connected:");
    console.log(event.gamepad);
  });

function frame(){
    QueryGamepad();
}

function QueryGamepad(){
    var gamepad = navigator.getGamepads()[0];
    if(gamepad){
       for(var i = 0 ; i < gamepad.buttons.length ; i++ ){
           if (gamepad.buttons[i].pressed == true){
               functionMap[buttonMap[i]]();
           }
       }

       for(var i = 0 ; i < gamepad.axes.length; i++){
           if (gamepad.axes[i] > 0.5){
                axesFunctions[axesMap[i]][true]();
           }
           if (gamepad.axes[i] < -0.5){
            axesFunctions[axesMap[i]][false]();
       }
       }

       
    } else {
        console.log("No gamepad detected");
    }
    requestAnimationFrame(QueryGamepad);
}

function AButtonPressed(){
    console.log("A button has been pressed");
}

function GoUp(){
    if (y > 0){
        y -= 10;
    }
    window.scroll(0,y);
}

function GoDown(){
    if (y < heightOfDocument){
        y += 10;
    }
    window.scroll(0,y);
}


requestAnimationFrame(QueryGamepad);

