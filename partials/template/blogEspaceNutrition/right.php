<div class="row">
	<div id="custom-search-input">
		<form name="searchForm" ng-submit='search()'>
			<div class="input-group col-md-12">
				<input type="text" data-ng-model="valeurrecherche" class="search-query form-control" placeholder="Recherche" />
				<span class="input-group-btn">
					<button class="btn btn-search" type="submit">
						<span class="fa fa-search"></span>
					</button>
				</span>
			</div>
		</form>
	</div>
</div>

<div class="row cellRight">
	<div class="col-md-12 ">
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				Blog d'une Diététicienne Nutritionniste geek, gourmande et passionnée par son métier
			</div> 
		</div>
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				<img src="/images/myAvatar.png" width="50%"alt"myAvatar" />
			</div> 
		</div>
	</div> 
</div>

<div class="row cellRight">
	<div class="col-md-12 ">
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				Mon approche, celle de l’alimentation intuitive et naturelle
			</div> 
		</div>
		<div class="row">
			<div class="col-md-12 contentRigthColumnCenter">
2 principes :<br/><br/>
<b>" Don’t eat less, eat right"<br/>"Ne mangez pas moins mangez mieux"</b><br/>
- Le choix d’aliments de qualité, à index glycémique bas, non transformés, riches en fibres et bio si possible<br/>
<br/>
<b>" Don’t start a diet, start a new lifestyle"<br/>"Ce n’est pas un régime c’est un mode de vie"</b><br/>
- L’alimentation intuitive : pas de quantités restreintes, pas de points ou calories à compter, vous mangez selon vos besoins en étant attentif à vos sensations alimentaires, votre plaisir, vos envies sans culpabilité, en pleine conscience
			</div> 
		</div>
	</div> 
</div>

<div class="row cellRight">
	<div class="col-md-12 ">
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				Me contacter
			</div> 
		</div>
		<div class="row contentRigthColumnCenter">
			<a href="tel:0668007915">06 68 00 79 15</a>
		    <br/>
			<a href="mailto:angelique.guehl@espace-nutrition.fr">angelique.guehl@espace-nutrition.fr</a>
			<br/>
			<a href="http://www.espace-nutrition.fr/#adistance">Consultation à distance</a>
		</div>
	</div> 
</div>

<div class="row cellRight">
	<div class="col-md-12 ">
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				Me suivre
			</div> 
		</div>
		<div class="row">
			<div class="col-md-12 contentRigthColumnCenter">
				<ul class="social-network social-circle">
					<li><!-- Facebook -->
						<a href="https://www.facebook.com/Angeliqueguehlveggiedieteticienne" target="_blank" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a>
					</li>
					<li>
						<a href="https://twitter.com/gargamelle86" target="_blank" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a>
					</li>
					<li>
						<a href="https://www.instagram.com/veggie_dieteticienne/" target="_blank" class="icoInstagram" title="Instagram"><i class="fa fa-instagram"></i></a>
					</li>
					<li>
						<a href="https://fr.pinterest.com/veggiediet79/" target="_blank" class="icoPinterest" title="Pinterest"><i class="fa fa-pinterest"></i></a>
					</li>
				</ul>
			</div> 
		</div>
	</div> 
</div>

<div class="row cellRight">
	<div class="col-md-12 ">
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				Partenaires
			</div> 
		</div>
		<div class="row contentRigthColumnCenter">
			<a href="https://iswari.fr/" target="_blank">
				<img src="/images/iswari.png" border="0" title="Découvrir" alt="Découvrir" width="120" height="60" />
			</a><br/><br/>
		    -10% et frais de port offerts pour un minimum de commande de 40€<br/>avec le code <b>WEB-ANGELISWARI</b> sur le site <a href="https://iswari.fr/" target="_blank">https://iswari.fr/</a>
		</div>
	</div> 
</div>

<div class="row cellRight">
	<div class="col-md-12">
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				Catégories
			</div> 
		</div>
		<div class="row">
			<div class="col-md-12 contentRigthColumn">
				<ul>
					<div ng-repeat="categorie in categories">
						<li ng-show="{{categorie.id_parent}}==0">
							<a href="/?categorie={{categorie.id}}" >{{categorie.libelle}}</a>
						</li>
						<ul  ng-show="{{categorie.id_parent}}!=0">
							<li>
								<a href="/?categorie={{categorie.id}}" >{{categorie.libelle}}</a>
							</li>
						</li>
					</div>
				</ul>
			</div> 
		</div>
	</div> 
</div>

<div class="row cellRight">
	<div class="col-md-12">
		<div class="row">
			<div class="col-md-12 titreRightColumn">
				Mon instagram
			</div> 
		</div>
		<div class="row">
			<div class="col-md-12 contentRigthColumn">
				<div class="row">
					<div class="col-md-4 col-xs-4" ng-repeat="media in medias">
						<a href="{{media.link}}" target="_blank">
							<img src="{{media.images.thumbnail.url}}" alt="BG" class="imgInstagram">
						</a>
					</div> 
				</div>
			</div> 
		</div>
	</div> 
</div>
