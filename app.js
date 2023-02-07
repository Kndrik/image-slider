window.pressPrev = () => {
    scrollManager.prev();
}

window.pressNext = () => {
    scrollManager.next();
}

window.pressNavDot = (index) => {
    scrollManager.goToSlide(index);
    navDotsManager.focusDot(index);
}

const slidesManager = (() => {
    const slides = document.querySelectorAll('.slide');

    const getCount = () => {
        return slides.length;
    };

    return { getCount };
})();

const navDotsManager = (() => {
    const dotParents = document.createElement('div');
    dotParents.classList.add('nav-dots');
    document.querySelector('.slider-container').appendChild(dotParents);
    let dotArray = new Array();

    const setupDots = () => {
        console.log('hey');
        const slideCount = slidesManager.getCount();

        for (let i = 0; i < slideCount; i++) {
            const newDot = document.createElement('div');
            newDot.classList.add('dot');
            newDot.setAttribute('index', i);
            newDot.addEventListener('click', () => { pressNavDot(i+1) });
            dotParents.appendChild(newDot);
            dotArray.push(newDot);

            if(i === 0) newDot.setAttribute('current', true)
        }
    }

    const focusDot = (index) => {
        document.querySelector('[current]').removeAttribute('current');
        dotArray[index-1].setAttribute('current', true);
        currentIndex = index;
    }

    setupDots();

    return { focusDot };
})();

const scrollManager = (() => {
    const slider = document.querySelector('.slider');
    document.querySelector('.prev').addEventListener('click', pressPrev);
    document.querySelector('.next').addEventListener('click', pressNext);
    let currentIndex = 1;

    const next = () => {
        currentIndex++;
        if (currentIndex > slidesManager.getCount()) currentIndex = 1;
        navDotsManager.focusDot(currentIndex);
        update();
    }

    const prev = () => {
        currentIndex--;
        if (currentIndex < 1) currentIndex = slidesManager.getCount();
        navDotsManager.focusDot(currentIndex);
        update();
    }

    const goToSlide = (index) => {
        currentIndex = index;
        update();
    }

    const update = () => {
        const leftAmount = (currentIndex-1) * -700;
        slider.style.setProperty('left', `${leftAmount}px`);
    }

    return { next, prev, goToSlide };
})();