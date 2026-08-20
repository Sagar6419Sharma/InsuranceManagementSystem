async function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );

        window.location.href =
            "home.html";

    } else {

        alert(data.message);

    }

}


// SHOW ALL INSURANCE

async function getInsurance() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/insurance",
        {
            headers: {
                Authorization: token
            }
        }
    );

    const data =
        await response.json();


    let html = `

        <table class="customer-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Phone</th>

                    <th>Policy</th>

                    <th>Premium</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

    `;


    data.forEach(item => {

        html += `

            <tr>

                <td>
                    EMP-${item.id}
                </td>

                <td>
                    ${item.first_name}
                    ${item.last_name}
                </td>

                <td>
                    ${item.phone}
                </td>

                <td>
                    ${item.policy_name}
                </td>

                <td>
                    ₹${item.premium}
                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="viewInsurance(${item.id})"
                    >
                        👁️
                    </button>


                    <button
                        class="edit-btn"
                        onclick="editInsurance(
                            ${item.id},
                            '${item.first_name}',
                            '${item.last_name}',
                            '${item.phone}',
                            '${item.email}',
                            '${item.policy_name}',
                            '${item.policy_type}',
                            ${item.premium},
                            ${item.coverage_amount}
                        )"
                    >
                        ✏️
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteInsurance(${item.id})"
                    >
                        🗑️
                    </button>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

    `;


    document.getElementById(
        "result"
    ).innerHTML = html;

}

// VIEW DETAILS

function viewInsurance(id) {

    window.location.href =
        `details.html?id=${id}`;

}


// EDIT
function editInsurance(id) {

    localStorage.setItem(
        "editId",
        id
    );

    window.location.href =
        "add-insurance.html";

}
// DELETE

async function deleteInsurance(id) {

    const token =
        localStorage.getItem("token");

    await fetch(
        `http://localhost:5000/api/insurance/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: token
            }
        }
    );

    getInsurance();

}
function setPolicyDetails() {

    const policy =
        document.getElementById(
            "policy_name"
        ).value;


    const type =
        document.getElementById(
            "policy_type"
        );

    const premium =
        document.getElementById(
            "premium"
        );

    const coverage =
        document.getElementById(
            "coverage_amount"
        );


    if (
        policy ===
        "Health Secure Basic"
    ) {

        type.value =
            "Health";

        premium.value =
            5000;

        coverage.value =
            500000;

    }


    else if (
        policy ===
        "Health Secure Premium"
    ) {

        type.value =
            "Health";

        premium.value =
            12000;

        coverage.value =
            1000000;

    }


    else if (
        policy ===
        "Family Protection Plan"
    ) {

        type.value =
            "Life";

        premium.value =
            8000;

        coverage.value =
            1500000;

    }


    else if (
        policy ===
        "Vehicle Shield Plus"
    ) {

        type.value =
            "Vehicle";

        premium.value =
            6500;

        coverage.value =
            300000;

    }


    else if (
        policy ===
        "Home Safety Gold"
    ) {

        type.value =
            "Home";

        premium.value =
            9000;

        coverage.value =
            2000000;

    }

}


// ADD / UPDATE

async function addInsurance() {

    const token =
        localStorage.getItem("token");

    const editId =
        localStorage.getItem("editId");


    const first_name =
        document.getElementById("first_name").value;

    const last_name =
    document.getElementById("last_name").value.trim();

    const phone =
        document.getElementById("phone").value;
        if (phone.length !== 10) {

    alert(
        "Phone number must be exactly 10 digits"
    );

    return;

}

    const email =
        document.getElementById("customer_email").value;

    const policy_name =
        document.getElementById("policy_name").value;

    const policy_type =
        document.getElementById("policy_type").value;

    const premium =
        document.getElementById("premium").value;

    const coverage_amount =
        document.getElementById("coverage_amount").value;


    let url =
        "http://localhost:5000/api/insurance";

    let method =
        "POST";


    if (editId) {

        url += `/${editId}`;

        method = "PUT";

    }


    const response = await fetch(
        url,
        {
            method,

            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },

            body: JSON.stringify({

                first_name,
                last_name,
                phone,
                email,

                policy_name,
                policy_type,
                premium,
                coverage_amount

            })

        }
    );



    const data =
        await response.json();

    alert(data.message);

    localStorage.removeItem("editId");

    window.location.href =
        "home.html";

}


// REPORT

async function getReport() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/reports",
        {
            headers: {
                Authorization: token
            }
        }
    );

    const data =
        await response.json();

    document.getElementById(
        "report"
    ).innerHTML = `

        <h4>
            Total Policies:
            ${data.totalPolicies}
        </h4>

        <h4>
            Total Premium:
            ₹${data.totalPremium}
        </h4>

        <h4>
            Total Coverage:
            ₹${data.totalCoverage}
        </h4>

    `;

}





// reload table
getInsurance();

// LOGOUT

function logout() {

    localStorage.removeItem(
        "token"
    );



    window.location.href =
        "index.html";

}


// AUTO LOAD
window.onload = async function () {

    // Customer table load
    if (document.getElementById("result")) {

        getInsurance();

    }


    // Edit mode check
    const editId =
        localStorage.getItem("editId");


    if (editId) {

        const token =
            localStorage.getItem("token");


        const response =
            await fetch(
                `http://localhost:5000/api/insurance/${editId}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );


        const data =
            await response.json();


        // Change title
        document.getElementById(
            "formTitle"
        ).innerText =
            "Edit Customer Details";


        // Fill form
        document.getElementById(
            "first_name"
        ).value =
            data.first_name;


        document.getElementById(
            "last_name"
        ).value =
            data.last_name || "";


        document.getElementById(
            "phone"
        ).value =
            data.phone;


        document.getElementById(
            "customer_email"
        ).value =
            data.email;


        document.getElementById(
            "policy_name"
        ).value =
            data.policy_name;


        // Auto fill policy details
        setPolicyDetails();

    }

};

async function searchCustomer() {

    const value =
        document.getElementById(
            "searchInput"
        ).value;

    const token =
        localStorage.getItem(
            "token"
        );

    const response =
        await fetch(
            `http://localhost:5000/api/insurance/search/${value}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );

    const data =
        await response.json();


    if (data.message) {

        document.getElementById(
            "searchResult"
        ).innerHTML = `

            <div class="customer-card">

                <h2>
                    ❌ Customer Not Found
                </h2>

            </div>

        `;

        return;

    }


    document.getElementById(
        "searchResult"
    ).innerHTML = `

        <div class="customer-card">

            <h2>
                👤 Customer Profile
            </h2>

            <p><b>ID:</b> ${data.id}</p>

            <p><b>First Name:</b> ${data.first_name}</p>

            <p><b>Last Name:</b> ${data.last_name}</p>

            <p><b>Phone:</b> ${data.phone}</p>

            <p><b>Email:</b> ${data.email}</p>

            <hr>

            <p><b>Policy Name:</b> ${data.policy_name}</p>

            <p><b>Policy Type:</b> ${data.policy_type}</p>

            <p><b>Premium:</b> ₹${data.premium}</p>

            <p><b>Coverage:</b> ₹${data.coverage_amount}</p>

        </div>

    `;

}
function showSecurityInfo() {

    alert(

        "Insurance Management System\n\n" +

        "✓ JWT Authentication\n" +

        "✓ Admin Role Protection\n" +

        "✓ Secure Customer Database\n" +

        "✓ Protected API Routes"

    );

}
function validatePhone(input) {

    input.value = input.value
        .replace(/[^0-9]/g, "")
        .slice(0, 10);

}
if (editId) {

    document.getElementById(
        "formTitle"
    ).innerText =
        "Edit Customer Details";

}