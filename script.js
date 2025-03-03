document.addEventListener('DOMContentLoaded', () => {
    // राज्य, संभाग और जिला डेटा
    const stateDivisionData = {
        'उत्तर प्रदेश': {
            'लखनऊ': ['लखनऊ', 'रायबरेली', 'हरदोई'],
            'कानपुर': ['कानपुर नगर', 'कानपुर देहात', 'फतेहपुर'],
            'मेरठ': ['मेरठ', 'गाजियाबाद', 'बागपत']
        },
        'मध्य प्रदेश': {
            'भोपाल': ['भोपाल', 'विदिशा', 'रायसेन'],
            'इंदौर': ['इंदौर', 'उज्जैन', 'देवास'],
            'जबलपुर': ['जबलपुर', 'कटनी', 'मंडला']
        }
    };

    // डायनामिक ड्रॉपडाउन फंक्शन
    function setupDropdowns(stateSelectId, divisionSelectId, districtSelectId) {
        const stateSelect = document.getElementById(stateSelectId);
        const divisionSelect = document.getElementById(divisionSelectId);
        const districtSelect = document.getElementById(districtSelectId);

        stateSelect.addEventListener('change', () => {
            divisionSelect.innerHTML = '<option value="">चुनें</option>';
            districtSelect.innerHTML = '<option value="">चुनें</option>';
            
            if (stateSelect.value) {
                divisionSelect.disabled = false;
                const divisions = Object.keys(stateDivisionData[stateSelect.value]);
                divisions.forEach(div => {
                    divisionSelect.innerHTML += <option>${div}</option>;
                });
            } else {
                divisionSelect.disabled = true;
                districtSelect.disabled = true;
            }
        });

        divisionSelect.addEventListener('change', () => {
            districtSelect.innerHTML = '<option value="">चुनें</option>';
            
            if (divisionSelect.value) {
                districtSelect.disabled = false;
                const districts = stateDivisionData[stateSelect.value][divisionSelect.value];
                districts.forEach(dist => {
                    districtSelect.innerHTML += <option>${dist}</option>;
                });
            } else {
                districtSelect.disabled = true;
            }
        });
    }

    // सेनानी और उत्तराधिकारी के ड्रॉपडाउन सेट करें
    setupDropdowns('ffState', 'ffDivision', 'ffDistrict');
    setupDropdowns('heirState', 'heirDivision', 'heirDistrict');

    // संबंध के अनुसार फील्ड
    document.getElementById('relationship').addEventListener('change', function() {
        const relationFields = document.getElementById('relationFields');
        relationFields.innerHTML = '';
        
        switch(this.value) {
            case 'प्रपौत्र':
                relationFields.innerHTML += `
                    <div class="relation-field">
                        <label>पिता का नाम:</label>
                        <input type="text" required>
                    </div>
                    <div class="relation-field">
                        <label>दादा का नाम:</label>
                        <input type="text" required>
                    </div>
                `;
                break;
                
            case 'पोता':
                relationFields.innerHTML += `
                    <div class="relation-field">
                        <label>पिता का नाम:</label>
                        <input type="text" required>
                    </div>
                `;
                break;
        }
    });

    // Google Sheet से सेनानी के नाम
    async function loadFighterNames() {
        try {
            // यहां अपने Google Apps Script URL का उपयोग करें
            const response = await fetch('YOUR_GOOGLE_SCRIPT_URL_HERE');
            const names = await response.json();
            
            const select = document.getElementById('fighterName');
            names.forEach(name => {
                select.innerHTML += <option>${name}</option>;
            });
        } catch (error) {
            console.error('Error loading names:', error);
        }
    }
    loadFighterNames();

    // फॉर्म सबमिशन
    document.getElementById('registrationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            ffState: document.getElementById('ffState').value,
            ffDivision: document.getElementById('ffDivision').value,
            ffDistrict: document.getElementById('ffDistrict').value,
            fighterName: document.getElementById('fighterName').value || document.getElementById('newFighterName').value,
            relationship: document.getElementById('relationship').value,
            heirName: document.getElementById('heirName').value,
            mobile: document.getElementById('mobile').value,
            heirState: document.getElementById('heirState').value,
            heirDivision: document.getElementById('heirDivision').value,
            heirDistrict: document.getElementById('heirDistrict').value,
            address: document.getElementById('address').value,
            additionalInfo: document.getElementById('additionalInfo').value
        };

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxxqVUteIWtcd_A0XfFh2wq8A4lI5iVNC3RUIzt_5yomTpBgaqxezF4jMZGssRacqJM/exec', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                document.getElementById('message').textContent = 'डेटा सफलतापूर्वक सहेजा गया!';
                document.getElementById('registrationForm').reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            document.getElementById('message').textContent = 'त्रुटि: डेटा सहेज नहीं पाए';
        }
    });
});
