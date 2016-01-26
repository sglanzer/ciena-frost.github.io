var npm = require('npm');
var http = require('http');
var fs = require('fs');
var request = require('sync-request');
var chalk = require('chalk');

var options = {
  'headers': {
    'user-agent': 'ciena-frost'
  }
};



var res = request('GET', 'https://api.github.com/orgs/ciena-frost/repos', options);
var body = JSON.parse(res.getBody());

body.forEach(function(repo) {
  console.log(repo.name);
  if (repo.name.startsWith("ember-")) {
    //ember install this package

    npmInstall(repo);


    //get Package JSON un comment when needed
    //package_url = repo.contents_url.replace("{+path}","package.json");
    //packageJSON = getPackageJSON(package_url);
    //demoParentDirectory = packageJSON.frost_guide_directory;
    demoParentDirectory = "ui-components/button-controls/button";
    //console.log(packageJSON);

    readme_url = repo.contents_url.replace("{+path}", "README.md");
    readme_content = getREADME(readme_url);

    if (demoParentDirectory !== undefined && directoryExistsSync("app/pods/" + demoParentDirectory)){
      //insert tabs

      var descriptionContent = fs.readFileSync("app/pods/" + demoParentDirectory + "/template.hbs", encoding='utf8');

      fs.writeFileSync("app/pods/" + demoParentDirectory + "/template.hbs",
        "{{#frost-tabs on-change=(action 'tabSelected') selection=selectedTab}}" +
        "\n\t{{#frost-tab alias='Description' class='description' id='description'}}" +
        "\n\t\t" + descriptionContent +
        "\n\t{{/frost-tab}}" +
        "\n\t{{#frost-tab alias='API' class='api' id='api'}}" +
        "\n\t\tI need to come from readme.md of my corresponding component" +
        "\n\t{{/frost-tab}}" +
        "\n\t{{#frost-tab alias='Demo' class='demo' id='demo'}}" +
        "\n\t\tI need to come from the demo dir of my corresponding component" +
        "\n\t{{/frost-tab}}" +
        "\n{{/frost-tabs}}"
      );
    }else{
      console.log(chalk.red.bold("Directory: " + "/app/pods/" + demoParentDirectory + " does not exist. Skipping repo demo generation"));
    }


    // console.log(readme_content);
  }
});

function getPackageJSON(url) {
  //get api file request
  var res = request('GET', url, options);
  var body = JSON.parse(res.getBody());
  res = request('GET', body.download_url, options);
  return JSON.parse(res.getBody());
  //get download url

}

function getREADME(url) {
  //get api file request
  var res = request('GET', url, options);
  var body = JSON.parse(res.getBody());
  var buf = new Buffer(body.content, 'base64')
  return buf.toString("ascii");

}

function npmInstall(repo) {
  console.log("Doing Ember Install of : " + repo.name);
  npm.load({
    loaded: false
  }, function(err) {
    // catch errors
    npm.commands.install([repo.name], function(er, data) {
      console.log(er);
    });
    npm.on("log", function(message) {
      // log the progress of the installation
      console.log(message);
    });
  });
}

function directoryExistsSync(filePath) {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
}

function get(url) {
  requestify.get(url).then(function(response) {
    var body = respone.getBody();
    return body;
  }, function(err) {
    console.log(err);
  });
}

function getRepo(url) {
  console.log(url);
  debugger;
  requestify.get(url).then(function(response) {
    var body = respone.getBody();
    console.log(respone);
    console.log("Hello");
  }, function(err) {
    console.log(err);
  });

}
