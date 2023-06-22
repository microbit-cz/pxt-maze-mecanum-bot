
const coolMazeSolver = true;

const debug = false;

// ----
let solve = false;

CarHandler.SetupSensors();
mecanumRobot.setServo(90);

input.onButtonPressed(Button.A, function () {
    if (debug) { DebugFunction(); return; }

    solve = !solve;
})

input.onButtonPressed(Button.B, function () {    
    if (debug) return;

    CoolMazeSolver.executePath = !CoolMazeSolver.executePath;
    CoolMazeSolver.currentPosition = 0;
    CarHandler.EnableRGBLED(LedCount.Right, CoolMazeSolver.executePath);
})

input.onButtonPressed(Button.AB, function(){
    CarHandler.StopCar();
})

basic.forever(function() {
    if (!solve) return;

    Time.UpdateDeltatime();

    if (coolMazeSolver) CoolMazeSolver.Update();
    else BasicMazeSolver.Update();

    basic.pause(10);
})

function DebugFunction(){
    
}
