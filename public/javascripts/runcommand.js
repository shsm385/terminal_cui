// aouthor shimada
function runCommand(e, node, output_, cmdLine_, CMDS_) {
    var cmd = '';
    var args_first = '';

    if (e.keyCode == 13) {

        if (node.value && node.value.trim()) {
            args = node.value.split(' ').filter(function(val, i) {
                return val;
            });
            cmd = args[0].toLowerCase();
            args_first = args[1];
            argslen = args.length;
            args = args.splice(1);
        }

        output_.appendChild(puressEnterKey(node));

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
                    output('ilegal input');
                }
                break;
            case 'sl':
                if (args_first === undefined) {
                    sl(output_,cmdLine_);
                } else {
                    output('ilegal input');
                }
                break;
            case 'mu':
                if (argslen == 1) {
                    mu(args_first, output_, cmdLine_);
                } else {
                    output('ilegal input');
                }
                var uname = document.querySelector('#uname');
                break;
            case 'su':
                console.log('su test');
                break;
            default:
                if (cmd) {
                    output('CLICLI: ' + cmd + ': command not found');
                }
                break;
        }
        node.value = '';
    }

    // aouthor shimada
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }
}
