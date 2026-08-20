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
        <table border="1" width="100%">
            <tr>
                <th>ID</th>
                <th>Policy Name</th>
                <th>Type</th>
                <th>Premium</th>
                <th>Coverage</th>
                <th>Action</th>
            </tr>
    `;

    data.forEach(item => {

        html += `
            <tr>

                <td>${item.id}</td>

                <td>${item.policy_name}</td>

                <td>${item.policy_type}</td>

                <td>${item.premium}</td>

                <td>${item.coverage_amount}</td>

                <td>

                    <button onclick="viewInsurance(${item.id})">
                        View
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editInsurance(
                            ${item.id},
                            '${item.policy_name}',
                            '${item.policy_type}',
                            ${item.premium},
                            ${item.coverage_amount}
                        )"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteInsurance(${item.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

    html += "</table>";

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

function editInsurance(
    id,
    policy_name,
    policy_type,
    premium,
    coverage_amount
) {

    document.getElementById(
        "policy_name"
    ).value = policy_name;

    document.getElementById(
        "policy_type"
    ).value = policy_type;

    document.getElementById(
        "premium"
    ).value = premium;

    document.getElementById(
        "coverage_amount"
    ).value = coverage_amount;

    localStorage.setItem(
        "editId",
        id
    );

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


// ADD / UPDATE

async function addInsurance() {

    const token =
        localStorage.getItem("token");

    const editId =
        localStorage.getItem("editId");


    const first_name =
        document.getElementById("first_name").value;

    const last_name =
        document.getElementById("last_name").value;

    const phone =
        document.getElementById("phone").value;

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
localStorage.removeItem("editId");

getInsurance();

document.querySelector("form")?.reset();

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

localStorage.removeItem("editId");

// clear form fields
document.getElementById("first_name").value = "";
document.getElementById("last_name").value = "";
document.getElementById("phone").value = "";
document.getElementById("customer_email").value = "";
document.getElementById("policy_name").value = "";
document.getElementById("policy_type").value = "";
document.getElementById("premium").value = "";
document.getElementById("coverage_amount").value = "";

// reload table
getInsurance();

// LOGOUT

function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "editId"
    );

    window.location.href =
        "index.html";

}


// AUTO LOAD

window.onload = function () {

    if (document.getElementById("result")) {

        getInsurance();

    }

};

async function searchInsurance() {

    const id =
        document.getElementById("searchId").value;

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/insurance/${id}`,
        {
            headers: {
                Authorization: token
            }
        }
    );

    const data = await response.json();

    if (data.message) {

        document.getElementById(
            "searchResult"
        ).innerHTML =
            "<h3>Customer Not Found</h3>";

        return;

    }

    document.getElementById(
        "searchResult"
    ).innerHTML = `

        <h2>Customer Details</h2>

        <p><b>ID:</b> ${data.id}</p>

        <p><b>First Name:</b> ${data.first_name || "-"}</p>

        <p><b>Last Name:</b> ${data.last_name || "-"}</p>

        <p><b>Phone:</b> ${data.phone || "-"}</p>

        <p><b>Email:</b> ${data.email || "-"}</p>

        <hr>

        <p><b>Policy Name:</b> ${data.policy_name}</p>

        <p><b>Policy Type:</b> ${data.policy_type}</p>

        <p><b>Premium:</b> ₹${data.premium}</p>

        <p><b>Coverage:</b> ₹${data.coverage_amount}</p>

    `;

}
async function searchByName() {

    const name =
        document.getElementById("searchName").value;

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(
            `http://localhost:5000/api/insurance/name/${name}`,
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
        ).innerHTML =
            "<h3>Customer Not Found</h3>";

        return;

    }

    document.getElementById(
        "searchResult"
    ).innerHTML = `

        <h2>Customer Details</h2>

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

    `;

}
