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
    var agora = { 
      hora  : data.getHours(), 
      minuto: data.getMinutes()
    };
    
    $scope.linha.pontos.forEach( ponto => {
      ponto.id = () => ponto.tipoDia + "_" + ponto.nome.replace(/ /g, '_');
      var maxPontosDestacados = 3;
      ponto.horarios = ponto.horarios.map( horario => {
        return new function() {
          this.tempo   = horario;
          this.hora    = parseInt( horario.slice(0, 2) );
          this.minuto  = parseInt( horario.slice(3, 5) ),
          this.proximo = (() => {
            if (maxPontosDestacados > 0) {
              var isHoraAtualAdiantada = this.hora == agora.hora && this.minuto >= agora.minuto;
              var isHoraAtualPosterior = this.hora > agora.hora;
              if ( isHoraAtualAdiantada || isHoraAtualPosterior ) {
                return maxPontosDestacados--;
              }
            }
            return 0;
          })();
        };
      });
    });
    
    var filter = (tipoDia) => $scope.linha.pontos.filter( l => l.tipoDia == tipoDia );
    
    $scope.pontos = {
      diaUtil : { nome: 'Dia útil', pontos: filter('DIA_UTIL') },
      sabado  : { nome: 'Sábado',   pontos: filter('SABADO')   },
      domingo : { nome: 'Domingo',  pontos: filter('DOMINGO')  }
    };
  });

})();
