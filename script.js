/* =========================================
   GLOBAL UTILITIES
========================================= */
// 1. Turn transitions back on after the page loads instantly
setTimeout(() => {
    document.body.classList.remove('preload-transitions');
}, 50);

const darkModeToggle = document.getElementById('dark-mode-toggle');

// 2. Update the button text on load
if (document.body.classList.contains('dark-mode') && darkModeToggle) {
    darkModeToggle.textContent = '☀️ Light Mode';
}

// 3. The Button Click Logic
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️ Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙 Dark Mode';
        }
    });
}

/* =========================================
   SMART SCROLLING HEADER
========================================= */
const globalHeader = document.querySelector('.global-header');
let lastScrollY = window.scrollY;

if (globalHeader) {
    window.addEventListener('scroll', () => {
        // If scrolling down AND past the header's height (75px)
        if (window.scrollY > lastScrollY && window.scrollY > 75) {
            globalHeader.classList.add('header-hidden');
        } 
        // If scrolling up
        else {
            globalHeader.classList.remove('header-hidden');
        }
        
        // Update the last scroll position
        lastScrollY = window.scrollY;
    });
}

// Math Utility
function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Math Utility
function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/* =========================================
   DYNAMIC BACKGROUND RANDOMIZATION
========================================= */
const bgShapes = document.querySelectorAll('.bg-shapes li');

if (bgShapes.length > 0) {
    bgShapes.forEach(shape => {
        // 1. On page load, give every shape a random horizontal starting position (from 5% to 90% of the screen width)
        shape.style.setProperty('--random-x', (Math.random() * 85 + 5) + 'vw');
        
        // 2. Listen for the exact millisecond the animation finishes and loops back to the bottom
        shape.addEventListener('animationiteration', () => {
            // Teleport the shape to a completely new random horizontal line for its next trip up!
            shape.style.setProperty('--random-x', (Math.random() * 85 + 5) + 'vw');
        });
    });
}

// Math Utility
function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/* =========================================
   LEVEL 1 LOGIC (Balance)
========================================= */
const balanceSlider = document.getElementById('balance-slider');
if (balanceSlider) {
    const weight = document.getElementById('visual-weight');
    const nextBtn1 = document.getElementById('next-btn');
    const pageWrapper = document.getElementById('page-wrapper');

    // Initialize rotation
    pageWrapper.style.transform = `rotate(${(balanceSlider.value - 50) * 0.1}deg)`;

    balanceSlider.addEventListener('input', function() {
        let val = balanceSlider.value;
        weight.style.left = `calc(${val}% - 40px)`;
        pageWrapper.style.transform = `rotate(${(val - 50) * 0.1}deg)`;

        if (val > 48 && val < 52) {
            weight.classList.add('balanced-weight'); 
            nextBtn1.disabled = false;
            pageWrapper.style.transform = `rotate(0deg)`;
        } else {
            weight.classList.remove('balanced-weight');
            nextBtn1.disabled = true;
        }
    });
}

/* =========================================
   LEVEL 2 LOGIC (Contrast)
========================================= */
const hueSlider = document.getElementById('hue-slider');
if (hueSlider) {
    const canvas = document.getElementById('canvas');
    const keyShape = document.getElementById('key-shape');
    const nextBtn2 = document.getElementById('next-btn');
    const targetHue = 10; 

    hueSlider.addEventListener('input', function() {
        let currentHue = hueSlider.value;
        canvas.style.backgroundColor = `hsl(${currentHue}, 80%, 50%)`;
        let diff = Math.abs(currentHue - targetHue);

        if (diff > 120 && diff < 240) {
            keyShape.classList.add('emphasized');
            nextBtn2.disabled = false;
        } else {
            keyShape.classList.remove('emphasized');
            nextBtn2.disabled = true; 
        }
    });
}

