/**
 * @file jquery.scroller.js
 * @author Rhine.Liu
 * @date 2014.10.28
 * @version 1.2.0
 */
$(function () {
	var Browser =
			navigator.userAgent.indexOf("MSIE") > -1 ? "IE" :
			navigator.userAgent.indexOf("Opera") > -1 ? "Opera" :
			navigator.userAgent.indexOf("Firefox") > -1 ? "Firefox" :
			navigator.userAgent.indexOf("Safari") > -1 ? "Safari" :
			navigator.userAgent.indexOf("Chrome") > -1 ? "Chrome" :
		"Unknown";

	$.fn.scroller = function (enter) {
		for (var i in enter) {
			var slide = __scrollerChildren.call(this).eq(~~i).bind("__scrollerEnterAnimate", enter[i]);
			slide.get(0).scrollerHTML = slide.html();
		}
		initScrollerEvent.call(this);
		return this;
	};
	$.fn.scrollerTo = function (pos, callback) {
		var self = this;
		var position = __scrollerChildren.call(this).eq(pos).position();
		if (!position) {
			callback && callback(self);
			return this;
		}
		var scrollTop = position.top;
		__scrollerBefore.call(self, pos);
		TweenMax.to(self, 0.5, {scrollTop: scrollTop, onComplete: function () {
			__scrollerOnTo.call(self, pos);
			callback && callback(self);
		}});
		return this;
	};
	function __scrollerChildren() {
		return this.find(".scroller-slide");
	};
	function __scrollerBefore(pos) {
		var slide = this.find(".scroller-slide").eq(pos);
		if (slide.get(0) && slide.get(0).scrollerHTML) slide.html(slide.get(0).scrollerHTML);
		return this;
	};
	function __scrollerOnTo(pos) {
		this.find(".scroller-slide").eq(pos).trigger("__scrollerEnterAnimate");
		return this;
	};

	function initScrollerEvent() {
		var scrollSlide = 0, scrollTop = -20, scrolling = 0;
		this.scroll(function (evt) {
			if (scrolling) return;
			var _scrollTop = $(this).scrollTop();
			if (_scrollTop == scrollTop) return;
			var h = window.innerHeight;
			scrollSlide = _scrollTop > scrollTop ? Math.ceil(_scrollTop / h) : Math.floor(_scrollTop / h);
			scrollTop = h * scrollSlide;

			scrolling = 1;
			$(this).scrollerTo(scrollSlide, function() {
				scrolling = 0;
			});

			evt.preventDefault();
		});
		this.scroll();
		return this;
	}
});