input.onButtonPressed(Button.A, function () {
    Test();
})

input.onButtonPressed(Button.B, function () {
    CarHandler.RotateRight(90);
    CarHandler.RotateLeft(90);
})

function Test() {
    let sp = 100;

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