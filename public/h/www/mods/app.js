// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cViz-m', ['ionic', 'appMain', 'visits', 'sessions', 'generic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'mods/menu.html',
    controller: 'appCtrl'
  })

  .state('app.visits', {
    url: '/visits',
    views: {
      'menuContent': {
        templateUrl: 'mods/visits/visits.html',
        controller: 'visitsCtrl'
      }
    }
  })

  .state('app.visit', {
    url: '/visits/:id',
    views: {
      'menuContent': {
        templateUrl: 'mods/visits/visit.html',
        controller: 'visitCtrl'
      }
    }
  })

  .state('app.sessions', {
    url: '/sessions',
    views: {
      'menuContent': {
        templateUrl: 'mods/sessions/sessions.html',
        controller: 'sessionsCtrl'
      }
    }
  })

  .state('app.session', {
    url: '/sessions/:id',
    views: {
      'menuContent': {
        templateUrl: 'mods/sessions/session.html',
        controller: 'sessionCtrl'
      }
    }
  })

  .state('app.facts', {
    url: '/facts',
    views: {
      'menuContent': {
        templateUrl: 'mods/factsheet/facts.html',
        controller: 'genericCtrl'
      }
    }
  })

  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'mods/contacts/main.html',
        controller: 'genericCtrl'
      }
    }
  })

  .state('app.city', {
    url: '/city',
    views: {
      'menuContent': {
        templateUrl: 'mods/city/main.html',
        controller: 'genericCtrl'
      }
    }
  })

  .state('app.feedback', {
    url: '/feedback',
    views: {
      'menuContent': {
        templateUrl: 'mods/sessions/feedback.html',
        controller: 'genericCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'mods/search.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/sessions');
});
