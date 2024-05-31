document.getElementById('render-button').addEventListener('click', () => {
    const input = document.getElementById('diagram-input').value;
    document.getElementById('diagram-output').textContent = input;
});
