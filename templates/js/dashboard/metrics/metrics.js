
define(["metrics/metricsController", "metrics/metricsModel", "metrics/metricsView"],function(MetricsController, MetricsModel, MetricsView){
	
	var Metrics = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new MetricsController(this);
			this.model = new MetricsModel();
			this.view = new MetricsView(this.controller, this.model);
			this.view.render($("#metricsDiv"));
		};
	
		this.loadComponent = function(id){
			this.app.loadComponent(id);
		};

	};
	return Metrics;
	
});
