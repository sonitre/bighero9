var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['C']);

var servo1 = 1; // We have a servo plugged in at position 1
var position = 0;

servo.on('ready', function () {
      //  Target position of the servo between 0 (min) and 1 (max).

    servo.configure(servo1, 0.05, 0.12, function () {

    });
});

//    //server.listen(1337, function () {
//    //    console.log('Server listening!');
//    //});
//
var count = 0;

camera.on('ready', function(){
    var interval = setInterval(snapShot, 500);
})



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
                servo.move(servo1, position);
                position += 0.2;
                if (position > 1) {
                    position = 0; // Reset servo position
                }
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
