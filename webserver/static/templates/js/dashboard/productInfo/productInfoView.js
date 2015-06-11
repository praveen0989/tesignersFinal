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
			var tsPrice = $('#tsprice').val();

			var tShirtId = $("#shirtType")[0]["selectedOptions"][0].id;
			var fabricId = $('#fabricType')[0]["selectedOptions"][0].id;
			var sleeveId = $('#tshirtSleevesType')[0]["selectedOptions"][0].id;
			var gsmId = $('#tshirtGsmType')[0]["selectedOptions"][0].id;
			var priceId = 'tsPrice';
			var categoryId = $("#categorySelect")[0]["selectedOptions"][0].id;

			that.model.supportedIds.push(tShirtId + fabricId + sleeveId + gsmId + priceId + categoryId);
			var obj = {
						"ptype" : "TS",
						"psubtype" : tShirtType,
						"fabric" : fabricType,
						"slv" : sleeveType,
						"mat" : gsmType,
						"tsprice":tsPrice
					  };


			that.model.supportedEntities.push(obj);
			 $("#productsTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'T-Shirt type',sortorder: "asc",data: that.model.supportedEntities }).trigger('reloadGrid');

		});

		$("#saveButton").click(function(){
				var formData = {};
				formData.sId = "amit_oct25@yahoo.com";
				formData.plist = that.model.supportedEntities;
				formData.ptlist = [];
				controller.saveProductDetails(formData);
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

			var categorySelectDiv = "<div class='form-horizontal'><div id='categorySelectDiv' class='form-group'><div class='col-md-2'><label name='categorySelectLabel'>Please select your category</label></div><div class='col-md-1'><select id='categorySelect' name='categorySelect' class='form-control'>";
			categorySelectDiv += populateOptions(this.model.categories) + "</div></div>";

			var subcategoryDiv = "<div class='form-horizontal'><div id='subCategorySelectDiv' class='form-group'>";
			var subcategoryLabel = "<div class='col-md-2'><label name='categorySelectLabel'>Please select your sub-category</label></div>";

			var tShirtCategories = "<div class='col-md-1'> <select name='shirtType' class='form-control' id='shirtType'>";
			tShirtCategories+= populateOptions(this.model.tShirtCategories);

			var tShirtFabricsCategories = "<div class='col-md-1'> <select name='fabricType' id='fabricType' class='form-control'>";
			tShirtFabricsCategories+= populateOptions(this.model.tshirtFabrics);

			var tshirtSleevesCategories = "<div class='col-md-1'> <select name='tshirtSleevesType' class='form-control' id='tshirtSleevesType'>";
			tshirtSleevesCategories+= populateOptions(this.model.tshirtSleeves);

			var tshirtGsmCategories = "<div class='col-md-1'> <select name='tshirtGsmType' class='form-control' id='tshirtGsmType'>";
			tshirtGsmCategories+= populateOptions(this.model.tshirtGsm);

			var tshirtprice = "<div class='col-md-1'> <input type='text' id='tsprice' class ='input-sm' /></div>";

			var addButton = "<div class='col-md-1 col-md-offset-1'><button name='addButton' id='addButton' type='button' class='form-control btn-primary'>Add</button></div></div>	";
			container.append( categorySelectDiv + divClose + subcategoryDiv + subcategoryLabel + tShirtCategories + tShirtFabricsCategories + tshirtSleevesCategories + tshirtGsmCategories + tshirtprice + addButton + divClose);


			var tableDiv = "<div id='tableDiv' class='col-md-10 col-md-offset-2'><table id='productsTable' class='table table-bordered table-hover'></table><div id='tablePager' ></div></div>";
			container.append(tableDiv);

			var saveButton = "<div class='col-md-1 col-md-offset-8'><button name='saveButton' id='saveButton' type='button' class='form-control btn btn-primary'>Save</button></div></div>	";
			container.append(saveButton);

			var that = this;
			$("#productsTable").jqGrid({
                datatype: "local",
                data: this.model.supportedEntities,
                colNames:['T Shirt type','Fabric type', 'Sleeve','GSM','Price' ,'Remove'],
                colModel:[
                    {name:'psubtype',index:'psubtype'},
                    {name:'fabric',index:'fabric'},
                    {name:'slv',index:'slv'},
                    {name:'mat',index:'mat'},
										{name:'tsprice',index:'tsprice'},
										{name : "Remove", index : 'Remove', formatter: function(){
						return "<input type='button' value='Remove' class ='removeBtn btn-primary' ></input>";
					}}
                ],
				loadonce:true ,
				gridview: true,
				pager : "#tablePager",
				rowNum: 10,
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
			jQuery("#productsTable").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});
			this.registerEvents(controller);
			this.isRendered = true;
		}

		$("#productDiv").removeClass("dashboardItemHidden");
		$("#productDiv").addClass("dashboardItemVisible");
	};
};

return ProductInfoView;

});
