(function() {

  var app = angular.module('graviola', []);
  
  var app = app.factory('buscaLinhaSv', () => {
    return new function() {
      this.model = { busca: "" };
      this.saveState = () => sessionStorage.buscaLinhaSv = angular.toJson(this.model);
      this.restoreState = () => this.model = angular.fromJson(sessionStorage.buscaLinhaSv) || this.model;
    }
  });
  
  
  app.controller('gc', function($scope, buscaLinhaSv) {
    buscaLinhaSv.restoreState();
    $scope.busca = buscaLinhaSv.model.busca;
    
    $scope.linhas = document.linhas.map( linha => { 
      linha.redirecionar = () => {
        buscaLinhaSv.model.busca = $scope.busca;
        buscaLinhaSv.saveState();
        document.location = 'detalhes-linha.html?codigo=' + linha.codigo;
      }
      return linha;
    });
    
    $scope.limparBusca = () => { 
      $scope.busca = ""; 
      $scope.filtrar(); 
    };
    
    $scope.filtrar = () => {
      $scope.linhas = document.linhas.filter( linha => {
        var filtrarPorCampo = campo => campo.toLowerCase().match(".*" + $scope.busca + ".*");
        return filtrarPorCampo( linha.nome ) || filtrarPorCampo( linha.codigo );
          
      });
    };
    
    $scope.filtrar();
    
  });
  
  app.directive('buscarLinhas', () => {
    return ($scope, element) => {
      element.bind('keyup', event => {
        var val = element.val();
        if (val.length >= 3) { $scope.filtrar(); $scope.$apply(); }
        if (val.length == 0) { $scope.limparBusca(); $scope.$apply(); }
      });
    };
  });
  
})();
