<?php

session_start();

require 'vendor/autoload.php';

// SLIM
$app = new \Slim\Slim([
	"view" => new \Slim\Views\Twig()
	]);

// VIEW TWIG
$view = $app->view();
$view->setTemplatesDirectory("app/views");
$view->parserExtensions = [
	new \Slim\Views\TwigExtension()
];

// DATABASE
$db = new PDO("sqlite:app/database/store.sqlite3");

require 'routes.php';