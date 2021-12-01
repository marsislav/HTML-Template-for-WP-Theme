/*Slider*/
$(document).ready(function() {
    //==================================
    // #Slideshow with jQuery
    //==================================

    // id generator
    function idGenerator() {
        $(".slides__img").each(function(index, el) {
            $(this).attr("id", "slide_" + index);
        });

    }

    // id extractor
    // at the end it focuses the current dot


    // slide up caption
    function captionSlideUp(d, e) {
        var $cap1 = $(".slide__caption:eq(1)");
        $cap1.animate(
            {
                bottom: "-40px",
                opacity: 1
            },
            {
                duration: d,
                easing: e
            }
        );
    }

    // slide down caption
    function captionSlideDown(d, e) {
        $(".slide__caption").animate(
            {
                bottom: "5%",
                opacity: 0
            },
            {
                duration: d,
                easing: e
            }
        );
    }

    // slide movement
    function slideMove(t) {
        if (t === "prev") {
            return $(".slides__img")
                .first()
                .before($(".slides__img").last());
        }
        if (t === "next") {
            return $(".slides__img")
                .last()
                .after($(".slides__img").first());
        }
    }

    // slide images
    function slideIt(l, d, e, t) {
        var $slides = $(".slides");
        captionSlideDown(150, "linear");
        $slides.animate(
            {
                left: l
            },
            {
                duration: d,
                easing: e,
                complete: function() {
                    $slides.css("left", "-100%");
                    slideMove(t);
                    captionSlideUp(1700, "swing");
                }
            }
        );
    }


    // slideshow
    function slideShow(d, e) {
        $("#prev").click(function() {
            var t = $(this).attr("id");
            slideIt("0%", d, e, t);
        });
        $("#next").click(function() {
            var t = $(this).attr("id");
            slideIt("-200%", d, e, t);
        });
    }

    idGenerator();
    captionSlideUp(1700, "swing");
    slideShow(800, "swing");
});

/*Carousel*/
function defer(method) {
    if (window.jQuery)
        method();
    else
        setTimeout(function() {
            defer(method)
        }, 50);
}
defer(function() {
    (function($) {

        function doneResizing() {
            var totalScroll = $('.resource-slider-frame').scrollLeft();
            var itemWidth = $('.resource-slider-item').width();
            var difference = totalScroll % itemWidth;
            if ( difference !== 0 ) {
                $('.resource-slider-frame').animate({
                    scrollLeft: '-=' + difference
                }, 500, function() {
                    // check arrows
                    checkArrows();
                });
            }
        }

        function checkArrows() {
            var totalWidth = $('#resource-slider .resource-slider-item').length * $('.resource-slider-item').width();
            var frameWidth = $('.resource-slider-frame').width();
            var itemWidth = $('.resource-slider-item').width();
            var totalScroll = $('.resource-slider-frame').scrollLeft();

            if ( ((totalWidth - frameWidth) - totalScroll) < itemWidth ) {
                $(".next").css("color", "#c6c6c6");
            }
            else {
                $(".next").css("color", "#000");
            }
            if ( totalScroll < itemWidth ) {
                $(".prev").css("color", "#c6c6c6");
            }
            else {
                $(".prev").css("color", "black");
            }
        }

        $('.arrow').on('click', function() {
            var $this = $(this),
                width = $('.resource-slider-item').width(),
                speed = 500;
            if ($this.hasClass('prev')) {
                $('.resource-slider-frame').animate({
                    scrollLeft: '-=' + width
                }, speed, function() {
                    // check arrows
                    checkArrows();
                });
            } else if ($this.hasClass('next')) {
                $('.resource-slider-frame').animate({
                    scrollLeft: '+=' + width
                }, speed, function() {
                    // check arrows
                    checkArrows();
                });
            }
        }); // end on arrow click

        $(window).on("load resize", function() {
            checkArrows();
            $('#resource-slider .resource-slider-item').each(function(i) {
                var $this = $(this),
                    left = $this.width() * i;
                $this.css({
                    left: left
                })
            }); // end each
        }); // end window resize/load

        var resizeId;
        $(window).resize(function() {
            clearTimeout(resizeId);
            resizeId = setTimeout(doneResizing, 500);
        });

    })(jQuery); // end function
});
/*Responsive menu*/
$(function() {

    // dislay or hide the menu if the user resize the window
    $(window).resize(function() {
        var width = $(window).width();
        if (width <= 1080) {
            $('.navs').css({'display':'none'});
            $('#topbar-menu-icon').removeClass('fa-times');
            $('#topbar-menu-icon').addClass('fa-bars');
        }
        else {
            $('.navs').css({'display':'block'});
            $('#topbar-menu-icon').removeClass('fa-bars');
            $('#topbar-menu-icon').addClass('fa-times');
        }
    });

    // Change the menu icon, and show or hide the menu
    $('#topbar-menu-icon').click(function(){
        if ($('.navs').css('display') == 'none') {
            $('.navs').css({'display':'block'});

            $('#topbar-menu-icon').removeClass('fa-bars');
            $('#topbar-menu-icon').addClass('fa-times');

        }
        else {
            $('.navs').css({'display':'none'});
            $('#topbar-menu-icon').removeClass('fa-times');
            $('#topbar-menu-icon').addClass('fa-bars');

        }
    });
});