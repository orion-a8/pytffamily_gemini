document.addEventListener('DOMContentLoaded', function() {
  const senaniRajya = document.getElementById('senaniRajya');
  const senaniSambhag = document.getElementById('senaniSambhag');
  const senaniJila = document.getElementById('senaniJila');
  const senaniNaam = document.getElementById('senaniNaam');
  const sambandh = document.getElementById('sambandh');
  const extraFields = document.getElementById('extraFields');

  const uttaradhikariRajya = document.getElementById('uttaradhikariRajya');
  const uttaradhikariSambhag = document.getElementById('uttaradhikariSambhag');
  const uttaradhikariJila = document.getElementById('uttaradhikariJila');

  // राज्य, संभाग, जिला डेटा (उदाहरण)
  const locationData = {
    'उत्तर प्रदेश': {
      'लखनऊ': ['लखनऊ', 'कानपुर', 'बाराबंकी'],
      'इलाहाबाद': ['इलाहाबाद', 'प्रयागराज', 'कौशाम्बी']
    },
    'मध्य प्रदेश': {
      'भोपाल': ['भोपाल', 'सीहोर', 'रायसेन'],
      'इंदौर': ['इंदौर', 'धार', 'खरगोन']
    }
  };

  // ड्रॉप-डाउन में राज्य लोड करें
  function loadStates(selectElement) {
    Object.keys(locationData).forEach(rajya => {
      const option = document.createElement('option');
      option.value = rajya;
      option.textContent = rajya;
      selectElement.appendChild(option);
    });
  }

  loadStates(senaniRajya);
  loadStates(uttaradhikariRajya);

  // राज्य बदलने पर संभाग अपडेट करें
  function updateSambhag(rajyaSelect, sambhagSelect, jilaSelect) {
    rajyaSelect.addEventListener('change', function() {
      const rajya = this.value;
      sambhagSelect.innerHTML = '<option value="">चुनें</option>';
      jilaSelect.innerHTML = '<option value="">चुनें</option>';
      if (rajya) {
        Object.keys(locationData[rajya]).forEach(sambhag => {
          const option = document.createElement('option');
          option.value = sambhag;
          option.textContent = sambhag;
          sambhagSelect.appendChild(option);
        });
      }
    });
  }

  updateSambhag(senaniRajya, senaniSambhag, senaniJila);
  updateSambhag(uttaradhikariRajya, uttaradhikariSambhag, uttaradhikariJila);

  // संभाग बदलने पर जिले अपडेट करें
  function updateJila(sambhagSelect, jilaSelect, rajyaSelect) {
    sambhagSelect.addEventListener('change', function() {
      const rajya = rajyaSelect.value;
      const sambhag = this.value;
      jilaSelect.innerHTML = '<option value="">चुनें</option>';
      if (rajya && sambhag) {
        locationData[rajya][sambhag].forEach(jila => {
          const option = document.createElement('option');
          option.value = jila;
          option.textContent = jila;
          jilaSelect.appendChild(option);
        });
      }
    });
  }

  updateJila(senaniSambhag, senaniJila, senaniRajya);
  updateJila(uttaradhikariSambhag, uttaradhikariJila, uttaradhikariRajya);

  // नया राज्य/संभाग/जिला जोड़ें (उदाहरण)
  function addNewLocation(addButtonId, newInputId, selectElement, locationType) {
    document.getElementById(addButtonId).addEventListener('click', function() {
      const newInput = document.getElementById(newInputId);
      if (newInput.style.display === 'none') {
        newInput.style.display = 'block';
      } else {
        const newValue = newInput.value;
        if (newValue) {
          const option = document.createElement('option');
          option.value = newValue;
          option.textContent = newValue;
          selectElement.appendChild(option);
          // Google Sheet में नया स्थान जोड़ने के लिए Google Apps Script फ़ंक्शन को कॉल करें
        }
        newInput.style.display = 'none';
      }
    });
  }

  addNewLocation('addSenaniRajya', 'newSenaniRajya', senaniRajya, 'राज्य');
  addNewLocation('addSenaniSambhag', 'newSenaniSambhag', senaniSambhag, 'संभाग');
  addNewLocation('addSenaniJila', 'newSenaniJila', senaniJila, 'जिला');
  addNewLocation('addUttaradhikariRajya', 'newUttaradhikariRajya', uttaradhikariRajya, 'राज्य');
  addNewLocation('addUttaradhikariSambhag', 'newUttaradhikariSambhag', uttaradhikariSambhag, 'संभाग');
  addNewLocation('addUttaradhikariJila', 'newUttaradhikariJila', uttaradhikariJila, 'जिला');

  // Google Sheet से सेनानी नाम लोड करें (उदाहरण)
  fetch('https://script.google.com/macros/s/AKfycbyPLaBRhg83rtQN659D8sFQM1vlSteYs2RPscPwTvgnR3tHQ5zEmSshZOTQhNb3DUed/exec?action=getSenaniNames')
    .then(response => response.json())
    .then(data => {
      data.forEach(naam => {
        const option = document.createElement('option');
        option.value = naam;
        option.textContent = naam;
        senaniNaam.appendChild(option);
      });
    })
    .catch(error => console.error('सेनानी नाम लोड करने में त्रुटि:', error));

  // नया सेनानी नाम जोड़ें (उदाहरण)
  document.getElementById('addSenaniNaam').addEventListener('click', function() {
    const newSenaniNaamInput = document.getElementById('newSenaniNaam');
    if (newSenaniNaamInput.style.display === 'none') {
      newSenaniNaamInput.style.display = 'block';
    } else {
      const newSenaniNaam = newSenaniNaamInput.value;
      if (newSenaniNaam) {
        const option = document.createElement('option');
        option.value = newSenaniNaam;
        option.textContent = newSenaniNaam;
        senaniNaam.appendChild(option);
        // Google Sheet में नया सेनानी नाम जोड़ने के लिए Google Apps Script फ़ंक्शन को कॉल करें
      }
      newSenaniNaamInput.style.display = 'none';
    }
  });

  // संबंध के अनुसार अतिरिक्त फ़ील्ड दिखाएँ
  sambandh.addEventListener('change', function() {
    const selectedSambandh = this.value;
    extraFields.innerHTML = ''; // पहले सभी अतिरिक्त फ़ील्ड हटाएं

    if (selectedSambandh === 'पोता' || selectedSambandh === 'प्रपौत्र') {
      const pitaNaamLabel = document.createElement('label');
      pitaNaamLabel.textContent = 'पिता का नाम:';
      extraFields.appendChild(pitaNaamLabel);

      const pitaNaamInput = document.createElement('input');
      pitaNaamInput.type = 'text';
      pitaNaamInput.name = 'pitaNaam';
      extraFields.appendChild(pitaNaamInput);
    }

    if (selectedSambandh === 'प्रपौत्र') {
      const dadaNaamLabel = document.createElement('label');
      dadaNaamLabel.textContent = 'दादा का नाम:';
      extraFields.appendChild(dadaNaamLabel);

      const dadaNaamInput = document.createElement('input');
      dadaNaamInput.type = 'text';
      dadaNaamInput.name = 'dadaNaam';
      extraFields.appendChild(dadaNaamInput);
    }
  });

  // फ़ॉर्म सबमिट करें
  const form = document.getElementById('senaniForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Google Apps Script वेब ऐप URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyPLaBRhg83rtQN659D8sFQM1vlSteYs2RPscPwTvgnR3tHQ5zEmSshZOTQhNb3DUed/exec';

    fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
