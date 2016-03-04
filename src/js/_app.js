
angular.module('underscore', []).factory('_', function() {
    return window._;
});

$('#pleaseWaitDialog').hide();

angular.module('BlogEspaceNutrition', ['ngRoute','underscore'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;
    
    $routeProvider.when('/',
        {
            templateUrl:   '/partials/template/blogEspaceNutrition/index.php',
            controller:     'BlogEspaceNutritionPublicCtrl',
			action : 		'listArticles',
            access:         access.public
        });
	 $routeProvider.when('/articles_:id',
        {
            templateUrl:    '/partials/template/blogEspaceNutrition/article.php',
            controller:     'BlogEspaceNutritionPublicCtrl',
			action : 		'detailArticle',
            access:         access.public
        });
    $routeProvider.when('/404',
        {
            templateUrl:    '/partials/404.html',
            access:         access.public
        });



    $routeProvider.otherwise({redirectTo:'/404'});

    $locationProvider.html5Mode(true).hashPrefix('!');

	$httpProvider.defaults.useXDomain = true;

    $httpProvider.interceptors.push(function($q, $location, $window) {
        return {
			request: function (config) {
				config.headers = config.headers || {};
			  
				var payLoad = {};
				payLoad.iss="http://www.espace-nutrition.fr";
				payLoad.aud="Espace Nutrition";
				payLoad.exp=Math.round(new Date().getTime()/1000)+60;
				payLoad.role="anonyme";

				var jPayLoad = JSON.stringify(payLoad);

				config.headers.Authorization = 'BearerPublic ' + utf8tob64u(jPayLoad);
			  	return config;
			},
            'responseError': function(response) {
                if(response.status === 401) {
                     $location.path('/');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    });

}]).run(['$rootScope', '$location','$window', 'Auth', function ($rootScope, $location,$window, Auth) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
			if (current !== undefined && current.$$route !== undefined)
				$rootScope[current.$$route.originalPath.split('/')[1]] = false;
			if (next !== undefined && next.$$route !== undefined)
				$rootScope[next.$$route.originalPath.split('/')[1]] = true;
        });

		$rootScope.$on('$viewContentLoaded', function() {
			$rootScope._style = document.createElement('link');
			$rootScope._style.type = 'text/css';
			$rootScope._style.href = 'css/template/blogEspaceNutrition/styles.css';
			$rootScope._style.rel = 'stylesheet';

			$rootScope._style = document.head.appendChild($rootScope._style);
		});

    }]);
