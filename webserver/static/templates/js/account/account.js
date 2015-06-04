
define(["account/accountController", "account/accountModel", "account/accountView"],function(AccountController, AccountModel, AccountView){

	var Account = function(){
		this.app;
		this.create = function(app, container){
			this.app = app;
			this.container = container;
			this.controller = new AccountController(this);
			this.model = new AccountModel();
			this.view = new AccountView(this.controller, this.model);
			if(this.container !== undefined){
				this.view.render(this.container);
			}else {
				this.view.render(this.app.bodyContainer);
			}
		};

		this.loadComponent = function(id,container){
			this.app.loadComponent(id,container);
		};

	};

	return Account;

});
