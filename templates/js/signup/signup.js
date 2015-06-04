
define(["signup/signupController", "signup/signupModel", "signup/signupView"],function(SignUpController, SignUpModel, SignUpView){
	
	var SignUp = function(){
		this.app;
		this.create = function(app){
		this.app = app;
		this.controller = new SignUpController(this);
		this.model = new SignUpModel();
		this.view = new SignUpView(this.controller, this.model);
		this.view.render(this.app.bodyContainer);
	};
	
	this.loadComponent = function(id){
		this.app.loadComponent(id);
	};

	};
	
	return SignUp;
	
});
