
define(["pendingOrders/pendingOrdersController", "pendingOrders/pendingOrdersModel", "pendingOrders/pendingOrdersView"],function(PendingOrdersController, PendingOrdersModel, PendingOrdersView){
	
	var PendingOrders = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new PendingOrdersController(this);
			this.model = new PendingOrdersModel();
			this.view = new PendingOrdersView(this.controller, this.model);
			this.view.render($("#ordersDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	return PendingOrders;
	
});
