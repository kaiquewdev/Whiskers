Ti.include('/action/main.action.js');

var win = Ti.UI.createWindow({
	url: Whiskers.path( 'view', Whiskers.view.recognize( 'main' ) ),
	backgroundColor: '#fff',
});

win.open();