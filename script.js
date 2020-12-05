const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const nextOneBtn = document.getElementById('new-quote');
const loader = document.getElementById('load');

loader.hidden=true;

function loading(){
    loader.hidden =false;
    quoteContainer.hidden = true;
}

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//get quote from api
//ES7
async function getQuote(){
    loading();
    //heroku提供免費的伺服器
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        //不同網域直接fetch api會被擋,加上proxyUrl可以解決這個問題
        const response = await fetch(proxyUrl+apiUrl);
        const data = await response.json();
        if(data.quoteAuthor===''){
            quoteAuthor.innerText = 'Unknown';
        }
        else{
            quoteAuthor.innerText = data.quoteAuthor;
        }
        
        if(data.quoteText.length>50){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
        throw new Error('oops');

    } catch(error){
        //發生錯誤還是要取得quote
        getQuote();
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

nextOneBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);