/*global gyrocopter */
(function () {
'use strict';

/**
 * The main controller for the app.
 */
gyrocopter.controller('gyrocopterCtrl', function mainCtrl($scope) {

  $scope.browser = 'w3c-specification';

  $scope.rotate = function(alpha, beta, gamma){
    $scope.css = {};

    var a = 360 - alpha;
    var b = - beta + 90;
    var c = gamma;

    $scope.css['transform'] = 'rotateX(' + b + 'deg)' + 'rotateY(' + c + 'deg)' + 'rotateZ(' + a + 'deg)';
    $scope.css['-webkit-transform'] = 'rotateX(' + b + 'deg)' + 'rotateY(' + c + 'deg)' + 'rotateZ(' + a + 'deg)';
  };

  chrome.storage.local.get(['alpha', 'beta', 'gamma'], function(storage){
    console.log(storage);
    $scope.alpha = Number(storage.alpha) || 0;
    $scope.beta = Number(storage.beta) || 90;
    $scope.gamma = Number(storage.gamma) || 0;

    $scope.rotate($scope.alpha, $scope.beta, $scope.gamma);
    $scope.$apply();

    $scope.orientateDevice($scope.alpha, $scope.beta, $scope.gamma);
  });

  /**
   * Dispatches a DeviceOrientation Event
   * @param  {double?} alpha    Rotate the device frame around its z axis by alpha degrees, with alpha in [0, 360).
   * @param  {double?} beta     Rotate the device frame around its x axis by beta degrees, with beta in [-180, 180).
   * @param  {double?} gamma    Rotate the device frame around its y axis by gamma degrees, with gamma in [-90, 90).
   * @param  {boolean} absolute Indicates absolute values for the three angles or relative to some arbitrary orientation.
   */

  $scope.orientateDevice = function(alpha, beta, gamma, absolute){
    console.log(alpha, beta, gamma);

    var a = alpha;
    var b = beta;
    var c = $scope.computeGamma(gamma);
    absolute = true;
    // var event = document.createEvent("DeviceOrientationEvent");
    // event.initDeviceOrientationEvent("deviceorientation", false, false, alpha, beta, gamma, absolute);
    // window.dispatchEvent(event);

    var js = '';
    js += 'var event = document.createEvent("DeviceOrientationEvent");';
    js += 'event.initDeviceOrientationEvent("deviceorientation", false, false, ' + a + ', ' + b + ', ' + c + ', ' + absolute + ');';
    js += 'window.dispatchEvent(event);';

    chrome.tabs.executeScript({
      code: js
    });

    $scope.rotate($scope.alpha, $scope.beta, $scope.gamma);
  };


  $scope.saveRotation = function(){
    chrome.storage.local.set({'alpha': $scope.alpha, "beta": $scope.beta, "gamma": $scope.gamma}, function() {
      console.log('saved');
    });
  };

  $scope.reset = function(){
    $scope.alpha = 0;
    $scope.beta = 90;
    $scope.gamma = 0;
    $scope.orientateDevice($scope.alpha, $scope.beta, $scope.gamma);
    $scope.saveRotation();
  };

  $scope.stepper = 0.5;

  $scope.compute = function(next, direction, min, max){
    if (direction === 'left') {
      next -= $scope.stepper;
    }
    else {
      next += $scope.stepper;
    }

    if (next < min) {
      next = max - $scope.stepper;
    }
    else if (next >= max) {
      next = min;
    }

    return next;
  };

  $scope.computeGamma = function(gamma){
    if (gamma > 90) {
      return Number(gamma) - 180;
    }
    else if (gamma < -90) {
      return Number(gamma) + 180;
    }
    else {
      return Number(gamma);
    }
  };

  $scope.stepAlpha = function(direction){
    var next =  $scope.compute(Number($scope.alpha), direction, 0, 360);
    $scope.alpha = next;
    $scope.orientateDevice($scope.alpha, $scope.beta, $scope.gamma);
    $scope.saveRotation();
  };

  $scope.stepBeta = function(direction){
    var next =  $scope.compute(Number($scope.beta), direction, -180, 180);
    $scope.beta = next;
    $scope.orientateDevice($scope.alpha, $scope.beta, $scope.gamma);
    $scope.saveRotation();
  };

  $scope.stepGamma = function(direction){
    var next =  $scope.compute(Number($scope.gamma), direction, -180, 180);
    $scope.gamma = next;
    $scope.orientateDevice($scope.alpha, $scope.beta, $scope.gamma);
    $scope.saveRotation();
  };
});

})();
