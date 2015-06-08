define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var LoginController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();


		this.onLogin = function(userName, password){

			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			if( userName === ""){
					$('#loginErrorDiv').html("Please enter user email");
					$('#loginErrorDiv').css("display","block");
					$('#usernameinput').focus();
					return;
				} else if( password === ""){
					$('#loginErrorDiv').html("Please enter password");
					$('#loginErrorDiv').css("display","block");
					$('#passwordinput').focus();
					return;
				}

			var successCallBack = function(response){
					response = JSON.parse(response);
					if(response.status === "failed"){
						$('#loginErrorDiv').html(response.message);
						$('#loginErrorDiv').css("display","block");

					}else{
						window.location = "login";
					}
			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			var dataJson = {"email_id":userName,
											"password":password
											};

			request.setMimeType("application/json");
			request.setRequestUrl("/authenticate_user/");
			request.setXhrRequestType("POST");
			request.setRequestData(dataJson);

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};



	};
	return LoginController;
});
