({
		baseUrl: "js/",
    	paths: {
			jquery: '../tp/jquery',
			bootstrap : '../tp/bootstrap.min',
			common : 'common',
			tp : "../tp"
		},

		shim : {
			"bootstrap" : { "deps" :['jquery'] }
		},
		
		name: "coremain",
		out: "main-built.js"
})