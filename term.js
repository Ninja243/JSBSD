var lines = 0;
var echoOn = 1;
var caps = 0;
var flashstate = 0;
var debugMode = 0;
var debugInfo = '';
var letterCount = 0;
var cmd = '';
var folders = ['Documents', 'Downloads', 'Desktop', 'Music'];
var cmdknown = 0;
var path = '/root';
var version = "JSBSD version 0.5.3";
var pcmd = '';
var ismobile = 0;
//var OS = '';
var PlanC;
var inEditor = 0;
var pageTitle = "Terminal";

// This hack fixes the dark font on a dark page when viewing the install page
if (window.location.href == "https://mweya.duckdns.org/styles/extra/install.js") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}


function main() {
    grabPlanC();
    document.title= pageTitle;
    cleanUp();
    motd();
    mobile();
    addLine();
    // Desktop
    if (ismobile === 0) {
        //alert('Desktops not supported in this version!');
        document.body.onkeydown = console;

    }
    // Phones
    if (ismobile == 1) {
        document.addEventListener('keyup', function(keyPressed) {
            if (keyPressed.key == 'Enter' || keyPressed.key == 'Return') {
                cmd = document.getElementById('L'+lines).innerHTML.substr(29);
                runCMD(cmd);
                addLine();
            } else {
               // alert(keyPressed.key);
            document.getElementById('L'+lines).innerHTML = '<b><red>root</red>@BSD~$ </b>'+document.getElementById('ibox').value;
                }
            }, false);

            }
}

function grabPlanC() {
    PlanC = document.getElementById("planc");
}


function console(input) {
    /* Logic for typing into the console goes here */
    input  = traceKeyboard(input);
    if (document.getElementById('L1').innerHTML.startsWith('GNU nano')) {

        if (input == "Escape" || input == "Esc") {
            document.title = pageTitle;
            isEditor = 0;
          while (document.getElementById('body').hasChildNodes()){
            document.getElementById('body').removeChild(document.getElementById('body').lastChild);
            }
            echoOn = 1;
            lines = 0;
            letterCount = 0;
            addLine();
        } else {
            if (input == "Enter" || input == "Return") {
            addLine();
            letterCount = 0;
        } else {
            if (input == "Tab" || input == " Tab") {
                document.getElementById('L'+lines).innerHTML = document.getElementById('L'+lines).innerHTML+'   ';
            } else {
            if (input == "Backspace") {
            document.getElementById('L'+lines).innerHTML = document.getElementById('L'+lines).innerHTML.slice(0, -1);
       input = '';
        } else {
            
            document.getElementById('L'+lines).innerHTML = document.getElementById('L'+lines).innerHTML+input;
            letterCount = letterCount +1;}

        }
    }
}
} else {

    if (input == "ArrowUp" || input == "UpArrow" || input == "PageUp" || input == "Up") {
        input = '';
        if (pcmd !== '') {
        document.getElementById('L'+lines).innerHTML = '<b><red>root</red>@BSD~$ </b>'+pcmd;
            } else {
            bell();
        }

    }
    

    if (input == "ArrowDown" || input == "DownArrow"|| input == "PageDown" || input == "Down") {
        document.getElementById('L'+lines).innerHTML = '<b><red>root</red>@BSD~$ </b>';
        input = '';
        //bell(); // FIX PLZ
    }
    


    if (input == "Backspace") {
        document.getElementById('L'+lines).innerHTML = document.getElementById('L'+lines).innerHTML.slice(0, -1);
       input = '';
    }
    if (input == "Enter" || input == "Return") {
        /* add routine to process this line */
        cmd = document.getElementById('L'+lines).innerHTML.substr(29);
        runCMD(cmd);
       addLine();
       letterCount = 0;

    } else {
        if (input == 'Key undefined') {
            bell();
        } else {
            document.getElementById('L'+lines).innerHTML = document.getElementById('L'+lines).innerHTML+input;
            letterCount = letterCount +1;

        }
    }
}
}

