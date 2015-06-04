
define(["dashboard/dashboardController", "dashboard/dashboardModel", "dashboard/dashboardView"],function(DashboardController, DashboardModel, DashboardView){

	var Dashboard = function(){
		this.app;
		this.create = function(app){
			this.app = app;
			this.controller = new DashboardController(this);
			this.model = new DashboardModel();
			this.view = new DashboardView(this.controller, this.model);
			this.view.render(this.app.bodyContainer);
		};

		this.loadComponent = function(id,container){
			this.app.loadComponent(id,container);
		};

		this.getComponent = function(id){
			return this.app.getComponent(id);
		};

	};

	return Dashboard;

});
