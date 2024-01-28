document.addEventListener("DOMContentLoaded", function(){
    // fetch the details of the first film
    fetchFilmDetails(1);
    //fetch the details of all films for the menu
    fetchAllFilms()
    });
    
    
    let availableTicket;
    
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
        const ticketSold = `${filmData.tickets_sold}`;
        availableTickets = (capacity - ticketSold);
        const filmInfoElement = document.getElementById("filmInfo");
       //const availableTickets= Math.parseInt(filmData.capacity - filmData.ticket_sold);
        filmInfoElement.innerHTML = `
            <h2>${filmData.title}</h2>
            <img class= "thumb" height ="250px" width ="250px" src = "${filmData.poster}" alt = "${filmData.title}"><br>
            <h4>${filmData.description}</h4><br>
            <label align=center>Runtime: ${filmData.runtime}</label><br>
            <label>Capacity: ${filmData.capacity}</label><br>
            <label>Showtime: ${filmData.showtime}</label><br>
            <label>Tickets Sold: ${filmData.tickets_sold}<label><br>
            <label>Available Tickets:${availableTickets}</label><br>
            <button type = "button">Buy Ticket</button> 
            
       `;
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
    
        function buyTicket(){
            if (availableTicket ===0)
            {
               alert("We are Sold Out") ;
            } else
            availableTicket = availableTicket-1;
        
    
        }