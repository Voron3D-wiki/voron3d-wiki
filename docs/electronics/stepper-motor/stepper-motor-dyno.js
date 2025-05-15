// motors-search.js

const motorsDataUrl = 'assets/data/motors.json'; // adjust path as needed

let motors = [];
let filteredMotors = [];

// DOM elements
const searchInput = document.getElementById('motorSearch');
const resultsTableBody = document.getElementById('motorsTableBody');
const customMotorForm = document.getElementById('customMotorForm');
const awdToggle = document.getElementById('awdToggle');

async function loadMotors() {
  try {
    const response = await fetch(motorsDataUrl);
    motors = await response.json();
    filteredMotors = motors;
    renderMotorsTable(filteredMotors);
  } catch (error) {
    console.error('Error loading motors data:', error);
  }
}

function renderMotorsTable(motorsToShow) {
  resultsTableBody.innerHTML = '';

  if (motorsToShow.length === 0) {
    resultsTableBody.innerHTML = `<tr><td colspan="12">No motors found.</td></tr>`;
    return;
  }

  motorsToShow.forEach(motor => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${motor.brand}</td>
      <td>${motor.model}</td>
      <td>${motor.nema}</td>
      <td>${motor.body_length_mm}</td>
      <td>${motor.step_angle_deg}</td>
      <td>${motor.rated_current_a}</td>
      <td>${motor.torque_nmm}</td>
      <td>${motor.inductance_mh}</td>
      <td>${motor.resistance_ohms}</td>
      <td>${motor.rotor_inertia_gcm2 ?? ''}</td>
      <td>${motor.motor_type ?? ''}</td>
      <td>${motor.price ?? ''}</td>
    `;

    resultsTableBody.appendChild(row);
  });
}

function filterMotors(query) {
  const lowerQuery = query.trim().toLowerCase();
  filteredMotors = motors.filter(motor =>
    motor.brand.toLowerCase().includes(lowerQuery) ||
    motor.model.toLowerCase().includes(lowerQuery)
  );
  renderMotorsTable(filteredMotors);
}

// Event listeners
searchInput.addEventListener('input', (e) => {
  filterMotors(e.target.value);
});

customMotorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(customMotorForm);

  const newMotor = {
    brand: formData.get('brand'),
    model: formData.get('model'),
    nema: Number(formData.get('nema')),
    body_length_mm: Number(formData.get('body_length_mm')),
    step_angle_deg: Number(formData.get('step_angle_deg')),
    rated_current_a: Number(formData.get('rated_current_a')),
    torque_nmm: Number(formData.get('torque_nmm')),
    inductance_mh: Number(formData.get('inductance_mh')),
    resistance_ohms: Number(formData.get('resistance_ohms')),
    rotor_inertia_gcm2: Number(formData.get('rotor_inertia_gcm2')),
    motor_type: formData.get('motor_type'),
    price: formData.get('price') ? Number(formData.get('price')) : null
  };

  motors.push(newMotor);
  filteredMotors = motors;
  renderMotorsTable(filteredMotors);
  customMotorForm.reset();
});

awdToggle.addEventListener('change', (e) => {
  alert(`AWD system option is now ${e.target.checked ? 'enabled' : 'disabled'}. You can implement logic here.`);
});

// Initial load
loadMotors();
