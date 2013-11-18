/**
 * Gyrocopter v0.2.3
 * The MIT License
 * Copyright (c) 2013 Jan Antala
 */

(function () {
'use strict';

/**
 * The main controller for the app.
 */
gyrocopter.controller('gyrocopterCtrl', function mainCtrl($scope, Browser) {

  var port = chrome.runtime.connect({
      name: 'Gyrocopter'
  });

  $scope.css = {};
  $scope.platforms = Browser.getPlatforms();

  $scope.selected = $scope.platforms[0].browsers[0];
  $scope.selectBrowser = function(browser){
    $scope.selected = browser;
    $scope.updateAxes();
    $scope.saveData();
  };

  $scope.updateAxes = function(){
    var rotation = $scope.css.transform.match(/-?(\d+)(\.(\d+))?/g);

    var b = Number(rotation[0]);
    var c = Number(rotation[1]);
    var a = Number(rotation[2]);

    var alphaMult = $scope.selected.rotation.alpha.reverse ? -1 : 1;
    var betaMult = $scope.selected.rotation.beta.reverse ? -1 : 1;
    var gammaMult = $scope.selected.rotation.gamma.reverse ? -1 : 1;

    $scope.alpha = - (a/alphaMult);
    $scope.beta = betaMult > 0 ? - (b/betaMult) + 90 - 180 : - ((b - 180)/betaMult) + 90 - 180;
    $scope.gamma = (c/gammaMult) - 180;

    while ($scope.alpha < 0) { $scope.alpha += 360; }
    while ($scope.beta < 0) { $scope.beta += 360; }
    while ($scope.gamma < 0) { $scope.gamma += 360; }

  };

  $scope.setDefaultRotation = function(){
    $scope.rotateDevice();
  };

  /**
   * Compute methods
   */

  $scope.getRange = function(max, min){
    return Math.abs(max - min);
  };

  $scope.getAlphaRotation = function(){
    var alpha = $scope.alpha;
    return alpha;
  };

  $scope.getBetaRotation = function(){
    var beta = $scope.beta - 180;
    var range = $scope.getRange($scope.selected.rotation.beta.max, $scope.selected.rotation.beta.min);

    if (range === 180) {
      if (beta > 90) {
        return (90 - beta + 90);
      }
      if (beta < -90) {
        return -1 * (90 + beta + 90);
      }
    }

    return beta;
  };

  $scope.getGammaRotation = function(){
    var gamma = $scope.gamma - 180;

    var range = $scope.getRange($scope.selected.rotation.gamma.max, $scope.selected.rotation.gamma.min);

    if (range === 180) {
      if (gamma > 90) {
        return (gamma - 180);
      }
      if (gamma <= -90) {
        return (gamma + 180);
      }
    }

    if (gamma < -90 && $scope.selected.rotation.gamma.min > 180) {
      gamma = $scope.selected.rotation.gamma.min + gamma + 90;
    }

    return gamma;
  };

  /**
   * Rotation methods
   */

  var prettyRotate = function(val){
    if (val > 360) {
      return val - 360;
    }

    if (val < -360) {
      return val + 360;
    }

    return val;
  };

  var performeRotation = function(a,b,c){
    $scope.css['transform'] = 'rotateX(' + b + 'deg)' + 'rotateY(' + c + 'deg)' + 'rotateZ(' + a + 'deg)';
    $scope.css['-webkit-transform'] = 'rotateX(' + b + 'deg)' + 'rotateY(' + c + 'deg)' + 'rotateZ(' + a + 'deg)';
  }

  $scope.rotateDevice = function(){
    var alpha = $scope.alpha;
    var beta = $scope.beta;
    var gamma = $scope.gamma;
    var alphaMult = $scope.selected.rotation.alpha.reverse ? -1 : 1;
    var betaMult = $scope.selected.rotation.beta.reverse ? -1 : 1;
    var gammaMult = $scope.selected.rotation.gamma.reverse ? -1 : 1;

    var a = - alpha * alphaMult;
    var b = betaMult > 0 ? (- beta + 90 - 180) * betaMult : (- beta + 90 - 180) * betaMult - 180;
    var c = - (- gamma - 180) * gammaMult;

    a = prettyRotate(a);
    b = prettyRotate(b);
    c = prettyRotate(c);

    performeRotation(a,b,c);
    sendJS($scope.getAlphaRotation($scope.alpha), $scope.getBetaRotation($scope.beta), $scope.getGammaRotation($scope.gamma));
  };

  $scope.saveData = function(){
    chrome.storage.local.set({'alpha': $scope.alpha, 'beta': $scope.beta, 'gamma': $scope.gamma, 'browser': JSON.stringify($scope.selected)}, function() {
      console.log('saved');
    });
  };

  chrome.storage.local.get(['alpha', 'beta', 'gamma', 'browser'], function(storage){
    console.log(storage);
    $scope.alpha = Number(storage.alpha);
    $scope.beta = Number(storage.beta);
    $scope.gamma = Number(storage.gamma);
    $scope.selected = JSON.parse(storage.browser || '{}');
    if (!$scope.selected.id) {
      $scope.selected = $scope.platforms[0].browsers[0];
    }
    if ($scope.alpha === undefined && $scope.beta === undefined && $scope.gamma === undefined) {
      performeRotation(0,0,0);
      $scope.updateAxes();
    }
    $scope.rotateDevice();
    $scope.$apply();
  });

  /**
   * Dispatches a DeviceOrientation Event
   * @param  {double?} alpha    Rotate the device frame around its z axis by alpha degrees, with alpha in [0, 360).
   * @param  {double?} beta     Rotate the device frame around its x axis by beta degrees, with beta in [-180, 180).
   * @param  {double?} gamma    Rotate the device frame around its y axis by gamma degrees, with gamma in [-90, 90).
   * @param  {boolean} absolute Indicates absolute values for the three angles or relative to some arbitrary orientation.
   */

  var sendJS = function(alpha, beta, gamma, absolute){
    console.log(alpha, beta, gamma);

    var a = alpha;
    var b = beta;
    var c = gamma;
    absolute = true;
    // var event = document.createEvent("DeviceOrientationEvent");
    // event.initDeviceOrientationEvent("deviceorientation", false, false, alpha, beta, gamma, absolute);
    // window.dispatchEvent(event);

    var js = '';
    js += 'var event = document.createEvent("DeviceOrientationEvent");';
    js += 'event.initDeviceOrientationEvent("deviceorientation", false, false, ' + a + ', ' + b + ', ' + c + ', ' + absolute + ');';
    js += 'window.dispatchEvent(event);';

    port.postMessage({
      tabId: chrome.devtools.inspectedWindow.tabId,
      code: js
    });
  };

  $scope.reset = function(){
    performeRotation(0,0,0);
    $scope.updateAxes()
    sendJS($scope.getAlphaRotation($scope.alpha), $scope.getBetaRotation($scope.beta), $scope.getGammaRotation($scope.gamma));
    $scope.saveData();
  };

  var STEPPER = 0.5;

  $scope.compute = function(next, direction, min, max){
    if (direction === 'left') {
      next -= STEPPER;
    }
    else {
      next += STEPPER;
    }

    if (next < min) {
      next = max - STEPPER;
    }
    else if (next >= max) {
      next = min;
    }

    return next;
  };

  $scope.stepAlpha = function(direction){
    var next =  $scope.compute(Number($scope.alpha), direction, 0, 359.5);
    $scope.alpha = next;
    $scope.rotateDevice()
    $scope.saveData();
  };

  $scope.stepBeta = function(direction){
    var next =  $scope.compute(Number($scope.beta), direction, 0.5, 360);
    $scope.beta = next;
    $scope.rotateDevice()
    $scope.saveData();
  };

  $scope.stepGamma = function(direction){
    var next =  $scope.compute(Number($scope.gamma), direction, 0, 359.5);
    $scope.gamma = next;
    $scope.rotateDevice()
    $scope.saveData();
  };
});

})();
