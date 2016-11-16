'use strict';

module.exports = {

    comp: (argv)  => {
        
        var opcionesValidas = ['d', 'a', 'r','dir','deploy','e','v'];
        var sum=0;
        var flag = true;
        
        // Empezamos comprobando las opciones validas
        function comprobarOpcion(opc) {
        	for (var i=0; i<opcionesValidas.length; i++) {
        		if (opcionesValidas[i] == opc){
        			return true;
        		}
        		
        	}
        	return false;
        	
        }
        
            // Recorremos argumentos con minimist
            for (var i in argv) {
                if ((sum !=0) && (sum%2 == 0)) {
                	if(comprobarOpcion(i)==false){
                		flag = false;
                		break;
                	}
                }
                sum += 2;
            }
       return flag;
    }
};
    

