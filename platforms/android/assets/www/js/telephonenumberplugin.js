
var TelephoneNumberPlugin = {
	    get: function(successCallback, failureCallback) {
	        cordova.exec(
	            successCallback,
	            failureCallback,
	            'TelephoneNumberPlugin',
	            'TelephoneNumber',
	            []
	        );
	    }
	};