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
        let stoken = $("[name=store-token]").val();
        let productIds = []

        const items = $('.cart_pids');
        const $freeShip = 100;
        const $subTotal = Number($('.cart-subtotal').html());
        const $bar1 = $('.freeShipping-mainBar');
        const $bar2 = $('.freeShipping-sideBar');
        const $text = $('.freeShipping-text');
        const $country = $('.selected_country');
        // console.log($country);
        items.each((i,item) => {
            productIds.push({"id": item.innerHTML, "quantity": item.getAttribute('data-id')})

        })
        let productIds1 = productIds.map((item) => item.id)
        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${stoken}`
            },
            body: JSON.stringify({ 
                query: `
                query productWeights {
                    site {
                      products (entityIds: [${productIds1}]) {
                        edges {
                          node {
                            entityId
                            name
                            type
                            categories{
                                edges{
                                  node{
                                    id
                                    entityId
                                    name
                                    breadcrumbs(depth:1) {
                                        edges {
                                          node {
                                            name
                                          }
                                        }
                                      }
                                  }
                                }
                              }
                            weight {
                              unit
                              value
                            }
                          }
                        }
                      }
                    }
                  }
                `              
            })
        })
        .then(r=>r.json())
        .then(r=>{
            let items = r.data.site.products.edges
            let mane = false;
            let weight = 0;
            items.forEach(item => {
                let cate = item.node.categories.edges[0].node.name
                if (cate == 'Supplies') {
                    // console.log(item.node)
                    let x = productIds.filter((item1) => item1.id == item.node.entityId)
                    let quant = x[0].quantity
                    weight += item.node.weight.value * quant
                }
                if (item.node.name.includes('Mannequin')) {
                    mane = true;
                } 
            });
            if (mane == true || weight > 3) {
                $($bar2).css({'width': '100%', 'background-color':'#707070'});
                $($bar2).append('0%');
                $($text).append("You do not qualify for free shipping.");

            } 
            else if ($subTotal >= $freeShip && mane == false && weight < 3) {
                $($bar2).css('width', '100%');
                $($bar2).append('100%');
                $($text).append("Congratulations! You've got free shipping.");
            } else if ($subTotal === 0 && mane == false && weight < 3) {
                $($text).append(`Only <span class="priceLeft">$${$freeShip}</span> away from Free Shipping!`);
                $($bar2).css('width', `${$subTotal / $freeShip * 100}%`);
                $($bar1).append('<span class=zeroShipping>0%</span>');
            } else if (mane == false && weight < 3) {

                $($text).append('Only <span class="priceLeft"></span> away from Free Shipping!');
                $($bar2).append(`${($subTotal / $freeShip * 100).toFixed()}%`);
                $($bar2).css('width', `${$subTotal / $freeShip * 100}%`);
                $('.priceLeft').append(`$${($freeShip - $subTotal).toFixed(2)}`);
            }
        })
    }

    $('body').on('cart-quantity-update', (event, quantity) => {
        $('.cart-quantity')
            .text(quantity)
            .toggleClass('countPill--positive', quantity > 0);
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
