
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var ProductInfoController = function(app){

		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();

		this.initModel = function(model){
			var successCallBack = function(response){
				response = JSON.parse(response);
				model.supportedEntities = response.supportedEntities;
				model.supportedIds = response.supportedIds;
				model.supportedPrinters = response.supportedPrinters;
				$("#productsTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'T-Shirt type',sortorder: "asc",data: model.supportedEntities }).trigger('reloadGrid');
			};

			var failureCallBack = function(){
				//alert("Failure");
			};
			user = sessionStorage.getItem("user");
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
