// aouthor shimada
function runCommand(e, node, output_, interlace_, cmdLine_,CMDS_) {
    var cmd = '';
    var args_first = '';
    if (e.keyCode == 13) {
        output_.appendChild(puressEnterKey(node));

        if (node.value && node.value.trim()) {
            args = node.value.split(' ').filter(function(val, i) {
                return val;
            });
            cmd = args[0].toLowerCase();
            args_first = args[1];
            args = args.splice(1);
        }

        switch (cmd) {
            case 'man':
                var temp = man(args_first,CMDS_);
                output(temp);
                break;
            case 'clear':
                if(args_first === undefined){
                clear(node, output_);
                return;
              }else{
                output('option not found');
              }
              break;
            default:
                if (cmd) {
                    output('CLICLI: ' + cmd + ': command not found');
                }
        }

        node.value = '';
    }

    // aouthor shimada
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        //output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }
}
