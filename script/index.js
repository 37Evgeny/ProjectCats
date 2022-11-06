const cardsContainer = document.querySelector('.cards');
const btnOpenPopup= document.querySelector('#add');
const btnOpenAuthorization= document.querySelector('#login');
const formCatAdd = document.querySelector('#popup-form-cat');
const formAuthorization = document.querySelector('#form-login');

function serializeForm(elem){
    const formData ={};
    elem.forEach(input =>{
        if(input.type === 'submit') return;
        if(input.type !== 'checkbox') {
            formData[input.name]= input.value;
        }
        if(input.type === 'checkbox') {
            formData[input.name]= input.checked;
        }
    })
    return formData;
}


// Функция добавления котика на страницу
function formAddCat(event){
    event.preventDefault();
    const elementsFormCat = [...formCatAdd.elements];
    const dataFromForm = serializeForm(elementsFormCat);
    // добавление котика на сервер
    api.addNewCat(dataFromForm)
        .then(()=>{
            const cardInst = new Card(dataFromForm, '#card-template');
            const newCardElem= cardInst.getElement();
            cardsContainer.append(newCardElem);
            //  закрытие popup
            AddCat.close();
        })
}

//Функция Авторизации
function formFromAuthorization(event){
    event.preventDefault();
    const elementsFormAuthorization = [...formAuthorization.elements];
    const dataFromForm = serializeForm(elementsFormAuthorization);
    Cookies.set('email', `email=${dataFromForm.email}`)
    // удаляем скрытие с кнопки добавления котика
    btnOpenPopup.classList.remove('visually-hidden')
    // закрываем окно авторизации 
    authorization.close();
}


// Получили всех котиков с сервера и отрендерили на странице
api.getAllCats()
    //  {data} получить данные по ключю
    .then(({data})=>{
        // Перебираем массив с котиками
        data.forEach(function(dataCat){
            // Создаем карточу
            const cardInst = new Card(dataCat, '#card-template');
            // Возвращаем разметку
            const newCardElem= cardInst.getElement();
            // Добавляем на страницу  
            cardsContainer.append(newCardElem);
        }) 
    })


// Вызов модельного окна для добавления котика
const AddCat = new Popup('popup-add-cats')
AddCat.setEventListener()
btnOpenPopup.addEventListener('click',()=>  AddCat.open());
formCatAdd.addEventListener('submit', formAddCat)

// Вызов модельного окна авторизации
const authorization = new Popup('authorization')
authorization.setEventListener()
btnOpenAuthorization.addEventListener('click',()=>  authorization.open());
formAuthorization.addEventListener('submit', formFromAuthorization)

const auth = Cookies.get('email');


if(!auth){
    authorization.open();
    // вешаем ласс скрытия на кнопку добавления котика
    btnOpenPopup.classList.add('visually-hidden')
}
