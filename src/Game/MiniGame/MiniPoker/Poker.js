var Poker = cc.Layer.extend({
    ctor: function (parent, num, type, size, position) {
        this._super();
        this.parent = parent;
        this.num = num;
        this.type = type;
        this.size = size;
        this.item = null;
        this.text = null;

        this.item = new ccui.Layout();
        this.text = new ccui.Text(this.num, fontRobotoBlack.fontName, 24);
        if (this.num === "j" || this.num === "q" || this.num === "k") {
            this.text.setOpacity(0);
            if (this.type === "co")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "co.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "ro")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "ro.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "tep")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "tep.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "bich")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "bich.png", ccui.Widget.LOCAL_TEXTURE);
        } else {
            this.text.setOpacity(255);
            if (this.type === "co")
                this.item.setBackGroundImage(res_MinigamePoker + "/co.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "ro")
                this.item.setBackGroundImage(res_MinigamePoker + "/ro.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "tep")
                this.item.setBackGroundImage(res_MinigamePoker + "/tep.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "bich")
                this.item.setBackGroundImage(res_MinigamePoker + "/bich.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "co" || this.type === "ro")
                this.text.setTextColor(cc.color("#830000"));
            else
                this.text.setTextColor(cc.color.BLACK);
            this.text.setPosition(17, 86);
            this.text.setAnchorPoint(0.5, 0.5);
            this.item.addChild(this.text);
        }
        this.item.setAnchorPoint(0.5, 0.5);
        this.item.setContentSize(size);
        this.item.setTouchEnabled(true);
        this.item.setCascadeOpacityEnabled(true);
        this.item.setPosition(position);

        this.parent.addChild(this.item);
    },
    onEnter: function () {
        this._super();
    },
    updatePoker: function (num, type) {
        this.num = num;
        this.text.setString(num);
        this.type = type;
        if (this.num === "j" || this.num === "q" || this.num === "k") {
            this.text.setOpacity(0);
            if (this.type === "co")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "co.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "ro")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "ro.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "tep")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "tep.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "bich")
                this.item.setBackGroundImage(res_MinigamePoker + "/" + this.num + "bich.png", ccui.Widget.LOCAL_TEXTURE);
        } else {
            this.text.setOpacity(255);
            if (this.type === "co")
                this.item.setBackGroundImage(res_MinigamePoker + "/co.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "ro")
                this.item.setBackGroundImage(res_MinigamePoker + "/ro.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "tep")
                this.item.setBackGroundImage(res_MinigamePoker + "/tep.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "bich")
                this.item.setBackGroundImage(res_MinigamePoker + "/bich.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "co" || this.type === "ro")
                this.text.setTextColor(cc.color("#830000"));
            else
                this.text.setTextColor(cc.color.BLACK);
        }
    }
});