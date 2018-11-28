var MiniPoker = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.pokerlayout = null;
        this.btncheckauto = null;
        this.tran_pokerlayout = null;
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

        this.addLayout(this.pokerlayout, "tran_pokerlayout", cc.p(599, 310), res_MinigamePoker + "/in_bg.png", cc.size(427, 228), true);

        this.tran_pokerlayout.setClippingEnabled(true);
        this.addButton(this.pokerlayout, "btnmoney1", MiniPoker.MONEY100, cc.p(327, 406), true, res_MinigamePoker + "/active.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnmoney2", MiniPoker.MONEY1K, cc.p(327, 325), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnmoney3", MiniPoker.MONEY10K, cc.p(327, 241), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncheckauto", MiniPoker.CHECK_AUTO, cc.p(858, 315), true, res_MinigamePoker + "/check.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncangiat", MiniPoker.BTN_CANGAT, cc.p(951, 369), false, res_MinigamePoker + "/cangiat.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnlichsu", MiniPoker.LICHSU, cc.p(505, 134), true, res_MinigamePoker + "/history.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncup", MiniPoker.CUP, cc.p(582, 134), true, res_MinigamePoker + "/cup.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnhelp", MiniPoker.HELP, cc.p(660, 134), true, res_MinigamePoker + "/help.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.tran_pokerlayout.setContentSize(427, 228);

        var arrP = [
            {num: "A", type: "heart"},
            {num: "2", type: "diamond"},
            {num: "3", type: "club"},
            {num: "4", type: "spade"},
            {num: "5", type: "heart"},
            {num: "6", type: "diamond"},
            {num: "7", type: "club"},
            {num: "8", type: "spade"},
            {num: "9", type: "heart"},
            {num: "10", type: "diamond"},
            {num: "J", type: "club"},
            {num: "Q", type: "spade"},
            {num: "K", type: "heart"}
        ];
        var dsCotBai = [
            {name: "cot1"},
            {name: "cot2"},
            {name: "cot3"},
            {name: "cot4"},
            {name: "cot5"},
        ];
        var extend = 10;
        for (let i = 0; i < dsCotBai.length; i++){
            for (let j = 0; j < arrP.length; j++) {

                let item = new ccui.Layout();
                item.setAnchorPoint(0.5, 0.5);
                item.setContentSize(78, 105);
                item.setTouchEnabled(true);
                item.setCascadeOpacityEnabled(true);
                item.setPosition( i > 0 ? extend + 39 + i * 82 : extend + 41 , (j * 106));
                if (arrP[j].type === "heart")
                    item.setBackGroundImage(res_MinigamePoker + "/co.png", ccui.Widget.LOCAL_TEXTURE);
                if (arrP[j].type === "diamond")
                    item.setBackGroundImage(res_MinigamePoker + "/ro.png", ccui.Widget.LOCAL_TEXTURE);
                if (arrP[j].type === "club")
                    item.setBackGroundImage(res_MinigamePoker + "/tep.png", ccui.Widget.LOCAL_TEXTURE);
                if (arrP[j].type === "spade")
                    item.setBackGroundImage(res_MinigamePoker + "/bich.png", ccui.Widget.LOCAL_TEXTURE);
                let text = new ccui.Text(arrP[j].num, RobotoRegular.fontName, 20);
                text.setPosition(10, 90);
                text.setAnchorPoint(0.5, 0.5);
                text.setTextColor("#000");
                item.addChild(text);
                this.tran_pokerlayout.addChild(item);
            }
        }

    },

    initLaBai: function(){

    },
    //type: heart, diamond, club, spade = co, ro, tep, bich
    onButtonRelease: function (button, id) {
        switch (id) {
            case MiniPoker.BTN_CANGAT:
                this.play();
                break;
        }
    },
    play: function () {
        let dsLaBai = this.tran_pokerlayout.getChildren();
        for (let i = 0; i < dsLaBai.length; i++) {
            let actionMove = new cc.MoveBy(6, cc.p(0, -(106* (dsLaBai.length - 3))));
            let seq = new cc.Sequence(actionMove);
            dsLaBai[i].runAction(seq);
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