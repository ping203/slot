var Poker = cc.Layer.extend({
    ctor: function (parent, num, type, size, position) {
        this._super();
        this.parent = parent;
        this.num = num;
        this.type = type;
        this.size = size;
        this.layout = null;
        this.text = null;
        this.imgtypePokerLarge = null;
        this.imgtypePokerSmall = null;

        this.layout = new ccui.Layout();
        this.text = new ccui.Text(this.num.toUpperCase(), fontRobotoBlack.fontName, 24);
        this.imgtypePokerSmall = new cc.Sprite();
        this.imgtypePokerLarge = new cc.Sprite();

        if (this.num === "j" || this.num === "q" || this.num === "k") {
            this.layout.setBackGroundImage(res_MinigamePoker + "/" + this.num + ".png", ccui.Widget.LOCAL_TEXTURE);
        }
        if (this.num !== "j" && this.num !== "q" && this.num !== "k") {
            this.layout.setBackGroundImage(res_MinigamePoker + "/bgpoker.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "co") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chatco.png");
            }
            if (this.type === "ro") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chatro.png");
            }
            if (this.type === "tep") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chattep.png");
            }
            if (this.type === "bich") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chatbich.png");
            }
            this.imgtypePokerLarge.setPosition(45, 35);
        }

        if (this.type === "co") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chatco.png");
        }
        if (this.type === "ro") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chatro.png");
        }
        if (this.type === "tep") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chattep.png");
        }
        if (this.type === "bich") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chatbich.png");
        }
        this.imgtypePokerSmall.setScale(0.35, 0.35);
        this.imgtypePokerSmall.setPosition(16, 68);

        if (this.type === "co" || this.type === "ro")
            this.text.setColor(cc.color("#AA0000"));
        if (this.type === "tep" || this.type === "bich")
            this.text.setColor(cc.color.BLACK);
        this.text.setPosition(17, 86);
        this.text.setAnchorPoint(0.5, 0.5);
        this.layout.addChild(this.text);
        this.layout.addChild(this.imgtypePokerLarge);
        this.layout.addChild(this.imgtypePokerSmall);

        this.layout.setAnchorPoint(0.5, 0.5);
        this.layout.setContentSize(size);
        this.layout.setTouchEnabled(true);
        this.layout.setCascadeOpacityEnabled(true);
        this.layout.setPosition(position);

        this.parent.addChild(this.layout);
    },
    onEnter: function () {
        this._super();
    },
    updatePoker: function (num, type) {
        this.num = num;
        this.type = type;
        this.text.setString(num.toUpperCase());
        if (this.type === "co" || this.type === "ro")
            this.text.setColor(cc.color("#AA0000"));
        if (this.type === "tep" || this.type === "bich")
            this.text.setColor(cc.color("#000000"));

        if (this.num === "j" || this.num === "q" || this.num === "k") {
            this.layout.setBackGroundImage(res_MinigamePoker + "/" + this.num + ".png", ccui.Widget.LOCAL_TEXTURE);
            this.imgtypePokerLarge.visible = false;
        }
        if (this.num !== "j" && this.num !== "q" && this.num !== "k") {
            this.imgtypePokerLarge.visible = true;
            this.layout.setBackGroundImage(res_MinigamePoker + "/bgpoker.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "co") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chatco.png");
            }
            if (this.type === "ro") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chatro.png");
            }
            if (this.type === "tep") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chattep.png");
            }
            if (this.type === "bich") {
                this.imgtypePokerLarge.setTexture(res_MinigamePoker + "/chatbich.png");
            }
            this.imgtypePokerLarge.setPosition(45, 35);
        }

        if (this.type === "co") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chatco.png");
        }
        if (this.type === "ro") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chatro.png");
        }
        if (this.type === "tep") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chattep.png");
        }
        if (this.type === "bich") {
            this.imgtypePokerSmall.setTexture(res_MinigamePoker + "/chatbich.png");
        }
    }
});