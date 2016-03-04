<?php	
include("commun/header.php");
?>   
<div class="container">
	<div class="row">
		<div class="col-md-8"> 
			<div class="panel">
				<div class="panel-body">
					<!--/stories-->
					<div class="row" ng-show="categorieLib">
						<a class="btn btn-danger" href="/">Catégorie : {{categorieLib}} <i class="fa fa-trash"></i></a>
					</div>
					<div class="row articleLigne" ng-repeat="article in articles">
						<div class="col-md-12">
							<div class="row articleTitre">
								<a href="/articles_{{article.id}}">{{article.titre}}</a>
							</div>
							<div class="row articleInfo">
								<small class="text-muted">Le {{article.date}} - {{article.libelle_long}}</small>
							</div>
							<div class="row articlePartie1">
								<h4 ng-bind-html="renderHtml(article.partie1)"></h4>
							</div>
							<div class="row articleSuite">
								<small class="text-muted"><a href="/articles_{{article.id}}"><span class="label label-default">Lire l'article</span></a></small>
							</div>
						</div>
					</div> <!-- Fin row-->
					<div class="row">
						<div class="col-md-3">
							<button type="button" class="btn btn-default" ng-show="links.first.print" ng-click="first();"><i class="fa fa-fast-backward"></i> Les plus récents</button>
						</div>
						<div class="col-md-3">
							<button type="button" class="btn btn-default" ng-show="links.previous.print" ng-click="previous();"><i class="fa fa-step-backward"></i> Précédent</button>
						</div>
						<div class="col-md-3">
							<button type="button" class="btn btn-default" ng-show="links.next.print" ng-click="next();">Suivant <i class="fa fa-step-forward"></i></button>
						</div>
						<div class="col-md-3">
							<button type="button" class="btn btn-default" ng-show="links.last.print" ng-click="last();">Les plus anciens <i class="fa fa-fast-forward"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="panel">
				<div class="panel-body">
					<?php
						include("right.php");
					?>
				</div>
			</div>
		</div>
	</div>
	                                              
<?php
	include("commun/footer.php");
?>                                                                               

