const dropList = document.querySelectorAll('.drop-list select'),
    fromCurrency = document.querySelector('.from select'),
    toCurrency = document.querySelector('.to select'),
    getButton = document.querySelector('form button');


for (let i = 0; i < dropList.length; i++) {
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
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


    if (fromCurrency.value === toCurrency.value) {
        return exchangeRateTxt.innerText = "No se puede cambiar la misma moneda";
    }

    exchangeRateTxt.innerText = "Calculando el cambio ...";
    let url = `https://dollar-bcv-query.herokuapp.com/dollar-bcv/`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = 1 / result.precio;
        let totalExchangeRate;
        if (fromCurrency.value == 'USD') {
            totalExchangeRate = (amountVal / exchangeRate).toFixed(2);
        } else {
            totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        }
        exchangeRateTxt.innerHTML = `Cambio total: <br/> ${amountVal} ${fromCurrency.value} = <input id='data' type='text' class='results' value='${totalExchangeRate}'> ${toCurrency.value} <button id='copy' class='copy-results'> Copiar resultado</button>`;
        document.querySelector("#copy").addEventListener("click", copy);
    }).catch(() => {
        exchangeRateTxt.innerText = "Algo no esta funcionando";
    });
}

function copy() {
    var copyText = document.querySelector("#data");
    copyText.select();
    document.execCommand("copy");
    let advise = document.querySelector('.copy-results');
    advise.innerHTML = 'Monto copiado exitosamente';
}