function traceKeyboard(thekey) {
    /* if keydown = 13, submit, else, add to div string thing */
    var keyCode = thekey.key;
    thekey.preventDefault();
    /*alert(keyCode);*/
    if (debugMode === 1 ) {
        debugInfo = debugInfo+'\nKey Pressed: '+keyCode;
    }
    if (keyCode === undefined || keyCode == "Undefined" || keyCode == "Unidentified") { /*|| keyCode === 0) {*/
        return 'Key undefined';
    } else {
        /*The following keys are not wanted*/
        if (keyCode == 'Left' ||keyCode == 'Right' ||keyCode == 'ArrowRight' ||keyCode == 'ArrowLeft' ||keyCode.startsWith('Win')||keyCode.startsWith('Media')||keyCode.startsWith('LaunchApplication')||keyCode == 'Delete'||keyCode == 'Insert'||keyCode == 'End'||keyCode == 'Home'||keyCode == 'F12'||keyCode == 'F11'||keyCode == 'F10'||keyCode == 'F9'||keyCode == 'F8'||keyCode == 'F7'||keyCode == 'F6'||keyCode == 'F5'||keyCode == 'F4'||keyCode == 'F3'||keyCode == 'F2'||keyCode == 'F1'||keyCode == 'Alt' || keyCode == 'Ctrl' || keyCode == 'OS' || keyCode == 'Shift' || keyCode == 'Control' || keyCode == 'AudioVolumeUp' || keyCode == 'AudioVolumeDown') {
            return '';
        } else {
            if (inEditor === 0) {if (keyCode == "Escape" || keyCode == "Esc" || keyCode == 'esc') {
        keyCode = '';}
    }
            if (keyCode == 'CapsLock') {
                if (caps === 0) {
                    caps = 1;
                    return '';
                } else {
                    caps = 0;
                    return '';
                }

            }
            
            if (inEditor == 1) {
                if (keyCode == "Tab") {
                    return '   ';
                }
            } else {
                if (keyCode == "Tab" || keyCode == " Tab") {
                    //RIP TAB KEY
                    return '';
                }
            }
            return keyCode;
        }

    }
}




// Bug free stuff here

function cleanUp() {
    var noscript = document.getElementById("planc");
    if (noscript === null) {
       debugInfo = debugInfo + "\nNoScript div already removed!";
    } else {
    noscript.parentNode.removeChild(noscript);
    }
}

function motd() {
   echoOn = 0;
   addLine();
   document.getElementById('L'+lines).innerHTML = "[ * ] Starting "+version+'...';
   addLine();
   document.getElementById('L'+lines).innerHTML = "[ * ] Logging in as <red>root</red>...";
   addLine();
   document.getElementById('L'+lines).innerHTML = "User <red>root</red> logged in at: "+ new Date();
   addLine();
   document.getElementById('L'+lines).innerHTML = "Welcome to JSBSD!";
   echoOn = 1;

}

function keyboardUp() {
    document.getElementById('ibox').click();
    document.getElementById('ibox').focus();
    document.getElementById('L'+lines).scrollIntoView();
}

function bell() {
    esound = new Audio('styles/extra/click.mp3');
    esound.playbackRate = 4;
    esound.play();
    setTimeout(flash, 500);
    setTimeout(flash, 200);
}

function flash() {
    /* Entire screen turns slightly white and then back to normal when an
     * undefined character is recieved or when a terminal bell event happens
     */
    if (flashstate === 0) {
        document.body.style.backgroundColor='#222222';
        if (ismobile == 1) {
            document.getElementById('ibox').style.backgroundColor='#222222';
            document.getElementById('ibox').style.Color='#222222';
        }
        flashstate = 1;
    } else {
        document.body.style.backgroundColor='#000000';
        if (ismobile === 1) {
            document.getElementById('ibox').style.backgroundColor='#000000';
            document.getElementById('ibox').style.Color='#000000';
        }
        flashstate = 0;
    }

}

