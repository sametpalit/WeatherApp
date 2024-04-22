<?php
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["location"])) {
    $location = urlencode($_GET["location"]);
    $units = isset($_GET["units"]) ? $_GET["units"] : "metric"; 

    $apiKey = "49dda0c6d525a40193428007fe69fed2"; 
    $url = "https://api.openweathermap.org/data/2.5/weather?q=$location&units=$units&appid=$apiKey";

    $response = file_get_contents($url);
    echo $response;
}
?>
