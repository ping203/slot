var MiniPoker = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.pokerlayout = null;
        this.btncheckauto = null;
        this.tran_pokerlayout = null;
        this.dsLaBai = null;
    },
    customizeGUI: function () {
        this.initUI();
    },
    onEnter: function () {
        this._super();
    },
    initUI: function () {
        this.addLayout(this, "pokerlayout", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addImage(this.pokerlayout, "bg", cc.p(589, 328), res_MinigamePoker + "/bg.png", cc.size(714, 404));
        this.addImage(this.pokerlayout, "title", cc.p(571, 558), res_MinigamePoker + "/title.png", cc.size(316, 105));
        this.addImage(this.pokerlayout, "bgcoin", cc.p(579, 464), res_MinigamePoker + "/pot.png", cc.size(278, 62));

        this.addImage(this.pokerlayout, "in_bg", cc.p(599, 310), res_MinigamePoker + "/in_bg.png", cc.size(427, 228));
        this.addLayout(this.pokerlayout, "tran_pokerlayout", cc.p(599, 312), res_MinigamePoker + "/in_bg.png", cc.size(427, 200), true);
        this.tran_pokerlayout.setClippingEnabled(true);

        this.addButton(this.pokerlayout, "btnmoney1", MiniPoker.MONEY100, cc.p(327, 406), true, res_MinigamePoker + "/active.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnmoney2", MiniPoker.MONEY1K, cc.p(327, 325), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnmoney3", MiniPoker.MONEY10K, cc.p(327, 241), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncheckauto", MiniPoker.CHECK_AUTO, cc.p(858, 315), true, res_MinigamePoker + "/check.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncangiat", MiniPoker.BTN_CANGAT, cc.p(951, 369), false, res_MinigamePoker + "/cangiat.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnlichsu", MiniPoker.LICHSU, cc.p(505, 134), true, res_MinigamePoker + "/history.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncup", MiniPoker.CUP, cc.p(582, 134), true, res_MinigamePoker + "/cup.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnhelp", MiniPoker.HELP, cc.p(660, 134), true, res_MinigamePoker + "/help.png", null, ccui.Widget.LOCAL_TEXTURE);

        // this.tran_pokerlayout.setContentSize(427, 228);
        GuiUtil.setBackGroundColor(this.tran_pokerlayout, cc.color.GREEN, 200);
        var sizeP = cc.size(78, 105);

        this.dsLaBai = [
            {num: "A", type: "co"},
            {num: "2", type: "ro"},
            {num: "3", type: "tep"},
            {num: "4", type: "bich"},
            {num: "5", type: "co"},
            {num: "6", type: "ro"},
            {num: "7", type: "tep"},
            {num: "8", type: "bich"},
            {num: "9", type: "co"},
            {num: "10", type: "ro"},
            {num: "j", type: "tep"},
            {num: "q", type: "bich"},
            {num: "k", type: "co"}
        ];
        for (let i = 0; i < 5; i++) {
            let layout = new ccui.Layout();
            layout.setAnchorPoint(0.5, 0.5);
            layout.setTouchEnabled(true);
            layout.setCascadeOpacityEnabled(true);
            layout.setTag(i);
            switch (i) {
                case 0:
                    layout.setPosition(45, 0);
                    break;
                case 1:
                    layout.setPosition(128, 0);
                    break;
                case 2:
                    layout.setPosition(213, 0);
                    break;
                case 3:
                    layout.setPosition(295, 0);
                    break;
                case 4:
                    layout.setPosition(380, 0);
                    break;
            }
            this.tran_pokerlayout.addChild(layout);
            for (let j = 0; j < this.dsLaBai.length; j++) {

                let item = new ccui.Layout();
                let text = new ccui.Text(this.dsLaBai[j].num, fontRobotoBlack.fontName, 24);

                item.setAnchorPoint(0.5, 0.5);
                item.setContentSize(sizeP);
                item.setTouchEnabled(true);
                item.setCascadeOpacityEnabled(true);
                item.setPosition(0, (j * 105));

                if (this.dsLaBai[j].num === "j" || this.dsLaBai[j].num === "q" || this.dsLaBai[j].num === "k") {
                    if (this.dsLaBai[j].type === "co")
                        item.setBackGroundImage(res_MinigamePoker + "/"+ this.dsLaBai[j].num +"co.png", ccui.Widget.LOCAL_TEXTURE);
                    else if (this.dsLaBai[j].type === "ro")
                        item.setBackGroundImage(res_MinigamePoker + "/"+ this.dsLaBai[j].num +"ro.png", ccui.Widget.LOCAL_TEXTURE);
                    else if (this.dsLaBai[j].type === "tep")
                        item.setBackGroundImage(res_MinigamePoker + "/"+ this.dsLaBai[j].num +"tep.png", ccui.Widget.LOCAL_TEXTURE);
                    else if (this.dsLaBai[j].type === "bich")
                        item.setBackGroundImage(res_MinigamePoker + "/"+ this.dsLaBai[j].num +"bich.png", ccui.Widget.LOCAL_TEXTURE);
                }else {
                    if (this.dsLaBai[j].type === "co")
                        item.setBackGroundImage(res_MinigamePoker + "/co.png", ccui.Widget.LOCAL_TEXTURE);
                    if (this.dsLaBai[j].type === "ro")
                        item.setBackGroundImage(res_MinigamePoker + "/ro.png", ccui.Widget.LOCAL_TEXTURE);
                    if (this.dsLaBai[j].type === "tep")
                        item.setBackGroundImage(res_MinigamePoker + "/tep.png", ccui.Widget.LOCAL_TEXTURE);
                    if (this.dsLaBai[j].type === "bich")
                        item.setBackGroundImage(res_MinigamePoker + "/bich.png", ccui.Widget.LOCAL_TEXTURE);
                    if (this.dsLaBai[j].type === "co" || this.dsLaBai[j].type === "ro")
                        text.setTextColor(cc.color("#830000"));
                    else
                        text.setTextColor(cc.color.BLACK);
                    text.setPosition(17, 86);
                    text.setAnchorPoint(0.5, 0.5);
                    item.addChild(text);
                }
                layout.addChild(item);
            }
        }

        this.addImage(this.tran_pokerlayout, null, cc.p(213, 198), res_MinigamePoker + "/fade1.png", cc.size(421, 56));
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 30), res_MinigamePoker + "/fade2.png", cc.size(421, 56));
    },
    //type: heart, diamond, club, spade = co, ro, tep, bich
    onButtonRelease: function (button, id) {
        var that = this;
        switch (id) {
            case MiniPoker.BTN_CANGAT:
                var timeSpin = 0;
                for (let i = 0; i < 5; i++) {
                    setTimeout(function () {
                        that.play(that.tran_pokerlayout.getChildByTag(i));
                    }, timeSpin);
                    timeSpin += 200;
                }
                break;
        }
    },
    play: function (parent) {
        let arr = parent.getChildren();
        console.log(arr.length);
        for (let i = 0; i < arr.length; i++) {
            arr[i].runAction(new cc.MoveBy(2, cc.p(0, -105 * (arr.length - 3))).easing(cc.easeBackIn()));
        }
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
        console.log(target.getPosition());
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