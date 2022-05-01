let current_budget;
let out_budget;
let set_budget;
let current_cost;
let out_spent;
let out_limit;
let set_current_info;
let current_item;
let table;
let store;
let clear_list_info;
let from;
let to;

document.addEventListener("DOMContentLoaded", () => {
    current_budget = document.querySelector('#current_budget');
    out_budget = document.querySelector('.out_budget');
    set_budget = document.querySelector('.set_budget');
    current_cost = document.querySelector('#current_cost');
    out_spent = document.querySelector('.out_spent');
    out_limit = document.querySelector('.out_limit');
    set_current_info = document.querySelector('.set_current_info');
    current_item = document.querySelector('#current_item');
    table = document.querySelector('table');
    clear_list_info = document.querySelector('.clear_list_info');
    from = document.querySelector('#from');
    to = document.querySelector('#to');
    from.innerHTML = 'начало'

    store = load();
    initDateInputs();
    updateInfo();
    set_budget.onclick = setBudget_click;
    set_current_info.onclick = setCurrentInfo_click;
    clear_list_info.onclick = clearListInfo_click;
    createStory();
    to.onchange = updateInfo;
    from.onchange = updateInfo;



});

function updateInfo() {
    out_budget.textContent = store.budget;
    out_spent.textContent = store.spent;
    out_limit.textContent = store.budget - store.spent;
    from.setAttribute('max', to.value);
    to.setAttribute('min', from.value);
    to.setAttribute('max', DateToString(new Date()));
    let tr = `<tr><th>дата</th><th>наименование</th><th>стоимость</th></tr>`;
    for (let i = 0; i < store.story.length; i++) {
        if (Date.parse(store.story[i].date) >= Date.parse(from.value) &&
            Date.parse(store.story[i].date) <= Date.parse(to.value)) {
            tr += `<tr>
                    <td>${store.story[i].date}</td>
                    <td>${store.story[i].name}</td>
                    <td>${store.story[i].price}</td>
                </tr>`;
        }
    }
    table.innerHTML = tr;

}

function load() {
    let ls = localStorage.getItem('budget');
    if (ls !== null) {
        return JSON.parse(ls);
    }
    return {
        budget: 0.0,
        spent: 0.0,
        story: [],
    }
}

function save() {
    localStorage.setItem('budget', JSON.stringify(store));
}

function setBudget_click() {
    store.budget = parseFloat(current_budget.value.replace(',', '.'));
    store.spent = 0.0;
    current_budget.value = '';
    updateInfo();
    save();
}

function DateToString(date) {
    let month = "0" + date.getMonth();
    let day = '0' + date.getDate();
    return `${date.getFullYear()}-${month.substring(0, 2)}-${day.substring(0, 2)}`
}

function setCurrentInfo_click() {
    let price = parseFloat(current_cost.value.replace(',', '.'));
    store.spent += price;
    var now = new Date();
    var date = DateToString(now);
    store.story.push({ 'name': current_item.value, 'price': price, 'date': date });
    updateInfo();
    save();
    current_cost.value = '';
    current_item.value = '';
}

function clearListInfo_click() {
    store.story.length = 0;
    updateInfo();
    save();
}

function initDateInputs() {
    let date = new Date();
    to.value = DateToString(date);
    date.setDate(date.getDate() - 30);
    from.value = DateToString(date);
}

function createStory() {
    store.story.push({ 'name': 'may', 'price': 123, 'date': '2022-05-01' });
    store.story.push({ 'name': 'april', 'price': 456, 'date': '2022-04-05' });
    store.story.push({ 'name': 'april', 'price': 123, 'date': '2022-04-15' });
    store.story.push({ 'name': 'april', 'price': 456, 'date': '2022-04-25' });
    store.story.push({ 'name': 'march', 'price': 456, 'date': '2022-03-05' });
    store.story.push({ 'name': 'march', 'price': 123, 'date': '2022-03-15' });
    store.story.push({ 'name': 'march', 'price': 456, 'date': '2022-03-25' });
    updateInfo();
}


