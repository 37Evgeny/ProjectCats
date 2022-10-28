const cardsContainer = document.querySelector('.cards')
const btnOpenPopup= document.querySelector('#add');
const formCatAdd = document.querySelector('#popup-form-cat')

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

function formAddCat(event){
    event.preventDefault();
    const elementsFormCat = [...formCatAdd.elements];
    const dataFromForm = serializeForm(elementsFormCat);

    const cardInst = new Card(dataFromForm, '#card-template');
    const newCardElem= cardInst.getElement();
    cardsContainer.append(newCardElem);

    AddCat.close();
}

cats.forEach(function(dataCat){
    const cardInst = new Card(dataCat, '#card-template');
    const newCardElem= cardInst.getElement();
    cardsContainer.append(newCardElem);
})

const AddCat = new Popup('popup-add-cats')

AddCat.setEventListener()

btnOpenPopup.addEventListener('click',()=>  AddCat.open());

formCatAdd.addEventListener('submit', formAddCat)
