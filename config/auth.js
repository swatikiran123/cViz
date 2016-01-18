// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : 'your-secret-clientID-here', // your App ID
        'clientSecret'    : 'your-client-secret-here', // your App Secret
        'callbackURL'     : 'http://localhost:3030/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'QIIK3jZB75iegLyFn807dWkCd',
        'consumerSecret'     : 'KnqTei8oWjPyte3ERLzTO0pHcrRBy25DVwmRXF5rXAtptwh2Fj',
        'callbackURL'        : 'http://localhost:3030/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '466945942467-ds49l1b0enas8htf90hb3ht4tvi5f3n0.apps.googleusercontent.com',
        'clientSecret'     : 'xw_f-uDJFRwY8OtuPQRt8-LJ',
        'callbackURL'      : 'http://localhost:3030/auth/google/callback'
    }

};
