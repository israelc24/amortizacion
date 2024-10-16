const fecha = document.getElementById('fecha');
const monto = document.getElementById('monto');
const tiempo = document.getElementById('tiempo');
const periodo = document.getElementById('periodo');
const interes = document.getElementById('interes');
const calcFrances = document.getElementById('calcFrances');
const calcAleman = document.getElementById('calcAleman');
const calcAmerican = document.getElementById('calcAmerican');
const alerta = document.getElementById('alert-error');
const llenarTabla = document.querySelector('#lista-tabla tbody');

calcAleman.addEventListener('click', () => {
    let nrocuota = periodo.value*tiempo.value;
    if (monto.value === '' || periodo.value === '' || interes.value === '') {
        alerta.hidden = false;
        setTimeout(() => {
            alerta.hidden = true;
        }, 2000);
    } else {
        calcularCronogramaAle(fecha.value, monto.value, interes.value, nrocuota, 360/periodo.value);
    }
});

function calcularCronogramaAle(fecha, monto, interes, periodo, intervalo) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let mesActual = dayjs(fecha).add(intervalo, 'days');
    let amortizacionConstante, pagoInteres, cuota;
    amortizacionConstante = monto / periodo;
    for (let i = 1; i <= periodo; i++) {
        // pagoInteres = monto * (interes / 100);
        pagoInteres = monto * interes * intervalo / 36000;
        cuota = amortizacionConstante + pagoInteres;
        monto = monto - amortizacionConstante;

        fecha = mesActual.format('DD-MM-YYYY');
        mesActual = mesActual.add(intervalo, 'days');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${fecha}</td>
            <td>${amortizacionConstante.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row);  
    }
}


calcAmerican.addEventListener('click', () => {
    let nrocuota = periodo.value*tiempo.value;
    if (monto.value === '' || periodo.value === '' || interes.value === '') {
        alerta.hidden = false;
        setTimeout(() => {
            alerta.hidden = true;
        }, 2000);
    } else {
        calcularCronogramaAme(fecha.value, monto.value, interes.value, nrocuota, 360/periodo.value);
    }
});

function calcularCronogramaAme(fecha, monto, interes, periodo, intervalo) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let mesActual = dayjs(fecha).add(intervalo, 'days');
    let amortizacionConstante = 0;
    let pagoInteres = monto * interes * intervalo / 36000;;
    let cuota = pagoInteres;
    amortizacionConstante = 0;
    let i = 1;
    for (i; i < periodo; i++) {
        cuota = amortizacionConstante + pagoInteres;
        monto = monto - amortizacionConstante;

        fecha = mesActual.format('DD-MM-YYYY');
        mesActual = mesActual.add(intervalo, 'days');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${fecha}</td>
            <td>${amortizacionConstante.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row);
    }
    amortizacionConstante = monto;
    cuota = amortizacionConstante + pagoInteres;
    monto = monto - amortizacionConstante;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${i}</td>
        <td>${fecha}</td>
        <td>${amortizacionConstante.toFixed(2)}</td>
        <td>${pagoInteres.toFixed(2)}</td>
        <td>${cuota.toFixed(2)}</td>
        <td>${monto.toFixed(2)}</td>
    `;
    llenarTabla.appendChild(row);
}



calcFrances.addEventListener('click', () => {
    if (monto.value === '' || periodo.value === '' || interes.value === '') {
        alerta.hidden = false;
        setTimeout(() => {
            alerta.hidden = true;
        }, 2000);
    } else {
        calcularCronogramaFra(fecha.value, monto.value, interes.value, periodo.value, tiempo.value, 360/periodo.value);
    }
});

function calcularCronogramaFra(fecha, monto, interes, periodo, tiempo, intervalo) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let mesActual = dayjs(fecha).add(intervalo, 'days');
    let amortizacion, pagoInteres;
    console.log(periodo);
    console.log(intervalo);
    j = periodo * tiempo;
    let cuota = (monto * interes / 100 / periodo) / ( 1 - Math.pow(1 + (interes / 100 / periodo), -j));
    for (let i = 1; i <= j; i++) {
        pagoInteres = monto * interes * intervalo / 36000;
        amortizacion = cuota - pagoInteres;
        // cuota = amortizacion + pagoInteres;
        monto = monto - amortizacion;

        fecha = mesActual.format('DD-MM-YYYY');
        mesActual = mesActual.add(intervalo, 'days');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${fecha}</td>
            <td>${amortizacion.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row);  
    }
}