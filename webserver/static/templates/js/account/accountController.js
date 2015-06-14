
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var AccountController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();

		this.initModel = function(model, renderOnInit){

			var successCallBack = function(response){
				response = JSON.parse(response);
				if(response.status === "failed"){
				alert("Signup failed! Try again");
				}else{
					//window.location = "/dashboard/";
					if(response.account_info !=="")
					model.accountDetails = response.account_info;
					if(response.bank_info !=="")
					model.bankDetails = response.bank_info;
					if(response.address_info !=="")
					model.accountAddress = response.address_info;
					renderOnInit();
				}

			};

			var failureCallBack = function(){
				//alert("Failure");
			};
			user = sessionStorage.getItem("user");
			var jsonData = {"email_id":user};
			request.setMimeType("application/json");
			request.setRequestUrl("/account_details/");
			request.setXhrRequestType("POST");
			request.setRequestData(jsonData);

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);

		};



		this.submitSignupDetails = function(jsonData){
			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
		    var successCallBack = function(response){
					response = JSON.parse(response);
					if(response.status === "failed"){
					alert("Signup failed! Try again");
					}else{
						sessionStorage.setItem("user", response.user);
						window.location = "/dashboard/";
					}

				};

				var failureCallBack = function(){
					//alert("Failure");
				};

				request.setMimeType("application/json");
				request.setRequestUrl("/new_user/");
				request.setXhrRequestType("POST");
				request.setRequestData(jsonData);

				requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};



	};
	return AccountController;
});
