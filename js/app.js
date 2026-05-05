
class ParticleSystem {
    constructor() {
        this.particles = []
        this.container = document.getElementById("particles")
        this.mouseX = 0
        this.mouseY = 0
        this.init()
    }

    init() {

        for (let i = 0; i < 20; i++) {
            this.createParticle()
        }

        document.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        })
        this.animate()
    }

    createParticle() {
        const particle = document.createElement("div")
        particle.className = "particle"

        const size = Math.random() * 15 + 1
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        const speedX = (Math.random() - 0.5) * 2
        const speedY = (Math.random() - 0.5) * 2

        particle.style.width = size + "px"
        particle.style.height = size + "px"
        particle.style.left = x + "px"
        particle.style.top = y + "px"

        particle.speedX = speedX
        particle.speedY = speedY
        particle.x = x
        particle.y = y
        particle.size = size

        this.container.appendChild(particle)
        this.particles.push(particle)
    }

    animate() {
        this.particles.forEach((particle, index) => {

            particle.x += particle.speedX
            particle.y += particle.speedY


            const dx = this.mouseX - particle.x
            const dy = this.mouseY - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
                const force = (100 - distance) / 100
                particle.x -= dx * force * 0.01
                particle.y -= dy * force * 0.01
            }


            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.speedX *= -1
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.speedY *= -1
            }


            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x))
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y))


            particle.style.left = particle.x + "px"
            particle.style.top = particle.y + "px"
        })

        requestAnimationFrame(() => this.animate())
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ParticleSystem()
})
