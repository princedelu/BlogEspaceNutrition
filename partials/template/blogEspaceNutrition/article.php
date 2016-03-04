<?php	
include("commun/header.php");
?>   
<div class="container">
	<div class="row">
		<div class="col-md-8"> 
			<div class="panel">
				<div class="panel-body">
					<!--/stories-->
					<div class="row">
						<a class="btn btn-default" href="/"><i class="fa fa-arrow-circle-left"></i>
Retour à l'accueil</a>
					</div>
					<div class="row articleLigne">
						<div class="col-md-12">
							<div class="row articleTitre">
								{{article.titre}}
							</div>
							<div class="row articleInfo">
								<small class="text-muted">Le {{article.date}} - {{article.libelle_long}}</small>
							</div>
							<div class="row articlePartie1">
								<h4 ng-bind-html="renderHtml(article.partie2)"></h4>
							</div>
						</div>
					</div> <!-- Fin row-->
					<div class="row">
						<a class="btn btn-default" href="/"><i class="fa fa-arrow-circle-left"></i>
Retour à l'accueil</a>
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
	<div class="row">
    	<div class="col-md-12">
			<div class="panel">
        		<div class="panel-body">
					<h3>Partager</h3>
					<ul class="social-network social-circle">
				
						<li><!-- Facebook -->
							<a href="https://www.facebook.com/sharer/sharer.php?u=http://blog.espace-nutrition.fr/articles_{{article.id}}" target="_blank" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a>
						</li>
						<li>
							<!-- Google+ -->
							<a href="https://plus.google.com/share?url=http://blog.espace-nutrition.fr/articles_{{article.id}}" target="_blank" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a>
						</li>
		
						<li>
							<!-- Twitter -->
							<a href="https://twitter.com/intent/tweet?text=Voici l'article du blog Espace Nutrition http://blog.espace-nutrition.fr/articles_{{article.id}}" target="_blank" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a>
						</li>
						<li>
							<!-- Linkedin -->
							<a href="http://www.linkedin.com/shareArticle?mini=true&url=http://blog.espace-nutrition.fr/articles_{{article.id}}" target="_blank" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div commentaires id="livefyre-comments" articleid="article.id"></div>                                              
<?php
	include("commun/footer.php");
?>                                                                               

