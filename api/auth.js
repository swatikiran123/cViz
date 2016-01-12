var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();

// Create endpoint handlers for /api/app/
router.route('/me')
  .get(getCurrentUser);

module.exports = router;

function getCurrentUser(req, res) {

    var user = req.user;
    console.log(user);
    if (req.user) {
        res.send(req.user);
    } else {
        res.status(404).send();
    }
}

/*module.exports = function (app, passport) {
    
    console.log(app);
    console.log(passport);
    //var router = app.Router();
    // Route to retrive current user
    router.get('/', function(req, res){

        var user = req.user;
        console.log(user);
        if (req.user) {
            res.send(req.user);
        } else {
            res.status(404).send();
        }
    });

    router.post('/token/', passport.authenticate('local', {session: false}), function(req, res) {
        if (req.user) {
            console.log(req.user);
            userSchema.createUserToken(req.user.email, function(err, usersToken) {
                // console.log('token generated: ' +usersToken);
                // console.log(err);
                if (err) {
                    res.json({error: 'Issue generating token'});
                } else {
                    res.json({token : usersToken});
                }
            });
        } else {
            res.json({error: 'AuthError'});
        }
    });


}*/
