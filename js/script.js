document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const unitToggle = document.getElementById('unitToggle');
    const currentTemperature = document.getElementById('currentTemperature');

    searchButton.addEventListener('click', function() {
        const location = searchInput.value;
        const units = unitToggle.value;

        fetch(`../php/weather.php?location=${location}&units=${units}`)
            .then(response => response.json())
            .then(data => {
                currentTemperature.textContent = `Temperatuur: ${data.main.temp} °${units === "metric" ? "C" : "F"}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
});
