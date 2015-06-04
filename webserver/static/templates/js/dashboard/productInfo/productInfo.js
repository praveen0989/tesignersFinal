
define(["productInfo/productInfoController", "productInfo/productInfoModel", "productInfo/productInfoView"],function(ProductInfoController, ProductInfoModel, ProductInfoView){
	
	var ProductInfo = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new ProductInfoController(this);
			this.model = new ProductInfoModel();
			this.view = new ProductInfoView(this.controller, this.model);
			this.view.render($("#productDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	return ProductInfo;
	
});
