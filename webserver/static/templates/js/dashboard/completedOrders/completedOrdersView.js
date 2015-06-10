define([], function(){
	var CompletedOrdersView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.loginloginButton;
	this.userName;
	this.password;
	this.keepMeLoggedIn;
	this. phoneNumber;

	this.registerEvents = function(controller){
		var that = this;
		$("#submitButton").click(function(){
			controller.onLogin($("#usernameinput").val(), $("#passwordinput").val());
		});
	};

	this.renderPendingOrders = function(container){

		var mainDiv = "<div id='page1'>";
		var divClose = "</div>";
		var pedingOrderList = this.model.ordersData;

	}

	var showOrdersInfoPage = function(){
		$('#productDiv').css('display','none');
		$('#paymentsDiv').css('display','none');
		$('#metricsDiv').css('display','none');
		$('#accountsDiv').css('display','none');
		$('#ordersDiv').css('display','block');

		controller.getCompletedOrders(model,"praveen0989@gmail.com", "1");


	}

	this.render = function(container){

		showOrdersInfoPage();
		container.html("Completed Orders");
		var tableDiv = "<div id='tableDiv' class='col-md-10 col-md-offset-2'><table id='ordersTable' class='table table-bordered table-hover'></table></div>";
		container.append(tableDiv);

		var that = this;
		$("#ordersTable").jqGrid({
			datatype: "local",
			data: this.model.ordersData,
			colNames:['Image','Description', 'Quantity','Price', 'Status'],
			colModel:[
				{name:'key1img',index:'key1img'},
				{name:'key2description',index:'key2description'},
				{name:'key3qty',index:'key3qty'},
				{name:'key4price',index:'key4price'},
				{name : "key5status", index : 'key5status'}
			],
			sortname: 'Image',
			sortorder: "asc",
			height: "auto"
		});

		this.registerEvents(controller);
		


	};


};

return CompletedOrdersView;

});
