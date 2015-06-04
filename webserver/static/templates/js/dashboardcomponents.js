define(["dashboard/dashboard", "account/account",
		"metrics/metrics", "orders/orders", "productInfo/productInfo", "payment/payment"
		
	], function(Dashboard, Account, Metrics, Orders, ProductInfo, Payment){

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
		"orders" : {
			module : function(){
				return new Orders();
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