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
		$("#loginButton").click(function(){
			controller.onLogin($("#usernameinput").val(), $("#passwordinput").val());
		});

		$("#signUpButton").click(function(){
				window.location = "/signup/";
		});
	};


	this.render = function(container){

		var divClose = "</div>";

		var loginContainer = "<div id='loginContainer' class='form-inline' >";
		this.userName = '<input type="email" id = "usernameinput" class="form-control" name="login" value="" placeholder="Email ID"/>';
		var loginDiv = '<div id="usernamediv" class="inputDiv form-group">'+ this.userName + '</div>';

		this.password = '<input type="password" id="passwordinput" class="form-control" name="password" value="" placeholder="Password"/>';
		var passwordDiv = '<div id="passworddiv" class="inputDiv form-group">'+ this.password +'</div>';

		this.loginButton = "<input type='submit' name='loginButton' id='loginButton' class='btn btn-primary loginBtn' value='LOGIN'/>";
		var loginButtonDiv = "<div id='loginButtonDiv' class=' buttonDiv'>"+ this.loginButton +"</div>";

		this.signupButton = "<input type='button' name='signUpButton' id='signUpButton' class='btn btn-primary loginBtn' value='SIGN UP'/>";

		var loginErrorDiv = "<div id='loginErrorDiv' class='loginErrorDiv'></div>";

		container.append( loginContainer + loginDiv + passwordDiv + this.loginButton + this.signupButton + loginErrorDiv + divClose );
		this.registerEvents(controller);
	};
};

return LoginView;

});
