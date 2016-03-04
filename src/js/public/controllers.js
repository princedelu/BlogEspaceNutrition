(function(){
"use strict";

angular.module('BlogEspaceNutrition')
.controller('BlogEspaceNutritionPublicCtrl',
['$rootScope', '$scope', '$location', '$route','$routeParams', '$window','PublicFactory','$sce', function($rootScope, $scope, $location, $route,$routeParams, $window,PublicFactory,$sce) {
    
	var action = "";
	var id;
	var searchInfo = {};
	var categorieJSON;
	if ($route !== undefined && $route.current){
		
		if ($route.current.action !== undefined){
			action = $route.current.action;
		}
	}

	$scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

	$scope.isInt = function (value) {
	  var x;
	  return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
	};

	$scope.listArticles = function () {
		$scope.success = '';
		$scope.error = '';
		$scope.loading = true;
		if($location.search().page){
			if ($scope.isInt($location.search().page)){
		 		$scope.page=$location.search().page;
			}
		}
		if($location.search().categorie){
			$scope.categorie=$location.search().categorie;
		}

		PublicFactory.listArticles($scope.page,$scope.categorie,
			function (res) {
				$scope.loading = false;
				$scope.articles = res.result;
				$scope.links = res.links;
			},
			function (err) {
				$scope.error = "Impossible de recuperer les articles";
				$scope.loading = false;
			}
		);
		
		$scope.loadData();

	};

	$scope.loadData = function(){
		PublicFactory.listCategories(
			function (res) {
				$scope.loading = false;
				$scope.categories = res;
				categorieJSON = _.findWhere(res,{id : $scope.categorie });
				if (categorieJSON !== undefined){
					$scope.categorieLib = categorieJSON.libelle_long;
				}
			},
			function (err) {
				$scope.error = "Impossible de recuperer les catégories";
				$scope.loading = false;
			}
		);

		PublicFactory.listRecentMediaInstagram(
			function (res) {
				$scope.loading = false;
				$scope.medias = res.data;
			},
			function (err) {
				$scope.error = "Impossible de recuperer les medias instagram";
				$scope.loading = false;
			}
		);
	};

	$scope.first = function(){
		searchInfo.page=$scope.links.first.page;
		if($location.search().categorie){
			searchInfo.categorie=$location.search().categorie;
		}
		$location.search(searchInfo);
	};

	$scope.previous = function(){
		searchInfo.page=$scope.links.previous.page;
		if($location.search().categorie){
			searchInfo.categorie=$location.search().categorie;
		}
		$location.search(searchInfo);
	};

	$scope.next = function(){
		searchInfo.page=$scope.links.next.page;
		if($location.search().categorie){
			searchInfo.categorie=$location.search().categorie;
		}
		$location.search(searchInfo);
	};

	$scope.last = function(){
		searchInfo.page=$scope.links.last.page;
		if($location.search().categorie){
			searchInfo.categorie=$location.search().categorie;
		}
		$location.search(searchInfo);
	};

	$scope.detailArticle = function (id) {
		$scope.success = '';
		$scope.error = '';
		$scope.loading = true;

		PublicFactory.detailArticle(id,
			function (res) {
				$scope.loading = false;
				$scope.article = res;
			},
			function (err) {
				$scope.error = "Impossible de recuperer l article";
				$scope.loading = false;
			}
		);

		$scope.loadData();

	};


	switch (action) {
		case 'detailArticle':
			id = $routeParams.id;
            $scope.detailArticle(id);
        break;
		case 'listArticles':
			$scope.listArticles();
        break;
		default:
        break;
	}
	
}]);

})();
