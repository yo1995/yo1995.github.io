// ******************************//
// Author : VLThemes
// ******************************//

jQuery.noConflict()(function ($) {

    'use strict';

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iPhone: function() {
            return navigator.userAgent.match(/iPhone/i);
        },
        iPad: function() {
            return navigator.userAgent.match(/iPad/i);
        },
        iPod: function() {
            return navigator.userAgent.match(/iPod/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };






    var wndW;
    var wndH;
    function updateWndVars () {
        wndW = window.innerWidth || document.documentElement.clientWidth;
        wndH = window.innerHeight || document.documentElement.clientHeight;
    }
    updateWndVars();
    
    $(window).on('resize', updateWndVars);
    $(window).on('orientationchange', updateWndVars);
    $(window).on('load', updateWndVars);



    var vl_scrollTop = function(){

        var offset = 300,
        scroll_top_duration = 350,
        $back_to_top = $('.scroll-top');


        $back_to_top.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, scroll_top_duration);
            return false;
        });

    }

    var vl_progress_bar = function(){

        $('.progress-bar').each(function(){

            $(this).one('inview', function(){          
                var percent = parseInt($(this).find('span').text(),10);
                var $endNum = percent;
                        $(this).find('.progress-inner').velocity({
                    width: percent + '%'
                },{ 
                    duration: 1200 
                }, 'ease-in-out');

                if (typeof $.fn.countTo !== 'undefined') {

                    $(this).find('span').countTo({
                        from: 0,
                        to: $endNum,
                        speed: 1200,
                        refreshInterval: 30
                    }); 

                }
                
            });
        }); 

   }


    var vl_portfolio_item_gutter = function(){
        var $item = $('.portfolio-item'),
            $cont = $('.portfolio-masonry-wrapper'),
            $gut = parseInt($cont.attr('data-gutter')/2, 10);

            $cont.css({
                'margin-left': -$gut +'px',
                'margin-right': -$gut +'px'
            });

            $item.css({
                'padding': $gut +'px'
            });
    }

    var vl_filter_toggle = function(){
        var $body = $('body'),
            $filterToggle = $('.toggle-filter'),
            $container = $('.portfolio-list');

        var filterToggleFunc = function() {
        
            $body.toggleClass('filter-open');
   
        };

        $filterToggle.on('click', filterToggleFunc);


        $container.imagesLoaded(function() {
            $container.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'masonry',
                transitionDuration: '0.8s'
            });
        });

        $('.filters-wrap a').on('click', function (e) {
            e.preventDefault();

            var $this = $(this);

            $('.filters-wrap a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({
                filter: $(this).attr('data-filter')
            });

            return false;
        });


    }



    var vl_menu_mob = function(){

        var $body = $('body'),
            $menu = $('.primary-menu'),
            $menuToggle = $('.menu-toggle.mobile-menu-toggle');


        var menuToggleFunc = function() {
        
            $menu.slideToggle(500);
            $body.toggleClass('nav-mobile-open');
            if($menu.is(':hidden') && $body.hasClass('nav-mobile-open')){
                $body.addClass('nav-mobile-open');
            }

        };

        $menuToggle.on('click', menuToggleFunc);

        $('.menu-item-has-children > a').on('click', function(e) {
            e.preventDefault();
            if ($(this).next('ul').is(':visible')) {
                $(this).closest('li').removeClass('sub-active').end().next('ul').slideUp(250);
            } else {
                $(this).closest('li').addClass('sub-active').end().next('ul').slideDown(250);
            }
        });


    }

    var vl_toggle_map = function(){

        var $body = $('body'),
            $mapToggle = $('.map-content-wrap');

        var mapToggleFunc = function() {
            $body.toggleClass('map-open');
        };
        $mapToggle.on('click', mapToggleFunc);

    }


    var vl_menu = function(){

        var $body = $('body'),
            $menuToggle = $('.menu-toggle.desctop-menu');

        var fnOpen = false;

        var menuToggleFunc = function() {
            fnOpen = !fnOpen;
            $body.toggleClass('nav-open');

            return false;
        };

        $menuToggle.on('click', menuToggleFunc);

        $(document).on('keyup', function(e) {
            if (e.keyCode == 27 && fnOpen) {
                menuToggleFunc();
            }
        });

    }


    var vl_fixedheader = function(){

        if($('header').is('.header-fixed, .header-scroll-up')){
            $('header').stickyPanel({
                slickyClass: "fixedheader",
                extraOffset: 0,
                fakeBlock: false,
                scrollClasses: true
            });   
        }

    }

    
    var vl_scroll_animate = function(){


        var wow = new WOW({
            animateClass: 'animated',
            offset : 160,
            mobile : false,
            live: true
        });
        wow.init();      


    }


    var vl_collage = function(){

        if (typeof $.fn.removeWhitespace !== 'undefined' && typeof $.fn.collagePlus !== 'undefined') {
            
            var $galleryList = $('.gallery-list');

            $galleryList.imagesLoaded(function(){
                $galleryList.removeWhitespace().collagePlus({
                    'allowPartialLastRow': false,
                    'targetHeight': 300,
                    'direction': 'vertical'
                });
            });
        }

    }

    var vl_pagepiling_height = function(){

        var $frh = $('.frame-line.top-frame').height()*2;
        $('#pagepiling').css('height', wndH-$frh);
        
    }

    var vl_pagepiling = function(){


        vl_pagepiling_height();

        if($('#pagepiling').length){

            $('#pagepiling').pagepiling({
                easing: 'easeInOutQuart',
                scrollingSpeed: 1000,
                loopBottom: true,
                loopTop: true,
                navigation: {
                    'position': 'right'
                },
                onLeave: function(index, nextIndex, direction){
                    $('.section').eq(index -1).removeClass('animated');
                    $('.section').eq(nextIndex -1).addClass('animated');
                }
            }); 

        }
 
    }


