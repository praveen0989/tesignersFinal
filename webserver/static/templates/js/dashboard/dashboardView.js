define([], function(){
	var DashboardView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.loginButton;
	this.userName;
	this.password;
	this.keepMeLoggedIn;
	this. phoneNumber;

	var renderComponent = function(id, container, type){
		
		var component = controller.app.getComponent(id);
		if(!component){
			controller.app.loadComponent(id, container,type);
		} else {
			component.view.render(container, type);
		}
	};

	var showAccountInfoPage = function(){
		$('#ordersDiv').css('display','none');
		$('#paymentsDiv').css('display','none');
		$('#metricsDiv').css('display','none');
		$('#productDiv').css('display','none');
		$('#accountsDiv').css('display','block');
	};

	this.registerEvents = function(controller){
		var that = this;
		$("#account").click(function(){
			renderComponent("account", $("#accountsDiv"));
			showAccountInfoPage();
		});

		$("#productInfo").click(function(){
			renderComponent("productInfo", $("#productDiv"));
		});

		$("#logout").click(function(){

		});

		$("#transactions").click(function(){
			renderComponent("payment", $("#paymentsDiv"));
		});

		$("#invoices").click(function(){
			renderComponent("payment", $("#paymentsDiv"));
		});

		$("#settlements").click(function(){
			renderComponent("payment", $("#paymentsDiv"));
		});

		$("#pendingOrders").click(function(){
			renderComponent("pendingOrders", $("#ordersDiv"));
		});

		$("#completedOrders").click(function(){
			renderComponent("completedOrders", $("#ordersDiv"));
		});

		$("#cancelledOrders").click(function(){
			renderComponent("cancelledOrders", $("#ordersDiv"));
		});

		$("#metrics").click(function(){
			renderComponent("metrics", $("#metricsDiv"));
		});

	};


	this.render = function(container){
		this.registerEvents(controller);
	};
};

return DashboardView;

});
