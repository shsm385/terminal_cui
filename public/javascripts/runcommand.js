// aouthor shimada
function runCommand(e, node, output_, cmdLine_, CMDS_) {
    var cmd = '';
    var args_first = '';
    var before = sessionStorage.beforeCmd.split(",");
    var cmdCnt = sessionStorage.cmdCount;
    var upCnt = sessionStorage.upCount;
    if (e.keyCode == 13) {
        cmdCnt++;
        sessionStorage.upCount = 0;
        before.push(cmdLine_.value);

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

        switch (cmd) {
            case 'man':
                var temp = man(args_first, CMDS_);
                output(temp);
                break;
            case 'clear':
                if (args_first === undefined) {
                    clear(node, output_);
                    return;
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
            default:
                if (cmd) {
                    output('CLICLI: ' + cmd + ': command not found');
                }
                break;
        }
        node.value = '';
        sessionStorage.beforeCmd = before;;
        sessionStorage.cmdCount = cmdCnt;
    }
    // author ito
    // get history when push up key
    if(e.keyCode == 38 && upCnt < cmdCnt){ 
        cmdLine_.value = before[cmdCnt - upCnt];
        upCnt++;
        sessionStorage.upCount = upCnt;
    }
    if(e.keyCode == 40 && upCnt >= 0){
        upCnt--;
        if(upCnt >= 0){
            cmdLine_.value = before[cmdCnt - upCnt];
        }else{
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
