webpackJsonp([4],{

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_debounce__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_bind__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_bind___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_bind__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_manager__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_gift_certificate_validator__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart_shipping_estimator__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__global_modal__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sweetalert2__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_sweetalert2__);
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Cart=function(_PageManager){_inherits(Cart,_PageManager);function Cart(){_classCallCheck(this,Cart);return _possibleConstructorReturn(this,_PageManager.apply(this,arguments))}Cart.prototype.loaded=function loaded(next){this.$cartContent=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart-content]');this.$cartMessages=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart-status]');this.$cartTotals=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart-totals]');this.$overlay=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart] .loadingOverlay').hide();// TODO: temporary until roper pulls in his cart components
this.bindEvents();next()};Cart.prototype.cartUpdate=function cartUpdate($target){var _this2=this;var itemId=$target.data('cart-itemid');var $el=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#qty-'+itemId);var oldQty=parseInt($el.val(),10);var maxQty=parseInt($el.data('quantity-max'),10);var minQty=parseInt($el.data('quantity-min'),10);var minError=$el.data('quantity-min-error');var maxError=$el.data('quantity-max-error');// const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
var newQty=$target.data('action')==='inc'?oldQty+1:$target.data('action')==='dec'?oldQty-1:parseInt($el.val(),10);if(newQty<minQty){return __WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:minError,icon:'error'})}else if(maxQty>0&&newQty>maxQty){return __WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:maxError,icon:'error'})}this.$overlay.show();__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.itemUpdate(itemId,newQty,function(err,response){// this.$overlay.hide();            
if(response.data.status==='succeed'){// if the quantity is changed "1" from "0", we have to remove the row.
var remove=newQty===0;// this.refreshContent(remove);
_this2.cartCheckSI(remove)}else{$el.val(oldQty);__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:response.data.errors.join('\n'),icon:'error'});_this2.$overlay.hide()}})};/**
     * Remove Item from cart
     * 
     * @param {string} itemId Id of item
     * @param {boolean} isSI True if this item is Shipping Insurance
     */Cart.prototype.cartRemoveItem=function cartRemoveItem(itemId){var _this3=this;var isSI=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;this.$overlay.show();__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.itemRemove(itemId,function(err,response){if(response.data){if(response.data.status==='succeed'){// this.refreshContent(true);                
if(isSI){location.href='/cart.php?sio=true'}else{_this3.cartCheckSI(true)}}else{__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:response.data.errors.join('\n'),type:'error'})}}else{__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:'Server has error in removing. Please reload the page and try again',type:'error'})}})};Cart.prototype.cartEditOptions=function cartEditOptions(itemId){var _this4=this;var modal=Object(__WEBPACK_IMPORTED_MODULE_7__global_modal__["b" /* defaultModal */])();var options={template:'cart/modals/configure-product'};modal.open();__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.productAttributes.configureInCart(itemId,options,function(err,response){modal.updateContent(response.content);_this4.bindGiftWrappingForm()});__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].hooks.on('product-option-change',function(event,option){var $changedOption=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(option);var $form=$changedOption.parents('form');var $submit=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('input.button',$form);var $messageBox=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.alertMessageBox');var item=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[name="item_id"]',$form).attr('value');__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.productAttributes.optionChange(item,$form.serialize(),function(err,result){var data=result.data||{};if(err){__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:err,type:'error'});return false}if(data.purchasing_message){__WEBPACK_IMPORTED_MODULE_3_jquery___default()('p.alertBox-message',$messageBox).text(data.purchasing_message);$submit.prop('disabled',true);$messageBox.show()}else{$submit.prop('disabled',false);$messageBox.hide()}if(!data.purchasable||!data.instock){$submit.prop('disabled',true)}else{$submit.prop('disabled',false)}})})};Cart.prototype.getParameterByName=function getParameterByName(name){var url=arguments.length>1&&arguments[1]!==undefined?arguments[1]:window.location.href;name=name.replace(/[\[\]]/g,'\\$&');var regex=new RegExp('[?&]'+name+'(=([^&#]*)|&|#|$)'),results=regex.exec(url);if(!results)return null;if(!results[2])return'';return decodeURIComponent(results[2].replace(/\+/g,' '))};Cart.prototype.findShippingInsurance=function findShippingInsurance(arr){var result=[];for(var i=arr.length-1;i>=0;i--){if(arr[i].sku.includes('SKUSI')){result.push(arr[i])}}if(result.length==0){return null}else{return result}};/**
     * @summary Remove Shipping Items from cart
     * 
     * @param {integer} idx Index of current Shipping Item
     * @param {Array} shippingItems Array of Shipping Item
     * @param {function} callback Call back function after done deleting 
     * @returns void
     */Cart.prototype.cartRemoveSI=function cartRemoveSI(idx,shippingItems,callback){var _this5=this;if(idx==shippingItems.length){callback()}else{__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.itemRemove(shippingItems[idx].id,function(err,removedData){if(err){return}_this5.cartRemoveSI(idx+1,shippingItems,callback)})}};/**
     * @summary Check and update Shipping Insurance
     * 
     * @param {boolean} remove Check if it is from Remove or not, default is false
     */Cart.prototype.cartCheckSI=function cartCheckSI(remove){var _this6=this;var $this=this;$this.$overlay.show();$this.$overlay.html('<span>Checking Shipping Insurance</span>');__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.getCart({},function(err,myCart){if(err){return}if(myCart.length==0){$this.refreshContent(remove);return}var cartItems=myCart[0].lineItems.physicalItems;var academy=cartItems.filter(function(item){return item.sku=='academymono'||item.sku=='academylace'||item.sku=='academyskin'||item.sku=='academyExtended'||item.sku=='academyStarter'});var totalAmount=myCart[0].baseAmount;if(academy.length>0){var sum_academy=academy.reduce(function(a,b){return a+b.salePrice*b.quantity},0);totalAmount=myCart[0].baseAmount-sum_academy}var shippingItems=_this6.findShippingInsurance(cartItems);if(shippingItems){if(shippingItems.length>1){var salePrice=shippingItems.reduce(function(a,b){return a+b.salePrice*b.quantity},0);var totalWithoutShipping=totalAmount-salePrice;$this.$overlay.html('<span>Updating Shipping Insurance</span>');$this.cartRemoveSI(0,shippingItems,function(){if(totalWithoutShipping>=1000){var insurance=Math.floor(totalWithoutShipping*0.01);var url='/cart.php?action=add&sku=SKUSI-'+(insurance-9);__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.get(url,function(data){$this.refreshContent(remove)})}else{// $this.$overlay.hide();
// $this.cartGetDelivery();
$this.refreshContent(remove)}})}else{var _salePrice=shippingItems[0].salePrice*shippingItems[0].quantity;var _totalWithoutShipping=totalAmount-_salePrice;var insurance=Math.floor(_totalWithoutShipping*0.01);if(_totalWithoutShipping==0){$this.cartRemoveSI(0,shippingItems,function(){window.location.reload()})}else if(insurance!=Math.ceil(_salePrice)){$this.$overlay.html('<span>Updating Shipping Insurance</span>');$this.cartRemoveSI(0,shippingItems,function(){if(_totalWithoutShipping>=1000){var url='/cart.php?action=add&sku=SKUSI-'+(insurance-9);__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.get(url,function(data){$this.refreshContent(remove)})}else{// $this.$overlay.hide();
// $this.cartGetDelivery();
$this.refreshContent(remove)}})}else{// $this.$overlay.hide();
// $this.cartGetDelivery();
$this.refreshContent(remove)}}}else{if(totalAmount>=1000&&totalAmount<2000){var sioParam=_this6.getParameterByName('sio');if(sioParam){$this.$overlay.hide();_this6.cartGetDelivery()}else{var _insurance=Math.floor(totalAmount*0.01);var url='/cart.php?action=add&sku=SKUSI-'+(_insurance-9);$this.$overlay.html('<span>Updating Shipping Insurance</span>');__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.get(url,function(data){$this.refreshContent()})}}else if(totalAmount>=2000){var _insurance2=Math.floor(totalAmount*0.01);var _url='/cart.php?action=add&sku=SKUSI-'+(_insurance2-9);$this.$overlay.html('<span>Updating Shipping Insurance</span>');__WEBPACK_IMPORTED_MODULE_3_jquery___default.a.get(_url,function(data){$this.refreshContent(remove)})}else{$this.refreshContent(remove)}}})};/**
     * @summary Find the months difference
     * 
     * @param {Date} d1 Time to compare
     * @param {Date} d2 Time to compare
     * @returns Months difference. Value is 0 if d1 later than d2
     */Cart.prototype.monthDiff=function monthDiff(d1,d2){var months;months=(d2.getFullYear()-d1.getFullYear())*12;months-=d1.getMonth();months+=d2.getMonth();return months<=0?0:months};/**
     * @summary Get SKU list from table GUI and display ship out time
     * 
     * @param {Array} items Item list from Teamdesk
     * @param {Array} skus List of SKU
     * @param {Array} po PO list of item from Teamdesk
     */Cart.prototype.cartGetDelivery=function cartGetDelivery(){var items=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var _this7=this;var skus=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var po=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(items==null){Array.from(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('tr.cart-item')).forEach(function(r){var sku=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(r).data('sku');if(sku.indexOf('_N')==sku.length-2){sku=sku.slice(0,sku.length-2)}skus.push(sku.replace('#','%23'))});fetch('//shp-webserver.glitch.me/get-teamdesk',{method:'POST',headers:{'Content-Type':'application/json',accept:'application/json'},body:JSON.stringify({table:'Inventory',filter:'Any([SKU],\''+skus.join(',')+'\')'})}).then(function(r){return r.json()}).then(function(r){if(r.length>0){_this7.cartGetDelivery(r,skus)}}).catch(function(e){return console.log(e)})}else if(po==null){fetch('//shp-webserver.glitch.me/get-teamdesk',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({table:'t_763479',options:'?filter=Any([SKU],\''+skus.join(',')+'\') and [Incoming Quantity]>0 and [Arrival Due Date]>ToDate(\'1/1/1\')&sort=Arrival Due Date//ASC'})}).then(function(r){return r.json()}).then(function(r){if(r.length>0){_this7.cartGetDelivery(items,skus,r)}else{_this7.cartGetDelivery(items,skus,[])}}).catch(function(e){_this7.cartGetDelivery(items,skus,[])})}else{var qtyChecked={};Array.from(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('tr.cart-item')).forEach(function(r){var $el=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(r);var isSpecial=false;try{var sku=$el.data('sku');if(sku.indexOf('_N')==sku.length-2){sku=sku.slice(0,sku.length-2)}var item=items.find(function(s){return s.SKU.toUpperCase()==sku.toUpperCase()});if(item){var qty=$el.find('.cart-item-quantity input').val();var buff=0;if(qtyChecked[item.SKU]){buff=qtyChecked[item.SKU];qtyChecked[item.SKU]+=qty}else{qtyChecked[item.SKU]=qty}var content='<strong>Estimated ship out time:</strong><br/>';if(item['Total On Hand']==item['Available Quantity']){if(Number(item['Quantity Canada'])>0){if(Number(item['Quantity Canada'])-buff>0){content+='Immediately: quantity <strong>'+Math.min(item['Quantity Canada']-buff,qty)+'</strong><br/>';qty=qty-Math.min(item['Quantity Canada']-buff,qty);buff=0}else{buff-=Number(item['Quantity Canada'])}}if(Number(item['Quantity USA'])>0&&qty>0){if(Number(item['Quantity USA'])-buff>0){content+='2-4 days: quantity <strong>'+Math.min(item['Quantity USA']-buff,qty)+'</strong><br/>';qty=qty-Math.min(item['Quantity USA']-buff,qty);buff=0}else{buff-=Number(item['Quantity USA'])}}}else{if(Number(item['Available Quantity'])>0){if(Number(item['Available Quantity'])-buff>0){content+='1-4 days: quantity <strong>'+Math.min(item['Available Quantity']-buff,qty)+'</strong><br/>';qty=qty-Math.min(item['Available Quantity']-buff,qty);buff=0}else{buff-=Number(item['Available Quantity'])}}}if(item['Virtual Quantity']&&qty>0){if(item['Lock Status']!='Locked for processing'&&Number(item['Unlocked for sale quantity'])>0&&qty>0){if(Number(item['Unlocked for sale quantity'])-buff>0){content+='1 week later: quantity <strong>'+Math.min(item['Unlocked for sale quantity']-buff,qty)+'</strong><br/>';qty=qty-Math.min(item['Unlocked for sale quantity']-buff,qty);buff=0}else{buff-=Number(item['Unlocked for sale quantity'])}}var virtual={};if(Number(item['Quantity Incoming'])-2>0&&qty>0){if(Number(item['Quantity Incoming'])-2-buff>0){isSpecial=true;var inItems=po.filter(function(p){return p.SKU.toUpperCase()==item['SKU'].toUpperCase()});var i=0,totalP=buff,tempqty=qty;while(i<inItems.length&&tempqty>0){totalP+=Number(inItems[i]['Incoming Quantity']);tempqty=tempqty-Math.min(Number(inItems[i]['Incoming Quantity']),tempqty);i++}if(i>0){var inItem=inItems[i-1];var allureException=['coco','rose','adele','angelina','jessica','selena','taylor','julia','nicole','gwyneth','ev7914','tl6814','ev5714','mo5514','mo7608','ev5512','ev5706','ev6810','eg6612','eh16','mh2206','sh5206','ep3608','mh2216','maya','noya'];var mdiff=_this7.monthDiff(new Date,new Date(inItem['Arrival Due Date']));if(mdiff==0){if(allureException.includes(inItem['Part Number'])){mdiff+=3}else{mdiff+=1}}else if(allureException.includes(inItem['Part Number'])){mdiff+=2}virtual[mdiff]=Math.min(totalP,qty);qty=tempqty;buff=0}}else{buff=buff-Number(item['Quantity Incoming'])+2}}if(qty>0){isSpecial=true;var m=item['Virtual Location'].slice(0,-1);if(virtual[m]){virtual[m]+=qty}else{virtual[m]=qty}}// console.log(virtual);
if(Object.keys(virtual).length>0){var options={year:'numeric',month:'long'};var vkeys=Object.keys(virtual).sort(function(a,b){return b-a});for(var _iterator=vkeys,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[Symbol.iterator]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++]}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value}var key=_ref;if(Number(key)){var date=new Date;date=new Date(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate());date.setMonth(date.getMonth()+Number(key));content+=date.toLocaleDateString('en-US',options)+': quantity <strong>'+virtual[key]+'</strong><br/>'}else{content+=key.replace('_','-')+' months later: quantity <strong>'+virtual[key]+'</strong><br/>'}}}}$el.find('.cart-item-title').find('.cart-shipout').html(content).css({'height':'auto'});if(isSpecial){$el.find('.cart-item-title').find('.cart-shipout').addClass('delivery-highlight')}}else{var cmhRushItems=['CMH','CMLACE','CMMONO','CMLACEPOLY','CMSKIN'];var hairService=['style#221','style#222','style#231','style#232','style#233','style#234','style#251','style#331','style#332','style#334','style#335','style#341','style#342','style#343','style#551','style#552','Style #Your_Own','Online Services Pack'];var _content='';if(cmhRushItems.includes($el.data('sku').toUpperCase())){_content='<strong>Estimated ship out time:</strong><br/>3-month guaranteed delivery<br/>'}else if(hairService.includes($el.data('sku'))){_content='<strong>Estimated ship out time:</strong><br/>Handling time 1-2 weeks<br/>'}$el.find('.cart-item-title').find('.cart-shipout').html(_content).css({'height':'auto'})}}catch(err){console.log(err)}})}};Cart.prototype.refreshContent=function refreshContent(remove){var _this8=this;var $cartItemsRows=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-item-row]',this.$cartContent);var $cartPageTitle=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart-page-title]');var options={template:{content:'cart/content',totals:'cart/totals',pageTitle:'cart/page-title',statusMessages:'cart/status-messages'}};this.$overlay.show();// Remove last item from cart? Reload
if(remove&&$cartItemsRows.length===1){return window.location.reload()}__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.getContent(options,function(err,response){_this8.$cartContent.html(response.content);_this8.$cartTotals.html(response.totals);_this8.$cartMessages.html(response.statusMessages);$cartPageTitle.replaceWith(response.pageTitle);_this8.bindEvents();_this8.$overlay.hide();_this8.$overlay.html('');var quantity=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart-quantity]',_this8.$cartContent).data('cart-quantity')||0;__WEBPACK_IMPORTED_MODULE_3_jquery___default()('body').trigger('cart-quantity-update',quantity);_this8.cartGetDelivery()})};Cart.prototype.bindCartEvents=function bindCartEvents(){var _this9=this;var debounceTimeout=400;var cartUpdate=__WEBPACK_IMPORTED_MODULE_1_lodash_bind___default()(__WEBPACK_IMPORTED_MODULE_0_lodash_debounce___default()(this.cartUpdate,debounceTimeout),this);var cartRemoveItem=__WEBPACK_IMPORTED_MODULE_1_lodash_bind___default()(__WEBPACK_IMPORTED_MODULE_0_lodash_debounce___default()(this.cartRemoveItem,debounceTimeout),this);// cart update
__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart-input-update]',this.$cartContent).on('change',function(event){var $target=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget);event.preventDefault();// update cart quantity
cartUpdate($target)});__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-cart-update]',this.$cartContent).on('click',function(event){var $target=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget);event.preventDefault();// update cart quantity
cartUpdate($target)});__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.cart-remove',this.$cartContent).on('click',function(event){var itemId=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).data('cart-itemid');var string=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).data('confirm-delete');var sku=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).data('sku');if(sku.includes('SKUSI')){var amount=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).data('amount');if(amount>=20){__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:'Orders with a value of $1,999 or more require shipping insurance',type:'info'})}else{__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:'You will NOT be covered for your order in case it is lost, damaged or stolen. Are you sure to remove this option?',type:'warning',showCancelButton:true}).then(function(){// remove item from cart
cartRemoveItem(itemId,true)});event.preventDefault()}}else{__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:string,type:'warning',showCancelButton:true}).then(function(){// remove item from cart
cartRemoveItem(itemId)});event.preventDefault()}});__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-item-edit]',this.$cartContent).on('click',function(event){var itemId=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).data('item-edit');event.preventDefault();// edit item in cart
_this9.cartEditOptions(itemId)})};Cart.prototype.bindPromoCodeEvents=function bindPromoCodeEvents(){var _this10=this;var $couponContainer=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.coupon-code');var $couponForm=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.coupon-form');var $codeInput=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[name="couponcode"]',$couponForm);__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.coupon-code-add').on('click',function(event){event.preventDefault();__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).hide();$couponContainer.show();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.coupon-code-cancel').show();$codeInput.focus()});__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.coupon-code-cancel').on('click',function(event){event.preventDefault();$couponContainer.hide();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.coupon-code-cancel').hide();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.coupon-code-add').show()});$couponForm.on('submit',function(event){var code=$codeInput.val();event.preventDefault();// Empty code
if(!code){return __WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:$codeInput.data('error'),type:'error'})}__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.applyCode(code,function(err,response){if(response.data.status==='success'){_this10.refreshContent()}else{__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:response.data.errors.join('\n'),type:'error'})}})})};Cart.prototype.bindGiftCertificateEvents=function bindGiftCertificateEvents(){var _this11=this;var $certContainer=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.gift-certificate-code');var $certForm=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.cart-gift-certificate-form');var $certInput=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[name="certcode"]',$certForm);__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.gift-certificate-add').on('click',function(event){event.preventDefault();__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).toggle();$certContainer.toggle();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.gift-certificate-cancel').toggle()});__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.gift-certificate-cancel').on('click',function(event){event.preventDefault();$certContainer.toggle();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.gift-certificate-add').toggle();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.gift-certificate-cancel').toggle()});$certForm.on('submit',function(event){var code=$certInput.val();event.preventDefault();if(!Object(__WEBPACK_IMPORTED_MODULE_4__common_gift_certificate_validator__["a" /* default */])(code)){return __WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:$certInput.data('error'),type:'error'})}__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.applyGiftCertificate(code,function(err,resp){if(resp.data.status==='success'){_this11.refreshContent()}else{__WEBPACK_IMPORTED_MODULE_8_sweetalert2___default()({text:resp.data.errors.join('\n'),type:'error'})}})})};Cart.prototype.bindGiftWrappingEvents=function bindGiftWrappingEvents(){var _this12=this;var modal=Object(__WEBPACK_IMPORTED_MODULE_7__global_modal__["b" /* defaultModal */])();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-item-giftwrap]').on('click',function(event){var itemId=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget).data('item-giftwrap');var options={template:'cart/modals/gift-wrapping-form'};event.preventDefault();modal.open();__WEBPACK_IMPORTED_MODULE_5__bigcommerce_stencil_utils__["b" /* default */].api.cart.getItemGiftWrappingOptions(itemId,options,function(err,response){modal.updateContent(response.content);_this12.bindGiftWrappingForm()})})};Cart.prototype.bindGiftWrappingForm=function bindGiftWrappingForm(){__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.giftWrapping-select').change(function(event){var $select=__WEBPACK_IMPORTED_MODULE_3_jquery___default()(event.currentTarget);var id=$select.val();var index=$select.data('index');if(!id){return}var allowMessage=$select.find('option[value='+id+']').data('allow-message');__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.giftWrapping-image-'+index).hide();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#giftWrapping-image-'+index+'-'+id).show();if(allowMessage){__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#giftWrapping-message-'+index).show()}else{__WEBPACK_IMPORTED_MODULE_3_jquery___default()('#giftWrapping-message-'+index).hide()}});__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.giftWrapping-select').trigger('change');function toggleViews(){var value=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('input:radio[name ="giftwraptype"]:checked').val();var $singleForm=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.giftWrapping-single');var $multiForm=__WEBPACK_IMPORTED_MODULE_3_jquery___default()('.giftWrapping-multiple');if(value==='same'){$singleForm.show();$multiForm.hide()}else{$singleForm.hide();$multiForm.show()}}__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[name="giftwraptype"]').click(toggleViews);toggleViews()};Cart.prototype.bindEvents=function bindEvents(){this.bindCartEvents();this.bindPromoCodeEvents();this.bindGiftWrappingEvents();this.bindGiftCertificateEvents();if(__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[content-init]').attr('content-init')=='true'){this.cartCheckSI();__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[content-init]').attr('content-init',false)}// initiate shipping estimator module
this.shippingEstimator=new __WEBPACK_IMPORTED_MODULE_6__cart_shipping_estimator__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3_jquery___default()('[data-shipping-estimator]'))};return Cart}(__WEBPACK_IMPORTED_MODULE_2__page_manager__["a" /* default */]);/* harmony default export */ __webpack_exports__["default"] = (Cart);

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(73),
    createWrap = __webpack_require__(432),
    getHolder = __webpack_require__(434),
    replaceHolders = __webpack_require__(435);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
