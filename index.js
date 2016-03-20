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
shell.mkdir('-p', 'backups');
shell.cd('backups')
var current = 'backups'+(new Date().getTime());
shell.mkdir(current);
shell.cd(current);
process.argv.forEach(function (val, index, array) {
	if(index==0 || index==1)
		return;
	
	github.repos.getFromOrg({
		org: val,
		per_page: 100
	//TODO more than 100
	}, function(err, res) {
		shell.mkdir(val);
		if(err)
			return;
		//TODO catch all errors;
		//TODO check if res is valid
		for (i = 0; i < res.length; i++) { 	
			var position = val+'/'+res[i].name;
			shell.mkdir(position);
			shell.exec('git clone '+res[i].clone_url+' '+position, {silent: true} , function(code, stdout, stderr) {
			  console.log('Exit code:', code);
			});
		}
	});
	
});
//TODO api-key for rate limit
//TODO allow not only org but also users
