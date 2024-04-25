<?php
function getLiveWeatherMap($city, $apiKey) {
    $url = "http://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey";
    $data = json_decode(file_get_contents($url), true);

    if ($data) {
        $lat = $data['coord']['lat'];
        $lon = $data['coord']['lon'];
        $mapUrl = "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat=$lat&lon=$lon&zoom=8";
        return '<iframe src="' . $mapUrl . '" width="100%" height="400"></iframe>';
    } else {
        return 'We konden geen weerinformatie vinden voor deze locatie.';
    }
}
$city = 'Sliedrecht'; 
$apiKey = '49dda0c6d525a40193428007fe69fed2'; 
echo getLiveWeatherMap($city, $apiKey);
?>
