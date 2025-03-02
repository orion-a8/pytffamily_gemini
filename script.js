document.addEventListener("DOMContentLoaded", function () {
    loadStates("state");
    loadStates("successorState");
});


function loadStates(elementId) {
    let states = ["उत्तर प्रदेश", "मध्य प्रदेश"]; // राज्य लिस्ट
    let stateDropdown = document.getElementById(elementId);

    if (stateDropdown) {  // अगर dropdown फॉर्म में है, तभी चले
        stateDropdown.innerHTML = `<option value="">राज्य चुनें</option>`; // डिफ़ॉल्ट ऑप्शन

        states.forEach(state => {
            let option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateDropdown.appendChild(option);
        });
    }
}

function loadDivisions(state, divisionId) {
    const divisions = {
        "उत्तर प्रदेश": ["लखनऊ", "वाराणसी"],
        "मध्य प्रदेश": ["भोपाल", "इंदौर"]
    };
    let divisionDropdown = document.getElementById(divisionId);
    divisionDropdown.innerHTML = <option value="">संभाग चुनें</option>;
    if (divisions[state]) {
        divisions[state].forEach(division => {
            let option = document.createElement("option");
            option.value = division;
            option.textContent = division;
            divisionDropdown.appendChild(option);
        });
    }
}

function loadDistricts(division, districtId) {
    const districts = {
        "लखनऊ": ["लखनऊ", "बाराबंकी"],
        "वाराणसी": ["वाराणसी", "चंदौली"],
        "भोपाल": ["भोपाल", "सीहोर"],
        "इंदौर": ["इंदौर", "उज्जैन"]
    };
    let districtDropdown = document.getElementById(districtId);
    districtDropdown.innerHTML = <option value="">जिला चुनें</option>;
    if (districts[division]) {
        districts[division].forEach(district => {
            let option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtDropdown.appendChild(option);
        });
    }
}

function loadFighterNames() {
    google.script.run.withSuccessHandler(fighters => {
        let fighterDropdown = document.getElementById("fighterName");
        fighterDropdown.innerHTML = <option value="">सेनानी चुनें</option>;
        fighters.forEach(fighter => {
            let option = document.createElement("option");
            option.value = fighter;
            option.textContent = fighter;
            fighterDropdown.appendChild(option);
        });
    }).getFighterNames();
}

function loadFighterData(fighterName) {
    if (fighterName) {
        google.script.run.withSuccessHandler(data => {
            console.log("सेनानी डेटा:", data);
        }).getFighterDetails(fighterName);
    }
}

function showExtraFields(relation) {
    let extraFields = document.getElementById("extraFields");
    extraFields.innerHTML = "";
    
    if (relation === "प्रपौत्र") {
        extraFields.innerHTML = `
            <label for="fatherName">पिता का नाम:</label>
            <input type="text" id="fatherName" name="fatherName" required>
            <label for="grandfatherName">दादा का नाम:</label>
            <input type="text" id="grandfatherName" name="grandfatherName" required>
        `;
    } else if (relation === "पोता") {
        extraFields.innerHTML = `
            <label for="fatherName">पिता का नाम:</label>
            <input type="text" id="fatherName" name="fatherName" required>
        `;
    }
}

document.getElementById("freedomFighterForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    let data = {};
    formData.forEach((value, key) => data[key] = value);
    
    google.script.run.withSuccessHandler(response => {
        alert("डेटा सफलतापूर्वक सेव हुआ!");
        document.getElementById("freedomFighterForm").reset();
    }).saveFormData(data);
});
