
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var ProductInfoController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();

		this.saveProductDetails = function(jsonData){

			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			var successCallBack = function(response){
				window.location = "/dashboard";
			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			request.setMimeType("application/json");
			request.setRequestUrl("/products/");
			request.setXhrRequestType("POST");
			request.setRequestData(JSON.stringify(jsonData));

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};

	};
	return ProductInfoController;
});
