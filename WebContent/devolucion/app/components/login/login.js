angular.module('loginModule')
    .controller('loginCtrl',
        ['$scope', '$http', '$state', 'loginService','$location', function ($scope, $http, $state, loginService,$location) {
            var vm = this;
            vm.buscarUsuario = function () {
            	var host = $location.protocol()+'://'+$location.host()+':8081';
                $http.post(host+'/devolucionRest/rest/logistica/login/validaUser', vm.formData)
                    .success(function (data) {
                        if ("false" != data) {
                        	var infoLogin = {
                        		"codigoUsuario": data.codigoUsuario,
                        		"idToken": data.idToken
                        	}

                        	loginService.perfil = data.rolesOpcionesTOs[0].rolNombre;
                        	$http.post(host+'/devolucionRest/rest/logistica/login/listarCliente', infoLogin)
                    			.success(function (data) {
		                        	loginService.codigo = data[0].frontEnd.codigo;
                        			loginService.codigoCliente = data[0].configuracion.clienteCodigo;
		                        	loginService.numeroCuenta = data[0].cuentaCorriente.codigo +""+
		                        	data[0].cuentaCorriente.sucursal +""+
		                        	data[0].cuentaCorriente.tipo;
		                        	loginService.urlEncrypt = data[0].cuentaCorriente.urlEncrypt;
									loginService.nombreEcommerce = data[0].alias;
		                            $state.go('dashboard-edicion');
		                    })
		                    .error(function (data) {
		                        console.log('Error:' + data);
		                    });                    
                            $state.go('dashboard-edicion');
                        } else {
                            vm.formData.error = 'Usuario o Clave Inválidos';
                        }
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
            }
        }]);