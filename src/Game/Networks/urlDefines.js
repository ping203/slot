/**
 * Created by Admin on 3/16/2018.
 */
var MODE_DEPLOY = {
    LOCAL: 0,
    TEST: 1,
    LIVE: 2
};
var BASE_URL = "http://gem.club/portal/api?";
var CURRENT_MODE = MODE_DEPLOY.TEST;
(function () {




    var HOST = "http://gem.club";
    var HOSTNAME = 'gem.club';
    var isHttps = false;
    var HREF = isHttps ? "https:" : (window.location ? window.location.protocol : "http:");
    var JS_BANCA = "http://resource.xengclub.net/Online/Vinplay_Web";

    // setDeployMode(MODE_DEPLOY.LOCAL);
    // CURRENT_MODE = MODE_DEPLOY.LOCAL;
      CURRENT_MODE = MODE_DEPLOY.TEST;
  // CURRENT_MODE = MODE_DEPLOY.LIVE;
      setDeployMode(MODE_DEPLOY.TEST);
   // setDeployMode(MODE_DEPLOY.LIVE);
   console.log("2/5 - 14:07");

    function setDeployMode(CURRENT_MODE) {
        // window.BASE_URL = "";
        switch (CURRENT_MODE) {
            case MODE_DEPLOY.LOCAL :
                setDeployModeLocal();
                break;
            case MODE_DEPLOY.LIVE :
                setDeployModeLive();
                break;
            case MODE_DEPLOY.TEST :
                setDeployModeTest();
                break;
        }
        window.API_PORTAL = HREF + "//" + HOSTNAME + "/config_api.html";

    }

    function setDeployModeLocal() {
        BASE_URL = "http://35.201.171.109:8081/api";
        HOSTNAME = "192.168.0.192";
        window.JS_BANCA = HREF + "//resource.xengclub.net/Local/Vinplay_Web";
    }

    function setDeployModeLive() {
        BASE_URL = "http://gem.club/portal/api?";
        HOSTNAME = "gem.club";
        window.JS_BANCA = "http://resource.xengclub.net/Online/Vinplay_Web";
        // window.JS_BANCA = HREF + "//resource.xengclub.net/Beta/Vinplay_Web";
    }

    function setDeployModeTest() {
        BASE_URL = "http://35.201.171.109:8081/api?";
        HOSTNAME = "35.201.171.109";

        window.JS_BANCA = HREF + "//resource.xengclub.net/Local/Vinplay_Web";
    }

})();


var accessTokenUrl = "";

var urlQuickRegiste = function (username, password, captcha, idcaptcha)  // ?c=1&un=&pw=&cp=&cid=
{
    if (lobby.facebook_canvas == true)
        return BASE_URL + "c=1&un=" + username + "&pw=" + password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl + "&utm_source=Appfb&utm_medium=Appfb&utm_term=Appfb&utm_content=Appfb&utm_campaign=Appfb";
    else if (cc.sys.os == cc.sys.OS_IOS && ConnectNative.versionCode() == "1.3.5")
        return BASE_URL + "c=1&un=" + username + "&pw=" + password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl + "&utm_source=IOS&utm_medium=IOS&utm_term=IOS&utm_content=IOS&utm_campaign=IOS";
    else if (cc.sys.os == cc.sys.OS_ANDROID)
        return BASE_URL + "c=1&un=" + username + "&pw=" + password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl + "&utm_source=ANDROID&utm_medium=ANDROID&utm_term=ANDROID&utm_content=ANDROID&utm_campaign=ANDROID";
    else
        return BASE_URL + "c=1&un=" + username + "&pw=" + password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl;
}
var urlRegister = function (username, password, mobile, email, address) {
    return BASE_URL + "c=2&un=" + username + "&pw=" + password + "&mobile=" + mobile + "&email=" + email + "&address=" + address + "&at=" + accessTokenUrl;
}
var urlLoginAcccessToken = function (nickName, accessToken, platform) {
    //cc.log("platform :" + platform);
    return BASE_URL + "c=2&nn=" + nickName + "&at=" + accessToken + "&pf=" + platform;
}

var urlLogin = function (username, password, platform) {
    return BASE_URL + "c=3&un=" + username + "&pw=" + password + "&pf=" + platform + "&at=" + accessTokenUrl;
}

var urlUpdateNick = function (username, password, nickName, platform) {
    //cc.log(BASE_URL + "c=5&un="+username+"&pw="+password+"&nn="+ nickName)+ "&at=" + accessTokenUrl;

    return BASE_URL + "c=5&un=" + username + "&pw=" + password + "&nn=" + nickName + "&pf=" + platform + "&at=" + accessTokenUrl;
}
var urlUpdateNickFBGG = function (s, at, nn, platform) {
    return BASE_URL + "c=5&s=" + s + "&at=" + at + "&nn=" + nn + "&pf=" + platform;
}

