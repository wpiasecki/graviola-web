(function() {

  var app = angular.module('graviola', []);
  
  app.controller('gc', function($scope) {
    $scope.busca = "";
    $scope.linhas = document.linhas;
    $scope.linhas.forEach(linha => { 
      linha.redirecionar = () => {
        document.location='detalhes-linha.html?codigo='+linha.codigo;
      }
    });
  });
  
})();
