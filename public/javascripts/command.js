//aouthor shimada
function puressEnterKey(node) {
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

//author ito
// function of making user
function mu(args_first, output_){
    var cmdLine_ = document.querySelector('#input-line');
    cmdLine_.style.display="none";
    var uname = '<div id="uname"><div class="input-uname" style="display: inline;">user name:<div style="display: inline;"><input class="cmdline" style="display: inline" /></div></div></div>';
    var pass = '<div id="pass">pass:</div>';
    output_.insertAdjacentHTL("beforeEnd", uname);
    var uname_ = output_.querySelector('#uname');
    uname_.addEventListener("keydown", dosome, false);
    document.querySelector('#uname .cmdline').focus();
    function dosome(e){
	if(e.keyCode == 13){
	    document.querySelector('#uname .input-uname').insertAdjacentHTML('beforeEnd', '<div>hogehoge</div>');
	    var pass = '<div id="pass">pass:</div>';
	    document.querySelector('output').insertAdjacentHTML('beforeEnd', pass);
	    var inputName_ = document.querySelector('#uname .cmdline');
	    inputName_.readOnly = true;
	    inputName_.autofocus = false;
	    document.querySelector('#uname').removeAttribute('id');
	    cmdLine_.style.display="";
	    document.querySelector('#input-line .cmdline').focus();
	    return;
        }
    }
}

