document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }
});

// Constants for calculations
const CONSTANTS = {
    EV_CONSUMPTION: 16, // kWh/100km
    ICE_CONSUMPTION: 7, // L/100km
    FUEL_PRICE: 600, // HUF/L
    ELECTRICITY_PRICE: 60 // HUF/kWh
};

// DOM Elements
const changeValueBtns = document.querySelectorAll('.change-value-btn');
const modal = document.getElementById('changeValueModal');
const closeModalBtn = document.querySelector('.close-modal');
const calculateBtn = document.getElementById('calculate-btn');
const resultsDiv = document.querySelector('.results');
const kmInput = document.getElementById('kilometers');
const showFeaturesBtn = document.getElementById('showFeaturesBtn');
const featuresModal = document.getElementById('featuresModal');

// Show modal when "Change Value" is clicked
changeValueBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
    });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Calculate costs
calculateBtn.addEventListener('click', () => {
    const kilometers = parseFloat(kmInput.value);
    
    if (!kilometers || kilometers <= 0) {
        alert('Please enter a valid distance');
        return;
    }

    // Calculate trip costs
    const evCost = calculateEVCost(kilometers);
    const iceCost = calculateICECost(kilometers);
    const tripSavings = iceCost - evCost;

    // Update results
    document.querySelector('.ev-cost .cost').textContent = `${Math.round(evCost).toLocaleString()} HUF`;
    document.querySelector('.ice-cost .cost').textContent = `${Math.round(iceCost).toLocaleString()} HUF`;
    document.querySelector('.savings-amount').textContent = `${Math.round(tripSavings).toLocaleString()} HUF`;

    // Show results
    resultsDiv.style.display = 'block';

    // Scroll just a bit to show the start of results
    window.scrollBy({
        top: 100,
        behavior: 'smooth'
    });
});

// Calculate ev cost for the trip
function calculateEVCost(kilometers) {
    return (kilometers / 100) * CONSTANTS.EV_CONSUMPTION * CONSTANTS.ELECTRICITY_PRICE;
}

// Calculate ice cost for the trip
function calculateICECost(kilometers) {
    return (kilometers / 100) * CONSTANTS.ICE_CONSUMPTION * CONSTANTS.FUEL_PRICE;
}

// Input validation
kmInput.addEventListener('input', (e) => {
    if (e.target.value < 0) {
        e.target.value = 0;
    }
});

// Show features modal
showFeaturesBtn.addEventListener('click', () => {
    featuresModal.classList.add('active');
});

// Close features modal when clicking outside
featuresModal.addEventListener('click', (e) => {
    if (e.target === featuresModal) {
        featuresModal.classList.remove('active');
    }
});

// Close features modal with close button
featuresModal.querySelector('.close-modal').addEventListener('click', () => {
    featuresModal.classList.remove('active');
}); 
