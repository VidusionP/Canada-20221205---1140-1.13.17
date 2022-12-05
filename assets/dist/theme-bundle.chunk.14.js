webpackJsonp([14],{

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bigcommerce_stencil_utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__catalog__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_faceted_search__ = __webpack_require__(414);
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Category=function(_CatalogPage){_inherits(Category,_CatalogPage);function Category(){_classCallCheck(this,Category);return _possibleConstructorReturn(this,_CatalogPage.apply(this,arguments))}Category.prototype.loaded=function loaded(){if(__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#facetedSearch').length>0){this.initFacetedSearch()}else{this.onSortBySubmit=this.onSortBySubmit.bind(this);__WEBPACK_IMPORTED_MODULE_0__bigcommerce_stencil_utils__["c" /* hooks */].on('sortBy-submitted',this.onSortBySubmit)}this.showMoreProducts();this.infiniteScroll()};Category.prototype.infiniteScroll=function infiniteScroll(){var elem=document.querySelector('.productGrid');var infScroll=new InfiniteScroll(elem,{// options
path:'.pagination-item--next .pagination-link',append:'.product',history:false,scrollThreshold:100,onInit:function onInit(){this.on('request',function(){__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.pagination').css('display','none');__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#listing-showmoreBtn > a').addClass('loading')});this.on('last',function(){__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#listing-showmoreBtn > a').removeClass('loading');__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#listing-showmoreBtn').addClass('pagination-disable button').text('No more products')})}});return infScroll};Category.prototype.initFacetedSearch=function initFacetedSearch(){var _this2=this;var $productListingContainer=__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#product-listing-container');var $facetedSearchContainer=__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#faceted-search-container');var productsPerPage=this.context.categoryProductsPerPage;var requestOptions={config:{category:{shop_by_price:true,products:{limit:productsPerPage}}},template:{productListing:'category/product-listing',sidebar:'category/sidebar'},showMore:'category/show-more'};this.facetedSearch=new __WEBPACK_IMPORTED_MODULE_3__common_faceted_search__["a" /* default */](requestOptions,function(content){$productListingContainer.html(content.productListing);$facetedSearchContainer.html(content.sidebar);_this2.showMoreProducts();__WEBPACK_IMPORTED_MODULE_2_jquery___default()('html, body').animate({scrollTop:0},100)})};Category.prototype.showMoreProducts=function showMoreProducts(){var context=this.context;__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.button--showmore').on('click',function(event){event.preventDefault();var nextPage=__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.pagination-item--current').next(),link=nextPage.find('a').attr('href');__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#listing-showmoreBtn > a').addClass('loading');__WEBPACK_IMPORTED_MODULE_2_jquery___default.a.ajax({type:'get',url:link.replace('http://','//'),success:function success(data){if(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(data).find('#product-listing-container .productGrid').length>0){__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#product-listing-container .productGrid').append(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(data).find('#product-listing-container .productGrid').children());__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.pagination-list').html(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(data).find('.pagination-list').html());__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#listing-showmoreBtn > a').removeClass('loading').blur();if(Number(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(data).find('.pagination-info .end').text())<=Number(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(data).find('.pagination-info .total').text())){__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.pagination .pagination-info .end').text(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(data).find('.pagination-info .end').text())}else{__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.pagination .pagination-info .end').text(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(data).find('.pagination-info .total').text())}nextPage=__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.pagination-item--current').next();if(nextPage.length===0){__WEBPACK_IMPORTED_MODULE_2_jquery___default()('#listing-showmoreBtn').addClass('pagination-disable button').text('No more products')}}}})})};return Category}(__WEBPACK_IMPORTED_MODULE_1__catalog__["a" /* default */]);/* harmony default export */ __webpack_exports__["default"] = (Category);

/***/ })

});
//# sourceMappingURL=theme-bundle.chunk.14.js.map