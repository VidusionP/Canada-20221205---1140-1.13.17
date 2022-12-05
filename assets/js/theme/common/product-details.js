import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.reveal';
import ImageGallery from '../product/image-gallery';
import modalFactory from '../global/modal';
import _ from 'lodash';
import swal from 'sweetalert2';

export default class ProductDetails {
    constructor($scope, context, productAttributesData = {}) {
        this.$overlay = $('[data-cart-item-add] .loadingOverlay');
        this.$scope = $scope;
        this.context = context;
        this.imageGallery = new ImageGallery($('[data-image-gallery]', this.$scope));
        this.imageGallery.init();
        this.listenQuantityChange();
        this.initRadioAttributes();
        this.$hasSoldOut = false;
        this.$pSKUList = [];
        this.$poSKUList = [];
        this.$pCurrent = null;
        this.$allureException = ['coco', 'rose', 'adele', 'angelina', 'jessica', 'selena', 'taylor', 'julia', 'nicole', 'gwyneth', 'ev7914', 'tl6814', 'ev5714', 'mo5514', 'mo7608', 'ev5512', 'ev5706', 'ev6810', 'eg6612', 'eh16', 'mh2206', 'sh5206', 'ep3608', 'mh2216', 'maya', 'noya'];
        this.$cart = null;
        this.$productAttributesData = productAttributesData;
        this.$pOptions=[];
        this.$pOptionSet=[];

        const $form = $('form[data-cart-item-add]', $scope);
        const $productOptionsElement = $('[data-product-option-change]', $form);
        const hasOptions = $productOptionsElement.html()?$productOptionsElement.html().trim().length:0;

        let $this = this;
        $(".shipping-time").on("click", function() {
            $this.showShipmentSchedule();
        });
        $("#deliverModal .modal-close").on("click", function() {
            $this.closeShipmentSchedule();
        });
        $(".pv-delivery-detail").on("click", function() {
            $("[del-overlay]").remove();
            $("#delivery-exp").before(`<div del-overlay class="modal-background" style="display: block;"></div>`);
            $("#delivery-exp").css({
                display: "block",
                opacity: 1,
                visibility: "visible"
            })
            $("[del-overlay]").on("click", function() {
                $this.closeDeliveryDetail();
            })
        });
        
        $("#delivery-exp .modal-close").on("click", function() {
            $this.closeDeliveryDetail();
        })

        $productOptionsElement.change(event => {
            this.productOptionsChanged(event);
        });

        $form.submit(event => {
            this.addProductToCart(event, $form[0]);
        });

        // Update product attributes. If we're in quick view and the product has options,
        // then also update the initial view in case items are oos
        if (_.isEmpty(productAttributesData) && hasOptions) {
            const $productId = $('[name="product_id"]', $form).val();
            this.getCart(productAttributesData);
            utils.api.productAttributes.optionChange($productId, $form.serialize(), (err, response) => {
                const attributesData = response.data || {};

                this.updateProductAttributes(attributesData);
                this.updateView(attributesData);
                this.$productAttributesData = attributesData;
            });
        } else {
            // this.updateProductAttributes(productAttributesData);
            this.initProductAttributes(productAttributesData);
            this.getCart(productAttributesData);

            if (this.$hasSoldOut) {
                // $(".btn-book").show();
                $(".btn-book-more").show();
            }
        }

        if (hasOptions) {
            $(".pv-option-section[options]").show();
        } else {
            $(".pv-stock-info").addClass("no-border");
        }
        $productOptionsElement.show();

        this.previewModal = modalFactory('#previewModal')[0];
    }

    closeDeliveryDetail() {
        $("[del-overlay]").remove();
        let $el = $("#delivery-exp");
        $el.css({
            display: "none",
            opacity: 0,
            visibility: "hidden"
        })
    }

    /**
     * @summary Get the current cart data and then start getting Earlist ship out list
     * 
     * @param {json} attributesData Init option data
     * @param {boolean} hasOptions True if this product has options, or else false
     */
     getCart(attributesData, hasOptions=true) {
        utils.api.cart.getCart({}, (err,response)=>{
            if (err) {
                // if (hasOptions) {
                //     this.getTeamdeskInventoryList(attributesData);
                // } else {
                //     this.getTeamdeskInventoryBySKU(attributesData);
                // }
                return;
            }
            this.$pCurrent = attributesData;
            this.$cart = response;
            // if (hasOptions) {
            //     this.getTeamdeskInventoryList(attributesData);
            // } else {
            //     this.getTeamdeskInventoryBySKU(attributesData);
            // }
            this.getProductSKU();
        })
    }


    /**
     * Since $productView can be dynamically inserted using render_with,
     * We have to retrieve the respective elements
     *
     * @param $scope
     */
    getViewModel($scope) {
        return {
            $priceWithTax: $('[data-product-price-with-tax]', $scope),
            $rrpWithTax: $('[data-product-rrp-with-tax]', $scope),
            $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
            $rrpWithoutTax: $('[data-product-rrp-without-tax]', $scope),
            $weight: $('.productView-info [data-product-weight]', $scope),
            $increments: $('.form-field--increments :input', $scope),
            $addToCart: $('#form-action-addToCart', $scope),
            $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
            stock: {
                $container: $('.form-field--stock', $scope),
                $input: $('[data-product-stock]', $scope),
            },
            $sku: $('[data-product-sku]'),
            $upc: $('[data-product-upc]'),
            quantity: {
                $text: $('.incrementTotal', $scope),
                $input: $('[name=qty\\[\\]]', $scope),
            },
        };
    }

    /**
     * Checks if the current window is being run inside an iframe
     * @returns {boolean}
     */
    isRunningInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    /**
     *
     * Handle product options changes
     *
     */
    productOptionsChanged(event) {
        const $changedOption = $(event.target);
        const $form = $changedOption.parents('form');
        const productId = $('[name="product_id"]', $form).val();

        // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
        if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
            return;
        }

