var consoleActive = true;

jQuery(document).ready(function () {
    //delivery
    if (jQuery('#SameAddress').is(':checked')) {
        jQuery('#newbillingaddress').hide();
    }
    jQuery(document).on('change', '#SameAddress', function () {
        if (jQuery('.same-address-wrapper #SameAddress').is(':checked')) {
            jQuery('#newbillingaddress').hide();
        }
        else {
            jQuery('#newbillingaddress').show();
        }
    });
    jQuery('#billingaddress').on('click', 'li', function () {
        jQuery('#BillingAddressId').val(jQuery(this).data('id'));
    });
    jQuery('#shippingaddress').on('click', 'li', function () {
        jQuery('#ShippingAddressId').val(jQuery(this).data('id'));
    });
});

function BukoliAddressCreateJson_OnComplete(context) {
    var JsonAdd = context.responseText;
    var JsonObject = eval("(" + JsonAdd + ")");

    if (JsonObject.Success) {
        jQuery('#shippingaddress').html(JsonObject.ShippingAddressHtml);
        jQuery('#billingaddress').html(JsonObject.BillingAddressHtml);
        jQuery.fancybox.close();
        updateAddressDropdownSetId(JsonObject.Id);

        jQuery('.shipping-arrow i').removeClass('fa-sort-asc').addClass('fa-sort-desc');
        jQuery('.billing-arrow i').removeClass('fa-sort-asc').addClass('fa-sort-desc');
        jQuery('.shipping-arrow').show();

        jQuery('#form-submit').show();
        jQuery('.checkout-submit').show();
    }
    else {
        $('.new-address-form-container').html(JsonObject.Html);
        //initCompanyFields();

        InitAddressFields();
    }
}

function AddressNewJson_OnComplete(context) {
    var JsonAdd = context.responseText;
    var JsonObject = eval("(" + JsonAdd + ")");
    $(".address-list-loading").removeAttr("style");
    $(".hide-new-address-form").removeAttr("style");
    $('.new-address-form-container').html(JsonObject.Html);
    $(".toggle-checkout-addres-form").slideDown("fast");
    scrollTo("scroll-to-new-address");
    InitAddressFields();
}

function HideNewAddresForm() {
    $(".toggle-checkout-addres-form").css("display", "none")
    $(".new-address-form-container").html("");
    $(".hide-new-address-form").css("display", "none")
    scrollTo("scroll-to-address-selection");
    scrollAddressListToSelectedShipment();
}

function AddressCreateJson_OnComplete(context) {
    var JsonAdd = context.responseText;
    var JsonObject = eval("(" + JsonAdd + ")");

    if (JsonObject.Success) {
        $(".new-address-list tr").remove();
        $('.new-address-list tbody').html(JsonObject.ShippingAddressHtml);
        setAddressWithId(JsonObject.Id);
        HideNewAddresForm();
    }
    else {
        $('.new-address-form-container').html(JsonObject.Html);
        //initCompanyFields();
        InitAddressFields();
    }
}
function AddressEditJson_OnBegin() {
    showAddressLoading();
}
function AddressEditJson_OnComplete(context) {
    var JsonAdd = context.responseText;
    var JsonObject = eval("(" + JsonAdd + ")");

    if (JsonObject.Success) {
        $(".address-list-loading").removeAttr("style");
        $(".hide-new-address-form").removeAttr("style");
        $('.new-address-form-container').html(JsonObject.Html);
        $(".toggle-checkout-addres-form").slideDown("fast");
        scrollTo("scroll-to-new-address");
        //InitAddressFields();
    }
    else {
        console.log("error");
    }
}
function AddressUpdateJson_OnComplete(context) {
    var JsonAdd = context.responseText;
    var JsonObject = eval("(" + JsonAdd + ")");

    if (JsonObject.Success) {
        $(".address-loading").removeAttr("style");
        $(".new-address-list tr").remove();
        $('.new-address-list tbody').html(JsonObject.ShippingAddressHtml);
        setAddressWithId(JsonObject.BillingAddressId);
        HideNewAddresForm();
    }
    else {
        console.log("error");
    }
}

function prepareSelectpicker() {
    if (jQuery.selectpicker != undefined && jQuery.selectpicker != null && jQuery(".selectpicker").length > 0) {
        jQuery('.selectpicker').selectpicker();
    }
}
function AddressDeleteJson_OnBegin() {
    return true;
}
function AddressDeleteJson_OnComplete(context) {
    var JsonAdd = context.responseText;
    var JsonObject = eval("(" + JsonAdd + ")");
    $(".new-address-list tr").remove();
    $('.new-address-list tbody').html(JsonObject.ShippingAddressHtml);
    //adres listesi güncellendikten sonra daha önce seçili olan adreslerin tekrar seçilmesi
    firstLoadCheck();
    scrollAddressListToSelectedShipment();

    //if (JsonObject.ShippingAddressCount < 1) {
    //    jQuery('.shipping-selected').empty();
    //    jQuery('.shipping-selected').append('<span class="bold color4b block fs14 spacer30">Yeni Teslimat Noktası Ekleyin</span>');
    //    jQuery('.shipping-arrow').hide();

    //    jQuery('#form-submit').hide();
    //    jQuery('.checkout-submit').hide();
    //}
}
function InitAddressFields() {
    jQuery('.iCheck-helper').click(function () {
        if (jQuery(this).prev().val() == 'True') {
            jQuery('.NewShippingAddress-company').show();
            jQuery('.NewShippingAddress-tc').hide();
        }
        else {
            jQuery('.NewShippingAddress-company').hide();
            jQuery('.NewShippingAddress-tc').show();
        }
        jQuery.fancybox.update();
    });
    jQuery('.iCheck-helper').click(function () {
        if (jQuery(this).prev().val() == 'True') {
            jQuery('.NewBillingAddress-company').show();
            jQuery('.NewBillingAddress-tc').hide();
        }
        else {
            jQuery('.NewBillingAddress-company').hide();
            jQuery('.NewBillingAddress-tc').show();
        }
        jQuery.fancybox.update();
    });
    jQuery('.iCheck-helper').click(function () {
        if (jQuery(this).prev().val() == 'True') {
            jQuery('.Address-company').show();
            jQuery('.Address-tc').hide();
        }
        else {
            jQuery('.Address-company').hide();
            jQuery('.Address-tc').show();
        }
        jQuery.fancybox.update();
    });
};

/*--------------------------------------------------------*/

var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

var letters = 'ABCDEFGHIJKLMNÿOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyzàáÿÿéèÿÿíìÿÿïÿóòÿÿúùÿÿ';
var trletters = 'ÇçÖöŞşĞğÜüİi????ı';
var numbers = '1234567890';
var signs = ',.:;@-\'';
var mathsigns = '+-=()*/';
var custom = '<>#$%&?¿';

function alpha(e, allow) {
    var k;
    k = document.all ? parseInt(e.keyCode) : parseInt(e.which);
    var tabc = 0;
    if (navigator.userAgent.indexOf('Opera') > -1) { tabc = 9; }
    if (k != 8 && k != tabc) {
        return (allow.indexOf(String.fromCharCode(k)) != -1);
    }
    else { return true; }
}