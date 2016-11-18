var node_dropbox = require('node-dropbox-copia');
var api = node_dropbox.api('CMj9o-pbqicAAAAAAAABZoL6zFcWKDe28fppU-u0YY4jPp2ZnIOWxgEAOq-hDuyz');
var fs = require('fs-extra');

var x;
var funcion = function () {
    return new Promise((res, rej) => {
        api.getFile('/datos.json', function (e, data, body) {
            res(x = body);
        }); 
    });
};

funcion().then(res => {
    console.log("Promesa y...");
    console.log(typeof x);
    console.log(x);
    new Promise((res, rej) => {
        res(api.createFile('/pepe.json', m,function(e,b,c){
            if(e)console.log(e);
        }));
    });

});