var bind = baseRest(function(func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG;
  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bind));
    bitmask |= WRAP_PARTIAL_FLAG;
  }
  return createWrap(func, bitmask, thisArg, partials, holders);
});

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;


/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(188),
    createCtor = __webpack_require__(433),
    root = __webpack_require__(72);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;


/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(131),
    isObject = __webpack_require__(34);

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtor;


/***/ }),

/***/ 434:
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ 435:
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_state_country__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_nod__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bigcommerce_stencil_utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_form_utils__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_sweetalert2__);
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var ShippingEstimator=function(){function ShippingEstimator($element){_classCallCheck(this,ShippingEstimator);this.$element=$element;this.$state=__WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-field-type="State"]',this.$element);this.initFormValidation();this.bindStateCountryChange();this.bindEstimatorEvents()}ShippingEstimator.prototype.initFormValidation=function initFormValidation(){var _this=this;this.shippingEstimator='form[data-shipping-estimator]';this.shippingValidator=Object(__WEBPACK_IMPORTED_MODULE_2__common_nod__["a" /* default */])({submit:this.shippingEstimator+' .shipping-estimate-submit'});__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-estimate-submit',this.$element).click(function(event){// When switching between countries, the state/region is dynamic
// Only perform a check for all fields when country has a value
// Otherwise areAll('valid') will check country for validity
if(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this.shippingEstimator+' select[name="shipping-country"]').val()){_this.shippingValidator.performCheck()}if(_this.shippingValidator.areAll('valid')){return}event.preventDefault()});this.bindValidation();this.bindStateValidation();this.bindUPSRates()};ShippingEstimator.prototype.bindValidation=function bindValidation(){this.shippingValidator.add([{selector:this.shippingEstimator+' select[name="shipping-country"]',validate:function validate(cb,val){var countryId=Number(val);var result=countryId!==0&&!Number.isNaN(countryId);cb(result)},errorMessage:'The \'Country\' field cannot be blank.'}])};ShippingEstimator.prototype.bindStateValidation=function bindStateValidation(){var _this2=this;this.shippingValidator.add([{selector:__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.shippingEstimator+' select[name="shipping-state"]'),validate:function validate(cb){var result=void 0;var $ele=__WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this2.shippingEstimator+' select[name="shipping-state"]');if($ele.length){var eleVal=$ele.val();result=eleVal&&eleVal.length&&eleVal!=='State/province'}cb(result)},errorMessage:'The \'State/Province\' field cannot be blank.'}])};/**
     * Toggle between default shipping and ups shipping rates
     */ShippingEstimator.prototype.bindUPSRates=function bindUPSRates(){var UPSRateToggle='.estimator-form-toggleUPSRate';__WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').on('click',UPSRateToggle,function(event){var $estimatorFormUps=__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.estimator-form--ups');var $estimatorFormDefault=__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.estimator-form--default');event.preventDefault();$estimatorFormUps.toggleClass('u-hiddenVisually');$estimatorFormDefault.toggleClass('u-hiddenVisually')})};ShippingEstimator.prototype.bindStateCountryChange=function bindStateCountryChange(){var _this3=this;var $last=void 0;// Requests the states for a country with AJAX
