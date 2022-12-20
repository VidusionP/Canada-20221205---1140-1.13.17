import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';

export const CartPreviewEvents = {
    close: 'closed.fndtn.dropdown',
    open: 'opened.fndtn.dropdown',
};

export default function () {
    const loadingClass = 'is-loading';
    const $cart = $('[data-cart-preview]');
    const $cartDropdown = $('#cart-preview-dropdown');
    const $cartLoading = $('<div class="loadingOverlay"></div>');

    function freeShippingLabel() {
        const $freeShip = 150;
        const $subTotal = Number($('.cart-subtotal').html());
        const $bar1 = $('.freeShipping-mainBar');
        const $bar2 = $('.freeShipping-sideBar');
        const $text = $('.freeShipping-text');
        if ($subTotal >= $freeShip) {
            $($bar2).css('width', '100%');
            $($bar2).append('100%');
            $($text).append("Congratulations! You've got free shipping.");
        } else if ($subTotal === 0) {
            $($text).append(`Only <span class="priceLeft">$${$freeShip}</span> away from Free Shipping!`);
            $($bar2).css('width', `${$subTotal / $freeShip * 100}%`);
            $($bar1).append('<span class=zeroShipping>0%</span>');
        } else {
            $($text).append('Only <span class="priceLeft"></span> away from Free Shipping!');
            $($bar2).append(`${($subTotal / $freeShip * 100).toFixed()}%`);
            $($bar2).css('width', `${$subTotal / $freeShip * 100}%`);
            $('.priceLeft').append(`$${($freeShip - $subTotal).toFixed(2)}`);
        }
    }

    $('body').on('cart-quantity-update', (event, quantity) => {
        $('.cart-quantity')
            .text(quantity)
            .toggleClass('countPill--positive', quantity > 0);
            freeShippingLabel();
    });

    $cart.on('click', (event) => {
        const options = {
            template: 'common/cart-preview',
        };

        // Redirect to full cart page
        //
        // https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
        // In summary, we recommend looking for the string 'Mobi' anywhere in the User Agent to detect a mobile device.
        if (/Mobi/i.test(navigator.userAgent)) {
            return event.stopPropagation();
        }

        event.preventDefault();

        $cartDropdown
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();

        utils.api.cart.getContent(options, (err, response) => {
            $cartDropdown
                .removeClass(loadingClass)
                .html(response);
            $cartLoading
                .hide();
            freeShippingLabel();
        });
    });
}