        utils.api.productAttributes.optionChange(productId, $form.serialize(), (err, response) => {
            const productAttributesData = response.data || {};

            this.$productAttributesData = productAttributesData;

            this.updateProductAttributes(productAttributesData);
            this.updateView(productAttributesData);
            this.updateDeliverTime(productAttributesData);
        });
    }

    showProductImage(image) {
        if (_.isPlainObject(image)) {
            const zoomImageUrl = utils.tools.image.getSrc(
                image.data,
                this.context.themeSettings.zoom_size,
            );

            const mainImageUrl = utils.tools.image.getSrc(
                image.data,
                this.context.themeSettings.product_size,
            );

            this.imageGallery.setAlternateImage({
                mainImageUrl,
                zoomImageUrl,
            });
        } else {
            this.imageGallery.restoreImage();
        }
    }

    /**
     *
     * Handle action when the shopper clicks on + / - for quantity
     *
     */
    listenQuantityChange() {
        let isInput = false;
        this.$scope.on('keydown', '[data-quantity-change] input', (event) => {
            if (event.keyCode === 13) {
                isInput = true;
            }
        })

        this.$scope.on('click', '[data-quantity-change] button', (event) => {
            event.preventDefault();
            const $target = $(event.currentTarget);
            const viewModel = this.getViewModel(this.$scope);
            const $input = viewModel.quantity.$input;
            const quantityMin = parseInt($input.data('quantity-min'), 10);
            const quantityMax = parseInt($input.data('quantity-max'), 10);

            let qty = parseInt($input.val(), 10);

            // If action is incrementing
            if ($target.data('action') === 'inc') {
                // If quantity max option is set
                if (quantityMax > 0) {
                    // Check quantity does not exceed max
                    if ((qty + 1) <= quantityMax) {
                        qty++;
                    }
                } else {
                    qty++;
                }
            } else if (isInput) {
                isInput = false;
                if (qty<quantityMin && quantityMin>0) {
                    qty = quantityMin;
                } else if (qty>quantityMax && quantityMax>0) {
                    qty = quantityMax;
                } else if (qty<=0) {
                    qty = 1;
                }
            } else if (qty > 1) {
                // If quantity min option is set
                if (quantityMin > 0) {
                    // Check quantity does not fall below min
                    if ((qty - 1) >= quantityMin) {
                        qty--;
                    }
                } else {
                    qty--;
                }
            }

            // update hidden input
            viewModel.quantity.$input.val(qty);
            // update text
            viewModel.quantity.$text.text(qty);

            if (this.$pCurrent) {
                this.updateDeliverTime(this.$pCurrent);
            }

        });
    }

    /**
     *
     * Add a product to cart
     *
     */
    addProductToCart(event, form) {
        const $addToCartBtn = $('#form-action-addToCart', $(event.target));
        const originalBtnVal = $addToCartBtn.val();
        const waitMessage = $addToCartBtn.data('waitMessage');

        // Do not do AJAX if browser doesn't support FormData
        if (window.FormData === undefined) {
            return;
        }

        // Prevent default
        event.preventDefault();

        $addToCartBtn
            .val(waitMessage)
            .prop('disabled', true);

        this.$overlay.show();

        // Add item to cart
        utils.api.cart.itemAdd(new FormData(form), (err, response) => {
            const errorMessage = err || response.data.error;

            $addToCartBtn
                .val(originalBtnVal)
                .prop('disabled', false);

            this.$overlay.hide();

            // Guard statement
            if (errorMessage) {
                // Strip the HTML from the error message
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;

                return swal({
                    text: tmp.textContent || tmp.innerText,
                    type: 'error',
                });
            }

            // Open preview modal and update content
            if (this.previewModal) {
                this.previewModal.open();

                this.updateCartContent(this.previewModal, response.data.cart_item.hash);
            } else {
                this.$overlay.show();
                // if no modal, redirect to the cart page
                this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
            }
        });
    }

    /**
     * Get cart contents
     *
     * @param {String} cartItemHash
     * @param {Function} onComplete
     */
    getCartContent(cartItemHash, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemHash,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }

    /**
     * Redirect to url
     *
     * @param {String} url
     */
    redirectTo(url) {
        if (this.isRunningInIframe() && !window.iframeSdk) {
            window.top.location = url;
        } else {
            window.location = url;
        }
    }

    /**
     * Update cart content
     *
     * @param {Modal} modal
     * @param {String} cartItemHash
     * @param {Function} onComplete
     */
    updateCartContent(modal, cartItemHash, onComplete) {
        this.getCartContent(cartItemHash, (err, response) => {
            if (err) {
                return;
            }

            modal.updateContent(response);

            // Update cart counter
            const $body = $('body');
            const $cartQuantity = $('[data-cart-quantity]', modal.$content);
            const $cartCounter = $('.navUser-action .cart-count');
            const quantity = $cartQuantity.data('cart-quantity') || 0;

            $cartCounter.addClass('cart-count--positive');
            $body.trigger('cart-quantity-update', quantity);

            if (onComplete) {
                onComplete(response);
            }
        });
        utils.api.cart.getCart({}, (err,response)=>{
            if (err) {                
                return;
            }
            this.$cart = response;

            // $(".del-btn-wrap").remove();
            // $(".del-select-wrap").remove();
            // $(".del-content-wrap").remove();
            // $(".del-content-see-more").remove();
            $(".delivery-content-wrap").html("");
            this.setEarliestTime();

            this.updateDeliverTime(this.$productAttributesData);
        })

    }

    /**
     * Show an message box if a message is passed
     * Hide the box if the message is empty
     * @param  {String} message
     */
    showMessageBox(message) {
        const $messageBox = $('.productAttributes-message');

        if (message) {
            $('.alertBox-message', $messageBox).text(message);
            $messageBox.show();
        } else {
            $messageBox.hide();
        }
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     */
    updatePriceView(viewModel, price) {
        if (price.with_tax) {
            viewModel.$priceWithTax.html(price.with_tax.formatted);
        }

        if (price.without_tax) {
            viewModel.$priceWithoutTax.html(price.without_tax.formatted);
        }

        if (price.rrp_with_tax) {
            viewModel.$rrpWithTax.html(price.rrp_with_tax.formatted);
        }

        if (price.rrp_without_tax) {
            viewModel.$rrpWithoutTax.html(price.rrp_without_tax.formatted);
        }
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     */
    updateView(data) {
        const viewModel = this.getViewModel(this.$scope);

        this.showMessageBox(data.stock_message || data.purchasing_message);

        if (_.isObject(data.price)) {
            this.updatePriceView(viewModel, data.price);
        }

        if (_.isObject(data.weight)) {
            viewModel.$weight.html(data.weight.formatted);
        }

        // Set variation_id if it exists for adding to wishlist
        if (data.variantId) {
            viewModel.$wishlistVariation.val(data.variantId);
        }

        // If SKU is available
        if (data.sku) {
            viewModel.$sku.text(data.sku);
        }

        // If UPC is available
        if (data.upc) {
            viewModel.$upc.text(data.upc);
        }

        // if stock view is on (CP settings)
        if (viewModel.stock.$container.length && _.isNumber(data.stock)) {
            // if the stock container is hidden, show
            viewModel.stock.$container.removeClass('u-hiddenVisually');

            // viewModel.stock.$input.text(data.stock);
        }

        if (!data.purchasable || !data.instock) {
            viewModel.$addToCart.prop('disabled', true);
            viewModel.$increments.prop('disabled', true);
        } else {
            viewModel.$addToCart.prop('disabled', false);
            viewModel.$increments.prop('disabled', false);
        }
    }
    
    /**
     * @summary Get Incoming Quantity and Time from PO  List
     *      
     * @param {integer} qty How many we would like to check
     * @param {integer} inItems PO List of same SKU 
     * @param {boolean} strict If strict will return null if it could not cover the qty
     * @param {integer} buff Total existent quantity in current cart
     * @returns {json} Returns Quantity Incoming that we will use and index of PO
     */
     getIncomingTime(qty, inItems, strict=true, buff=0) {
        let i = -1;
        let qPO = -2-buff;        
        while (qPO<qty && i<inItems.length-1) {
            i++;
            qPO+=inItems[i]["Incoming Quantity"];            
        }
        if (strict) {
            if (qPO>=qty && i<inItems.length) {
                return {
                    qPO,
                    i
                }
            } else {
                return null;
            }
        } else {
            return {
                qPO,
                i
            }
        }        
    }

    setInstockAlert() {
        if (this.$pOptionSet.length>0) {
            let colorIdx = null, greyIdx=null;
            let content = "", $this= this;            
            for (let [idx, op] of this.$pOptionSet.entries()) {
                if (op.node.values) {                    
                    let displayName = op.node.displayName.toLowerCase();
                    if (displayName.includes("color")==false && displayName.includes("grey")==false) continue;
                    if (displayName.includes("color")) {
                        colorIdx=idx;                        
                    } else {
                        greyIdx = idx;
                    }
                    content+=`<div class="find-select-wrapper" ${displayName.includes("grey")?" grey style='display:none'":""}><label class="find-select-label">${op.node.displayName}</label><select class="find-select select-notify" data-id="${op.node.entityId}" ${displayName.includes("color")?"color":"grey"}><option data-checked=true>${op.node.displayName}</option> `
                    for (let value of op.node.values.edges) {
                        content+=`<option data-id="${value.node.entityId}" value="${value.node.entityId}" data-label="${value.node.label}">${value.node.label}</option>`;
                    }                    
                    content+="</select></div>";
                }                
            }            
            $("#custom-alert .modal-body [content]").html(content);  
            $(".btn-book-wrap").show();            
            $(".pv-fav-section").addClass("grid");                        
            if ($("#custom-alert select[grey]").length>0) {
                $("#custom-alert select[color]").on("change", function() {                                                             
                    // for (let el of Array.from($("#custom-alert select[grey] option"))) {
                    //     $(el).text($(el).data("label"));
                    //     $(el).prop("disabled", false);
                    //     $(el).css({color: "#000"});                    
                    // }
                    Array.from($("#custom-alert select[grey]").find("option")).forEach(el=>{
                        $(el).text($(el).data("label"));
                        $(el).css({color:"#000"});
                        $(el).prop("disabled", false);
                        if ($(el).attr("data-id")) {
                            $(el).removeAttr("data-checked");
                        }
                    });
                    $("#custom-alert .find-select-wrapper[grey]").show();

                    let variants = $this.$pOptions.filter(variant => {
                        if (variant.options) {
                            return variant.options.filter(op=>op.attrId==$(this).data("id") && op.attrValue==$(this).val()).length>0
                        }
                    });                    
                    for (let variant of variants) {                        
                        let $el = $(`#custom-alert select[grey] option[data-id=${variant.options[greyIdx].attrValue}]`);
                        $el.attr("data-checked",true);
                        let label = $el.text();
                        let sku = $this.$pSKUList.find(item=>item.SKU.toLowerCase() == variant.sku.toLowerCase());
                        if (sku) {
                            if (sku["Available Quantity"]>0) {            
                                // console.log(sku);
                                $el.text(label + ` (${sku["Available Quantity"]} in stock)`);
                                $el.prop("disabled", true);
                                $el.css({color: "#ccc"});                                
                            } else if (sku["Available Quantity"]<=0 && Number(sku["Virtual Quantity"])==0) {
                                $el.text(label + ` (Non-stock color option)`);
                                $el.prop("disabled", true);
                                $el.css({color: "#ccc"});                                
                            } else {                                
                            }
                        } else {
                            $el.text(label + ` (Non-stock color option)`);
                            $el.prop("disabled", true);
                            $el.css({color: "#ccc"});                            
                        }
                    }
                    Array.from($("#custom-alert select[grey]").find("option")).forEach(el=>{
                        if ($(el).attr("data-checked")==undefined){
                            let label = $(el).text();
                            $(el).text(label + ` (Non-stock color option)`);
                            $(el).prop("disabled", true);
                            $(el).css({color: "#ccc"});
                        }                         
                    });
                })                
            } else {                                
                for (let variant of $this.$pOptions) {                    
                    if (variant.options) {
                        let $el = $(`#custom-alert select[color] option[data-id=${variant.options[colorIdx].attrValue}]`);                        
                        $el.attr("data-checked",true);
                        let label = $el.text();
                        let sku = $this.$pSKUList.find(item=>item.SKU.toLowerCase() == variant.sku.toLowerCase());                        
                        if (sku) {
                            if (sku["Available Quantity"]>0) {            
                                // console.log(sku);
                                $el.text(label + ` (${sku["Available Quantity"]} in stock)`);
                                $el.prop("disabled", true);
                                $el.css({color: "#ccc"});                                
                            } else if (sku["Available Quantity"]<=0 && Number(sku["Virtual Quantity"])==0) {
                                $el.text(label + ` (Non-stock color option)`);
                                $el.prop("disabled", true);
                                $el.css({color: "#ccc"});                                
                            } else {                                
                            }
                        } else {
                            $el.text(label + ` (Non-stock color option)`);
                            $el.prop("disabled", true);
                            $el.css({color: "#ccc"});                            
                        }
                    }
                }
                Array.from($("#custom-alert select[color]").find("option")).forEach(el=>{
                    if ($(el).attr("data-checked")==undefined){
                        let label = $(el).text();
                        $(el).text(label + ` (Non-stock color option)`);
                        $(el).prop("disabled", true);
                        $(el).css({color: "#ccc"});
                    }                         
                });
            }
            $("#custom-alert .find-btn-apply").on("click", function() {
                let option = $this.$pOptions.filter(variant => {
                    if (variant.options) {
                        return variant.options.filter(op=>op.attrId==$("#custom-alert select[color]").data("id") && op.attrValue==$("#custom-alert select[color]").val()).length>0
                    }
                });
                if ($("#custom-alert select[grey]").length>0) {
                    option = option.filter(variant => {
                        if (variant.options) {
                            return variant.options.filter(op=>op.attrId==$("#custom-alert select[grey]").data("id") && op.attrValue==$("#custom-alert select[grey]").val()).length>0
                        }
                    });
                }
                if (option.length>0) {
                    fetch('//shp-webserver.glitch.me/add-teamdesk', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            table: 't_447395',
                            body: [{
                                "Type": "Wish List -- In Stock Alert",
                                "Order Status": "Wish List on hold",
                                "Items": option[0].sku,
                                "Request Quantity": $("#custom-alert .find-quantity").val(),
                                "SKU": option[0].sku,
                                "Notes": $("h1.productView-title").text()+"\nRequest sent from www.superhairpieces.com",
                                "Email": $("[name=customer_email]").val(),
                                "Men's Grey Hair Percentage": $("#custom-alert select[grey]").length>0?$("#custom-alert select[grey] option:selected").text():null,
                                "Client Full Name": $("[name=customer_name]").val(),
                                "Client Cell Phone": $("[name=customer_phone]").val(),
                                "Men's Hair Color": $("#custom-alert select[color] option:selected").text()
                            }]
                        })
                    })
                    .then(r=>r.json())
                    .then(d=>{
                        if (d.length>0) {
                            if (d[0].status == 201) {
                                let content = `<style>
                                .sign-done {
                                    text-align: center;
                                    margin-top: 35px;
                                    text-transform: uppercase;        
                                    font-size: 1.4rem;
                                }
                                </style>
                                <div class="sign-done">sign up successfully</div>`;
                                $("#custom-alert .modal-body").html(content);
                            } else {
                                swal({
                                    text: 'Could not create your record. Please try again or contact us.',
                                    type: 'info',
                                });
                            }
                        } else {
                            swal({
                                text: 'Could not send your record. Please try again or contact us.',
                                type: 'info',
                            });
                        }                        
                    })
                    .catch(e=>{
                        console.log(e);                        
                        swal({
                            text: 'Error happened. Please try again or contact us.',
                            type: 'info',
                        });
                    })      
                }                
            })           
        }
    }

    showInStockAlert() {
        let $this = this;
        $("[del-overlay]").remove();
        $("#custom-alert").before(`<div del-overlay class="modal-background" style="display: block;"></div>`);
        $("#custom-alert").css({
            display: "block",
            opacity: 1,
            visibility: "visible"
        })
        $("[del-overlay]").on("click", function() {
            $this.closeInStockAlert();
        })
    }

    closeInStockAlert() {
        $("[del-overlay]").remove();
        let $el = $("#custom-alert");
        $el.css({
            display: "none",
            opacity: 0,
            visibility: "hidden"
        })
    }

    /**
     * Show Shop by Ship out time
     */
     showShipmentSchedule() {
        let $this = this;
        $("[del-overlay]").remove();
        $("#deliverModal").before(`<div del-overlay class="modal-background" style="display: block;"></div>`);
        $("#deliverModal").css({
            display: "block",
            opacity: 1,
            visibility: "visible"
        })
        .attr("data-add",Number($(".countPill.cart-quantity").text()))
        .attr("data-init",Number($(".countPill.cart-quantity").text()));
        $("[del-overlay]").on("click", function(event) {
            $this.closeShipmentSchedule()
        })
    }

    /**
     * Close Shop by Ship out time
     */
    closeShipmentSchedule() {
        $("[del-overlay]").remove();
        let $el = $("#deliverModal");
        $el.css({
            display: "none",
            opacity: 0,
            visibility: "hidden"
        })
        if ($el.attr("data-add")!=$el.attr("data-init")) {
            $("body").trigger('cart-quantity-update', $("#deliverModal").attr("data-add"));        
            utils.api.cart.getCart({}, (err,response)=>{
                if (err) {                
                    return;
                }
                this.$cart = response;

                $(".delivery-content-wrap").html("");
                this.setEarliestTime();

                this.updateDeliverTime(this.$productAttributesData);
            })
        }        
    }

    /**
     * Set filter section for Shop by ship out time
     */
     setShipmentFilter() {               
        let $this = this; 
        if (this.$pOptionSet.length>0) {            
            let content = "";            
            if ($("body").width()<=558) {                
                for (let op of this.$pOptionSet) {
                    if (op.node.values) {
                        content+=`<select class="form-select form-select--small" data-id="${op.node.entityId}"><option>${op.node.displayName}</option> `
                        for (let value of op.node.values.edges) {
                            content+=`<option data-id="${value.node.entityId}" value="${value.node.entityId}">${value.node.label}</option>`;
                        }                    
                        content+="</select>";
                    }                
                }                
            } else {
                content+=`<div class="item"><b>Filter:</b></div>`;
                for (let op of this.$pOptionSet) {
                    if (op.node.values) {
                        content+=`<div class="item">
                            <div class="selector" filter="true" data-id="${op.node.entityId}" data-label="${op.node.displayName}">${op.node.displayName}</div>`
                        content+=`<div class="item-list">`;
                        content+=`<div class="disabled">${op.node.displayName}</div>`;
                        for (let value of op.node.values.edges) {
                            content+=`<div data-id="${value.node.entityId}">${value.node.label}</div>`;
                        }
                        content+=`</div></div>`;
                    }                
                }
                $(".delivery-filter").addClass("flex");
            }
            $(".delivery-filter").html(content);
            function onFilter(attr) {
                $(".delivery-content-wrap .delivery-container").show();
                if ($(".delivery-filter .selector").length==0) {
                    $(".delivery-content-wrap .delivery-container").eq(0).hide();
                }
                $(".delivery-row").show();
                $(".delivery-container[no-content]").remove();
                if (attr.length>0) {
                    $(".delivery-row").hide();
                    $(".delivery-row.delivery-header").show();
                    $(`.delivery-row${attr}`).show();
                    for (let container of $(".delivery-content-wrap .delivery-container")) {
                        if ($(container).find(".delivery-row:visible").length==0) {
                            $(container).hide();
                        }
                    }                        
                    if ($(".delivery-content-wrap .delivery-container:visible").length==1) {
                        $(".delivery-content-wrap .delivery-container:visible").after(`
                        <div class="delivery-container" no-content>
                            <strong style="color:#B12704">Your option is temporary out of stock. </strong><span>We are working hard to be back in stock as soon as possible.</span>
                        </div>
                        `)
                    }
                }
            }
            if ($(".delivery-filter .selector").length>0) {
                function filter() {                    

                    let attr = "";                    
                    for (let filter of $(".delivery-filter .item .selector")){                        
                        if ($(filter).attr("value-id")) {
                            attr+=`[attribute-${$(filter).data("id")}=${$(filter).attr("value-id")}]`;   
                        }                        
                    }                    
                    //[attribute-6618=6452]   
                    onFilter(attr);                 
                }
                $("#deliverModal").on("click", function(event) {                    
                    if ($(event.target).hasClass("selector") && $(event.target).attr("filter")) {                    
                        let $list = $(event.target).parent().find(".item-list");
                        if ($list.is(":visible")) {
                            $list.hide();
                            return;
                        }
                        $(".delivery-filter .item-list:visible").hide();
                        if ($(event.target).parent().position().left>$("#deliverModal").width()/2) {
                            $list.css({right:0, left: "unset"});
                        } else {
                            $list.css({left:0, right: "unset"});
                        }
                        $list.show();
                    } else {                        
                        $(".item-list").hide();
                        if ($(event.target).parent(".item-list").length>0) {
                            if ($(".delivery-filter-clear").is(":hidden")) {
                                $(".delivery-filter-clear").show();
                            }
                            $(event.target).parent().parent(".item").find(".selector").attr("value-id",$(event.target).data("id"));
                            $(event.target).parent().parent(".item").find(".selector").text($(event.target).text());
                            filter();
                        }
                    }
                });                
            } else {
                function filter() {                    

                    let attr = "";                    
                    for (let filter of $(".delivery-filter select")){                                                
                        if ($(filter).find("option:selected").data("id")) {
                            attr+=`[attribute-${$(filter).data("id")}=${$(filter).val()}]`;   
                        }                        
                    }                    
                    //[attribute-6618=6452]   
                    onFilter(attr);                 
                }
                $(".delivery-filter select").on("change", function() {
                    if ($(".delivery-filter-clear").is(":hidden")) {
                        $(".delivery-filter-clear").show();
                    }
                    filter();
                })
            }

            $(".delivery-filter-clear").on("click", function() {
                $(".delivery-content-wrap .delivery-container").show();
                if ($(".delivery-filter .selector").length==0) {
                    $(".delivery-content-wrap .delivery-container").eq(0).hide();
                }
                $(".delivery-row").show();
                $(".delivery-container[no-content]").remove();
                if ($(".delivery-filter .selector").length>0) {
                    for (let filter of Array.from($(".delivery-filter .selector"))) {
                        $(filter).text($(filter).data("label"));
                    }
                } else {
                    for (let filter of Array.from($(".delivery-filter select"))) {
                        $(filter).val($(filter).find("option:first").val());
                    }
                }
                $(this).hide();
            })
        }
    }

    /**
     * Getting variants from product
     * 
     * @param {int} limit Limitation of variants
     * @param {string} cursor The cursor for paging
     * @param {json} result The result to hold data
     */
    getProductVariant(limit=250,cursor=null, result=null) {
        let stoken = $("[storefront-token]").val();
        let productId = $("[name=product_id]").val();

        fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${stoken}`
            },
            body: JSON.stringify({ 
                query: `
                query productById {
                    site {
                        product (entityId: ${productId}) {    
                            sku                    
                            name
                            productOptions {
                                ...OptionFields
                            }
                            variants (first: 250, isPurchasable: true, after:"${cursor}") {
                                edges {
                                    cursor
                                    node {
                                        sku
                                        productOptions {
                                            ...OptionFields
                                        }
                                        defaultImage {
                                            url(width: 500, height: 500)
                                        }
                                        inventory {
                                            isInStock
                                            aggregated {
                                                availableToSell
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                fragment OptionFields on ProductOptionConnection {
                    edges {
                        node {
                            entityId
                            displayName                                                    
                            ... on MultipleChoiceOption {
                                values {
                                    edges {
                                        node {
                                            entityId
                                            label                                                                    
                                        }
                                    }
                                }
                            }
                        }
                    }
                }`                
            })
        })
        .then(r=>r.json())
        .then(r=>{            
            if (r.data) {
                if (result) {
                    result.data.site.product.variants.edges = [...result.data.site.product.variants.edges, ...r.data.site.product.variants.edges];
                } else {
                    result = r;
                }
                if (r.data.site.product.variants.edges.length==250) {
                    this.getProductVariant(limit, r.data.site.product.variants.edges[249].cursor,result);
                } else {
                    // console.log(result);
                    this.getProductSKU(result);
                }
            }
        })
        .catch(e=>console.log(e));
    }

    /***
     * Get skus from product, from product sku and variants
     */
    getProductSKU(r=null) {
        if (r==null) {
            this.getProductVariant();
        } else {            
            if (r.data) {
                if (r.data.site.product.productOptions.edges.length>0) {
                    this.$pOptionSet = r.data.site.product.productOptions.edges;
                    this.setShipmentFilter();
                }
                let productOptions = [
                    {
                        sku: r.data.site.product.sku
                    }
                ];                
                if (r.data.site.product.variants.edges.length>0) {
                    for (let variant of r.data.site.product.variants.edges) {
                        if (variant.node.inventory.isInStock == false) continue;
                        let options = [];                        
                        let optionsText= [];
                        for (let option of variant.node.productOptions.edges) {
                            optionsText.push(`<b>${option.node.displayName}</b>: ${option.node.values.edges[0].node.label}`);
                            options.push({                                
                                label: option.node.displayName,
                                value: option.node.values.edges[0].node.label,
                                attrId: option.node.entityId,
                                attrValue: option.node.values.edges[0].node.entityId
                            });
                        }
                        productOptions.push({
                            sku: variant.node.sku,
                            optionsText: optionsText.join(" | "),
                            options,
                            inventoryLevel: variant.node.inventory.aggregated.availableToSell                            
                        })
                    }
                }
                if (productOptions.length>1) {
                    this.$pOptions = productOptions;
                    $(".shipping-time").show();
                }
                this.getTeamdeskInventoryList(productOptions.map(p=>p.sku));
            }
        }        
    }

    /**
     * @summary Set Earliest time section
     *      
     */
     setEarliestTime() {
        let today=[], transfer=[], transit=[], other={};

        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }

        if (this.$pOptions.length>0) {            
            for (let variant of this.$pOptions) {
                let item = {
                    sku: variant.sku,                    
                    options: variant.options,
                    optionsText: variant.optionsText
                };
                let inv = this.$pSKUList.find(i=>i.SKU.toUpperCase() == variant.sku.toUpperCase());
                let buff = 0;
                if (this.$cart) {
                    if (this.$cart.length>0) {
                        let citem = this.$cart[0].lineItems.physicalItems.filter(c=>c.sku.toLowerCase()==variant.sku.toLowerCase());
                        if (citem.length>0) {
                            buff = citem.reduce((a,b)=>a+b.quantity,0);
                        }
                    }                            
                }
                if (variant.inventoryLevel - buff <= 0) continue;
                if (inv) {                    
                    if (Number(inv["Available Quantity"])-buff >0) {
                        if (inv["Available Quantity"]!=inv["Total On Hand"]) {
                            transfer.push(item)
                        } else {
                            if (Number(inv["WH1"])-buff>0) {
                                today.push(item)
                            } else {
                                transfer.push(item);
                            }
                        }
                    } else {
                        buff -= inv["Available Quantity"];
                        if (Number(inv["Virtual Quantity"])-buff >0) {
                            if (inv["Lock Status"]!="Locked for processing" && Number(inv["Unlocked for sale quantity"])-buff>0) {
                                transit.push(item);
                            } else {
                                if (inv["Lock Status"]!="Locked for processing") {
                                    buff -= Number(inv["Unlocked for sale quantity"]);
                                }
                                if (Number(inv["Quantity Incoming"]) - 2 - buff > 0) {
                                    let inItems = this.$poSKUList.filter(p=>p.SKU.toUpperCase()==inv["SKU"].toUpperCase());
                                    let isAllure = this.$allureException.includes(inv["Part Number"].toLowerCase()) && inv["Classification"].includes("Women");
                                    if (inItems.length>0) {
                                        let cPO = this.getIncomingTime(1, inItems, true, buff);                                
                                        if (cPO) {
                                            let inItem = inItems[cPO.i];
                                            let today = new Date();
                                            let arrival = new Date(inItem["Arrival Due Date"]);
                                            let mDiff = monthDiff(new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()), new Date(arrival.getUTCFullYear(), arrival.getUTCMonth(), arrival.getUTCDate()));                           
                                            if (mDiff==0) {   
                                                if (isAllure) {
                                                    mDiff+=3;
                                                } else {
                                                    mDiff+=1;
                                                }                                
                                                
                                            } else {
                                                if (isAllure) {
                                                    mDiff+=2;
                                                }                                                                
                                            }
                                            if (other[mDiff]) {
                                                other[mDiff].push(item);
                                            } else {
                                                other[mDiff]=[item];
                                            }
                                        }                                    
                                    }       
                                } else {
                                    let mDiff = inv["Virtual Location"].slice(0,-1);
                                    if (mDiff.includes("_")) {
                                        mDiff = mDiff.slice(0,mDiff.indexOf("_"));
                                    }                                        
                                    if (other[mDiff]) {
                                        other[mDiff].push(item);
                                    } else {
                                        other[mDiff] = [item];
                                    }
                                }
                            }
                        }
                    }
                } else if (this.$pSKUList.length==0) {
                    today.push(item);
                }
            }
            let content=`
            <div class="delivery-container">
                <div class="delivery-row delivery-header">
                    <div>Options</div>
                    <div>SKU</div>
                    <div>Ship out time</div>
                    <div></div>
                </div>
            </div>`;            
            if (today.length>0) {                    
                // if (today[0].options.length>1 && today[0].options[1].label.includes("%")) {
                //     today.sort((a,b)=> Number(a.options[1].value.replace(/\D/g,''))-Number(b.options[1].value.replace(/\D/g,'')));
                // }
                // today.sort((a,b)=> a.options[0].value.localeCompare(b.options[0].value));
                content+=`<div class="delivery-container">`;
                for (let inv of today) {
                    let ext="", attr="";
                    for (let op of inv.options) {
                        ext+=`<input type="hidden" name="attribute[${op.attrId}]" value="${op.attrValue}"/>`;
                        attr+=` attribute-${op.attrId}="${op.attrValue}"`;
                    }                    
                    content+=`
                    <div class="delivery-row" sku="${inv.sku.toUpperCase()}" ${attr}>
                        ${ext}
                        <div data-section="option">${inv.optionsText}</div>
                        <div data-section="sku">${inv.sku.toUpperCase()}</div>                            
                        <div data-section="ship-out">Immediately</div>
                        <div class="add-cart" sku="${inv.sku.toUpperCase()}">Add to cart</div>
                    </div>
                    `;
                }
                content+=`</div>`;
            }
            if (transfer.length>0) {
                // if (transfer[0].options.length>1 && transfer[0].options[1].label.includes("%")) {
                //     transfer.sort((a,b)=> Number(a.options[1].value.replace(/\D/g,''))-Number(b.options[1].value.replace(/\D/g,'')));
                // }
                // transfer.sort((a,b)=> a.options[0].value.localeCompare(b.options[0].value));
                content+=`<div class="delivery-container">`;
                for (let inv of transfer) {
                    let ext="", attr="";
                    for (let op of inv.options) {
                        ext+=`<input type="hidden" name="attribute[${op.attrId}]" value="${op.attrValue}"/>`;
                        attr+=` attribute-${op.attrId}="${op.attrValue}"`;
                    }
                    content+=`
                    <div class="delivery-row" sku="${inv.sku.toUpperCase()}" ${attr}>
                        ${ext}
                        <div data-section="option">${inv.optionsText}</div>
                        <div data-section="sku">${inv.sku.toUpperCase()}</div>                            
                        <div data-section="ship-out">1-4 days</div>
                        <div class="add-cart" sku="${inv.sku.toUpperCase()}">Add to cart</div>
                    </div>
                    `;
                }
                content+=`</div>`;
            }
            if (transit.length>0) {
                // if (transit[0].options.length>1 && transit[0].options[1].label.includes("%")) {
                //     transit.sort((a,b)=> Number(a.options[1].value.replace(/\D/g,''))-Number(b.options[1].value.replace(/\D/g,'')));
                // }
                // transit.sort((a,b)=> a.options[0].value.localeCompare(b.options[0].value));
                content+=`<div class="delivery-container">`;
                for (let inv of transit) {
                    let ext="", attr="";
                    for (let op of inv.options) {
                        ext+=`<input type="hidden" name="attribute[${op.attrId}]" value="${op.attrValue}"/>`;
                        attr+=` attribute-${op.attrId}="${op.attrValue}"`;
                    }
                    content+=`
                    <div class="delivery-row" sku="${inv.sku.toUpperCase()}" ${attr}>
                        ${ext}
                        <div data-section="option">${inv.optionsText}</div>
                        <div data-section="sku">${inv.sku.toUpperCase()}</div>                            
                        <div data-section="ship-out">1 week</div>
                        <div class="add-cart" sku="${inv.sku.toUpperCase()}">Add to cart</div>
                    </div>
                    `;
                }
                content+=`</div>`;
            }
            if (Object.keys(other).length>0) {                    
                const options = {year: 'numeric', month: 'long'};
                let vkeys = Object.keys(other).sort(function(a,b){return a-b});
                for (let key of vkeys) {
                    // if (other[key][0].options.length>1 && other[key][0].options[1].label.includes("%")) {
                    //     other[key].sort((a,b)=> Number(a.options[1].value.replace(/\D/g,''))-Number(b.options[1].value.replace(/\D/g,'')));
                    // }
                    // other[key].sort((a,b)=> a.options[0].value.localeCompare(b.options[0].value));
                    content+=`<div class="delivery-container">`;
                    for (let inv of other[key]) {
                        let date = new Date();                            
                        date.setMonth(date.getMonth()+Number(key));
                        let ext="", attr;
                        for (let op of inv.options) {
                            ext+=`<input type="hidden" name="attribute[${op.attrId}]" value="${op.attrValue}"/>`;
                            attr+=` attribute-${op.attrId}="${op.attrValue}"`;
                        }
                        content+=`
                        <div class="delivery-row" sku="${inv.sku.toUpperCase()}" ${attr}>
                            ${ext}
                            <div data-section="option">${inv.optionsText}</div>
                            <div data-section="sku">${inv.sku.toUpperCase()}</div>                                
                            <div data-section="ship-out">${date.toLocaleDateString('en-US', options)}</div>
                            <div class="add-cart" sku="${inv.sku.toUpperCase()}">Add to cart</div>
                        </div>
                        `;
                    }
                    content+=`</div>`;
                }
            }

            $(".delivery-wrap .delivery-content-wrap").html(content).addClass("grid").css({height:"auto"});

            $(".delivery-row .add-cart").on("click", function(event) {
                let $el = $(event.currentTarget);
                if ($el.hasClass("disabled")) return;
                try {
                    $el.html("Adding to Cart ...");
                    let $parent = $el.parents(".delivery-row");
                    let params = $parent.find("input[type=hidden]");
                    let formData = new FormData();
                    formData.append("action", "add");
                    formData.append("product_id", $("[name=product_id]").val());
                    formData.append("qty[]",1)
                    Array.from(params).forEach(param=>{
                        formData.append($(param).attr("name"), $(param).val());
                    });                        
                    utils.api.cart.itemAdd(formData, (err, response)=>{
                        if (err) {
                            console.log(err);
                            $el.html("Error").addClass("disabled");
                            return;
                        }                        
                        if (response.data.cart_id) {
                            $("#deliverModal").attr("data-add",Number($("#deliverModal").attr("data-add"))+1);
                            $el.html("Added to cart").addClass("disabled");
                            $parent.addClass("added");
                        } else {
                            // console.log(response);
                            $el.html("Error").addClass("disabled");
                        }
                    })
                } catch(e) {
                    console.log(e);
                    $el.html("Error").addClass("disabled");
                }
            })
        }
             
    }    

    /**
     * 
     * @summary Get list of teamdesk Inventory from list of sku
     * 
     * @param {Array} skus List of sku
     */
     getTeamdeskInventoryList(skus) {
        // console.log(skus);
        fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                table: 'Inventory',
                filter: encodeURIComponent(`Any([SKU],'${skus.join(",")}')`)
            })
        })
        .then(r=>r.json())
        .then(d=> {            
            if (d.length>0) {
                $(".delivery-wrap").show();
                this.$pSKUList = d;                    
                if (this.$pOptions.length>1) {
                    if ($("#custom-alert").length>0 && $(".pv-fav-section[grid]").length>0) {
                        if ($("[name=customer_email]").val()) {
                            this.setInstockAlert();
                            let $this = this;
                            $("[in-alert]").on("click", function() {
                                $this.showInStockAlert();
                            })
                            $("#custom-alert .modal-close").on("click", function() {
                                $this.closeInStockAlert();
                            });
                        } else {
                            $(".btn-book-wrap").show();
                            $(".pv-fav-section").addClass("grid");          
                            $("[in-alert]").on("click", function() {
                                location.href="/login.php";
                            })
                        }
                    }
                }                
            } else {
                $(".delivery-wrap").remove();
                if (this.$pCurrent.stock) {
                    this.$pSKUList = [];
                    if (this.$pCurrent.stock) {
                        $('.pv-stock-info label').append(`<div>Current Stock: ${this.$pCurrent.stock}</div>`);
                        if ($(".pv-option-section[options]").is(":hidden")) {
                            $(".pv-option-section[options]").show();
                        }
                    }
                    // $('[data-product-stock]').text(data.stock);
                    // $('[data-stock-label]').css({"display": "inline-block"});
                }
            }
            
            this.getTeamdeskPOList(skus);
        })
        .catch(e=> {
            console.log(e);
            $(".delivery-wrap").remove();
            if (data.stock) {
                this.$pSKUList = [];
                // $('[data-product-stock]').text(data.stock);
                // $('[data-stock-label]').css({"display": "inline-block"});
            }
        });  
    }

    /**
     * 
     * @summary Get list of teamdesk PO from SKU
     * 
     * @param {Array} skus The list of SKU
     */
     getTeamdeskPOList(skus) {
        fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                table: 't_763479',
                options: `?filter=Any([SKU],'${encodeURIComponent(skus.join(","))}') and [Incoming Quantity]>0 and [Arrival Due Date]>ToDate('1/1/1')&sort=Arrival Due Date//ASC`                        
            })
        })
        .then(r=>r.json())
        .then(d=> {
            // console.log(d);
            if (d.length>0) {
                this.$poSKUList = d;
            }
            if (this.$pSKUList.length>0) {
                // console.log(this.$pSKUList);
                this.setEarliestTime();
                this.updateDeliverTime(this.$pCurrent);
            }
        })
        .catch(e=> {
            console.log(e);                
        })
    }

    /**
     * @summary Add delivery note with not-in-stock case
     * 
     * @param {json} item Teamdesk item
     * @param {integer} buff Total added quantity in current cart if there is 
     * @param {integer} qty Current checked quantity
     * @param {Array} noteStock Array of note for Stock information
     * @param {Array} noteShip Array of note for Shipment information
     * 
     * @returns void
     */
    updateDeliverLabelNotInstock(item, buff, qty, noteStock, noteShip) {
        
        /**
         * @summary Calculate the difference of months between 2 date time
         * 
         * @param {Date} d1 First date
         * @param {Date} d2 Second date
         * @returns {integer} Number of months difference. Will be 0 if d1>d2
         */
        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }        

        if (item["Virtual Quantity"] && qty>0) {
            let vqty = Number(item["Available Quantity"])>0?0:Math.abs(Number(item["Available Quantity"]));
            if (item["Lock Status"]!="Locked for processing" && Number(item["Unlocked for sale quantity"]) > 0 && qty>0) {
                if (Number(item["Unlocked for sale quantity"])-buff > 0) {
                    let tqty = Number(item["Unlocked for sale quantity"])-buff<item["Virtual Quantity"]?Number(item["Unlocked for sale quantity"])-buff:item["Virtual Quantity"];
                    noteStock.push(`In transit: ${tqty}`);
                    // noteShip.push(`Expect to ship out <b>1 week</b> later: <b>${Math.min(Number(item["Unlocked for sale quantity"])-buff, qty)}</b>`);
                    noteShip.transit=Math.min(tqty, qty);
                    vqty+=Math.min(tqty, qty);
                    qty -= Math.min(tqty, qty);
                    buff = 0;
                } else {
                    buff -= Number(item["Unlocked for sale quantity"]);
                    vqty += Number(item["Unlocked for sale quantity"]);
                }
            }                   
            if (Number(item["Quantity Incoming"])-2 > 0 && qty>0) {                             
                if (Number(item["Quantity Incoming"])-2 - buff > 0) {
                    let inItems = this.$poSKUList.filter(po=>po.SKU.toUpperCase() == item["SKU"].toUpperCase())
                    if (inItems.length>0) {
                        let cPO = this.getIncomingTime(qty, inItems, false, buff);
                        // console.log(cPO);
                        if (cPO) {
                            let inItem = inItems[cPO.i];
                            let today = new Date();
                            let date = new Date(inItem["Arrival Due Date"]);                             
                            date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                            let mTime = monthDiff(new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()), date);                        
                            if (mTime == 0) {
                                if (this.$allureException.includes(inItem["Part Number"].toLowerCase()) && item["Classification"].includes("Women")) {                                                                    
                                    // date = new Date();
                                    // date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                                    // date.setMonth(date.getMonth()+3);
                                    mTime+=3;
                                } else {                                                                    
                                    // date = new Date();
                                    // date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                                    // date.setMonth(date.getMonth()+1);
                                    mTime+=1
                                }
                            } else if (this.$allureException.includes(inItem["Part Number"].toLowerCase()) && item["Classification"].includes("Women")) {
                                // date.setMonth(date.getMonth()+2);
                                mTime+=2;
                            }
                            let iqty = cPO.qPO+vqty<item["Virtual Quantity"]?cPO.qPO:Number(item["Virtual Quantity"])-vqty;
                            noteStock.push(`In production: ${iqty}`);
                            // noteShip.push(`Expect to ship out in <b>${date.toLocaleDateString('en-US', options)}</b>: <b>${Math.min(Number(item["Quantity Incoming"])-2-buff,qty)}</b>`);
                            if (noteShip.virtual[mTime]) {
                                noteShip.virtual[mTime]+=Math.min(iqty,qty);
                            } else {
                                noteShip.virtual[mTime]=Math.min(iqty,qty);
                            }
                            vqty+=Math.min(iqty, qty);
                            qty -= Math.min(iqty, qty);
                            buff=0;
                        }  
                    }
                } else {
                    buff = buff - Number(item["Quantity Incoming"]) - 2;
                    vqty += Number(item["Quantity Incoming"])+2;
                }
            }    
            if (qty>0 && vqty<Number(item["Virtual Quantity"])) {
                if (Number(item["Virtual Quantity"])-vqty-buff > 0) {
                    let regex = /[1-9_]+M/g;
                    let t = item["Virtual Location"].match(regex);
                    if (t.length>0) {
                        t = t[0].substring(0,t[0].length-1);
                        if (t.length>0) {
                            if (Number(item["Virtual Quantity"])-buff-vqty >10) {
                                noteStock.push(`Allowed Pre-order: More than 10`);
                            } else {
                                noteStock.push(`Allowed Pre-order: ${Number(item["Virtual Quantity"])-buff-vqty }`);
                            }                        
                            let mTime = 0;
                            if (t.length>1) {
                                // noteShip.push(`Shipping could take up to <b>${t.replace('_','-')} months</b>: <b>${Math.min(Number(item["Virtual Quantity"])-buff, qty)}</b>`);
                                mTime = t.replace('_','-');                            
                            } else {                            
                                // noteShip.push(`Expect to ship out <b>${t} month${t>1?'s':''}</b> later: <b>${Math.min(Number(item["Virtual Quantity"])-buff, qty)}</b>`);     
                                mTime = t;                       
                            }                        
                            if (noteShip.virtual[mTime]) {
                                noteShip.virtual[mTime]+=Math.min(Number(item["Virtual Quantity"])-buff-vqty, qty);
                            } else {
                                noteShip.virtual[mTime]=Math.min(Number(item["Virtual Quantity"])-buff-vqty, qty);
                            }
                            qty = qty - Number(item["Virtual Quantity"])+buff+vqty;
                            // qty = qty - Math.min(Number(item["Virtual Quantity"])-buff-vqty, qty)
                            // buff = 0;
                        }
                    }                    
                }
            }
        }           
        
        // $(".productView-details").find(".form-field.form-field--increments").eq(0).before(`<div class="productView-deliver">${noteShip.join("<br/>")}</div>`)
        // console.log(noteShip);
        let lbShip=[];
        if (noteShip.today) {
            lbShip.push(`Expect to ship out <b>immediately</b>: <b>${noteShip.today}</b>`);
        }
        if (noteShip.transfer) {
            lbShip.push(`Warehouse transfer, expect ship out <b>2-4 days</b> later: <b>${noteShip.transfer}</b>`)
        }
        if (noteShip.pending) {
            lbShip.push(`Expect to ship out <b>1-3 days</b> later: <b>${noteShip.pending}</b>`)
        }
        if (noteShip.transit) {
            lbShip.push(`Expect to ship out <b>1 week</b> later: <b>${noteShip.transit}</b>`);
        }
        // console.log(noteShip);
        if (Object.keys(noteShip.virtual).length > 0) {
            const options = {year: 'numeric', month: 'long'};
            let vkeys = Object.keys(noteShip.virtual).sort(function(a,b) {
                return a-b;
            })                            
            for (let key of vkeys) {
                if (Number(key)) {
                    let date = new Date();
                    date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                    date.setMonth(date.getMonth()+Number(key));
                    lbShip.push(`Expect to ship out in <b>${date.toLocaleDateString('en-US', options)}</b>: <b>${noteShip.virtual[key]}</b>`);
                } else {
                    lbShip.push(`Expect to ship out <b>${key} months later</b>: <b>${noteShip.virtual[key]}</b>`);
                }
            }
        }
        // console.log(lbShip);
        if (qty>0) {
            lbShip.push(`Unavailable: ${qty}`);
        }
        if (lbShip.length>0) {
            $(".productView-details").find(".pv-delivery-detail").eq(0).before(`<div class="pv-deliver">${lbShip.join("<br/>")}</div>`)
            $(".pv-delivery-detail").show();
        }
        if (noteStock.length>0) {            
            $('.pv-stock-info label').append(`<div>Quantity:<br/>${noteStock.join('<br/>')}</div>`)            
            if ($(".pv-option-section[options]").is(":hidden")) {
                $(".pv-option-section[options]").show();
            }
        }
    }

    /**
     * @summary Set Ship out Label in case there is pending/hold items
     * 
     * @param {json} item Teamdesk item value
     * @param {integer} buff Total added quantity in current cart if there is 
     */
    updateDeliverLabelWithPending(item, buff=0) {
        let qty = Number($("[id='qty[]']").val());
        let noteStock = [], noteShip={
            "today":null,
            "transfer":null,
            "pending":null,
            "transit":null,
            "virtual":{}
        };        
        if (Number(item["Available Quantity"]) > 0) {
            if (Number(item["Available Quantity"])-buff > 0) {
                if (Number(item["Available Quantity"])-buff>10) {
                    noteStock.push(`In Stock: More than 10`);
                } else {
                    noteStock.push(`In Stock: ${Number(item["Available Quantity"])-buff }`)
                }
                // noteShip.push(`Expect to ship out <b>1-4 days</b> later: <b>${Math.min(Number(item["Quantity USA"])-buff, qty)}</b>`);                
                noteShip.pending = Math.min(Number(item["Available Quantity"])-buff, qty);
                qty = qty - Math.min(Number(item["Available Quantity"])-buff, qty);
                buff = 0;
            } else {
                buff -= Number(item["Available Quantity"]);
            }
        } else if (Number(item["Available Quantity"]) < 0) {
            buff += Math.abs(Number(item["Available Quantity"]));
        }
                
        this.updateDeliverLabelNotInstock(item, buff, qty, noteStock, noteShip);        
    }

    /**
     * @summary Set Ship out Label when Available Quantity == Total On Hand (there is no pending or holding item)
     * 
     * @param {json} item Teamdesk item value
     * @param {integer} buff Total added quantity in current cart if there is 
     */
    updateDeliverLabel(item, buff=0) {
        let qty = Number($("[id='qty[]']").val());
        let noteStock = [], noteShip={
            "today":null,
            "transfer":null,
            "pending":null,
            "transit":null,
            "virtual":{}
        };        
        if (Number(item["Quantity Canada"]) > 0) {
            if (Number(item["Quantity Canada"])-buff > 0) {            
                if (Number(item["Quantity Canada"])-buff>10) {
                    noteStock.push(`Canada Warehouse: More than 10`);
                } else {
                    noteStock.push(`Canada Warehouse: ${Number(item["Quantity Canada"])-buff }`)
                }
                // noteShip.push(`Warehouse transfer, expect ship out <b>immediately</b> later: <b>${Math.min(Number(item["Quantity USA"]) + Number(item["Quantity Canada"])-buff, qty)}</b>`);
                noteShip.today = Math.min(Number(item["Quantity Canada"])-buff, qty);
                qty = qty - Math.min(Number(item["Quantity Canada"])-buff, qty);
                buff = 0;
            } else {
                buff -= Number(item["Quantity Canada"]);
            }
        }
        if (Number(item["Quantity USA"]) > 0 && qty>0) {
            if (Number(item["Quantity USA"])-buff>0) {
                if (Number(item["Quantity USA"])-buff>10) {
                    noteStock.push(`US Warehouse: More than 10`);
                } else {
                    noteStock.push(`US Warehouse: ${Number(item["Quantity USA"])-buff }`)
                }
                // noteShip.push(`Expect to ship out <b>2-4 days</b>: <b>${Math.min(Number(item["Quantity USA"])-buff, qty)}</b>`);     
                noteShip.transfer=Math.min(Number(item["Quantity USA"])-buff, qty);           
                qty = qty - Math.min(Number(item["Quantity USA"])-buff, qty);
                buff = 0;
            } else {
                buff -= Number(item["Quantity USA"]);
            }
        }
                
        this.updateDeliverLabelNotInstock(item, buff, qty, noteStock, noteShip);        
    }

    updateDeliverTime(data) {            
        $(".pv-deliver").remove();
        $(".pv-stock-info label").html("");
        $(".pv-delivery-detail").hide();
        if (this.$pSKUList.length>0 && data.sku) {   
            // console.log(data);         
            this.$pCurrent = data;
            let item = this.$pSKUList.find(p=>p.SKU.toUpperCase()==data.sku.toUpperCase());
            if (item) {                
                if (this.$cart) {
                    if (this.$cart.length>0) {
                        let totalbuff = 0;
                        try {
                            let titem = this.$cart[0].lineItems.physicalItems.filter(p=>p.sku.toUpperCase()==data.sku.toUpperCase())                            
                            if (titem.length>0) {
                                totalbuff = titem.reduce((a,b)=>a+b.quantity,0);                                
                            }
                            
                        } catch (error) {
                            console.log(error);                            
                        } finally {                            
                            if (Number(item["Total On Hand"])!=Number(item["Available Quantity"])) {
                                this.updateDeliverLabelWithPending(item, totalbuff);
                            } else {
                                this.updateDeliverLabel(item, totalbuff);
                            }
                        }
                    } else {
                        if (Number(item["Total On Hand"])!=Number(item["Available Quantity"])) {
                            this.updateDeliverLabelWithPending(item);
                        } else {
                            this.updateDeliverLabel(item);
                        }
                    } 
                } else {
                    if (Number(item["Total On Hand"])!=Number(item["Available Quantity"])) {
                        this.updateDeliverLabelWithPending(item);
                    } else {
                        this.updateDeliverLabel(item);
                    }
                }
            } 
        }
    }

    initProductAttributes(data) {        
        const behavior = data.out_of_stock_behavior;
        const inStockIds = data.in_stock_attributes;
        const outOfStockMessage = ` (${data.out_of_stock_message})`;

        this.showProductImage(data.image);

        if (behavior !== 'hide_option' && behavior !== 'label_option') {
            return;
        }

        $('[data-product-attribute-value]', this.$scope).each((i, attribute) => {
            const $attribute = $(attribute);
            const attrId = parseInt($attribute.data('product-attribute-value'), 10);


            if (inStockIds.indexOf(attrId) !== -1) {
                this.enableAttribute($attribute, behavior, outOfStockMessage);
            } else {
                if (!this.$hasSoldOut) {
                    this.$hasSoldOut = true;
                }
                this.disableAttribute($attribute, behavior, outOfStockMessage);
            }
        });
    }

    /**
     * Hide or mark as unavailable out of stock attributes if enabled
     * @param  {Object} data Product attribute data
     */
    updateProductAttributes(data) {
        const behavior = data.out_of_stock_behavior;
        const inStockIds = data.in_stock_attributes;
        const outOfStockMessage = ` (${data.out_of_stock_message})`;

        this.showProductImage(data.image);

        if (behavior !== 'hide_option' && behavior !== 'label_option') {
            return;
        }

        $('[data-product-attribute-value]', this.$scope).each((i, attribute) => {
            const $attribute = $(attribute);
            const attrId = parseInt($attribute.data('product-attribute-value'), 10);


            if (inStockIds.indexOf(attrId) !== -1) {
                this.enableAttribute($attribute, behavior, outOfStockMessage);
            } else {
                this.disableAttribute($attribute, behavior, outOfStockMessage);
            }
        });
    }

    disableAttribute($attribute, behavior, outOfStockMessage) {
        if (this.getAttributeType($attribute) === 'set-select') {
            return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
        }

        if (behavior === 'hide_option') {
            $attribute.hide();
        } else {
            $attribute.addClass('unavailable');
        }
    }

    disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
        const $select = $attribute.parent();

        if (behavior === 'hide_option') {
            $attribute.toggleOption(false);
            // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
            if ($attribute.parent().val() === $attribute.attr('value')) {
                $select[0].selectedIndex = 0;
            }
        } else {
            $attribute.attr('disabled', 'disabled');
            $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
        }
    }

    enableAttribute($attribute, behavior, outOfStockMessage) {
        if (this.getAttributeType($attribute) === 'set-select') {
            return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
        }

        if (behavior === 'hide_option') {
            $attribute.show();
        } else {
            $attribute.removeClass('unavailable');
        }
    }

    enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
        if (behavior === 'hide_option') {
            $attribute.toggleOption(true);
        } else {
            $attribute.removeAttr('disabled');
            $attribute.html($attribute.html().replace(outOfStockMessage, ''));
        }
    }

    getAttributeType($attribute) {
        const $parent = $attribute.closest('[data-product-attribute]');

        return $parent ? $parent.data('product-attribute') : null;
    }

    /**
     * Allow radio buttons to get deselected
     */
    initRadioAttributes() {
        $('[data-product-attribute] input[type="radio"]', this.$scope).each((i, radio) => {
            const $radio = $(radio);

            // Only bind to click once
            if ($radio.attr('data-state') !== undefined) {
                $radio.click(() => {
                    if ($radio.data('state') === true) {
                        $radio.prop('checked', false);
                        $radio.data('state', false);

                        $radio.change();
                    } else {
                        $radio.data('state', true);
                    }

                    this.initRadioAttributes();
                });
            }

            $radio.attr('data-state', $radio.prop('checked'));
        });
    }
}
