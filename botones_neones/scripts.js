function generateRandomColorHsl() {
    setInterval(function () {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * (100 + 1)) + "%";
        const lightness = Math.floor(Math.random() * (100 + 1)) + "%";
        let results = "hsl(" + hue + ", " + saturation + ", " + lightness + ")";
        document.documentElement.style.setProperty('--clr-neon', `${results}`);
    }, 2000);
}

generateRandomColorHsl();