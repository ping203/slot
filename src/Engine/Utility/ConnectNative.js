/**
 * Created by Admin on 4/12/2017.
 */

var ConnectNative = function () {
}

ConnectNative.VIETNAM_CODE = 452;
ConnectNative.VIETTEL = "04";
ConnectNative.MOBIFONE = "01";
ConnectNative.VINAPHONE = "02";
ConnectNative.VIETNAMMOBLE = "05";
ConnectNative.BEELINE = "07";
ConnectNative.countryCode = function () {
    var ret = "";

    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", toName("mo~Ied~xsIeno"), toName("\"#F`k|k%fkdm%Y~xcdm1"));
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~\\oxycedY~xcdm"));
    return ret;
}

ConnectNative.networkCode = function () {
    var ret = "";

    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", toName("mo~Do~}exaIeno"), toName("\"#F`k|k%fkdm%Y~xcdm1"));
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~Do~}exaIeno"));
    return ret;
}

ConnectNative.versionCode = function () {
    var ret = "1";
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", "getVersionCode", toName("\"#F`k|k%fkdm%Y~xcdm1"));
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~Kzz\\oxyced"));
    return ret;
}

ConnectNative.openWebView = function (url, https) {
    cc.log("ConnectNative.openWebView " + url);
    if (!https) {
        url = url.replace("https", "http");
    }

    cc.log(url);
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)
        jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", toName("ezod_XF"), toName("\"F`k|k%fkdm%Y~xcdm1#\\"), url);
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("ezod_XF0"), url);
    }

    if (!cc.sys.isNative) {
        window.open(url, "_blank");
    }
}

ConnectNative.sendSMS = function (phone, content) {
    cc.log("ConnectNative.sendSMS : " + phone + "/" + content);

    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", toName("yodnGoyykmo"), toName("\"F`k|k%fkdm%Y~xcdm1F`k|k%fkdm%Y~xcdm1#\\"), phone, content);
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("yodnGoyykmo0goyykmo0"), phone + "", content + "");
    }
}
ConnectNative.GetDeviceInfo = function () {
    var ret = "";
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        ret = jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", "GetDeviceInfo", toName("\"#F`k|k%fkdm%Y~xcdm1"));
    }
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~No|cioCdle"));
    return ret;
}
ConnectNative.GetDeviceID = function () {
    var ret = "";
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        ret = jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", "GetDeviceID", toName("\"#F`k|k%fkdm%Y~xcdm1"));
    }
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~CGOC"));
    return ret;
}
ConnectNative.GetVersionOS = function () {
    var ret = "";
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        ret = jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", "GetVersionOS", toName("\"#F`k|k%fkdm%Y~xcdm1"));
    }
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~Ey\\oxyced"));
    return ret;
}
ConnectNative.GetDeviceModel = function () {
    var ret = "";
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        ret = jsb.reflection.callStaticMethod("com/vpl/utils/ZPJNI", "GetDeviceModel", toName("\"#F`k|k%fkdm%Y~xcdm1"));
    }
    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)
        ret = jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("mo~No|cioGenof"));
    return ret;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Created by Admin on 12/10/2016.
 */



/*--------------------------------------------------------------------------------------------------------------------------------------------*/

















