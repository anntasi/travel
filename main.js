let cityData = [
	{ name: "", lat: "", lon: "" },
	{ name: "台北", lat: 25.0856513, lon: 121.421409 },
	{ name: "台中", lat: 24.1852333, lon: 120.4946381 },
	{ name: "高雄", lat: 22.7000444, lon: 120.0508691 },
	{ name: "元智", lat: 24.9703173, lon: 121.2608673 }
];
let daysData = ['', 1, 2, 3, 4, 5

];
let luggage = 0;
let check1 = 0;
let check2 = 0;
let day_tempmin = [];
let day_tempmax = [];
days = document.getElementById("daysSelect");
$(function () {
	for (let x = 0; x < cityData.length; x++) {
		$("#citySelect").append(
			`<option value='${x}'>${cityData[x].name}</option>`
		);
	}
	for (let x = 0; x < daysData.length; x++) {
		$("#daysSelect").append(
			`<option value='${x}'>${daysData[x]}</option>`
		);
	}

	$("#citySelect").on("change", loadServerData);
	$("#daysSelect").on("change", loadServerData);
	$("[type = 'checkbox']").on("change", updateProgress);//任何checkbox有change就呼叫updateprogress
});

function loadServerData() {
	console.log("[loadServerData] in");

	$("#result").empty();
	if (this.value == 0) return;
	// Request Weather Data
	// let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
	let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/forecast?";
	let weatherMapAPIKey = "82b23cd761902c892b8057afbebb9442";
	//let cnt=6;
	$.getJSON(weatherAPI_URL, {
		lat: cityData[this.value].lat,
		lon: cityData[this.value].lon,
		appid: weatherMapAPIKey,
		units: 'metric',
		lang: 'zh_tw'


	})
		.done(function (data) {
			console.log(data);
			/*for(let i=0;i<5;i++){
		  $("#result").append(
			   `<p>氣溫：${data.list[i].main.temp_min} ~ ${data.list[i].main.temp_max} 
			   ${data.list[i+1].main.temp_min} ~ ${data.list[i+1].main.temp_max} 
			   ${data.list[i+2].main.temp_min} ~ ${data.list[i+2].main.temp_max} 
			   ${data.list[i+3].main.temp_min} ~ ${data.list[i+3].main.temp_max}
			   ${data.list[i+4].main.temp_min} ~ ${data.list[i+4].main.temp_max}
			   ${data.list[i+5].main.temp_min} ~ ${data.list[i+5].main.temp_max}
			   ${data.list[i+6].main.temp_min} ~ ${data.list[i+6].main.temp_max}
			   ${data.list[i+7].main.temp_min} ~ ${data.list[i+7].main.temp_max}</p>`
		   );
		   $("#result").append(
			   `<p><img src='https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png'>${data.list[i].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+1].weather[0].icon}@2x.png'>${data.list[i+1].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+2].weather[0].icon}@2x.png'>${data.list[i+2].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+3].weather[0].icon}@2x.png'>${data.list[i+3].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+4].weather[0].icon}@2x.png'>${data.list[i+4].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+5].weather[0].icon}@2x.png'>${data.list[i+5].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+6].weather[0].icon}@2x.png'>${data.list[i+6].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+7].weather[0].icon}@2x.png'>${data.list[i+7].weather[0].description}
			   <img src='https://openweathermap.org/img/wn/${data.list[i+8].weather[0].icon}@2x.png'>${data.list[i+8].weather[0].description}</p>`
		   );*/
			let luggage = 0;
			for (let i = 0; i < days.value; i++) {
				let tem_min = 1000, tem_max = -10;
				let rain = 0;

				for (let k = 0; k < 8; k++) {
					if (data.list[8 * i + k].main.temp_min < tem_min) { tem_min = data.list[8 * i + k].main.temp_min; }
					if (data.list[8 * i + k].main.temp_max > tem_max) { tem_max = data.list[8 * i + k].main.temp_max; }
					if (data.list[i + 1].weather[0].icon == '10n') { rain = 1; luggage = 1 }
				}

				$("#result").append(
					`<p>第${i + 1}天氣溫：${tem_min}~ ${tem_max}</p>`

				);
				if (rain == 1) {
					$("#result").append(
						`<p><img src='https://openweathermap.org/img/wn/10n@2x.png'></p>`);

				}
				else {
					$("#result").append(
						`<p><img src='https://openweathermap.org/img/wn/02d@2x.png'></p>`);

				}

			} if (luggage == 1 & check1 == 0) {	//deletee();
				addelement("雨傘")
				check1 = 1;
			}
			else if (luggage == 0 & check2 == 0) {
				//deletee();
				addelement("防曬");
				check2 = 1
			}

		})
		.fail(function () { console.log("Error") })
		.always(function () { console.log("Always") });

} function updateProgress() {
	let hasChecked = 0;
	for (let x = 0; x < $("[type='checkbox']").length; x++) {
		if ($("[type='checkbox']")[x].checked) {
			hasChecked += 1;

		}
	}
	// $("meter").attr("min",0);
	$("meter").attr("max", $("[type='checkbox']").length);
	$("meter").attr("value", hasChecked);
}
function addelement(thing) {
	var container = document.getElementById("container");
	var newbox = document.createElement("input");
	newbox.type = "checkbox";
	var label = document.createElement("label")
	label.htmlFor = thing
	var br = document.createElement("br");
	label.appendChild(document.createTextNode(thing));
	container.appendChild(newbox);
	container.appendChild(label);
	container.appendChild(br)
	console.log("add");
}
function deletee() {
	var container = document.getElementById("container");
	container.empty();
	console.log("del");
}

