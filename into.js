const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
});

// Animate letters like Netflix
tl.to(".logo span", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.08
})

// Slight zoom effect
.to(".logo", {
    scale: 1.15,
    duration: 1.2
})

// Fade out intro
.to(".intro", {
    opacity: 0,
    duration: 1,
    delay: 0.5
})

// Redirect after animation
.add(() => {
    window.location.href = "index3.html"; // change if needed
});
