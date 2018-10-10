/**
 * Created by Admin on 3/16/2018.
 */
var SocialManager = cc.Class.extend({

    ctor: function () {

        this._target = null
        this._selector = null
        this._currentSocial = 0
        //this.friendData = new SocialFriendData();
        this.topServer = null;

    },
    setTarget: function (target, selector) {
        this._target = target;
        this._selector = selector;
    },

    errorHttp: function () {
        engine.HandlerManager.getInstance().forceRemoveHandler(toName("femcdUpcdmgo"));
        engine.HandlerManager.getInstance().forceRemoveHandler(toName("mo~YoyycedAos"));
        if (this._selector && this._target)
            this._selector.call(this._target, this._currentSocial, "{\"error\": -1}");
    },

    logout: function () {
        if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
            jsb.reflection.callStaticMethod("FacebookUtils", "logout");
            jsb.reflection.callStaticMethod("GoogleUtils", "logout");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            jsb.reflection.callStaticMethod("com/vpl/utils/social/FacebookUtils", "logout", "()V");
        }
        else if (cc.sys.os == cc.sys.OS_WP8) {
            if (this._currentSocial == SocialManager.FACEBOOK)
                engine.WP8Bridgle.logoutFB();

        }

    },
    // exec login google
    loginGoogle: function () {
        this._currentSocial = SocialManager.GOOGLE;
        this.callbackGG = function (jdata) {
            cc.log("socialMgr :" + "google :" + jdata);
            if (this._selector && this._target)
                this._selector.call(this._target, this._currentSocial, jdata);
        }

        engine.HandlerManager.getInstance().addHandler("login_google", this.callbackGG.bind(this));

        if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
            jsb.reflection.callStaticMethod("GoogleUtils", "login");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            jsb.reflection.callStaticMethod("com/vpl/utils/social/GoogleUtils", "getAccessToken", "()V");
        }

    },

    // exec login facebook
    loginFacebook: function () {
        this._currentSocial = SocialManager.FACEBOOK;
        this.callbackFB = function (jdata) {

            if (this._selector && this._target)
                this._selector.call(this._target, this._currentSocial, jdata);
        }
        engine.HandlerManager.getInstance().addHandler("login_facebook", this.callbackFB.bind(this));
        if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
            jsb.reflection.callStaticMethod("FacebookUtils", "login");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            jsb.reflection.callStaticMethod("com/vpl/utils/social/FacebookUtils", "getAccessToken", "()V");
        }
        else if (cc.sys.os == cc.sys.OS_WP8) {
            engine.WP8Bridgle.loginFB();
        }


    },

    onTimeOut: function () {              // timeout

    },
    saveSession: function (session, social, openID, typesocial) {
        cc.log("__________________  SAVE SESSION  _____________________");
        cc.sys.localStorage.setItem("social", social);
        cc.sys.localStorage.setItem("session", session);
        cc.sys.localStorage.setItem("openID", openID);
        cc.sys.localStorage.setItem("typesocial", typesocial);

    },
    clearSession: function () {
        cc.sys.localStorage.setItem("social", "");
        cc.sys.localStorage.setItem("session", "");
        cc.sys.localStorage.setItem("openID", "");
        cc.sys.localStorage.setItem("typesocial", -1);
    },

    getSession: function (session, social, openID, typesocial) {
        social = cc.sys.localStorage.getItem("social");
        session = cc.sys.localStorage.getItem("session");
        openID = cc.sys.localStorage.getItem("openID");
        typesocial = cc.sys.localStorage.getItem("typesocial");


    },
    sessionExist: function () {
        var session = cc.sys.localStorage.getItem("session");
        return (session != null) && (session != "");
    },


    /**********************************************/
    /* get sessionkey -- handle response*/
    onTimeOutSessionKey: function () {              // timeout
        cc.log("timeout sessionKey")
        if (this._selector && this._target)
            this._selector.call(this._target, this._currentSocial, "{\"error\": -1}");

    },
    onResponseSessionkey: function (data) {

        if (this._selector && this._target)
            if (data) {
                this._selector.call(this._target, this._currentSocial, data);
            }
            else {
                this._selector.call(this._target, this._currentSocial, this.xhr.responseText);
            }
        engine.HandlerManager.getInstance().forceRemoveHandler("getSessionKey");
    },
    /**********************************************/

})

SocialManager.GOOGLE = 0;
SocialManager.FACEBOOK = 2;

SocialManager.firstinit = true;
SocialManager.sharedInstance = null;

SocialManager.getInstance = function () {
    if (SocialManager.firstinit) {
        SocialManager.sharedInstance = new SocialManager();
        SocialManager.firstinit = false;
    }
    return SocialManager.sharedInstance;
}

var socialMgr = SocialManager.getInstance();