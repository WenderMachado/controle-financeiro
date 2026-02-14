let editingId = null
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

   const deleteBtn = document.createElement('button')
   const editBtn = document.createElement('button')

        deleteBtn.classList.add('deleteBtn')
        deleteBtn.innerText='DELETE'
        editBtn.classList.add('editBtn')
        editBtn.innerText = "EDIT"

   deleteBtn.addEventListener('click', async (ev)=>{
   ev.preventDefault()
   const id = transaction.id
try{
   const response = await fetch(`http://localhost:3000/finatials/${id}`, {
      method: "DELETE",
      headers: {
      'Content-Type': 'application/json'
   }
   })
   
   if (response.ok) {
      cardTransaction.remove()
      console.log('Recurso deletado com sucesso!');
    } else {
      console.error('Erro ao tentar deletar:');
    }
   
   }catch(error){
      console.error('Erro de rede ou na requisição:')
}

   })


editBtn.addEventListener('click', (ev) => {
        ev.preventDefault()
        
        // 1. Preenche os inputs do formulário com os dados atuais
        document.querySelector('#name').value = transaction.name
        document.querySelector('#amount').value = transaction.value
        
        // 2. Guarda o ID na variável global para usarmos depois
        editingId = transaction.id
        
        // Opcional: Rola a página para o topo (se a lista for longa)
        window.scrollTo(0, 0)
    })

    cardTransaction.append(client, balance, deleteBtn, editBtn)
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

            if(editingId){
               const response = await fetch(`http://localhost:3000/finatials/${editingId}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTransaction)
                })
                const updatedTransaction = await response.json()

                document.getElementById(`transaction-${editingId}`).remove()
                
                createTransaction(updatedTransaction)

                editingId = null
            }else{
                const response = await fetch("http://localhost:3000/finatials", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(newTransaction)
            })

               const savedTransaction = await response.json()
               createTransaction(savedTransaction)
           
            }
               form.reset()

        } catch (error) {
            console.log(error)
        }
    })
})

