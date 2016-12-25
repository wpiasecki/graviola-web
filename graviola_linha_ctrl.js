(function() {

  var app = angular.module('graviola', [], function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
  
  app.controller('glinha', function($scope, $location) {
    $scope.codigo = $location.search().codigo;
    $scope.linha = document.linhas.find(linha => linha.codigo == $scope.codigo );
    
    var data = new Date();
    var horaAtual = { hora: data.getHours(), minuto: data.getMinutes() };
    
    $scope.linha.pontos.forEach( ponto => {
      ponto.id = () => ponto.tipoDia + "_" + ponto.nome.replace(/ /g, '_');
      var nextPontos = 3;
      ponto.horarios = ponto.horarios.map(horario => {
        return {
          tempo   : horario,
          hora    : parseInt(horario.slice(0, 2)),
          minuto  : parseInt(horario.slice(3, 5)),
          get proximo () {
            return this.hora >= horaAtual.hora &&
              this.minuto >= horaAtual.minuto &&
              nextPontos-- > 0;
          }
        };
      });
    });
    
    var filter = (tipoDia) => $scope.linha.pontos.filter(l => l.tipoDia == tipoDia);
    
    $scope.pontos = {
      diaUtil : { nome: 'Dia útil', pontos: filter('DIA_UTIL') },
      sabado  : { nome: 'Sábado',   pontos: filter('SABADO')   },
      domingo : { nome: 'Domingo',  pontos: filter('DOMINGO')  }
    };
  });

})();
