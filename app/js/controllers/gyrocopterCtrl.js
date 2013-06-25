/*global gyrocopter */
(function () {
'use strict';

/**
 * The main controller for the app.
 */
gyrocopter.controller('gyrocopterCtrl', function mainCtrl($scope) {

  $scope.alpha = 0;
  $scope.beta = 0;
  $scope.gamma = 0;

  $scope.rotate = function(alpha, beta, gamma){
    $scope.css = {};
    $scope.css['transform'] = 'rotateX(' + beta + 'deg)' + 'rotateY(' + gamma + 'deg)' + 'rotateZ(' + alpha + 'deg)';
    $scope.css['-webkit-transform'] = 'rotateX(' + beta + 'deg)' + 'rotateY(' + gamma + 'deg)' + 'rotateZ(' + alpha + 'deg)';
  };

  $scope.rotate($scope.alpha, $scope.beta, $scope.gamma);

  /**
   * Dispatches a DeviceOrientation Event
   * @param  {double?} alpha    Rotate the device frame around its z axis by alpha degrees, with alpha in [0, 360).
   * @param  {double?} beta     Rotate the device frame around its x axis by beta degrees, with beta in [-180, 180).
   * @param  {double?} gamma    Rotate the device frame around its y axis by gamma degrees, with gamma in [-90, 90).
   * @param  {boolean} absolute Indicates absolute values for the three angles or relative to some arbitrary orientation.
   */

  $scope.orientateDevice = function(alpha, beta, gamma, absolute){
    console.log(alpha, beta, gamma);

    absolute = absolute || false;
    // var event = document.createEvent("DeviceOrientationEvent");
    // event.initDeviceOrientationEvent("deviceorientation", false, false, alpha, beta, gamma, absolute);
    // window.dispatchEvent(event);

    var js = '';
    js += 'var event = document.createEvent("DeviceOrientationEvent");';
    js += 'event.initDeviceOrientationEvent("deviceorientation", false, false, ' + alpha + ', ' + beta + ', ' + gamma + ', ' + absolute + ');';
    js += 'window.dispatchEvent(event);';

    // var hello = '"ahoj"';
    // js += 'alert(' + hello + ');';

    chrome.tabs.executeScript({
      code: js
    });

    $scope.rotate($scope.alpha, $scope.beta, $scope.gamma);
  };
});

})();
