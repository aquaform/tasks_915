function myFunction() {
    var x = document.getElementById("answer_1");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

(function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if (window.pageYOffset > 200) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active'); 
        }
    }
}());