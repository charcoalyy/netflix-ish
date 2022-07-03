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

form.addEventListener('submit', (e) => {
    let messages = [];
    var patt = new RegExp("@");

    if (email.value === " " || email.value === null) {
        messages.push("Email is required")
    } else if (patt.test(email.value)) {
        return 'valid'
    } else {
        messages.push("Please enter a valid email address")
    }
    if (messages.length > 0) {
        e.preventDefault()
        error.innerText = messages
    }
});



// Get started modal

// ****PROBLEM: GET STARTED SHOULD RESPOND ONLY !!!! IF IT'S VALID ??!!?!?!?!?!
// ****ALSO: NEED TO GET THE "NEXT" BUTTON WORKING!!!!!!

const closeModals = document.querySelectorAll('[data-close-modal]') // assigns all close buttons to var closeModals
const getStartedButton = document.getElementById('get-started') // assigns get started button to var getStartedButton
const overlay = document.getElementById('overlay') // assigns overlay div to var overlay

let openModal = (modWindow) => { // adds the active class to the selected modal window
    modWindow.classList.add('active');
    overlay.classList.add('active');
}

let closeModal = (modal) => { // removes the active class from the selected modal window
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

getStartedButton.addEventListener('click', () => {
    const modWindow = document.querySelector(getStartedButton.dataset.modalTarget) // dataset allows us to access the data attributes (eg. the value of the modal target) of getStartedButton as if getStartedButtonw as an object -- thus assigns the VALUE of getStartedButton's modal target (modal step 1) to var modal window
    openModal(modWindow) // and opens the modal window
})

closeModals.forEach(button => { // for each element that contains the close modal data attribute, treat it like a button
    button.addEventListener('click', () => { // when clicked,
        const modWindow = button.closest('.modal-step') // closest allows us to access the closest PARENT element with the class modal-step (doing this bc our close button is inside of the modal window we want to close) -- thus assigns the button's parent modal to var modal window
        closeModal(modWindow) // and closes the modal window
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal-step.active') // selects the currently open modals
    modals.forEach((modWindow) => { // and closes them each
        closeModal(modWindow);
    })
})