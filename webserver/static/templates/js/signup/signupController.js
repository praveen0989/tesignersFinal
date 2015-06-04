
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var SignUpController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();


		this.onSignUp = function(userName, password, phoneNumber){

			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			var successCallBack = function(){
				window.location = "signup"
			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			request.setMimeType("application/json");
			request.setRequestUrl("/signup/");
			request.setXhrRequestType("GET");

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};
	};
	return SignUpController;
});
