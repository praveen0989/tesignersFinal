

define([], function(){

	var CompletedOrdersModel = function(){

		this.ordersData = [];
		this.orderStates = ["Completed"];
		this.changedIndices = [];

	};
	return CompletedOrdersModel;
});
