$(document).ready(function() {

	// The PopUp Manager FancyBox
	// Documentation: http://fancybox.net/howto
	// <a class="fancybox"><img src="image.jpg" /></a>
	// <a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();



	// Owl Product Gallery
	var sync1 = $("#sync1");
	var sync2 = $("#sync2");
	var slidesPerPage = 4; //globaly define number of elements per page
	var syncedSecondary = true;

	sync1.owlCarousel({
		items : 1,
		slideSpeed : 2000,
		nav: true,
		dots: true,
		responsiveRefreshRate : 200,
		navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
	}).on('changed.owl.carousel', syncPosition);

	sync2
	.on('initialized.owl.carousel', function () {
		sync2.find(".owl-item").eq(0).addClass("current");
	})
	.owlCarousel({
		items : slidesPerPage,
		dots: true,
		smartSpeed: 200,
		slideSpeed : 500,
		touchDrag : false,
		mouseDrag : false,
					slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
					responsiveRefreshRate : 100
				}).on('changed.owl-carousel', syncPosition2);

	function syncPosition(el) {
		var current = el.item.index;

		sync2
		.find(".owl-item")
		.removeClass("current")
		.eq(current)
		.addClass("current");
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();

		if (current > end) {
			sync2.data('owl-carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl-carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if(syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl-carousel').to(number, 100, true);
		}
	}

	sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl-carousel').to(number, 300, true);
	});
	// Owl Product Gallery END

});