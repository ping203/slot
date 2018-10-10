var LOADING_TAG = 21112;

var SceneMgr = cc.Class.extend({
    ctor: function(){

    },

    getRunningScene: function(){
        var currentScene = cc.director.getRunningScene();
        if(currentScene instanceof cc.TransitionScene)
        {
            currentScene = cc.director.getRunningScene().getInScene();
        }
        return currentScene;
    },

    replaceWithScene: function(scene,transition){
        if(!transition)
        {
            cc.director.runScene(new cc.TransitionFade(.35,scene));
        }
        else
        {
            cc.director.runScene(transition);
        }
        //gameSound.screenAppear();
    },

    showYesNoDialog: function(title,message,target,selector,parent){
        this.dialog = new Dialog();
        if(parent)
        {
            parent.addChild(this.dialog);
        }
        else
            this.getRunningScene().getMainLayer().addChild(this.dialog);
        this.dialog.setLocalZOrder(Dialog.ZODER);
        this.dialog.setTag(Dialog.TAG);
        this.dialog.set(title,message,target,selector);

        return this.dialog;
    },

    addLoading: function(text,fog){
        // cc.log("addLoading 0");
        var loading = MainContent.getChildByTag(parseInt(parseInt(LOADING_TAG)));
        // cc.log("addLoading 1");

        //if(loading)
        //{
        //    loading.stopAllActions();
        //    loading.removeFromParent();
        //}

        if(this.loading){
            this.loading.stopAllActions();
            this.loading.removeFromParent();
            // cc.log("addLoading 3");
        }
        // cc.log("addLoading 4");
        if(fog === "undefined")
            fog = true;
        if(text === "undefined")
            text = "Vui l�ng ch? !!!";
        var size = MainContent.getContentSize();
        // cc.log("addLoading 5");
        var loading = new Loading(text,fog,size);
        this.loading = loading;
        loading.setLocalZOrder(10000);
        MainContent.addChild(loading);
        loading.setTag(parseInt(LOADING_TAG));
        // cc.log("addLoading 6");
        return loading;

    },

    clearLoading: function(){
        if(this.loading)
        {
            this.loading.rota1.stopAllActions();
            this.loading.rota2.stopAllActions();
            this.loading.rota3.stopAllActions();
            this.loading.rota4.stopAllActions();
            this.loading.removeFromParent();
            this.loading = null;
        }
    },

    takeScreenShot: function() {
        if(jsb.fileUtils.isFileExist(jsb.fileUtils.getWritablePath() + "screentshot.png"))
        {
            jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath() + "screentshot.png");
        }
        var text = new cc.RenderTexture(cc.winSize.width,cc.winSize.height);
        text.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        text.begin();
        sceneMgr.getRunningScene().visit();
        text.end();

        var ret = text.saveToFile("screentshot.png",1);

        var path = "";
        if(ret)
        {
            gameSound.playChupanh();
            path = jsb.fileUtils.getWritablePath() + "screentshot.png";
        }
        return path;
    },

    updateCurrentGUI: function(data) {
        var gui = this.getRunningScene().getMainLayer();
        gui.onUpdateGUI(data);
    },

    // hungdd's function
    openWithScene : function (layer,callback,direct) {
        var curLayer = null;
        if(direct === undefined)
        {
            direct = false;
        }
        if(this._isWaitingCallBack && !direct)
        {
            curLayer = new window[this._waitingScene];

            this._isWaitingCallBack = false;
            this._waitingScene = "";
        }
        else
        {
            curLayer = layer;
        }

        if(callback !== undefined)
        {
            if(callback != "" || callback != null)
            {
                this._isWaitingCallBack = true;
                this._waitingScene = callback;
            }
        }

        var scene = new BaseScene();
        scene.addChild(curLayer);

        cc.director.runScene(new cc.TransitionFade(BaseLayer.TIME_APPEAR_GUI,scene));
    },

    showOkCancelDialog: function(message,target,selector){
        if(this.dialog != null)
        {
            //this.dialog.removeFromParent();
        }
        this.dialog = new Dialog();
        this.getRunningScene().getMainLayer().addChild(this.dialog);
        this.dialog.setLocalZOrder(Dialog.ZODER);
        this.dialog.setTag(Dialog.TAG);
        this.dialog.setOkCancel(message,target,selector);

    },

    showOKDialog: function(message){
        if(this.dialog != null)
        {
            this.dialog.removeFromParent();
        }
        this.dialog = new Dialog();
        this.getRunningScene().getMainLayer().addChild(this.dialog);
        this.dialog.setLocalZOrder(Dialog.ZODER);
        this.dialog.setTag(Dialog.TAG);
        this.dialog.setOKNotify(message);
    },

    showChangeGoldDialog : function (message,target,selector) {
        if(this.dialog != null)
        {
            //this.dialog.removeFromParent();
        }
        this.dialog = new Dialog();
        this.getRunningScene().getMainLayer().addChild(this.dialog);
        this.dialog.setLocalZOrder(Dialog.ZODER);
        this.dialog.setTag(Dialog.TAG);
        this.dialog.setChangeGold(message,target,selector);
    },

    showAddGDialog : function (message,target,selector) {
        if(this.dialog != null)
        {
            //this.dialog.removeFromParent();
        }
        this.dialog = new Dialog();
        this.getRunningScene().getMainLayer().addChild(this.dialog);
        this.dialog.setLocalZOrder(Dialog.ZODER);
        this.dialog.setTag(Dialog.TAG);
        this.dialog.setAddG(message,target,selector);
    },

    showSupportBean : function (bean, numSupport) {
        var sp = new SupportBeanGUI();
        this.getRunningScene().getMainLayer().addChild(sp,Dialog.SUPPORT_ZODER,Dialog.SUPPORT_TAG);
        sp.showSupportBean(bean,numSupport);
    },

    showSupportStartup : function () {
        var curLayer = this.getRunningScene().getMainLayer();
        // cc.log(curLayer._id);
        if(curLayer instanceof LobbyScene)
        {
            var sp = new SupportBeanGUI();
            curLayer.addChild(sp,Dialog.SUPPORT_ZODER,Dialog.SUPPORT_TAG);
            sp.showSupportStartup();
        }
    },

    checkSupportBean : function (waitSupport) {
        if (gamedata.userData.bean < gamedata.gameConfig.chanelConfig[0].minGold)
        {
            GameClient.getInstance().sendPacket(new CmdSendGetSupportBean());
        }

        if(typeof  waitSupport != 'undefined')
        {
            gamedata.showSupportTime = waitSupport;
        }
    },
    shakeScreen: function(){
        //this.getRunningScene().getMainLayer().runAction(       engine.CCShake.actionWithDuration(.55,12));
        this.getRunningScene().getMainLayer().runAction(cc.show());
    }



});

