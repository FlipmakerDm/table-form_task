const tbody = document.querySelector('.tbody');
const newTr = document.querySelector('#row-1');
const addBtn = document.querySelector('.add');
const form = document.querySelector('form');
let deleteContaner = document.querySelector('.container-btn_delete');
const deleteBtn = document.querySelector('.delete');
const message = document.createElement('div');

function uuid() {
  const id = Math.floor(Math.random() * 1_000_000_000);
  return id.toString(36);
}

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
});

deleteBtn.addEventListener('mouseover', () => {
  message.classList.add('popup');
  message.innerText = 'Нельзя удалить эту строку';
  deleteContaner.appendChild(message);
});
deleteBtn.addEventListener('mouseout', () => {
  message.remove();
});

function createRow() {
  const id = 'row-' + uuid();

  const newRow = document.createElement('div');

  newRow.innerHTML = newTr.innerHTML;
  newRow.setAttribute('id', id);
  newRow.classList.add('trow');

  let btn = newRow.querySelector('button');

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (tbody.children.length > 1) {
      removeRow(id);
    } else {
      console.log('attention');
    }
  });

  return newRow;
}

function removeRow(id) {
  const row = document.querySelector(`#${id}`);

  row.remove();
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const newRow = createRow();

  tbody.appendChild(newRow);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Array.from(formData.entries());
  const result = {};
  data.forEach(([key, value]) => {
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
  });

  const json = JSON.stringify(result);
  console.log(json);
});
