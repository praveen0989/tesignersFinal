
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var CompletedOrdersController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();


		this.getCompletedOrders = function(model, email_id, type){

			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			var successCallBack = function(response){
				response = JSON.parse(response);
				model.ordersData = response.response;
				$("#ordersTable").jqGrid('setGridParam', { datatype: 'local', data: model.ordersData }).trigger('reloadGrid');
			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			var dataJson = {'email_id':email_id, 'type':type};

			request.setMimeType("application/json");
			request.setRequestUrl("/orders/");
			request.setXhrRequestType("POST");
			request.setRequestData(dataJson);
			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};




	};
	return CompletedOrdersController;
});
