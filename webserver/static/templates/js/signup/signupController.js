
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var SignUpController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();


		this.onSignUp = function(userName, password, phoneNumber){

			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			window.location = "/signup/"

		/*	var successCallBack = function(response){
				//response = JSON.parse(response);
				window.location = "signup"
			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			var dataJson = {"email_id":userName,
											"password":password,
											"phoneNumber":phoneNumber
											};
			request.setMimeType("application/json");
			request.setRequestUrl("/new_user/");
			request.setXhrRequestType("POST");
			request.setRequestData(dataJson);

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);*/
		};
	};
	return SignUpController;
});
