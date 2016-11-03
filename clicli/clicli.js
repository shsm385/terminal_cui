//util
// author shimada
var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

//Get document height (cross-browser)
// author shimada
util.getDocHeight = function() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
};

function Load() {
  this.load = function(url, mixToMono, opt_callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.send();
  };
}

var Terminal = Terminal || function(containerId) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem ||
                             window.webkitRequestFileSystem;

  const VERSION_ = '1.0.0';
  const CMDS_ = [
    'ls','cd','mv','rm','cp','clear','man','less','pwd','open',
    'exit','su','mu'
  ];

  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

var container_ = document.getElementById(containerId);
container_.insertAdjacentHTML('beforeEnd',
    ['<output id="aaa"></output>',
     '<div id="input-line" class="input-line">',
     '<div class="prompt">$&gt;</div><div><input class="cmdline" autofocus /></div>',
     '</div>'].join(''));
var cmdLine_ = container_.querySelector('#input-line .cmdline');
var output_ = container_.querySelector('output');
var interlace_ = document.querySelector('.interlace');
var load = new Load();


function output(html) {
  output_.insertAdjacentHTML('beforeEnd', html);
  //output_.scrollIntoView();
  cmdLine_.scrollIntoView();
}


return {
  initFS: function(persistent, size) {
    output('<div>Welcome to ' + document.title +
           '! (v' + VERSION_ + ')</div>');
    output((new Date()).toLocaleString());
    output('<p>Documentation: type "help"</p>');

    if (!!!window.requestFileSystem) {
      output('<div>Sorry! The FileSystem APIs are not available in your browser.</div>');
      return;
    }

    var type = persistent ? window.PERSISTENT : window.TEMPORARY;
    window.requestFileSystem(type, size, function(filesystem) {
      fs_ = filesystem;
      cwd_ = fs_.root;
      type_ = type;
      size_ = size;

      // If we get this far, attempt to create a folder to test if the
      // --unlimited-quota-for-files fag is set.
      cwd_.getDirectory('testquotaforfsfolder', {create: true}, function(dirEntry) {
        dirEntry.remove(function() { // If successfully created, just delete it.
          // noop.
        });
      }, function(e) {
        if (e.code == FileError.QUOTA_EXCEEDED_ERR) {
          output('ERROR: Write access to the FileSystem is unavailable.<br>');
          output('Type "install" or run Chrome with the --unlimited-quota-for-files flag.');
        } else {
          errorHandler_(e);
        }
      });

    }, errorHandler_);
  },
  output: output,
  getCmdLine: function() { return cmdLine_; },
  addDroppedFiles: function(files) {
    util.toArray(files).forEach(function(file, i) {
      cwd_.getFile(file.name, {create: true, exclusive: true}, function(fileEntry) {

        // Tell FSN visualizer we've added a file.
        if (fsn_) {
          fsn_.contentWindow.postMessage({cmd: 'touch', data: file.name}, location.origin);
        }

        fileEntry.createWriter(function(fileWriter) {
          fileWriter.write(file);
        }, errorHandler_);
      }, errorHandler_);
    });
  },
};

};
