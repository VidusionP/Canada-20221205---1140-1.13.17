import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';

export default class Category extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
        this.showMoreProducts();
        this.infiniteScroll();
    }
    infiniteScroll() {
 
        const elem = document.querySelector('.productGrid');
        const infScroll = new InfiniteScroll(elem, {
        // options
            path: '.pagination-item--next .pagination-link',
            append: '.product',
            history: false,
            scrollThreshold: 100,
            onInit: function() {
                this.on( 'request', function() {
                    $('.pagination').css('display', 'none')
                    $('#listing-showmoreBtn > a').addClass('loading');
                });
                this.on ( 'last' , function() {
                    $('#listing-showmoreBtn > a').removeClass('loading');
                    $('#listing-showmoreBtn').addClass('pagination-disable button').text('No more products');

                })
              }

        });
        return infScroll;
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);
            this.showMoreProducts();
            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }

    showMoreProducts() {
        const context = this.context;

        $('.button--showmore').on('click', (event) => {
            event.preventDefault();
            var nextPage = $(".pagination-item--current").next(),
                link = nextPage.find("a").attr("href");
            $('#listing-showmoreBtn > a').addClass('loading');

            $.ajax({
                type: 'get',
                url: link.replace("http://", "//"),
                success: function(data) {
                    if ($(data).find('#product-listing-container .productGrid').length > 0) {
                        
                        $('#product-listing-container .productGrid').append($(data).find('#product-listing-container .productGrid').children());

                        $('.pagination-list').html($(data).find(".pagination-list").html());

                        $('#listing-showmoreBtn > a').removeClass('loading').blur();

                        if (Number($(data).find('.pagination-info .end').text()) <= Number($(data).find('.pagination-info .total').text())) {
                            $('.pagination .pagination-info .end').text($(data).find('.pagination-info .end').text());
                        } else {
                            $('.pagination .pagination-info .end').text($(data).find('.pagination-info .total').text());
                        }

                        nextPage = $(".pagination-item--current").next();

                        if (nextPage.length === 0) {
                            $('#listing-showmoreBtn').addClass('pagination-disable button').text('No more products');
                        }
                    }
                }
            });
        });
    }
}
