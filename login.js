let toggle = 1; let t = 0; let blind = []; let show = 0; let Password = []; let valid = false;
let emailId = 0; let pswId = 0;

const getFormTag = document.querySelector('.two .form');
const getSendBtn = document.querySelector('.two .send button');
let eye = document.querySelector('#eye');
let getPsw = document.querySelector('.pw-inp');
let getPsLabel = document.querySelector('.pw');
let getEmailLabel = document.querySelector('.em');
    let getEmail = document.querySelector('.username');

// console.log(getPsw);

let send = false;
getSendBtn.attributes.disabled = "true";
// getSendBtn.innerHTML = 'Login';

getSendBtn.addEventListener('click', (e) => {
    send = true;
    // getSendBtn.innerHTML='Login Now !'

},false);

eye.addEventListener('click', () => {
    toggle++;

    if (toggle % 2 == 0) {
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
        show = 1;
    }
    else {
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
        show = 0;
    }

    if (show == 1) {
        getPsw.value = String(Password.join(''));
    }
    else {
       
        getPsw.value = `${blind.join('')}`;
    }
    
    
});

getPsw.addEventListener('keyup', (e) => {
     t++;
    getPsLabel.innerHTML = 'Password';   
    if ((e.code >= 'KeyA' && (e.code <= 'KeyZ')) || ((e.code >= 'Digit0' && (e.code <= 'Digit9')))) {
        // console.log('within range');
         Password.push(String(e.key));
    }

   
    if (e.code == 'Backspace') {
        blind.pop();
         Password.pop();
    }
    else {
        blind.push('*');
    }
   
    if (show == 1) {
       getPsw.value = String(Password.join(''));
    }
    else {
         getPsw.value = `${blind.join('')}`;
    }
   
});

getPsw.addEventListener('blur', (e) => {
    getPsLabel.innerHTML = ' ';   
    let { matchedId, last } = verifyValueBasedOnId('passwords', String(Password.join('')));
    // console.log('password matchedId : ',matchedId[1]);
    pswId = matchedId[1];

});

getEmail.addEventListener('keyup', () => {
    getEmailLabel.innerHTML = 'Email Address';
    getEmailLabel.style.color = 'black';
   
});

getEmail.addEventListener('blur', () => {
    getEmailLabel.innerHTML = ' ';
    getEmailLabel.style.color = 'black';

     let { matchedId, last } = verifyValueBasedOnId('emails', String(getEmail.value));
    // console.log('email matchedId : ',matchedId[1]);
    emailId = matchedId[1];
    let currentEmail = String(getEmail.value);
    if (currentEmail.match('@gmail.com') || currentEmail.match('@yahoo.com')) {
        valid = true;
        console.log('valid Email address format');
    }
    else {
        console.log('invalid email address format');
        valid = false;
    }
    if (matchedId[1] > 0) {
        getEmailLabel.innerHTML = ' '
         getEmailLabel.innerHTML = 'user found!';
        getEmailLabel.style.color = 'green';
         if (valid == true) {
             getSendBtn.attributes.disabled = "true";
             
       
        }
        else {
             valid = false; 
               getSendBtn.style.borderRight = 'none';
              getSendBtn.attributes.disabled = "true";
            getEmailLabel.innerHTML = ' ';
             getEmailLabel.innerHTML = 'invalid Email Format';
        }

    } else {
        getEmailLabel.innerHTML = " ";
        getEmailLabel.innerHTML = 'wrong email or password!';
        getEmailLabel.style.color = 'red';
        getSendBtn.attributes.disabled = "true";
        getSendBtn.style.borderRight = 'none';
    }
   
});


getFormTag.addEventListener('submit', (e) => {
    e.preventDefault(e);
      function getTime(){
             let d = new Date();
           let min= d.getMinutes();
          let hr = d.getHours();
          let today = d.toDateString();
        //    console.group(min, hr)
          let times = [];
          times.push(min);
          times.push(hr);
          times.push(today);
       
          return times;
    }
    //  let times =getTime();
 
    if (send == true && (emailId > 0 && pswId > 0) && valid == true) {
        if (emailId === pswId) {
            console.log('user details is correct!!!!');
         getEmailLabel.innerHTML = ' ';
        // getSendBtn.style.borderRight = '2rem solid green';
        // getSendBtn.innerHTML = 'Login';
            localStorage.setItem('state2', String(emailId));
        Password = [];
        blind = [];
            getFormTag.reset();
             localStorage.setItem('lastTime', JSON.stringify(getTime()));
            //  localStorage.setItem('access', 'true');
            location.href='./dashboard.html'
       }
    }
    else {
         getEmailLabel.innerHTML = 'invalid user details';
        getEmailLabel.style.color = 'red';
    }
});

console.log('from login', location.pathname);
let d1 = new Date();
console.log(d1.toDateString());


















/*
Problem: write a pseudo Algorithm that verifies the values in localStorate
 based on key names from 1 to infinity
  
 > loop through all the keys
   > get all the keys with id 1 to infinity
   > check if key values matches the expected value
> return values


*/

 function verifyValueBasedOnId(a,b) {
    let matchedId = [0]; let allId=[];

    for(let i=0; i< 100; i++) {
        let keys = localStorage.key(i);
        let intendedValue = localStorage.getItem(keys);
        let intendedValueId= localStorage.getItem(String(a).concat(i));
        let lastFoundId = localStorage.getItem(String(a).concat(i));
       if(String(intendedValueId) === b ) {
        // console.log('user found !!!!');
        matchedId.push(i);
        console.log(i);
       }
       

       if(lastFoundId != null) {
        // console.log('found n are: ', lastFoundId);
        allId.push(i);
       }



        if(keys == null) {
            break;
        }
    }
    // console.log(allId[allId.length - 1]);
    let last = allId[allId.length - 1];
    return {matchedId, last};
}

