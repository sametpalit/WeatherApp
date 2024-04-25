document.addEventListener("DOMContentLoaded", function() {
    let isCelsius = true;

    const unitToggleBtn = document.querySelector(".unit-toggle-btn");
    unitToggleBtn.addEventListener("click", toggleUnit);

    function toggleUnit() {
        const temperatureElements = document.querySelectorAll(".temperature-value");
        const unitElements = document.querySelectorAll(".unit");

        temperatureElements.forEach(element => {
            const currentTemp = parseFloat(element.textContent);
            if (isCelsius) {
                element.textContent = convertToFahrenheit(currentTemp);
                unitElements.forEach(unitElement => unitElement.textContent = "°F");
            } else {
                element.textContent = convertToCelsius(currentTemp);
                unitElements.forEach(unitElement => unitElement.textContent = "°C");
            }
        });

        isCelsius = !isCelsius;
    }

    function convertToFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    function convertToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }
});