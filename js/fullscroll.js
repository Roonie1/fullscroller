(function($) {
    $.fn.fullscroll = function(options, callback) {
        var defaults = {
            className: 'block',
            callback: null,
            initHeight: 0,
            position: 0
        }
        var options = $.extend(defaults, options);
        var className = options.className;
        var obj = this;
        var number = $("." + className).length;
        var height = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight;
        var position = options.position;
        if (position == 0) {
            position = ((number - 1) * height - 100 * (number)) / number;
        }
        var beforeScrollTop = 0;
        var initHeight = options.initHeight;
        //初始化
        options.start = function() {
            $(obj).css({
                height: (number - 1) * height + "px"
            });
            $("." + className).css({
                position: "absolute",
                width: "100%",
                height: height + "px",
                top: "0",
                opacity: "0",
                filter: "alpha(opacity = 0)",
                "z-index": "2"
            });
            $("." + className).eq(0).css({
                opacity: "1",
                filter: "alpha(opacity = 100)",
            });
        };
        options.end = function() {
            $("." + className).css({
                position: "absolute",
                opacity: "0",
                filter: "alpha(opacity = 0)",
            });
            $("." + className).eq(number - 1).css({
                opacity: "1",
                filter: "alpha(opacity = 100)",
                top: (number - 2) * height + "px"
            });
        };
        options.start();
        //监听滚动
        $(window).scroll(function() {
            if (initHeight == 0) {
                initHeight = $(obj).offset().top - 100;
            }
            var scrollTop = $(window).scrollTop();
            if (scrollTop >= 0 && scrollTop < initHeight) {
                options.start();
                if (options.callback != null) {
                    options.callback(-1);
                }
            } else if (scrollTop >= initHeight + number * position) {
                options.end();
                if (options.callback != null) {
                    options.callback(number);
                }
            } else {
                for (var i = 0; i < number; i++) {
                    if (scrollTop >= initHeight + position * i && scrollTop < initHeight + position * (i + 1)) {
                        //往下滑动
                        if (beforeScrollTop < scrollTop) {
                            $("." + className).eq(i).css({ position: "fixed", top: 0 });
                            if (i != 0) {
                                $("." + className).eq(i - 1).stop(true).css({ filter: "alpha(opacity=0)" }).animate({ opacity: 0 }, 1000);
                            }
                            $("." + className).eq(i).stop(true).css({ filter: "alpha(opacity=100)" }).animate({ opacity: 1 }, 1000);
                        } else {
                            $("." + className).eq(i).css({ position: "fixed", top: 0 });
                            if (i != number - 1) {
                                $("." + className).eq(i + 1).stop(true).css({ filter: "alpha(opacity=0)" }).animate({ opacity: 0 }, 1000);
                            }
                            $("." + className).eq(i).stop(true).css({ filter: "alpha(opacity=1000)" }).animate({ opacity: 1 }, 1000);
                        }
                        if (options.callback != null) {
                            options.callback(i);
                        }
                    }
                }
            }
            beforeScrollTop = scrollTop;
        });
    }
})(jQuery);