/* =========================================
   LEVEL 3 LOGIC (Proximity & Consistency)
========================================= */
const l3Items = document.querySelectorAll('.item'); // Specific to Level 3
if (l3Items.length > 0) {
    const l3Zones = document.querySelectorAll('.drop-zone');
    const nextBtn3 = document.getElementById('next-btn');
    const resetBtn = document.getElementById('reset-btn');
    const startZone = document.getElementById('start-zone');
    let draggedL3Item = null;

    l3Items.forEach(item => {
        item.addEventListener('dragstart', function() { draggedL3Item = this; setTimeout(() => this.style.display = 'none', 0); });
        item.addEventListener('dragend', function() { setTimeout(() => { this.style.display = 'block'; draggedL3Item = null; }, 0); });
    });

    l3Zones.forEach(zone => {
        zone.addEventListener('dragover', function(e) { e.preventDefault(); this.classList.add('drag-over'); });
        zone.addEventListener('dragleave', function() { this.classList.remove('drag-over'); });
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            if (draggedL3Item) { this.appendChild(draggedL3Item); checkL3Win(); }
        });
    });

    resetBtn.addEventListener('click', () => {
        l3Items.forEach(item => startZone.appendChild(item));
        checkL3Win();
    });

    function checkL3Win() {
        const zone1 = document.getElementById('zone1');
        const zone2 = document.getElementById('zone2');
        if (startZone.children.length > 0) { nextBtn3.disabled = true; return; }

        const checkZone = (zone) => {
            if (zone.children.length === 0) return true; 
            const firstClass = zone.children[0].classList.contains('square') ? 'square' : 'circle';
            return Array.from(zone.children).every(child => child.classList.contains(firstClass));
        };

        if (checkZone(zone1) && checkZone(zone2) && zone1.children.length > 0 && zone2.children.length > 0) {
            nextBtn3.disabled = false;
        } else {
            nextBtn3.disabled = true;
        }
    }
}

/* =========================================
   LEVEL 4 LOGIC (Typography)
========================================= */
const ransomNote = document.getElementById('note');
if (ransomNote) {
    const passcodeInput = document.getElementById('passcode-input');
    const finishBtn4 = document.getElementById('finish-btn');
    const sliderHierarchy = document.getElementById('slider-hierarchy');
    const sliderSpacing = document.getElementById('slider-spacing');
    const sliderHarmony = document.getElementById('slider-harmony');

    // Scatter words on load
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.note-body span').forEach(word => {
            word.style.setProperty('--random-x', (Math.random() - 0.5) * 150 + 'px');
            word.style.setProperty('--random-y', (Math.random() - 0.5) * 80 + 'px');
            word.style.setProperty('--random-rot', (Math.random() - 0.5) * 120 + 'deg');
        });
    });

    function updateTypography() {
        let valHi = parseInt(sliderHierarchy.value);
        let valSp = parseInt(sliderSpacing.value);
        let valHa = parseInt(sliderHarmony.value);

        sliderHierarchy.previousElementSibling.querySelector('span').textContent = valHi + '%';
        sliderSpacing.previousElementSibling.querySelector('span').textContent = valSp + '%';
        sliderHarmony.previousElementSibling.querySelector('span').textContent = valHa + '%';

        ransomNote.style.setProperty('--title-size', mapRange(valHi, 0, 100, 0.8, 2.5) + 'rem');
        ransomNote.style.setProperty('--body-size', mapRange(valHi, 0, 100, 2.5, 1.1) + 'rem');
        ransomNote.style.setProperty('--line-height', mapRange(valSp, 0, 100, 0.8, 1.6));
        ransomNote.style.setProperty('--letter-spacing', mapRange(valSp, 0, 100, -3, 0) + 'px');
        ransomNote.style.setProperty('--disorder', mapRange(valHa, 0, 100, 1, 0));
    }

    sliderHierarchy.addEventListener('input', updateTypography);
    sliderSpacing.addEventListener('input', updateTypography);
    sliderHarmony.addEventListener('input', updateTypography);

    passcodeInput.addEventListener('input', () => {
        if (passcodeInput.value.trim().toUpperCase() === 'CREATIVITY') {
            finishBtn4.disabled = false;
            finishBtn4.textContent = "Passcode Accepted - Unlock Level 5";
        } else {
            finishBtn4.disabled = true;
            finishBtn4.textContent = "Proceed to Level 5";
        }
    });
}

