<?php

$app->get("/", function() use($app, $db) {
	$app->render("layout.html");
});