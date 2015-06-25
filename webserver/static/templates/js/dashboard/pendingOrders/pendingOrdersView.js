define([], function(){
	var PendingOrdersView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.loginloginButton;
	this.userName;
	this.password;
	this.keepMeLoggedIn;
	this. phoneNumber;

	this.registerEvents = function(controller){
		var that = this;
		var data = [];
		
		$("#pendingSaveButton").click(function(){
			
			for (i = 0; i < that.model.changedIndices.length; i++){
				data.push({"oid" : that.model.ordersData[that.model.changedIndices[i]].key0oid,
							"finalStatus" : that.model.ordersData[that.model.changedIndices[i]].key5status});		
			}
			controller.saveStateChange(data);
			
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

		user = sessionStorage.getItem("user");
		controller.getPendingOrders(model,user, "0");


	}

	this.render = function(container){
		
		var that = this;
		showOrdersInfoPage();
		container.html("Pending Orders");
		var tableDiv = "<div id='tableDiv' class='col-md-10 col-md-offset-2'><table id='ordersTable' class='table table-bordered table-hover'></table><div id='tablePager' ></div></div>";
		container.append(tableDiv);
		
		var saveButton = "<div class='col-md-1 col-md-offset-8'><button name='saveButton' id='pendingSaveButton' type='button' class='form-control btn btn-primary'>Save</button></div></div>	";
		container.append(saveButton);
		
		

		$("#ordersTable").jqGrid({
			datatype: "local",
			data: this.model.ordersData,
			colNames:['Order ID', 'Image','Description', 'Quantity','Price', 'Status'],
			colModel:[
				{name:'key0oid',index:'key0oid'},
				{name:'key1img',index:'key1img', formatter : function(value){
					return "<img src= "+ value +" class='dispImg'></img>"
				}},
				{name:'key2description',index:'key2description'},
				{name:'key3qty',index:'key3qty'},
				{name:'key4price',index:'key4price'},
				{name : "key5status", index : 'key5status', formatter : function(selectedIndex){
					var i;
					var index = parseInt(selectedIndex) - 1;
					var select = "<select class='pendingStatusSelect'>";
					for (i = 0; i < that.model.orderStates.length; i++){
						
						if(i == index){
							select = select + "<option index='"+ (parseInt(i) + 1 )+"' selected>" + that.model.orderStates[i] + "</option>";
						} else {
							select = select + "<option index='"+ ( parseInt(i)+ 1 )+"'>" + that.model.orderStates[i] + "</option>";
						}
						
					}
					select = select + "</select>";
					return select;
					
				}}
			],
			sortname: 'key1img',
			viewrecords: true,
			sortorder: "asc",
			height: "auto",
			shrinkToFit: false,
			pager : "#tablePager",
			gridComplete : function(){
				$(".pendingStatusSelect").change(function(event){
					var finalIndex = parseInt(event.target.selectedIndex) + 1;
					var select = $(event.currentTarget);
					var cell = select.parent();
					var row = cell.parent();
					var rowIndex = parseInt(row.attr("id")) - 1 ;
					that.model.ordersData[rowIndex].key5status = finalIndex;
					if(that.model.changedIndices.indexOf(rowIndex) == -1)
						that.model.changedIndices.push(rowIndex);
					
				});
			}
			});
		
		this.registerEvents(controller);
	};


};

return PendingOrdersView;

});
