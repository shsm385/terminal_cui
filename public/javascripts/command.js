//aouthor shimada
function pressEnterKey(node) {
    var line = node.parentNode.parentNode.cloneNode(true);
    line.removeAttribute('id');
    line.classList.add('line');
    var input = line.querySelector('input.cmdline');
    input.autofocus = false;
    input.readOnly = true;

    return line;
}

// aouthor shimada
function clear(input, output_, interlace_) {
    output_.innerHTML = '';
    input.value = '';
    document.documentElement.style.height = '100%';
}

// aouthor shimada
function man(args_first, CMDS_) {
    switch (args_first) {
        case 'ls':
            return 'ls - list directory and store';
        case 'cd':
            return 'cd - change directory';
        case 'mv':
            return 'mv - mv -- move files';
        case 'rm':
            return 'rm - delete favorite';
        case 'cp':
            return 'cp - registration favorite';
        case 'clear':
            return 'clear - clear the terminal screen';
        case 'man':
            return 'man - format and display the on-line manual pages';
        case 'cat':
            return 'cat - display store information';
        case 'pwd':
            return 'pwd - return working directory name';
        case 'open':
            return 'open storename - open the shop information site';
        case 'exit':
            return 'exit - logout';
        case 'su':
            return 'su - switching and sign in user';
        case 'mu':
            return 'mu - sign up user account';
        case 'sl':
            return 'sl - runninng SL';
        default:
            if (args_first === undefined) {
                return CMDS_.join('  ');
            } else {
                return 'What manual page do you want?';
            }
    }
}

// author ito
// function runninng sl
function sl(output_, cmdLine_) {
    var inputLine_ = document.querySelector('#input-line');
    inputLine_.style.display = "none";
    output('<video id="sl" autoplay width="100%" height="100%"　poster="./public/figures/zakimot.jpg"><source src="./public/models/movies/sl.mp4" type="video/mp4" /></video>');
    var video = document.getElementById('sl');
    video.addEventListener('ended', function() {
        var node_sl = document.getElementById('sl');
        node_sl.parentNode.removeChild(node_sl);
        inputLine_.style.display = "";
        document.querySelector('#input-line .cmdline').focus();
    }, false);

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }
}

//author ito
// function of making user
function mu(args_first, output_) {
    var cmdLine_ = document.querySelector('#input-line');
    cmdLine_.style.display = "none";
    var uname = '<div id="uname"><div class="input-uname" style="display: inline;">user name:<div style="display: inline;"><input class="cmdline" style="display: inline;" /></div></div></div>';
    //var pass = '<div id="pass">pass:</div>';
    output_.insertAdjacentHTML("beforeEnd", uname);
    var uname_ = output_.querySelector('#uname');
    uname_.addEventListener("keydown", dosome, false);
    var inputName_ = uname_.querySelector('.cmdline');
    inputName_.focus();

    function dosome(e) {
        if (e.keyCode == 13) {
            var name = getValue(inputName_);
            if (name != "false") {
                var pass = '<div id="pass"><div class="input-uname" style="display: inline;">pass:<div style="display: inline;"><input class="cmdline" style="display: inline;" type="password" /></div></div></div>';
                output_.insertAdjacentHTML('beforeEnd', pass);
                inputName_.readOnly = true;
                inputName_.autofocus = false;
                //inputName_.diable = true;
                var pass_ = document.querySelector('#pass');
                pass_.addEventListener("keydown", dopass, false);
                var inputPass_ = pass_.querySelector('.cmdline');
                inputPass_.focus();
                uname_.removeAttribute('id');
                uname_.classList.add('line');
                //cmdLine_.style.display = "";
                //document.querySelector('#input-line .cmdline').focus();
                function dopass(e) {
                    if (e.keyCode == 13) {
                        var pwd = getValue(inputPass_);
                        if (pwd != "false") {
                            //output_.insertAdjacentHTML('beforeEnd', '<div>user name:'+name+', pass:'+pwd+'</div>');
                            registerUser(name, pwd);
                            inputPass_.readOnly = true;
                            inputPass_.autofocus = false;
                            cmdLine_.style.display = "";
                            pass_.removeAttribute('id');
                            pass_.classList.add('line');
                            document.querySelector('#input-line .cmdline').focus();
                        } else {
                            inputPass_.readOnly = true;
                            inputPass_.autofocus = false;
                            pass_.removeAttribute('id');
                            pass_.classList.add('line');
                            cmdLine_.style.display = "";
                            document.querySelector('#input-line .cmdline').focus();
                        }
                    }
                }
            } else {
                inputName_.readOnly = true;
                inputName_.autofocus = false;
                uname_.removeAttribute('id');
                uname_.classList.add('line');
                cmdLine_.style.display = "";
                document.querySelector('#input-line .cmdline').focus();
            }
        }
    }

    function getValue(node) {
        //if (node.value && node.value.trim()) {
        var args = node.value;
        //console.log(args);
        if (args.match(/\W/) || args.match(/\s/) || args.match(/\0/) || args == "" || args.length < 4) {
            output_.insertAdjacentHTML('beforeEnd', 'illegal input');
            return "false";
        } else {
            return args;
        }
        //}
    }

    function registerUser(uname, pass) {
        var requestURL = "http://ec2-52-192-48-132.ap-northeast-1.compute.amazonaws.com:3000/api/users";
        var flag = -1;
        $.get(requestURL,
            function(data) {
                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userName == uname) {
                        flag = 1;
                        output_.insertAdjacentHTML('beforeEnd', '<div>user name:' + uname + ' is already exist</div>');
                        break;
                    } else {
                        flag = 0;
                    }
                }
                if (flag == 0) {
                    $.post(requestURL, {
                        userName: uname,
                        pass: pass
                    });
                }
            },
            "json"
        );
    }
}


