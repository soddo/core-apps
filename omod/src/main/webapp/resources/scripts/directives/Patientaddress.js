var app = angular.module('soddoregistration',[])
.directive('ngSparkline', function() {
	  return {
	    restrict: 'AE',
	    require: '^ngUuid',
	    scope:{
		    ngModel: '=',
		    ngUuid: '@',
	    },
	    controller: ['$scope', '$http',function($scope,$http,$window) {
	    	ptuuid = $scope.ngUuid
	    	//get patient telephone number 
	    	 $scope.getTel = function(ptuuid){
	    		//use rest to get the objects 
	    		$http({method:'GET',
					url: '/' + OPENMRS_CONTEXT_PATH + "/ws/rest/v1/person/" + ptuuid + "/attribute",
					//get attributes 
					//http://localhost:8086/openmrs-standalone/ws/rest/v1/person/5a81979d-5cc0-450c-adb4-2834dadf0d58/attribute
	    		}).
	    		success(function(data,status,headers,config){
	    			//check if the attribute is the telephone number then get the value
	    			for (i = 0; i < data['results'].length; i++) {
	    				if (data['results'][0]['attributeType']['display'] = "Telephone Number")
	    					$scope.tel = data['results'][0]['value']
	    			}
	    		}).
	    		error(function(data,status,headers,config){
	    			console.log(data)
	    			});
	    	} //end of getTel method
	    	
	    	//get address
	    	$scope.getAddress = function(ptuuid){
	    		//get preferred address
	    		$http({method:'GET',
					url: '/' + OPENMRS_CONTEXT_PATH + "/ws/rest/v1/person/" + ptuuid,
	    		}).
	    		success(function(data,status,headers,config){
	    			addressuuid = data['preferredAddress']['uuid']
	    			//get the preferred patient address now
	    			$http({method:'GET',
						url: '/' + OPENMRS_CONTEXT_PATH + "/ws/rest/v1/person/" + ptuuid + '/address/' + addressuuid,
		    		}).
		    		success(function(data,status,headers,config){
		    			$scope.region = data['stateProvince']
		    			$scope.zone = data['address1']
		    			$scope.woreda = data['countyDistrict']
		    			$scope.kebele = data['cityVillage']
		    			$scope.ketena = data['address2']
		    			$scope.subcity = data['address3']
		    			$scope.house = data['address4']
		    		}).
		    		error(function(data,status,headers,config){
		    			console.log(data)
		    			});
	    			}).
	    		error(function(data,status,headers,config){
	    			console.log(data)
	    			});
	    	}
	    }],
	    link: function(scope, iElement, iAttrs, ctrl) {
	    	scope.getTel(iAttrs.ngUuid);
	    	scope.getAddress(iAttrs.ngUuid);
	    },
	    template: "<div class='sparkline'><span class='left-margin'>{{tel}}</span><div><strong><i>Telephone Number </i></strong> </div> <br><table class='span10' width='80%' border='0'><tr class='span9'><td align='center' class='span1'>{{region}} </td><td align='center' class='span1'>{{zone}} </td><td align='center' class='span1'>{{woreda}} </td><td align='center' class='span1'>{{kebele}} </td> <td align='center' class='span1'>{{ketena}}</td><td align='center' class='span1'>{{subcity}} </td><td align='center' class='span1'>{{house}} </td></tr><tr><td align='center' class='span1'><i>Region </i></td><td align='center' class='span1'><i>Zone </i></td><td align='center' class='span1'><i>Woreda </i></td><td align='center' class='span1'><i>Kebele </i></td><td align='center' class='span1'><i>Ketena </i><td align='center' class='span1'><i>Subcity </i></td><td align='center' class='span1'><i>House </i></td></tr></table></div>",
	  }
	});

app.directive('ngUuid', function() {
	  return {
	    controller: function($scope) {}
	  }
	});
