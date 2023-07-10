var container = document.getElementById('container');
var grid = document.createElement('div');
grid.className = 'grid';
container.appendChild(grid);

for (var i = 0; i < 16 * 16; i++) {
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('mouseover', function(e) {
        e.target.style.backgroundColor = 'blue';
    });
    grid.appendChild(cell);
}
