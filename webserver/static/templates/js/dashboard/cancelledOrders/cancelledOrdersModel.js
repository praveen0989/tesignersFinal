

define([], function(){

	var CancelledOrdersModel = function(){

		this.ordersData = [];
		this.orderStates = ["Cancelled By Seller", "Cancelled By User", "Return Created", "Return Received"];
		this.returnStates = [ "Return Created", "Return Received"];
		this.changedIndices = [];
	};
	return CancelledOrdersModel;
});
