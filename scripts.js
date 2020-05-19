const convertDate = (unixDate) => {
  let date = new Date(unixDate);
  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  let year = date.getUTCFullYear();
  let hours = ('0' + date.getUTCHours()).slice(-2);
  let minutes = ('0' + date.getUTCMinutes()).slice(-2);
  return `${day}-${month}-${year} ${hours}:${minutes}`
};
const capitalizeFirstLetter = (str) => {
  str += '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const config = {
  'url': 'http://api.openweathermap.org/data/2.5/forecast',
  'apiKey': '2c76d2afa94d28447c2b735df99eaadb'
};
function fetchData() {
  document.getElementById("initialMessage").style.display = "none";
  document.getElementById("loader").style.visibility = "visible";
  fetch(`${config.url}?q=${document.getElementById('city_name').value}&appid=${config.apiKey}`).then(res => {
    if (!(res.status == 200))
      throw Error("ERROR")
    return res.json()
  }).then(data => {
    const city = `<h1>City: ${data.city.name}, ${data.city.country}</h1>`
    document
      .querySelector('#root')
      .insertAdjacentHTML('beforebegin', city);
    const sunRiseSet = `<b>Sunrise: ${data.city.sunrise}, Sunset: ${data.city.sunset}</b>`
    document
      .querySelector('#root')
      .insertAdjacentHTML('afterbegin', sunRiseSet);
    const main_content = data.list.map(item => {
      let srcLink = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      return `
      <div class="card">
        <b>Date: ${convertDate(item.dt * 1000)}</b>
        <div class="flex-row-container">
          <div class="flex-row-item">Clouds</div>
          <div class="flex-row-item">Wind</div>
          <div class="flex-row-item">${item.clouds.all}&#37;</div>
          <div class="flex-row-item">${item.wind.speed} meter/sec @${item.wind.deg}&deg;</div>
        </div>
        <img class="image" src=${srcLink} alt=${item.weather[0].icon}>
        <p>${capitalizeFirstLetter(item.weather[0].description)}</p>
        <p>Actual Temp ${item.main.temp} & Feels Like ${item.main.feels_like}</p>
        <p>Min Temp: ${item.main.temp_min}&#8451;, Max Temp: ${item.main.temp_max}&#8451;</p>
        <p>Atmospheric Presure: ${item.main.pressure}hPa</p>
        <p>Sea Level: ${item.main.sea_level}hPa, Ground Level: ${item.main.grnd_level}hPa</p>
        <p>Humidity: ${item.main.humidity}&#37;</p>
      </div>
      `
    }).join('')

      const main_content_container = `<div class="container">
      ${main_content}
      </div>`
      document
        .querySelector('#root')
        .insertAdjacentHTML('afterend', main_content_container);
    document.getElementById("loader").style.visibility = "hidden";
    document.getElementById("root").style.display = "block";
  }).catch(error => {
    console.log(error)
  })
}
// fetchData();


// const convertDate = (unixDate) => {
//   let date = new Date(unixDate);
//   let day = ('0' + date.getDate()).slice(-2);
//   let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
//   let year = date.getUTCFullYear();
//   let hours = ('0' + date.getUTCHours()).slice(-2);
//   let minutes = ('0' + date.getUTCMinutes()).slice(-2);
//   return `${day}-${month}-${year} ${hours}:${minutes}`
// };
// const capitalizeFirstLetter = (str) => {
//           str += '';
//           return str.charAt(0).toUpperCase() + str.slice(1);
//         };

//         const config = {
//           'url': 'http://api.openweathermap.org/data/2.5/forecast',
//           'location': 'london',
//           'apiKey': '2c76d2afa94d28447c2b735df99eaadb'
//         };
// function fetchData() {
//     fetch(`${config.url}?q=${config.location}&appid=${config.apiKey}`).then(res => {
//     if (!(res.status == 200))
//       throw Error("ERROR")
//     return res.json()
//   }).then(data => {
//     const city = `<h1>City: ${data.city.name}, ${data.city.country}</h1>`
//     document
//       .querySelector('#root')
//       .insertAdjacentHTML('beforebegin', city);
//       const sunRiseSet = `<b>Sunrise: ${data.city.sunrise}, Sunset: ${data.city.sunset}</b>`
//       document
//         .querySelector('#root')
//         .insertAdjacentHTML('afterbegin', sunRiseSet);
//     const main_content = data.list.map(item => {
//       let srcLink = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
//       return `
//       <div class="card">
//         <p>Date: ${convertDate(item.dt * 1000)}</p>
//         <div class="flex-row-container">
//           <div class="flex-row-item">Clouds</div>
//           <div class="flex-row-item">Wind</div>
//           <div class="flex-row-item">${item.clouds.all}</div>
//           <div class="flex-row-item">${item.wind.speed} meter/sec @${item.wind.deg}&deg;</div>
//         </div>
//         <img src=${srcLink} alt=${item.weather[0].icon}>
//         <p>${capitalizeFirstLetter(item.weather[0].description)}</p>
//         <p>Actual Temp ${item.main.temp} & Feels Like ${item.main.feels_like}</p>
//         <p>Min Temp: ${item.main.temp_min}&#8451;, Max Temp: ${item.main.temp_max}&#8451;</p>
//         <p>Atmospheric Presure: ${item.main.pressure}hPa</p>
//         <p>Sea Level: ${item.main.sea_level}hPa, Ground Level: ${item.main.grnd_level}hPa</p>
//         <p>Humidity: ${item.main.humidity}&#37;</p>
//       </div>
//       `
//     }).join('')
//     document
//       .querySelector('#root')
//       .insertAdjacentHTML('afterend', main_content);
//     //   const main_content_container = `<div class="card">
//     //   <img src="img_avatar.png" alt="Avatar" style="width:100%">
//     //   <div class="container">
//     //     <h4><b>John Doe</b></h4>
//     //     <p>Architect & Engineer</p>
//     //   </div>
//     // </div>`
//     //   document
//     //     .querySelector('#root')
//     //     .insertAdjacentHTML('afterend', main_content_container);
//   }).catch(error => {
//     console.log(error)
//   })
// }
// fetchData();