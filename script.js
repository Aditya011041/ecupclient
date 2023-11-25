// Function to create list items from JSON data
function createListItemsFromJSON(data) {
  const listingsContainer = document.getElementById('listingsContainer');
  // console.log(listingsContainer)
  data.forEach(item => {
    // console.log(item)
    const listItem = document.createElement('li');
    listItem.classList.add('section');

    listItem.innerHTML = `
      <div class="block1">
        <div class="left">
          <div class="heading">${item.title}</div>
          <div class="rate1">
            <!-- Render the rating using the provided data -->
            ${renderStars(item.rating)}
          </div>
          <div class="content1">${item.description}</div>
          <div class="bio1">
            <div class="projects1">
              <p class="count1">${item.projectsCount}</p>
              <p class="count_title1">projects</p>
            </div>
            <div class="years1">
              <p class="count1">${item.yearsExperience}</p> 
              <p class="count_title1">years</p> 
            </div>
            <div class="price1">
              <p class="count1">${item.priceRange}</p> 
              <p class="count_title1">price</p>
            </div>
          </div>
          <div class="number">
            <p>${item.contactNumbers[0]}</p>
            <p>${item.contactNumbers[1]}</p>
          </div>
        </div>
        <div class="right">
          <!-- Buttons as per the original structure -->
          <button>
            <img src="details.svg">
            <p style="font-size: 8px; color: #8D4337;">details</p>
          </button>
          <button>
            <img src="hide.svg">
            <p style="font-size: 8px; color: #8D4337;">hide</p>
          </button>
          <button>
            <img src="shortlist.svg">
            <p style="font-size: 8px; color: #8D4337;">shortlist</p>
          </button>
          <button>
            <img src="report.svg">
            <p style="font-size: 8px; color: #8D4337;">report</p>
          </button>
        </div>
      </div>
    `;

    listingsContainer.appendChild(listItem);
  });

  // Your existing functionality for button actions
  // ...

  // Function to handle button actions
  function handleButtonActions() {
    const shortlistButtons = document.querySelectorAll('.right button:nth-child(3)');

    shortlistButtons.forEach(button => {
      button.addEventListener('click', function() {
        const icon = button.querySelector('img');
        icon.src = icon.src.includes('shortlisted') ? 'shortlist.svg' : 'shortlisted.svg';

        const listItem = button.closest('.section');
        listItem.classList.toggle('shortlisted');
      });
    });

    const shortlistedFilterButton = document.querySelector('.shortlisted button');
    let isCurrentlyVisible = true;

    shortlistedFilterButton.addEventListener('click', function() {
      if (isCurrentlyVisible) {
        showAllListings();
      } else {
        toggleListingsVisibility();
      }
      isCurrentlyVisible = !isCurrentlyVisible;
    });
  }

  handleButtonActions();
}

// Function to fetch data from JSON file
fetch('http://127.0.0.1:5000/get_listings')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    createListItemsFromJSON(data);
  })
  .catch(error => console.error('Error fetching data:', error));

// Functions for showing/hiding listings based on shortlist button image
function showAllListings() {
  const listings = document.querySelectorAll('.section');
  listings.forEach(listing => {
    listing.style.display = 'block';
  });
}

function toggleListingsVisibility() {
  const listings = document.querySelectorAll('.section');
  listings.forEach(listing => {
    const shortlistButtonImg = listing.querySelector('button:nth-child(3) img');
    const isVisible = shortlistButtonImg.src.includes('shortlisted');

    if (isVisible) {
      listing.style.display = 'block';
    } else {
      listing.style.display = 'none';
    }
  });
}

// Function to render star rating
function renderStars(rating) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  let starsHTML = '';
  for (let i = 0; i < filledStars; i++) {
    starsHTML += '<img src="star_fill.svg">';
  }
  if (hasHalfStar) {
    starsHTML += '<img src="half_star.svg">';
  }
  return starsHTML;
}





// mongodb+srv://jhaadi4444:work123@work.ooz3uja.mongodb.net/





// [
//   {
//     "title": "Epic Designs",
//     "rating": 4.5,
//     "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, explicabo veniam cupiditate dolor excepturi fuga asperior.",
//     "projectsCount": 57,
//     "yearsExperience": 8,
//     "priceRange": "$$$",
//     "contactNumbers": ["+91-984532853", "+91-984244853"]
//   },
//   {
//     "title": "House Designs",
//     "rating": 5,
//     "description": "Another description here...",
//     "projectsCount": 70,
//     "yearsExperience": 10,
//     "priceRange": "$$",
//     "contactNumbers": ["+91-987654321", "+91-987654322"]
//   },
//   {
//     "title": "Studio D3",
//     "rating": 5,
//     "description": "Another description here...",
//     "projectsCount": 80,
//     "yearsExperience": 13,
//     "priceRange": "$$$",
//     "contactNumbers": ["+91-987654321", "+91-987654322"]
//   }

// ]
