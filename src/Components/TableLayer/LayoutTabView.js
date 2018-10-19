/**
 * Created by PVC on 7/19/2017.
 */
var LayoutTabView = ccui.Layout.extend({
    _layer: null,
    _arrTitleTab: null,
    _size: null,
    _tabIndex: 1,
    ctor: function (layer, size, arrTitleTab, tabIndex, indexFocus) {
        this._super();
        this._layer = layer;
        this._size = size;
        this._arrTitleTab = arrTitleTab;
        this._tabIndex = tabIndex;
        this.setPosition(cc.p(350, 520));
        this.setContentSize(this._size);
        //var w = this._size.width/this._arrTitleTab.length;
        var w = 183;
        var sizeTab = cc.size(parseFloat(w), this._size.height);
        var indexFocus1 = 0;
        if (indexFocus) {
            indexFocus1 = indexFocus;
        }
        for (var i = 0; i < this._arrTitleTab.length; i++) {
            var btnTab = new ccui.Button();
            btnTab.ignoreContentAdaptWithSize(false);
            btnTab.setContentSize(sizeTab);
            btnTab.setPressedActionEnabled(false);
            btnTab.setTag(i);
            btnTab.setTitleFontName(UTMBebas.fontName);
            btnTab.setTitleFontSize(30);
            btnTab.setTitleText(this._arrTitleTab[i]);
            btnTab.getTitleRenderer().setColor(cc.color.WHITE);
            var texType = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame(res_Lobby + "/btntab.png")) {
                texType = ccui.Widget.PLIST_TEXTURE;
            }
            if (i == indexFocus1) {
                var texType = ccui.Widget.LOCAL_TEXTURE;
                if (cc.spriteFrameCache.getSpriteFrame(res_Lobby + "/btntabactive.png")) {
                    texType = ccui.Widget.PLIST_TEXTURE;
                }
                btnTab.normalFileName = res_Lobby + "/btntabactive.png";
                btnTab.clickedFileName = res_Lobby + "/btntabactive.png";
                btnTab.getTitleRenderer().setColor(GuiUtil.color("#592500"));
                btnTab.isSelected = true;
                btnTab.loadTextureNormal(btnTab.clickedFileName, texType);
            } else {
                btnTab.loadTextures(res_Lobby + "/btntab.png", res_Lobby + "/btntab.png", res_Lobby + "/btntab.png", texType);
                btnTab.normalFileName = res_Lobby + "/btntab.png";
                btnTab.clickedFileName = res_Lobby + "/btntab.png";
                btnTab.isSelected = false;
            }
            btnTab.addTouchEventListener(this.onTouchEventHandler, this);
            btnTab.setPosition(cc.p(sizeTab.width / 2 + i * (sizeTab.width + 10), sizeTab.height / 2 - 2));

            if (cc.sys.isNative) {
                btnTab.setTitleFontName("res/Font/" + btnTab.getTitleFontName() + ".ttf");
            }
            this.addChild(btnTab);
        }
    },
    setIndexTabFocus: function (index) {
        var texType = ccui.Widget.LOCAL_TEXTURE;
        if (cc.spriteFrameCache.getSpriteFrame(res_Lobby + "/btntab.png")) {
            texType = ccui.Widget.PLIST_TEXTURE;
        }
        for (var i = 0; i < this._arrTitleTab.length; i++) {
            if (i == index) {
                if (this.getChildByTag(i).isSelected) {
                    return;
                }
                this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).clickedFileName, texType);
                this.getChildByTag(i).isSelected = true;
            } else {
                this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).normalFileName, texType);
                this.getChildByTag(i).isSelected = false;
            }
        }
    },
    onTouchEventHandler: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var texType = ccui.Widget.LOCAL_TEXTURE;
                if (cc.spriteFrameCache.getSpriteFrame(res_Lobby + "/btntab.png")) {
                    texType = ccui.Widget.PLIST_TEXTURE;
                }
                for (var i = 0; i < this._arrTitleTab.length; i++) {
                    if (this.getChildByTag(i) == sender) {
                        if (this.getChildByTag(i).isSelected) {
                            return;
                        }
                        this.getChildByTag(i).getTitleRenderer().setColor(GuiUtil.color("#592500"));
                        this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).clickedFileName, texType);
                        this.getChildByTag(i).isSelected = true;
                        this._layer.onClickTab(this._tabIndex, sender.getTag());
                    } else {
                        this.getChildByTag(i).getTitleRenderer().setColor(cc.color.WHITE);
                        if (this.getChildByTag(i).isSelected) {
                            this.getChildByTag(i).isSelected = false;
                            this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).normalFileName, texType);
                        }
                    }
                }
                break;
        }
    },
});