var Loading = cc.Layer.extend({

    ctor: function (text, fog , size) {
        // cc.log("ctor1");
        this._super();
        this._layerColor = null;
        this._message = "";
        this._fog = true;
        //this.setContentSize(size);
        this.size = size;
        if (text)
            this._message = text;

        if (fog != null) {
            this._fog = fog;
        }
        if (this._fog) {
            this._layerColor = new cc.LayerColor(cc.BLACK);
            this._layerColor.setContentSize(cc.size(1920,1080));
            this._layerColor.setPosition(cc.p(-320,-220));
            this._layerColor.setOpacity(0)
            this._layerColor.runAction(cc.fadeTo(.25, 150));
            this.addChild(this._layerColor);
        }
        // cc.log("ctor2");
    },

    timeout: function (time) {
        //Phu test
        // cc.log("run Phu test timeout");
        //this.runAction(cc.sequence(cc.delayTime(time), cc.hide()));
        //this.runAction(cc.sequence(cc.delayTime(time), cc.removeSelf()));
    },

    onEnter: function () {
        cc.Layer.prototype.onEnter.call(this);

        this.bg_load = new cc.Sprite("res/LoadingUI/bg_load.png");
        this.bg_load.setPosition(cc.p(this.size.width / 2, this.size.height / 2 + 15));
        this.addChild(this.bg_load);

        this.rota1 = new cc.Sprite("res/LoadingUI/rota1.png");
        this.rota1.setPosition(cc.p(this.size.width / 2, this.size.height / 2 + 30));
        this.addChild(this.rota1);

        this.rota2 = new cc.Sprite("res/LoadingUI/rota2.png");
        this.rota2.setPosition(cc.p(this.size.width / 2, this.size.height / 2 + 30));
        this.addChild(this.rota2);

        this.rota3 = new cc.Sprite("res/LoadingUI/rota3.png");
        this.rota3.setPosition(cc.p(this.size.width / 2, this.size.height / 2 + 30));
        this.addChild(this.rota3);

        this.rota4 = new cc.Sprite("res/LoadingUI/rota4.png");
        this.rota4.setPosition(cc.p(this.size.width / 2, this.size.height / 2 + 30));
        this.addChild(this.rota4);

        var R_rota1 = cc.rotateBy(1, 360);
        var action_R_rota1 = R_rota1.easing(cc.easeCircleActionInOut());
        this.rota1.runAction(cc.repeatForever(cc.sequence(action_R_rota1, cc.delayTime(0.2))));

        var R_rota2 = cc.rotateBy(0.8, 360);
        var action_R_rota2 = R_rota2.easing(cc.easeQuinticActionInOut());
        this.rota2.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.15), action_R_rota2)));

        var R_rota3 = cc.rotateBy(0.9, 360);
        var action_R_rota3 = R_rota3.easing(cc.easeCubicActionInOut());
        this.rota3.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.14), action_R_rota3 )));

        var R_rota4 = cc.rotateBy(0.85, 360);
        var action_R_rota4 = R_rota4.easing(cc.easeBounceInOut());
        this.rota4.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.07), action_R_rota4, cc.delayTime(0.05))));

        var scale = cc.director.getWinSize().width / 1280;
        scale = (scale > 1) ? 1 : scale;

        // cc.log("onEnter2");
        this._label = new ccui.Text();
        // cc.log("onEnter2.2");
        this._label.setAnchorPoint(cc.p(0.5, 0.5));
        //this._label.setFontName("res/LoadingUI/fonts/tahoma.ttf");
        this._label.setFontName(fontArial.fontName);
        this._label.setFontSize(23);
        this._label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this._label.setColor(cc.WHITE);
        this._label.setString(this._message);
        this._label.setScale(scale);
        this._label.setPosition(this.size.width / 2, this.size.height / 2 - 105);
        this.addChild(this._label);
        // cc.log("onEnter2");

        if (this._fog) {
            this._listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
            });

            cc.eventManager.addListener(this._listener, this);
        }
        // cc.log("onEnter3");
    },

    remove: function () {
        if (this._layerColor) {
            this._layerColor.runAction(cc.fadeTo(.25, 0));
        }
        this.runAction(cc.sequence(cc.delayTime(.25), cc.removeSelf()));
        //this.runAction(cc.sequence(cc.delayTime(.25), cc.hide()));
    },

    onTouchBegan: function (touch, event) {
        return true;
    },

    onTouchMoved: function (touch, event) {

    },

    onTouchEnded: function (touch, event) {

    }
});

SceneMgr.sharedInstance = null;
SceneMgr.firstInit = true;

SceneMgr.getInstance = function(){
    if(SceneMgr.firstInit)
    {
        SceneMgr.sharedInstance = new SceneMgr();
        SceneMgr.firstInit = false;
    }
    return SceneMgr.sharedInstance;
}

var sceneMgr = SceneMgr.getInstance();