//author sakakibara
// function of su
function su(args_first, output_) {
    var userName = args_first;
    var cmdLine_ = document.querySelector('#input-line');
    cmdLine_.style.display = "none";
    var pass = '<div id="pass"><div class="input-uname" style="display: inline;">pass:<div style="display: inline;"><input class="cmdline" style="display: inline;" type="password"/></div></div></div>';
    //var pass = '<div id="pass">pass:</div>';
    output_.insertAdjacentHTML("beforeEnd", pass);
    var pass_ = output_.querySelector('#pass');
    pass_.addEventListener("keydown", dopass, false);
    var inputPass_ = pass_.querySelector('.cmdline');
    inputPass_.focus();

    function dopass(e) {
        if (e.keyCode == 13) {
            var pwd = inputPass_.value;
            switchUser(userName, pwd);
            inputPass_.readOnly = true;
            inputPass_.autofocus = false;
            cmdLine_.style.display = "";
            pass_.removeAttribute('id');
            pass_.classList.add('line');
            document.querySelector('#input-line .cmdline').focus();
        }
    }

    function switchUser(userName, pass) {
        var requestURL = "http://ec2-52-192-48-132.ap-northeast-1.compute.amazonaws.com:3000/api/users";
        var flag = -1;
        $.get(requestURL,
            function(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userName == userName) {
                        if (data[i].pass == pass) {
                            console.log("exist and correct pass!");
                            flag = 1;
                            break;
                        }
                    }
                }
                if (flag == -1) {
                    output_.insertAdjacentHTML('beforeEnd', '<div>su: Authentication failure</div>');
                } else if (flag == 1) {
                    output_.insertAdjacentHTML('beforeEnd', '<div>switched to ' + userName + '</div>');
                    sessionStorage.setItem("currentUserName", userName);
                    $('.prompt:last').html(sessionStorage.getItem("currentUserName") + '@:$');
                    console.log("set to " + sessionStorage.getItem("currentUserName"));
                }
            },
            "json"
        );

    }
}
// author ito
// show history function
function history(output_) {
    var comands = sessionStorage.beforeCmd.split(",");
    for (var i = 0; i < comands.length; i++) {
        output_.insertAdjacentHTML('beforeEnd', '<div>' + comands[i] + '</div>');
    }
}

// author ito
// show callender
function cal(output_) {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var dateNum = 31;
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        dateNum = 30;
    } else if (month == 2) {
        dateNum = 28;
    } else if (month == 2 && year % 4 == 0) {
        dateNum = 29;
    }
    myDate.setDate(1);
    var week = myDate.getDay();
    var outputStr = '<div style="margin-left:3em">' + year + '年</div><div style="margin-left:3.5em">' + month + '月</div><div style="margin-left:' + (week + 1.25) + 'em">';
    //for (var k = 0; k < week; k++){
    //  outputStr += "--- ";
    //}
    for (var i = 0; i < dateNum + week; i++) {
        if (i % 7 == 0 && i != 0) outputStr += '<div>';
        if (i - week >= 0 && i - week < 9) outputStr += "0";
        if (i - week > -1) outputStr += (i + 1 - week) + " ";
        if (i % 7 == 6) outputStr += '</div>';
    }
    console.log(outputStr);
    output_.insertAdjacentHTML('beforeEnd', outputStr);
}

//author sakakibara
// function of exit
function exit(output_) {
    var outputStr;
    if (sessionStorage.getItem("currentUserName") == "guest") {
        outputStr = '<div>you are guest account</div>';
        output_.insertAdjacentHTML('beforeEnd', outputStr);
        //ブラウザによって挙動が異なる
        //window.open('about:blank','_self').close();
    } else {
        outputStr = '<div>exit ' + sessionStorage.getItem("currentUserName") + '</div>';
        sessionStorage.setItem("currentUserName", "guest");
        output_.insertAdjacentHTML('beforeEnd', outputStr);
        $('.prompt:last').html(sessionStorage.getItem("currentUserName") + '$&gt;');
    }
}

//aouthor shimada
function ls(output_, cmdLine_, path) {
    if (!path.hasOwnProperty('shops')) {
        let iterable = Object.values(Object.values(path));
        var entries = [];
        for (let value of iterable) {
            if (value.hasOwnProperty('name')) {
                entries.push(value.name);
            }
        }
        display(entries);
    } else {
        let iterable = Object.values(path);
        var entries = [];
        var result;
        for (let value of iterable) {
            entries.push(value);
            result = entries.shift();
        }
        display(result);
    }

    function display(result) {
        var html = format(result);
        html.push('</div>');
        let i = result;
        for (let value of i) {
            html.push('<span>', value, '</span>', '<span class = "space"', '>', '</span><br>');
        }
        output(html.join(''));
    }

    function format(entries) {
        var max = 0;
        let iterable = entries;
        for (let value of iterable) {
            if (value.length > max) {
                max = value.length;
            }
        }
        var colWidth = max * 8;
        var height = 'height 20px';
        return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'
        ];
    }

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }
}
