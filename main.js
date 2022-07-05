// Red tabs
const tabItems = document.querySelectorAll('.tab-item'); // list all elements with tab item class (the buttons)
const tabContentItems = document.querySelectorAll('.OUTER-BLOCK-BOX'); // list all elements with outer block class (the content)

function removeBorder() {
    tabItems.forEach(item => item.classList.remove('tab-border')); // loop through each tab item and remove border class
}

function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('show')); // loop through and hide each tab's content
}

function selectItem(ev) {
    removeBorder(); // first remove all borders and hide all content
    removeShow();
    this.classList.add('tab-border'); // add border class to selected tab ('this' is dictated by event listener, ie. the tab item you clicked)
    const tabContentItemSelected = document.querySelector(`#${this.id}-content`); // add show class to selected tab's content ('this' has an id of tab-1, so want to find id of tab-1-content)
    tabContentItemSelected.classList.add('show');
}

tabItems.forEach(item => item.addEventListener('click', selectItem));



// Collapsible FAQ
const collapsibleButtons = document.querySelectorAll('.collapsible'); // list all elements with collapsible class (the buttons)
const collapsibleContent = document.querySelectorAll('.collapsible-content'); // list all elements with content class (the content)

function removeActiveStates() {
    collapsibleButtons.forEach(item => item.classList.remove('active-collapsible')); // remove activated dark colour
}

function inactivateAllContent() {
    collapsibleContent.forEach(item => item.classList.add('inactive-content')); // collapse all content
}

