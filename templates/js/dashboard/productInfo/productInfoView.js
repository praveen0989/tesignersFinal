define(["jqGrid"], function(JQGrid){
	var ProductInfoView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.loginloginButton;
	this.userName;
	this.password;
	this.keepMeLoggedIn;
	this. phoneNumber;

	this.isRendered = false;

	
	
	
	this.registerEvents = function(controller){
		var that = this;
		$("#addButton").click(function(){


			var tShirtType = $('#shirtType').val();
			var fabricType = $('#fabricType').val();
			var sleeveType = $('#tshirtSleevesType').val();
			var gsmType = $('#tshirtGsmType').val();

			var tShirtId = $("#shirtType")[0]["selectedOptions"][0].id;
			var fabricId = $('#fabricType')[0]["selectedOptions"][0].id;
			var sleeveId = $('#tshirtSleevesType')[0]["selectedOptions"][0].id;
			var gsmId = $('#tshirtGsmType')[0]["selectedOptions"][0].id;
			var categoryId = $("#categorySelect")[0]["selectedOptions"][0].id;

			that.model.supportedIds.push(tShirtId + fabricId + sleeveId + gsmId + categoryId);
			var obj = {
						"T Shirt type" : tShirtType,
						"Fabric Type" : fabricType,
						"Sleeve" : sleeveType,
						"GSM" : gsmType
					  };


			that.model.supportedEntities.push(obj);
			 $("#productsTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'T-Shirt type',sortorder: "asc",data: that.model.supportedEntities }).trigger('reloadGrid');

		});
	};
	
	var populateOptions = function(array){
		var i = 0;
		var div = "";
		for( i = 0; i < array.length; i++){
			var category = array[i];
			div = div + "<option id=" +category.id +">"+ category.name +"</option>";
		}
		div = div + "</select></div>";
		return div;
	};

	var showProductInfoPage = function(){
		$('#ordersDiv').css('display','none');
		$('#paymentsDiv').css('display','none');
		$('#metricsDiv').css('display','none');
		$('#accountsDiv').css('display','none');
		$('#productDiv').css('display','block');
	};

	this.render = function(container){
		showProductInfoPage();

		if(!this.isRendered){
			var divClose = "</div>";

			var categorySelectDiv = "<div class='form-horizontal'><div id='categorySelectDiv' class='form-group'><div class='col-md-2'><label name='categorySelectLabel'>Please select your category</label></div><div class='col-md-2'><select id='categorySelect' name='categorySelect' class='form-control'>";
			categorySelectDiv += populateOptions(this.model.categories) + "</div></div>";

			var subcategoryDiv = "<div class='form-horizontal'><div id='subCategorySelectDiv' class='form-group'>";
			var subcategoryLabel = "<div class='col-md-2'><label name='categorySelectLabel'>Please select your sub-category</label></div>";

			var tShirtCategories = "<div class='col-md-2'> <select name='shirtType' class='form-control' id='shirtType'>";
			tShirtCategories+= populateOptions(this.model.tShirtCategories);

			var tShirtFabricsCategories = "<div class='col-md-2'> <select name='fabricType' id='fabricType' class='form-control'>";
			tShirtFabricsCategories+= populateOptions(this.model.tshirtFabrics);

			var tshirtSleevesCategories = "<div class='col-md-2'> <select name='tshirtSleevesType' class='form-control' id='tshirtSleevesType'>";
			tshirtSleevesCategories+= populateOptions(this.model.tshirtSleeves);

			var tshirtGsmCategories = "<div class='col-md-2'> <select name='tshirtGsmType' class='form-control' id='tshirtGsmType'>";
			tshirtGsmCategories+= populateOptions(this.model.tshirtGsm);

			var addButton = "<div class='col-md-1'><button name='addButton' id='addButton' type='button' class='form-control btn btn-primary'>Add</button></div></div>	";
			container.append( categorySelectDiv + divClose + subcategoryDiv + subcategoryLabel + tShirtCategories + tShirtFabricsCategories + tshirtSleevesCategories + tshirtGsmCategories + addButton + divClose);


			var tableDiv = "<div id='tableDiv' class='col-md-10 col-md-offset-2'><table id='productsTable' class='table table-bordered table-hover'></table></div>";
			container.append(tableDiv);

			var that = this;
			$("#productsTable").jqGrid({
                datatype: "local",
                data: this.model.supportedEntities,
                colNames:['T Shirt type','Fabric type', 'Sleeve','GSM', 'Remove'],
                colModel:[
                    {name:'T Shirt type',index:'T-Shirt Type'},
                    {name:'Fabric Type',index:'Fabric Type'},
                    {name:'Sleeve',index:'Sleeve'},
                    {name:'GSM',index:'GSM'},
					{name : "Remove", index : 'Remove', formatter: function(){
						return "<input type='button' value='Remove' class ='removeBtn' ></input>";
					}}
                ],
				gridComplete: function(){
					
					$(".removeBtn").click(function(event){
						$(event.currentTarget).parent().parent().attr("id");
						
						var button = $(event.currentTarget);
						var cell = button.parent();
						var row = cell.parent();
						var index = parseInt(row.attr("id")) - 1 ;
						
						that.model.supportedEntities.splice(index, 1);
						that.model.supportedIds.splice(index, 1);
						 $("#productsTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'T-Shirt type',sortorder: "asc",data: that.model.supportedEntities }).trigger('reloadGrid');
						
					});
				},
                sortname: 'T-Shirt type',
                sortorder: "asc",
                height: "auto" 
            });

			this.registerEvents(controller);
			this.isRendered = true;
		}

		$("#productDiv").removeClass("dashboardItemHidden");
		$("#productDiv").addClass("dashboardItemVisible");
	};
};

return ProductInfoView;

});
