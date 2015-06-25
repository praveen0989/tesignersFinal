
define(["common/requestDispatcher", "common/request","common/sessionHandler"], function(RequestDispatcher, Request,SessionHandler){
	var PendingOrdersController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();
		var sessionHandler = new SessionHandler();
		
		this.saveStateChange = function(data){
			var successCallBack = function(response){
				window.location = "/dashboard/";
			};

			var failureCallBack = function(){
			};

			request.setMimeType("application/json");
			request.setRequestUrl("/savestate/");
			request.setXhrRequestType("POST");
			var jsonData = {"email_id" : sessionHandler.getCookieValue("user"), "stch" : data, "type" : 0};
			request.setRequestData(JSON.stringify(jsonData));
			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};

		this.getPendingOrders = function(model, email_id, type){

			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			var successCallBack = function(response){
				response = JSON.parse(response);
				model.ordersData = response.response;
				$("#ordersTable").jqGrid('setGridParam', { datatype: 'local', data: model.ordersData }).trigger('reloadGrid');
				//$("#ordersTable").append("<img src='" +  response.key1img + "'></img>")
				
			};

			var failureCallBack = function(){
				//alert("Failure");
			};

			var dataJson = {'email_id':sessionHandler.getCookieValue("user"), 'type':type};

			request.setMimeType("application/json");
			request.setRequestUrl("/orders/");
			request.setXhrRequestType("POST");
			request.setRequestData(dataJson);
			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};




	};
	return PendingOrdersController;
});
