import axios from 'axios';

var Query = '';
var res

const clearFeed = () => {
    const el = document.querySelector('.super');
    el.innerHTML = '';
}

const clearSearch = () => {
    const el = document.getElementById('search');
    el.value = '';
}

const showSpinner = () => {
    const markup = `<div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    </div>`;
    const el = document.querySelector('.loader');
    el.insertAdjacentHTML('afterbegin', markup);
}

const hideSpinner = () => {
    const el = document.querySelector('.loader');
    el.innerHTML = '';
}

const getResults =  async() => {
    try{
        if(Query === ''){
            res = await axios('https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=48bf09dd1cc24c93ac32c937560c6465');
        }
        else{
            res = await axios(`https://newsapi.org/v2/everything?q=${Query}&apiKey=48bf09dd1cc24c93ac32c937560c6465`);
            clearSearch();
        }
        console.log(res);
        hideSpinner();
        res.data.articles.forEach((el) => {
        const markup = `
                      <div class="col-md-4">
                        <div class="thumbnail">
                          <img src=${el.urlToImage} style="width: 400px; height: 300px">
                          <div class="caption news_title">
                            <p>${el.title.split(' ').slice(0,20).join(' ')}</p>
                            <a href = "${el.url}" target="_blank">Read More</a>
                      </div>`;
        document.querySelector('.super').insertAdjacentHTML('afterbegin', markup);
      });

    }

    catch(err){
        console.log('There was an error');
    }

}


console.log(Query);
getResults();

window.onload=function(){
    const el = document.getElementById('search');
    el.addEventListener("keypress", async(e) => {
        if(e.key === 'Enter'){
            localStorage.setItem(el.value, Query);
            showSpinner();
            try{
                e.preventDefault();
                clearFeed();
                const query = el.value;
                res = await axios(`https://newsapi.org/v2/everything?q=${query}&apiKey=48bf09dd1cc24c93ac32c937560c6465`);
                hideSpinner();
                clearSearch();
                res.data.articles.forEach((el) => {
                    const markup = `<div class="col-md-4">
                    <div class="thumbnail">
                      <img src=${el.urlToImage} style="width: 400px; height: 300px">
                      <div class="caption news_title">
                        <p>${el.title.split(' ').slice(0,20).join(' ')}</p>
                        <a href = "${el.url}" target="_blank">Read More</a>
                  </div>`;
                    document.querySelector('.super').insertAdjacentHTML('afterbegin', markup);
                });
            }
            catch(err){
                console.log(err);
            }
            
        }
    });
}
