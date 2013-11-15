module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['karma', 'jshint']);

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        options: karmaConfig('test/test.conf.js')
      }
    },
    jshint:{
      files:['app/js/**/*.js', 'test/**/*.js'],
      options: {
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        devel:true,
        globals:{}
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    }
  });
};
