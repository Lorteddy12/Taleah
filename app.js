const API_URL = "https://eecu-data-server.vercel.app/data";
let allCareers = [];

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("search-careers");
    const section = document.getElementById("career-selection");

    async function fetchCareers() {
        try {
            const response = await fetch(API_URL);
            allCareers = await response.json();
            renderCareers(allCareers);
        } catch (error) {
            console.error("Failed to fetch careers:", error);
            section.innerHTML = "<p>Failed to load careers. Please try again.</p>";
        }
    } // Render careers as buttons

    function renderCareers(careers) {
        section.innerHTML = "";

        if (careers.length === 0) {
            section.innerHTML = "<p>No careers found.</p>";
            return;
        } // Create buttons for each career

        careers.forEach(career => {
            const button = document.createElement("button");
            button.classList.add("career");

            const salary = `$${career.Salary.toLocaleString()}.00/yr`;
            button.innerHTML = `<p>${career.Occupation}</p><br><p>${salary}</p>`; // Add click event to update selected career display

            button.addEventListener("click", () => {
                document.querySelector(".selected-career p").textContent =
                    `${career.Occupation} - ${salary}`;
                document.querySelectorAll(".career").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            }); // Append button to the section

            section.appendChild(button);
        });
    }

    // Search filters as you type
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = allCareers.filter(career =>
            career.Occupation.toLowerCase().includes(query)
        );
        renderCareers(filtered);
    }); // Initial fetch of careers on page load

    fetchCareers();

});



//career buttons
const button = document.getElementsByTagName('button');

button.addEventListener('click', function () {
    const career = this.getAttribute('data-career');
    const careerInfo = document.getElementById(career);
    if (careerInfo.style.display === 'block') {
        careerInfo.style.display = 'none';
    } else {
        careerInfo.style.display = 'block';
    }
}); //career info display

