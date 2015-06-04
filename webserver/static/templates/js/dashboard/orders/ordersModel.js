

define([], function(){

	var OrdersModel = function(){

		this.pendingOrders = [];
		this.completedOrders = [];
		this.cancelledOrders = [];

	};
	return OrdersModel;
});
