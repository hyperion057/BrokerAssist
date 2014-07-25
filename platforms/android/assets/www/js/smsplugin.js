
var SmsPlugin = {
	    send: function(phone, message, method, successCallback, failureCallback) {
	        cordova.exec(
	            successCallback,
	            failureCallback,
	            'SmsPlugin',
	            'SendSMS',
	            [phone, message, method]
	        );
	    }
	};