define(["common/requestDispatcher", "common/request","common/sessionHandler"], function(RequestDispatcher, Request,SessionHandler){
	var LoginController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();
		var sessionHandler = new SessionHandler();


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
						//var sSessionId = response.sessionId;
						sessionHandler.setCookieValue("sessionId", response.sessionId, 1);
						sessionHandler.setCookieValue("user", response.user, 1);
						//sessionStorage.setItem("user", response.user);
						window.location = "/dashboard/";
					}
			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			var dataJson = {"email_id":userName,"password":password	};

			request.setMimeType("application/json");
			request.setRequestUrl("/authenticate_user/");
			request.setXhrRequestType("POST");
			request.setRequestData(dataJson);

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};

	};
	return LoginController;
});
