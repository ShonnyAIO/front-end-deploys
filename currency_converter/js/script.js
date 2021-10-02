const dropList = document.querySelectorAll('.drop-list select'),
    fromCurrency = document.querySelector('.from select'),
    toCurrency = document.querySelector('.to select'),
    getButton = document.querySelector('form button');
const apiKey = 'a7cf5c4aa2f2517477a4bd7c2b6f1595';
for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_list) {
        var selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : '';
        } else if (i == 1) {
            selected = currency_code == "NPR" ? "selected" : '';
        }
        let optionFlag = `<option value='${currency_code}'>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML('beforeend', optionFlag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    })
}

window.addEventListener("onload", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener("click", () => {
    let temCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function loadFlag(element) {
    for (code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://www.countryflags.io/${country_list[code]}/flat/64.png`;
        }
    }
}


function getExchangeRate() {
    const amount = document.querySelector(".amount input"),
        exchangeRateTxt = document.querySelector('.exchange-rate');
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&base=${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    });
}