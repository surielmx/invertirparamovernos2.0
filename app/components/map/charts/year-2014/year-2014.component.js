(function(){
	/**
	*  KlDirective Directive
	*/
	'use strict';

	function Year2014Ctrl(_, $rootScope, $timeout){
		
		return {
			restrict: 'E',
			replace:true,
			scope: '=',
			template: [
				'<div id="year-2014" ></div>'
			].join(''),
			link: function(scope, element, attr, ctrl){
				$rootScope.$on('dataMap', function(e, data){
					inversionZmChart(data);
					e.stopPropagation();
				});

				function inversionZmChart(data) {
					var _zm_chart = Highcharts.setOptions({
						lang: {
							thousandsSep: ','
						}
					});

					_zm_chart = new Highcharts.Chart({
						chart: {
							type: 'bar',
							renderTo: element[0],
							height: 500
						},
						title: {
								text: 'Viajes al trabajo'
						},
						tooltip: {
								pointFormat: '<span style="color:{point.color}"></span> {series.name}: <b>{point.y}</b><br/>.'
						},
						xAxis: {
								categories: ['']
						},
						yAxis: {
								min: 0,
								title: {
										text: 'Número de viajes',
								}
						},
						plotOptions: {
								bar: {
										dataLabels: {
	                    enabled: true
		                }
								}
						},
						legend: {
							layout: 'vertical'
						},
						colors: ["#71acd0","#41AD49","#71d0c0","#1f6cb2", "#E96021", "#F9A01B"],
						series: [
							{
                data: [[data.tf]],
                name: 'Caminando',
    	        },{
		            data: [[data.te]],
		            name: 'Bicicleta',
    	        },
    					{
    		        data: [[data.ta]],
  	            name: 'Transporte público',
  		        },{
		            data: [[data.td]],
		            name: 'Transporte laboral',
			        },
							{
		            data: [[data.tc]],
		            name: 'Vehículo',
			        },{
                data: [[data.tg]],
                name: 'Otro'
    	        }
    	       ]
					});

					$timeout(function() {
						_zm_chart.reflow();
					}, 1000);
				}

				
			}
		};
	}

	Year2014Ctrl.$inject = ['_','$rootScope', '$timeout'];
	angular.module('ipm').directive('year2014', Year2014Ctrl);
})();
