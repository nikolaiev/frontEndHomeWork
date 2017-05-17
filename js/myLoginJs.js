$(()=>{
    const MAX_LOGIN_LETTERS=20;
    const MIN_PASSWORD_LETTERS=40;

    const SPACE_CODE=" ".charCodeAt();
    const LETTERS_STR=" символов";
    const LETTERS_LEFT="Осталось ввести ";
    const LETTERS_OVER="Лимит превышен на ";

    let loginInput=$('#login_input');
    let passwordInput=$('#password_input');
    let submitButton=$('#submit_button');
    let messageSpan=$('#message_span');
    let lettersMessageSpan=$('#message_span_right');


    loginInput.keydown((e)=>{
        if(e.keyCode===SPACE_CODE){
            e.preventDefault();
        }
    });

    loginInput.on("cut copy paste",(e)=>{
       e.preventDefault();
    });

    loginInput.keyup((e)=>{
        /*login length*/
        let len=loginInput.val().length;

        if(len<MAX_LOGIN_LETTERS){
            lettersMessageSpan.html(LETTERS_LEFT+(MAX_LOGIN_LETTERS-len)+LETTERS_STR);
            return;
        }

        if(len>MAX_LOGIN_LETTERS){
            lettersMessageSpan.html(LETTERS_OVER+(len-MAX_LOGIN_LETTERS)+LETTERS_STR);
            return;
        }

        /*clear span*/
        lettersMessageSpan.html("");
    });

    passwordInput.keydown((e)=>{
        if(e.keyCode===SPACE_CODE){
            e.preventDefault();
        }
    });

    passwordInput.on("cut copy paste",(e)=>{
        e.preventDefault();
    });
    passwordInput.keydown((e)=>{
        /*login length*/
        let len=passwordInput.val().length;

        if(len<MIN_PASSWORD_LETTERS){
            lettersMessageSpan.html(LETTERS_LEFT+(MIN_PASSWORD_LETTERS-len)+LETTERS_STR);
            return;
        }

        if(len>MIN_PASSWORD_LETTERS){
            lettersMessageSpan.html(LETTERS_OVER+(len-MIN_PASSWORD_LETTERS)+LETTERS_STR);
            return;
        }

        /*clear span*/
        lettersMessageSpan.html("");
    });

    submitButton.click((e)=>{

        if(!isLoginValid()
            || !isPasswordValid()){
            e.preventDefault();
        }
    });

    function isLoginValid() {
        let login=loginInput.val();

        //fast email check
        if(/^[0-9a-zA-ZА-Яа-яЇїІіЄє_.\-]{4,20}@[a-zA-ZА-Яа-яЇїІіЄє]{2,5}(\.[a-zA-ZА-Яа-яЇїІіЄє]{2,5})+$/ig.test(login)){
            return true;
        }

        //something is wrong

        if(!/^[0-9a-zA-ZА-Яа-яЇїІіЄє_\.\-]{4,20}@/ig.test(login)){
            messageSpan.html("Email must have at least 4 and not greater than 20 symbols before @");
            return false;
        }

        if(/^[0-9_\.\-]{4,20}@/ig.test(login)){
            messageSpan.html("Email must have at least 1 letter symbol before @");
            return false;
        }

        if(!/@[a-zA-ZА-Яа-яЇїІіЄє]{2,5}\.[^$]/ig.test(login)){
            messageSpan.html("Email must have at least 2 and not greater than 5 letter after @");
            return false;
        }

        if(login.match(/@/g).length>1){
            messageSpan.html("Email can't have more than 1 @ element");
            return false;
        }

        if(!/@[a-zA-ZА-Яа-яЇїІіЄє]{2,5}(\.[a-zA-ZА-Яа-яЇїІіЄє]{2,5})+$/ig.test(login)){
            messageSpan.html("Email must have at least 2 domain names,\n that have at least 2 and not greater than 5 letter");
            return false;
        }


        return true;
    }

    function isPasswordValid(){
        let mandatoryChars=['$','!','&'];
        let password=passwordInput.val();

        /*In case of RegEx
                /.*{8,20}/.test(password)
          (works slower)
        */
        if(password.length<8 ||password.length>20 ){
            messageSpan.html("Password must be in range of (8, 20) symbols");
            return false;
        }

        if(!/[A-ZА-ЯЇІЄ]/g.test(password)){
            messageSpan.html("Password must contain upper case letter");
            return false;
        }

        if(!/[a-zа-яїіє]/g.test(password)){
            messageSpan.html("Password must contain lower case letter");
            return false;
        }

        for(let index in mandatoryChars) {
            let char=mandatoryChars[index];
            let regEx=new RegExp("["+char+"]+");

            if (!regEx.test(password)) {
                messageSpan.html("Password must contain at least 1 "+char+" letter");
                return false;
            }
        }
        return true;
    }
});


