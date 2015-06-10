define([], function(){
	var OrdersView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.isRendered = false;
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
		var pedingOrderList = this.model.pendingOrderList;

	}

	var showOrdersInfoPage = function(){
		$('#productDiv').css('display','none');
		$('#paymentsDiv').css('display','none');
		$('#metricsDiv').css('display','none');
		$('#accountsDiv').css('display','none');
		$('#ordersDiv').css('display','block');

		//controller.getPendingOrders(model,"amit_oct25@yahoo.com","1");


	}

	this.render = function(container){

		showOrdersInfoPage();
		if(!this.isRendered){
			container.append("Orders");
			var tableDiv = "<div id='tableDiv' class='col-md-10 col-md-offset-2'><table id='ordersTable' class='table table-bordered table-hover'></table></div>";
			container.append(tableDiv);

			var that = this;
			$("#ordersTable").jqGrid({
                datatype: "local",
                data: this.model.pendingOrders,
                colNames:['Image','Description', 'Quantity','Price', 'Status'],
                colModel:[
                    {name:'img',index:'img'},
                    {name:'description',index:'description'},
                    {name:'qty',index:'qty'},
                    {name:'price',index:'price'},
										{name : "status", index : 'status'}
                ],
                sortname: 'Image',
                sortorder: "asc",
                height: "auto"
            });

			this.isRendered = true;
			this.registerEvents(controller);
		}


	};


};

return OrdersView;

});
