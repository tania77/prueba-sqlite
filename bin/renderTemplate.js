'use strict';

module.exports = {

	rend: (argv,path,fs,defaultname,defaultemail,direct) => {
		return new Promise((resolve,reject) =>{
			var ejs = require('ejs');
		
		
			//Rutas interesantes
			var rutaTemplate = path.join(__dirname, '..','template');
			var pck = require(path.join(__dirname, '..','package.json'));
			//Expresion regular
			
			var re = /.ejs/g;
		
			
			
			
			// Creamos la carpeta
			
			var dir = argv.dir || "gitbookStart";
			fs.mkdirsSync(direct + dir);
			
			//Ver los nombres de los archivos dentro de las carpetas
			var names = fs.readdirSync(rutaTemplate);
			
			
			
			var recursive = (names,folder) => {
				for (var i in names){
				
					if(names[i].match(re)){
					
						//Renderizamos el fichero
						var data = ejs.renderFile(rutaTemplate + '/' + folder + names[i],{
							
							autor:{
								name: argv.a || dir,
								email: argv.e || defaultemail
							}
							
						},(err,data) => {
							if(err){
								throw err;
								
							} else{
								return data;
								
							}
						});
						
						//Sustituimos el nombre, para quitarle la extensión ejs
						
						var newstr = names[i].replace(re, '');
					   
						fs.writeFile(direct + dir + '/' + folder + newstr, data, (err) => {
						  if (err) throw err;
						});
					}
					else{
						fs.mkdirsSync(direct + dir + '/' +names[i]);
						recursive(fs.readdirSync(rutaTemplate + '/' + names[i]),names[i] + '/');
					}
				}
			};
			
			resolve(recursive(names,''));
			require('shelljs/global');
			cd(dir);
			exec('git init',function(err,stdout){
				if(err) console.log(err);
			});
		});
	}
		
};