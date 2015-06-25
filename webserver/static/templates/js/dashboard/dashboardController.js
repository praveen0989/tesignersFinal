
define(["common/requestDispatcher", "common/request","common/sessionHandler"], function(RequestDispatcher, Request,SessionHandler){
	var DashboardController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();
		var sessionHandler = new SessionHandler();

		this.onLogin = function(userName, password){
			alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			var successCallBack = function(){
				alert("Success");
			};

			var failureCallBack = function(){
				alert("Failure");
			};

			request.setMimeType("application/json");
			request.setRequestUrl("http://ip.jsontest.com/?mime=5");
			request.setXhrRequestType("GET");

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};

		this.logout = function(){
			var successCallBack = function(response){
				response = JSON.parse(response);
				if(response.status === 'success')
						window.location = "/login/";
			};
			var failureCallBack = function(response){
			};

			var sSessionId = sessionHandler.getCookieValue("sessionId");
			var dataJson = {"sessionId":sSessionId};
			request.setMimeType("application/json");
			request.setRequestUrl("/logout_session/");
			request.setXhrRequestType("POST");
			request.setRequestData(dataJson);

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};


	};
	return DashboardController;
});
