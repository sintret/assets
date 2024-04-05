$(document).ready(function () {
    "use strict";
    $(document).on("click", function () {
        $(".has-dropdown").removeClass("active");
        $(".search-page .list-data .dropdown").hide();
        $(".header .right .notifications-message .icons li").removeClass("active");
        $(".header .right .user .dropdown").hide();
    });
    // Left menu;
    $(".left-sidebar .menu .main-menu > li").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).siblings(".has-submenu").find(".submenu").slideUp();
    });

    $(".header .mobile-toggler a, .left-sidebar .mobile-title .top .left-slide").on("click", function (e) {
        e.preventDefault();
        $(".left-sidebar").toggleClass("show-inside");
        $(".main").toggleClass("margin-left");
    });

    $(".left-sidebar .menu ul ul li").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".left-sidebar .menu ul li.has-submenu").append('<span class="arrow"><img src="/assets/tiny/arr-down.svg" class="tabler-icons"></span>');

    // Header;
    $(".header .left .server li").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".header .left .filter li").on("click", function () {
        $(this).toggleClass("active");
    });

    // Filter server form;
    $(".header .left .filter li").on("click", function (e) {
        $(".header .left ul.filter .filter-form").toggle();
        e.stopPropagation();
    });

    $(".search-page .list-data .dot").on("click", function (e) {
        $(".search-page .list-data .dropdown").hide();
        $(this).siblings(".dropdown").show();
        e.stopPropagation();
    });

    $(".header .right .notifications-message .icons li").on("click", function (e) {
        $(this).addClass("active").siblings().removeClass("active");
        $(".header .right .user .dropdown").hide();
        e.stopPropagation();
    });

    // ============ Custom Form JS ============
    
    $(".header .right .notifications-message .icons li .dropdown .dropdown-filter .filter-output").on("click", function () {
        $(this).siblings("ul").toggle();
    });

    $(".header .right .notifications-message .icons li .dropdown .dropdown-filter ul li a").on("click", function () {
        let val = $(this).text();
        $(this).parents(".dropdown-filter").find(".filter-output span").text(val);
        $(this).parents(".filter-time").hide();
    });

    $(".header .right .user").on("click", function (e) {
        $(".header .right .user .dropdown").toggle();
        $(".header .right .notifications-message .icons li").removeClass("active");
        e.stopPropagation();
    });

    $(".header .right .user .dropdown .has-submenu").on("click", function (e) {
        $(this).children(".submenu").slideToggle();
        e.stopPropagation();
    });

    $(".left-sidebar .mobile-title .top .dropdown ul li").on("click", function (e) {
        e.preventDefault();
        $(this).find(".submenu").slideToggle();
    });

    $(".left-sidebar .mobile-title .top .toggler-link").on("click", function () {
        $(".left-sidebar .mobile-title .top .dropdown").slideToggle();
    });

   $(".has-submenu").on("click", function (e) {
       var className = e.target.className;
       if(className.indexOf("has-submenu") > -1) {
           $(this).find(".submenu").each(function (i,item) {
               $(item).slideToggle();
           });
       }
    })
});
