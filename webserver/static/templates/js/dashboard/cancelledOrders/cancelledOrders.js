
define(["cancelledOrders/cancelledOrdersController", "cancelledOrders/cancelledOrdersModel", "cancelledOrders/cancelledOrdersView"],function(CancelledOrdersController, CancelledOrdersModel, CancelledOrdersView){
	
	var CancelledOrders = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new CancelledOrdersController(this);
			this.model = new CancelledOrdersModel();
			this.view = new CancelledOrdersView(this.controller, this.model);
			this.view.render($("#ordersDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	return CancelledOrders;
	
});
