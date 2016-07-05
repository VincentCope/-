define(function () {
	function Widget() {
		this.alert_box = null;
	};

	Widget.prototype = {
        	on: function (type,handler) {
            if (typeof this.handlers[type] === 'undefined') {
                this.handlers[type] = [];
            }
                this.handlers[type].push(handler);

                return this;
            },
	        fire: function (type,data) {
	            if (this.handlers[type] instanceof Array) {
	                var handlers = this.handlers[type];
	                for (var i =0; i < handlers.length; i++) {
	                    handlers[i](data);
	                }
	            }

	            return this;
	        },
	        
	        render: function (container) {
	        	this.renderUI();
	        	this.handlers = {};
	        	this.bindUI();
	        	this.syncUI();
	        	$(container || document.body).append(this.alert_box);
	        },
	        destroy: function () {
	        	this.destructor();
	        	this.alert_box.off();
	        	this.alert_box.remove();
	        },
	        renderUI: function () {},
	        bingUI: function () {},
	        syncUI: function () {},
	        destructor: function () {}
        }

	return {
		Widget: Widget
	}
});