document.addEventListener("DOMContentLoaded", () => {

    let filmsUrl = "http://localhost:3000/films";

    let ul = document.querySelector("#films");
    let film = document.querySelector("#film");
    let filmTitle = film.querySelector("#title");
    let filmPoster = film.querySelector("#poster");
    let filmRuntime = film.querySelector("#runtime");
    let filmShowtime = film.querySelector("#showtime");
    let filmAvailableTickets = document.getElementById('available-tickets');
   // let purchaseBtn = film.querySelector(".purchase-ticket");
    

    fetchFilms();

    displayFirstFilm();

    function displayFirstFilm() {
        fetch(filmsUrl + '/' + 1)
        .then(res => res.json())
        .then(film => displayFilmDetails(film))
        .catch(err => console.log(err))
    }

    function fetchFilms(){
        fetch(filmsUrl)
        .then(res => res.json())
        .then(films => films.forEach(film => addAsList(film)))
        .catch(err => console.log(err))
    
    }

    function addAsList(film) {
        let li = document.createElement("li");
        li.textContent = film.title;
        li.addEventListener('click', () => displayFilmDetails(film));
        ul.append(li);
    }

    function displayFilmDetails(filmObj){

        //create a new button for every ticket and remove the previous button to avoid conflict
        let btnChild = document.querySelector('#purchase-ticket');
        film.removeChild(btnChild);
        let purchaseBtn = document.createElement('button');

        //set button id and text it displays
        purchaseBtn.setAttribute('id', 'purchase-ticket');
        purchaseBtn.textContent = "Purchase a ticket";

        let availableTickets = filmObj.capacity - filmObj.tickets_sold;

        //set film details
        filmTitle.textContent = filmObj.title;
        filmPoster.src = filmObj.poster;
        filmRuntime.textContent = filmObj.runtime;
        filmShowtime.textContent = filmObj.showtime;
        filmAvailableTickets.textContent = availableTickets;

        purchaseBtn.addEventListener('click', () => {   
              if(availableTickets <= 0){
                alert("No more tickets for this movie!");
                filmAvailableTickets.textContent = 0;
            }else{
                availableTickets -= 1;
                filmAvailableTickets.textContent = availableTickets;
                filmObj.tickets_sold += 1;
            }
        
        })

        film.append(purchaseBtn);  

    }



    function purchaseTicket(filmObj) {
        console.log(obj.id);
    }

})