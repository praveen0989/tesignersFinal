

define([], function(){

	var MetricsModel = function(){
		
		this.userName = 'hangout';
		this.password = 'hangout';
		
		this.getUserName = function(){
			return this.userName;
		};
		
		this.getPassword = function() {
			return this.password;
		};
		
	};
	return MetricsModel;
});
