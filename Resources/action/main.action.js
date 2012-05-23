// Reserved namespace
var Whiskers = (function () {
	var _ = function () {};

	// Mount path with file
	var mountPath = function ( absolutePath, file ) {
		var output = '';

		if ( absolutePath && file ) {
			output = String.format( '%s/%s', absolutePath, file );
		}

		return output;
	};

	// Permanent paths in the project
	var permanentPaths = {
		image: '/static/image',
		db: '/static/db',
		html: '/static/html',
		view: '/view',
	};

	_.prototype.view = {
		prefix: '',
		suffix: '.view.js'
	};
	
	_.prototype.view.recognize = function ( fileName ) {
		var self = this,
			output = '';

		if ( fileName ) {
			output = String.format( '%s%s%s', self.prefix, fileName, self.suffix );
		}

		return output;
	};

	// verify if the path exist
	_.prototype.hasPath = function () {};
	// method to get path and file
	_.prototype.path = function ( staticFolderName, fileName ) {
		var self = this,
			output = '';

		if ( staticFolderName && fileName && ( staticFolderName in permanentPaths ) ) {
			output = mountPath( permanentPaths[ staticFolderName ], fileName );
		} else if ( staticFolderName && ( staticFolderName in permanentPaths ) ) {
			output = String.format( '%s/', permanentPaths[ staticFolderName ] );
		}

		return output;
	};

	// Create merge list
	var mergeObject = function ( leftList, rightList ) {
		var output = {};

		if ( leftList && rightList ) {
			for ( var rightKey in rightList ) {
				for ( var leftKey in leftList ) {
					if ( leftKey === rightKey ) {
						leftList[ leftKey ] = rightList[ rightKey ];
					} else if ( leftKey !== rightKey ) {
						leftList[ rightKey ] = rightList[ rightKey ];
 					}
				}
			}

			output = leftList;
		}

		return output;
	};
	// Merge Objects
	_.prototype.mergeObject = mergeObject;
	// User Interface
	_.prototype.ui = {};
	// Toolbar
	_.prototype.ui.toolbar = function ( settings ) {
		var output = [];
		var holder = [];
		var leftButton = [];
		// Holder toolbar pre settings
		var holderSettings = {
			top: 0,
			width: '100%',
			height: 50,
			backgroundColor: '#303030',
		};
		// Left toolbar button pre settings
		var leftButtonSettings = {
			top: 8,
			left: 10,
		};

		if ( settings ) {
			if ( 'holder' in settings ) {
				holderSettings = mergeObject( holderSettings, settings.holder );
			} if ( 'leftButton' in settings ) {
				leftButtonSettings = mergeObject( leftButtonSettings, settings.leftButton  );
			}
		}

		// Toolbar
		holder = Ti.UI.createView( holderSettings );
		output.push( holder );
		// Left Button in toolbar
		leftButton = Ti.UI.createButton( leftButtonSettings );
		holder.add( leftButton );
		output.push( leftButton );
		

		return output;
	};

	_.prototype.ui.body = function ( settings ) {
		var output = [];
		var holder = [];
		// Holder body pre settings
		var holderSettings = {
			top: 50,
			width: '100%',
			height: '100%',
			backgroundColor: '#d2d2d2'
		};
		if ( settings ) {
			if ( 'holder' in settings ) {
				holderSettings = mergeObject( holderSettings, settings.holder );
			}
		}

		// Holder body
		holder = Ti.UI.createView( holderSettings );
		output.push( holder );

		return output;
	};

	return new _();
} ());











