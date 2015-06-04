
define([], function(){
	var FooterController = function(app){
	
		this.app = app;
		
		this.onLogin = function(){
			//Validate User Inputs
			this.app.loadComponent("changepassword");
		};
	};
	return FooterController;
});