function addLine() {
    //alert(ismobile);
   if (ismobile == 1) {
    // Remove all input boxes first
    // Edit: Try to. That way it doesn't break on page load.
    try {document.getElementById('body').removeChild(document.getElementById('ibox'));}
    catch(err) {}
    var line = document.createElement('div');
    line.className = 'container-fluid text-left line';
    if (echoOn == 1) {
    line.innerHTML = '<b><red>root</red>@BSD~$ </b>';/*<input type="text" />*/
    }
    lines = lines +1;
    line.id = 'L'+lines;
    document.body.appendChild(line);
    var ibox = document.createElement('input');
    ibox.className = 'hidden';
    ibox.id = 'ibox';
    ibox.type = 'text';
    ibox.autocorrect = 'off';
    ibox.autocomplete = 'off';
    ibox.autocapitalize = 'off';
    ibox.spellcheck = 'false';
    //ibox.onInput = traceKeyboard();
    document.body.appendChild(ibox);
    document.getElementById('L'+lines).scrollIntoView();
    keyboardUp();
   }
   if (ismobile === 0) {
    var line = document.createElement('div');
    line.className = 'container-fluid text-left line';
    if (echoOn == 1) {
    line.innerHTML = '<b><red>root</red>@BSD~$ </b>';/*<input type="text" />*/
    }
    lines = lines +1;
    line.id = 'L'+lines;
    document.body.appendChild(line);
    document.getElementById('L'+lines).scrollIntoView();
   }
}

function mobile() {
    //alert(navigator.userAgent);
    if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)|| navigator.userAgent.match(/Windows Phone/i) ){
    ismobile = 1;
    document.addEventListener('click', function() {keyboardUp();}, false);
    //alert('m');
    return true;
  }
 else {
    ismobile = 0;
    //alert('d');
    return false;
  }
}

function runCMD(cmd) {

    if (cmd === "") {
        cmdknown = 1;
    }
    
    if (cmd == "about") {
        echoOn = 0;
        addLine();
        document.getElementById("L"+lines).innerHTML = "<img src='/styles/extra/me.png' style='max-width: 300px; max-height: 300px'/>";
        echoOn = 1;
        cmdknown = 1;
    }
    

    if (cmd.startsWith("echo")) {
        echoOn = 0;
        addLine();
        document.getElementById("L"+lines).innerHTML = cmd.substr(5);
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == "uname"){
        echoOn = 0;
        addLine();
        document.getElementById("L"+lines).innerHTML = "JSBSD";
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd.startsWith("uname ")) {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = version+" on a 64bit kernel.";
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == 'clear') {
        while (document.getElementById('body').hasChildNodes()){
            document.getElementById('body').removeChild(document.getElementById('body').lastChild);
        }
        lines = 0;
        letterCount = 0;
        cmdknown = 1;
    }

    if (cmd == 'su') {
        echoOn = 0;
        addLine();
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = 'You are already <red>root</red>!';
        bell();
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd.startsWith('su ')) {
        echoOn = 0;
        addLine();
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = 'User <i>'+cmd.substr(3)+'</i> does not exist!';
        bell();
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == 'pwd') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = path;
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == 'ls') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = folders;
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd.startsWith('date')) {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = new Date();
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == 'freebsd-version' || cmd == 'bsd-version' || cmd == 'version') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = version;
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == 'whoami') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = "root";
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == 'ping') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = "usage: ping [-AaDdfnoQqRrv] [-c count] [-G sweepmaxsize] [-g sweepminsize]";
        addLine();
        document.getElementById('L'+lines).innerHTML = "            [-h sweepincrsize] [-i wait] [-l preload] [-M mask | time] [-m ttl]";
        addLine();
        document.getElementById('L'+lines).innerHTML = "            [-P policy] [-p pattern] [-S src_addr] [-s packetsize] [-t timeout]";
        addLine();
        document.getElementById('L'+lines).innerHTML = "            [-W waittime] [-z tos] host";
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd.startsWith('shutdown') || cmd == 'reboot') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = "Broadcast message from root:";
        addLine();
        document.getElementById('L'+lines).innerHTML = "<i>System going down now!</i>";
        addLine();
        document.getElementById('L'+lines).innerHTML = new Date();
        addLine();
        setTimeout(window.location.assign(window.location.href), 90000000);
        cmdknown = 1;
    }

    if (cmd.startsWith('ping ')) {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = "Attempting to ping "+cmd.substr(5)+'...';
        addLine();
        document.getElementById('L'+lines).innerHTML = "No connection!";        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd == 'install') {
       echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML =  "Copy and paste this script onto your website to install JSBSD:";
        //addLine();
        //document.getElementById('L'+lines).innerHTML = "<span style='color: black;'>.</span>";
        addLine();
        document.getElementById('L'+lines).innerHTML = "<a href='https://mweya.duckdns.org/styles/extra/install.js'>install.js</a >";
        echoOn=1;
        cmdknown=1;
    }

    if (cmd == 'pkg') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = "pkg: not enough arguments";
        addLine();
        document.getElementById('L'+lines).innerHTML = "Usage: pkg [-v] [-d] [-l] [-N]  {command} [args]";
        addLine();
        addLine();
        document.getElementById('L'+lines).innerHTML = "For more information on available commands and options see <i>'help'</i>.";
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd.startsWith('pkg ')){
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = 'pkg: Insufficient privileges to write to disk.';
        echoOn =1;
        cmdknown =1;
    }

    if (cmd == 'startx') {
        echoOn = 0;
        while (document.getElementById('body').hasChildNodes()){
            document.getElementById('body').removeChild(document.getElementById('body').lastChild);
        }
        lines = 0;
        letterCount = 0;
        cmdknown = 1;
        startGUI();

    }
    
    if (cmd == "cd") {
        runCMD("pwd");
        cmdknown = 1;
    }
