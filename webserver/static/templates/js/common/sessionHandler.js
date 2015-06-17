define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){

  var requestDispatcher = new RequestDispatcher();
  var request = new Request();

  var SessionHandler = function(){

        this.setCookieValue = function(cookieName, value, expireInYears) {
                  var sExpires = "";
                  if (expireInYears && expireInYears > 0) {
                      var oExpireDate = new Date();
                      oExpireDate.setTime(oExpireDate.getTime() + (3600 * 1000 * 24 * 365 * expireInYears));
                      sExpires = "expires=" + oExpireDate.toGMTString();
                  }
                  document.cookie = cookieName + "=" + escape(value) + "; " + sExpires + ";path=/";
        };

        this.getCookieValue = function(cookieName) {
          var i, x, y, aCookies = document.cookie.split(";");
          for (i = 0; i < aCookies.length; i++) {
              x = aCookies[i].substr(0, aCookies[i].indexOf("="));
              y = aCookies[i].substr(aCookies[i].indexOf("=") + 1);
              x = x.replace(/^\s+|\s+$/g, "");
              if (x == (cookieName)) {
                  return unescape(y);
              }
          }
        };

        this.deleteCookie = function(cookieName) {
          var d = new Date();
          document.cookie = cookieName + "=" + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        };

        this.validateSession = function() {
          that = this;
          var sSessionId = this.getCookieValue("sessionId");
            if (!sSessionId) {
              window.location = "/login/";
            } else {
                  var successCallBack = function(response){
                    response = JSON.parse(response);
                      that.setCookieValue("user", response.user, 1);
                  };

                  var failureCallBack = function(){
                      window.location = "/login/";
                  };

                  var dataJson = {"sessionId":sSessionId};
                  request.setMimeType("application/json");
                  request.setRequestUrl("/validate_session/");
                  request.setXhrRequestType("POST");
                  request.setRequestData(dataJson);

                  requestDispatcher.executeRequest(request, successCallBack, failureCallBack);

          }
      };

      this.validateSessionInLogin = function() {
        that = this;
        var sSessionId = this.getCookieValue("sessionId");
          if (!sSessionId) {
          //  window.location = "/login/";
          } else {
                var successCallBack = function(response){
                  response = JSON.parse(response);
                    that.setCookieValue("user", response.user, 1);
                    window.location = "/dashboard/";
                };

                var failureCallBack = function(){
                  //  window.location = "/login/";
                };

                var dataJson = {"sessionId":sSessionId};
                request.setMimeType("application/json");
                request.setRequestUrl("/validate_session/");
                request.setXhrRequestType("POST");
                request.setRequestData(dataJson);

                requestDispatcher.executeRequest(request, successCallBack, failureCallBack);

        }
    };

  };
  return SessionHandler;

});
