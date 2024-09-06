const names = []; // Array para armazenar os nomes

const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const sortButton = document.getElementById('sortButton');
const reverseButton = document.getElementById('reverseButton');

// Função para adicionar nome ao array e atualizar a lista
nameForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
        names.push(name); // Usando PUSH para adicionar o nome ao array
        updateNameList();
        nameInput.value = '';
    }
});

// Função para ordenar os nomes em ordem alfabética
sortButton.addEventListener('click', function() {
    names.sort(); // Usando SORT para ordenar o array
    updateNameList();
});

// Função para reverter a ordem dos nomes
reverseButton.addEventListener('click', function() {
    names.reverse(); // Usando REVERSE para reverter o array
    updateNameList();
});

// Função para atualizar a lista de nomes na tela
function updateNameList() {
    nameList.innerHTML = ''; // Limpa a lista
    names.forEach((name, index) => {
        const li = document.createElement('li');
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = name;
        li.appendChild(nameSpan);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            if (editButton.textContent === 'Editar') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = name;
                li.insertBefore(input, nameSpan);
                li.removeChild(nameSpan);
                editButton.textContent = 'Salvar';
            } else {
                const input = li.querySelector('input[type="text"]');
                const newName = input.value.trim();
                if (newName) {
                    names[index] = newName;
                    nameSpan.textContent = newName;
                    li.insertBefore(nameSpan, input);
                    li.removeChild(input);
                    editButton.textContent = 'Editar';
                }
            }
        });
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            names.splice(index, 1); // Remove o nome do array
            updateNameList();
        });
        li.appendChild(deleteButton);

        nameList.appendChild(li);
    });
}