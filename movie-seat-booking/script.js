const filmSelect = document.getElementById("film")
const seats = document.querySelectorAll(".row.seat:not(.occupied")
const container = document.querySelector('.container');
const count = document.getElementById('count')
const total = document.getElementById('total')

let ticketPrice = +filmSelect.value;

//update total and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//film select event
filmSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
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
