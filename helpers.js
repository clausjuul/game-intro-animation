//restart animation on window resize
window.addEventListener('resize', function(){
   master.restart()
   });

// ViewWidth to pixels converter
vwToPx = (vw) => {
   console.log(Math.floor((document.getElementById('scene').offsetWidth / 100) * vw))
   return Math.floor((document.getElementById('scene').offsetWidth / 100) * vw);
} 

// ViewHeight to pixels converter
vhToPx = (vh) => {
   console.log(Math.floor((document.getElementById('scene').offsetHeight / 100) * vh))
   return Math.floor((document.getElementById('scene').offsetHeight / 100) * vh)
}


// Random nummer between 2 values
random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// function for flying out bubbles
function tweenXYOpacity(target, timeMin, timeMax, xMin, xMax, yMin, yMax, delay, opacity) {
   TweenMax.to(target, random(timeMin, timeMax), {
      x: random(xMin, xMax),
      y: random(yMin, yMax),
      opacity: opacity,
      ease: Power2.easeOut,
      onComplete: tweenXYOpacity,
      clearProps: 'all',
      onCompleteParams: [target, timeMin, timeMax, xMin, xMax, yMin, yMax, delay, opacity]
   });
}
// function for the moving | scaling bubbles
function tweenScaleOpacity(target, timeMin, timeMax, xMin, xMax, yMin, yMax, scaleMin, scaleMax, delay,
   opacity, origin) {
   TweenMax.to(target, random(timeMin, timeMax), {
      x: random(xMin, xMax),
      y: random(yMin, yMax),
      scaleY: random(scaleMin, scaleMax),
      scaleX: random(scaleMin, scaleMax),
      transformOrigin: origin,
      opacity: opacity,
      yoyo: true,
      repeat: 1,
      onComplete: tweenScaleOpacity,
      clearProps: 'all',
      onCompleteParams: [target, timeMin, timeMax, xMin, xMax, yMin, yMax, scaleMin, scaleMax, delay,
         opacity, origin
      ]
   });
}
// function for pause with ease
pause = () => {
   const tl = new TimelineMax();

   tl.add(TweenMax.to(master, .5, {
      timeScale: 0,
      ease: Linear.easeNone
   }));
   return tl;
}
// function for start with ease
start = () => {
   const tl = new TimelineMax();

   tl.add(TweenMax.to(master, .5, {
      timeScale: 1,
      ease: Linear.easeNone
   }));
   return tl;
}

//get text aligned right
setText = () => {
   const tl = new TimelineMax();

   let total = 0;
   let textArr = document.querySelectorAll('.sing');
   let i = 0;
   for (let text of textArr) {
      let width = text.getBoundingClientRect().width;
      tl.add(TweenMax.set(textArr[i], {
         left: total,
         y: vhToPx(-20),
         scale: 0.5
      }));
      total = total + width;
      i++;
   }
}