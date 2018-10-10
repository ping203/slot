(function () {
    // return;
    var LEFT_PADDING = 0;

    cc.EditBox.prototype.ctor = function (size, normal9SpriteBg) {
        cc.Node.prototype.ctor.call(this);
        if (size) this.__height = size.height;

        this._anchorPoint = cc.p(0.5, 0.5);
        this._textColor = cc.color.WHITE;
        this._placeholderColor = cc.color.GRAY;

        this._renderCmd._createLabels();
        this.createDomElementIfNeeded();
        this.initWithSizeAndBackgroundSprite(size, normal9SpriteBg);

        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this._onTouchBegan.bind(this),
            onTouchEnded: this._onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(this._touchListener, this);

        this.setInputFlag(this._editBoxInputFlag);
        this.onUserKeyDownSelf = this.onUserKeyDown.bind(this);
    };

    cc.EditBox.prototype.onUserKeyDown = function (evt) {
        evt = (evt) ? evt : ((event) ? event : null);
        if (!evt)
            return;
        if (evt.keyCode === cc.KEY.tab) {
            if (this.nextTabFocus)
                this.nextTabFocus._onTouchEnded();
            if (evt.preventDefault)
                evt.preventDefault();
        }
    };

    cc.EditBox.prototype.editBoxEditingDidBegin = function () {
        this._renderCmd._edTxt.addEventListener('keydown', this.onUserKeyDownSelf);
    };
    cc.EditBox.prototype.editBoxEditingDidEnd = function () {
        this._renderCmd._edTxt.removeEventListener('keydown', this.onUserKeyDownSelf);//_edTxt
    };
    cc.EditBox.prototype.setFocusSelf = function () {
        this._onTouchEnded();
    };

    cc.EditBox.prototype.setTextAlign = function (align) {
        this._renderCmd._textLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._renderCmd._placeholderLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        if (align == cc.TEXT_ALIGNMENT_CENTER) {
            this._renderCmd._edTxt.style.textAlign = 'center';
            this._renderCmd._textLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this._renderCmd._placeholderLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        } else if (align == cc.TEXT_ALIGNMENT_LEFT) {
            this._renderCmd._edTxt.style.textAlign = 'left';
            this._renderCmd._textLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this._renderCmd._placeholderLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        } else if (align == cc.TEXT_ALIGNMENT_RIGHT) {
            this._renderCmd._textLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this._renderCmd._placeholderLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this._renderCmd._edTxt.style.textAlign = 'right';
            //this._lbShow.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        }
    };


    if(cc.sys.isNative) return;

    cc.EditBox.WebGLRenderCmd.prototype._createDomTextArea = cc.EditBox.CanvasRenderCmd.prototype._createDomTextArea = function () {
        this._removeDomFromGameContainer();
        var thisPointer = this;
        var tmpEdTxt = this._edTxt = document.createElement('textarea');
        tmpEdTxt.type = 'text';
        tmpEdTxt.style.fontFamily = this._edFontName;
        tmpEdTxt.style.fontSize = this._edFontSize + 'px';
        if (thisPointer._editBox.__height) {
            tmpEdTxt.style.lineHeight = thisPointer._editBox.__height + 'px';
        }
        tmpEdTxt.style.color = '#000000';
        tmpEdTxt.style.border = 0;
        tmpEdTxt.style.background = 'transparent';
        tmpEdTxt.style.whiteSpace = 'nowrap';
        tmpEdTxt.style.width = '100%';
        tmpEdTxt.style.height = '100%';
        tmpEdTxt.style.active = 0;
        tmpEdTxt.style.outline = 'medium';
        tmpEdTxt.style.padding = '0';
        tmpEdTxt.style.resize = 'none';
        //tmpEdTxt.style.textTransform = 'uppercase';
        // tmpEdTxt.style.overflow_y = 'scroll';
        tmpEdTxt.style.overflow_y = 'hidden';
        tmpEdTxt.style.display = 'none';
        tmpEdTxt.style.position = "absolute";
        tmpEdTxt.style.bottom = "0px";
        tmpEdTxt.style.left = LEFT_PADDING + "px";
        tmpEdTxt.style.className = "cocosEditBox";
        this.setMaxLength(thisPointer._editBox._maxLength);

        tmpEdTxt.addEventListener('input', function () {
            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, this.maxLength);
            }

            var editBox = thisPointer._editBox;
            if (editBox._delegate && editBox._delegate.editBoxTextChanged) {
                if (("" + editBox._text).toLowerCase() !== this.value.toLowerCase()) {
                    editBox._text = this.value;
                    thisPointer._updateDomTextCases();
                    editBox._delegate.editBoxTextChanged(editBox, editBox._text);
                }
            }
        });

        tmpEdTxt.addEventListener('focus', function () {
            var editBox = thisPointer._editBox;
            thisPointer._hiddenLabels();

            this.style.fontSize = thisPointer._edFontSize + 'px';
            this.style.color = cc.colorToHex(editBox._textColor);

            if (cc.sys.isMobile) {
                thisPointer._onFocusOnMobile(editBox);
            }

            if (editBox._delegate && editBox._delegate.editBoxEditingDidBegin) {
                editBox._delegate.editBoxEditingDidBegin(editBox);
            }
            editBox.editBoxEditingDidBegin();

        });
        tmpEdTxt.addEventListener('keypress', function (e) {
            var editBox = thisPointer._editBox;

            if (e.keyCode === cc.KEY.enter) {
                e.stopPropagation();

                if (editBox._delegate && editBox._delegate.editBoxReturn) {
                    editBox._delegate.editBoxReturn(editBox);
                }
            }
        });
        // tmpEdTxt.addEventListener('keydown', function (e) {
        //     var editBox = thisPointer._editBox;
        //
        //     if (e.keyCode === cc.KEY.tab) {
        //         e.stopPropagation();
        //         if (editBox._delegate && editBox._delegate.editBoxTab) {
        //             editBox._delegate.editBoxTab(editBox);
        //         }
        //     }
        // });
        tmpEdTxt.addEventListener('blur', function () {
            var editBox = thisPointer._editBox;
            editBox._text = this.value;
            thisPointer._updateDomTextCases();

            if (editBox._delegate && editBox._delegate.editBoxEditingDidEnd) {
                editBox._delegate.editBoxEditingDidEnd(editBox);
            }
            editBox.editBoxEditingDidEnd();
            if (this.value === '') {
                this.style.fontSize = editBox._placeholderFontSize + 'px';
                this.style.color = cc.colorToHex(editBox._placeholderColor);
            }

            thisPointer._endEditing();
        });

        this._addDomToGameContainer();
        return tmpEdTxt;

    };

    cc.EditBox.WebGLRenderCmd.prototype._createDomInput = cc.EditBox.CanvasRenderCmd.prototype._createDomInput = function () {
        this._removeDomFromGameContainer();
        var thisPointer = this;
        var tmpEdTxt = this._edTxt = document.createElement('input');
        tmpEdTxt.type = 'text';
        tmpEdTxt.style.fontFamily = this._edFontName;
        tmpEdTxt.style.fontSize = this._edFontSize + 'px';
        tmpEdTxt.style.color = '#000000';
        tmpEdTxt.style.border = 0;
        tmpEdTxt.style.background = 'transparent';
        tmpEdTxt.style.width = '100%';
        tmpEdTxt.style.height = '100%';
        tmpEdTxt.style.active = 0;
        tmpEdTxt.style.outline = 'medium';
        tmpEdTxt.style.padding = '0';
        //tmpEdTxt.style.textTransform = 'uppercase';
        tmpEdTxt.style.display = 'none';

        tmpEdTxt.style.position = "absolute";
        tmpEdTxt.style.bottom = "0px";
        tmpEdTxt.style.left = LEFT_PADDING + "px";
        tmpEdTxt.style.className = "cocosEditBox";
        this.setMaxLength(thisPointer._editBox._maxLength);

        tmpEdTxt.addEventListener('input', function () {
            var editBox = thisPointer._editBox;


            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, this.maxLength);
            }

            if (editBox._delegate && editBox._delegate.editBoxTextChanged) {
                if (editBox._text !== this.value) {
                    editBox._text = this.value;
                    thisPointer._updateDomTextCases();
                    editBox._delegate.editBoxTextChanged(editBox, editBox._text);
                }
            }
        });
        tmpEdTxt.addEventListener('keypress', function (e) {
            var editBox = thisPointer._editBox;

            if (e.keyCode === cc.KEY.enter) {
                e.stopPropagation();
                e.preventDefault();
                if (this.value === '') {
                    this.style.fontSize = editBox._placeholderFontSize + 'px';
                    this.style.color = cc.colorToHex(editBox._placeholderColor);
                }

                editBox._text = this.value;
                thisPointer._updateDomTextCases();

                thisPointer._endEditing();
                if (editBox._delegate && editBox._delegate.editBoxReturn) {
                    editBox._delegate.editBoxReturn(editBox);
                }
                cc._canvas.focus();
            }
        });

        tmpEdTxt.addEventListener('keydown', function (e) {
            var editBox = thisPointer._editBox;

            if (e.keyCode === cc.KEY.tab) {
                e.stopPropagation();
                if (editBox._delegate && editBox._delegate.editBoxTab) {
                    editBox._delegate.editBoxTab(editBox);
                }
            }
        });

        tmpEdTxt.addEventListener('focus', function () {
            var editBox = thisPointer._editBox;
            this.style.fontSize = thisPointer._edFontSize + 'px';
            this.style.color = cc.colorToHex(editBox._textColor);
            thisPointer._hiddenLabels();

            if (cc.sys.isMobile) {
                thisPointer._onFocusOnMobile(editBox);
            }
            if (editBox._delegate && editBox._delegate.editBoxEditingDidBegin) {
                editBox._delegate.editBoxEditingDidBegin(editBox);
            }
            editBox.editBoxEditingDidBegin();
            thisPointer._edTxt.focusing = false;
        });
        tmpEdTxt.addEventListener('blur', function () {
            var editBox = thisPointer._editBox;
            if(thisPointer._edTxt.focusing) return;
            editBox._text = this.value;
            thisPointer._updateDomTextCases();

            if (editBox._delegate && editBox._delegate.editBoxEditingDidEnd) {
                editBox._delegate.editBoxEditingDidEnd(editBox);
            }

            editBox.editBoxEditingDidEnd();
            if (this.value === '') {
                this.style.fontSize = editBox._placeholderFontSize + 'px';
                this.style.color = cc.colorToHex(editBox._placeholderColor);
            }
            thisPointer._endEditing();
        });

        this._addDomToGameContainer();
        return tmpEdTxt;
    };




    cc.EditBox.WebGLRenderCmd.prototype._beginEditing = cc.EditBox.CanvasRenderCmd.prototype._beginEditing = function () {
        if (!this._editBox._alwaysOnTop) {
            if (this._edTxt.style.display === 'none') {
                this._edTxt.style.display = '';
                this._edTxt.focusing = true;
                this._edTxt.focus();
            }
        }

        if (cc.sys.isMobile && !this._editingMode) {
            // Pre adaptation and
            this._beginEditingOnMobile(this._editBox);
        }
        this._editingMode = true;
    };

})()