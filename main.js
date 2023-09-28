
document.addEventListener("DOMContentLoaded", function() {
    // switching between profiles --> BUTTON
    const profileButton = document.querySelector("#profile-button")
    const publicProfile = document.querySelector("#publicProfile")
    const adminProfile = document.querySelector("#adminProfile")
    const newPartyButton = document.querySelector("#new-party-button")
    
    adminProfile.style.display = "none"

    profileButton.addEventListener("click", function() {
        if (adminProfile.style.display == "none") {
            publicProfile.style.display = "none"
            adminProfile.style.display = "block"
        } else {
            adminProfile.style.display = "none"
            publicProfile.style.display = "block"   
        }
    })
    // creating new parties --> BUTTON
    newPartyButton.addEventListener("click", function() {
        const titleInput = document.getElementById("title").value
        const dateInput = document.getElementById("date").value
        const timeInput = document.getElementById("time").value
        const locationInput = document.getElementById("location").value
        const descriptionInput = document.getElementById("description").value
        const categoryInput = document.getElementById("category").value
        const priceInput = document.getElementById("price").value
        const seatsInput = document.getElementById("seats").value
        
        const data = {
            title: titleInput,
            date: dateInput,
            time: timeInput,
            location: locationInput,
            description: descriptionInput,
            category: categoryInput,
            price: priceInput,
            seats: seatsInput
        }

        fetch("save.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            console.log("Response:", result)
            if (result.saved) {
                console.log("data inserted successfuly")
            } else {
                console.log("error inserting data")
            }
        }) 
        .catch(error => {
            console.error("Error: ", error)
        })

    })

    // ---------------------------------------------------------------------------------------- // 

    function create(tag, text=null, container) {
        let el = document.createElement(tag)
        if (text)
            el.appendChild(document.createTextNode(text))
        container.appendChild(el)
        return el
    }

    function isPartyPastOrUpcoming(party) {
        function formatDate(inputDateStr) { // Turns Date() object into YYYY-MM-DD format
            const inputDate = new Date(inputDateStr);
            const year = inputDate.getFullYear();
            const month = String(inputDate.getMonth() + 1).padStart(2, "0");
            const day = String(inputDate.getDate()).padStart(2, "0");
            
            return `${year}-${month}-${day}`;
        }
        function compareDates(dateStr1, dateStr2) { // Compares dates of YYYY-MM-DD format
            const date1 = new Date(dateStr1);
            const date2 = new Date(dateStr2);

            const formattedDate1 = date1.toISOString().split("T")[0];
            const formattedDate2 = date2.toISOString().split("T")[0];
        
            return formattedDate1 < formattedDate2
        }

        const currentDate = new Date();

        return compareDates(formatDate(currentDate), party.date)
    }

    const upcomingPartiesContainer = document.querySelector("#upcoming-parties")
    const previousPartiesContainer = document.querySelector("#previous-parties")

    fetch("load.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(party => {
                if (isPartyPastOrUpcoming(party)) {
                    let tr = create("tr", null, upcomingPartiesContainer)
                    create("td", party.title, tr)
                    create("td", party.date, tr)
                    create("td", party.time, tr)
                    create("td", party.location, tr)
                    create("td", party.description, tr)
                    create("td", party.category, tr)
                    create("td", party.price, tr)
                    create("td", party.seats, tr)
                } else {
                    let tr = create("tr", null, previousPartiesContainer)
                    create("td", party.title, tr)
                    create("td", party.date, tr)
                    create("td", party.time, tr)
                    create("td", party.location, tr)
                    create("td", party.description, tr)
                    create("td", party.category, tr)
                    create("td", party.price, tr)
                    create("td", party.seats, tr)
                }
            })
        })
})