/* =========================================
   LEVEL 5 LOGIC (Alignment)
========================================= */
window.cycleAlignment = function(card) {
    // Array of the three possible states
    const states = ['align-left', 'align-center', 'align-right'];
    
    // Find which state the card is currently in
    let currentState = states.find(state => card.classList.contains(state));
    let nextIndex = (states.indexOf(currentState) + 1) % states.length;
    let nextState = states[nextIndex];

    // Swap the classes
    card.classList.remove(currentState);
    card.classList.add(nextState);

    checkAlignmentWin();
};

function checkAlignmentWin() {
    const cards = document.querySelectorAll('.align-card');
    if (cards.length === 0) return;

    // Check if ALL cards have the 'align-left' class
    const allLeft = Array.from(cards).every(card => card.classList.contains('align-left'));

    if (allLeft) {
        cards.forEach(card => card.classList.add('success-lock')); 
        
        // ✨ UNLOCK THE GRAYED-OUT BUTTON ✨
        const proceedBtn = document.getElementById('proceed-btn');
        const successText = document.getElementById('success-text');
        
        if (proceedBtn) proceedBtn.disabled = false; // Turns it green!
        if (successText) successText.style.opacity = '1'; // Fades in the text!
    }
}

/* =========================================
   LEVEL 6 LOGIC (White Space)
========================================= */
const spacingSlider = document.getElementById('spacing-slider');
const breathingCard = document.getElementById('breathing-card');

if (spacingSlider && breathingCard) {
    spacingSlider.addEventListener('input', function() {
        const val = parseInt(this.value);
        
        // 1. Dynamically inject CSS padding and gap
        breathingCard.style.padding = `${val}px`;
        breathingCard.style.gap = `${val / 2}px`;
        
        // 2. Dynamically fix the squished text
        const p = breathingCard.querySelector('p');
        if (p) {
            p.style.lineHeight = 1 + (val / 75); 
        }

        const proceedBtn = document.getElementById('proceed-btn');
        const successText = document.getElementById('success-text');

        // 3. Check for the perfect "Sweet Spot" (Between 24px and 28px padding)
        if (val >= 24 && val <= 28) {
            // It's perfect! Turn green and unlock the button.
            breathingCard.classList.add('success-lock');
            if (proceedBtn) proceedBtn.disabled = false;
            if (successText) successText.style.opacity = '1';
        } else {
            // It's too cramped OR too spaced out! Turn red and lock the button.
            breathingCard.classList.remove('success-lock');
            if (proceedBtn) proceedBtn.disabled = true;
            if (successText) successText.style.opacity = '0';
        }
    });
}

/* =========================================
   LEVEL 7 LOGIC (Color & Accessibility)
========================================= */
window.applyPalette = function(paletteType) {
    const colorCard = document.getElementById('color-card');
    const proceedBtn = document.getElementById('proceed-btn');
    const successText = document.getElementById('success-text');
    
    // Remove all palette classes first
    colorCard.classList.remove('toxic-palette', 'faded-palette', 'accessible-palette');
    
    // Apply the new one based on the button clicked
    if (paletteType === 'toxic' || paletteType === 'faded') {
        if (paletteType === 'toxic') colorCard.classList.add('toxic-palette');
        if (paletteType === 'faded') colorCard.classList.add('faded-palette');
        
        // Lock the button and hide text
        if (proceedBtn) proceedBtn.disabled = true;
        if (successText) successText.style.opacity = '0';
    } else if (paletteType === 'accessible') {
        colorCard.classList.add('accessible-palette');
        
        // Unlock the button and show text!
        if (proceedBtn) proceedBtn.disabled = false;
        if (successText) successText.style.opacity = '1';
    }
};