var urlGetConfig = function () {
    var os = "";
    var did = "";

    if (cc.sys.os == cc.sys.OS_IOS) {
        os = "ios";

    } else if (cc.sys.os == cc.sys.OS_ANDROID) {
        os = "ad";

    } else if (cc.sys.os == cc.sys.OS_WP8) {
        os = "wp";
    }
    else {
        os = "web"
    }
    var url = BASE_URL + "c=6&v=" + "1.0" + "&pf=" + os + "&did=" + did + "&at=" + accessTokenUrl;
    //var url = BASE_URL + "c=6&v=" + "1.0" + "&pf=" + "ad" + "&did=" + did + "&at=" + accessTokenUrl + "&vnt=" + 1;
    // cc.log("urlGetConfig " + url);
    return url;
}

var urlGetConfigCommon = function () {
    return BASE_URL + "c=129" + "&at=" + accessTokenUrl;
}

var urlLichSuGiaoDichTX = function (page, username, moneyType) {
    return BASE_URL + "c=100&p=" + page + "&un=" + username + "&mt=" + moneyType + "&at=" + accessTokenUrl;
}

var urlTopUserTX = function (moneyType) {
    return BASE_URL + "c=101&mt=" + moneyType + "&at=" + accessTokenUrl;
}
var urlChiTietPhien = function (rid, mt) {
    return BASE_URL + "c=102&rid=" + rid + "&mt=" + mt + "&at=" + accessTokenUrl;
}
var urlThanhDuDay = function (day, type) {
    return BASE_URL + "c=103&" + "date=" + day + "&type=" + type + "&at=" + accessTokenUrl;
}
var urlThanhDuMonth = function (month, type) {
    return BASE_URL + "c=103&" + "month=" + month + "&type=" + type + "&at=" + accessTokenUrl;
}

// VQMM
var urlLichSuVQMM = function (nickname) {
    return BASE_URL + "c=201&n=30&nn=" + nickname + "&at=" + accessTokenUrl;
}

var urlLichSuVQMM_NEW = function (nickname, page) {
    return BASE_URL + "c=201&p=" + page + "&nn=" + nickname + "&at=" + accessTokenUrl;
}


var urlTopTanLoc = function (un, type) {
    return BASE_URL + "c=104&un=" + un + "&type=" + type + "&at=" + accessTokenUrl;
}

// Minipoker
var urlVinhdanhMiniPoker = function (moneyType, page) {
    return BASE_URL + "c=106&mt=" + moneyType + "&p=" + page + "&at=" + accessTokenUrl;
}
var urlLichSuMiniPoker = function (page, nickname, moneyType) {
    return BASE_URL + "c=105&p=" + page + "&un=" + nickname + "&mt=" + moneyType + "&at=" + accessTokenUrl;
}
// Lichsu User
var urlLichSuUser = function (nickname, type, page, accesstoken) {
    return BASE_URL + "c=302&nn=" + nickname + "&mt=" + type + "&p=" + page + "&at=" + accesstoken;
}
// Daily
var urlDaily = function () {
    return BASE_URL + "c=401" + "&at=" + accessTokenUrl;
}
// mail user
var urlGetMailUser = function (nickname, page, accesstoken) {
    return BASE_URL + "c=405&nn=" + nickname + "&p=" + page + "&at=" + accesstoken;
}
var urlUpdateMailUser = function (mailID) {
    return BASE_URL + "c=404&mid=" + mailID + "&at=" + accessTokenUrl;
}
var urlDeleteMailUser = function (mailID) {
    return BASE_URL + "c=403&mid=" + mailID + "&at=" + accessTokenUrl;
}

//Caothap
var urlVinhdanhCaoThap = function (moneyType, page) {
    return BASE_URL + "c=108&mt=" + moneyType + "&p=" + page + "&at=" + accessTokenUrl;
}
var urlLichSuCaoThap = function (page, nickname, moneyType) {
    return BASE_URL + "c=107&p=" + page + "&nn=" + nickname + "&mt=" + moneyType + "&at=" + accessTokenUrl;
}
var urlEventCaoThapMonth = function (type, month) {
    return BASE_URL + "c=109&type=" + type + "&month=" + month + "&at=" + accessTokenUrl;
}
var urlEventCaoThapDate = function (type, date) {
    return BASE_URL + "c=109&type=" + type + "&date=" + date + "&at=" + accessTokenUrl;
}

//Bầu cua

var urlBCTopUser = function (moneyType) {
    return BASE_URL + "c=120&mt=" + moneyType + "&at=" + accessTokenUrl;
}

var urlBCLichSuGiaoDich = function (username, page, moneyType) {
    return BASE_URL + "c=121&un=" + username + "&p=" + page + "&mt=" + moneyType + "&at=" + accessTokenUrl;
}
var urlBCToiChonCa = function (date) {
    return BASE_URL + "c=122&date=" + date + "&at=" + accessTokenUrl;
}

//PokeMon

var urlPKMLichSuGiaoDich = function (un, p, mt) {
    return BASE_URL + "c=134&un=" + un + "&p=" + p + "&mt=" + mt + "&at=" + accessTokenUrl;
}

var urlPKMTopUser = function (p, mt) {
    return BASE_URL + "c=135&p=" + p + "&mt=" + mt + "&at=" + accessTokenUrl;
}