function openItem(ev) {
    inactivateAllContent(); // first hide all content
    const collapsibleContentSelected = document.querySelector(`#${this.id}-content`); // grab the selected collapsible's associated content
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

collapsibleButtons.forEach(item => item.addEventListener('click', openItem));



// Landing email form validation
const email = document.getElementById('email-address');
const error = document.getElementById('error-message');

let validateInitialEmail = (e) => {
    let messages = [];
    var patt = new RegExp("@");

    if (email.value === "" || email.value === null) { // if field is empty
        messages.push("Email is required")
    } else if (patt.test(email.value)) { // if field contains @ sign
        validatedEmail = email.value; // add email into var validatedEmail for later use
    } else { // if field lacks @ sign
        messages.push("Please enter a valid email address")
    }
    if (messages.length > 0) {
        error.innerText = messages // add all relevant error messages to the error html element
        email.addEventListener('input', () => { // now check to see if user fixes the error
            if (!patt.test(email.value) || email.value === "" || email.value === null) {
            } else {
                error.innerText = ""
            }
        })
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

let clearModalErrors = () => { // hide all red errors
    const errors = document.getElementsByClassName('modal-error')
    for (let i = 0; i < errors.length; i++) {
        errors[i].innerText = ""
    }
}

getStartedButton.addEventListener('click', () => {
    validateInitialEmail(); // check that email was entered on landing page
    if (validatedEmail) { // if email is a truthy value
        document.getElementById("user-email").value = validatedEmail; // add that email into modal email box
        const modWindow = document.querySelector(getStartedButton.dataset.modalTarget) // dataset lets us access the data attributes (eg. the value of the modal target) of getStartedButton as if getStartedButtonw is an object -- thus assign the VALUE of getStartedButton's modal target (modal-step-1) to var modal window
        openModal(modWindow) // open the modal window
    }
})

closeModals.forEach(button => { // for each element that contains the close modal data attribute, treat it like a button
    button.addEventListener('click', () => { // when clicked,
        clearModalErrors();
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
        clearModalErrors();
    })
})



// Sign in modal only
const signInLanding = document.getElementById('sign-in')
const signInButton = document.querySelector('.sign-in')

signInLanding.addEventListener('click', () => {
    const modWindow = document.querySelector(signInLanding.dataset.modalTarget)
    openModal(modWindow)
})

let logIn = () => {
    const signInModal = document.getElementById('modal-step-0')
    const signInInputs = signInModal.querySelectorAll('.modal-input')

    if (signInInputs.length > 0) {
        if (signInInputs[0].value != "" && signInInputs[1].value != "") { // if both inputs filled
            window.location.href = "./other.html" // redirect to home page
        } else {
            document.getElementById('modal-error-0').innerText = "Please fill in all fields to proceed"
            signInModal.addEventListener('input', () => { // now check to see if user fixes the error
                if (signInInputs[0].value != "" && signInInputs[1].value != "") {
                    document.getElementById('modal-error-0').innerText = ""
                } 
            })
        }
    }
}

signInButton.addEventListener('click', logIn) // login if button within modal is clicked



// Modal advancing
const nextButton = document.querySelectorAll('.next')

nextButton.forEach(button => {
    button.addEventListener('click', () => { 
        verifyModalInputs();
    })
})

let verifyModalInputs = () => {
    const currentModal = document.querySelector('.active.modal-step') // select currently active modal
    const currentInputs = currentModal.querySelectorAll('.modal-input') // list all inputs inside current modal
    
    if (currentInputs.length > 0) { // if there are inputs, validate them
        if (currentInputs[0].type === "text" ) {
            if (currentInputs[0].value != "" && currentInputs[1].value != "") { // if email and password are both filled in
                goToNext();
            } else {
                document.getElementById('modal-error-I').innerText = "Please fill in all fields to proceed."
                currentModal.addEventListener('input', () => { // now check to see if user fixes the error
                    if (currentInputs[0].value != "" && currentInputs[1].value != "") {
                        document.getElementById('modal-error-I').innerText = ""
                    }
                })
            }
        } else if (currentInputs[0].type === "radio") {
            if (currentInputs[0].checked === true || currentInputs[1].checked === true || currentInputs[2].checked === true) { // if any radio is selected
                goToNext();
            } else {
                document.getElementById('modal-error-II').innerText = "Please select a plan to proceed."
                currentModal.addEventListener('input', () => { // now check to see if user fixes the error
                    if (currentInputs[0].checked === true || currentInputs[1].checked === true || currentInputs[2].checked === true) {
                        document.getElementById('modal-error-II').innerText = ""
                    }
                })
            }
        }
    } else {
        goToNext();
    }
}

let goToNext = () => {
    const currentModal = document.querySelector('.active.modal-step') // select currently active modal
    const nextModal = document.getElementById(`${currentModal.id}I`) // find ID of modal just after current one
    closeModal(currentModal)
    openModal(nextModal)
}



// Modal submission
const submitUserButton = document.querySelector('.submit-user-info')
var users = []

let submitNewUser = () => {
    users = JSON.parse(localStorage.getItem("user data")) || [] // load previously stored users into array first

    var userEmail = document.getElementById('user-email') // find input field for email
    var userPassword = document.getElementById('user-password') // find input field for password
    var userPlan = document.querySelector('input[name="plan"]:checked') // find checked radio button

    const newUser = { // create object with user info
        email: userEmail.value,
        password: userPassword.value,
        plan: userPlan.value
    }
    users.push(newUser) // add to list of users

    const userData = JSON.stringify(users)
    localStorage.setItem("user data", userData) // store for later access

    userEmail.value = '' // clear all fields
    userPassword.value = ''
    document.querySelector('input[name="plan"]').checked = false;
}

submitUserButton.addEventListener('click', submitNewUser)



// Modal advancing and submission but for ENTER key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const landingEmail = document.getElementById('email-address')
        if (document.getElementById('modal-step-0').classList.contains('active')) {
            logIn();
        } else if (document.getElementById('modal-step-I').classList.contains('active') || document.getElementById('modal-step-II').classList.contains('active')) {
            e.preventDefault();
            verifyModalInputs();
        } else if (document.getElementById('modal-step-III').classList.contains('active')) {
            submitNewUser();
            goToNext();
        } else if (document.getElementById('modal-step-IIII').classList.contains('active')) {
            window.location.href = "./other.html"
        } else if (landingEmail === document.activeElement) {
            validateInitialEmail();
            if (validatedEmail) { 
                document.getElementById("user-email").value = validatedEmail;
                const modWindow = document.querySelector(getStartedButton.dataset.modalTarget)
                openModal(modWindow)
            }
        }
    }
})
