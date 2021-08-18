/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// get all of the 'section' elements and put them in an array
const actual_sections = Array.from( document.querySelectorAll('section'));

// we have to know where the menu is going to sit
const main_menu = document.getElementById( 'navbar__list' );
let menu_items = [];
let i = 0;
let directionUP = false;
let scrollPos = 0;  // initial scroll direction state
let currentSection = 0;
let lastSection = actual_sections.length- 1; // we count from 0
let timeoutvalue = 5000;
let nHandle = -1;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// helper function to create the actual menu consisting of ul items
function createULMenuItem() {
    // looping over all sections creating a list item for each one
    for ( actual_section of actual_sections ) {
        menu_section_link = actual_section.getAttribute('id');
        menu_section_name = actual_section.getAttribute('data-nav');

        // create the actual list item
        tempListItem = document.createElement('li');
        
        // lets put it in HTML so the DOM can display it
        tempListItem.innerHTML = `<a class='menu__link' href='javascript:void(0)' onclick='myclickFunction(${menu_section_link})'>${menu_section_name}</a>`;

        // and add it to the document
        main_menu.appendChild(tempListItem);
    }

    // now the ul items are all there; put them in a helper array for later use
    menu_items = Array.from(document.getElementsByClassName('menu__link'));
}

// courtesy of Udacity blog
function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();
    return( rect.top <= 150 && rect.bottom >= 150 );
}

// give the active 'in view' section focus when scrolled to
function givefocus2section() {

    // unhide menu when hidden through time-out
    if (document.getElementById('navbar__list').style.display=='none'){
        document.getElementById('navbar__list').style.display='block';
    }
    
    // reset the timer when active
    if (nHandle) { clearTimeout( nHandle); }
        
    // activate hide and seek (again)
    nHandle = setTimeout( function() {
            document.getElementById('navbar__list').style.display='none';
        }, timeoutvalue );

    // detects new scrolled state and compares it with the previous one
    if ((document.body.getBoundingClientRect()).top > scrollPos)
       directionUP = true;
    else
       directionUP = false;

    // saves the new position for iteration
    scrollPos = (document.body.getBoundingClientRect()).top;

    // so we know the page starts allways at section 1 (no persistent cookie stuff just yet)
    if (!directionUP) {
        // we are going down
        if (isElementInViewport(actual_sections[currentSection])){
            // it's visible; add the class
            actual_sections[currentSection].classList.add('your-active-class');
            menu_items[currentSection].classList.add('active');
        } else {
            // the current one is out of bounds so we have to disable the class
            actual_sections[currentSection].classList.remove('your-active-class');
            menu_items[currentSection].classList.remove('active');

            // and we have to check again if the next one is already in view
            // but only if there is another section
            if (currentSection < lastSection) {
                if (isElementInViewport(actual_sections[currentSection + 1])){
                    // set the currentsection
                    currentSection = currentSection + 1;
                
                    // add the class
                    actual_sections[currentSection].classList.add('your-active-class');
                    menu_items[currentSection].classList.add('active');
                    // note that if this section currently is not in view, neither sections will have been highlighted
                } 
            }
        }
    } else {
        // going up: current section still in view?
        if (isElementInViewport(actual_sections[currentSection])){
            // add the class
            actual_sections[currentSection].classList.add('your-active-class');
            menu_items[currentSection].classList.add('active');
        } else {
            // the current one is out of bounds so we have to disable the class
            actual_sections[currentSection].classList.remove('your-active-class');
            menu_items[currentSection].classList.remove('active');

            // and we have to check again if the previous one is already in view
            // but only if we aren't at the top
            if (currentSection > 0 ) {
                if (isElementInViewport(actual_sections[currentSection - 1])){
                    // set the new active one
                    currentSection = currentSection - 1;

                    // add the class
                    actual_sections[currentSection].classList.add('your-active-class');
                    menu_items[currentSection].classList.add('active');
                    // note that if this section currently is not in view, neither sections will have been highlighted
                }
            }
        }
    }
}

// lets gently scroll the section into view
function myclickFunction(el){
  document.getElementById(el.id).scrollIntoView({ 
    behavior: 'smooth'
  });
  return false;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav and display it in its initial state
createULMenuItem();

// Scroll to (anchor ID) using scrollTO event
document.getElementById("topofpage").scrollIntoView();

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Set sections as active
document.addEventListener('scroll', givefocus2section );

// eof