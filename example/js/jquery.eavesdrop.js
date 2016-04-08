;(function ( $, window, document) {
	
	var pluginName = 'eavesdrop';
	var calls = 0;
	
	function Eavesdrop(nav, options){
		this.element = nav;
		this._name = pluginName;
		this._defaults = $.fn.eavesdrop.defaults;
		this.options = $.extend( {}, this._defaults, options );
		this.init();
	}
	
	$.extend(Eavesdrop.prototype, {
	
		constructor: Eavesdrop,

		init: function(){
			var clickParams = $.proxy(this.clickParams, this);
			var scrollParams = $.proxy(this.scrollParams, this);
			var structure = $.proxy(this.structure, this);
			this.buildCache();
			this.errors();
			this.scrollClick = this.navAnchor.on('click', clickParams);
			this.scrollStructure = $(window).on('load resize', structure);
			this.scrollWindow = $(window).on("load resize scroll", scrollParams);
			this.onScroll();
		},
		
		destroy: function(){
			this.unbindEvents();
      this.$element.removeData();
		},
		
		buildCache: function(){
			var selector = '.'+this.options.watchClass;
			this.$element = $(this.element);
			this.$body = $('body');
			this.$selector = $(selector);
			this.navAnchor = this.$element.find('a');
			this.selector = selector;
			this.activeClass = this.options.activeClass;
			this.targets = $([]);
			this.distances = $([]);
			this.selectors = $([]);
			this.anchors = $([]);
		},
				
		unbindEvents: function() {
    	this.$element.off('.'+this._name);
    },
		
		errors: function(){
			var selectorAmount = this.$selector.length;
			var navAmount = this.$element.find('a').length;
			navAmount === selectorAmount ? this.universalAmount = navAmount : console.error('target to selector mismatch');
		},

		structure: function(){
			var self = this;
			this.$selector.each(function(i){
				i++
				var hash = self.navAnchor.eq(i - 1).attr('href').split('#')[1];
				$(this).attr('data-connect', hash); 
				var connect = $(this).data('connect');
				offset = $(this).offset().top;
				self.targets.push(connect);
				self.distances.push(offset);
				self.selectors.push(i);
			});
		},

		clickParams: function(data){
			var router = data.currentTarget.hash.split('#')[1];
			var target = this.selector + '[data-connect="'+ router +'"]';
			var targetOffset = $(target).offset().top;
			this.$body.trigger(router[1] + '-inView');
			this.$body.animate({ scrollTop: (targetOffset) });
		},

		scrollParams: function(){
			var d	= $(window).scrollTop();
			var inView = {};
			for (var i = 0; i < this.universalAmount; i++){
				var scrollHeight = d - this.distances[i];
				scrollHeight < 0 ? inView[this.selectors[i]] = Infinity : inView[this.selectors[i]] = scrollHeight;
				var currentlyInView = Object.keys( inView ).map(function ( key ) { return inView[key]; });
				var min = Math.min.apply( null, currentlyInView );
				var viewPos = currentlyInView.indexOf(min);
			}

			if(this.$element.attr('data-active') != viewPos){
				this.$element.attr('data-active', (viewPos));
				this.$body.trigger('active.'+this._name);
			}
		},

		onScroll: function(){
			var self = this;
			self.$body.on('active.'+this._name, function(){
				var a = self.$element.attr('data-active') || 0;
				self.$element.find('.'+self.activeClass).removeClass(self.activeClass);
				self.$element.find('a[href*="'+ self.targets[a] +'"]').parent().addClass(self.activeClass);
				if(self._defaults.trackUrl == true){
					history.replaceState(undefined, undefined, "#"+self.targets[a]);
				}
		});

		}
	});

	$.fn.eavesdrop = function ( options ) {
		calls ++
		this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Eavesdrop( this, options ) );
			}
		});
		if(calls > 1){
			$.fn.eavesdrop.defaults.trackUrl = false;
		}
		return this;
	};
	
	$.fn.eavesdrop.defaults = {
		watchClass: 'eavesdrop',
		activeClass: 'active',
		trackUrl: true
  };
	
})( jQuery, window, document );