$(document).ready(function() {


    // ******************************//
    // Functions Call
    // ******************************//

    vl_scrollTop();
    vl_fixedheader();
    vl_menu();
    vl_menu_mob();
    vl_filter_toggle();
    vl_portfolio_item_gutter();
    vl_scroll_animate();
    vl_progress_bar();
    vl_collage();
    vl_pagepiling();



    // ******************************//
    // Blog
    // ******************************//

    $('.masonry-wrap').imagesLoaded(function(){
        $('.masonry-wrap').isotope({
            itemSelector: '.post',
            layoutMode: 'masonry',
            transitionDuration: '0s'
        });
    });

    $('.blog-minimal .post .post-title a').on('mouseenter', function(){
        $(this).closest('.post').addClass('hovered');
    });

    $('.blog-minimal .post .post-title a').on('mouseleave', function(){
        $(this).closest('.post').removeClass('hovered');
    });



    var $infinite = $('#infinity-pagination'),
        $infiniteLink = $('#infinity-pagination .next-page'),
        $infiniteContainer = $('.infinite-container'),
        $spinner = $('.load-more-spinner');

    if($('.infinite-container').length > 0) {

        $(window).on('scroll.infinite', infiniteScrollBlog);

    }

    function infiniteScrollBlog() {

        var blog_offset = 0;


        $spinner.fadeIn(200);


        if ($(window).scrollTop() + $(window).height() - 100 >= $infiniteContainer.offset().top + $infiniteContainer.height()) {

            $(window).off('scroll.infinite');


            $.ajax({
                dataType: 'html',
                msg     : '',
                type    : 'GET',
                url     : $infiniteLink.prop('href'),
                success : function (data) {

                    $spinner.fadeOut(0);

                    var items  = $(data).filter('.post'),

                    $data = $(data),
                    length = items.length,
                    html   = '';

                    if (length > 0) {

                        if (blog_offset !== length) {

                            for (var i = 0; blog_offset < length; blog_offset++, i++) {
                                html += items.eq(blog_offset).prop('outerHTML');
                            }

                            $infiniteContainer.append(html);
                            $infiniteContainer.imagesLoaded(function() {
                                $(window).trigger('resize');
                                $infiniteContainer.isotope('reloadItems').isotope();
                            });

                            if (blog_offset == length) {
                                return;
                            }

                        } else {
                            return;
                        }
                    } else {
                        return;
                    }
                }
            });
        }
    }



    // ******************************//
    // Tooltip
    // ******************************//

    $('[data-toggle=tooltip]').tooltipster({
        theme: 'vl-tooltip',
        touchDevices: false,
        trigger: 'hover',
        zIndex: 999
    });

    // ******************************//
    // Fancybox
    // ******************************//

    $('.fancybox').fancybox({
        openEffect : 'none',
        closeEffect : 'none',
        closeBtn: false,
        beforeShow : function() {
            var alt = this.element.find('img').attr('alt');
            this.inner.find('img').attr('alt', alt);
            this.title = alt;
        },
        helpers : {
            overlay : {
                locked: false
            }
        }
    });
        
    $('.fancybox-video').fancybox({
        maxWidth : 560,
        maxHeight : 315,
        fitToView : false,
        width : '100%',
        height : '100%',
        autoSize : false,
        closeBtn : false,
        openEffect : 'none',
        closeEffect : 'none',
        beforeLoad : function(){
            var url= $(this.element).attr('href');
            url = url.replace(new RegExp("watch\\?v=", "i"), 'v/');
            url += '?fs=1&autoplay=1';
            this.href = url
        }
    });


    // ******************************//
    // Animsition
    // ******************************//

    if( $('.animsition').length) {
       $('.animsition').animsition({
            inClass: 'fade-in-down-sm',
            outClass: 'fade-out-up-sm',
            inDuration: 800,
            outDuration: 800,
            linkElement: '.animsition-link',
            loading: true,
            loadingParentElement: 'body',
            loadingClass: 'animsition-loading',
            loadingInner: '<div class="preloader"></div>',
            timeout: false,
            timeoutCountdown: 4000,
            onLoadEvent: true,
            browser: [
                'animation-duration', 
                '-webkit-animation-duration', 
                '-o-animation-duration'],
            overlay: false,
            overlayClass: 'overlay-slide-out-top',
            overlayParentElement: 'body',
            transition: function(url) {
                window.location.href = url;
            }
        });

       $('.animsition').on('animsition.inEnd', function(){
            $('body').addClass('loading-end');
       });
       $('.animsition').on('animsition.outStart', function(){
            $('body').removeClass('loading-end');
       });
    }



    // ******************************//
    // Image SLider
    // ******************************//


    var $animDur = 1000,
        $animDelay = ($animDur/4)-20,
        $animSpeed = $animDur-$animDelay;

    var $navW = '<div class="image-slider-nav">\
                <a href="#" class="flex-prev"></a>\
                <a href="#" class="flex-next"></a>\
                </div>';

    var $imageSW = $('.image-slider-wrap');
    
    $imageSW.each(function(){

        var $this = $(this);

        var $imageContainer = $this.find('.image-slider'),
            slides = $imageContainer.find('.flexslider li');

        if ($(this).attr('data-visible-nav') == 'true') {
                $this.find('.flexslider').prepend($navW);
        }

        $this.find('.image-slider-nav a.flex-prev').on('click', function(e){
            e.preventDefault();
            $imageContainer.flexslider('prev');
        });

        $this.find('.image-slider-nav a.flex-next').on('click', function(e){
            e.preventDefault();
            $imageContainer.flexslider('next');
        });


        $imageContainer.flexslider({
            selector: '.flexslider > ul > li',
            animation: 'fade',
            controlNav: $(this).data('visible-dots') || false,
            directionNav: false,
            animationLoop: false,
            slideshow: false,
            slideshowSpeed: 4000,
            animationSpeed: $animSpeed,
            itemMargin: 0,
            initDelay: 0,
            move: 4,
            minItems: 4,
            maxItems: 4,
            before: function(slider){ 
                var $currentSlide = slider.slides.eq(slider.currentSlide),
                    $nextSlide = slider.slides.eq(slider.currentSlide+1),
                    $prevSlide = slider.slides.eq(slider.currentSlide-1);

                $nextSlide.find('img').css({
                    'opacity': 0
                });

                $prevSlide.find('img').css({
                    'opacity': 0
                });

                $this.find('.blind-01, .blind-02').velocity({
                    translateX: '-100%'
                }, 0);

                $this.find('.blind-01').velocity({
                    translateX: '100%'
                }, { 
                    duration: $animDur
                });

                $this.find('.blind-02').velocity({
                    translateX: '100%'
                }, { 
                    duration: $animDur,
                    delay: $animDelay
                }); 
          
            },
            after: function(slider){
                   
                var $currentSlide = slider.slides.eq(slider.currentSlide);

                $currentSlide.find('img').velocity({
                    'opacity': 1
                }, {
                    duration: $animDur
                });

            }

        });

    });

    // ******************************//
    // Parallax
    // ******************************//

    $('.jarallax').jarallax({
        speed: 0.3
    });

    // ******************************//
    // Testimonial Slider
    // ******************************//

    var swiper = new Swiper('.testimonial-carousel', {
        pagination: '.testimonial-pagination',
        paginationClickable: true
    });


    // ******************************//
    // Google Map
    // ******************************//

    vl_toggle_map();


    function initialize_map() {


        var map;
        $('#map').each(function() {
            var $t = $(this),
                mapZoom = 15,
                mapLat = $t.attr("data-lat"),
                mapLng = $t.attr("data-lng");
            if ($t.attr("data-zoom") !== undefined) {
                mapZoom = parseInt($t.attr("data-zoom"), 10);
            }
            // Create an array of styles.
            var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
            
            // Create a new StyledMapType object, passing it the array of styles,
            // as well as the name to be displayed on the map type control.
            var styledMap = new google.maps.StyledMapType(styles, {
                name: "Styled Map"
            });
            var myLatLng = new google.maps.LatLng(mapLat, mapLng);
            var mapOptions = {
                zoom: mapZoom,
                center: myLatLng,
                scrollwheel: true,
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                scaleControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                tittle: 'Frank Lin',
                icon: '/img/map_marker.png',
                animation: google.maps.Animation.DROP
            });
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
        });

    }

    if ($('#map').length) {
        google.maps.event.addDomListener(window, 'load', initialize_map);
    }


    /************************/
    // Sticky Sidebar
    /************************/ 

    $('.content-fixed, .sidebar-fixed').theiaStickySidebar({
        additionalMarginTop: 0
    });

    /************************/
    // Popover
    /************************/
    
    $(document).ready(function(){
        $('[data-toggle=popover]').popover();

        $("#qrcode-btn").popover({
            html : true, 
            content: function() {
                return $("#qrcode-content").html();
            },
            title: function() {
                return $("#qrcode-title").html();
            }
        });
		
		/*
        $('.hascaption').each(function() {
            $(this).replaceWith($('<div class="img-with-caption hascaption">' + this.innerHTML + '</div>'));
        });
        $('.hascaption').children('img').each(function() {
            var caption;
            caption = $(this).attr('alt');  // former title, not cool with popular method
            $(this).before('<span class="caption">' + caption + '</span>');
        });
		*/
		
		/* 180728 rewrite alt rules */
		$('.content-color').find('img').each(function(){
			$(this).wrap('<div class="img-with-caption hascaption"></div>');
            var alt = $(this).attr('alt');
            if (alt) {
				$(this).before('<span class="caption">' + alt + '</span>');
            }
        });

    });    

    /************************/
    // ScrollSpy
    /************************/

    $(document).ready(function(){
        $('.section-nav').each(function() {
            $(this).replaceWith($('<ul class="nav nav-pills section-nav nav-stacked">' + this.innerHTML + '</ul>'));
        });
    });

    $(document).ready(function(){

        $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
        })
        // Add smooth scrolling on all links inside the navbar
        $("#navbar a").on('click', function(event) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = decodeURIComponent(this.hash);

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top -105
            }, 800, function(){
        
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
            }  // End if
        });

    });

    /************************/
    // Video Fits
    /************************/

    $(document).ready(function(){
        // Target your .container, .wrapper, .post, etc.
        $("#main-content").fitVids();
    });

    /************************/
    // Contact Form
    /************************/ 

        $('#contact-form').on('submit', function(e) {
            return form_to_ajax_request($(this), ['email', 'name', 'message'], ['email', 'name', 'message']);
        });




        function form_to_ajax_request(form_el, all_fields, required_fields) {
            var fields_values = [];
            var error = false;

            //get values from fields
            $.each(all_fields, function(index, value) {
                fields_values[value] = form_el.find('*[name=' + value + ']').val();
            });

            //check if required fields are set
            $.each(required_fields, function(index, value) {
                if (!isSet(fields_values[value])) {
                    var message = form_el.data(value + '-not-set-msg');
                    if (!isSet(message))
                        message = form_el.data('all-fields-required-msg');
                    setReturnMessage(form_el, message);
                    showReturnMessage(form_el);
                    error = true;
                    return;
                }
            });
            if (error)
                return false;

            //form data query object for ajax request
            var data_query = {};
            $.each(all_fields, function(index, value) {
                data_query[value] = fields_values[value];
            });
            data_query['ajax'] = true;

            //show ajax loader
            showLoader(form_el);

            //send the request
            $.ajax({
                    type: form_el.attr('method'),
                    url: form_el.attr('action'),
                    data: data_query,
                    cache: false,
                    dataType: "text"
                })
                .fail(function() { //request failed
                    setReturnMessage(form_el, form_el.data('ajax-fail-msg'));
                    showReturnMessage(form_el);
                })
                .done(function(message) { //request succeeded
                    if (!isSet(message)) {
                        clearForm(form_el);
                        setReturnMessage(form_el, form_el.data('success-msg'));
                        showReturnMessage(form_el);
                    } else {
                        setReturnMessage(form_el, message);
                        showReturnMessage(form_el);
                    }
                });

            //hide ajax loader
            hideLoader(form_el);

            return false;
        }

        function isSet(variable) {
            if (variable == "" || typeof(variable) == 'undefined')
                return false;
            return true;
        }

        function clearForm(form_el) {
            form_el.find('input[type=text]').val('');
            form_el.find('input[type=checkbox]').prop('checked', false);
            form_el.find('textarea').val('');
        }

        function showLoader(form_el) {
            form_el.find('.ajax-loader').fadeIn('fast');
        }

        function hideLoader(form_el) {
            form_el.find('.ajax-loader').fadeOut('fast');
        }

        function setReturnMessage(form_el, content) {
            if (!isSet(content))
                content = "Unspecified message.";
            form_el.find('.return-msg').html(content);
        }

        function showReturnMessage(form_el) {
            form_el.find('.return-msg').addClass('show-return-msg');
        }

        $('.return-msg').on('click', function(e) {
            $(this).removeClass('show-return-msg').html('');
        });
		$(window).scroll(function() {
            var percent = $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
            $(".scroll-indicator").css("width", percent + "%")
        });




    });

    $(window).resize(function(){
        vl_collage();
        vl_pagepiling_height();
    });




});