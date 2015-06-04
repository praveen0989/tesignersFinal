define([], function(){
	var MetricsView = function(controller, model){
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

	var showMetricsInfoPage = function(){
		$('#ordersDiv').css('display','none');
		$('#paymentsDiv').css('display','none');
		$('#productDiv').css('display','none');
		$('#accountsDiv').css('display','none');
		$('#metricsDiv').css('display','block');
	}

	this.render = function(container){

		showMetricsInfoPage();
		if(!this.isRendered){
		container.append( "Metrics" );
		this.registerEvents(controller);
		this.isRendered = true;
	}
	};
};

return MetricsView;

});
