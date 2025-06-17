window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 992) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    document.querySelectorAll('.artists-item').forEach(item => {
        const name = item.querySelector('.artist-name');
        const social = item.querySelector('.social-block');
        const overlay = item.querySelector('.artist-overlay');
      
        gsap.set(item, { flexGrow: 1 });
        gsap.set([name, social, overlay], { opacity: 0 });
      
        const hoverTimeline = gsap.timeline({ paused: true });
      
        hoverTimeline.to(item, {
          flexGrow: 3,
          duration: 0.5,
          ease: "power2.inOut"
        }, 0);
      
        hoverTimeline.to([name, social, overlay], {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut"
        }, 0);
      
        item.addEventListener('mouseenter', () => {
          hoverTimeline.play();
        });
      
        item.addEventListener('mouseleave', () => {
          hoverTimeline.reverse();
        });
    });

    
    document.querySelectorAll(".section-heading").forEach((heading) => {
        const lines = heading.querySelectorAll(".line");
      
        gsap.to(lines, {
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
        });
    });

    const artistsList = document.querySelector(".artists-list");
    const artistItems = document.querySelectorAll('.artists-item');

    gsap.set(artistsList, { opacity: 0, y: 50 });

    gsap.to(artistsList, {
        scrollTrigger: {
          trigger: artistsList,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.set(artistItems, { opacity: 0, y: 80, x: -30 });
      
    gsap.to(artistItems, {
        scrollTrigger: {
          trigger: artistsList,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.6,
        ease: "power1.out",
        stagger: 0.15,
        delay: 0.3,
    });


    const cards = document.querySelectorAll(".solution-card");

    for (let i = 0; i < cards.length; i += 2) {
        const leftCard = cards[i];
        const rightCard = cards[i + 1];
    
        if (!rightCard) break;
    
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: leftCard.parentElement,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
    
        tl.to([leftCard, rightCard], {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 0);

        tl.to([leftCard.querySelector(".solution-icon"), rightCard.querySelector(".solution-icon")], {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
        }, "-=0.4");
      
        tl.to([
            leftCard.querySelector(".solution-icon svg"),
            rightCard.querySelector(".solution-icon svg")
        ], {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
        }, "-=0.3");
    
        const texts = [
          ...leftCard.querySelectorAll(".solution-title, .solution-text"),
          ...rightCard.querySelectorAll(".solution-title, .solution-text"),
        ];

        tl.to(texts, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          stagger: 0.1,
        }, "-=0.5");
    }

    const path = document.getElementById("animatedPath");
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.opacity = 0;

    ScrollTrigger.create({
        trigger: path.parentElement,
        start: "top 80%",
        onEnter: () => {
          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 2,
            ease: "none"
          });
        },
        once: true
    });
})