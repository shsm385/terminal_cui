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
                    output('option not found');
                }
                break;
            case 'sl':
                document.getElementById("style1").href = 'public/stylesheets/index_black.css';
                output('<video id="sl" autoplay width="100%" height="100%"　poster="./public/figures/zakimot.jpg"><source src="./public/models/movies/sl.mp4" type="video/mp4" /></video>');
                var video = document.getElementById('sl');
                video.addEventListener('ended', function() {
                    var node_sl = document.getElementById('sl');
                    node_sl.parentNode.removeChild(node_sl);
                    document.getElementById("style1").href = 'public/stylesheets/index.css';
                }, false);
                break;
            default:
                if (cmd) {
                    output('CLICLI: ' + cmd + ': command not found');
                }
                break;

                if (flag === false) {
                    console.log("bbb");
                    document.getElementById("style1").href = 'public/stylesheets/index.css';
                    flag = true;
                }

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
