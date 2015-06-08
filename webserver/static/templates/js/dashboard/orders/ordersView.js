define([], function(){
	var OrdersView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.isRendered = false;
	this.loginloginButton;
	this.userName;
	this.password;
	this.keepMeLoggedIn;
	this. phoneNumber;

	this.registerEvents = function(controller){
		var that = this;
		$("#submitButton").click(function(){
			controller.onLogin($("#usernameinput").val(), $("#passwordinput").val());
		});
	};

	this.renderPendingOrders = function(container){

		var mainDiv = "<div id='page1'>";
		var divClose = "</div>";
		var pedingOrderList = this.model.pendingOrderList;

	}

	var showOrdersInfoPage = function(){
		$('#productDiv').css('display','none');
		$('#paymentsDiv').css('display','none');
		$('#metricsDiv').css('display','none');
		$('#accountsDiv').css('display','none');
		$('#ordersDiv').css('display','block');
	}

	this.render = function(container){

		showOrdersInfoPage();
		if(!this.isRendered){
			this.controller.loadOrders("amit_oct25@yahoo.com","1");
			container.append("Orders");
			this.registerEvents(controller);
			this.isRendered = true;
		}
	};


};

return OrdersView;

});
