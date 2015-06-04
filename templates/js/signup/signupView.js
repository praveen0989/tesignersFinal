define([], function(){
	var SignUpView = function(controller, model){
	this.controller = controller;
	this.model = model;
	this.signupButton;
	this.userName;
	this.password;
	this.keepMeLoggedIn;
	this. phoneNumber;
	
	this.registerEvents = function(controller){
		
		$("#signUpButton").click(function(){
			controller.onSignUp($("#usernameinputSignup").val(), $("#passwordinputSignup").val(),$("#phoneNumberinputSignup").val());
		});
	
	};
	
	
	this.render = function(container){
		
		var rowDiv = "<div class ='row signUpRow'>";
		
		var signupContainer = "<div id='signupContainer' class='col-md-2 col-md-offset-7 '>";
		
		var signupTitleDiv = "<div id = 'signuptitle' class='titleDiv'><h4>REGISTER</h4></div>";
		var divClose = "</div>";
		
		this.userName = '<input type="text" id = "usernameinputSignup" class="form-control" name="signup" value="" placeholder="Email ID"/>';
		var signupDiv = '<div id="usernamedivSignup" class="form-group">'+ this.userName + '</div>';
		
		this. phoneNumber = '<input type="text" id = "phoneNumberinputSignup" class="form-control" name="phoneNumber" value="" placeholder="Phone Number"/>';
		var  phoneNumberDiv = "<div id=' phoneNumberDiv' class='form-group'>"+ this.phoneNumber +"</div>";
		
		this.password = '<input type="password" id="passwordinputSignup" class="form-control" name="password" value="" placeholder="Password"/>';
		var passwordDiv = '<div id="passworddivSignup" class="form-group"> '+ this.password +'</div>';
		
		/*this.confirmPassword = '<input type="confirmPassword" id="confirmPasswordinput" name="confirmPassword" value="" placeholder="confirmPassword"/>';
		var confirmPasswordDiv = '<div id="confirmPassworddiv">'+ this.confirmPassword +'</div>';*/
		
		this.signupButton = "<input type='button' name='signUpButton' id='signUpButton' class='btn btn-primary' value='SIGN UP'/>";
		var signupButtonDiv = "<div id='signupButtonDiv' class='buttonDiv'> "+ this.signupButton +"</div>";

		var sellOnTesigners = '<div class="sell-in-tesigners"><div class="container"><div class="row"><div class="center-block"><section class="page-bottom"><div class="region region-content-footer"><section id="block-block-5" class="block block-block clearfix"><h2 class="block-title text-center">Sell on Tesigners</h2><p>Tesigners provides an online sales platform to sellers willing to sell their products online with a nationwide reach. Whether you are a retail manufacturer, vendor or supplier, you can list unlimited products on Tesigners.com and benefit from Tesigners’s largest customer base, integrated and convenient e-commerce platform, massive logistics, secure payment gateway and dedicated central seller support. You will have access to Tesigners’s seller account, coaching tools and other value add services that will boost your sales and enable fast shipments. Complete your registration on Tesigners seller portal and start selling online.</p></section><!-- /.block--></div></section></div></div></div></div>';

		
		container.append(  rowDiv + signupContainer + signupTitleDiv + signupDiv + phoneNumberDiv + passwordDiv /*+ confirmPasswordDiv */+ signupButtonDiv + divClose + divClose);
		container.append(sellOnTesigners);
		this.registerEvents(controller);
	};
};

return SignUpView;

});
