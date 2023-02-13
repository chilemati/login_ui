let getFulna = document.querySelector('.greeting .fulna');
let state2 = localStorage.getItem('state2');
let username = localStorage.getItem(`fullnames${state2}`);
let getBody = document.querySelector('body');
let getUser = document.querySelector('.nav .user');
   let getName = document.querySelector('.nav h3.name');
    let getEmail = document.querySelector('.drop h3.email');
    let getCart = document.querySelector('.drop h3.cart');
let getSettings = document.querySelector('.drop h3.settings');
let getDrop = document.querySelector('.nav .drop');
console.log(getDrop);
let toggle = 0;

getFulna.innerHTML = 'Welcome Back ' + String(username);

// make 3 nav links switch text color on visite

let getHome = document.querySelector('.home');
let getAbout = document.querySelector('.about');
let getContact = document.querySelector('.contact');

// console.group(getHome, getAbout, getContact);
getHome.addEventListener('click', (e) => {
    getHome.style.color = 'orange';
    getAbout.style.color = 'black';
    getContact.style.color = 'black';
    getUser.style.color = 'black';

});
getAbout.addEventListener('click', (e) => {
    getHome.style.color = 'black';
    getAbout.style.color = 'orange';
    getContact.style.color = 'black';
    getUser.style.color = 'black';

});
getContact.addEventListener('click', (e) => {
    getHome.style.color = 'black';
    getAbout.style.color = 'black';
    getContact.style.color = 'orange';
      getUser.style.color = 'black';

});

// console.log(location);

let j = 0;
let t = setInterval(() => {
    getBody.addEventListener('click', (e) => {
        j = 0;
        toggle = 0;
        if (e.target.className != 'fa-solid fa-user user') {
              getDrop.style.display='none';
        }
    },false)
    j++;

    // console.log(getTime());
    if (j == 60) {
        clearInterval(t);
        location.href = './index.html';
    }
    // console.log(j);
}, 1000);

// add an event listener to user logo

getUser.addEventListener('click', (e) => {
    toggle++;
    getUser.style.color = 'orange';
    getHome.style.color = 'black';
    getAbout.style.color = 'black';
    getContact.style.color = 'black';

    // set
    getName.innerHTML = 'Full Name: ' + String(localStorage.getItem(`fullnames${state2}`));
    getName.style.textTransform = 'capitalize';
    getEmail.innerHTML = 'Email: ' + String(localStorage.getItem(`emails${state2}`));
    getCart.innerHTML = `Cart[${state2}]`;
    getSettings.innerHTML = 'Edit Profile';
    if (toggle % 2 == 1) {
        getDrop.style.display = 'block';
    }
    else {
        getDrop.style.display = 'none';
    }
});

