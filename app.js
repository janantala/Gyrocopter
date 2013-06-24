/**
 * Dispatches a custom DeviceOrientation Event 
 * @param  {double?} alpha    Rotate the device frame around its z axis by alpha degrees, with alpha in [0, 360).
 * @param  {double?} beta     Rotate the device frame around its x axis by beta degrees, with beta in [-180, 180).
 * @param  {double?} gamma    Rotate the device frame around its y axis by gamma degrees, with gamma in [-90, 90).
 * @param  {boolean} absolute Indicates absolute values for the three angles or relative to some arbitrary orientation.
 */
var orientateDevice = function(alpha, beta, gamma, absolute){
	absolute = absolute || false;
	var event = document.createEvent("DeviceOrientationEvent");
	event.initDeviceOrientationEvent("deviceorientation", false, false, alpha, beta, gamma, absolute);
	window.dispatchEvent(event);
};
