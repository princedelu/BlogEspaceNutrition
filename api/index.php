<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

/**
 * Load dependencies
 */
require 'vendor/autoload.php';
require 'tools/JWT.php';
require 'models/AbstractModel.php';
require 'models/ArticleModel.php';
require 'models/CategorieModel.php';
require 'tools/AuthMiddleware.php';

/**
 * Start application
 */
$app = new \Slim\Slim();
$app->add(new \AuthMiddleware());

/**
 * Start routing
 */
/***********************************************
Articles
***********************************************/
$app->get('/articles', function () use ($app) {
	$article = new ArticleModel();
	$rangeValue = $app->request()->params('range');
	$categorieValue = $app->request()->params('categorie');
	$rechercheValue = $app->request()->params('recherche');

	$article->setNbArticlesParPage(5);
	$article->setIdCategorie($categorieValue);
	$article->setRecherche($rechercheValue);

	try{
		$indexMin=0;
		$indexMax=$article->getNbArticlesParPage()-1;
		if(isset($rangeValue)){
			
			$arrayRange=explode('-', $rangeValue);
			if (count($arrayRange)==2){
				$indexMin=intval($arrayRange[0]);
				$indexMax=intval($arrayRange[1]);

				if ($indexMax<$indexMin || $indexMin<0){
					throw new Exception('Range non conforme');
				}else{
					if ($indexMax-$indexMin+1>$article->getNbArticlesParPage()){
						throw new Exception('Range trop large');
					}
				}
			}else{
				throw new Exception('La chaine range n est pas conforme');
			}	
		}

		$article->setIndexMinDem($indexMin);
		$article->setIndexMaxDem($indexMax);

		$result = $article->fetchAll();
		if (!is_array($result)){
			$app->response()->body($article->getError());
		    $app->response()->status( 403 );
		}else{
			$app->response()->header('Content-Range',strval($article->getIndexMin()).'-'.strval($article->getIndexMax()).' '.strval($article->getNbArticles()));
			$app->response()->header('Accept Range',"articles ".strval($article->getNbArticlesParPage()));
		  	$app->response()->body( json_encode( $result ));
		}
	}catch(Exception $e){
		$app->response()->body($e->getMessage());
        $app->response()->status( 400 );
	}
});

/***********************************************
Article
***********************************************/
$app->get('/articles/:id', function ($id) use ($app) {
	$articleModel = new ArticleModel();
    $articleModel->setId($id);
    
    $result = $articleModel->fetchOne();
    
	 if (!$result){
		$app->response()->body($articleModel->getError());
        $app->response()->status( 403 );
	}else{
	  	$app->response()->body( json_encode( $result ));
	}
});

/***********************************************
Categories
***********************************************/
$app->get('/categories', function () use ($app) {
	$categorieModel = new CategorieModel();

	$result = $categorieModel->fetchAll();
    
	if (!$result){
		$app->response()->body($categorieModel->getError());
        $app->response()->status( 403 );
	}else{
	  	$app->response()->body( json_encode( $result ));
	}
});



/**
 * Launch application
 */
$app->run();
