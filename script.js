const enterButton = document.querySelector('.enter-button');
const content = document.querySelector('.content');
const buttons = document.querySelector('.buttons');
const contactInfo = document.querySelector('.contact-info');
const backButton = document.querySelector('.back-button'); // Reference to the existing back button
const clockContainer = document.querySelector('.clock-container'); // Reference to the clock container

backButton.style.display = 'none'; // Hide back button initially
clockContainer.style.display = 'block'; // Ensure clock is visible initially

// Function to update the real-time clock and date
function updateClock() {
    const clock = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();

    // Get time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Get date
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = now.getFullYear();

    // Update the content
    clock.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = `${day}:${month}:${year}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock immediately on page load
updateClock();

enterButton.addEventListener('click', () => {
    content.style.opacity = '0';
    content.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        content.style.display = 'none';
        buttons.style.display = 'flex';
        contactInfo.style.display = 'block';
        setTimeout(() => {
            buttons.style.opacity = '1';
            buttons.style.transform = 'translateX(0)';
            contactInfo.style.opacity = '1';
            contactInfo.style.transform = 'translateY(0)';
        }, 50);
    }, 1000);
});
// Function to switch sections
function switchSection(targetSection) {
    const activeSection = document.querySelector('section.active');
    
    if (activeSection) {
        // Add the 'inactive' class to the current section to animate it out
        activeSection.classList.add('inactive');
        
        // After the transition, hide the section and remove the class
        setTimeout(() => {
            activeSection.classList.remove('active', 'inactive');
            activeSection.style.display = 'none';
        }, 500); // Matches the CSS transition duration
    }
    
    // Show the new section
    targetSection.style.display = 'block';
    setTimeout(() => {
        targetSection.classList.add('active'); // Slide and fade the new section in
    }, 50); // Small delay to ensure it's shown before applying the class
}

// Handle section button clicks
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-target'));
        
        // Hide the buttons and contact info
        buttons.style.opacity = '0';
        contactInfo.style.opacity = '0';
        
        setTimeout(() => {
            buttons.style.display = 'none';
            contactInfo.style.display = 'none';
            
            // Switch to the new section
            switchSection(target);
            
            backButton.style.display = 'block'; // Show the back button
            clockContainer.style.display = 'none'; // Hide the clock
        }, 500); // Matches the transition duration for buttons fading out
    });
});

// Handle back button click
backButton.addEventListener('click', () => {
    const activeSection = document.querySelector('section.active');
    
    if (activeSection) {
        // Transition the active section out
        activeSection.classList.add('inactive');
        
        setTimeout(() => {
            activeSection.classList.remove('active', 'inactive');
            activeSection.style.display = 'none';
            
            // Show the buttons and contact info again
            buttons.style.display = 'flex';
            contactInfo.style.display = 'block';
            
            setTimeout(() => {
                buttons.style.opacity = '1';
                contactInfo.style.opacity = '1';
            }, 50); // Short delay to allow content to fade back in
        }, 500);
    }

    backButton.style.display = 'none'; // Hide the back button
    clockContainer.style.display = 'block'; // Show the clock
});
