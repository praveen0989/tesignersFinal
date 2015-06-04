define([], function(){

    var RequestDispatcher = function(){
        
        var oXHR;
        this.executeRequest = function (oRequest, successCallBack, failureCallBack) {           
        
            oXHR = $.ajax({
                url: oRequest.getRequestUrl(),
                type: oRequest.getXhrRequestType(),           
                //data: oRequest.getRequestString(),
                /*headers: {
                    "x-sap-request-language": Locale.getViewingLocale(),
                    "X-CSRF-Token": Helpers.CommonHelpers.getCsrfToken()
                },*/
                success: successCallBack,
                error: failureCallBack
            });

        };

        this.getXHR = function(){
            return oXHR;
        };

    };
    
    return RequestDispatcher;
    
});
