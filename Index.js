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

let Weather =()=>
{
    document.querySelector('.Btn').addEventListener('click' , Caller=async()=>
    {
        let Query=document.querySelector('input').value;
        if(Query.length==0)
        {
            Query='Lahore';
        }
        document.querySelector('.Hourly-Data').style.display='grid';
        let Link=`http://api.weatherapi.com/v1/forecast.json?key=e3e5a6e2101943eb83550323222106&q=${Query}&aqi=no`;

        if(Query.length!=0)
        {
            fetch(Link , {method:'GET' , headers:{Accept:'application.json'}})
            .then((Response)=>
            {
                return Response.json();
            })
            .then((Data)=>
            {
                document.querySelector('.Left').style.visibility='visible';
                document.querySelector('.Right').style.visibility='visible';
                document.querySelector('.Day').style.visibility='visible';
                if(Data.current.is_day!=1)
                {
                    document.querySelector('.Main').style.backgroundImage="url('/Images/Night.jpg')"
                }
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

                var CurrDat=new Date(Din , Month , Year);
                Day.innerHTML=DayOFWeek(CurrDat.getDay());

                let Arr=document.querySelectorAll('.Hours .Time');
                let Arr2=document.querySelectorAll('.Hours .Temp');
                for (let i=0 ; i<7 ; i++)
                {
                    Arr[i].innerHTML=Data.forecast.forecastday[0].hour[(i+(+Hr))%12+1].time.substr(11,2)+':00';
                    Arr2[i].innerHTML=Data.forecast.forecastday[0].hour[(i+(+Hr))%12+1].temp_c+' *C';
                    Arr2[i].style.color='white';
                }
            })
            .catch((err) =>
            {
                alert("This City/Contry Not Found , Please Try Other Keywords 💔💔")
            });
        }
    });
};


Weather();