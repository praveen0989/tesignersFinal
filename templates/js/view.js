
define(["jquery"], function($){

var View = function(controller, model){
	
	this.controller = controller;
	this.model = model;
	this.render = function(container){
		var titleText = "HANGOUT";
		var divClose = "</div>";
		var subHeaderText = "LAUNCHPAD";
		var titleDiv = "<div id= 'titleDiv'>" + divClose;
		container.append(titleDiv);
	};
	
	this.getContainer = function(){
		return $("#containerDiv");
	};
	
	this.getHeaderContainer = function(){
		return $("#headerDiv");
	};
	
	this.getBodyContainer = function(){
		return $("#bodyDiv");
	};

	//ONLY AVAILABLE FOR THE HOME PAGE
	this.getPeopleYouMayKnowContainer = function(){
		return $("#peopleYouMayKnow");
	};
	this.getTrendingContainer = function(){
		return $("#trending");
	};
	this.getContentYouMayLikeContainer = function(){
		return $("#contentYouMayLike");
	};
	this.getMainContentContainer = function(){
		return $("#mainContent");
	};
};

return View;
});
