

define([], function(){

	var AccountModel = function(){
		
		this.accountDetails = {
			bName : '',
			dName: '',
			vNum:'',
			cDesc:'',
			addr:'',
			pCode:'',
			city:'',
			state:''
		};
		
		this.states = "Andaman and Nicobar Islands|Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chandigarh|Chhattisgarh|Dadra and Nagar Haveli|Daman and Diu|Delhi|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu and Kashmir|Jharkhand|Karnataka|Kerala|Lakshadweep|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Orissa|Pondicherry|Punjab|Rajasthan|Sikkim|Tamil Nadu|Tripura|Uttar Pradesh|Uttaranchal|West Bengal".split("|");
		
		
		
	};
	return AccountModel;
});
