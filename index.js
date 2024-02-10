    let filmData;
    let availableTickets
    let ticketSold
    let capacity;
    
  function filmMenuList(){

  fetch("http://localhost:3000/films")
          .then((response) => {
            
            return response.json(); 
          })
          .then((data) => {
            filmData = data;
            
            filmDetails (data[0].id);
                //displaying films menu in the unique HTML element
                for (let i = 0; i < filmData.length; i++){
                const filmMenu = document.createElement("li");
                 filmMenu.className="list-item";      
                filmMenu.innerHTML = `
                    <a href ="#" onclick="filmDetails('${filmData[i].id}')"><p>${filmData[i].title}<p></a>
                    `;
                document.querySelector("#film-menu-list").append(filmMenu);
            
              }    
         for (data of filmData){
         
         }
                  });
        }
        filmMenuList();
       
  function filmDetails(id){

        document.querySelector("#film-data").innerHTML = ``;
        
        let filmInfoElement = document.createElement("li");
            
        capacity = filmData[id-1].capacity
        ticketSold = filmData[id-1].tickets_sold
        availableTickets = (capacity - ticketSold);

         filmInfoElement.innerHTML = `
             <h2>${filmData[id-1].title}</h2>
             <img class= "thumb" height ="250px" width ="250px" src = "${filmData[id-1].poster}" alt = "${filmData[id-1].title}"><br>
             <h4>${filmData[id-1].description}</h4>
             <p>Runtime: ${filmData[id-1].runtime}</p>
             <p>Capacity: ${filmData[id-1].capacity}</p>
             <p>Showtime: ${filmData[id-1].showtime}</p>
             <p>Tickets Sold:<span id = "tickets-sold"> ${filmData[id-1].tickets_sold}</span><p>
             <p>Availible tickets: <span id='available'>${availableTickets}</span></p>
    
             <div class="button">
            <button id="buy-ticket" onClick ="buyTicket('${filmData[id-1].id}')">Buy Ticket</>
            </div>
             `;
             
             document.querySelector("#film-data").appendChild(filmInfoElement);

             if(filmData[id-1].capacity == filmData[id-1].tickets_sold ){
              const button = document.getElementById("buy-ticket")
              button.className = "button-sold-out";
              button.textContent = "Ticket Sold Out";
              button.setAttribute("disabled", "");
          }
         }
      function buyTicket (id){
        console.log(id);
        console.log(capacity, ticketSold, availableTickets);
        if (availableTickets > 0){
        ticketSold = ticketSold + 1;
        availableTickets = availableTickets - 1;

        document.getElementById("tickets-sold").textContent = ticketSold;
      document.getElementById("available").textContent = availableTickets;
      updateTickets(ticketSold, id);

      }
         }

      function updateTickets(ticketSold, id)
      {
           console.log(filmData[id-1].id);
           let film_id = filmData[id-1].id;
          fetch(`http://localhost:3000/films/${film_id}`,{
              method: "PATCH",
              headers: {
                  'Content-Type':'application/json'
              },
              body: JSON.stringify({
                  "tickets_sold":ticketSold
              })
              
          });
      }
      
    
    