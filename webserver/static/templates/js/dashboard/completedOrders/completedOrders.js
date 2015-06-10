
define(["completedOrders/completedOrdersController", "completedOrders/completedOrdersModel", "completedOrders/completedOrdersView"],function(CompletedOrdersController, CompletedOrdersModel, CompletedOrdersView){
	
	var CompletedOrders = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new CompletedOrdersController(this);
			this.model = new CompletedOrdersModel();
			this.view = new CompletedOrdersView(this.controller, this.model);
			this.view.render($("#ordersDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	return CompletedOrders;
	
});
