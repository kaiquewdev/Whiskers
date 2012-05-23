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

var mustache = Ti.UI.createImageView({
	url: Whiskers.path( 'image', 'mustache-01.png' ),
	top: 0,
	left: 0,
});
currentWindow.add( mustache );
mustache.hide();

toolbar[1].addEventListener('click', function () {
	mustache.show();
});

// Set a base for x and y
var touchMoveBase = {
	set: function ( point ) {
		this.x = point.x;
		this.y = point.y;
	},
};

// Get a position of top and left for mustache
var mustachePosition = {
	top: mustache.top,
	left: mustache.left,
};

mustache.addEventListener('touchstart', function ( e ) {
	touchMoveBase.set( e.globalPoint );
});

mustache.addEventListener('touchmove', function ( e ) {
	mustachePosition.top += e.globalPoint.y - touchMoveBase.y;
	mustachePosition.left += e.globalPoint.x - touchMoveBase.x;

	mustache.animate({
		top: mustachePosition.top,
		left: mustachePosition.left,
		duration: 1,
	});

	touchMoveBase.set( e.globalPoint );
});