// Bugfix    
    if (cmd.startsWith('cd ')){
        var npath = cmd.substr(3);
        if (npath == "../" || npath == '..') {
            if (path == '/') {
                path = '/';
            } else {
            var sliceSize = path.lastIndexOf("/") - slice.length();
            path = path.slice(0, sliceSize);
            }
        } else {
            if (npath == '.') {
                path = path;
            }
            if (path == '/') {
                path = path+npath;
            } else {
                path = path+'/'+npath;
            }
        }
        // Files visible by ls change here
        
        cmdknown = 1;
    }
    
    if (cmd == 'contact_me' || cmd == 'contact me') {
        echoOn = 0;
        addLine();
        document.getElementById("L"+lines).innerHTML = "<img src='/styles/extra/me.png' style='max-width: 300px; max-height: 300px'/>";
        addLine();
        document.getElementById('L'+lines).innerHTML = "<b>Feel free to contact me at any time, using the details below.</b>";
        addLine();
        document.getElementById('L'+lines).innerHTML = '<pre>Email:&#09;&#09;&#09;<a href="mailto:mweyaruider@gmail.com">mweyaruider@gmail.com</a>'+'\n'+'0x00Sec:&#09;&#09;<a href="https://0x00sec.org/u/ninja243/">Ninja243</a>'+'\n'+'Email:&#09;&#09;&#09;<a href="mailto:mweya@protonmail.com">mweya@protonmail.com</a>'+'\n'+'Phone:&#09;&#09;&#09;<a href="tel:+27762503466">+27 76 250 3466</a>'+'\n'+'Telegram:&#09;&#09;<a href="https://t.me/Mweya">@Mweya</a>'+'\n'+'GitHub:&#09;&#09;&#09;<a href="https://github.com/Ninja243">Ninja243</a>'+'\n'+'LinkedIn:&#09;&#09;<a href="https://za.linkedin.com/in/mweyaruider">mweyaruider</a></pre>';
        echoOn =1;
        cmdknown =1;
    }
    
    if (cmd.startsWith('rm -rf /')) {
        var pageURL = window.location.href;
        echoOn = 0;
        while (document.getElementById('body').hasChildNodes()){
            document.getElementById('body').removeChild(document.getElementById('body').lastChild);
        }
        lines = 0;
        letterCount = 0;
        cmdknown = 1;
        // Noscript tags don't show if JS is enabled
        //document.body.appendChild(PlanC);
        var wrapper = document.createElement('div');
        wrapper.id = 'ripDiv';
        document.body.appendChild(wrapper);
        document.getElementById('ripDiv').innerHTML = "<div class='text-center'><h1><div class='jumbotron glitch' data-text='You broke it :('>You broke it :(</div></h1></div><div class='text-center'><small><i>You're going to need to <a href='"+pageURL+"'>reload</a>.";
        }

    if (cmd == 'nano') {
        document.title = 'GNU nano - 0.01';
        echoOn = 0;
       while (document.getElementById('body').hasChildNodes()){
            document.getElementById('body').removeChild(document.getElementById('body').lastChild);
        }
        lines = 0;
        letterCount = 0;
        inEditor = 1;
        addLine();
        document.getElementById('L'+lines).style.backgroundColor = '#656565';
        document.getElementById('L'+lines).innerHTML = 'GNU nano 0.01';
        addLine();
        cmdknown = 1;

    }

    if (cmd.startsWith('man')) {
        var x = cmd.substr(4);
        // [TODO:] Get to fixing this soon
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = '<i>'+x+'</i> has no man page yet!';
        echoOn = 1;
        cmdknown = 1;
    }
    
    if (cmd.startsWith("users")) {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = 'gdm mweya root';
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmd  == 'debug') {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = 'Screen resolution: '+window.innerWidth+':'+window.innerHeight;
        addLine();
        document.getElementById('L'+lines).innerHTML = navigator.appVersion;
        addLine();
        document.getElementById('L'+lines).innerHTML = navigator.platform+' '+navigator.oscpu;
        addLine();
        document.getElementById('L'+lines).innerHTML = navigator.vendor;        echoOn = 1;
        cmdknown = 1;
    }
    
    if (cmd == "whois mweya" || cmd == "whois Mweya"){
        echoOn = 0;
        addLine();
        document.getElementById("L"+lines).innerHTML = "<b>This guy:</b>";
        addLine();
        document.getElementById("L"+lines).innerHTML = "<img src='/styles/extra/me.png' style='max-width: 300px; max-height: 300px;'/>"; 
        echoOn = 1;
        cmdknown = 1;
    }
    
    if (cmd.startsWith("whois ")) {
        echoOn = 0;
        var searchTerm = cmd.substr(6);
        addLine();
        document.getElementById("L"+lines).innerHTML = 'Generating WHOIS Report for '+searchTerm+'...';
        addLine();
        document.getElementById("L"+lines).innerHTML = 'Feature not operational yet!';
        // Redirect to python script that does the whois 
        echoOn = 1;
        cmdknown = 1;
    }

    if (cmdknown === 0) {
        echoOn = 0;
        addLine();
        document.getElementById('L'+lines).innerHTML = "<i>'"+cmd.split(" ")[0]+"'</i> is not a valid program or file!";
        echoOn = 1;
        bell();
    }
    
    
    pcmd = cmd;
    cmdknown = 0;
}


function getFont(c) {
    var canvasWidth = 0;
    var defautSize = 40;
    var ratio = defautSize / canvasWidth;
    var fSize = c * ratio;
    return (fSize|0) + 'px sans-serif';
}

function startGUI() {
    var gui = document.createElement('canvas');
    var fontSize = getFont(window.innerWidth);
        gui.id = 'gui';
        gui.innerHTML = '<h1><div class="jumbotron glitch" data-text="Sad Scenes :(">  </div></h1><div class="text-center"><small><i>Your browser refuses to use HTML Canvas</i></small></div>';
        gui.height = window.innerHeight;
        gui.width = window.innerWidth;
        document.body.appendChild(gui);
        var s = gui.getContext('2d');
        s.fillStyle = "#002255";
        s.fillRect(0, 0, window.innerWidth, window.innerHeight);

        s = gui.getContext('2d');
        s.fillStyle = "#999999";
        s.textAlign = 'center';
        s.font = fontSize;
        s.fillText("JSBSD", window.innerWidth/2, window.innerHeight/2);
}

/*  FakeFS Branch
 *  Mweya Ruider - 2018
 */