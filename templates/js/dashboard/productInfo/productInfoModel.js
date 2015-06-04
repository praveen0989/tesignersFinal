

define([], function(){

	var ProductInfoModel = function(){
		
		this.categories = [{"name" : "T-Shirts", "id" :"TS"}];
		
		this.tShirtCategories = [
								{
									"id" : "RN",
									"name" :"Round Neck"
								},
								{
									"id" : "PN",
									"name" :"Polo"
								},
								{
									"id" : "HN",
									"name" :"Henley"
								}
								
						];
		
		this.tshirtFabrics = [
						{
							"id" : "F1",
							"name": "Pure Cotton"
							
						},
						{
							"id" : "F2",
							"name": "Burn-Out"
							
						},
						{
							"id" : "F3",
							"name": "Combed-Cotton"
							
						},
						{
							"id" : "F4",
							"name": "Jersey"
							
						},
						{
							"id" : "F5",
							"name": "Linen"
							
						},
						{
							"id" : "F6",
							"name": "Pigment Dyed"
							
						},{
							"id" : "F7",
							"name": "Pure Cotton"
							
						},
						{
							"id" : "F8",
							"name": "Pure Cotton"
							
						},
						{
							"id" : "F9",
							"name": "Rayon"
							
						}];
		
		this.tshirtSleeves =[{ 
							"id" :"HS",
							"name":"Half Sleeve"
						},
						{
							"id":"FS", 
							"name" :"Full Sleeve"}
					  ];
		
		this.tshirtGsm =[{ 
							"id" :"G1",
							"name":"160 GSM"
						},
						{
							"id":"G2", 
							"name" :"180 GSM"},
						{
							"id":"G3", 
							"name" :"200 GSM"},
						{
							"id":"G4", 
							"name" :"220 GSM"},
						{
							"id":"G5", 
							"name" :"240 GSM"}
					  ];
		
		this.colors = [{ 
							"id" :"C1",
							"name":"Blue"
						},
						{
							"id":"C2", 
							"name" :"White"},
						{
							"id":"C3", 
							"name" :"Black"}];
		
		
		this.supportedEntities = [];
		this.supportedIds = [];
		
	};
	return ProductInfoModel;
});
