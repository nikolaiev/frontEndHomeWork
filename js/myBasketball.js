/**
 * Created by vlad on 10.05.17.
 */

window.onload=()=>{

    let loginInput=document.getElementById('login_input');
    let passwordInput=document.getElementById('password_input');
    let submitButton=document.getElementById('submit_button');
    let messageSpan=document.getElementById('message_span');

    const spaceCode=" ".charCodeAt();

    loginInput.onkeydown=(e)=>{
        if(e.keyCode===spaceCode){
            e.preventDefault();
        }
    };

    passwordInput.onkeydown=(e)=>{
        if(e.keyCode===spaceCode){
            e.preventDefault();
        }
    };

    submitButton.onclick=(e)=>{

        if(!isLoginValid()
            || !isPasswordValid()){
            e.preventDefault();
        }
    };

    function isLoginValid() {
        let login=loginInput.value;

        //fast email check
        if(/^[0-9a-zA-ZА-Яа-яЇїІіЄє_.\-]{4,20}@[a-zA-ZА-Яа-яЇїІіЄє]{2,5}(\.[a-zA-ZА-Яа-яЇїІіЄє]{2,5})+$/ig.test(login)){
            return true;
        }

        //something is wrong

        if(!/^[0-9a-zA-ZА-Яа-яЇїІіЄє_\.\-]{4,20}@/ig.test(login)){
            messageSpan.innerHTML="Email must have at least 4 and not greater than 20 symbols before @";
            return false;
        }

        if(/^[0-9_\.\-]{4,20}@/ig.test(login)){
            messageSpan.innerHTML="Email must have at least 1 letter symbol before @";
            return false;
        }

        if(!/@[a-zA-ZА-Яа-яЇїІіЄє]{2,5}\.[^$]/ig.test(login)){
            messageSpan.innerHTML="Email must have at least 2 and not greater than 5 letter after @";
            return false;
        }

        if(login.match(/@/g).length>1){
            messageSpan.innerHTML="Email can't have more than 1 @ element";
            return false;
        }

        if(!/@[a-zA-ZА-Яа-яЇїІіЄє]{2,5}(\.[a-zA-ZА-Яа-яЇїІіЄє]{2,5}){1,2}$/ig.test(login)){
            messageSpan.innerHTML="Email must have at least 2 domain names,\n that have at least 2 and not greater than 5 letter";
            return false;
        }


        return true;
    }

    function isPasswordValid(){
        let mandatoryChars=['$','!','&'];
        let password=passwordInput.value;

        /*In case of RegEx
                /.*{8,20}/.test(password)
          (works slower)
        */
        if(password.length<8 ||password.length>20 ){
            messageSpan.innerHTML="Password must be in range of (8, 20) symbols";
            return false;
        }

        if(!/[A-ZА-ЯЇІЄ]/g.test(password)){
            messageSpan.innerHTML="Password must contain upper case letter";
            return false;
        }

        if(!/[a-zа-яїіє]/g.test(password)){
            messageSpan.innerHTML="Password must contain lower case letter";
            return false;
        }

        for(let index in mandatoryChars) {
            let char=mandatoryChars[index];
            let regEx=new RegExp("["+char+"]+");

            if (!regEx.test(password)) {
                messageSpan.innerHTML = "Password must contain at least 1 "+char+" letter";
                return false;
            }
        }
        return true;
    }
};


