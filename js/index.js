// - When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// - Above your list of monsters, you should have a form to create a new monster.
//   You should have fields for name, age, and description, and a 'Create Monster
//   Button'. When you click the button, the monster should be added to the list
//   and saved in the API.
// - At the end of the list of monsters, show a button. When clicked, the button
//   should load the next 50 monsters and show them.
//send request to http://localhost:3000/monsters/?_limit=20&_page=1

// forEach to show each data of each monster


document.addEventListener("DOMContentLoaded", () => {

    fetchMonster()
    createForm()
    let form = document.querySelector('#monster-form')
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let name = document.querySelector('#monster-name').value
        let age = document.querySelector('#monster-age').value
        let description = document.querySelector('#monster-description').value

        monsterObj = {
            name,
            age: parseInt(age),
            description
        }

        console.log(parseInt(age))

        postNewMonster({name, age, description}, event)
    })
    //console.log("DOM form", form)
})

const createForm = () => {
    let formContainer = document.getElementById('create-monster')

    //console.log("Form Container", formContainer)
    let form = document.createElement('form')
    form.id = 'monster-form'
    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')
    let ageInput = document.createElement('input')
    let ageLabel = document.createElement('label')
    let descriptionInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    button.innerText = "Make Monster"
    nameInput.id = "monster-name"
    ageInput.id = "monster-age"
    descriptionInput.id = "monster-description"

    h2.innerHTML = 'Create a Monster!'
    nameLabel.innerText = 'name'
    ageLabel.innerText = 'age'
    descriptionLabel.innerText = 'description'

    form.append(nameLabel, " ", nameInput, " ", ageLabel, " ", ageInput, " ", descriptionLabel, " ", descriptionInput, " ", button)
    formContainer.append(h2, form)
}



const postNewMonster = ({name, age, description}, event) => {
    event.preventDefault()
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },

        body:
            JSON.stringify({ name, age, description })
    })
        .then(response => response.json())
        .then(monster => {
            addMonster(monster)
            event.target.reset()
        
        })
}

function fetchMonster() {
    //console.log(monContainer)

    fetch("http://localhost:3000/monsters/?_limit=20&_page=1") //first promise
        .then(response => response.json())
        .then(monsterData => {
            //console.log(monsterData)

            monsterData.forEach((monster) => {
                addMonster(monster)
            })


        });
}

function addMonster(monster) {
    let monContainer = document.getElementById("monster-container")

    let monCard = document.createElement("div")
    let monName = document.createElement("h2")
    let monAge = document.createElement("h4")
    let description = document.createElement("p")
    monName.innerText = monster.name
    monAge.innerText = `Age: ${monster.age}`
    description.innerText = `Bio: ${monster.description}`

    //console.log(monster.age)

    monCard.append(monName, monAge, description)
    monContainer.append(monCard)
}


//})