/* =========================================
   LEVEL 8 LOGIC (The Frankenstein Form)
========================================= */
window.cycleSystem = function(element) {
    // The sequence of themes to cycle through
    const themes = ['theme-win95', 'theme-neon', 'theme-brutal', 'theme-modern'];
    
    // Find current theme and calculate the next one
    let currentTheme = themes.find(t => element.classList.contains(t));
    let nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
    let nextTheme = themes[nextIndex];

    // Swap classes
    element.classList.remove(currentTheme);
    element.classList.add(nextTheme);

    // ✨ WIN CONDITION CHECK ✨
    const allElements = document.querySelectorAll('.shape-shifter');
    const proceedBtn = document.getElementById('proceed-btn');
    const successText = document.getElementById('success-text');

    // Check if EVERY element has the 'theme-modern' class
    const isUnified = Array.from(allElements).every(el => el.classList.contains('theme-modern'));

    if (isUnified) {
        // Lock all elements so they can't be messed up again
        allElements.forEach(el => el.classList.add('success-lock'));
        
        // Unlock the Proceed button
        if (proceedBtn) proceedBtn.disabled = false;
        if (successText) successText.style.opacity = '1';
    } else {
        // Keep it locked if they cycle past the modern theme!
        if (proceedBtn) proceedBtn.disabled = true;
        if (successText) successText.style.opacity = '0';
    }
};



/* =========================================
   LEVEL 9 LOGIC (Grand Finale Layout)
========================================= */
const l5Elements = document.querySelectorAll('.ui-element'); 
if (l5Elements.length > 0) {
    const l5Zones = document.querySelectorAll('.canvas-panel .drop-zone, #menu-zone');
    let draggedL5Item = null;

    l5Elements.forEach(item => {
        item.addEventListener('dragstart', function() { 
            draggedL5Item = this; 
            document.body.classList.add('is-dragging'); 
            this.classList.add('dragging-active'); // ✨ ADDED THIS
            setTimeout(() => this.style.display = 'none', 0); 
        });
        item.addEventListener('dragend', function() { 
            setTimeout(() => { 
                this.style.display = ''; 
                this.classList.remove('dragging-active'); // ✨ ADDED THIS
                draggedL5Item = null; 
                document.body.classList.remove('is-dragging'); 
            }, 0); 
        });
    });

    l5Zones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            if(this.id !== 'menu-zone') this.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', function() { 
            this.classList.remove('drag-over'); 
        });
        
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (draggedL5Item) {
                if (this.id !== 'menu-zone') {
                    // Check if an item is already in this slot
                    const existing = this.querySelector('.ui-element');
                    if (existing && existing !== draggedL5Item) {
                        // Kick the old item back to the menu
                        document.getElementById('menu-zone').appendChild(existing);
                    }
                }
                this.appendChild(draggedL5Item);
            }
        });
    });
}

// =========================================
// LEVEL 9 SUBMIT & MODAL FUNCTIONS
// =========================================

window.submitDesign = function() {
    const canvasZones = document.querySelectorAll('.canvas-panel .drop-zone');
    let correctCount = 0;
    
    // Check each drop zone against the expected element ID
    canvasZones.forEach(zone => {
        const expectedId = zone.getAttribute('data-expected');
        const droppedElement = zone.querySelector('.ui-element');
        
        if (droppedElement && droppedElement.id === expectedId) {
            correctCount++;
        }
    });

    // Calculate the score
    const percentage = Math.round((correctCount / canvasZones.length) * 100);
    showModal(percentage);
};

