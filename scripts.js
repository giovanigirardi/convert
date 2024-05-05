const USD_QUOTATION = 5.10;
const EUR_QUOTATION = 5.49;
const GBP_QUOTATION = 6.40;

const form = document.querySelector('form');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const footer = document.querySelector('main footer');
const description = document.getElementById('description');
const result = document.getElementById('result');

amount.addEventListener('input', function () {
  const hasCharactersRegex = /\D+/g;

  amount.value = amount.value.replace(hasCharactersRegex, '');
})

form.onsubmit = function (e) {
  e.preventDefault();

  switch (currency.value) {
    case 'USD':
      convertCurrency(amount.value, USD_QUOTATION, '$');
      break;
    case 'EUR':
      convertCurrency(amount.value, EUR_QUOTATION, '€');
      break;
    case 'GBP':
      convertCurrency(amount.value, GBP_QUOTATION, '£');
      break;
  }
}

function convertCurrency(amount, price, symbol) {
  try {
    const total = amount * price;

    if (isNaN(total)) {
      return alert('O valor informado não é válido.');
    }

    const formattedTotalWithoutRS = formatCurrencyBRL(total).replace('R$', '');

    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    result.textContent = `${formattedTotalWithoutRS} Reais`
    footer.classList.add('show-result');
  } catch (error) {
    footer.classList.remove('show-result');

    console.error('Error:', error);
    alert("Não foi possível realizar a conversão. Tente novamente.")
  }
}

function formatCurrencyBRL(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}