#!/usr/bin/env node


//Paquetes DEPENDECIES
require('shelljs/global');
var fs = require('fs-extra');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var gitConfig = require('git-config');
var pck = require(path.join(__dirname, '..','package.json'));
var github = require('octonode');
var readlineSync = require('readline-sync');
var directorioUsuario = process.cwd() + '/';

// RUTA ACTUAL

var direct = process.cwd() + '/'; //Actual,desde donde se ejecuta el script

//Modulos distribuidos

var comprobar = require('./comprobarMinimist.js');
var renderTemplate = require('./renderTemplate.js');
var iniDeplo = require('./initializesDeploys.js');
var octonode = require('./octonode.js');
var defaultname, defaultemail;



gitConfig(function (err, config) { //PARA RECOGER OPCIONES POR DEFECTO
	if (err)
		console.log(err);


	//opciones por defecto GitHub	
	defaultname = config.user.name;
	defaultemail = config.user.email;


	if (comprobar.comp(argv)) {
		// Si la opcion es -v,imprime version

		if (argv.v) {
			console.log(pck.version);
		}
		
		if (argv.d || argv.deploy) {
			iniDeplo.execute(path, direct, fs, argv.d, argv.deploy);
		}
		if (Object.keys(argv).length == 1 || argv.dir) {
			renderTemplate.rend(argv, path, fs, defaultname, defaultemail, direct);
			try {
				var file = fs.readdirSync(process.env.HOME + '/.gitbook-start/');
				if (file.indexOf('config.json') === -1) {
					octonode.octoIni(fs, github, readlineSync).then((resolve, reject) => {
						octonode.octoRepo(fs, github, readlineSync, directorioUsuario).then((resolve, reject) => {
							exec('npm run deploy', function (err, stdout) {
								if (err) console.log(err);
							});
						});
					});
				}

				else {
					
					octonode.octoRepo(fs, github, readlineSync, directorioUsuario).then((resolve, reject) => {
						exec('npm run deploy', function (err, stdout) {
							if (err) console.log(err);
						});
					});
				}
			}
			catch (err) {
				octonode.octoIni(fs, github, readlineSync).then((resolve, reject) => {
					octonode.octoRepo(fs, github, readlineSync, directorioUsuario).then((resolve, reject) => {
						exec('npm run deploy', function (err, stdout) {
							if (err) console.log(err);
							
						});

					});
				});
			}
		}
	}
	else {
		console.log("gitbook-start [OPTIONS]\n" +
			"--dir nombre del directorio a crear node gitbook-star --dir miDirectorio\n" +
			"-a autor del libro a crear node gitbook-star -a AutorDelLibro\n" +
			"-e email del autor del libro node gitbook-star -e eric.ramos.suarez@gmail.com\n" +
			"-r repositorio github contra el que se va a trabajar -r nameRepo\n" +
			"-v muestra la version del paquete gitbook-start -v\n" +
			"-d --deploy deploy en el que se quiera ejecutar gitbook-star -d iaas\n" +
			"-h muestra ayuda sobre las opciones disponibles\n");
	}

});
