const MAX_LENGTH_TITLE = 100;
const MIN_LENGTH_TITLE = 30;
const MAX_VALUE_PRICE = 100000;
const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const ROOMS = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2' , '1'],
  100: ['0'],
};

const offerForm = document.querySelector('.ad-form');

const pristine = new Pristine( offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
}, true);

const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;

pristine.addValidator(offerForm.getElementById('#title'), validateTitle, `от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`);

const typeField = offerForm.getElementById('#type ');
const priceField = offerForm.getElementById('#price');

const onTypeChange = () => {
  priceField.placeholder = MIN_PRICES[typeField.value];
  pristine.validate(priceField);
};

typeField.addEventListener('change',onTypeChange);

const validatePrice = (value) => value >= MIN_PRICES[typeField.value] && value <= MAX_VALUE_PRICE;

const getPriceErrorMessage = () => `Максимальная цена — ${MAX_VALUE_PRICE} руб, минимальная цена — ${MIN_PRICES[typeField.value]} руб`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const roomsField = offerForm.getElementById('#room_number');
const guestsField = offerForm.getElementById('#capacity');

const validateRooms = () => ROOMS[roomsField.value].includes(guestsField.value);

const getRoomsErrorMessage = () => {
  switch (roomsField.value) {
    case '1':
      return '1 комната для 1 гостя';

    case '2':
      return 'для 1 гостя или 2 гостей';

    case '3':
      return 'для 1, 2 или 3 гостей';

    default:
      return 'не для гостей';
  }
};

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);

const checkFieldset = offerForm.querySelector('.ad-form__element--time');
const checkinField = offerForm.getElementById('#timein');
const checkoutField = offerForm.getElementById('#timeout');

const onCheckChange = (evt) => {
  if (evt.target.id === 'timein') {
    checkoutField.value = checkinField.value;
  } else {
    checkinField.value = checkoutField.value;
  }
};

checkFieldset.addEventListener('change', onCheckChange);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
