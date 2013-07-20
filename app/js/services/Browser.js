'use strict';

gyrocopter.factory('Browser', function () {

  var platforms = [
  {
    'name': 'W3C',
    'browsers': [
      {
        'name': 'Specification',
        'id': 'w3c-specification',
        'rotation': {
          'alpha': {
            'min': 0,
            'max': 360,
            'zero': 0
          },
          'beta': {
            'min': -180,
            'max': 180,
            'zero': 0
          },
          'gamma': {
            'min': -90,
            'max': 90,
            'zero': 0
          }
        }
      }
    ]
  },
  {
    'name': 'iOS',
    'browsers': [
      {
        'name': 'Safari',
        'id': 'ios-safari',
        'rotation': {
          'alpha': {
            'min': 0,
            'max': 360,
            'zero': 90
          },
          'beta': {
            'min': -90,
            'max': 90,
            'zero': 0
          },
          'gamma': {
            'min': 180,
            'max': -180,
            'zero': 0
          }
        }
      }
    ]
  },
  {
    'name': 'Android',
    'browsers': [
      {
        'name': 'Chrome',
        'id': 'android-chrome',
        'rotation': {
          'alpha': {
            'min': 0,
            'max': 360,
            'zero': 0
          },
          'beta': {
            'min': -90,
            'max': 90,
            'zero': 0
          },
          'gamma': {
            'min': 270,
            'max': -90,
            'zero': 0
          }
        }
      },
      {
        'name': 'Stock Browser',
        'id': 'android-stock',
        'rotation': {
          'alpha': {
            'min': 0,
            'max': 360,
            'zero': 270
          },
          'beta': {
            'min': -90,
            'max': 90,
            'zero': 0
          },
          'gamma': {
            'min': 270,
            'max': -90,
            'zero': 0
          }
        }
      },
      {
        'name': 'Firefox',
        'id': 'android-firefox',
        'rotation': {
          'alpha': {
            'min': 0,
            'max': 360,
            'zero': 0,
            'reverse': true
          },
          'beta': {
            'min': 180,
            'max': -180,
            'zero': 0,
            'reverse': true
          },
          'gamma': {
            'min': -90,
            'max': 90,
            'zero': 0,
            'reverse': true
          }
        }
      }
    ]
  }

  ];

  return {
    getPlatforms: function () {
      return platforms;
    }
  };
});
