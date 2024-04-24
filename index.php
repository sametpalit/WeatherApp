<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />    <title>Weer Applicatie</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js" defer></script>
</head>

<body>
    <header>
        <h1>WEER APPLICATIE</h1>
        <div class="container">
            <div class="weather-input">
                <h3>Voer locatie in</h3>
                <input class="city-input" type="text" placeholder="bv, Rotterdam, Den Haag, Amsterdam">
                <button class="search-btn">Zoek</button>
                <div class="seperator"></div>
                <button class="location-btn">Je locatie</button>
            </div>
            <div class="weather-data">
                <div class="current-weather">
                    <div class="details">
                        <h2>_____ ( _____ )</h2>
                        <h4><i class="fa-solid fa-temperature-three-quarters fa-flip-horizontal fa-xl" style="color: #a0a0d6;"></i>  : __ °C</h4>
                        <h4><i class="fa-solid fa-droplet fa-xl" style="color: #a0a0d6;"></i>  : __%</h4>
                        <h4><i class="fa-solid fa-wind" style="color: #a0a0d6;"></i>  : __ km/h</h4>
                    </div>
                </div>
                <div class="weather-map">
                <h2>Live Weerkaart</h2>
                <?php
                    $city = 'Sliedrecht'; 
                    $apiKey = '49dda0c6d525a40193428007fe69fed2'; 


                    $url = "http://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey";


                    $data = json_decode(file_get_contents($url), true);


                    if ($data) {
                        $lat = $data['coord']['lat'];
                        $lon = $data['coord']['lon'];
                        $mapUrl = "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat=$lat&lon=$lon&zoom=8";
                        echo '<iframe src="' . $mapUrl . '" width="100%" height="400"></iframe>';
                    } else {
                        echo 'We konden geen weerinformatie vinden voor deze locatie.';
                    }
                    ?>
                    </div>
                <div class="days-forecast">
                    <h2>5-dagen voorspelling</h2>
                    <ul class="weather-cards">
                        <li class="card"> 
                            <h3>( _____ )</h3>
                            <h4><i class="fa-solid fa-temperature-three-quarters fa-flip-horizontal fa-xl" style="color: #a0a0d6;"></i>  : __ °C</h4>
                            <h4><i class="fa-solid fa-droplet fa-xl" style="color: #a0a0d6;"></i>  : __%</h4>
                            <h4><i class="fa-solid fa-wind" style="color: #a0a0d6;"></i>  : __ km/h</h4>
                        </li>
                        <li class="card"> 
                            <h3>( _____ )</h3>
                            <h4><i class="fa-solid fa-temperature-three-quarters fa-flip-horizontal fa-xl" style="color: #a0a0d6;"></i>  : __ °C</h4>
                            <h4><i class="fa-solid fa-droplet fa-xl" style="color: #a0a0d6;"></i>  : __%</h4>
                            <h4><i class="fa-solid fa-wind" style="color: #a0a0d6;"></i>  : __ km/h</h4>
                        </li>
                        <li class="card"> 
                            <h3>( _____ )</h3>
                            <h4><i class="fa-solid fa-temperature-three-quarters fa-flip-horizontal fa-xl" style="color: #a0a0d6;"></i>  : __ °C</h4>
                            <h4><i class="fa-solid fa-droplet fa-xl" style="color: #a0a0d6;"></i>  : __%</h4>
                            <h4><i class="fa-solid fa-wind" style="color: #a0a0d6;"></i>  : __ km/h</h4>
                        </li>
                        <li class="card"> 
                            <h3>( _____ )</h3>
                            <h4><i class="fa-solid fa-temperature-three-quarters fa-flip-horizontal fa-xl" style="color: #a0a0d6;"></i>  : __ °C</h4>
                            <h4><i class="fa-solid fa-droplet fa-xl" style="color: #a0a0d6;"></i>  : __%</h4>
                            <h4><i class="fa-solid fa-wind" style="color: #a0a0d6;"></i>  : __ km/h</h4>
                        </li>
                        <li class="card"> 
                            <h3>( _____ )</h3>
                            <h4><i class="fa-solid fa-temperature-three-quarters fa-flip-horizontal fa-xl" style="color: #a0a0d6;"></i>  : __ °C</h4>
                            <h4><i class="fa-solid fa-droplet fa-xl" style="color: #a0a0d6;"></i>  : __%</h4>
                            <h4><i class="fa-solid fa-wind" style="color: #a0a0d6;"></i>  : __ km/h</h4>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    </header>


</body>

</html>