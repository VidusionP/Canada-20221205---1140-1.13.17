import $ from 'jquery';
import 'easyzoom';
import _ from 'lodash';

export default class ImageGallery {
    constructor($gallery) {
        this.$mainImage = $gallery.find('[data-image-gallery-main]');
        this.$mainVideo = $gallery.find('[data-img-video-gallery-main]');
        this.$selectableImages = $gallery.find('[data-image-gallery-item]');
        this.currentImage = {};
    }

    init() {
        this.bindEvents();
        // this.setImageZoom();
        this.box();
    }
    box() {
        if ($('.productView-thumbnails').hasClass('slick-initialized')){
            $('.productView-thumbnail.slick-current .productView-thumbnail-link').addClass('is-active')
        } else {
            let target = $($('.productView-thumbnail')[0].children[0])
            target.addClass('is-active')

        }
        let x = $('.top-view').height()

        let z = $(window).height() - $('.top-view').offset().top - x -20
        $(".product-zoom").css({width: `${x + z}px`, height: `${x + z}px`});
    }


    check(e) {
        e.preventDefault();
        let width = window.innerWidth;
        $('.productView-thumbnails').slick('slickNext')

        let slickActive = $($('.productView-thumbnail.slick-active')[0].children[0])
        
        if (slickActive.find("img").attr('alt').includes('youtube')) {
                const imgVideoObj = {
                    mainVideoUrl: slickActive.find("img").attr("alt"),                
                    $selectedThumb: slickActive,
                };
        
                this.setMainVideo(imgVideoObj);
        } else {
                const imgObj = {
                    mainImageUrl: slickActive.attr('data-image-gallery-new-image-url'),
                    zoomImageUrl: slickActive.attr('data-image-gallery-zoom-image-url'),
                    $selectedThumb: slickActive,
                };
                this.setMainImage(imgObj);
        }
    }

    setMainImage(imgObj) {
        this.currentImage = _.clone(imgObj);

        this.setActiveThumb();
        this.swapMainImage();
    }

    setMainVideo(videoObj) {
        this.currentImage = _.clone(videoObj);

        this.setActiveThumb();
        this.swapMainVideo();
    }

    setAlternateImage(imgObj) {
        if (!this.savedImage) {
            this.savedImage = {
                mainImageUrl: this.$mainImage.find('img').attr('src'),
                zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
                $selectedThumb: this.currentImage.$selectedThumb,
            };
        }
        this.setMainImage(imgObj);
    }

    restoreImage() {
        if (this.savedImage) {
            this.setMainImage(this.savedImage);
            delete this.savedImage;
        }
    }

    selectNewImage(e) {
        e.preventDefault();

        const $target = $(e.currentTarget);
        if ($('.productView-thumbnails').hasClass('slick-initialized')){
            
            var currentSlide = $('.productView-thumbnails').slick('slickCurrentSlide');
            let currentIndex = $target.parent().attr('data-slick-index')
    
            if (currentSlide != currentIndex) {
                $('.productView-thumbnails').slick('slickGoTo', currentIndex)
            }
            if ($target.find("img").attr("alt").includes("youtube")) {
                const imgVideoObj = {
                    mainVideoUrl: $target.find("img").attr("alt"),                
                    $selectedThumb: $target,
                };
        
                this.setMainVideo(imgVideoObj);
            } else {
                const imgObj = {
                    mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
                    zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
                    $selectedThumb: $target,
                };
                this.setMainImage(imgObj);
            }
        } else {

            if ($target.find("img").attr("alt").includes("youtube")) {
                const imgVideoObj = {
                    mainVideoUrl: $target.find("img").attr("alt"),                
                    $selectedThumb: $target,
                };
        
                this.setMainVideo(imgVideoObj);
            } else {
                const imgObj = {
                    mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
                    zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
                    $selectedThumb: $target,
                };
        
                this.setMainImage(imgObj);
            }
        }

    }

    setActiveThumb() {
        this.$selectableImages.removeClass('is-active');
        if (this.currentImage.$selectedThumb) {
            this.currentImage.$selectedThumb.addClass('is-active');
        }
        const $target1 = $($('.productView-thumbnail.slick-current').find("a"))
        $target1.addClass('is-active')

    }

    getParameterFromYoutube(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    swapMainVideo() {
        let id = this.getParameterFromYoutube('v', this.currentImage.mainVideoUrl);
        this.$mainVideo.attr({
            'src': `https://www.youtube.co/embed/${id}?controls=1`
        })
        this.$mainVideo.show();
        this.$mainImage.hide();        
    }

    swapMainImage() {
        // this.easyzoom.data('easyZoom').swap(this.currentImage.mainImageUrl, this.currentImage.zoomImageUrl);

        // this.$mainImage.attr({
        //     'data-zoom-image': this.currentImage.zoomImageUrl,
        // });
        let jcheck = $($('.magnifierLens'));
        let vcheck = $($('.product-zoom'));
        let vcheck1 = $($('.productView-image .productView-image--default'));

        jcheck.attr({
            "href" : this.currentImage.zoomImageUrl
           })
        vcheck.find("img").attr({
            "src" : this.currentImage.zoomImageUrl
        })
        vcheck1.attr({
            "src" : this.currentImage.mainImageUrl
        })

        this.$mainVideo.attr({
            'src': ""
        })
        this.$mainVideo.hide();
        this.$mainImage.show();
    }

    // setImageZoom() {
    //     this.easyzoom = this.$mainImage.easyZoom({ errorNotice: '', loadingNotice: '' });
    // }

    bindEvents() {
        this.$selectableImages.on('click', this.selectNewImage.bind(this));
        $('#nextThumbnail').on('click', this.check.bind(this))
        $('#prevThumbnail').on('click', this.check.bind(this))
        if ($(window).width() > 920 ) {
            $('.main-figure').on('mouseover', function(e) {
                $('.product-zoom').addClass('is-active1')
    
            })
            
            $('.main-figure').on('mouseleave', function() {
                $('.product-zoom').removeClass('is-active1')
            })
        }

    }
}
