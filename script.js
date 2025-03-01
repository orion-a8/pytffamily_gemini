document.addEventListener("DOMContentLoaded", function() {
    loadStates();
    loadRelations();

    document.getElementById("state").addEventListener("change", loadDivisions);
    document.getElementById("division").addEventListener("change", loadDistricts);
    document.getElementById("district").addEventListener("change", loadFighters);
    document.getElementById("relation").addEventListener("change", handleRelationFields);
    document.getElementById("registrationForm").addEventListener("submit", submitForm);
});

function loadStates() {
    fetch("/get_states").then(r => r.json()).then(data => {
        const stateSelect = document.getElementById("state");
        stateSelect.innerHTML = '<option value="">राज्य चुनें</option>';
        data.forEach(state => {
            stateSelect.innerHTML += `<option value="${state['State ID']}">${state['State Name']}</option>`;
        });
    });
}

function loadDivisions() {
    const stateId = document.getElementById("state").value;
    fetch(`/get_divisions/${stateId}`).then(r => r.json()).then(data => {
        const divisionSelect = document.getElementById("division");
        divisionSelect.innerHTML = '<option value="">संभाग चुनें</option>';
        data.forEach(div => {
            divisionSelect.innerHTML += `<option value="${div['Division ID']}">${div['Division Name']}</option>`;
        });
    });
}

function loadDistricts() {
    const divisionId = document.getElementById("division").value;
    fetch(`/get_districts/${divisionId}`).then(r => r.json()).then(data => {
        const districtSelect = document.getElementById("district");
        districtSelect.innerHTML = '<option value="">जिला चुनें</option>';
        data.forEach(dist => {
            districtSelect.innerHTML += `<option value="${dist['District ID']}">${dist['District Name']}</option>`;
        });
    });
}

function loadFighters() {
    const districtId = document.getElementById("district").value;
    fetch(`/get_fighters/${districtId}`).then(r => r.json()).then(data => {
        const fighterSelect = document.getElementById("fighter");
        fighterSelect.innerHTML = '<option value="">सेनानी चुनें</option>';
        data.forEach(ff => {
            fighterSelect.innerHTML += `<option value="${ff['सेनानी का नाम']}">${ff['सेनानी का नाम']}</option>`;
        });
    });
}

function loadRelations() {
    fetch("/get_relations").then(r => r.json()).then(data => {
        const relationSelect = document.getElementById("relation");
        relationSelect.innerHTML = '<option value="">संबंध चुनें</option>';
        data.forEach(rel => {
            relationSelect.innerHTML += `<option value="${rel['संबंध']}">${rel['संबंध']}</option>`;
        });
    });
}

function handleRelationFields() {
    const relation = document.getElementById("relation").value;
    const dynamicFields = document.getElementById("dynamicFields");
    dynamicFields.innerHTML = "";

    if (relation === "प्रपौत्र" || relation === "पोता") {
        dynamicFields.innerHTML += '<label>पिता का नाम:</label><input type="text" id="father_name" required><br>';
        dynamicFields.innerHTML += '<label>दादा का नाम:</label><input type="text" id="grandfather_name" required><br>';
    } else if (relation === "नाती") {
        dynamicFields.innerHTML += '<label>माता का नाम:</label><input type="text" id="mother_name" required><br>';
    }
}

function submitForm(e) {
    e.preventDefault();
    const data = {
        state_id: document.getElementById("state").value,
        division_id: document.getElementById("division").value,
        district_id: document.getElementById("district").value,
        fighter_name: document.getElementById("fighter").value,
        relation: document.getElementById("relation").value,
        heir_name: document.getElementById("heir_name").value,
        mobile_number: document.getElementById("mobile_number").value,
        address: document.getElementById("address").value,
        other_info: document.getElementById("other_info").value,
        father_name: document.getElementById("father_name")?.value || "",
        mother_name: document.getElementById("mother_name")?.value || "",
        grandfather_name: document.getElementById("grandfather_name")?.value || "",
        spouse_name: ""
    };

    fetch("/submit_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json()).then(resp => {
        if (resp.success) alert("डेटा सफलतापूर्वक सेव हो गया है!");
        else alert("त्रुटि: " + resp.message);
    });
}
