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
			container.append("Orders");
			this.registerEvents(controller);
			this.isRendered = true;
		}
	};
};

return OrdersView;

});
