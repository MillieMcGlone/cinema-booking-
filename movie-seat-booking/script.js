const filmSelect = document.getElementById("film")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const container = document.querySelector('.container');
const count = document.getElementById('count')
const total = document.getElementById('total')

populateUI();

let ticketPrice = +filmSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice )
}


//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
//copy selected seats into array, map through array, new array of index's
//converts the node list into regular array 
const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0 ){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    filmSelect.selectedIndex = selectedMovieIndex;
  }
}


//film select event
filmSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//seat click event
//if the clicked object has the class of seat but does not have the class of occupied run this
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')

    updateSelectedCount();
  }
  
});
//intial count and total set 
updateSelectedCount();
