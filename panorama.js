var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['C']);

var servo1 = 1; // We have a servo plugged in at position 1

servo.on('ready', function () {
    var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).
    camera.on('ready', function() {
        //notificationLED.high();
        // Take the picture

        var interval = setInterval(snapShot,500);


    });
    //  Set the minimum and maximum duty cycle for servo 1.
    //  If the servo doesn't move to its full extent or stalls out
    //  and gets hot, try tuning these values (0.05 and 0.12).
    //  Moving them towards each other = less movement range
    //  Moving them apart = more range, more likely to stall and burn out
    //servo.configure(servo1, 0.05, 0.4, function () {
    //    setInterval(function () {
    //        console.log('Position (in range 0-1):', position);
    //        //  Set servo #1 to position pos.
    //        servo.move(servo1, position);
    //
    //        // Increment by 10% (~18 deg for a normal servo)
    //        position += 0.2;
    //        if (position > 1) {
    //            position = 0; // Reset servo position
    //        }
    //    }, 500); // Every 500 milliseconds
});


//    //server.listen(1337, function () {
//    //    console.log('Server listening!');
//    //});
//
var count = 0;





camera.on('error', function(err) {
    console.error(err);
});

var snapShot = function(){
    if(count >= 7){
        clearInterval(interval);
       camera.disable();
    }
    else {
        count++;
        camera.takePicture(function(err, image) {
            if (err) {
                console.log('error taking image', err);
            } else {
                servo.configure(servo1, 0.05, 0.4, function () {
                    servo.move(servo1, position);
                    position += 0.1;
                            if (position > 1) {
                                position = 0; // Reset servo position
                            }
                });
                console.log(count);
                //notificationLED.low();
                // Name the image
                var name = 'picture-' + Date.now() + '.jpg';
                // Save the image
                console.log('Picture saving as', name, '...');
                process.sendfile(name, image);
                console.log('done.');

            }
        });
    }
}

