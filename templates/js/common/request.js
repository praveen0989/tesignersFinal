define([], function(){
	var Request = function(){
		var mimeType;
        var requestType;
        var requestUrl;
        var xhrRequestType;
        var requestData;


        this.getRequestData = function () {
            return requestData;
        };

        this.getMimeType = function () {
            return mimeType;
        };

        this.getRequestType = function () {
            return requestType;
        };

        this.getRequestUrl = function () {
            return requestUrl;
        };

        this.getXhrRequestType = function () {
            return xhrRequestType;
        };

        this.setMimeType = function (mType) {
            mimeType = mType;
        };

        this.setRequestType = function (rType) {
            requestType = rType;
        };

        this.setRequestUrl = function (rUrl) {
            requestUrl = rUrl ;
        };

        this.setXhrRequestType = function (xhrType) {
            xhrRequestType = xhrType;
        };

        this.setRequestData = function (rData) {
            requestData = rData;
        };

	};
	
	return Request;
	
});
