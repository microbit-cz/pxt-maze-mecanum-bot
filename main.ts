




input.onButtonPressed(Button.A, function ()
{    
    CarHandler.WeirdMove(20);

    //Test();
})

input.onButtonPressed(Button.B, function () {
    CarHandler.RotateRight(90);
    CarHandler.RotateLeft(90);
})

input.onButtonPressed(Button.AB, function(){
    CarHandler.StopAll();
})

function Test() {
    // -100 -> 100
    let sp = 80;

    CarHandler.GoForward(sp);
    basic.pause(2500);

    CarHandler.RightTurn(sp);
    basic.pause(2500);

    CarHandler.LeftTurn(sp);
    basic.pause(2500);

    CarHandler.StopAll();

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

    CarHandler.StopAll();
}