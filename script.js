
const input=document.querySelector('.inputText');
const textbox=document.querySelector('.text');
const time=document.querySelector('.timeleft');
const mistakes=document.querySelector('.mistakes');
const wpm=document.querySelector('.wpm');
const cpm=document.querySelector('.cpm');
const btn=document.querySelector('.btn');
let timer;
let maxtime=60;
let timeleft=maxtime;
let mistake=0;
let charidx=0;
let istyping=false;

const moodbtn=document.querySelector('.darkmood');
const mood=document.querySelector('.mood');
const body=document.querySelector('body');
const innerbox=document.querySelector('.innerbox');
const box=document.querySelector('.box');
let count=0;

moodbtn.addEventListener('click',function(){
     count++;
     if(count%2==1){
        mood.innerHTML='DarkMood';
        body.style.backgroundColor='black';
        moodbtn.innerHTML='<i class="fa-solid fa-moon"></i>';
        innerbox.style.backgroundColor='black';
        innerbox.style.color='#FFFFFF';
        box.style.backgroundColor='darkslategray';
     }
     else{
        mood.innerHTML='LightMood';
        body.style.backgroundColor='#E3B448';
        moodbtn.innerHTML='<i class="fa-regular fa-moon"></i>';
        innerbox.style.backgroundColor='#FFFFFF';
        innerbox.style.color='black';
        box.style.backgroundColor='#CBD18F';
     }
   
});

function loadparagraph(){
    const arr=["In the dance of life, our steps define our destiny, and our heartbeats compose the rhythm of our dreams." 
    , "Through the storms of adversity, we find the strength to spread our wings and soar to new heights."
    , "A moment of kindness can illuminate the darkest of paths, reminding us that compassion is the truest light."
    , "The pages of history are written by those who dare to defy the ordinary and embrace the extraordinary."
    , "Like stars in the night sky, our aspirations guide us, twinkling with the promise of what could be."
    , "In the garden of friendship, the flowers of trust and understanding bloom, creating a tapestry of beautiful connections."
    , "The echoes of laughter resonate through time, reminding us to embrace joy and cherish the simple moments."
    , "Amidst the symphony of chaos, silence unveils its own wisdom, whispering truths that only stillness can reveal."
    , "The tapestry of culture is woven with threads of diversity, each strand contributing to the masterpiece of humanity."
    , "Life's journey is a canvas awaiting the strokes of courage and passion to paint a masterpiece of purpose."];

    const radomidx=Math.floor(Math.random()*arr.length);
    
    textbox.innerHTML='';
    for(const char of arr[radomidx]){
        textbox.innerHTML+=`<span>${char}</span>`;
    }
    textbox.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    textbox.addEventListener('click',()=>input.focus());
}

function initTyping(){
     const charcter=textbox.querySelectorAll('span');
     const typedchar=input.value.charAt(charidx);
   
     if(charidx < charcter.length && timeleft>0){
      
        if(!istyping){
            timer=setInterval(inittime, 1000);
            istyping=true;
        }

        if(charcter[charidx].innerText===typedchar){
            charcter[charidx].classList.add('correct');
        }
        else{
            mistake++;
            mistakes.innerHTML=mistake;
            charcter[charidx].classList.add('incorrect');
        }
        charidx++;
        charcter[charidx].classList.add('active');
        cpm.innerText=charidx-mistake;
     }
     else{
        clearInterval(timer);
        input.value='';
     }
}
function inittime(){
    if(timeleft>0){
        timeleft--;
        time.innerHTML=`${timeleft}s`;
        const WPM=Math.round(((charidx-mistake)/5)/(maxtime-timeleft)*60);
        wpm.innerText=WPM;
    }
    else{
        clearInterval(timer);
    }
}
function reset(){
    loadparagraph();
    clearInterval(timer);
    timeleft=maxtime;
    charidx=0;
    mistake=0;
    istyping=false;
    mistakes.innerHTML=0;
    wpm.innerHTML=0;
    cpm.innerHTML=0;
    time.innerHTML='60s';
}
       
input.addEventListener('input',initTyping);
loadparagraph();

btn.addEventListener('click',reset);