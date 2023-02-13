let getFormTag = document.querySelector('.two form');
   let getFulna = document.querySelector('.fulna');
    let getEmail = document.querySelector('.email');
let getPsw = document.querySelector('.pw-inp');
let getSendBtn = document.querySelector('.send button');
let eye = document.querySelector('#eye');
getSendBtn.attributes.disabled = "true";
console.log(eye);
let getFulnaLabel = document.querySelector('.fn');
let getEmailLabel = document.querySelector('.em');
let getPsLabel = document.querySelector('.pw');
console.log(getFulnaLabel);

getFulna.addEventListener('keyup', () => {
    getFulnaLabel.innerHTML = 'Full Name';
   
});
getFulna.addEventListener('blur', () => {
     getFulnaLabel.innerHTML = ' ';
});

getEmail.addEventListener('keyup', () => {
    getEmailLabel.innerHTML = 'Email Address';
    getEmailLabel.style.color = 'black';
   
});

let valid = false;

getEmail.addEventListener('blur', () => {
    getEmailLabel.innerHTML = ' ';
     let { matchedId, last } = verifyValueBasedOnId('emails', String(getEmail.value));
    console.log(matchedId[1]);
    let currentEmail = String(getEmail.value);
    if (currentEmail.match('@gmail.com') || currentEmail.match('@yahoo.com')) {
        valid = true;
        console.log('valid Email address format');
    }
    else {
        console.log('invalid email address format');
        valid = false;
    }
    if (matchedId[1] == undefined) {
        getEmailLabel.innerHTML = ' '
        // getSendBtn.attributes.disabled = "false";
        // getSendBtn.style.borderRight = '2rem solid green';

         if (valid == true) {
             getSendBtn.attributes.disabled = "false";
        getSendBtn.style.borderRight = '2rem solid green';
        }
        else {
             valid = false; 
               getSendBtn.style.borderRight = 'none';
              getSendBtn.attributes.disabled = "true";
            getEmailLabel.innerHTML = ' ';
             getEmailLabel.innerHTML = 'invalid Email Format';
        }

    } else {
        getEmailLabel.innerHTML = 'User Already Exist!';
        getEmailLabel.style.color = 'red';
        getSendBtn.attributes.disabled = "true";
        getSendBtn.style.borderRight = 'none';
    }
});
let toggle = 1; let t = 0; let blind = []; let show = 0; let Password = []; 

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
    
    
})

getPsw.addEventListener('blur', () => {
     getPsLabel.innerHTML = ' ';
});

getSendBtn.addEventListener('click', (e) => {
    getSendBtn.attributes.disabled = "true";
     let { matchedId, last } = verifyValueBasedOnId('emails', String(getEmail.value));

    if (matchedId[1] == undefined && valid==true) {
        getEmailLabel.innerHTML = ' ';
        if (valid == true) {
             getSendBtn.attributes.disabled = "false";
        getSendBtn.style.borderRight = '2rem solid green';
        }
        else {
            valid = false; 
              getSendBtn.style.borderRight = 'none';
             getSendBtn.attributes.disabled = "true";
            getEmailLabel.innerHTML = ' ';
             getEmailLabel.innerHTML = 'invalid Email Format';
        }
       
    } else {
        getEmailLabel.innerHTML = '';
       (!valid)? getEmailLabel.innerHTML = 'invalid Email Format!' :  getEmailLabel.innerHTML = 'User Already Exist!';
        getEmailLabel.style.color = 'red';
        getSendBtn.attributes.disabled = "true";
        getSendBtn.style.borderRight = 'none';
        valid = false;
    }
})

getFormTag.addEventListener('submit', (e) => {
    e.preventDefault(e);
  let { matchedId, last } = verifyValueBasedOnId('emails', String(getEmail.value));
    if (last === undefined) {
        last = 1;
    } else {
        last++;
   }
    if (matchedId[1] == undefined && valid == true)  {
        // send form inputs
        console.log('last is: ', last);
        //  get data to save to localStorage
        localStorage.setItem(`emails${last}`, String(getEmail.value));
        localStorage.setItem(`fullnames${last}`, String(getFulna.value));
        localStorage.setItem(`passwords${last}`, String(Password.join('')));
        console.log('new user added successfully !');
        getFormTag.reset();
        getSendBtn.style.borderRight = 'none';
        location.href = './index.html';
        // reset arrays
         Password = [];
        blind = [];
    } else {
        valid = false;
        e.preventDefault(e);
 } 
   
   
})

let names = 'chile';
console.log(names[0]="*")
























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

