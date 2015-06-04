
define([], function(){
	var SignUpController = function(app){
	
		this.app = app;
		
		this.onSignUp = function(){
			window.location = "signup.html";
		};
	};
	return SignUpController;
});
