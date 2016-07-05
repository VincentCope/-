define(['widget','jquery','jqueryUI'],function (widget,$,$UI) {
    function Window() {
    	this.cfg = {
    		width: 500,
    		height:200,
            title: '系统消息',
            content: 'Welcome!',
            alertText: '确定',
            confirmBtn: '确定',
            cancelBtn: '取消',
            promSubmitBtn: '提交',
            promCancelBtn: '取消',
            hasCloseBtn: true,
            hasMask: true,
            isDraggable: true,

            okHandler: null,

            confirmHandler: null,
            cancelHandler: null,

            isPromPassword: false,
            defaultPromValue: '',
            promMaxLength: 10,
            promSubmithandler: null,
            promCancelHandler: null,

            closeHandler: null,
            dragHandle: null,
            mask: null
    	};
    };
    Window.prototype = $.extend({},new widget.Widget(),{
        renderUI: function () {
            var footContent = '';
            switch(this.cfg.winType) {
                case 'alert': 
                    footContent = '<input type="button" id="okBtn" value="'+this.cfg.alertText+'"/>';
                    break;
                case 'confirm':
                    footContent = '<input type="button" id="confirmBtn" value="'+this.cfg.confirmBtn+'"/>'
                    +'<input type="button" id="cancelBtn" value="'+this.cfg.cancelBtn+'"/>';
                    break;
                case 'prompt':
                    this.cfg.content= '<p class="prompt-wrap"><input type="'
                        + (this.cfg.isPromPassword ? 'password' : 'text')
                        + '" value="'+this.cfg.defaultPromValue+'" maxlength="'
                        +this.cfg.promMaxLength+'" class="prompt-value"/></p>';
                    footContent = '<input type="button" id="promSubmitBtn" value="'+this.cfg.promSubmitBtn+'"/>'
                    +'<input type="button" id="promCancelBtn" value="'+this.cfg.promCancelBtn+'"/>';
            };

            this.alert_box = $('<div class="alert-box">'
                    +'<div class="alert-content">'+this.cfg.content+'</div>'
                    +'</div>');

            if (this.cfg.winType !== 'commen') {
                this.alert_box.append('<div class="alert-title">'+this.cfg.title+'</div>');
                this.alert_box.append('<div class="alert-foot">'+footContent+'</div>');
            }

            //遮罩效果
            if (this.cfg.hasMask) {
                this.mask = $('<div class="alert-mask"></div>');
                this.mask.appendTo('body');
            }

            //关闭按钮
            if (this.cfg.hasCloseBtn) {
                this.alert_box.append('<span class="alert-close">X</span>');
            }
        },

        bindUI: function () {
            var that = this;
            this.alert_box.delegate('#okBtn','click',function () {
                that.fire('ok');
                that.destroy();
            }).delegate('.alert-close','click',function () {
                that.fire('close');
                that.destroy();
            }).delegate('#confirmBtn','click',function (){
                that.fire('confirm');
                that.destroy();
            }).delegate('#cancelBtn','click',function (){
                that.fire('cancel');
                that.destroy();
            }).delegate('#promSubmitBtn','click',function (){
                that.fire('promSubmit',that._prompt.val());
                that.destroy();
            }).delegate('#promCancelBtn','click',function (){
                that.fire('promCancel',that._prompt.val());
                that.destroy();
            });

            //如果配置中有okHandler函数则先把它添加到on回调集合中
            if (this.cfg.okHandler) {
                this.on('ok',this.cfg.okHandler);
            }
            if (this.cfg.closeHandler) {
                this.on('close',this.cfg.closeHandler);
            }
            if (this.cfg.confirmHandler) {
                this.on('confirm',this.cfg.confirmHandler);
            }
            if (this.cfg.cancelHandler) {
                this.on('cancel',this.cfg.cancelHandler);
            }
            if (this.cfg.promSubmithandler) {
                this.on('promSubmit',this.cfg.promSubmithandler);
            }
            if (this.cfg.cancelHandler) {
                this.on('promCancel',this.cfg.cancelHandler);
            }         
        },
        syncUI: function () {
            this.alert_box.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                top: this.cfg.y || (window.innerHeight - this.cfg.height)/2 + 'px',
                left: this.cfg.x || (window.innerWidth - this.cfg.width)/2 + 'px'
            });

            //如果想换肤，可添加一个class名
            if (this.cfg.skinClassName) {
                this.alert_box.addClass(this.cfg.skinClassName);
            }

            //是否可拖动
            if (this.cfg.isDraggable) {
                this.alert_box.draggable({handle: this.cfg.dragHandle});
            }
            else {
                this.alert_box.draggable();
            }
        },
        destructor: function () {
            this.mask && this.mask.remove();
        },
    	alert: function (cfg) {
            $.extend(this.cfg,cfg,{winType: 'alert'});
    		this.render();
            return this;
    	},
    	confirm: function (cfg) {
            $.extend(this.cfg,cfg,{winType: 'confirm'});
            this.render();
            return this;
        },
    	prompt: function (cfg) {
            $.extend(this.cfg,cfg,{winType: 'prompt'});
            this.render();
            this._prompt = $('.prompt-value');
            this._prompt.focus();
            return this;
        },
        commen: function (cfg) {
            $.extend(this.cfg,cfg,{winType: 'commen'});
            this.render();
            return this;
        }
    });

    return {
    	Window: Window
    };
});