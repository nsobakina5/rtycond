//common functions
function openLink(url) {
    window.location = url;
}

function getE(name) {
    if (document.getElementById)
        var elem = document.getElementById(name);
    else if (document.all)
        var elem = document.all[name];
    else if (document.layers)
        var elem = document.layers[name];
    return elem;
}

function setLocation(url) {
    window.location.href = url;
}

function querystring(key) {
    var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    var r = [], m;
    while ((m = re.exec(document.location.search)) != null) r.push(m[1]);
    return r;
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

// Google analytics helper functions - start //
function _trackPageViewGA(url) {
    if (typeof _gaq != 'undefined') {
        _gaq.push(['_trackPageview', url]);
    }
}

function _trackEventGA(category, action) {
    _trackEventGA(category, action, '', 0);
}

function _trackEventGA(category, action, label) {
    _trackEventGA(category, action, label, 0);
}

function _trackEventGA(category, action, label, value) {
    if (typeof _gaq != 'undefined')
        _gaq.push(['_trackEvent', jQuery.trim(category), jQuery.trim(action), jQuery.trim(label), value]);
}

function _trackErrorPage(statusCode) {
    var url = "/" + statusCode + ".html?page=" + document.location.pathname + document.location.search + "&from=" + document.referrer + "&time=" + DateTime.now();

    if (typeof _gaq != 'undefined') {
        _gaq.push(['_trackPageview', url]);
    }
}

function sendAnalytics(category, action, label, elem) {
    try {
        if (dataMetrics != undefined) {
            category = category || "";
            action = action || "";
            label = label || "";
            elem = elem || "";
            dataMetrics.sendToGA(category, action, label, elem);
        }
    } catch (e) {
    }
}

function sendAnalyticsPageView(page) {
    try {
        if (dataMetrics != undefined) {
            page = page || "";
            dataMetrics.sendToGAPageView(page);
        }
    } catch (e) {
    }
}

// CSRF (XSRF) security
function addAntiForgeryToken(data) {
    //if the object is undefined, create a new one.
    if (!data) {
        data = {};
    }
    //add token
    var tokenInput = jQuery('input[name=__RequestVerificationToken]');
    if (tokenInput.length) {
        data.__RequestVerificationToken = tokenInput.val();
    }
    return data;
};

//quick view function
function openQuickView(link) {
    $(".quick-view-loading").css("display", "");
    $("#quick-view-modal").modal();
    $.ajax({
        cache: false,
        url: link,
        type: 'get',
        success: function (html) {
            $(".lg-will-remove").addClass("modal-lg");
            $(".quick-view-content").removeAttr("style");
            //$(".quick-view-content").mCustomScrollbar("destroy");
            $(".quick-view-loading").css("display", "none");
            $(".quick-view-content").html(html);
        },
        complete: function () {
            if ($(".product-detail-attributes-contaier .Beden .list-inline-item").length == 1) {
                $(".product-detail-attributes-contaier .Beden .list-inline-item .size-list-radio").trigger("click");
            }
        }
    });
}

//set height for mobile menus mini cart, user menu etc.
function setMobileMenusHeight() {
    var headerHeight = $("header").height();
    $(".common-mobile-menu").css("max-height", wH() - headerHeight);
    //$(".common-mobile-menu").mCustomScrollbar();
}
//get prop window width
function wW() {
    return window.innerWidth;
}
//get prop window height
function wH() {
    return window.innerHeight;
}
//overlay is opened
function overlayIsOpened() {
    var status = $("#page-overlay").css("display");
    if (status == "block") {
        return true;
    }
    else {
        return false;
    }
}
//show menu overlay
function showOverlay() {
    $("#page-overlay").fadeIn("fast");
}
//hide overlay
function hideOverlay() {
    $("#page-overlay").fadeOut("fast");
}
//show search
function showSearch() {
    $(".search-container").addClass("opened");
}
//hide search
function hideSearch() {
    $(".search-container").removeClass("opened");
}
//search is opened?
function isSearchOpened() {
    return $(".search-container").hasClass("opened");
}

//no scroll class for when mobile menus opened (not working on ios)
function noScroll() {
    $("body").addClass("no-scroll");
}
//remove no scroll
function removeNoScroll() {
    $("body").removeClass("no-scroll");
}
//clear elements style attributes for window resize from mobile to desktop
function clearStyleAttribute() {
    closeAllMenus();
    $(".common-mobile-menu").removeAttr("style");
    $(".footer-list-menu").removeAttr("style");
}
//close all menus and
function closeAllMenus() {
    hideOverlay();
    closeMobileCart();
    closeMobileCustomerMenu();
    closeMobileMainMenu();
    closeFilterMenu();
}
//open mobile main menu
function openMobileMainMenu() {
    $(".main-menu-container").addClass("opened");
    $(".mobile-menu-icon-container").addClass("opened-menu-icon");
}
//open mobile main menu
function closeMobileMainMenu() {
    $(".main-menu-container").removeClass("opened");
    $(".mobile-menu-icon-container").removeClass("opened-menu-icon");
}
//mobile main menu is opened
function mobileMainMenuIsOpened() {
    return $(".main-menu-container").hasClass("opened");
}
//open desktop cart for after added ajax product
function openDesktopCart() {
    $(".fly-out-cart-container").removeClass("d-none");
    setTimeout(function () {
        $(".fly-out-cart-container").addClass("d-none");
    }, 3000);
}
//open mobile cart
function openMobileCart() {
    $("#mini-cart").addClass("opened");
}
//open mobile cart
function closeMobileCart() {
    $("#mini-cart").removeClass("opened");
}
//mobile cart is opened
function mobileCartIsOpened() {
    return $("#mini-cart").hasClass("opened");
}

//open mobile customer menu
function openMobileCustomerMenu() {
    $(".customer-logged-menu-container").addClass("opened");
}
//close mobile customer menu
function closeMobileCustomerMenu() {
    $(".customer-logged-menu-container").removeClass("opened");
}
//mobile customer menu is opened
function mobileCustomerMenuIsOpened() {
    return $(".customer-logged-menu-container").hasClass("opened");
}

//open left filter menu
function openFilterMenu() {
    $(".filter-left-menu").addClass("opened");
}
//close left filter menu
function closeFilterMenu() {
    $(".filter-left-menu").removeClass("opened");
}
//left filter menu is opened
function filterMenuIsOpened() {
    return $(".filter-left-menu").hasClass("opened");
}

$(function () {
    //set first height for mobile menus
    if (wW() <= 768) {
        setMobileMenusHeight();
    }
    //mobile main menu opening
    $(document).on("click", ".mobile-menu-icon-container", function () {
        if (wW() <= 768) {
            if (!mobileMainMenuIsOpened()) {
                if (overlayIsOpened()) {
                    closeMobileCart();
                    closeMobileCustomerMenu();
                    closeFilterMenu();
                }
                setMobileMenusHeight();
                showOverlay();
                openMobileMainMenu();
            }
            else {
                closeMobileMainMenu();
                hideOverlay();
            }
        }
        else {
            window.location = window.location.origin + url;
        }
    })
    //opening mobile cart
    $(document).on("click", "#mobile-cart-trigger", function () {
        if (wW() <= 768) {
            if (!mobileCartIsOpened()) {
                if (overlayIsOpened()) {
                    closeMobileCustomerMenu();
                    closeMobileMainMenu();
                    closeFilterMenu();
                }
                setMobileMenusHeight();
                showOverlay();
                openMobileCart();
            }
            else {
                closeMobileCart();
                hideOverlay();
            }
        }
    });
    //opening mobile filter
    $(document).on("click", ".toggle-filter-area", function () {
        if (wW() <= 992) {
            if (!filterMenuIsOpened()) {
                if (overlayIsOpened()) {
                    closeMobileCustomerMenu();
                    closeMobileMainMenu();
                    closeMobileCart();
                }
                setMobileMenusHeight();
                showOverlay();
                openFilterMenu();
            }
            else {
                closeFilterMenu();
                hideOverlay();
            }
        }
    });
    //filter mobile acordeon
    $(document).on("click", ".spec-filter-head ", function () {
        //if (wW() <= 992) {
        var status = $(this).hasClass("closed");
        if (status) {
            $(this).removeClass("closed");
            $(this).next("ul").removeAttr("style")
        }
        else {
            $(this).addClass("closed");
            $(this).next("ul").slideUp("fast");
        }
        //}
    });
    //search toggle function
    $(document).on("click", ".search-toggle", function () {
        if (!isSearchOpened()) {
            showSearch();
            setMobileMenusHeight();
        }
        else {
            hideSearch();
            setMobileMenusHeight();
        }
        //fixed pager locatation refresh
        var status = $(".mobil-fixed-order").hasClass("fixed");
        if (status) {
            $(".mobil-fixed-order").css("top", $("header").height());
        }
    });
    //close all menus
    $(document).on("click", "#page-overlay", function () {
        closeAllMenus();
    });
    //customer menu specification
    $(document).on("click", ".customer-link", function (e) {
        e.preventDefault();
        var isLogged = $(this).attr("data-islogin");
        var url = $(this).attr("href");
        if (isLogged == "True" && wW() <= 768) {
            if (!mobileCustomerMenuIsOpened()) {
                if (overlayIsOpened()) {
                    closeMobileCart();
                    closeMobileMainMenu();
                    closeFilterMenu();
                }
                setMobileMenusHeight();
                showOverlay();
                openMobileCustomerMenu();
            }
            else {
                closeMobileCustomerMenu();
                hideOverlay();
            }
        }
        else {
            window.location = window.location.origin + url;
        }
    })
    //footer mobile acordeon menu
    $(document).on("click", ".mobile-footer-menu-toggler", function () {
        var isOpened = $(this).hasClass("active");
        if (wW() <= 768) {
            if (isOpened == true) {
                $(this).removeClass("active");
                $(this).next("ul").removeAttr("style")
            }
            else {
                $(this).addClass("active");
                $(this).next("ul").attr("style", "display:block !important;")
            }
        }
    })
    //clear style attributes acordeon etc.
    $(window).resize(function () {
        setMobileMenusHeight();
        //wW() = window.innerWidth;
        //wH() = window.innerHeight;
        if (wW() > 768) {
            clearStyleAttribute();
        }
    })
    //fixed header toggler
    if ($(".filter-left-menu").length > 0) {
        var startOffset = $(".filter-left-menu").offset().top
    }
    $(window).scroll(function () {
        var scrollPosition = $(window).scrollTop();
        if (wW() <= 768) {
            if (scrollPosition >= 80) {
                $("header").addClass("fixed-header");
                $(".header-container").addClass("fixed-header");
                $("body").addClass("body-margin-top-140");
            }
            else {
                $("header").removeClass("fixed-header");
                $(".header-container").removeClass("fixed-header");
                $("body").removeClass("body-margin-top-140");
            }
            setMobileMenusHeight();
        }

       

        //fixed left filter
        // This is then function used to detect if the element is scrolled into view
        //function elementScrolled(elem) {
        //    var docViewTop = $(window).scrollTop();
        //    var docViewBottom = docViewTop + $(window).height();
        //    var elemTop = $(elem).offset().top;
        //    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
        //}
        //var documentHeight = $(document).height();
        //var leftFilter = $(".filter-left-menu");
        //var footer = $("footer");
        //if ($(".filter-left-menu").length > 0) {
        //    if (wW() > 1024 && productCount > 3) {
        //        if (scrollPosition > startOffset) {
        //            leftFilter.addClass("fixed");
        //            var calculatedHeight = (documentHeight - scrollPosition - footer.outerHeight(true) - (parseInt(leftFilter.css("padding-top")) * 2));
        //            leftFilter.height(calculatedHeight);
        //            leftFilter.mCustomScrollbar({
        //                scrollbarPosition: "outside",
        //                theme: "dark"
        //            });
        //        }
        //        else {
        //            leftFilter.removeClass("fixed");
        //            leftFilter.mCustomScrollbar("destroy");
        //            leftFilter.removeAttr("style");
        //        }
        //        if (leftFilter.height() > wH()) {
        //            leftFilter.height(wH());
        //        }
        //    }
        //}
    });
    //change grid column size NOTE: use only without infinite scroll
    $(document).on("click", ".change-grid", function () {
        var columnSize = $(this).attr("data-column");
        var thisPageUrl = window.location.href;
        var newUrl = updateQueryStringParameter(thisPageUrl, "viewmode", columnSize);
        openLink(newUrl);
    })
    $(document).ready(function () {
        var thisPageUrl = window.location.href;
        var columnSize = querystring("viewmode");
        var selectedGrid = $(".change-grid.active").attr("data-column");
        if (columnSize != selectedGrid) {
            $(".change-grid").removeClass("active");
            if (columnSize == "4") {
                $(".column-four").addClass("active");
                $(".product-grid-item-container").attr("class", "col-6 col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 product-grid-item-container");
            }
            else {
                $(".column-three").addClass("active");
                $(".product-grid-item-container").attr("class", "col-6 col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 product-grid-item-container");
            }
        }
    });

    $(document).on("click", ".faq-header", function () {
        var status = $(this).hasClass("active");
        if (status) {
            $(this).next().slideUp("fast");
            $(this).removeClass("active");
        }
        else {
            $(this).next().slideDown("fast");
            $(this).addClass("active");
        }
    });

    //when quick view closed
    $('#quick-view-modal').on('hidden.bs.modal', function (e) {
        $(".quick-view-title").html("HIZLI BAKIŞ");
        $(".quick-view-content").html("");
        //$(".quick-view-content").mCustomScrollbar("destroy");
        $(".quick-view-content").removeAttr("style");
        $(".lg-will-remove").addClass("modal-lg");
        $(".quick-view-loading").css("display", "");
    });

    ////temp function for replace 404 image to a real image
    //$("img").each(function () {
    //    if ($(this).attr("src") == "https://inveonstorage.blob.core.windows.net/cetinkaya/Content/Images/Originals/default-image.png") {
    //        $(this).attr("src", "/Themes/Cetinkaya/Content/images/404.jpg")
    //    }
    //})

    $('.make-tooltip').tooltip();

    //$(".spec-list").mCustomScrollbar();

    //$(".store-locator-item-list").mCustomScrollbar();

    //mobile menu acordeon
    $(document).on("click", ".mobile-menu-expander", function (e) {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            var clicked = $(this)
            var parent = clicked.parent();
            var subMenu = parent.next();
            if (subMenu.length == 1) {
                var status = subMenu.css("display");
                if (status == "none") {
                    clicked.addClass("opened-icon");
                    subMenu.slideDown("fast");
                }
                else {
                    clicked.removeClass("opened-icon");
                    subMenu.removeAttr("style");
                }
            }
        }
    })
    //sizechart table
    $(".size-chart-button").on("click", function () {
        var status = $(this).parent().hasClass("active");
        if (status == true) {
            $(this).parent().removeClass("active");
        }
        else {
            $(this).parent().addClass("active");
        }
    })

    if ($(".product-detail-attributes-contaier .Beden .list-inline-item").length == 1) {
        $(".product-detail-attributes-contaier .Beden .list-inline-item .size-list-radio").trigger("click");
    }
    $(".main-menu > li >  a").each(function () {
        var haveSubMenu = $(this).next(".sub-menu-bg-container").find(".collapse-block").length;
        if (haveSubMenu == 0) {
            $(this).find(".mobile-menu-expander").remove();
        }
    })

 


    if (invTagManagerParams) {
        switch (invTagManagerParams.PageType) {
            case "Cart":
            case "AfterLoginCart":
            case "Delivery":
            case "Payment":
                $("button.mobile-menu-icon-container").addClass("mobile-menu-hidden");
                $("a.logo-link").addClass("mobile-menu-logo");
                break;
            default:
        }
    }

});
    //$('.header-text-ticker').bxSlider({
    //    mode: 'vertical',
    //    controls: false,
    //    pager: false,
    //    auto:true
    //});