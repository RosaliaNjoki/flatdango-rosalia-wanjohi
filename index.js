document.addEventListener("DOMContentLoaded", function(){
    // fetch the details of the first film
    fetchFilmDetails(1);
    //fetch the details of all films for the menu
    fetchAllFilms();
    // adding event listner for purchasing a ticket
     document.getElementById("filmInfo").addEventListener('click', function(event) {
        event.preventDefault();
    
        });
     
    });
    
    function fetchFilmDetails(){
    //making a Get request to obtain first film details
     fetch(`http://localhost:3000/films/1`)
    .then(response => response.json())
    .then(filmData => displayFilmDetails(filmData))
    .catch(error => console.error('problem experienced fetching first film data:', error))
    }
     function displayFilmDetails(filmData){
        // displaying the first film details using HTML elements
        const capacity = `${filmData.capacity}`;
        ticketSold = `${filmData.tickets_sold}`;
        availableTickets = (capacity - ticketSold);
        const filmInfoElement = document.getElementById("filmInfo");
       //const availableTickets= Math.parseInt(filmData.capacity - filmData.ticket_sold);
        filmInfoElement.innerHTML = `
            <h2>${filmData.title}</h2>
            <img class= "thumb" height ="250px" width ="250px" src = "${filmData.poster}" alt = "${filmData.title}"><br>
            <h4>${filmData.description}</h4>
            <p>Runtime: ${filmData.runtime}</p>
            <p>Capacity: ${filmData.capacity}</p>
            <p>Showtime: ${filmData.showtime}</p>
            <p>Tickets Sold:<span id = "tickets-sold"> ${filmData.tickets_sold}</span><p>
            <p>Available Tickets:<span id = "available-ticket">${availableTickets}</span></p>
            
              `;
       //inserting a buy button and invoking the ticket buying event       
       const button = document.createElement("button");
       button.className = "buy-ticket";
       button.textContent='Buy Ticket';
       document.getElementById("filmInfo").append(button);
       button.addEventListener("click", function(){
        if(availableTickets===0){
        
            alert("We are Sold Out") ;
    
           }
            else {
               ticketSold++;
               availableTickets--;
               document.getElementById("tickets-sold").textContent = ticketSold;
               document.getElementById("available-ticket").textContent = availableTickets;
            }
       } );
     }
    
     function fetchAllFilms(){
        //making a Get request to obtain the whol films data
    
       fetch('http://localhost:3000/films')
       .then(response => response.json())
       .then(filmsData =>displayFilmMenu(filmsData))
       .catch(error => console.error('problem experienced fetching films data:', error)) 
    }
    
    function displayFilmMenu(filmsData){
        //displaying films menu in the unique HTML element
        for (let i = 0; i < filmsData.length; i++){
        const filmMenu = document.createElement("li");
         filmMenu.className="list-item";      
        filmMenu.innerHTML = `
            <a href ="#" onclick="displayFilmDetails('${filmsData[i].id}')"><p>${filmsData[i].title}<p></a>
            `;
            document.querySelector("#film-menu-list").append(filmMenu);
        }
    }    
    
    