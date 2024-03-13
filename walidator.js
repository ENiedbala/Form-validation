// wszystkie pola powinny byc wypełnione
// po kliknięciu wyczyść wszystkie elementu inputów powinny zostać usunięte
// po kliknięciu wyślij powinno pojawić się okno popup a wszystkie inputy stają się nieaktywne
//  klikając na zamknij popup powiniez zniknąc
const clearButton = document.querySelector('.clear');
const sendButton = document.querySelector('.send');
const closeButton = document.querySelector('.close');

const Username = document.querySelector('#username');

const password = document.querySelector('#password');
const passwordRepeat = document.querySelector('#passwordRepeat');
const emailadress = document.querySelector('#emailadress');
const Popup = document.querySelector('.popup');
const formBox = document.querySelector('.formBox');
const errorText = document.querySelector('.errorText');
const inputTab = [Username, password, passwordRepeat, emailadress];
const clearAll = () => {
	inputTab.forEach(el => {
		el.value = '';
	});
};
const addmsg = (input, msg) => {
	const parentOfelement = input.parentElement;
	const errormsg = parentOfelement.querySelector('.errorText');
	parentOfelement.classList.add('error');
	errormsg.textContent = msg;
};

const clearErr = input => {
	const parentOfelement = input.parentElement;
	parentOfelement.classList.remove('error');
};
const checkPassword = (pass, pass2) => {
	if (pass.value !== pass2.value) {
		addmsg(passwordRepeat, 'Hasła są różne');
	}
};
const checkEmail = emailadress => {
	const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
	if (reg.test(emailadress.value)) {
		clearErr(emailadress);
	} else {
		addmsg(emailadress, 'Adres e-mail jest niepoprawny');
	}
};
const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			addmsg(el, el.placeholder);
		} else {
			clearErr(el);
		}
	});
};
const checkLength = (input, min) => {
	if (input.value.length < min) {
		addmsg(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} musi składac się z min ${min} znaków`
		);
	}
};
clearButton.addEventListener('click', e => {
	e.preventDefault();
	clearAll();
	document.querySelectorAll('.formBox').forEach(el => {
		el.classList.remove('error');
	});
});

const errorCount = () => {
	const errCount = 0;
	const formBoxAll = document.querySelectorAll('.formBox');
	formBoxAll.forEach(el => {
		if (el.classList.contains('error')) {
			errCount++;
		}
	});
	if (errCount === 0) {
		Popup.classList.add('showPopup');
		clearAll();
	}
};

sendButton.addEventListener('click', e => {
	e.preventDefault();
	checkForm(inputTab);
	checkLength(Username, 3);
	checkLength(password, 8);
	checkPassword(password, passwordRepeat);
	checkEmail(emailadress);
	errorCount();
});
