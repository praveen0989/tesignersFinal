define([], function(){
	var CancelledOrdersView = function(controller, model){
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
		
		$("#cancelledSaveButton").click(function(){
			
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

		controller.getCancelledOrders(model,sessionStorage.getItem("user"), "2");


	}

	this.render = function(container){

		showOrdersInfoPage();
		container.html("Cancelled Orders");
		var tableDiv = "<div id='tableDiv' class='col-md-10 col-md-offset-2'><table id='ordersTable' class='table table-bordered table-hover'></table></div>";
		container.append(tableDiv);

		var saveButton = "<div class='col-md-1 col-md-offset-8'><button name='saveButton' id='cancelledSaveButton' type='button' class='form-control btn btn-primary'>Save</button></div></div>	";
		container.append(saveButton);
		
		var that = this;
		$("#ordersTable").jqGrid({
			datatype: "local",
			data: this.model.ordersData,
			colNames:['OrderId', 'Image','Description', 'Quantity','Price', 'Status'],
			colModel:[
				{name:'key0oid',index:'key0oid'},
				{name:'key1img',index:'key1img'},
				{name:'key2description',index:'key2description'},
				{name:'key3qty',index:'key3qty'},
				{name:'key4price',index:'key4price'},
				{name : "key5status", index : 'key5status', formatter : function(selectedIndex){
					var index = parseInt(selectedIndex);
					
					//Get the index of the current state.
					//If state is 0 or 1 : Cancelled by seller | Cancelled by user show a text 
					//If state is Returned : 2, show dropdown
					//If state is 3, show text
					if(index == 0 || index == 1 || index == 3){
						return that.model.orderStates[index];
					}
					else if(index == 2){
						var select = "<select class='returnStatusSelect'>";
						for (i = 0; i < that.model.returnStates.length; i++){
								if(i == 0)
									select = select + "<option index='"+ (parseInt(i) + 1 )+"' selected>" + that.model.returnStates[i] + "</option>";
								else	
									select = select + "<option index='"+ (parseInt(i) + 1 )+"'>" + that.model.returnStates[i] + "</option>";
						}
					select = select + "</select>";
					return select;
					
					}
					
					
					
				}}
			],
			sortname: 'key1img',
			viewrecords: true,
			sortorder: "asc",
			height: "auto",
			gridComplete : function(){
				$(".returnStatusSelect").change(function(event){
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

return CancelledOrdersView;

});
