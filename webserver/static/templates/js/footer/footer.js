
define(["footer/footerController", "footer/footerModel", "footer/footerView"],function(FooterController, FooterModel, FooterView){
	
	var Footer = function(){
		this.app;
		this.create = function(app){
		this.app = app;
		this.controller = new FooterController(this);
		this.model = new FooterModel();
		this.view = new FooterView(this.controller, this.model);
		this.view.render($("#footerDiv"));
	};
	
	this.loadComponent = function(id){
		this.app.loadComponent(id);
	};

	};
	
	return Footer;
	
});
