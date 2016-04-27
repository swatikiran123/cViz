module.exports = function(grunt){


//initconfig Method defining Tasks 
grunt.initConfig(  {

  pkg: grunt.file.readJSON('package.json'),

  uglify:{
   build: {
     options: {
      removeComments: true,
      collapseWhitespace: true,
      mangle:false
    },
    expand: true,
    cwd: 'public/',
    src: ['**/*.js','**/**/*.js','**/**/**/*.js','!libs/**/*.js','!libs/*.js','!libs/**/**/*.js'],
    dest: 'dist/public/'
  }
},
 //html files minification
 minifyHtml: {
  build: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      mangle   : false
    },
    expand: true,
    cwd: 'public/',
    src: ['**/*.html','**/**/*.html','**/**/**/*.html','!libs/**/*.html','!libs/*.html','!libs/**/**/*.html'],
    dest: 'dist/public/'
  }
},
//copy
copy: {
  options: {
      mangle   : false
    },
  libs: {
    files: [
      // bootstrap
      {src: ['public/libs/bootstrap/dist/css/bootstrap.min.css'], dest: 'dist/public/libs/bootstrap/dist/css/bootstrap.css'},
      {src: ['public/libs/bootstrap/dist/js/bootstrap.min.js'], dest: 'dist/public/libs/bootstrap/dist/js/bootstrap.js'},
      //angular-calendar
      {src: ['public/libs/fullcalendar/dist/fullcalendar.min.css'], dest: 'dist/public/libs/fullcalendar/dist/fullcalendar.css'},
      {src: ['public/libs/fullcalendar/dist/fullcalendar.min.js'], dest: 'dist/public/libs/fullcalendar/dist/fullcalendar.js'},
      {src: ['public/libs/fullcalendar/dist/gcal.js'], dest: 'dist/public/libs/fullcalendar/dist/gcal.js'},
      //font-awesome
      {src: ['public/libs/font-awesome/css/font-awesome.min.css'], dest: 'dist/public/libs/font-awesome/css/font-awesome.css'},
      //jquery
      {src: ['public/libs/jquery/dist/jquery.min.js'], dest: 'dist/public/libs/jquery/dist/jquery.js'},
      {src: ['public/libs/jquery-ui/jquery-ui.min.js'], dest: 'dist/public/libs/jquery-ui/jquery-ui.js'},
      {src: ['public/libs/jquery-ui/themes/smoothness/jquery-ui.min.css'], dest: 'dist/public/libs/jquery-ui/themes/smoothness/jquery-ui.css'},
      //angular-core
      {src: ['public/libs/angular/angular.min.js'], dest: 'dist/public/libs/angular/angular.js'},
      {src: ['public/libs/angular-route/angular-route.min.js'], dest: 'dist/public/libs/angular-route/angular-route.js'},
      {src: ['public/libs/angular-cookies/angular-cookies.min.js'], dest: 'dist/public/libs/angular-cookies/angular-cookies.js'},
      //angular-forms
      {src: ['public/libs/angular-messages/angular-messages.min.js'], dest: 'dist/public/libs/angular-messages/angular-messages.min.js'},
      {src: ['public/libs/angular-messages/angular-messages.min.js.map'], dest: 'dist/public/libs/angular-messages/angular-messages.min.js.map'},
     
      //angular-bootstrap
      {src: ['public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js'], dest: 'dist/public/libs/angular-bootstrap/ui-bootstrap-tpls.js'},
      //angular-animate
      {src: ['public/libs/angular-animate/angular-animate.min.js'], dest: 'dist/public/libs/angular-animate/angular-animate.js'},
      {src: ['public/libs/angular-animate/angular-animate.min.js.map'], dest: 'dist/public/libs/angular-animate/angular-animate.min.js.map'},
      //angular-material
      {src: ['public/libs/angular-aria/angular-aria.min.js'], dest: 'dist/public/libs/angular-aria/angular-aria.js'},
       {src: ['public/libs/angular-aria/angular-aria.min.js.map'], dest: 'dist/public/libs/angular-aria/angular-aria.min.js.map'},
      {src: ['public/libs/angular-material/angular-material.min.js'], dest: 'dist/public/libs/angular-material/angular-material.js'},
      {src: ['public/libs/angular-material/angular-material.min.css'], dest: 'dist/public/libs/angular-material/angular-material.css'},
      //angular-growl
      {src: ['public/libs/angular-growl-v2/build/angular-growl.min.css'], dest: 'dist/public/libs/angular-growl-v2/build/angular-growl.css'},
      {src: ['public/libs/angular-growl-v2/build/angular-growl.min.js'], dest: 'dist/public/libs/angular-growl-v2/build/angular-growl.js'},
      //angular-fileupload
      {src: ['public/libs/ng-file-upload/ng-file-upload.min.js'], dest: 'dist/public/libs/ng-file-upload/ng-file-upload.js'},
      {src: ['public/libs/ng-file-upload/ng-file-upload-shim.min.js'], dest: 'dist/public/libs/ng-file-upload/ng-file-upload-shim.js'},
      //angular-image
      {src: ['public/libs/ngImgCropFullExtended/compile/minified/ng-img-crop.js'], dest: 'dist/public/libs/ngImgCropFullExtended/compile/minified/ng-img-crop.js'},
      {src: ['public/libs/ngImgCropFullExtended/compile/minified/ng-img-crop.css'], dest: 'dist/public/libs/ngImgCropFullExtended/compile/minified/ng-img-crop.css'},
      //utils
      {src: ['public/libs/moment/moment.js'], dest: 'dist/public/libs/moment/moment.js'},
      {src: ['public/libs/moment-range/dist/moment-range.min.js'], dest: 'dist/public/libs/moment-range/dist/moment-range.js'},

      {src: ['public/libs/font-awesome/fonts/fontawesome-webfont.woff2'], dest: 'dist/public/libs/font-awesome/fonts/fontawesome-webfont.woff2'},
      {src: ['public/assets/w/styles/materialform.css'], dest: 'dist/public/assets/w/styles/materialform.css'},
      {src: ['public/libs/font-awesome/fonts/fontawesome-webfont.woff'], dest: 'dist/public/libs/font-awesome/fonts/fontawesome-webfont.woff'},
      {src: ['public/libs/font-awesome/fonts/fontawesome-webfont.ttf'], dest: 'dist/public/libs/font-awesome/fonts/fontawesome-webfont.ttf'},
      {src: ['public/libs/font-awesome/fonts/fontawesome-webfont.svg'], dest: 'dist/public/libs/font-awesome/fonts/fontawesome-webfont.svg'},

      {src: ['public/libs/angular-route/angular-route.min.js.map'], dest: 'dist/public/libs/angular-route/angular-route.min.js.map'},
      {src: ['public/libs/bootstrap/dist/css/bootstrap.min.css.map'], dest: 'dist/public/libs/bootstrap/dist/css/bootstrap.min.css.map'},
      {src: ['public/libs/angular/angular.min.js.map'], dest: 'dist/public/libs/angular/angular.min.js.map'},
      {src: ['public/libs/angular-cookies/angular-cookies.min.js.map'], dest: 'dist/public/libs/angular-cookies/angular-cookies.min.js.map'},
      {src: ['public/libs/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'], dest: 'dist/public/libs/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'},
      {src: ['public/libs/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'], dest: 'dist/public/libs/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'},
      ],
    },
    images: {
      files: [{
        expand: true,
        cwd: 'public/',
        src: ['**/*.jpg', '**/**/*.jpg','**/**/**/*.jpg', '**/**/**/*.gif','**/*.png', '**/**/*.png','**/**/**/*.png','!libs/**/*.jpg','!libs/*.jpg','!libs/**/**/*.jpg'],
        dest: 'dist/public/'
      }]
    },
    config: {
      expand:true,
      cwd: 'config/',
      src: ['*.js','*.json'],
      dest: 'dist/config/'
    },
    controllers: {
      expand:true,
      cwd: 'controllers/',
      src: ['**/*.js','*.js'],
      dest: 'dist/controllers/'
    },
    models: {
      expand:true,
      cwd: 'models/',
      src: ['*.js'],
      dest: 'dist/models/'
    },
    routes: {
      expand:true,
      cwd: 'routes/',
      src: ['*.js'],
      dest: 'dist/routes/'
    },
    scripts: {
      expand:true,
      cwd: 'scripts/',
      src: ['*.js'],
      dest: 'dist/scripts/'
    },
    services: {
      expand:true,
      cwd: 'services/',
      src: ['*.js'],
      dest: 'dist/services/'
    },
    templates: {
      expand:true,
      cwd: 'templates/',
      src: ['**/*.swig', '**/**/*.swig','**/**/**/*.swig'],
      dest: 'dist/templates/'
    },
    fonts: {
      expand:true,
      cwd: 'public/',
      src: ['**/*.ttf', '**/**/*.ttf','**/**/**/*.ttf'],
      dest: 'dist/public/'
    },

    views: {
      expand:true,
      cwd: 'views/',
      src: ['*.ejs', '**/*.ejs', '**/**/*.ejs','**/*.js'],
      dest: 'dist/views/'
    },
    server: {src: ['server.js'], dest: 'dist/server.js'},
    package: {src: ['package.json'], dest: 'dist/package.json'},
    fav: {src: ['public/favicon.ico'], dest: 'dist/public/favicon.ico'},
    disc: {src: ['public/discovery.json'], dest: 'dist/public/discovery.json'},
    node_modules: {
      expand:true,
      cwd: 'node_modules/',
      src: ['**'],
      dest: 'dist/node_modules/'
    }
  },
  cssmin: {
    options: {
      mangle   : false
    },
    build:{
      expand: true,
      cwd: 'public/',
      src: ['**/*.css', '**/**/*.css','**/**/**/*.css','!assets/w/styles/materialform.css','!libs/**/*.css','!libs/*.css','!libs/**/**/*.css'],
      dest: 'dist/public/'
    }

  }

	});  //initconfig closed
grunt.loadNpmTasks('grunt-minify-html');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.registerTask('default',['copy','uglify','minifyHtml','cssmin']  );
};
