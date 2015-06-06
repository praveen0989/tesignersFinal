define([], function(){

    var RequestDispatcher = function(){

        var oXHR;
        this.executeRequest = function (oRequest, successCallBack, failureCallBack) {
          var csrftoken = $.cookie('csrftoken');
          alert(csrftoken);

            oXHR = $.ajax({
                url: oRequest.getRequestUrl(),
                type: oRequest.getXhrRequestType(),
                //data: oRequest.getRequestString(),
                headers: {
                    "X-CSRF-Token": csrftoken
                },
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
