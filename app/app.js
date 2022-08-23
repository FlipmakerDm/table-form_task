const tbody = document.querySelector('.tbody');

function uuid() {
  const id = Math.floor(Math.random() * 1_000_000_000);
  return id.toString(36);
}

function createRow() {
  const newTr = document.querySelector('#row-1');

  const id = 'row-' + uuid();

  const newRow = document.createElement('div');

  newRow.innerHTML = newTr.innerHTML;
  newRow.setAttribute('id', id);
  newRow.classList.add('trow');

  const required = newRow.querySelectorAll('.required');
  required.forEach((field) => {
    field.classList.remove('required');
  });

  const btn = newRow.querySelector('button');

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (tbody.children.length > 1) {
      removeRow(id);
    }
  });

  return newRow;
}

function removeRow(id) {
  const row = document.querySelector(`#${id}`);

  row.remove();
}

function validation() {
  let res = true;
  const validationFields = document.querySelectorAll('[data-validation]');
  for (const field of validationFields) {
    if (field.value.trim() === '') {
      field.classList.add('required');
      res = false;
    } else field.classList.remove('required');
  }
  return res;
}

function modal(str) {
  const btnContainer = document.querySelector('.btn-container');
  if (btnContainer.children.length < 4) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerText = str;
    btnContainer.appendChild(modal);
    setTimeout(() => {
      modal.remove();
    }, 1500);
  }
}

function init() {
  const deleteBtn = document.querySelector('.delete');
  const messageDeleted = document.createElement('div');
  const addBtn = document.querySelector('.add');
  const form = document.querySelector('form');
  const loader = document.querySelector('.lds-facebook ');
  const menuSidebar = document.querySelector('.menu-sidebar_mobile');
  const btnSidebar = document.querySelector('.btn-sidebar');
  const menuBtn = document.querySelector('.btn-menu');

  btnSidebar.addEventListener('click', () => {
    menuSidebar.style.display = 'flex';
    btnSidebar.style.display = 'none';
  });
  menuBtn.addEventListener('click', () => {
    menuSidebar.style.display = 'none';
    btnSidebar.style.display = 'block';
  });

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
  });

  deleteBtn.addEventListener('mouseover', () => {
    const deleteContaner = document.querySelector('.container-btn_delete');

    messageDeleted.classList.add('popup');
    messageDeleted.innerText = 'Нельзя удалить эту строку';
    deleteContaner.appendChild(messageDeleted);
  });

  deleteBtn.addEventListener('mouseout', () => {
    messageDeleted.remove();
  });

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newRow = createRow();
    tbody.appendChild(newRow);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = validation();

    if (!isValid) {
      modal('Заполните поле ввода');
      return;
    }

    const formData = new FormData(form);
    const data = Array.from(formData.entries());
    const result = {};

    data.forEach(([key, value]) => {
      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(value);
      e.target.reset();
    });

    const resultJson = JSON.stringify(result);
    console.log(resultJson);

    try {
      loader.style.display = 'inline-block';
      fetch('app/script.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: resultJson,
      }).then((res) => {
        loader.style.display = 'none';
        modal('Данные отправлены');
      });
    } catch (e) {
      console.log(e);
    }
  });
}

init();
