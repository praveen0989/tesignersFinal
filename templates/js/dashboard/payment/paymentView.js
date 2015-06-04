define([], function(){
	var PaymentView = function(controller, model){
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

	var showPaymentInfoPage = function(){
		$('#ordersDiv').css('display','none');
		$('#productDiv').css('display','none');
		$('#metricsDiv').css('display','none');
		$('#accountsDiv').css('display','none');
		$('#paymentsDiv').css('display','block');
	}

	this.render = function(container){

		showPaymentInfoPage();
		if(!this.isRendered){
		var divClose = "</div>";

		var loginContainer = "<div id='loginContainer' class='form-inline' >";
		this.userName = '<input type="text" id = "usernameinput" class="form-control" name="login" value="" placeholder="Email ID"/>';
		var loginDiv = '<div id="usernamediv" class="inputDiv form-group">'+ this.userName + '</div>';

		this.password = '<input type="password" id="passwordinput" class="form-control" name="password" value="" placeholder="Password"/>';
		var passwordDiv = '<div id="passworddiv" class="inputDiv form-group">'+ this.password +'</div>';

		this.loginButton = "<input type='button' name='submitButton' id='submitButton' class='btn btn-primary loginBtn' value='LOGIN'/>";
		var loginButtonDiv = "<div id='loginButtonDiv' class=' buttonDiv'>"+ this.loginButton +"</div>";

		container.append( loginContainer + loginDiv + passwordDiv + this.loginButton + divClose );
		this.registerEvents(controller);
		this.isRendered = true;
	}
	};
};

return PaymentView;

});
