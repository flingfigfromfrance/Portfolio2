var galleryEl = document.querySelector("#gallery"),
    viewEl = galleryEl.querySelector(".view"),
    viewContainerEl = viewEl.querySelector(".view-container"),
    viewItemEls = viewContainerEl.querySelectorAll(".view-item"),
    viewItemImgEls = viewContainerEl.querySelectorAll(".view-item > div"),

    paddleNavEl = galleryEl.querySelector(".menu"),
    btnPaddleNavEls = paddleNavEl.querySelectorAll("button.arrow"),
    btnPaddleNavPrevEl = paddleNavEl.querySelector("button.arrow.prev"),
    btnPaddleNavNextEl = paddleNavEl.querySelector("button.arrow.next"),

    _isAni = false,
    _galleryW = null,
    _galleryH = null,
    _imgOW = 1600,
    _imgOH = 1000,
    _cuId = 0,
    _exId = null,
    _max = null,
    _duration = 400,
    _addDuration = 200;

function onResize() {
    _galleryW = window.innerWidth; // 너비값 받아옴
    _galleryH = window.innerHeight; // 높이값 받아옴
    galleryResize();
}
function onTransitionEnd(e) {
    _isAni = false;
    viewContainerEl.style.removeProperty("transition");
}
// 이벤트 핸들러 기능.
function onClickListItem(e) {
    e.preventDefault();
    if(_isAni) return;
    var el = e.currentTarget, // 현재 클릭 된 리스트 중에 몇번째에 해당하는 요소인지 체크.
    parentEl = el.parentElement, // 부모요소를 찾아옴.
    index = btnListItemEls.indexOf(el); // 찾아온 요소가 몇번째에 해당하는지 체크.
    if(!parentEl.classList.contains("selected")) {// 선택되어 있는 상태가 아닐 때 (비활성화 되어있는 리스트만 선별)
        _cuId = index;
        gallerySlide(); // 이미지 갤러리 움직이는 기능 호출.
    }
}
function onClickPaddleNav(e) {
    e.preventDefault();
    if(_isAni) return;
    var el = e.currentTarget;
    if(el.classList.contains("prev")) {
        _cuId--;
        if(_cuId < 0) _cuId = 0;
    }else if(el.classList.contains("next")) {
        _cuId++;
        if(_cuId > _max - 1) _cuId = _max - 1;
    }
    if(_exId !== _cuId) gallerySlide();
}
function getImageInfo(index) {
    var image = new Image();
    image.src = viewItemImgEls[index].getAttribute("src");
    image.onload = function() {
        viewItemImgEls[index].setAttribute("data-width", image.naturalWidth);
        viewItemImgEls[index].setAttribute("data-height", image.naturalHeight);
    }
}
function setPaddleActive() {
    if(_cuId === 0) {
        btnPaddleNavPrevEl.classList.add("disabled");
        btnPaddleNavNextEl.classList.remove("disabled");
    }else if(_cuId === _max - 1) {
        btnPaddleNavPrevEl.classList.remove("disabled");
        btnPaddleNavNextEl.classList.add("disabled");
    }else{
        btnPaddleNavPrevEl.classList.remove("disabled");
        btnPaddleNavNextEl.classList.remove("disabled");
    }
}

function gallerySlide(static) {
    var left = _galleryW * _cuId * -1,
        duration = _duration + _addDuration * Math.abs(_cuId - _exId),
        bool = (static) ? static : false;
        //transform 을 이용하여 영역은 그대로 두고 가상의 공간 안에서 이동
    viewContainerEl.style.transform = "translate3d(" + left + "px, 0, 0)";
    if(!bool) {
        _isAni = true;
        setPaddleActive();
        viewContainerEl.style.transition = "transform " + duration + "ms cubic-bezier(0.455, 0.03, 0.515, 0.955)";
        _exId = _cuId;
    }else{
        viewContainerEl.style.removeProperty("transition");
        _isAni = false;
    }
}
function galleryResize() {//사진과 슬라이드의 비율을 조정 
    viewEl.style.width = _galleryW + "px";
    viewEl.style.height = _galleryH + "px";
    viewContainerEl.style.width = _galleryW * _max + "px";// 크기를 이미지 갯수만큼 늘린다
    for(var i = 0; i < _max; i++) {
        viewItemEls[i].style.width = _galleryW + "px";
        var imgW, imgH, imgT, imgL;
        imgW = _galleryW;
        imgH = Math.round(_imgOH * imgW / _imgOW);
        if(imgH <= _galleryH) {
            imgH = _galleryH;
            imgW = Math.round(_imgOW * imgH / _imgOH);
        }
        imgT = Math.round(_galleryH / 2 - imgH / 2);
        imgL = Math.round(_galleryW / 2 - imgW / 2);
        viewItemImgEls[i].style.width = imgW + "px";// 너비 지정
        viewItemImgEls[i].style.height = imgH + "px";// 높이 지정
        viewItemImgEls[i].style.top = imgT + "px";
        viewItemImgEls[i].style.left = imgL + "px";
    }
    gallerySlide(true);
}
// 이벤트가 바인딩되는 기능들
function addEvent() {
    window.addEventListener("resize", onResize);
    viewContainerEl.addEventListener("webkitTransitionEnd", onTransitionEnd);
    viewContainerEl.addEventListener("transitionend", onTransitionEnd);
    for(var j = 0; j < btnPaddleNavEls.length; j++) {
        btnPaddleNavEls[j].addEventListener("click", onClickPaddleNav);
    }
}
//초기화 기능.
function init() {
    _max = viewItemEls.length;
    _exId = _cuId;
    setPaddleActive();
    addEvent();
    window.dispatchEvent(new Event('resize'));
}
init();