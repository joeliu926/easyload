/*depand on nothing;design by joeliu*/
/*
    Use the function 'load' please set a element with attributes 'attributes'.
    and if 'loadbyVs', you can refer to the 'config of loadJSbyVs'.
*/
;var EasyLoad = {
	load : function(jsURL, ClassType) {
		jsURLs = jsURL.split(',');
		/*var intrandom = this.getRandom();*/
		var intrandom = this.data.getCacheVersion();
		for (var i = 0; i < jsURLs.length; i++) {
			try {
				switch (ClassType) {
				case 'css':
					document.write('<link rel="Stylesheet" type="text/css" href="'
									+ jsURLs[i]
									+ '?version='
									+ intrandom
									+ '"\/>');
					break;
				case 'js':
					document.write('<script type="text/javascript" src="'
							+ jsURLs[i] + '?version=' + intrandom
							+ '"><\/script>');
					break;
				default:
					if (jsURLs[i].indexOf('.css') >= 0) {
						document
								.write('<link rel="Stylesheet" type="text/css" href="'
										+ jsURLs[i]
										+ '?version='
										+ intrandom
										+ '"\/>');
					} else {
						document.write('<script type="text/javascript" src="'
								+ jsURLs[i] + '?version=' + intrandom
								+ '"><\/script>');
					}
					break;
				}
			} catch (e) {
				alert(e);
			}
		}
	},
	loadbyVs : function(sKey, Rtype) {
		sKeys = sKey.split(',');
		var intrandom = this.getRandom();
		for (var i = 0; i < sKeys.length; i++) {
			try {
				var JSHash = this.getJSHash();
				var node = JSHash[sKeys[i]];
				for (var j = 0; j < node.length; j++) {
					var Tversion;
					switch (Rtype) {
					case true:
						Tversion = node[j].version;
						break;
					case false:
						Tversion = intrandom;
						break;
					default:
						Tversion = node[j].version;
						break;
					}
					switch (node[j].type) {
					case 'js':
						document.writeln('<script type="text/javascript" src="'
								+ node[j].url + '?version=' + Tversion
								+ '"><\/script>');
						break;
					case 'css':
						document.write('<link rel="Stylesheet" type="text/css" href="'
										+ node[j].url
										+ '?version='
										+ Tversion
										+ '"\/>');
						break;
					default:
						break;
					}
				}
			} catch (e) {
				alert(e);
			}
		}
	},
	getRandom : function() {
		return Math.floor(1 + Math.random() * 999999);
	},
	getJSHash: function () {
	    /* config of loadJSbyVs */
		var JSHash = { 
			test : [ {
				url : "Scripts/test.js",
				version : "1.0",
				type : "js"
			}],
			test2: [{
			    url: "Scripts/test2.js",
			    version: "1.0",
			    type: "js"
			}]
		};
		return JSHash;
	},
	data:{
	    cache: {
	        'cacheVersion': undefined
	    },
	    getCacheVersion: function () {
	        var cacheVersion = EasyInclude.data.cache.cacheVersion;
	        if (!cacheVersion) { 
	            cacheVersion = document.querySelector('[page-js-version]').attributes["page-js-version"].value;
	        }
	        return cacheVersion;
	    }
	}
};
