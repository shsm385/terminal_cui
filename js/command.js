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
        case 'less':
            return 'less - display store information';
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
        default:
            if (args_first === undefined) {
                return CMDS_.join('  ');
            } else {
                return 'What manual page do you want?';
            }
    }
}