Object(__WEBPACK_IMPORTED_MODULE_1__common_state_country__["a" /* default */])(this.$state,this.context,{useIdForStates:true},function(err,field){if(err){__WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({text:err,type:'error'});throw new Error(err)}var $field=__WEBPACK_IMPORTED_MODULE_0_jquery___default()(field);if(_this3.shippingValidator.getStatus(_this3.$state)!=='undefined'){_this3.shippingValidator.remove(_this3.$state)}if($last){_this3.shippingValidator.remove($last)}if($field.is('select')){$last=field;_this3.bindStateValidation()}else{$field.attr('placeholder','State/province');__WEBPACK_IMPORTED_MODULE_4__common_form_utils__["a" /* Validators */].cleanUpStateValidation(field)}// When you change a country, you swap the state/province between an input and a select dropdown
// Not all countries require the province to be filled
// We have to remove this class when we swap since nod validation doesn't cleanup for us
__WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success')})};ShippingEstimator.prototype.bindEstimatorEvents=function bindEstimatorEvents(){var $estimatorContainer=__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-estimator');var $estimatorForm=__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.estimator-form');$estimatorForm.on('submit',function(event){var params={country_id:__WEBPACK_IMPORTED_MODULE_0_jquery___default()('[name="shipping-country"]',$estimatorForm).val(),state_id:__WEBPACK_IMPORTED_MODULE_0_jquery___default()('[name="shipping-state"]',$estimatorForm).val(),city:__WEBPACK_IMPORTED_MODULE_0_jquery___default()('[name="shipping-city"]',$estimatorForm).val(),zip_code:__WEBPACK_IMPORTED_MODULE_0_jquery___default()('[name="shipping-zip"]',$estimatorForm).val()};event.preventDefault();__WEBPACK_IMPORTED_MODULE_3__bigcommerce_stencil_utils__["b" /* default */].api.cart.getShippingQuotes(params,'cart/shipping-quotes',function(err,response){__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-quotes').html(response.content);// bind the select button
__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.select-shipping-quote').on('click',function(clickEvent){var quoteId=__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-quote:checked').val();clickEvent.preventDefault();__WEBPACK_IMPORTED_MODULE_3__bigcommerce_stencil_utils__["b" /* default */].api.cart.submitShippingQuote(quoteId,function(){window.location.reload()})})})});__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-estimate-show').on('click',function(event){event.preventDefault();__WEBPACK_IMPORTED_MODULE_0_jquery___default()(event.currentTarget).hide();$estimatorContainer.removeClass('u-hiddenVisually');__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-estimate-hide').show()});__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-estimate-hide').on('click',function(event){event.preventDefault();$estimatorContainer.addClass('u-hiddenVisually');__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-estimate-show').show();__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.shipping-estimate-hide').hide()})};return ShippingEstimator}();/* harmony default export */ __webpack_exports__["a"] = (ShippingEstimator);

/***/ })

});
//# sourceMappingURL=theme-bundle.chunk.4.js.map