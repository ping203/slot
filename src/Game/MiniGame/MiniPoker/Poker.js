var Poker = cc.Layer.extend({
   ctor: function (parent, num, type, size) {

       this.num = num;
       this.type = type;
       this.image = null;
       this.size = size;

       let item = new ccui.Layout();
       let text = new ccui.Text(this.num, fontRobotoBlack.fontName, 24);
       if (this.num === "j" || this.num === "q" || this.num === "k") {
           if (this.type === "co")
               this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"co.png", ccui.Widget.LOCAL_TEXTURE);
           else if (this.type === "ro")
               this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"ro.png", ccui.Widget.LOCAL_TEXTURE);
           else if (this.type === "tep")
               this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"tep.png", ccui.Widget.LOCAL_TEXTURE);
           else if (this.type === "bich")
               this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"bich.png", ccui.Widget.LOCAL_TEXTURE);
       }else {
           if (this.type === "co")
               this.image.setBackGroundImage(res_MinigamePoker + "/co.png", ccui.Widget.LOCAL_TEXTURE);
           if (this.type === "ro")
               this.image.setBackGroundImage(res_MinigamePoker + "/ro.png", ccui.Widget.LOCAL_TEXTURE);
           if (this.type === "tep")
               this.image.setBackGroundImage(res_MinigamePoker + "/tep.png", ccui.Widget.LOCAL_TEXTURE);
           if (this.type === "bich")
               this.image.setBackGroundImage(res_MinigamePoker + "/bich.png", ccui.Widget.LOCAL_TEXTURE);
           if (this.type === "co" || this.type === "ro")
               text.setTextColor(cc.color("#830000"));
           else
               text.setTextColor(cc.color.BLACK);
       }
       item.setAnchorPoint(0.5, 0.5);
       item.setContentSize(size);
       item.setTouchEnabled(true);
       item.setCascadeOpacityEnabled(true);
       item.setPosition(0, (j * 105));
       text.setPosition(17, 86);
       text.setAnchorPoint(0.5, 0.5);
       item.addChild(text);
       this.addChild(item);
   },
    updatePoker: function (num, type) {
        this.num = num;
        this.type = type;
        if (this.num === "j" || this.num === "q" || this.num === "k") {
            if (this.type === "co")
                this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"co.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "ro")
                this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"ro.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "tep")
                this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"tep.png", ccui.Widget.LOCAL_TEXTURE);
            else if (this.type === "bich")
                this.image.setBackGroundImage(res_MinigamePoker + "/"+ this.num +"bich.png", ccui.Widget.LOCAL_TEXTURE);
        }else {
            if (this.type === "co")
                this.image.setBackGroundImage(res_MinigamePoker + "/co.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "ro")
                this.image.setBackGroundImage(res_MinigamePoker + "/ro.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "tep")
                this.image.setBackGroundImage(res_MinigamePoker + "/tep.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "bich")
                this.image.setBackGroundImage(res_MinigamePoker + "/bich.png", ccui.Widget.LOCAL_TEXTURE);
            if (this.type === "co" || this.type === "ro")
                text.setTextColor(cc.color("#830000"));
            else
                text.setTextColor(cc.color.BLACK);
        }
    }
});