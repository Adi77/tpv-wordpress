import 'bootstrap';
import '../../Stylesheets/src/main.scss';

require('jquery-easing');
require('jquery-scrollspy');


$(window).on('activate.bs.scrollspy', function (e) {
    history.replaceState({}, "", $('.nav-item .active').attr("href"));
});

$(document).ready(function () {
    //
    // set correct viewport units on mobile
    //
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // We listen to the resize event
    // Store the window width
    let windowWidth = $(window).width();
    window.addEventListener('resize', () => {
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if ($(window).width() != windowWidth) {
            // Update the window width for next time
            windowWidth = $(window).width();

            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    });

    //
    // smooth scroll to section on page load
    //
    if (window.location.href.indexOf("#") != -1) {
        var hash = window.location.href.substring(window.location.href.indexOf("#"));
        $('html, body').animate({scrollTop: $(hash).offset().top - 62}, 1000);
    }

    //
    // scroll to viewport for navig elements
    //
    scrollToViewport();

    function scrollToViewport() {
        $('.btn-link, .btn-tpv-products, .carousel-indicators li').on('click', function () {
            var event_type = '';
            var offset_navig = '';
            var dom_path = '';
            var c = 0;
            if ($(this).closest('.card').length) {
                event_type = 'shown.bs.collapse';
                offset_navig = 80;
                dom_path = $(this).closest('.card');
            }
            if ($(this).parents().eq(3).find('.tpv-products-contents').length) {
                event_type = 'shown.bs.collapse';
                offset_navig = -105;
                dom_path = $(this).parents().eq(3).find('.tpv-products-contents');
            }
            if ($(this).closest('.carousel').length) {
                event_type = 'slide.bs.carousel';
                offset_navig = 150;
                dom_path = $(this).closest('.carousel');
            }

            dom_path.on(event_type, function () {
                var element_position = $(this).offset().top;
                var scroll_position = $(window).scrollTop();
                var viewport_height = $(window).height();
                var speed = 100;
                // if products navi is clicked without initial scrolling
                if (scroll_position == 0) {
                    offset_navig = 270;
                    speed = 900;
                }
                if ((scroll_position + viewport_height) > element_position && scroll_position < element_position) {
                    //console.log('is in viewport');
                } else {
                    if (c == 0) {
                        //console.log('out of viewport');
                        $('html, body').stop().animate({
                            'scrollTop': $(this).offset().top - offset_navig
                        }, speed, 'swing', function () {

                        });
                    }
                }
                c = 1;
            });
        });
    }


    //
    // slideeffect for dropdowns
    //
    $('.dropdown').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(3000);
    });

    $('.dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(2000);
    });

    //
    // prevent double tap on links on ios devices
    //
    var doubleTouchStartTimestamp = 0;
    $(document).bind("touchstart", function (event) {
        var now = +(new Date());
        if (doubleTouchStartTimestamp + 500 > now) {
            event.preventDefault();
        }
        ;
        doubleTouchStartTimestamp = now;
    });


    //
    // mobile menu fadein effect
    //
    /*  var $navMenuCont;
      $('.navbar-toggler[data-toggle="collapse"]').on('click', function(e) {
          $navMenuCont = $($(this).data('target'));
          $navMenuCont.animate({'opacity':'toggle'}, 350);
        e.preventDefault();
      });*/

    //
    // combine slide and fade effect for clicked outside of menu and on scroll
    //
    $.fn.slideFadeToggle = function (speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
    };

    //
    // hide navbar menu if clicked outside
    //
    $(document).bind("touchstart click", function (e) {
        if (!$(e.target).is('.navbar-nav, .icon-bar, .navbar-toggler, .nav-link')) {
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-toggler').addClass('collapsed');
            }
            $('.navbar-toggler').attr("aria-expanded", "false");
            $('.navbar-collapse').removeClass('show');
        }
    });

    var calculateScroll = function () {

        var spaceToTop;

        spaceToTop = $(window).scrollTop();
        // $('[data-spy="scroll"]').scrollspy('refresh');
        if (spaceToTop > $(window).height()) {
            $('#to-top-link').fadeIn('slow');
        } else {
            $('#to-top-link').fadeOut('slow');
        }
        if (spaceToTop > 460) {
            $('.logo-nav-top').addClass('tpv-shadow-lg');

            $('.navbar-toggler').addClass('collapsed').attr("aria-expanded", "false");

            $('.navbar-collapse').removeClass('show');

        } else {
            $('.logo-nav-top').removeClass('tpv-shadow-lg');
            $('.logo-nav-top').removeClass('sticky');
        }
        if (spaceToTop > 63) {
            $('.logo-nav-top').addClass('sticky');
        }
    };
    calculateScroll();

    var iScrollPos = 0;


    $(window).on('scroll', function () {
        calculateScroll();
    });


    //
    // remove bottom borders if pills navig pane is active
    //
    $('.btn-tpv-products').click(function () {

        // toggle rounded corners for products navig
        if ($(this).attr('aria-expanded') == 'false') {
            $('.btn-tpv-products').addClass('noBottomBorders');
        } else {
            $('.btn-tpv-products').removeClass('noBottomBorders');
        }
        /*   $('.tpv-products-contents > div').on('hidden.bs.collapse', function () {
            $('.btn-tpv-products').removeClass('noBottomBorders');
          });
           $('.tpv-products-contents > div').on('show.bs.collapse', function () {
            $('.btn-tpv-products').addClass('noBottomBorders');
          });
          */

        // set font color of inactive tab to grey
        $(this).parent().siblings().each(function () {
            $(this).addClass('inactive-tab');
        });
        $(this).parent().removeClass('inactive-tab');

        //close nav-pills tab-content if it's open on click
        if ($(this).hasClass('active')) {
            $('#' + this.hash.substr(1).toLowerCase()).toggleClass('active');
        }

    });


    //
    // Smooth scrolling using jQuery easing
    //
    $('.js-scroll-trigger[href*="#"]:not([href="#"]), main .wp-block-column a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            var targetId = $(this).attr('id');
            var topOffset;
            if (targetId != '' && targetId == 'to-top-link' || targetId == 'tpv-logo-link') {
                topOffset = 480;
            } else {
                topOffset = 62;
            }


            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - topOffset)

                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    //
    // Closes responsive menu when a scroll trigger link is clicked
    //
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
        $('.navbar-collapse').removeAttr('style');
    });

//
    // set 100% width for products nav in xs viewport
//
    /*$('.btn-link').click(function() {
      $(this).parents().eq(5).animate({
        padding: 0

      }, 1000, "easeInOutExpo");
    });*/


});

