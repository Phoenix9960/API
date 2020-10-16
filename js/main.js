function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const difficult = document.getElementById('questions-difficult').value
    const type = document.getElementById('questions-type').value
    const category = document.getElementById('questions-category').value
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&difficulty=${difficult}&type=${type}&category=${category}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}
function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach((question,index) => {
        const card = returnCardHTML(question,index);
        container.innerHTML += card;
    });
    // poner las preguntas en mi página web
}
function getCategoires() {
    fetch(`https://opentdb.com/api_category.php`)
    //.then(response => {console.log(response)}) // --> ver el arreglo
    .then(response => response.json())
    .then(data => returnCategoriesHTML(data.trivia_categories)) //console.log(data.trivia_categories)) //printCategories(data.trivia_categories))
}
//Categorias
function returnCategoriesHTML(c) {
    const container = document.getElementById('category');
    const select = `<div class="form-group">
                    <label for="questions-category">Eige una categoria</label>
                    <select onchange="getQuestions()" class="form-control" id="questions-category">
                    ${retunrOptions(c)}
                    </select>
                </div>`
    container.innerHTML = select;
}
function retunrOptions(categories){
    let options = '';
    categories.forEach((category) => {
        options += `<option value="${category.id}">${category.name}</option>`;
    })
    return options;
}

// ERICK CODE
function returnCardHTML(q,indexCard) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer,q.incorrect_answers, indexCard)}           
                    </div>
                </div>`
    return card;
}


function returnAnswersHTML(correct, incorrects,questionId) {
    // const correctHTML = `<div class="form-check">
    //                         <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
    //                         <label class="form-check-label" for="exampleRadios1">
    //                         ${correct}
    //                         </label>
    //                     </div>`;

    incorrects.push(correct)
    incorrects.sort(() => Math.random() - 0.5)
    let incorrectHTML = '';
    incorrects.forEach((incorrect,index) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="answer-${questionId}-${index}" value="option1" checked>
                            <label class="form-check-label" for="answer-${questionId}-${index}">
                            ${incorrect}
                            </label>
                        </div>`;
    })


    return incorrectHTML + `<label>
    Correct Answer: ${correct}
    </label>`
}
getCategoires();