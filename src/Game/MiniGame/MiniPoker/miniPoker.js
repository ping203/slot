var MiniPoker = BaseLayer.extend({
    ctor: function () {
        this._super();
    },
    customizeGUI: function () {

    },
    onEnter: function () {
        this._super();
    },
    initUI: function () {
      this.addLayout(this, "pokerlayout", cc.p(), "", cc.size(), true);
    },
});