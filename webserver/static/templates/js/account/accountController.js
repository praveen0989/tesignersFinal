
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var AccountController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();


		this.submitSignupDetails = function(jsonData){
			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
		    var successCallBack = function(response){
					response = JSON.parse(response);
					if(response.status === "failed"){
					alert("Signup failed! Try again");
					}else{
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
