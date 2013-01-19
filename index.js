var fs    = require('fs');

module.exports = function requireAll(options) {
  var files   = findFiles(options.dirname);
  var modules = {};
  console.log('options', options);
  function excludeDirectory(dirname) {
    return options.excludeDirs && dirname.match(options.excludeDirs);
  }

  console.log('files', files);

  files.forEach(function(file) {
    var filepath = options.dirname + '/' + file;
    if (fs.statSync(filepath).isDirectory()) {

      if (excludeDirectory(file)) return;

      modules[file] = requireAll({
        dirname     :  filepath,
        filter      :  options.filter,
        excludeDirs :  options.excludeDirs
      });

    } else {
      var match = file.match(options.filter);
      if (!match) return;

      modules[match[1]] = require(filepath);
    }
  });

  console.log('modules', modules);
  return modules;
};

function findFiles(dirname) {

  // console.log('readdir', fs.readdirSync(dirname));

  function digDeeper(dir) {

  }


  if(/(\/\*\/)/.test(dirname)) {
    console.log('wildcard');
    var split = dirname.split('/*');
    var root = split[0];

    split.splice(0,1);

    

    console.log(newDir, f);
  } else {
    console.log('default')
    var f = fs.readdirSync(dirname);
  }

  return fs.readdirSync(dirname);
}


