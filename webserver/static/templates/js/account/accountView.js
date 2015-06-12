define([], function(){
	var AccountView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.isRendered = false;
	this.container;
	var currentPageId;

	this.registerEvents = function(controller){
		var that = this;

		$("#nextButton").click(function(){
			that.moveNext();
		});

		$("#backBtnId").click(function(){
			that.movePrevious();
		});

		$("#doneBtnId").click(function(){
			var data = $(":text").serializeArray();
			var jsonData = {};
			for(var i in data){
				jsonData[data[i].name] = data[i].value;
    	}
			jsonData.state = $("#stateListId").val();
			jsonData.password = $("#password").val() === "undefined" ? "" : $("#password").val();
			controller.submitSignupDetails( jsonData);
		});

	};

	this.getStatesOptionsString = function(){
		var statesOptions = "<select class='form-control' id='stateListId'>";

		for(var i = 0; i < this.model.states.length; i++){

			if(i === 16){
				statesOptions += "<option selected='selected'>" + this.model.states[i] + "</option>";
			}else {
				statesOptions += "<option>" + this.model.states[i] + "</option>";
			}
		}

		statesOptions = statesOptions + "</select>";
		return statesOptions;
	};

	this.createAccountsPage = function(page1Container){

		var mainDiv = "<div id='page1'>";
		var divClose = "</div>";
		var accountModel = this.model.accountDetails;
		var addressModel = this.model.accountAddress;

		var container = '<div class="container">';
		var header = '<h2>Account Information</h2>';
		var form = '<form  class="form-horizontal" role="form">';
		var formClose = '</form>';
		var emailId = '<div class="form-group"> <label class="control-label col-md-2" for="eId">Email Id</label>  <div class="col-md-6"> <input class="form-control" id="eId" name="eId" value= "'+accountModel.eId +'"> </div></div>';
		var phone = '<div class="form-group"> <label class="control-label col-md-2" for="phoneNumber">Phone Number</label>  <div class="col-md-6"> <input class="form-control" name="pNumber" id="pNumber" value= "'+accountModel.pNumber +'"> </div></div>';
		var password = '<div class="form-group"> <label class="control-label col-md-2" for="password">password</label>  <div class="col-md-6"> <input type="password" class="form-control" name="password" id="password" value= "'+accountModel.password +'"> </div></div>';
		var businessName = '<div class="form-group"> <label class="control-label col-md-2" for="businessgrp">Legal Name</label>  <div class="col-md-6"> <input class="form-control" name="bName" id="businessgrp" value= "'+accountModel.bName +'"> </div></div>';
		var displayName = '<div class="form-group"> <label class="control-label col-md-2" for="displayName">Display Name</label>  <div class="col-md-6"> <input class="form-control" name="dName" id="displayName" value= "'+accountModel.dName +'"> </div></div>';
		var vNum = '<div class="form-group"> <label class="control-label col-md-2" for="vNum">VAT or TIN Number</label>  <div class="col-md-6"> <input class="form-control" id="vNum" name="vNum" value= "'+accountModel.vNum +'"> </div></div>';
		var cDesc = '<div class="form-group"> <label class="control-label col-md-2" for="cDesc">Company Description</label>  <div class="col-md-6"> <input class="form-control" id="cDesc" name="cDesc" value= "'+accountModel.cDesc +'"> </div></div>';
		var addr1 = '<div class="form-group"> <label class="control-label col-md-2" for="addr">Address1</label>  <div class="col-md-6"> <input class="form-control" type="text"  id="addr1" name="addr1" value= "'+addressModel.addr1 +'"> </div></div>';
		var addr2 = '<div class="form-group"> <label class="control-label col-md-2" for="addr">Address2</label>  <div class="col-md-6"> <input class="form-control" type="text"  id="addr2" name="addr2" value= "'+addressModel.addr2 +'"> </div></div>';
		var landmark = '<div class="form-group"> <label class="control-label col-md-2" for="addr">Landmark</label>  <div class="col-md-6"> <input class="form-control" type="text"  id="landmark" name="landmark" value= "'+addressModel.landmark +'"> </div></div>';
		var pCode = '<div class="form-group"> <label class="control-label col-md-2" for="pCode">Pin Code</label>  <div class="col-md-6"> <input class="form-control" id="pCode" name="pCode" value= "'+addressModel.pCode +'"> </div></div>';
		var city = '<div class="form-group"> <label class="control-label col-md-2" for="city">City</label>  <div class="col-md-6"> <input class="form-control" id="city" name="city" value= "'+addressModel.city +'"> </div></div>';

		var state = '<div class="form-group"> <label class="control-label col-md-2" for="state">State</label>  <div class="col-md-6"> ';
		state += this.getStatesOptionsString();
		state = state + "</div></div>";

		var nextButton = '<div class="form-group"> <div class="col-md-2 col-md-push-6"> <button type="button" id ="nextButton" class="btn btn-primary btn-block"> Next</button> </div></div>';
		page1Container.append(mainDiv + container + header + form + emailId + password + businessName + displayName + phone + vNum + cDesc + addr1 + addr2 + landmark + pCode + city + state + nextButton + formClose + divClose + divClose );

	};

	this.createBankingInfoPage = function(page2Container){

		var bankInfoModel = this.model.bankDetails;

		var labelNames = ["Account Holder Name","Bank Account Number","Retype Bank Account Number",
											"Bank Name","Branch","City","State","IFSC Code"];

		var formDiv = '<div class="container" id="page2"> <h2>Banking Information</h2><form class="form-horizontal" role="form">';
		var formGroupAccountName = '<div class="form-group"><label class="control-label col-md-2" for="AccountHolderName">Account Holder Name </label>'+
																'<div class="col-md-6"><input type="text" class="form-control" name="holder_name" id="acHName" value="'+bankInfoModel.holder_name+'"></div></div>';

		var formGroupAccountNumber = '<div class="form-group"><label class="control-label col-md-2" for="accountNumber">Bank Account Number </label>'+
																	'<div class="col-md-6"><input type="password" class="form-control" name="acNumber2" id="acNumber"  value="'+bankInfoModel.acNumber+'"></div></div>';

		var formGroupRetypeAccountNumber = '<div class="form-group"><label class="control-label col-md-2" for="retypeAccountNumber">Retype Bank Account Number </label>'+
																	'<div class="col-md-6"><input type="text" class="form-control" name="acNumber" id="acNumber2" value="'+bankInfoModel.acNumber+'"></div></div>';

		var formGroupBankName = '<div class="form-group"><label class="control-label col-md-2" for="bankName">Bank Name </label>'+
															    '<div class="col-md-6"><input type="text" class="form-control" name="bankName" id="bankName" value="'+bankInfoModel.bankName+'"></div></div>';

		var formGroupBranchName = '<div class="form-group"><label class="control-label col-md-2" for="branchName">Branch Name </label>'+
															    '<div class="col-md-6"><input type="text" class="form-control" name="branchName" id="branchName" value="'+bankInfoModel.branchName+'"></div></div>';

		var formGroupIfsc = '<div class="form-group"><label class="control-label col-md-2" for="ifscCode">IFSC Code </label>'+
															    '<div class="col-md-6"><input type="text" class="form-control" name="ifsc" id="ifsc"  value="'+bankInfoModel.ifsc+'"></div></div>';

    var formGroupBankCity = '<div class="form-group"><label class="control-label col-md-2" for="bankCity">City </label>'+
															    '<div class="col-md-6"><input type="text" class="form-control" id="bankCity" ></div></div>';

		var formGroupBankState = '<div class="form-group"><label class="control-label col-md-2" for="bankState">State </label>'+
															    '<div class="col-md-6">'+ this.getStatesOptionsString() + '</div></div>';

	  var formGroupButton = '<div class="form-group"><div class="col-md-2 col-md-push-4"><button id="backBtnId" type="button" class="btn btn-primary btn-block">Back</button></div>'+
																	'<div class="col-md-2 col-md-push-4"><button id="doneBtnId" type="button" class="btn btn-primary btn-block">Done</button></div></div>';

		var formDivClose = '</form></div>';

	  var form = formDiv + formGroupAccountName + formGroupAccountNumber + formGroupRetypeAccountNumber +formGroupBankName
							+	formGroupBranchName + formGroupIfsc /*+ formGroupBankCity + formGroupBankState*/ + formGroupButton +formDivClose;

		page2Container.append(form);

	};

	this.createProductInfoPage = function(page3Container){
		page3Container.append("<div id='page3'> Page 3 <input type='button' id ='nextbut3' name ='but3'></div>");
	};

	this.moveNext = function(){

		if(currentPageId === "page1"){
			$("#page1").hide();
			$("#page3").hide();
			$("#page2").show();
			currentPageId = "page2";
			return;
		}

		if(currentPageId === "page2"){
			$("#page1").hide();
			$("#page2").hide();
			$("#page3").show();
			currentPageId = "page3";
			return;
		}

	};

	this.movePrevious = function(){

		if(currentPageId === "page2"){
			$("#page2").hide();
			$("#page3").hide();
			$("#page1").show();
			currentPageId = "page1";
			return false;
		}

		if(currentPageId === "page3"){
			$("#page3").hide();
			$("#page2").show();
			$("#page1").hide();
			currentPageId = "page2";
			return false;
		}


	};

var that = this;

var renderOnInit = function(){

		if(!that.isRendered){
			//controller.init();
		var page1 = $("<div></div>");
		that.createAccountsPage(page1);

		var page2 = $("<div/>");
		that.createBankingInfoPage(page2);

		var page3 = $("<div />");
		that.createProductInfoPage(page3);

		currentPageId = "page1";
		that.container.html(page1.html());
		that.container.append(page2.html());
		that.container.append(page3.html());
		$("#page2").hide();
		$("#page3").hide();
		that.registerEvents(controller);
		that.isRendered = true;
	}
}
	this.render = function(container){
		this.container = container;
		this.controller.initModel(this.model,renderOnInit);

	};
};

return AccountView;

});