var urlLoginGGFB = function (s, at, platform) {
    if (lobby.facebook_canvas == true)
        return BASE_URL + "c=3&s=" + s + "&at=" + at + "&pf=" + platform + "&utm_source=Appfb&utm_medium=Appfb&utm_term=Appfb&utm_content=Appfb&utm_campaign=Appfb";
    else if (cc.sys.os == cc.sys.OS_IOS && ConnectNative.versionCode() == "1.3.5")
        return BASE_URL + "c=3&s=" + s + "&at=" + at + "&pf=" + platform + "&utm_source=IOS&utm_medium=IOS&utm_term=IOS&utm_content=IOS&utm_campaign=IOS";
    else
        return BASE_URL + "c=3&s=" + s + "&at=" + at + "&pf=" + platform;

}

var urlGetCaptcha = function () {
    return BASE_URL + "c=124" + "&at=" + accessTokenUrl;

}
var urlUpdateAvatar = function (nickname, vlAvatar) {
    return BASE_URL + "c=125&nn=" + nickname + "&avatar=" + vlAvatar + "&at=" + accessTokenUrl;

}
// change get vippoint
var urlGetVipPoint = function (nickname) {
    return BASE_URL + "c=126&nn=" + nickname + "&at=" + accessTokenUrl;

}
// send information forget password
var urlForgetPassword = function (username, captcha, captchaId) {
    return BASE_URL + "c=127&un=" + username + "&cp=" + captcha + "&cid=" + captchaId + "&at=" + accessTokenUrl;

}
// send otp forget pass
var urlOTP_ForgetPassword = function (username, otp, type) {
    return BASE_URL + "c=128&un=" + username + "&otp=" + otp + "&type=" + type + "&at=" + accessTokenUrl;

}

// send email forget pass
var urlSendEmailForgetPassword = function (username, email) {
    return BASE_URL + "c=133&un=" + username + "&email=" + email + "&at=" + accessTokenUrl;

}

//login with otp
var urlLoginWithOtp = function (username, password, otp, type, platform) {
    return BASE_URL + "c=4&un=" + username + "&pw=" + password + "&otp=" + otp + "&type=" + type + "&pf=" + platform + "&at=" + accessTokenUrl;

}
//login FB GG with otp
var urlLoginFB_GG_Otp = function (s, at, otp, type, platform) {
    return BASE_URL + "c=4&s=" + s + "&at=" + at + "&otp=" + otp + "&type=" + type + "&pf=" + platform;

}
//getConfig Billing
var urlGetConfigBilling = function () {
    return BASE_URL + "c=130" + "&at=" + accessTokenUrl;

}

//getconfig Event Vippoint
var urlGetEventVippoint = function (nickname) {
    return BASE_URL + "c=501&nn=" + nickname + "&at=" + accessTokenUrl;

}
var urlBXH_Intel_Vippoint = function (nickname) {
    return BASE_URL + "c=502&nn=" + nickname + "&at=" + accessTokenUrl;

}
var urlBXH_Strong_Vippoint = function (nickname) {
    return BASE_URL + "c=503&nn=" + nickname + "&at=" + accessTokenUrl;

}

// VQ VIP
var urlLichSuVQVIP = function (nickname, page) {
    return BASE_URL + "c=12&p=" + page + "&nn=" + nickname + "&at=" + accessTokenUrl;
}
// api nap
var urlnapTheDienThoai = function(capcha, capchaId, serial, pin, provider, nickname, platform){
    return BASE_URL + "c=701&cp="+capcha+"&cid="+capchaId+ "&sr=" + serial + "&pn=" + pin + "&pv=" + provider + "&nn=" + nickname + "&pf=" + platform;
}

var urlnapVinCard = function(capcha, capchaId, serial, pin, nickname, platform){
    return BASE_URL + "c=702&cp="+capcha+"&cid="+capchaId+ "&sr=" + serial + "&pn=" + pin + "&nn=" + nickname + "&pf=" + platform;
}

var urlnapMegaCard = function(capcha, capchaId, serial, pin, nickname, platform){
    return BASE_URL + "c=703&cp="+capcha+"&cid="+capchaId+ "&sr=" + serial + "&pn=" + pin + "&nn=" + nickname + "&pf=" + platform;
}

var urlnapVcoin = function(capcha, capchaId, serial, pin, nickname, platform){
    return BASE_URL + "c=704&cp="+capcha+"&cid="+capchaId+ "&sr=" + serial + "&pn=" + pin + "&nn=" + nickname + "&pf=" + platform;
}

var urlnapQuaNganHang = function(nickname, money, bank, ip, platform){
    return BASE_URL + "c=705&nn="+nickname+"&mn="+money+ "&b=" + bank + "&ip=" + ip + "&pf=" + platform;
}

var urlgetOtp = function(username, mobile, type){
    return BASE_URL + "c=16&un="+username+"&m="+mobile+ "&type=" + type;
}

var urlchangePassword = function(username, oldpass, newpass){
    return BASE_URL + "c=17&un="+username+"&op="+oldpass+ "&np=" + newpass;
}