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
						"k1ptype" : "TS",
						"k2psubtype" : tShirtType,
						"k3fabric" : fabricType,
						"k4sleeves" : sleeveType,
						"k5material" : gsmType,
						"k6price":tsPrice
					  };


			that.model.supportedEntities.push(obj);
			 $("#productsTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'T-Shirt type',sortorder: "asc",data: that.model.supportedEntities }).trigger('reloadGrid');

		});

		$("#ptAddButton").click(function(){

			var printingType = $('#printingType').val();
			var minOrderQty = $('#minOrderQty').val();
			var capPerday = $('#capPerday').val();
			var tat = $('#tat').val();
			var ptPrice = $('#ptPrice').val();

			var printingTypeId = $("#printingType")[0]["selectedOptions"][0].id;
			var minOrderQtyId = 'minOrderQty';
			var capPerdayId = 'capPerday';
			var tatId = 'tat';
			var ptPriceId = 'ptPrice';

			that.model.supportedPrintingTypeIds.push(printingTypeId + minOrderQtyId + capPerdayId + tatId + ptPrice);
			var obj = {
						"k1pttype" : printingType,
						"k2ptminqty" : minOrderQty,
						"k3capperday" : capPerday,
						"k4tat" : tat,
						"k5ptprice" : ptPrice
					  };


			that.model.supportedPrintingTypes.push(obj);
			 $("#printerTypeTable").jqGrid('setGridParam', { datatype: 'local', sortname: 'Printing Type',sortorder: "asc",data: that.model.supportedPrintingTypes }).trigger('reloadGrid');

		});

		$("#saveButton").click(function(){
				var formData = {};
				formData.sId = sessionStorage.getItem("user");
				formData.plist = that.model.supportedEntities;
				formData.ptlist = that.model.supportedPrintingTypes;
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

	this.createPrintingTypeDiv = function(container){
		var divClose = "</div>";

		var printingTypeDiv = "<div class='form-horizontal'><div id='printingTypeDiv' class='form-group'>";
		var printingTypeLabel = "<div class='col-md-2'><label name='printingTypeLabel'>Please select supported printing types</label></div>";

		var printingType = "<div class='col-md-1'> <select name='printingType' class='form-control' id='printingType'>";
		printingType+= populateOptions(this.model.printingType);

		var minOrderQty = "<div class='col-md-1'> <input type='text' id='minOrderQty' class ='input-sm' /></div>";
		var capPerday = "<div class='col-md-1'> <input type='text' id='capPerday' class ='input-sm' /></div>";
		var tat = "<div class='col-md-1'> <input type='text' id='tat' class ='input-sm' /></div>";
		var price = "<div class='col-md-1'> <input type='text' id='ptPrice' class ='input-sm' /></div>";

		var addButton = "<div class='col-md-1 col-md-offset-1'><button name='ptAddButton' id='ptAddButton' type='button' class='form-control btn-primary'>Add</button></div></div>	";
		container.append( printingTypeDiv + printingTypeLabel + printingType + minOrderQty + capPerday + tat + price + addButton + divClose);

		var tableDiv = "<div id='tableDiv' class='col-md-10 col-md-offset-2'><table id='printerTypeTable' class='table table-bordered table-hover'></table><div id='ptTablePager' ></div></div>";
		container.append(tableDiv);


					var that = this;
					$("#printerTypeTable").jqGrid({
		                datatype: "local",
		                data: this.model.supportedPrintingTypes,
		                colNames:['Printing Type', 'Minimum Orders','Capacity per day', 'Order to packaging time', 'Price', 'Remove'],
		                colModel:[
												{name:'k1pttype',index:'k1pttype'},
		                    {name:'k2ptminqty',index:'k2ptminqty'},
		                    {name:'k3capperday',index:'k3capperday'},
		                    {name:'k4tat',index:'k4tat'},
												{name:'k5ptprice',index:'k5ptprice'},
		                  	{name : "ptRemove", index : 'ptRemove', formatter: function(){
								return "<input type='button' value='Remove' class ='ptRemoveBtn btn-primary' ></input>";
							}}
		                ],
						loadonce:true ,
						gridview: true,
						pager : "#ptTablePager",
						rowNum: 10,
						gridComplete: function(){

							$(".ptRemoveBtn").click(function(event){

								var button = $(event.currentTarget);
								var cell = button.parent();
								var row = cell.parent();
								var index = parseInt(row.attr("id")) - 1 ;

								that.model.supportedPrintingTypes.splice(index, 1);
								that.model.supportedPrintingTypeIds.splice(index, 1);
								var allParameters = $("#printerTypeTable").jqGrid("getGridParam");
								allParameters.data = that.model.supportedPrintingTypes;
								 $("#printerTypeTable").jqGrid('setGridParam', { datatype: 'local',data: that.model.supportedPrintingTypes }).trigger('reloadGrid');

							});
						},
		                sortname: 'k1pttype',
		                sortorder: "asc",
		                height: "auto"
		            });

								jQuery("#printerTypeTable").jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false});

	}

	var showProductInfoPage = function(){
		$('#ordersDiv').css('display','none');
		$('#paymentsDiv').css('display','none');
		$('#metricsDiv').css('display','none');
		$('#accountsDiv').css('display','none');
		$('#productDiv').css('display','block');

		controller.initModel(model);
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

			this.createPrintingTypeDiv(container);

			var saveButton = "<div class='col-md-1 col-md-offset-8'><button name='saveButton' id='saveButton' type='button' class='form-control btn btn-primary'>Save</button></div></div>	";
			container.append(saveButton);

			var that = this;
			$("#productsTable").jqGrid({
                datatype: "local",
                data: this.model.supportedEntities,
                colNames:['Type', 'T Shirt type','Fabric type', 'Sleeve','GSM','Price' ,'Remove'],
                colModel:[
					{name:'k1ptype',index:'k1ptype', hidden: true},
                    {name:'k2psubtype',index:'k2psubtype'},
                    {name:'k3fabric',index:'k3fabric'},
                    {name:'k4sleeves',index:'k4sleeves'},
                    {name:'k5material',index:'k5material'},
					{name:'k6price',index:'k6price'},
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

						var button = $(event.currentTarget);
						var cell = button.parent();
						var row = cell.parent();
						var index = parseInt(row.attr("id")) - 1 ;

						that.model.supportedEntities.splice(index, 1);
						that.model.supportedIds.splice(index, 1);
						var allParameters = $("#productsTable").jqGrid("getGridParam");
						allParameters.data = that.model.supportedEntities;
						 $("#productsTable").jqGrid('setGridParam', { datatype: 'local',data: that.model.supportedEntities }).trigger('reloadGrid');

					});
				},
                sortname: 'k1ptype',
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
