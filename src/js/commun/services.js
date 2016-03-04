(function(){
"use strict";

angular.module('BlogEspaceNutrition')
.factory('Auth', ['$http','$window', function($http,$window){

    var accessLevels = routingConfig.accessLevels;
    var userRoles = routingConfig.userRoles;

    var currentUser = adaptUser($window.sessionStorage.token);
	var role = userRoles.public;

	function changeUser(user) {
		_.extend(currentUser, user);
	}

	function adaptUser(token){
		var result =  { email: '', role: userRoles.public };
		return result;
	}

	
    return {
        authorize: function(accessLevel, role) {
            if (accessLevel === undefined)
                accessLevel = userRoles.admin;
            if(role === undefined)
                role = currentUser.role;

            return accessLevel.bitMask & role.bitMask;
        },
		adaptCurrentUser : function(){
			changeUser(adaptUser($window.sessionStorage.token));
		},
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
}]);

})();



