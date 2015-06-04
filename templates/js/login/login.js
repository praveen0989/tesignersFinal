
define(["login/loginController", "login/loginModel", "login/loginView"],function(LoginController, LoginModel, LoginView){
	
	var Login = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new LoginController(this);
			this.model = new LoginModel();
			this.view = new LoginView(this.controller, this.model);
			this.view.render($("#loginDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	
	return Login;
	
});
