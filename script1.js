// Button in index.html
document.addEventListener("DOMContentLoaded", function () {
    function toggleDropdown() {
        console.log("Toggling dropdown"); // Debugging
        document.getElementById("dropdownMenu").classList.toggle("show");
    }
  
    // ✅ Add event listener to the button
    document.getElementById("playButton").addEventListener("click", toggleDropdown);
  
    // ✅ Close dropdown if clicking outside
    window.addEventListener("click", function (event) {
        if (!event.target.matches('#playButton')) {
            let dropdown = document.getElementById("dropdownMenu");
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });
  });