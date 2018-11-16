var MiniPoker = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.pokerlayout = null;
        this.btncheckauto = null;
    },
    customizeGUI: function () {
        this.initUI();
    },
    onEnter: function () {
        this._super();
    },
    initUI: function () {
        this.addLayout(this, "pokerlayout", cc.p(640, 360), null, cc.size(1280, 720), false);
        this.addImage(this, "bg", cc.p(589, 328), res_MinigamePoker + "/bg.png", cc.size(714, 404));
        this.addImage(this, "title", cc.p(571, 558), res_MinigamePoker + "/title.png", cc.size(316, 105));
        this.addImage(this, "bgcoin", cc.p(579, 464), res_MinigamePoker + "/pot.png", cc.size(278, 62));
        this.addImage(this, "bgmain", cc.p(599, 310), res_MinigamePoker + "/in_bg.png", cc.size(427, 228));
        this.addButton(this, "btnmoney1", MiniPoker.MONEY100, cc.p(327, 406), true, res_MinigamePoker + "/active.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this, "btnmoney2", MiniPoker.MONEY1K, cc.p(327, 325), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this, "btnmoney3", MiniPoker.MONEY10K, cc.p(327, 241), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this, "btncheckauto", MiniPoker.CHECK_AUTO, cc.p(858, 315), true, res_MinigamePoker + "/check.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this, "btncangiat", MiniPoker.BTN_CANGAT, cc.p(951, 369), true, res_MinigamePoker + "/cangiat.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this, "btnlichsu", MiniPoker.LICHSU, cc.p(505, 134), true, res_MinigamePoker + "/history.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this, "btncup", MiniPoker.LICHSU, cc.p(582, 134), true, res_MinigamePoker + "/cup.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this, "btnhelp", MiniPoker.LICHSU, cc.p(660, 134), true, res_MinigamePoker + "/help.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.addLayout(this, "xx", cc.p(0, 0), null, cc.size(78, 105), false);
        this.addImage(this, "bglabai", cc.p(0, 0), res_MinigamePoker + "/co.png", cc.size(78, 105));

    },
    //type: heart, diamond, club, spade = co, ro, tep, bich
    initCard: function (parent, name, position, image, num, type) {
        this[name] = new ccui.Layout();
        this[name].setAnchorPoint(0.5, 0.5);
        this[name].setContentSize(78, 105);
        this[name].setTouchEnabled();
        this[name].setCascadeOpacityEnabled(true);
        if(type === "heart"){

        }
        if(type === "diamond"){

        }
        if(type === "club"){

        }
        if(type === "spade"){

        }
        this[name].setBackGroundImage(image, ccui.Widget.LOCAL_TEXTURE);
        this[name].setPosition(position);
        parent.addChild(this[name]);
    }

});
var listener1 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
            target.opacity = 180;
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        //Move the position of current button sprite
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        target.x += delta.x;
        target.y += delta.y;
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        cc.log("sprite onTouchesEnded.. ");
        target.setOpacity(255);
        cc.log(target.getPosition());
        //Reset zOrder and the display sequence will change
        // if (target == sprite2) {
        //     sprite1.setLocalZOrder(100);
        // } else if (target == sprite1) {
        //     sprite1.setLocalZOrder(0);
        // }
    }
});

MiniPoker.MONEY100 = 0;
MiniPoker.MONEY1K = 1;
MiniPoker.MONEY10K = 2;
MiniPoker.CHECK_AUTO = 3;
MiniPoker.LICHSU = 4;
MiniPoker.CUP = 5;
MiniPoker.HELP = 6;
MiniPoker.CANGIAT = 7;