angular.module('panelAdminModule')
    .controller('panelAdminCtrl',
        ['$scope',
            '$http',
            '$state',
            '$location',
            'loginService',
            'md5',
            function ($scope, $http, $state, $location, loginService, md5) {
            	const host = $location.protocol() + '://' + $location.host() + ':8081';
                var vm = this;
				vm.nomEcommerce = loginService.nombreEcommerce;
				vm.codigo = loginService.codigo;
				vm.codigoCliente = loginService.codigoCliente;
				vm.eCommerceMd5 = vm.nomEcommerce;
				vm.visible = false;
				vm.loadingGuardar = false;
                vm.init = function () {
                    console.log();
                }
                
                vm.generaHash = function () {
                	vm.visible = true;
                	vm.eCommerceMd5 = md5.createHash(loginService.numeroCuenta);
                }
                
                vm.guardar = function () {
                	vm.loadingGuardar = true;
                	const data = {};
                	data.urlEncrypt = vm.eCommerceMd5;
                	data.url = loginService.nombreEcommerce;
                	data.clienteCodigo = vm.codigoCliente;
                	data.validarOser = 0;
                	data.notificar = 0;
                	$http.put(host + '/devolucionRest/rest/logistica/configuracion/actualizar/', data)
                        .success(function (data) {
                            vm.loadingGuardar = false;
                            vm.cargarPerfil();
                        })
                        .error(function (data) {
                            console.log('Error:' + data);
                            vm.loadingGuardar = false;
                        });
                }

            }]);