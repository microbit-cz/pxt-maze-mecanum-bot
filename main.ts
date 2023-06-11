
const coolMazeSolver = true;
let solve = false;

CarHandler.SetupSensors();
mecanumRobot.setServo(90);

input.onButtonPressed(Button.A, function () {
    solve = !solve;
})

input.onButtonPressed(Button.B, function () {    
    executePath = !executePath;
    CarHandler.EnableRGBLED(LedCount.Right, executePath);
})

input.onButtonPressed(Button.AB, function(){
    CarHandler.StopCar();
})

basic.forever(function() {
    if (!solve) return;

    Time.UpdateDeltatime();

    if(coolMazeSolver) Update();
    else BasicMazeSolver.Update();
})