var GitHubApi = require("github");
var shell = require('shelljs');

var github = new GitHubApi({
	// required
	version: "3.0.0",
	// optional
	debug: true,
	protocol: "https",
	host: "api.github.com", // should be api.github.com for GitHub
	pathPrefix: "", // for some GHEs; none for GitHub
	timeout: 5000,
	headers: {
	    "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
	}
});
github.repos.getFromOrg({
	org: "thecsea",
	per_page: 100
//TODO more than 100
}, function(err, res) {
	if(shell.test('-e','backups.old'))
		shell.rm('-rf', 'backups.old')
	if(shell.test('-e','backups'))
		shell.mv('backups', 'backups.old')
	shell.mkdir('backups');
	shell.cd('backups')
	for (i = 0; i < res.length; i++) { 	
		shell.exec('git clone '+res[i].clone_url, {silent: true} , function(code, stdout, stderr) {
		  console.log('Exit code:', code);
		});
	}
});
