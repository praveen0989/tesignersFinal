define(["account/account"], function( Account){

	return({
		"account" : {
			module : function(){
				return new Account();
			}
		}
	});
});