// Red tabs
// Make a list of all the elements with the tab item class (the buttons) and the outer block class (the content)
const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.OUTER-BLOCK-BOX');

// Remove all borders by looping through each tab item
function removeBorder() {
    tabItems.forEach(item => item.classList.remove('tab-border'));
}

// Hide all content by looping through each tab content's outer block box
function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('show'));
}

// Select the tab content item, remove everything, then add border class and show class to the selected tab
function selectItem(ev) {
    removeBorder(); 
    removeShow();
    this.classList.add('tab-border'); // 'this' is dictated by event listener, ie. the tab item you clicked
    const tabContentItemSelected = document.querySelector(`#${this.id}-content`); // 'this' has an id of tab-1, so want to find id of tab-1-content
    tabContentItemSelected.classList.add('show');
}

// Listen for tab click and apply the above function
tabItems.forEach(item => item.addEventListener('click', selectItem));






// Collapsible FAQ
// Make a list of all the elements with the collapsible class (the buttons) and the content class (the content)
const collapsibleButtons = document.querySelectorAll('.collapsible');
const collapsibleContent = document.querySelectorAll('.collapsible-content');

// Remove activated dark colour on all buttons
function removeActiveStates() {
    collapsibleButtons.forEach(item => item.classList.remove('active-collapsible'));
}

// Collapse all content
function inactivateAllContent() {
    collapsibleContent.forEach(item => item.classList.add('inactive-content'));
}

// When one button is clicked, first hide all content
function openItem(ev) {
    inactivateAllContent();
    const collapsibleContentSelected = document.querySelector(`#${this.id}-content`); // grab the collapsible's associated content
    if (this.classList.contains('active-collapsible') === true) { // if button is active, inactivate all & close its content
        removeActiveStates();
        collapsibleContentSelected.style.maxHeight = 0;
        collapsibleContentSelected.classList.add('inactive-content');
    } else { // if button is inactive, inactivate all (others), add active to the clicked button, & open its content
        removeActiveStates();
        this.classList.add('active-collapsible');
        collapsibleContentSelected.classList.remove('inactive-content');
        collapsibleContentSelected.style.maxHeight = collapsibleContentSelected.scrollHeight + "px";
    }
}

// Listen for button click and apply the above function
collapsibleButtons.forEach(item => item.addEventListener('click', openItem));



// Email form validation
const form = document.getElementById('email-form');
const email = document.getElementById('email-address');
const error = document.getElementById('error-message');

var validatedEmail;

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

let validateInitialEmail = (e) => {
    let messages = [];
    var patt = new RegExp("@");

    if (email.value === "" || email.value === null) { // if field is empty
        messages.push("Email is required")
    } else if (patt.test(email.value)) { // if field contains @ sign
        validatedEmail = email.value; // add email into var validatedEmail for later use
        return 'valid'
    } else { // if field lacks @ sign
        messages.push("Please enter a valid email address")
    }
    if (messages.length > 0) {
        error.innerText = messages // add all relevant error messages to the error html element
        e.preventDefault() 
    }
}



// Modal opening and closing
const closeModals = document.querySelectorAll('[data-close-modal]') // assign all close buttons to var closeModals
const getStartedButton = document.getElementById('get-started') // assign get started button to var getStartedButton
const overlay = document.getElementById('overlay') // assign overlay div to var overlay

let openModal = (modWindow) => { // add the active class to the selected modal window
    modWindow.classList.add('active');
    overlay.classList.add('active');
}

let closeModal = (modal) => { // remove the active class from the selected modal window
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

getStartedButton.addEventListener('click', () => {
    validateInitialEmail(); // check that email was entered on landing page
    document.getElementById("user-email").value = validatedEmail; // if so, add that email into modal email box
    const modWindow = document.querySelector(getStartedButton.dataset.modalTarget) // dataset lets us access the data attributes (eg. the value of the modal target) of getStartedButton as if getStartedButtonw is an object -- thus assign the VALUE of getStartedButton's modal target (modal-step-1) to var modal window
    openModal(modWindow) // open the modal window
})

closeModals.forEach(button => { // for each element that contains the close modal data attribute, treat it like a button
    button.addEventListener('click', () => { // when clicked,
        const modWindow = button.closest('.modal-step') // closest lets us access the closest PARENT element with the class modal-step (doing this bc our close button is inside (a child) of the modal window we want to close) -- thus assign the button's parent modal to var modal window
        closeModal(modWindow) // close the modal window
    })
})

overlay.addEventListener('click', () => {
    const currentModal = document.querySelector('.active.modal-step')
    if (currentModal.id === "modal-step-IIII") {
        window.location.href = "./other.html"
    }

    const modals = document.querySelectorAll('.modal-step.active') // select the currently open modals
    modals.forEach((modWindow) => { // close them each
        closeModal(modWindow);
    })
})


// Modal advancing
const nextButton = document.querySelectorAll('.next')

nextButton.forEach(button => {
    button.addEventListener('click', () => {
        const currentModal = document.querySelector('.active.modal-step') // select currently active modal
        const currentInputs = currentModal.querySelectorAll('.modal-input') // list all inputs inside current modal
    
        if (currentInputs.length > 0) { // if there are inputs, validate them
            if (currentInputs[0].type === "text" ) {
                if (currentInputs[0].value != "" && currentInputs[1].value != "") { // if email and password are both filled in
                    goToNext();
                } else {
                    document.getElementById('modal-error-I').innerText = "Please fill in all fields to proceed."
                }
            } else if (currentInputs[0].type === "radio") {
                if (currentInputs[0].checked === true || currentInputs[1].checked === true || currentInputs[2].checked === true) { // if any radio is selected
                    goToNext();
                } else {
                    document.getElementById('modal-error-II').innerText = "Please select a plan to proceed."
                }
            }
        } else {
            goToNext();
        }
    })
})

let goToNext = () => {
    const currentModal = document.querySelector('.active.modal-step') // select currently active modal
    const nextModal = document.getElementById(`${currentModal.id}I`) // find ID of modal just after current one
    closeModal(currentModal)
    openModal(nextModal)
}



// Modal submission
const submitUserButton = document.querySelector('.submit-user-info')
var users = [];

submitUserButton.addEventListener('click', () => {
    var userEmail = document.getElementById('user-email') // find input field for email
    var userPassword = document.getElementById('user-password') // find input field for password
    var userPlan; // establish empty variable for price plan

    if (document.getElementById('user-plan-b').checked) {
        userPlan = document.getElementById('user-plan-b').value; // find value of radio button clicked
    } else if (document.getElementById('user-plan-s').checked) {
        userPlan = document.getElementById('user-plan-s').value;
    } else if (document.getElementById('user-plan-p').checked) {
        userPlan = document.getElementById('user-plan-p').value;
    }

    const newUser = { // create object with user info
        email: userEmail.value,
        password: userPassword.value,
        plan: userPlan
    }
    users.push(newUser) // add to list of users

    const userData = JSON.stringify(users)
    localStorage.setItem("user data", userData) // store for later access

    // clear all fields
    userEmail.value = ''
    userPassword.value = ''
    document.querySelector('input[name="plan"]:checked').checked = false;
})
