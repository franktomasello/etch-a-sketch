// Setup initial grid and attach event listener to reset button
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const resetButton = document.getElementById('resetButton');
    const clearButton = document.getElementById('clearButton');
    const grid = document.createElement('div');

    grid.className = 'grid';
    container.appendChild(grid);

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    const createGrid = (size) => {
        grid.innerHTML = '';
        const cellSize = 640 / size;

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.hoverCount = 0;

            cell.addEventListener('mouseover', function(e) {
                if (!e.target.style.backgroundColor) {
                    e.target.style.backgroundColor = getRandomColor();
                } else if (e.target.hoverCount < 10) {
                    let rgbColor = getComputedStyle(e.target).backgroundColor;
                    let hslColor = rgbToHsl(rgbColor);
                    hslColor[2] -= 10;  // Reduce lightness by 10%
                    e.target.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`;
                    e.target.hoverCount++;
                }
            });

            grid.appendChild(cell);
        }
    };

    const rgbToHsl = (rgb) => {
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        rgb = rgb.substr(4).split(")")[0].split(sep);

        for (let R in rgb) {
            let r = rgb[R];
            if (r.indexOf("%") > -1) {
                rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);
            }
        }

        let r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255;

        let max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        s = s * 100;
        s = Math.round(s);
        l = l * 100;
        l = Math.round(l);
        h = Math.round(360 * h);

        return [h, s, l];
    };

    createGrid(16);

    resetButton.addEventListener('click', function() {
        let size = prompt('Enter the number of squares per side for the new grid.', '16');
        while (size < 1 || size > 100 || isNaN(size)) {
            alert('The number of squares must be between 1 and 100.');
            size = prompt('Enter the number of squares per side for the new grid.', '16');
        }
        createGrid(size);
    });

    clearButton.addEventListener('click', function() {
        const cells = grid.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.style.backgroundColor = '';
            cell.hoverCount = 0;
        });
    });
});

