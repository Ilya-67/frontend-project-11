
const component = () => {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const input = document.createElement('input');
  button.innerHTML = 'Hello,webpack!';
  element.appendChild(input);
  element.appendChild(button);
  return element;
}

document.body.appendChild(component());