'use strict';

describe('Service: Browser', function () {

  // load the service's module
  beforeEach(module('gyrocopterApp'));

  // instantiate service
  var Browser;
  beforeEach(inject(function (_Browser_) {
    Browser = _Browser_;
  }));

  it('should do something', function () {
    expect(!!Browser).toBe(true);
  });

});
