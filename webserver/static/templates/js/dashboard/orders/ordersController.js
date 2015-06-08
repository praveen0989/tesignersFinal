
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var OrdersController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();


		this.loadOrders = function(email,type){

			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			var successCallBack = function(response){

			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			request.setMimeType("application/json");
			request.setRequestUrl("/orders/");
			request.setXhrRequestType("POST");
			var dataJson = {"email_id":email,
											"type":type
											};
			request.setRequestData(dataJson);

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};



	};
	return OrdersController;
});
