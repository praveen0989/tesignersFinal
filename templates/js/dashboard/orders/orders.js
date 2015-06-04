
define(["orders/ordersController", "orders/ordersModel", "orders/ordersView"],function(OrdersController, OrdersModel, OrdersView){
	
	var Orders = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new OrdersController(this);
			this.model = new OrdersModel();
			this.view = new OrdersView(this.controller, this.model);
			this.view.render($("#ordersDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	return Orders;
	
});
