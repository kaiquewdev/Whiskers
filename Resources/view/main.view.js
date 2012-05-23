Ti.include('/action/main.action.js');

var currentWindow = Ti.UI.currentWindow;

var toolbar = Whiskers.ui.toolbar({
	leftButton: {
		title: 'Mustache'
	}
});
currentWindow.add( toolbar[0] );

var body = Whiskers.ui.body();
currentWindow.add( body[0] );

var face = Ti.UI.createImageView({
	url: Whiskers.path( 'image', 'face.jpg' ),
	widt: '100%',
	height: '100%',
	top: 0,
});
body[0].add( face );

var mustache = Ti.UI.createImageView({
	url: Whiskers.path( 'image', 'mustache-01.png' ),
	top: 0,
	left: 0,
	width: 130,
	height: 50,
});
body[0].add( mustache );
mustache.hide();

toolbar[1].addEventListener('touchend', function () {
	mustache.show();
});

// Set a base for x and y
var touchMoveBase = {};

touchMoveBase.set = function ( point ) {
	this.x = point.x;
	this.y = point.y;
}

// Get a position of top and left for mustache
var mustachePosition = {
	top: mustache.top,
	left: mustache.left,
};

mustache.addEventListener('touchstart', function ( e ) {
	if ( Ti.Platform.osname === 'ipad' || Ti.Platform.osname === 'iphone' ) {
		touchMoveBase.set( e.globalPoint );
	} if ( Ti.Platform.osname === 'android' ) {
		touchMoveBase.set({
			x: e.x,
			y: e.y,
		});
	}
});

mustache.addEventListener('touchmove', function ( e ) {
	var elapsed_time = 0;

	if ( Ti.Platform.osname === 'ipad' || Ti.Platform.osname === 'iphone' ) {
		mustachePosition.top += e.globalPoint.y - touchMoveBase.y;
		mustachePosition.left += e.globalPoint.x - touchMoveBase.x;

		elapsed_time = 1;

		mustache.animate({
			top: mustachePosition.top,
			left: mustachePosition.left,
			duration: elapsed_time,
		});

		touchMoveBase.set( e.globalPoint );
	} if ( Ti.Platform.osname === 'android' ) { 
		mustachePosition.top += e.y - touchMoveBase.y;
		mustachePosition.left += e.x - touchMoveBase.x;

		elapsed_time = 200;

		setTimeout(function () {
			mustache.animate({
				top: mustachePosition.top,
				left: mustachePosition.left,
				duration: elapsed_time,
			});
		}, 125);

		touchMoveBase.set({
			x: e.x,
			y: e.y,
		});
	}
});