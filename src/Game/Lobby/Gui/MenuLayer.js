var MenuLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.lvMenuGameBai = null;
        this.initMenuGame();
    },
    customizeGUI: function () {
        this.addLayout(this, "menuLayout", cc.p(640, 360), null, cc.size(1280, 720), false);

        this.addButton(this.menuLayout, "effect", 0, cc.p(146, 402), false, res_Lobby + "/menu/effect.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.menuLayout, "tournament", 0, cc.p(152, 378), false, res_Lobby + "/menu/tournament.png", null, ccui.Widget.LOCAL_TEXTURE);
        // this.effectTour();
    },
    onEnter: function () {
        this._super();
    },
    initMenuGame: function () {
        this.lvMenuGameBai = new ccui.ListView();
        this.lvMenuGameBai.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this.lvMenuGameBai.setTouchEnabled(true);
        this.lvMenuGameBai.setBounceEnabled(true);
        this.lvMenuGameBai.setContentSize(cc.size(972, 436));
        this.lvMenuGameBai.setAnchorPoint(0.5, 0.5);
        this.lvMenuGameBai.setPosition(cc.p(797, 378));
        this.addChild(this.lvMenuGameBai);

        listGameName = ["vuongtu", "bienxanh", "como"];

        for (var i = 0; i < listGameName.length; i++) {
            var button = new ccui.Button();
            button.setTag(i);
            button.setTouchEnabled(true);
            button.loadTextures(res_Lobby + "/menu/" + listGameName[i] + ".png", null, null, ccui.Widget.LOCAL_TEXTURE);
            this.lvMenuGameBai.pushBackCustomItem(button);
        }
        var minislot = new ccui.Layout();
        minislot.setAnchorPoint(0.5, 0.5);
        minislot.setContentSize(cc.size(224, 436));
        minislot.setTouchEnabled(true);
        minislot.setCascadeOpacityEnabled(true);
        minislot.setBackGroundImage(null, ccui.Widget.PLIST_TEXTURE);

        this.addButton(minislot, "minislot", 0, cc.p(112, 320), true, res_Lobby + "/menu/minislot.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(minislot, "taixiu", 0, cc.p(112, 100), true, res_Lobby + "/menu/taixiu.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.lvMenuGameBai.pushBackCustomItem(minislot);
        return true;
    },
    addButton: function (parent, name, tag, position, action, imageNol, imageS, texType) {
        //texType = texType || ccui.Widget.LOCAL_TEXTURE;
        if (action === undefined)
            action = true;
        if (tag) {
            tag = parseInt(tag);
        }
        var texType = ccui.Widget.LOCAL_TEXTURE;
        this[name] = new ccui.Button();
        if (imageNol && cc.spriteFrameCache.getSpriteFrame(imageNol)) {
            texType = ccui.Widget.PLIST_TEXTURE;
        }

        imageS = imageS || imageNol;
        if (imageNol != null) {
            this[name].loadTextures(imageNol, imageS, imageS, texType);
        }
        this[name].setPressedActionEnabled(action);
        this[name].setTag(tag);
        this[name].addTouchEventListener(this.onTouchEventHandler, this);
        this[name].setPosition(position);
        this[name].setTitleFontName(fontRobotoBold.fontName);
        this[name].setTitleFontSize(30);
        this[name].setTitleColor(cc.color.WHITE);
        if (cc.sys.isNative) {
            this[name].setTitleFontName("res/Font/" + this[name].getTitleFontName() + ".ttf");
        }
        parent.addChild(this[name]);
    },
    effectTour: function () {
        let rotateAction = new cc.RotateBy(1, 360);
        // let moveLeft = new cc.MoveBy(1,-50,0);
        let action = new cc.RepeatForever(new cc.Sequence(rotateAction));
        this.effect.runAction(action);
    }
});