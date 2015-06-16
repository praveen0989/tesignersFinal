

define([], function(){

	var CompletedOrdersModel = function(){

		this.ordersData = [];
		this.orderStates = ["Shipped", "Delivered", "Completed"];
		this.changedIndices = [];

	};
	return CompletedOrdersModel;
});
