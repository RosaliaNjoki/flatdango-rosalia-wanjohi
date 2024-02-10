

        let filmData;
    function filmMenuList(){
        
        fetch("http://localhost:3000/films")
          .then((response) => {
            
            return response.json(); 
          })
          .then((data) => {
            filmData = data;
        
            
                //displaying films menu in the unique HTML element
                for (let i = 0; i < filmData.length; i++){
                const filmMenu = document.createElement("li");
                 filmMenu.className="list-item";      
                filmMenu.innerHTML = `
                    <a href ="#" onclick="filmDetails('${filmData[i].id}')"><p>${filmData[i].title}<p></a>
                    `;
                document.querySelector("#film-menu-list").append(filmMenu);
                
            }    
            
            
        
          });
        }
        filmMenuList();
        
         function filmDetails(id){

        document.querySelector("#film-data").innerHTML = ``;
        
        let filmInfoElement = document.createElement("li");
       
        
         filmInfoElement.innerHTML = `
             <h2>${filmData[id-1].title}</h2>
             <img class= "thumb" height ="250px" width ="250px" src = "${filmData.poster}" alt = "${filmData.title}"><br>
             <h4>${filmData[id-1].description}</h4>
             <p>Runtime: ${filmData[id-1].runtime}</p>
             <p>Capacity: ${filmData[id-1].capacity}</p>
             <p>Showtime: ${filmData[id-1].showtime}</p>
             <p>Tickets Sold:<span id = "tickets-sold"> ${filmData[id-1].tickets_sold}</span><p>
    
             <div class="button">
            <button id="by-ticket">Buy Ticket</>
            </div>
             `;
             
             document.querySelector("#film-data").appendChild(filmInfoElement);
         }
      
        

    
    