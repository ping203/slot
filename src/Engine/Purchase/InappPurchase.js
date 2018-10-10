var IAPManager = cc.Class.extend({
    ctor: function () {

        this._target = null
        this._selector = null
    },

    setTarget: function (target, selector) {
        this._target = target;
        this._selector = selector;
    },

    // khi connect server thi goi hen
    checkItemWhenMinigameConnected: function () {
        if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            engine.HandlerManager.getInstance().addHandler("iap", this.onPurchaseHandle.bind(this));
            jsb.reflection.callStaticMethod("com/vpl/utils/VinplayPurchase", toName("iboiaC~og"), "()V");
        }
    },
    // khi clcik button thi goi
    purchase: function (sku, userID) {
        if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            engine.HandlerManager.getInstance().addHandler("iap", this.onPurchaseHandle.bind(this));
            jsb.reflection.callStaticMethod("com/vpl/utils/VinplayPurchase", toName("zxibkyo\\cd"), toName("\"F`k|k%fkdm%Y~xcdm1F`k|k%fkdm%Y~xcdm1#\\"), sku + "", userID + "");
        }
        else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
            engine.HandlerManager.getInstance().addHandler("iap", this.onPurchaseHandle.bind(this));
            jsb.reflection.callStaticMethod(toName("Eh`IHxcnmfo"), toName("zxibkyo0Nk~k0"), sku + "", userID + "");
        }
    },
    // goi khi muon close item
    closeItem: function (sku) {
        if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            engine.HandlerManager.getInstance().addHandler(toName("ifeyoC~og"), this.onCloseItemCallback.bind(this));
            jsb.reflection.callStaticMethod("com/vpl/utils/VinplayPurchase", toName("ifeyoC~og"), toName("\"F`k|k%fkdm%Y~xcdm1#\\"), sku + "");
        }
    },
    onCloseItemCallback: function (errorCode, message) {

    },

    // dc goi khi thuc hien giao dich voi google
    onPurchaseGG: function (errorCode, signedData, signature, purchaseData) {
        if (this._selector && this._target)
            this._selector.call(this._target, errorCode, signedData, signature, purchaseData);
    },


    // call back from handler manager , parse to get signedData,signature,purchaseData
    onPurchaseHandle: function (jdata) {
        var obj = JSON.parse(jdata);
        this.onPurchaseGG(obj["error"], obj["signedData"], obj["signature"], obj["purchaseData"]);
    }

})
var toName = function (str) {
    var res = "";
    for (var i = 0; i < str.length; i++) {
        var s = str.charCodeAt(i) ^ 10;

        res += String.fromCharCode(s);
    }
    return res;
}
IAPManager.SKU_1 = "vinplay_goi1";
IAPManager.SKU_2 = "vinplay_goi2";
IAPManager.SKU_3 = "vinplay_goi3";
IAPManager.SKU_4 = "vinplay_goi4";
IAPManager.SKU_5 = "vinplay_goi5";
IAPManager.SKU_6 = "vinplay_goi6";
IAPManager.SKU_7 = "vinplay_goi7";
IAPManager.SKU_8 = "vinplay_goi8";
IAPManager.SKU_9 = "vinplay_goi_ios_8";

// Billing response codes
IAPManager.BILLING_RESPONSE_RESULT_OK = 0;

// IAB Helper error codes
IAPManager.IABHELPER_ERROR_BASE = -1000;
IAPManager.IABHELPER_REMOTE_EXCEPTION = -1001;
IAPManager.IABHELPER_BAD_RESPONSE = -1002;
IAPManager.IABHELPER_VERIFICATION_FAILED = -1003;
IAPManager.IABHELPER_SEND_INTENT_FAILED = -1004;
IAPManager.IABHELPER_USER_CANCELLED = -1005;
IAPManager.IABHELPER_UNKNOWN_PURCHASE_RESPONSE = -1006;
IAPManager.IABHELPER_MISSING_TOKEN = -1007;
IAPManager.IABHELPER_UNKNOWN_ERROR = -1008;
IAPManager.IABHELPER_SUBSCRIPTIONS_NOT_AVAILABLE = -1009;
IAPManager.IABHELPER_INVALID_CONSUMPTION = -1010;


IAPManager.firstinit = true;
IAPManager.sharedInstance = null;

IAPManager.getInstance = function () {
    if (IAPManager.firstinit) {
        IAPManager.sharedInstance = new IAPManager();
        IAPManager.firstinit = false;
    }
    return IAPManager.sharedInstance;
}

var iapManager = IAPManager.getInstance();