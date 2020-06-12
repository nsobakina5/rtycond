AjaxCart.init(true, ".cart-item-count", ".wishlist-qty", ".flyout-cart");

$(function () {   
	//Set delete url to modal
	$(document).on("click", ".delete-shopping-cart-item-icon", function () {
		var url = $(this).attr("data-url");
        $(".delete-shopping-cart-item").attr("data-url", url);
        $("#removeItemModal").modal();
	});
	//Delete from mini cart
	$(document).on("click", ".delete-shopping-cart-item", function () {
		var url = $(this).attr("data-url");
		AjaxCart.removeproductfromcart(url);
    });
    //When ajax cart pop-up closed
    $('#removeItemModal').on('hidden.bs.modal', function (e) {
        displayAjaxLoading(false);
    })
})

//Ajax cart actions loading bar
function displayAjaxLoading(display) {
    if (display) {
        jQuery(".cart-ajax-loader").show("fast");
    }
    else {
        jQuery(".cart-ajax-loader").hide("fast");
    }
}