

define([], function(){

	var OrdersModel = function(){

		this.pendingOrders = [{img: "image1", description: "ts" ,price: 400,  qty: 2, status: 2}];
		this.completedOrders = [];
		this.cancelledOrders = [];

	};
	return OrdersModel;
});
