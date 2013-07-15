Device Orientation
------------------

Reference:
https://github.com/ajfisher/deviceapi-normaliser

The specs suggest the following:

* X is in the plane of the ground and is positive to the East (-ive to West)
* Y is in the plane of the ground and is positive to the North (-ive to South)
* Z is perpendicular to the ground plane and is positive towards the sky (negative into the earth)

Rotation should be expressed using the right hand rule, thus positive values 
with rotation clockwise around the axis of rotation when looking down the axis.

The tables below express where the zero point is for a given axis, what the 
values are for it's rotational range, whether it obeys the Right Hand Rule* 
and any further notes.

RHR* = Right Hand Rule. That positive values increase when rotating clockwise 
  around the axis of rotation when looking along the axis' postive trajectory. 
  This causes confusion because for a compass it looks like you're going 
  backwards but that's because you're looking along the -ive trajectory of the 
  Z axis.

With respect to RHR, Y=Yes, N=No and P=Partial which means it follows some of the RHR guidance

Alpha (compass/ yaw)
....................

The spec is unclear what the defaults should be and so as a result many different 
choices are taken by the vendors. This causes confusion and the spec is not clear 
about what 0 degrees should actually be. From the example it is implied that North 
is 0 degrees because West is given as +90 degrees (which is correct under the RHR). 

The range is tested by holding the device level in the horizontal plane, 
orienting it to the zero point then turning it through 360 degrees, observing 
its range and direction.

===========     ==========      ====    ========
\               Zero point      RHR*    Range
===========     ==========      ====    ========
Reference:      North (0)       Y       [0, 360]
iOS Chome:      East (90)       Y       [0, 360]
iOS Safari:     East (90)       Y       [0, 360]
Blackberry:     South(180)      N       [0, 360]
Android ICS
Chrome:         North (0)       Y       [0, 360]
Stock:          West (270)      Y       [0, 360]
Firefox:        North (0)       N       [0, 360]
Android JB
Chrome:         North(0)        Y       [0, 360]
Firefox         North (0)       N       [0, 360]       
===========     ==========      ====    ========

Beta (Pitch)
............

The spec defines zero point as being flat in the horizontal plane. All browsers 
now support this model. Note that there are some issues in the ranging of the 
values.

The range is tested by holding the device level in the horizontal plan and 
confirming the zero point. The device is then rotated around the X axis through 
90 degrees (screen faces observer), then through the next 90 degrees (screen 
face down), then the remaining 180 degrees completing the bottom portion of 
the rotation.

===========     ===========     ====    =============   ========================================
\               Zero point      RHR*    Range           Notes
===========     ===========     ====    =============   ========================================
Reference       Horiz Plane     Y       [0, -180|180]
iOS Chome:      Horiz Plane     Y       [-90, 90]       Full range of rotation not supported.[1]
iOS Safari:     Horiz Plane     Y       [-90, 90]       Full range of rotation not supported.[1]
Backberry:      Horiz Plane     Y       [0, -180|180]   Per spec
Android ICS
Chrome:         H. Plane        Y       [-90, 90]       Full range of rotation not supported.[1]
Stock           H. Plane        Y       [-90, 90]       Full range of rotation not supported.[1]
Firefox         H. Plane        N       [0, 180|-180]   Back to front[2]
Android JB
Chrome:         H. Plane        Y       [-90, 90]       Full range of rotation not supported.[1]
Firefox         H. Plane        N       [0, 180|-180]   Back to front[2]
===========     ===========     ====    =============   ========================================

[1] Under iOS as well as the stock Android browser and Chrome for Android, 
the rotation goes the right direction from the horizontal plane however once it 
hits the maximal or minimal point at (90 | -90 degrees) it simply starts to 
decrease again, rather than provide the full rotation.

[2] In FF on android the rotation is back to front but it does go through the 
full range to 180 degrees. However under firefox the value is -90 when the top 
is point upwards and 90 when the top of the device points downwards. This is a 
reversing of the RHR.

Gamma (Roll)
.............

The spec defines the zero point as being level in the horizontal place. Again 
there are some issues with ranges and some implied issues with how the W3C have 
defined this as they are assuming only 90 degrees of rotation around the Y axis 
is relevant.

The range is tested by holding the device level in the horizontal plane and 
confirming a zero point. The device it then rotated around the Y axis 90 degrees 
clockwise (screen faces right) then again (screen faces down) and then through 
the other 180 degrees back to the origin.

===========     ===========      ====    =============   ========================================
\               Zero point       RHR*    Range           Notes
===========     ===========      ====    =============   ========================================
Reference       Horiz Plane      Y       [0, 90|-90]     [1]
iOS Chome:      Horiz Plane      Y       [0, 180|-180]   Full range of rotation not supported[2]
iOS Safari:     Horiz Plane      Y       [0, 180|-180]   Full range of rotation not supported[2]
Blackberry:     Horiz Plane      Y       [0, 90|-90]     Per Spec
Android ICS
Chrome:         H. Plane         Y       [0, 270|-90]    Odd range to cope with the gaps[3]
Stock:          H. Plane         Y       [0, 270|-90]    Odd range to cope with the gaps[3]
Firefox         H. Plane         N       [0, -90|90]     Range back to front [4]
Android JB
Chrome:         H. Plane         Y       [0, 270|-90]    Odd range to cope with the gaps[3]
Firefox         H. Plane         N       [0, -90|90]     Range back to front [4]
===========     ===========      ====    =============   ========================================

[1] This is poor definition by the W3C as it implies rotation only happens to 
90 degrees from the horizontal plane, thus causing an issue when you go under 
this.

[2] Under iOS rotation starts from the horizontal plan with the screen facing 
up as the zero point. Rotating around the Y axis so that the screen is facing 
down will result in a value of 180 or -180. If the rotation occurs clockwise the 
values increase through the +ive range, if the rotation is anti-clockwise then 
the values increase through the -ive range. Thus resting the R edge (L edge 
upwards) the value is 90, the reverse (resting on the L edge, R edge up) means 
the value is -90.

[3] The Chrome for Android and stock android browsers create the right rotational 
vales for the +-90 range however the gap after 90 on the clockwise rotation is 
filled with increasing +ive values until it reaches the -90 value. This provides 
an opportunity to know exactly how far the device is rotated around the Y axis 
but can't be replicated by any of the others.

[4] Firefox reverses its range the same way as it does on Beta. The range is 
correct however rotation clockwise results in a -ive number and the reverse.
