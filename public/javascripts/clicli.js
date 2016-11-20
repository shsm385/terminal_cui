// author shimada
function Load() {
    this.load = function(url, mixToMono, opt_callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();
    };
}
// author shimada
var Terminal = Terminal || function(containerId) {
    window.URL = window.URL || window.webkitURL;
    window.requestFileSystem = window.requestFileSystem ||
        window.webkitRequestFileSystem;

    const CMDS_ = [
        'ls', 'cd', 'mv', 'rm', 'cp', 'clear', 'man', 'less', 'pwd', 'open',
        'exit', 'su', 'mu'
    ];
    var fs_ = null;
    var cwd_ = null;
    var container_ = document.getElementById(containerId);
    var beforeCmd = [""];
    var cmdCount = 0;
    var upCount = 0;
    var dir = createPath(csv2Array("./public/models/csv/osaka.csv"));
    var path = '/';
    sessionStorage.beforeCmd = beforeCmd;
    sessionStorage.cmdCount = cmdCount;
    sessionStorage.upCount = upCount;
    container_.insertAdjacentHTML('beforeEnd', ['<output></output>',
        '<div id="input-line" class="input-line">',
        '<div class="prompt">$&gt;</div><div><input class="cmdline" autofocus /></div>',
        '</div>'
    ].join(''));
    var cmdLine_ = container_.querySelector('#input-line .cmdline');
    var output_ = container_.querySelector('output');
    // var interlace_ = document.querySelector('.interlace');
    var load = new Load();

    // aouthor shimada
    // keydown event
    cmdLine_.addEventListener("keydown", newCommand, false);
    console.log(dir);
    // aouthor shimada
    // runnninng command
    function newCommand(e) {
        runCommand(e, this, output_, cmdLine_, CMDS_, dir, path);
    }


    // aouthor shimada
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        //output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }

    // aouthor shimada
    return {
        initFS: function(persistent, size) {
            //output('<div>Welcome to ' + document.title + '</div>');
            output("<div>_..　　　　　　　　　 　 　 　 ,,.-'ヽ</div>");
            output('<div>ヽ "ﾞｰ-､、　　 　　　　 　／ :　:! </div>');
            output("<div>　i ､ :.　ヽヽ_,,.....､,,,....._;/ ,;' 　 ;,.! </div>");
            output('<div>　 i.,　 ..;;;ヽ　　　　　　 ヾ ,,;_ , / </div>');
            output("<div>　　ヾ_:::,:'　　 　　　　　 　 -,ノ </div>");
            output('<div>　　ヾ;. 　　,　 　 　　 　　,　､;,</div>');
            output('<div>　　　 ;; 　　 ●　,　...　､,● ;:　 < Welcome to ' + document.title + ' !!!</div>');
            output("<div>　　　 `;. 　 　　　　●)　　 ,; ' </div>");
            output("<div>　　 　,;' 　　　 '.､ -‐-ノ ,;'､ </div>");
            output("<div>　　　;'　　　 　　　　　　　 ;: </div>");
            output("<div>　 　 ;:　　　 　　　　　　　　';; </div>");
            output((new Date()).toLocaleString());
            output('<div>Documentation: type "help"</div>');
            output('<div>Swich user to “su”</div>');
            output('<div>Make user account to “mu”</div>');
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

                cwd_.getDirectory('testquotaforfsfolder', {
                    create: true
                }, function(dirEntry) {
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
        getCmdLine: function() {
            return cmdLine_;
        },
        addDroppedFiles: function(files) {
            util.toArray(files).forEach(function(file, i) {
                cwd_.getFile(file.name, {
                    create: true,
                    exclusive: true
                }, errorHandler_);
            });
        },
    };
};
