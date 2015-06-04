
define(["common/requestDispatcher", "common/request"], function(RequestDispatcher, Request){
	var MetricsController = function(app){
	
		this.app = app;
		var requestDispatcher = new RequestDispatcher();
		var request = new Request();
		

		this.onLogin = function(userName, password){
		
			//alert(CryptoJS.SHA3("ABC",{ outputLength: 512 }));
			var successCallBack = function(){
				window.location = "dashboard.html";
			};
			
			var failureCallBack = function(){
				//alert("Failure");
			};

			request.setMimeType("application/json");
			request.setRequestUrl("http://ip.jsontest.com/?mime=5");
			request.setXhrRequestType("GET");

			requestDispatcher.executeRequest(request, successCallBack, failureCallBack);
		};

		
		
	};
	return MetricsController;
});
