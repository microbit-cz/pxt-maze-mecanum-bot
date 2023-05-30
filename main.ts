

input.onButtonPressed(Button.AB, function(){
    CarHandler.StopCar();
})

function Test() {
    // -100 -> 100
    let sp = 30;

    CarHandler.GoForward(sp);
    basic.pause(2500);

    CarHandler.RightTurn(sp, 2);
    basic.pause(2500);

    CarHandler.LeftTurn(sp, 2);
    basic.pause(2500);

    CarHandler.StopCar();

    CarHandler.Gobackward(sp);
    basic.pause(2500);

    CarHandler.WeirdMove(sp);
    basic.pause(1000);

    CarHandler.WeirdMove(-sp);
    basic.pause(1000);

    CarHandler.RotateRight(90);
    CarHandler.RotateLeft(90);

    CarHandler.GoForward(sp);
    basic.pause(1000);

    CarHandler.StopCar();
}