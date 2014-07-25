//var serviceURL = "http://54.225.71.93:8080/i-reflect/";
var serviceURL = "http://192.168.1.102:8080/i-reflect/";
var SALT = "root@ireflect#";
$(document).bind("mobileinit", function() {
	// Make your jQuery Mobile framework configuration changes here!
	$.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
	console.log('..dude.. mobileinit');
});

/**
 * Using this method
 * var params = new Object(); 
 * params.user =sessionStorage.getItem("username");
 * var imgUploadUrl = "mobile/upload"; NOTE:imageuploadurl and params may change.
 * capturePhoto(params,imgUploadUrl);
 * 
 */
function capturePhoto(params, uploadUrl) {
	imageUploadParams = params;
	imageUploadUrl = uploadUrl;
	console.log("imageUploadParams=", params, ".imageUploadUrl=",
			imageUploadUrl);
	var options = {
		quality : 50,
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
		encodingType : 0, // 0=JPG 1=PNG
		saveToPhotoAlbum : true
	};
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, options);
}

function onPhotoDataSuccess(imageURI) {
	console.log(imageURI);
	uploadPhoto(imageURI);
	console.log('...photo..done');
}
function onFail(message) {
	alert('Failed because: ' + message);
}

function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";
	options.httpMethod = "POST";
	options.chunkedMode = true;
	options.headers = {
		Connection : "close"
	};
	options.params = imageUploadParams;
	var targetUrl = serviceURL + imageUploadUrl;
	console.log('...options...' + options.fileName);
	var ft = new FileTransfer();
	ft.upload(imageURI, targetUrl, win, fail, options);
}

function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
}

function fail(error) {
	alert("An error has occurred: Code = " + error.code);
}
