var User  = require('../models/user.js')
  , config = require('../config/auth.js');

function findUserByOauthId(oauthid, cb){
  User.findOne(oauthid, cb);
}

module.exports = {
  init: function(everyauth,app){
    everyauth.everymodule
      .findUserById( function (userId, cb) {
        User.findById(userId).populate('objectives').exec(function(err, user){
          cb(err,user);
        });
      })
      .userPkey('_id');
    this.github(everyauth);
  }
, github: function(everyauth){
    everyauth.github
      .appId(config.github.appId)
      .appSecret(config.github.appSecret)
      .findOrCreateUser( function (session, accessToken, accessTokenExtra, gData) {
        var promise = this.Promise();
        findUserByOauthId({'email': gData.email}, function(err,data){
          if(data && data.githubId){
            promise.fulfill(data);
          }else if(data){
            data.name = gData.name;
            data.githubId = gData.id;
            data.save(function(err,user){
              if(err) throw err;
              promise.fulfill(user);
            });
          }else{
            user = new User({name: gData.name, email: gData.email, githubId: gData.id});
            user.save(function(err,user){
              if(err) throw err;
              promise.fulfill(user);
            });
          }
        });
        return promise;
      })
      .redirectPath('/');
  }
}
