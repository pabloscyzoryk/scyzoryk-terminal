// DOM
const root = document.querySelector(':root');

// Classes
class Terminal {
    constructor() {
        this.console = document.querySelector('.terminal');
        this.inputCommand = document.querySelector('input#command');
        this.commandNames = [
            'about',
            'help'
        ];
        this.commands = [];
        this.commandHistory = [];
        this.prefix = '> ';
    }
    createErrorMessage(message) {
        const outputError = document.createElement('p');
        outputError.classList.add('errorFeedback');
        outputError.innerText = message;
        terminal.console.insertBefore(outputError, terminal.inputCommand);
    }
}

const terminal = new Terminal();
let commandHistoryIndex = terminal.commandHistory.length;

class Command {
    constructor(description, syntax, executeCallback) {
        this.description = description;
        this.syntax = syntax;
        this.executeCallback = executeCallback;
        terminal.commands.push(this);
    }
    execute() {
        this.executeCallback();
    }
    createError() {
        terminal.createErrorMessage(this.errorMessage);
    }
}

terminal.console.addEventListener('submit', e => {
    e.preventDefault();

    let throwError = true;

    terminal.commands.forEach(command => {
        if(eval(command.syntax)) {
            command.execute()
            throwError = false;
        }
    });

    if(throwError) {
        terminal.createErrorMessage(`${terminal.prefix} You have an error in your Scyzoryk Syntax.  Check the manual that corresponds to your Scyzoryk Terminal version for the right syntax to use.`);
    }

    terminal.commandHistory.push(terminal.inputCommand.value.trim());
    commandHistoryIndex = terminal.commandHistory.length;
    terminal.inputCommand.value = '';
});

document.addEventListener("keydown", e => {
    // up arrow
    if(e.key == 'ArrowUp') {
        commandHistoryIndex--;
        if(terminal.commandHistory[commandHistoryIndex] == undefined) {
            commandHistoryIndex = terminal.commandHistory.length;
            return;
        }
        terminal.inputCommand.value = terminal.commandHistory[commandHistoryIndex];
    }
    // down arrow
    else if(e.key == 'ArrowDown') {
        commandHistoryIndex++;  
        if(terminal.commandHistory[commandHistoryIndex] == undefined) {
            commandHistoryIndex = terminal.commandHistory.length;
            return;
        }
        terminal.inputCommand.value = terminal.commandHistory[commandHistoryIndex]; 
    }
});

terminal.inputCommand.addEventListener('keyup', () => {
    let throwError = true;

    terminal.commands.forEach(command => {
        if(eval(command.syntax) || terminal.inputCommand.value == '') {
            terminal.inputCommand.classList.remove('err');
            throwError = false;
        }
    });

    if(throwError) {
        terminal.inputCommand.classList.add('err');
    }
})

const help = new Command(
    `${terminal.prefix}Get list of avaiable commands
     Usage:
     help
    `,
    `terminal.inputCommand.value.trim() == 'help'`,
    () => {
        const helpMessage = document.createElement('p');
        helpMessage.classList.add('correctCommandLine');
        helpMessage.innerText = `
        ${terminal.prefix} Avaiable commands: help, about, echo, more, date, clear, banner, openURL, inputColor, errColor, outputColor, github, email, prefix, rickroll
        If you want to get description of a specific command write more and the command name
        `;
        terminal.console.insertBefore(helpMessage,terminal.inputCommand);
    },
);

const echo = new Command(
    `${terminal.prefix}Write line to console
     Usage: 
     echo <text>
    `,
    `terminal.inputCommand.value.trim().startsWith('echo ')`,
    () => {
        const echoMessage = document.createElement('p');
        echoMessage.classList.add('correctCommandLine');
        echoMessage.innerText = `${terminal.prefix}${terminal.inputCommand.value.substring(4)}`;
        terminal.console.insertBefore(echoMessage,terminal.inputCommand);
    },
);

const more = new Command(
    `${terminal.prefix}Get description of a specific command
     Usage:
     more <command-name>
    `,
    `terminal.inputCommand.value.trim().startsWith('more ')`,
    () => {
        const descriptionMessage = document.createElement('p');
        descriptionMessage.classList.add('correctCommandLine');

        descriptionMessage.innerText = eval(terminal.inputCommand.value.substring(5).trim()).description; 
        terminal.console.insertBefore(descriptionMessage,terminal.inputCommand);
    },
);

