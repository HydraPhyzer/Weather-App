// let MyKey=e3e5a6e2101943eb83550323222106;

let Img=document.querySelector('.Icon img');
let Loc=document.querySelector('.City p');
let Con=document.querySelector('.Con p');
let Temp=document.querySelector('.Temp-Con .Temp');
let Status=document.querySelector('.Status p');

let Humi=document.querySelector('.Humi p');
let Rain=document.querySelector('.Rain p');
let Press=document.querySelector('.Press p');
let Wind=document.querySelector('.Wind p');
let Day=document.querySelector('.Day')

const DayOFWeek=(Index)=>
{
    Arr=
    [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    return Arr[Index-1];
};

let Weather=()=>
{
    fetch('http://api.weatherapi.com/v1/forecast.json?key=e3e5a6e2101943eb83550323222106&q=lahore&aqi=no' , {method:'GET' , headers:{Accept:'application.json'}})
    .then((Response)=>
    {
        return Response.json();
    })
    .then((Data)=>
    {
        Loc.innerHTML=Data.location.name;
        Con.innerHTML=Data.location.country;
        Temp.innerHTML=Data.current.temp_c + ' *C';
        Status.innerHTML=Data.current.condition.text;
        Status.style.color="black";
        Img.setAttribute('src' , Data.current.condition.icon);

        Humi.innerHTML=Data.current.humidity+' %';
        Rain.innerHTML=Data.current.cloud+' %';
        Press.innerHTML=Data.current.pressure_in;
        Wind.innerHTML=Data.current.wind_kph+' KM/H';
        let Dat=Data.location.localtime;

        let Year=Dat.substr(0,4);
        let Month=Dat.substr(5,2);
        let Din=Dat.substr(8,2);
        let Hr=Dat.substr(11,2);
        let Min=Dat.substr(14,2);
        console.log(Hr , Min);

        var CurrDat=new Date(Din , Month , Year);
        Day.innerHTML=DayOFWeek(CurrDat.getDay());
    })
    .catch((err)=>
    {
        console.log("ERROR OCCURED");
    })
};

Weather();