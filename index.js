function get_inputs() {
  const exact_mass = document.getElementById('exact_mass').value;
  const measured_mass = document.getElementById('measured_mass').value;
  let check = true;
  const checks = [
    isNaN(exact_mass),
    isNaN(measured_mass),
    !Number(exact_mass),
    !Number(measured_mass),
    exact_mass <= 0,
    measured_mass <= 0,
  ];
  for (let verification of checks) {
    if (verification) {
      check = false;
      break;
    }
  }
  return {
    valid: check,
    exact_mass: parseFloat(exact_mass),
    measured_mass: parseFloat(measured_mass),
  };
}

function calculate(inputs) {
  const accuracy =
    ((inputs.measured_mass - inputs.exact_mass) * 1000000) / inputs.exact_mass;
  return accuracy.toFixed(2);
}

function display_output(result) {
  const heart = document.getElementById('heart');
  heart.textContent = `${result} ppm`;
  heart.style.fontSize = '20px';
}

const button_calculate = document.getElementById('calculate');
button_calculate.addEventListener('click', () => {
  const inputs = get_inputs();
  if (inputs.valid) {
    const result = calculate(inputs);
    display_output(result);
  } else {
    alert('Invalid parameter(s)!!');
  }
});

function generate_heart() {
  let filling = '';
  for (let i = 0; i < 20; i++) {
    filling += '&#10084;&#65039;';
  }
  return filling;
}

document.getElementById('heart').innerHTML = generate_heart();

function clear() {
  const inputs = document.querySelectorAll('input');
  for (let input of inputs) {
    input.value = '';
  }
  const heart = document.getElementById('heart');
  heart.style.fontSize = '10px';
  heart.innerHTML = generate_heart();
}

const clear_button = document.getElementById('clear');
clear_button.addEventListener('click', () => {
  clear();
});
document.querySelector('footer').innerHTML =
  `<p>Copyright &copy; Danilo Morais Itokagi. All rights reserved. ${new Date().getFullYear()}</p>`;
