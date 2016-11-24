// aouthor shimada
function runCommand(e, node, output_, cmdLine_, CMDS_, dir, path) {
    var cmd = '';
    var args_first = '';
    var before = sessionStorage.beforeCmd.split(",");
    var cmdCnt = sessionStorage.cmdCount;
    var upCnt = sessionStorage.upCount;
    if (e.keyCode == 13) {
        sessionStorage.upCount = 0;
        if(cmdLine_.value !== ""){
            before.push(cmdLine_.value);
            cmdCnt++;
        }
        if (node.value && node.value.trim()) {
            args = node.value.split(' ').filter(function(val, i) {
                return val;
            });
            cmd = args[0].toLowerCase();
            args_first = args[1];
            argslen = args.length;
            args = args.splice(1);
        }

        output_.appendChild(pressEnterKey(node));
        //console.log(before);
        switch (cmd) {
            case 'man':
                var temp = man(args_first, CMDS_);
                output(temp);
                break;
            case 'clear':
                if (args_first === undefined) {
                    clear(node, output_);
                    //return;
                } else {
                    output('illegal input');
                }
                break;
            case 'sl':
                if (args_first === undefined) {
                    sl(output_,cmdLine_);
                } else {
                    output('illegal input');
                }
                break;
            case 'mu':
                if (argslen == 1) {
                    mu(args_first, output_, cmdLine_);
                } else {
                    output('illegal input');
                }
                var uname = document.querySelector('#uname');
                break;
            case 'su':
                if (argslen == 1) {
                    output('ilegal input');
                }
                else if (argslen == 2) {
                    su(args_first, output_, cmdLine_);
                } else {
                    output('ilegal input');
                }
                var uname = document.querySelector('#uname');
                break;
            case 'history':
                if (argslen == 1) {
                    history(output_);
                }else{
                    output('illegal input');
                }
                break;
            case 'cal':
                cal(output_);
                break;
            case 'exit':
                if (argslen == 1) {
                    exit(output_);
                } else {
                    output('illegal input');
                }
                break;
            case 'pwd':
                output(path.string);
                break;
            case 'sudo':
                output('permission denied.');
                break;
            case 'cat':
                if(argslen == 1){
                  output(cmd+':select source as first argument');
                }else if (argslen == 2) {
                  cat(output_, args_first);
                }else{
                  output(cmd+':illegal input');
                }
                break;
            case 'ls':
                if (argslen == 1) {
                    ls(output_, cmdLine_, path.position);
                } else {
                    output('illegal input');
                }
                break;
            case 'cd':
            	cd(path, args_first, dir, output_);
            	break;
            default:
                if (cmd) {
                    output('CLICLI: ' + cmd + ': command not found');
                }
                break;
        }
        node.value = '';
        sessionStorage.beforeCmd = before;
        sessionStorage.cmdCount = cmdCnt;
    }
    // author ito
    // get history when push up key
    if (e.keyCode == 38 && upCnt < cmdCnt) {
        //console.log(upCnt);
        //console.log(cmdCnt);
        if (upCnt < 0) upCnt++;
        cmdLine_.value = before[cmdCnt - upCnt];
        upCnt++;
        sessionStorage.upCount = upCnt;
    }
    if (e.keyCode == 40 && upCnt >= 0) {
        //console.log(upCnt);
        //console.log(cmdCnt);
        upCnt--;
        if (upCnt >= 0) {
            cmdLine_.value = before[cmdCnt - upCnt];
        } else {
            cmdLine_.value = "";
        }
        sessionStorage.upCount = upCnt;
    }
    // aouthor shimada
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }
}
