DAlek Video Remote Operating System
-----------------------------------

Hacked together in 24 hours as part of HackedIO in London, this application uses BBCs Television Application Layer (TAL) to provide a control interface to a robotic Dalek. Images from the Dalek are fetched every second and displayed on screen.

The Dalek is controlled using the navigation and select/enter buttons on a TV remote or PC keyboard. The app then makes HTTP GET requests to a remote server.

 *   Enter/Select: Shout "Exterminate!"
     > URL: prefix+exterminate

	
 *   Up: Move Dalek forwards
     > URL: prefix+forward


 *   Left/Right: Turn Dalek Left or Right
     > URL: prefix+left or prefix+right


 *   Down: Turn Dalek around
     > URL: prefix+180

The image displayed is requested from prefix+grab.jpeg?timestamp - the timestamp is appended to prevent the image being cached between requests.

The prefix used in all requests can be configured by editing /static/script/appui/components/main.js and changing the line beginning  ```var server =```
For example:
```javascript
var server = "http://192.168.69.191:81/";
var server = "http://10.2.0.1:8080/control/";
```

The Dalek used to implement and test this application was based around a Raspberry Pi with a camera, with a python script providing the web interface using bottle.
The images were grabbed by a bash script running raspistill in a while loop - not particularly elegant! Any other method that allows a JPEG to be served over HTTP at the appropriate location should work. The original goal involved streaming video to the TV app, however rraspivid doesn't behave terribly well with pipes and the provided camera driver didn't expose a v4l2 device.

Suggested improvements:
 * Implement proper video streaming

 * Add a proper layout for screens supporting 1080p

 * Allow Dalek to be selected from the interface, permitting proper control of robotic army


This application was developed by:
 * Tom Lake <tswsl1989@sucs.org>

 * Nicholas Corlett <nicholas.corlett@gmail.com>

 * Tom Lloyd <napalmllama@gmail.com>

With help from the members of BBC R&D/BBC Future Media team at the event who provided the dalek, introductions, a wall of TV screens and plenty of enthusiastic support.

TAL is open source and available from http://www.github.com/fmtvp/tal/ and the sample application used to provide the bones of this project is available at http://www.github.com/fmtvp/talexample/
