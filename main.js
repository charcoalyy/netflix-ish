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