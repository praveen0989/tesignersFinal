
define(["payment/paymentController", "payment/paymentModel", "payment/paymentView"],function(PaymentController, PaymentModel, PaymentView){
	
	var Payment = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new PaymentController(this);
			this.model = new PaymentModel();
			this.view = new PaymentView(this.controller, this.model);
			this.view.render($("#paymentsDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	return Payment;
	
});
