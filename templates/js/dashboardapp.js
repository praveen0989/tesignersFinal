
define(["dashboardcomponents", "controller", "model", "view"], function(Components, Controller, Model, View){

var DashBoardApp = function(){
	this.controller;
	this.view;
	this.components = [];
	this.loadedComponents = [];
	this.model;
	this.headerContainer;
	this.container;
	this.bodyContainer;
	this.modalDiv = "<div id='modalDiv'> <div id='modalContent'></div></div>";
	
	this.create = function(component){
		this.components = Components;	
		this.controller = new Controller();
		this.model = new Model();
		this.view = new View(this.controller, this.model);
		this.container = this.view.getContainer();
		this.headerContainer = this.view.getHeaderContainer();
		this.bodyContainer = this.view.getBodyContainer();
		this.view.render(this.headerContainer);
		this.loadComponent(component);
	};
	
	this.loadComponent = function(id, container){
		var component = this.components[id];
		var componentInstance = component.module();
		var componentMap = {"id" : id, "object" : componentInstance};
		this.loadedComponents.push(componentMap);
		componentInstance.create(this, container);
	};
	
	this.getComponent = function(id) {
		var i;
		for( i = 0; i< this.loadedComponents.length; i++){
			if(id.toLowerCase() === this.loadedComponents[i].id.toLowerCase()){
				return this.loadedComponents[i].object;
			}
		}
	};
	
	this.closeModalDialog = function(){
		var el = document.getElementById("modalDiv");
		el.style.visibility = "hidden";
	
	};
	
	this.showModalDialog = function(callback, cssText){
		
		var css = cssText || "position:absolute;top :25%;left : 25%;width:50%;height : 50%;background-color: #fff;border:1px solid #000;padding:15px;";
		var modalDivRef = document.getElementById("modalDiv");
		if(!modalDivRef){
			$("body").append(this.modalDiv);
			document.getElementById("modalContent").style.cssText = css;
		}
		var el = document.getElementById("modalDiv");
		el.style.visibility = "visible";
		callback($('#modalContent'));
	};
	};
	
	return DashBoardApp;
});