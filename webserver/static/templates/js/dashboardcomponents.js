define(["dashboard/dashboard", "account/account",
		"metrics/metrics", "pendingOrders/pendingOrders", "completedOrders/completedOrders", "cancelledOrders/cancelledOrders","productInfo/productInfo", "payment/payment"
		
	], function(Dashboard, Account, Metrics, PendingOrders,CompletedOrders, CancelledOrders, ProductInfo, Payment){

	return({
		"dashboard" : {
			module : function(){
				return new Dashboard();
			}
		},
		"account" : {
			module : function(){
				return new Account();
			}
		},
		"metrics" : {
			module : function(){
				return new Metrics();
			}
		},
		"pendingOrders" : {
			module : function(){
				return new PendingOrders();
			}
		},
		"completedOrders" : {
			module : function(){
				return new CompletedOrders();
			}
		},
		
		"cancelledOrders" : {
			module : function(){
				return new CancelledOrders();
			}
		},
		
		"productInfo" : {
			module : function(){
				return new ProductInfo();
			}
		},
		"payment" : {
			module : function(){
				return new Payment();
			}
		}
	});
});