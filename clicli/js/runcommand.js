// aouthor shimada
function runCommand(e, node, output_, interlace_,cmdLine_) {
    var cmd = '';
    if (e.keyCode == 13) {
        output_.appendChild(puressEnterKey(node));

        if (node.value && node.value.trim()) {
            var args = node.value.split(' ').filter(function(val, i) {
                return val;
            });
            cmd = args[0].toLowerCase();
            args = args.splice(1);
        }

        switch (cmd) {
            case 'clear':
                clear(node, output_);
                return;
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