const date = new Command(
    `${terminal.prefix}Get current date
     Usage: 
     date
    `,
    `terminal.inputCommand.value.trim() == 'date'`,
    () => {
        const dateMessage = document.createElement('p');
        dateMessage.classList.add('correctCommandLine');
        dateMessage.innerText = `${terminal.prefix}${new Date()}`;
        terminal.console.insertBefore(dateMessage,terminal.inputCommand);
    },
);

const clear = new Command(
    `${terminal.prefix}Clear terminal
     Usage: 
     clear
    `,
    `terminal.inputCommand.value.trim() == 'clear'`,
    () => {
        document.querySelectorAll('p').forEach(line => {
            line.remove();
        })
    },
);

const banner = new Command(
    `${terminal.prefix}Show banner of this site
     Usage: 
     banner
    `,
    `terminal.inputCommand.value.trim() == 'banner'`,
    () => {
        const bannerMessage = document.createElement('p');
        bannerMessage.classList.add('correctCommandLine');
        bannerMessage.innerHTML = `${terminal.prefix}<pre>
    ███████╗ ██████╗██╗   ██╗███████╗ ██████╗ ██████╗ ██╗   ██╗██╗  ██╗    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
    ██╔════╝██╔════╝╚██╗ ██╔╝╚══███╔╝██╔═══██╗██╔══██╗╚██╗ ██╔╝██║ ██╔╝    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
    ███████╗██║      ╚████╔╝   ███╔╝ ██║   ██║██████╔╝ ╚████╔╝ █████╔╝        ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
    ╚════██║██║       ╚██╔╝   ███╔╝  ██║   ██║██╔══██╗  ╚██╔╝  ██╔═██╗        ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
    ███████║╚██████╗   ██║   ███████╗╚██████╔╝██║  ██║   ██║   ██║  ██╗       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
    ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
    Welcome to my page! ~ Pablo Scyzoryk   
    </pre>                                                                                                                                                                                                                    
        `;
        terminal.console.insertBefore(bannerMessage,terminal.inputCommand);
    },
);

const openURL = new Command(
    `${terminal.prefix}Open given URL
     Usage: 
     openURL <URL>
    `,
    `terminal.inputCommand.value.trim().startsWith('openURL ')`,
    () => {
        if(terminal.inputCommand.value.substring(8).startsWith('https://')) {
            window.open(terminal.inputCommand.value.trim().substring(8));
        }
        else {
            window.open(`https://${terminal.inputCommand.value.substring(8).trim()}`);
        }

        const URLMessage = document.createElement('p');
        URLMessage.classList.add('correctCommandLine');
        URLMessage.innerText = `${terminal.prefix}opening url...`;
        terminal.console.insertBefore(URLMessage,terminal.inputCommand);
    },
);

const rickroll = new Command(
    `${terminal.prefix}?
     Usage: 
     rickroll
    `,
    `terminal.inputCommand.value.trim() == 'rickroll'`,
    () => {
        const URLMessage = document.createElement('p');
        URLMessage.classList.add('correctCommandLine');
        URLMessage.innerText = `${terminal.prefix}We're no strangers to love
        You know the rules and so do I (do I)
        A full commitment's what I'm thinking of
        You wouldn't get this from any other guy
        I just wanna tell you how I'm feeling
        Gotta make you understand
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        We've known each other for so long
        Your heart's been aching, but you're too shy to say it (say it)
        Inside, we both know what's been going on (going on)
        We know the game and we're gonna play it
        And if you ask me how I'm feeling
        Don't tell me you're too blind to see
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        We've known each other for so long
        Your heart's been aching, but you're too shy to say it (to say it)
        Inside, we both know what's been going on (going on)
        We know the game and we're gonna play it
        I just wanna tell you how I'm feeling
        Gotta make you understand
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you`;

        terminal.console.insertBefore(URLMessage,terminal.inputCommand);
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }
);

const author = new Command(
    `${terminal.prefix}Show message from author of this page
     Usage: 
     author
    `,
    `terminal.inputCommand.value.trim() == 'author'`,
    () => {
        const echoMessage = document.createElement('p');
        echoMessage.classList.add('correctCommandLine');
        echoMessage.innerText = `${terminal.prefix}Pablo Scyzoryk is an author of this page! Hope you' going to like it!`;
        terminal.console.insertBefore(echoMessage,terminal.inputCommand);
    },
);