window.showModal = function(percentage) {
    const modal = document.getElementById('result-modal');
    const scoreDisplay = document.getElementById('score-display');
    const modalTitle = document.getElementById('modal-title');
    const modalFeedback = document.getElementById('modal-feedback');
    
    if (!modal) return; // Safety check
    
    modal.style.display = 'flex';
    let currentScore = 0;
    scoreDisplay.textContent = '0%';
    
    // Animate the score counting up
    const timer = setInterval(() => {
        scoreDisplay.textContent = currentScore + '%';
        if (currentScore >= percentage) {
            clearInterval(timer);
            
            // Set dynamic colors and text based on the final score
            if (percentage === 100) {
                scoreDisplay.style.borderColor = '#27ae60';
                scoreDisplay.style.color = '#27ae60';
                modalTitle.textContent = "Perfect Design!";
                modalFeedback.textContent = "Excellent application of Proximity, Hierarchy, and Balance!";
            } else if (percentage >= 50) {
                scoreDisplay.style.borderColor = '#f39c12';
                scoreDisplay.style.color = '#f39c12';
                modalTitle.textContent = "Good Start";
                modalFeedback.textContent = "Some elements are out of place. Think about standard web hierarchy.";
            } else {
                scoreDisplay.style.borderColor = '#e74c3c';
                scoreDisplay.style.color = '#e74c3c';
                modalTitle.textContent = "Design Chaos";
                modalFeedback.textContent = "Your layout lacks structure. Try to group related items and emphasize the Hero banner.";
            }
        } else {
            currentScore++;
        }
    }, 15); // Speed of the animation
};

window.retry = function() {
    // 1. Hide the modal
    const modal = document.getElementById('result-modal');
    if (modal) modal.style.display = 'none';
    
    // 2. Reset the score circle colors
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.style.borderColor = '#3498db';
        scoreDisplay.style.color = '';
    }

    // 3. ✨ NEW: Send all elements back to the menu!
    const menuZone = document.getElementById('menu-zone');
    const allElements = document.querySelectorAll('.ui-element');
    
    if (menuZone) {
        allElements.forEach(el => {
            menuZone.appendChild(el);
        });
    }
};

window.showSolution = function() {
    // Automatically move every element into its correct zone
    const canvasZones = document.querySelectorAll('.canvas-panel .drop-zone');
    canvasZones.forEach(zone => {
        const expectedId = zone.getAttribute('data-expected');
        const correctElement = document.getElementById(expectedId);
        
        if(correctElement) {
            zone.appendChild(correctElement);
        }
    });

    // Close the modal
    const modal = document.getElementById('result-modal');
    if (modal) modal.style.display = 'none';
};

/* =========================================
   LOGIN & WELCOME LOGIC
========================================= */
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stops the page from refreshing
        
        // Grab the username and save it to the browser's memory
        const username = document.getElementById('username').value;
        localStorage.setItem('designerAlias', username);
        
        // Redirect to the Welcome Page
        window.location.href = 'welcome.html';
    });
}

// If we are on the Welcome page, personalize the greeting!
const welcomeName = document.getElementById('welcome-name');
if (welcomeName) {
    const savedName = localStorage.getItem('designerAlias');
    if (savedName) {
        welcomeName.textContent = `Welcome, ${savedName}`;
    }
}

// --- LOGOUT LOGIC ---
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('designerAlias');
        // Changed to index.html (the new login page)
        window.location.href = 'index.html'; 
    });
}

// --- OPTIONAL SECURITY CHECK ---
const currentPath = window.location.pathname;
const savedAlias = localStorage.getItem('designerAlias');

// Changed login.html to index.html
if (!currentPath.includes('index.html') && !currentPath.endsWith('/') && !savedAlias) {
    window.location.href = 'index.html';
}


// =========================================
 //  LEVEL NAVIGATION FUNCTIONS
//========================================= */

window.goToLevel2 = function() { window.location.href = "level2.html"; };
window.goToLevel3 = function() { window.location.href = "level3.html"; };
window.goToLevel4 = function() { window.location.href = "level4.html"; };
window.goToLevel5 = function() { window.location.href = "level5.html"; };
// ✨ NEW LEVELS ✨
window.goToLevel6 = function() { window.location.href = "level6.html"; };
window.goToLevel7 = function() { window.location.href = "level7.html"; };
window.goToLevel8 = function() { window.location.href = "level8.html"; };
window.goToLevel9 = function() { window.location.href = "level9.html"; }; // The Grand Finale!