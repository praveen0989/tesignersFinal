

define([], function(){

	var PendingOrdersModel = function(){

		this.ordersData = [];
		this.orderStates = ["Received", "Confirmed", "Printing", "Packing" ,"Dispatched","Shipping", "Delivered", "Completed", "Cancelled"];
		this.returnedOrderStates = ["Cancelled by Vendor", "Cancelled by Customer", "Return Created", "Returned"];
		this.changedIndices = [];
	};
	return PendingOrdersModel;
});
