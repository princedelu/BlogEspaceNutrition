
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
(function(exports){

    var config = {

        /* List all the roles you wish to use in the app
        * You have a max of 31 before the bit shift pushes the accompanying integer out of
        * the memory footprint for an integer
        */
        roles :[
            'public',
            'user',
            'admin'],

        /*
        Build out all the access levels you want referencing the roles listed above
        You can use the "*" symbol to represent access to all roles
         */
        accessLevels : {
            'public' : "*",
            'anon': ['public'],
            'userOnly' : ['user'],
            'user' : ['user', 'admin'],
            'admin': ['admin']
        }

    };

    exports.userRoles = buildRoles(config.roles);
    exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);	

    /*
        Method to build a distinct bit mask for each role
        It starts off with "1" and shifts the bit to the left for each element in the
        roles array parameter
     */

    function buildRoles(roles){

        var bitMask = "01";
        var userRoles = {};

        for(var role in roles){
            var intCode = parseInt(bitMask, 2);
            userRoles[roles[role]] = {
                bitMask: intCode,
                title: roles[role]
            };
            bitMask = (intCode << 1 ).toString(2);
        }

        return userRoles;
    }

    /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
     */
    function buildAccessLevels(accessLevelDeclarations, userRoles){

        var accessLevels = {};
        for(var level in accessLevelDeclarations){

            var resultBitMask = '';
            var role;
            if(typeof accessLevelDeclarations[level] == 'string'){
                if(accessLevelDeclarations[level] == '*'){

                    for( role in userRoles){
                        resultBitMask += "1";
                    }
                    //accessLevels[level] = parseInt(resultBitMask, 2);
                    accessLevels[level] = {
                        bitMask: parseInt(resultBitMask, 2),
                        title: accessLevelDeclarations[level]
                    };
                }
                else console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");

            }
            else {

                resultBitMask = 0;
                for(role in accessLevelDeclarations[level]){
                    if(userRoles.hasOwnProperty(accessLevelDeclarations[level][role]))
                        resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
                    else console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
                }
                accessLevels[level] = {
                    bitMask: resultBitMask,
                    title: accessLevelDeclarations[level][role]
                };
            }
        }

        return accessLevels;
    }

})(typeof exports === 'undefined' ? this.routingConfig = {} : exports);


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
		
		if($window.sessionStorage.search!==undefined){
			$scope.recherche=$window.sessionStorage.search;
		}

		PublicFactory.listArticles($scope.page,$scope.categorie,$scope.recherche,
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
	
	$scope.search = function () {
		if ($scope.valeurrecherche !== undefined){
			$window.sessionStorage.search=$scope.valeurrecherche;
			
		}else{
			delete $window.sessionStorage.search;
		}
		$route.reload();
	};
	
	$scope.delSearch = function () {
		delete $scope.recherche;
		delete $window.sessionStorage.search;
		$route.reload();
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
(function(){
"use strict";

angular.module('BlogEspaceNutrition').directive('commentaires', function($location) {
    return {
        link: function(scope, element, attrs) {
            var $element = $(element);
			var articleId = fyre.conv.load.makeArticleId($location.absUrl());
			var customStrings = {
				signIn: "Identification",
		        signInGuest: "Se connecter en invit\u00e9",
		        signOut: "D\u00e9connexion",
		        editProfile: "\u00c9diter le profil",
		        siteAdmin: "Administration",
		        postButton: "Poster",
		        postAsButton: "Poster en tant que",
		        postEditButton: "\u00c9diter",
		        postEditCancelButton: "Annuler",
		        commentCountLabel: "commentaire",
		        commentCountLabelPlural: "commentaires",
		        listenerCountLabel: "abonn\u00e9",
		        listenerCountLabelPlural: "abonn\u00e9s",
		        likeButton: "J'aime",
		        unlikeButton: "J'aime pas",
		        editButton: "\u00c9diter",
		        replyButton: "R\u00e9pondre",
		        follow: "S'abonner",
		        unfollow: "Se d\u00e9sabonner",
		        banUserButton: "Bannir",
		        deleteButton: "Supprimer",
		        flagButton: "Marquer",
		        shareButton: "Partager",
		        sortNewest: "Les plus r\u00e9cents",
		        sortOldest: "Les plus anciens",
		        sortLabel: "Ordre",
		        sortSeparator: " ",
		        banTitle: "Bannir l'utilisateur",
		        banConfirmation: "\u00cates-vous sur de vouloir bannir cet utilisateur ?",
		        banConfirmButton: "OK",
		        banCancelButton: "Annuler",
		        flagSpam: "Spam",
		        flagOffensive: "Offensant",
		        flagDisagree: "D\u00e9saccord",
		        flagOffTopic: "Hors-sujet",
		        flagTitle: "Le sujet de %s",
		        flagSubtitle: "Marquer comme",
		        flagEmail: "Email",
		        flagEmailPlaceholder: "vous@exemple.org",
		        flagNotes: "Notes",
		        flagNotesPlaceholders: "Votre commentaire ici",
		        flagConfirmButton: "OK",
		        flagCancelButton: "Annuler",
		        flagSuccessMsg: "Le message a bien \u00e9t\u00e9 marqu\u00e9",
		        shareDefaultText: "Tu devrais lire ce commentaire !",
		        shareTitle: "Partager le commentaire",
		        shareButtonText: "Partager",
		        shareLabel: "Partager sur :",
		        sharePermalink: "Permalien",
		        mentionTitle: "Partager la mention",
		        mentionSubtitleFacebook: "Partager ce commentaire Facebook \u00e0 :",
		        mentionSubtitleTwitter: "Partager ce commentaire Twitter \u00e0 :",
		        mentionDefaultText: "Je t'ai mentionn\u00e9 dans un commentaire",
		        mentionConfirmButton: "OK",
		        mentionCancelButton: "Annuler",
		        mentionSuccessMsg: "La mention a bien \u00e9t\u00e9 partag\u00e9e",
		        mentionErrorNoneSelected: "Aucun pseudo n'a \u00e9t\u00e9 selectionn\u00e9",
		        mentionErrorGeneral: "Erreur lors de l'envoi du partage de mention. Veuillez r\u00e9essayer ult\u00e9rieurement",
		        timeJustNow: "\u00e0 l'instant",
		        timeMinutesAgo: "minute plus t\u00f4t",
		        timeMinutesAgoPlural: "minutes plus t\u00f4t",
		        timeHoursAgo: "heure plus t\u00f4t",
		        timeHoursAgoPlural: "%s heures plus t\u00f4t",
		        timeDaysAgo: "jour plus t\u00f4t",
		        timeDaysAgoPlural: "jours plus t\u00f4t",
		        errorAuthError: "Erreur lors de l'authentification",
		        errorCommentsNotAllowed: "Commentaire non autoris\u00e9",
		        errorDuplicate: "M\u00eame si vous aimez votre commentaire, vous n'\u00eates pas autoris\u00e9 \u00e0 le publier deux fois",
     		    errorEditDuplicate: "Vous ne pouvez pas \u00e9diter ce commentaire",
		        errorEditNotAllowed: "L'\u00e9dition du commentaire n'est pas autoris\u00e9",
		        errorEmpty: "Votre commentaire est vide. Veuillez r\u00e9diger un message",
		        errorInsufficientPermissions: "Vous n'avez pas les droits suffisants pour effectuer cette op\u00e9ration",
		        errorInvalidChar: "Des caract\u00e8res non-autoris\u00e9s se sont gliss\u00e9s dans votre message, revoyez votre copie ;)",
		        errorLikeOwnComment: "Vous ne pouvez aimer votre propre commentaire.",
		        errorMalformed: "Le contenu de votre commentaire n'est pas valide, revoyez votre copie ;)",
		        errorMaxChars: "Votre commentaire d\u00e9passe la limite de caract\u00e8res autoris\u00e9e.",
		        errorExpired: "Session expir\u00e9e. Veuillez rafra\u00eechir cette page",
		        errorDefault: "Une erreur s'est produite, veuillez renouveler l'op\u00e9ration ult\u00e9rieurement"
			};
			var convConfig = {};
			convConfig.strings= customStrings;
			fyre.conv.load({}, [convConfig,{
				el: 'livefyre-comments',
				network: "livefyre.com",
				siteId: "380803",
				articleId: articleId,
				signed: false,
				collectionMeta: {
				    articleId: articleId,
				    url: fyre.conv.load.makeCollectionUrl($location.absUrl(), [], true),
				}
			}], function() {});
        }
    };
});

})();
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



