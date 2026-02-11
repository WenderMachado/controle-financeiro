 function createTransaction(transactions){
    const cardTransaction = document.createElement(`div`)
    cardTransaction.classList.add(`balance`)
    cardTransaction.id = (`transaction-${transactions.id}`)

    const client = document.createElement(`span`)
    client.classList.add(`title`)
    client.innerText = `${transactions.name}`

    cardTransaction.append(client)
    document.querySelector(`#transactions`).append(cardTransaction)
 }

 const renderTransactions = async function(){
   
    const response = await fetch("http://localhost:3000/finatials")
    const data = await response.json()

      data.forEach(createTransaction)
 }

 document.addEventListener(`DOMContentLoaded`, ()=>{
    renderTransactions()
})