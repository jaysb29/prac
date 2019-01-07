import {passport} from "passport";
import {Strategy as localStrategy} from "passport-local";
import {bcryt} from "bcryt";
import {User} from "User"

passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'passwd'
    },
    function (username, passwd, done) {
        User.getUserData(username)
        .then(function (error, userDetails) {
            if (userDetails) {
                bcryt.compare(passwd, userDetails.pass, function (error, result) {
                    if(!result) {
                        return done(null, {message: 'Invalid Password'})
                    }
                })
                return done(null, {message: 'Login Succesful'})
            } else {
                return done(error)    
            }
        })
        .catch(function(){
            return done(error)
        })
    }
))