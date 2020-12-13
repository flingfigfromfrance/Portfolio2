const circle = document.querySelector('.circle')

let mouseX = 0
let mouseY = 0

let circleX = 0
let circleY = 0

let speed = 0.06

const animate = () => {
  let distX = mouseX - circleX
  let distY = mouseY - circleY
	let translatedValue = `translate3d(${circleX}px, ${circleY}px, 0 )`;
  
  circleX = circleX + (distX * speed)
  circleY = circleY + (distY * speed)    
	
	circle.style.transform = translatedValue;
  
  requestAnimationFrame(animate)
}

animate()

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX - circle.offsetWidth / 4;
  mouseY = e.clientY - circle.offsetHeight / 4;
})