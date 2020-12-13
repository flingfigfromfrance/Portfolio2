/* 마우스 인터랙션 */
var cursorDotEl = document.querySelector('#cursor-dot'),
    cursorBGEl = document.querySelector('#cursor-bg'),
    progressEl = document.querySelector('#progress'),
    overHome = document.querySelector('#home'),
    overMenu = document.querySelector('.menu>ul');
    
/* enter */
function mouseEnter(e){
    // if(e.currentTarget == overMenu){
    //     cursorBGEl.style.backgroundColor = '#000';
    //     cursorBGEl.style.width = '100px';
    //     cursorBGEl.style.height = '100px';
    // }else{
    cursorBGEl.style.width = '80px';
    cursorBGEl.style.height = '80px';
    cursorBGEl.style.backgroundColor = '#fff';
    cursorBGEl.style.mixBlendMode = 'difference';
}

/* leave */
function mouseLeave(){
    cursorBGEl.style.width = '80px';
    cursorBGEl.style.height = '80px';
    cursorBGEl.style.backgroundColor = 'transparent';
    cursorBGEl.style.mixBlendMode = 'none';
}

/* move */
function onMouseMove(e){
    var posX = e.clientX, 
        posY = e.clientY;

    gsap.killTweensOf(cursorDotEl);
    gsap.killTweensOf(cursorBGEl);
    gsap.killTweensOf(progressEl);
    // -요소에서 애니메이션을 제거

    gsap.to(cursorDotEl, {
        top: posY,
        left: posX,
        duration: 0.3, 
        ease: 'sine.out', 
    });
    gsap.to(cursorBGEl, { top: posY, left: posX, duration: 0.3, ease: 'sine.out' });
    gsap.to(progressEl, { top: posY, left: posX, duration: 0.25, ease: 'sine.out' });
}

overHome.addEventListener('mouseenter', mouseEnter);
overHome.addEventListener('mouseleave', mouseLeave);

overMenu.addEventListener('mouseenter', mouseEnter);
overMenu.addEventListener('mouseleave', mouseLeave);

window.addEventListener('mousemove', onMouseMove); // 마우스 움직임 실행
