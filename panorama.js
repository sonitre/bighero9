var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);

var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture
var count = 0;

// Wait for the camera module to say it's ready
camera.on('ready', function() {
    notificationLED.high();

    //server.listen(1337, function () {
    //    console.log('Server listening!');
    //});

    // Take the picture
    while(count < 10){
        setInterval(function(){
        console.log(count);
            camera.takePicture(function(err, image) {
                if (err) {
                    console.log('error taking image', err);
                } else {

                    notificationLED.low();
                    // Name the image
                    var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
                    // Save the image
                    console.log('Picture saving as', name, '...');
                    process.sendfile(name, image);
                    console.log('done.');
                    count++;
                }
            });

        }, 1000);
    }


});

camera.on('error', function(err) {
    console.error(err);
});