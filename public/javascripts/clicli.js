// author shimada
function Load() {
    this.load = function(url, mixToMono, opt_callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();
    };
}
// author shimada, tominaga
var Terminal = Terminal || function(containerId) {
    window.URL = window.URL || window.webkitURL;
    window.requestFileSystem = window.requestFileSystem ||
        window.webkitRequestFileSystem;

    const CMDS_ = [
        'ls', 'cd', 'clear', 'man', 'cat', 'pwd', 'open', 'exit', 'su', 'mu', 'help', 'history', 'cal', 'sudo'
    ];
    var fs_ = null;
    var cwd_ = null;
    var container_ = document.getElementById(containerId);
    var currentUserName = "guest";
    var currentUserPostNumber = "";
    var currentUserHomeDirectory = "/";
    var dir = createPath(csv2Array("./public/models/csv/osaka.csv"));
    var path = {position:dir.root, string:"/"};
    sessionStorage.setItem("currentUserName", currentUserName);
    sessionStorage.setItem("currentUserPostNumber", currentUserPostNumber);
    console.log(dir);
    var beforeCmd = [""];
    var cmdCount = 0;
    var upCount = 0;
    sessionStorage.beforeCmd = beforeCmd;
    sessionStorage.cmdCount = cmdCount;
    sessionStorage.upCount = upCount;
    container_.insertAdjacentHTML('beforeEnd', ['<div align="right"><a href="http://webservice.recruit.co.jp/" target="blank"><img src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif" alt="ホットペッパー Webサービス" width="135" height="17" border="0" title="ホットペッパー Webサービス"></a></div><output></output>',
        '<div id="input-line" class="input-line">',
        '<div class="prompt">'+sessionStorage.getItem("currentUserName")+'@CLICLI '+'<font color="white">'+path.string+'</font>'+' $</div><div><input class="cmdline" autofocus /></div>',
        '</div>'
    ].join(''));
    var cmdLine_ = container_.querySelector('#input-line .cmdline');
    var output_ = container_.querySelector('output');
    // var interlace_ = document.querySelector('.interlace');
    var load = new Load();

    // aouthor shimada
    // keydown event
    cmdLine_.addEventListener("keydown", newCommand, false);

    // author tominaga
    // click event
    document.addEventListener("click", setFocus, false);

    // author tominaga
    // set focus to a input form
    function setFocus() {
    	cmdLine_.focus();
    }

    // author shimada
    // runnninng command
    function newCommand(e) {
        runCommand(e, this, output_, cmdLine_, CMDS_, dir, path);
    }


    // author shimada
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        //output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }

    // author shimada
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
            output('<div>Switch user to “su”</div>');
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
