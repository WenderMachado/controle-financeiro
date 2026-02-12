
function createTransaction(transaction) {
    const cardTransaction = document.createElement(`div`)
    cardTransaction.classList.add(`balance`)
    cardTransaction.id = `transaction-${transaction.id}`

    const client = document.createElement(`span`)
    client.classList.add(`title`)
    client.innerText = transaction.name

    const balance = document.createElement("p")
    balance.classList.add(`title`)
    balance.innerText = `R$ ${transaction.value}` 

    cardTransaction.append(client, balance)
    document.querySelector(`#transactions`).append(cardTransaction)
}


const renderTransactions = async function() {
    const response = await fetch("http://localhost:3000/finatials")
    const data = await response.json()
    data.forEach(createTransaction)
}

document.addEventListener(`DOMContentLoaded`, () => {
  
    renderTransactions()

    const form = document.querySelector('#form') 
    
    form.addEventListener('submit', async (ev) => {
        ev.preventDefault()

        const nameInput = document.getElementById(`name`).value
        const amountInput = document.getElementById('amount').value 

        const newTransaction = {
            name: nameInput,
            value: amountInput 
        }

        try {
            const response = await fetch("http://localhost:3000/finatials", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(newTransaction)
            })

            const savedTransaction = await response.json()

           
            createTransaction(savedTransaction)

     
            form.reset()

        } catch (error) {
            console.log(error)
        }
    })
})