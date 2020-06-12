var AjaxCart = {
    loadWaiting: false,
    usepopupnotifications: true,
    topcartselector: '',
    topwishlistselector: '',
    flyoutcartselector: '',

    init: function (usepopupnotifications, topcartselector, topwishlistselector, flyoutcartselector) {
        this.loadWaiting = false;
        this.usepopupnotifications = usepopupnotifications;
        this.topcartselector = topcartselector;
        this.topwishlistselector = topwishlistselector;
        this.flyoutcartselector = flyoutcartselector;
    },

    setLoadWaiting: function (display) {
        displayAjaxLoading(display);
        this.loadWaiting = display;
    },

    clearcart: function (urlclear) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        jQuery.ajax({
            cache: false,
            url: urlclear,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    removeproductfromcart: function (urlremove) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);
        jQuery.ajax({
            cache: false,
            url: urlremove,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to the cart/wishlist from the catalog pages
    addproducttocart_catalog: function (urladd) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);
        jQuery.ajax({
            cache: false,
            url: urladd,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to the cart/wishlist from the product details page
    addproducttocart_details: function (urladd, formselector) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);
        $(".add-to-cart-button").addClass("adding-cart").html('<i class="fas fa-spinner fa-spin"></i><span class="align-middle ml-2">EKLENİYOR</span>');
        jQuery.ajax({
            cache: false,
            url: urladd,
            data: jQuery(formselector).serialize(),
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //example :
    //AjaxCart.addproducttocart_details_with_options('addproducttocart/details/5581/1', 'product_attribute_27=74&addtocart_5581.EnteredQuantity=3');
    addproducttocart_details_with_options: function (urladd, options) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        jQuery.ajax({
            cache: false,
            url: urladd,
            data: options,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to compare list
    addproducttocomparelist: function (urladd) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        jQuery.ajax({
            cache: false,
            url: urladd,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    setSubTotal: function () {
        var subTotal = jQuery(AjaxCart.flyoutcartselector).data('subtotal');
        var quantity = jQuery(AjaxCart.flyoutcartselector).data('count');
        jQuery('#topcartlink .cart-total').html(subTotal);
        jQuery('#topcartlink .cart-qty').html("(" + quantity + ")");

        try {
            jQuery(".badge.total_items").html(quantity);
        } catch (ex) {
            console.log(ex);
        }
    },

    success_process: function (response) {
        $(".add-to-cart-button").removeClass("adding-cart").html('<i class="fas fa-shopping-bag"></i><span class="ml-2">SEPETE EKLE</span>');
        displayAjaxLoading(false);
        if (response.updatetopcartsectionhtml) {
            jQuery(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
        }
        if (response.updatetopwishlistsectionhtml) {
            jQuery(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
        }
        if (response.updateflyoutcartsectionhtml) {
            jQuery(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
            AjaxCart.setSubTotal();
            $(".fly-out-cart-container ul").mCustomScrollbar();
            var isQuickView = $(".quick-view-control");
            if ($("#removeItemModal").length > 0)
            {
                $("#removeItemModal").modal("hide")
            }
            if (isQuickView.length > 0) {
                if (isQuickView.val()) {
                    $(".lg-will-remove").removeClass("modal-lg");
                    $(".quick-view-title").html("SEPETİM");
                    $(".quick-view-content").html(response.updateflyoutcartsectionhtml);
                    $(".quick-view-content").css("height",400).mCustomScrollbar();
                    //$('#quick-view-modal').modal('hide')
                } 
            }
            if (window.innerWidth < 1024) {
                showOverlay();
                openMobileCart();
            }
            else {
                openDesktopCart();
            }
        }
        if (response.updateInvTagParamsCartDataSet) {
            invTagManagerParams.CartDataSet = [];
            invTagManagerParams.CartDataSet = (JSON.parse(response.updateInvTagParamsCartDataSet));

            //Updating emarsys cart data.
            //emarsysHelper.setShoppingCart(invTagManagerParams.CartDataSet);
            //ScarabQueue.push(['go']);//We have to push "go" for second time just for ajax cart update.
		}

		AjaxCart.setShoppingCart();

        if (response.message) {
            //display notification
            if (response.success == true) {
                //success

				if (AjaxCart.usepopupnotifications == true) {
                    if (response.message) {
                        if (jQuery.isArray(response.message)) {
                            //displayAddedProductOnCartAfter(response);
                            //  displayPopupNotification(response.message[0], 'success', true);
                        }
                        else {
                            //displayAddedProductOnCartAfter(response);
                            // displayAddedProductOnCartAfter(response);
                            //displayPopupNotification(response.message, 'success', true);
                        }
                    }

                    if (response.product != undefined && response.product != null) {
                        //buraya kadar ürün bilgilerini getiriyorum.
                    }
                }
                else {
                    //specify timeout for success messages
                    // displayBarNotification(response.message, 'success', 3500);
                    if (window.innerWidth < 1024) {
                        showOverlay();
                        openMobileCart();
                    }
                    else {
                        openDesktopCart();
                    }
                }
            }
            else {
                //error
                if (AjaxCart.usepopupnotifications == true) {
                    if (response.message && jQuery.isArray(response.message)) {
                        //$(".ajax-cart-error-text").html(response.message[0]);
                        //$("#ajax-cart-error-modal").modal();
                        alert(response.message[0]);
                    }
                    else {
                        displayPopupNotification(response.message, 'error', true);
                    }
                }
                else {
                    //no timeout for errors
                    displayBarNotification(response.message, 'error', 0);
                }
            }
            return false;
        }
        if (response.redirect) {
            location.href = response.redirect;
            return true;
        }

        return false;
    },

    resetLoadWaiting: function () {
        AjaxCart.setLoadWaiting(false);
    },

    ajaxFailure: function () {
        alert('Failed to add the product. Please refresh the page and try one more time.');
	},

    setShoppingCart: function () {
		if (AjaxCart.checkVisilabs() && AjaxCart.checkInvTagManager()) {
		    var cart = invTagManagerParams.CartDataSet;
		    if (cart != undefined && cart != null && cart.length > 0) {
				var productSkuList = [];
			    var productIdList = [];
			    var productQuantityList = [];
			    var productPriceList = [];

			    $.each(cart, function (index, val) {
					productSkuList.push(val.sku);
				    productIdList.push(val.id);
                    productPriceList.push((val.pr * val.q).toFixed(2).toString().replace(".", ","));
				    productQuantityList.push(val.q);
			    });

			    VL.AddParameter("OM.pbid", invTagManagerParams.CustomerId);
				VL.AddParameter("OM.pb", productIdList.join(";"));
			    VL.AddParameter("OM.pu", productQuantityList.join(";"));
				VL.AddParameter("OM.ppr", productPriceList.join(";"));
			    VL.Collect();
				VL.SuggestActions();

				console.log('V-SetShoppingCart Triggered');
		    }
	    }
	},
    checkVisilabs: function () {
	    var retVal = false;

		if (typeof VL != 'undefined')
		    retVal = true;
	    else {
		    try {
			    VL = new Visilabs();
			    retVal = true;
		    } catch (e) {
			    retVal = false;
		    }
	    }

	    return retVal;
	},
    checkInvTagManager: function () {
	    var retVal = false;

	    if (invTagManagerParams != undefined && invTagManagerParams != 'undefined' && invTagManagerParams != null)
		    retVal = true;

	    return retVal;
    }
};

jQuery(document).ready(function () {
    AjaxCart.setSubTotal();
    AjaxCart.setShoppingCart();
});