(function(){
"use strict";

	angular.module('BlogEspaceNutrition')
	.factory('PublicFactory', ['$http','$window', function($http,$window){

		var userRoles = routingConfig.userRoles;
		var range;
		var rangeMin;
		var rangeMax;
		var nbArticlesParPages = 5;
		var uri;
		var uriRange='';
		var uriCategorie='';
		var uriValeurRecherche='';

		return {
			listArticles: function(page,categorie,valeurrecherche,success, error) {
				if (page !== undefined || categorie !== undefined || valeurrecherche !== undefined){
					if (page !== undefined){
						rangeMin=parseInt(page)*nbArticlesParPages - nbArticlesParPages;
						rangeMax=parseInt(page)*nbArticlesParPages - 1;
						range=rangeMin.toString().concat("-").concat(rangeMax.toString());
						uriRange='range='+range;
					}
					uriCategorie='';
					if (categorie !== undefined){
						uriCategorie='categorie='+categorie;
					}
					uriValeurRecherche='';
					if (valeurrecherche !== undefined ){
						uriValeurRecherche='recherche='+valeurrecherche;
					}
					$http.get('/api/articles?'+uriRange+'&'+uriCategorie+'&'+uriValeurRecherche).success(success).error(error);
				}else{
					$http.get('/api/articles').success(success).error(error);
				}
			},
			detailArticle: function(id,success, error) {
				$http.get('/api/articles/'+id).success(success).error(error);
			},
			listCategories: function(success, error) {
				$http.get('/api/categories').success(success).error(error);
			},
			listRecentMediaInstagram: function(success, error) {
				$http.jsonp('https://api.instagram.com/v1/users/self/media/recent/?access_token=2075471567.2a4ef82.6d421a057b2b467d9bf32873c36cda74&callback=JSON_CALLBACK').success(success).error(error);
			},
			userRoles : userRoles
		};
	}]);

})();



