import $ from 'jquery';

export default function () {
    if (localStorage.getItem("shp-country")) {

    } else {                    
        fetch(`https://www.cloudflare.com/cdn-cgi/trace`)
        .then(r=>r.text())
        .then(data=> {
            data = data.trim().split('\n').reduce(function(obj, pair) {
                pair = pair.split('=');
                return obj[pair[0]] = pair[1], obj;
            }, {});                    
            if (data.loc) {
                localStorage.setItem("shp-country", data.loc);

                if (data.loc == 'ES') {
                    setTimeout(function () {
                        $('.popup-country').css({ display: 'flex' });
                        $('.popup-country-title').append('Selecciona tu ubicación');
                        $('.popup-country-main').append(
                            "Parece que nos visitas desde España.<br/>Puedes visitar nuestra página web en España para precios locales y opciones de envío."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/es.svg><span>España</span>")
                        $('.popup-country-lang').append("ESPAÑOL")
                        $('.popup-country-lang').attr('href', '//superhairpieces.es');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/ca.svg><span>Canada</span>")
                        $('.popup-country-lang2').append("ENGLISH")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.ca');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                } else if (data.loc == 'FR') {
                    setTimeout(function () {
                        $('.popup-country').css({ display: 'flex' });
                        $('.popup-country-title').append('CHOISISSEZ VOTRE EMPLACEMENT');
                        $('.popup-country-main').append(
                            "Il semble que vous nous rendiez visite depuis la France.<br/>Vous pouvez consulter notre site web en France pour les prix en Euros et les options d'expédition locales."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/fr.svg><span>France</span>")
                        $('.popup-country-lang').append("FRANÇAIS")
                        $('.popup-country-lang').attr('href', '//superhairpieces.fr');
                        $('.popup-country-lang1').append("ENGLISH")
                        $('.popup-country-lang1').attr('href', '//en.superhairpieces.fr');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/ca.svg><span>Canada</span>")
                        $('.popup-country-lang2').append("ENGLISH")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.ca');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                } else if (data.loc == 'NL') {
                    setTimeout(function () {


                        $('.popup-country').css({ display: 'flex' });
                        $('.popup-country-title').append('kies je locatie');
                        $('.popup-country-main').append(
                            "Het lijkt erop dat u ons vanuit Nederland bezoekt.<br/>U kunt onze Nederlandse website bezoeken voor lokale prijzen en verzendopties."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/nl.svg><span>Nederland</span>")
                        $('.popup-country-lang').append("DEUTSCH")
                        $('.popup-country-lang').attr('href', '//superhairpieces.nl');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/ca.svg><span>Canada</span>")
                        $('.popup-country-lang2').append("ENGLISH")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.ca');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                } else if (data.loc != 'CA') {
                    setTimeout(function () {                            
                        $('.popup-country').css({ display: 'flex' });
                        $('.popup-country-title').append('Choose your location');
                        $('.popup-country-main').append(
                            "Are you visiting Superhairpieces.ca from outside Canada?<br/>Visit our official global site for more relevant pricing, promotions and events."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/us.svg><span>United States</span>")
                        $('.popup-country-lang').append("ENGLISH")
                        $('.popup-country-lang').attr('href', '//superhairpieces.com');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/ca.svg><span>Canada</span>")
                        $('.popup-country-lang2').append("ENGLISH")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.com');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                } 
    
            }
        })
        .catch(e=>console.log(e));
    }     


}
