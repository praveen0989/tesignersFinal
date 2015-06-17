
define(["common/requestDispatcher", "common/request", "common/sessionHandler"], function(RequestDispatcher, Request, SessionHandler){
	var ProductInfoController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();
		var sessionHandler = new SessionHandler();

		this.initModel = function(model){
			var successCallBack = function(response){
				response = JSON.parse(response);
				model.supportedEntities = response.supportedEntities;
				model.supportedIds = response.supportedIds;
				model.supportedPrintingTypes = response.supportedPrinters;
				$("#productsTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'T-Shirt type',sortorder: "asc",data: model.supportedEntities }).trigger('reloadGrid');
				$("#printerTypeTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'Printing Type',sortorder: "asc",data: model.supportedPrintingTypes }).trigger('reloadGrid');
			};

			var failureCallBack = function(){
				//alert("Failure");
			};
			user = sessionHandler.getCookieValue("user");
			var jsonData= {'email_id':user};

			request.setMimeType("application/json");
			request.setRequestUrl("/getproducts/");
			request.setXhrRequestType("POST");
			request.setRequestData(jsonData);

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};



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
