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
function man(args_first,CMDS_){
  var describe = '';
  switch (args_first) {
    case 'clear':
      describe = 'clear - clear the terminal screen';
      return describe;
    default:
      if(args_first === undefined){
      describe = CMDS_.join('  ');
      return describe;
    }else{
      describe = 'What manual page do you want?';
      return describe;
    }
  }
}
