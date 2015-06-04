require(["coreapp", "bootstrap"], function(CoreApp, BootStrap){
	var app = new CoreApp();
	app.create("signup");
	app.create("login");
	app.create("footer");
});