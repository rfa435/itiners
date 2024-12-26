document.addEventListener('DOMContentLoaded', () => {
    const itineraryForm = document.getElementById('itinerary-form');
    const itineraryList = document.getElementById('itinerary-list');
  
    // Load itineraries from server
    function loadItineraries() {
      fetch('/itineraries')
        .then(response => response.json())
        .then(data => {
          itineraryList.innerHTML = '';
          data.forEach((itinerary, index) => {
            addItineraryToTable(itinerary, index);
          });
        });
    }
  
    function addItineraryToTable(itinerary, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${itinerary.name}</td>
        <td>${itinerary.startTime}</td>
        <td>${itinerary.duration}</td>
        <td>${itinerary.location}</td>
        <td><a href="${itinerary.maps}" target="_blank">Maps</a></td>
        <td>
        <button onclick="deleteItinerary(${itinerary.id})">Delete</button>
        </td>
      `;
      itineraryList.appendChild(row);
    }
  
    // Add itinerary to server
    itineraryForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const formData = new FormData(itineraryForm);
      const itinerary = {
        name: formData.get('name'),
        startTime: formData.get('startTime'),
        duration: formData.get('duration'),
        location: formData.get('location'),
        maps: formData.get('maps'),
      };
      console.log(itinerary); 
  
      fetch('/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itinerary)
      })
      .then(response => response.json())
      .then(data => {
        loadItineraries();
        itineraryForm.reset();
      });
    });
  
    // Delete itinerary from server
    window.deleteItinerary = function(id) {
      fetch(`/itineraries/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          loadItineraries();
        });
    };
  
    // Load itineraries when the page loads
    loadItineraries();
  });

const formData = {
    name: nameInput.value,
    startTime: startTimeInput.value,
    duration: durationInput.value,
    location: locationInput.value,
    maps: mapsInput.value
  };
  
  // Log data sebelum dikirim
  console.log(formData);
  
  fetch('/itineraries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      console.log(data.message);
      fetchItineraries(); 
    }
  })
  .catch(error => console.error('Error:', error));

  fetch('/itineraries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); 
    if (data.message) {
      console.log(data.message);
      fetchItineraries();
    }
  })
  .catch(error => console.error('Error:', error));

const cors = require('cors');
app.use(cors());

  