const inputColor = new Command(
    `${terminal.prefix}Change deafult color of input line (may not work due to incorectly parsed colors)
     Usage: 
     inputColor <color>
    `,
    `terminal.inputCommand.value.trim().startsWith('inputColor ')`,
    () => {
        const color = terminal.inputCommand.value.trim().substring(11);
        root.style.setProperty('--font-color', color); 

        const colorMessage = document.createElement('p');
        colorMessage.classList.add('correctCommandLine');
        colorMessage.innerText = `${terminal.prefix}Succesfully changed color!`;
        terminal.console.insertBefore(colorMessage,terminal.inputCommand);
    },
);

const errColor = new Command(
    `${terminal.prefix}Change deafult color of errors (may not work due to incorectly parsed colors)
     Usage: 
     errColor <color>
    `,
    `terminal.inputCommand.value.trim().startsWith('errColor ')`,
    () => {
        const color = terminal.inputCommand.value.trim().substring(8);
        root.style.setProperty('--error-color', color); 

        const colorMessage = document.createElement('p');
        colorMessage.classList.add('correctCommandLine');
        colorMessage.innerText = `${terminal.prefix}Succesfully changed color!`;
        terminal.console.insertBefore(colorMessage,terminal.inputCommand);
    },
);

const outputColor = new Command(
    `${terminal.prefix}Change deafult color of command lines (may not work due to incorectly parsed colors)
     Usage: 
     outputColor <color>
    `,
    `terminal.inputCommand.value.trim().startsWith('outputColor ')`,
    () => {
        const color = terminal.inputCommand.value.trim().substring(12);
        root.style.setProperty('--output-color', color); 

        const colorMessage = document.createElement('p');
        colorMessage.classList.add('correctCommandLine');
        colorMessage.innerText = `${terminal.prefix}Succesfully changed color!`;
        terminal.console.insertBefore(colorMessage,terminal.inputCommand);
    },
);

const github = new Command(
    `${terminal.prefix}Get link to my github
     Usage: 
     github
    `,
    `terminal.inputCommand.value.trim() == ('github')`,
    () => {
        const githubMessage = document.createElement('p');
        githubMessage.classList.add('correctCommandLine');
        githubMessage.innerText = `https://github.com/pabloscyzoryk`;
        terminal.console.insertBefore(githubMessage,terminal.inputCommand);

        githubMessage.addEventListener('click', () => {
            window.open('https://github.com/pabloscyzoryk');
        });
    },
);

const email = new Command(
    `${terminal.prefix}Get my email adress
     Usage: 
     email
    `,
    `terminal.inputCommand.value.trim() == 'email'`,
    () => {
        const emailMessage = document.createElement('p');
        emailMessage.classList.add('correctCommandLine');
        emailMessage.innerText = `pawel.cyrzyk@gmail.com`;
        terminal.console.insertBefore(emailMessage,terminal.inputCommand);
    },
);

const about = new Command(
    `${terminal.prefix}Get some info about this project!!
     Usage: 
     about
    `,
    `terminal.inputCommand.value.trim() == 'about'`,
    () => {
        const aboutMessage = document.createElement('p');
        aboutMessage.classList.add('correctCommandLine');
        aboutMessage.innerText = `Hi! This is my first terminal style website project. Write "help" to get avaiable commands :)) You can click arrows to gain benefits of command history. By Pablo Scyzoryk 2022.`;
        terminal.console.insertBefore(aboutMessage,terminal.inputCommand);
    },
);

const prefix = new Command(
    `${terminal.prefix}Change prefix of every command line
     Usage: 
     prefix <prefix>
    `,
    `terminal.inputCommand.value.trim().startsWith('prefix ')`,
    () => {
        const prefixMessage = document.createElement('p');
        const prefix = terminal.inputCommand.value.trim().substring(7);
        terminal.prefix = prefix;

        prefixMessage.classList.add('correctCommandLine');
        prefixMessage.innerText = `${terminal.prefix}Succesfully changed prefix`;
        terminal.console.insertBefore(prefixMessage,terminal.inputCommand);
    },
);

terminal.inputCommand.focus();
document.addEventListener('click', () => {
    terminal.inputCommand.focus();
});