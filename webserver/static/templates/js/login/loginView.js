define([], function(){
	var LoginView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.loginButton;
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
	
	
	this.render = function(container){
		
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
	};
};

return LoginView;

});
