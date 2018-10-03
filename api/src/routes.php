<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
// Grupo de rutas para el API
$app->group('/api', function () use ($app) {
    // Version group
    $app->group('/v1', function () use ($app) {
      $app->get('/colonos/{estado},{grupo}', 'obtenerColonos');
      $app->get('/colonos/{id}', 'obtenerColono');
      $app->post('/crear', 'agregarEmpleado');
      $app->put('/actualizar/{id}', 'actualizarEmpleado');
      $app->delete('/eliminar/{id}', 'eliminarEmpleado');
    });
  });

// Catch-all route to serve a 404 Not Found page if none of the routes match
// NOTE: make sure this route is defined last
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});