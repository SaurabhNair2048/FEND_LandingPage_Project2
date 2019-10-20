document.addEventListener('DOMContentLoaded', function(event){
    /* On content loaded setup the navbar, this step is till line 13*/
    let sections = document.querySelectorAll('.section>h2');
    let navbar = document.querySelector('.navbar');
    navbar.setAttribute('style', 'background-color: darkkhaki;');
    navbar.innerHTML = '';
    let count = 0;
    for(section of sections){
        navbar.innerHTML += '<li><a href="#'+section.innerHTML+'">'+ section.innerHTML + '</a></li>';
        section.setAttribute('id', section.innerHTML);
    }
    document.querySelector('.navbar>li').setAttribute('style', 'background-color: blanchedalmond;');
    inView();

    /*Once navbar is set, on scroll of content element set visibility of navbar to visible and after 2 seconds make it invisible(hidden)*/
    let timeout = null;
    document.querySelector('.content').addEventListener('scroll', function(event){
        if(timeout != null){
            clearTimeout(timeout);
        }
        let target = event.target;
        
        let nav = document.querySelector('.navbar');
        let navChildren = document.querySelector('.navbar').querySelectorAll('*');
        nav.setAttribute('style', 'visibility: visible;');
        for(navChild of navChildren){
            navChild.setAttribute('style', 'visibility: visible;');
        }
        timeout = setTimeout(function makeInvisible(){
            nav.setAttribute('style', 'visibility: hidden;');
            for(navChild of navChildren){
                navChild.setAttribute('style', 'visibility: hidden;');
            }
        }, 2000);
        navbar.setAttribute('style', 'background-color: darkkhaki;');
        inView();
    });

    /* On mouseOver the header, display the navbar*/
    document.querySelector('.header').addEventListener('mouseover', function(event){
        let nav = document.querySelector('.navbar');
        let navChildren = document.querySelector('.navbar').querySelectorAll('*');
        nav.setAttribute('style', 'visibility: visible;');
        for(navChild of navChildren){
            navChild.setAttribute('style', 'visibility: visible;');
        }
        navbar.setAttribute('style', 'background-color: darkkhaki;');
        inView();
    });
});

/*On clicking navbar link, scroll the desired section into view*/
document.addEventListener('click', function(event){
    if(event.target.nodeName === 'A' && event.target.innerHTML != 'click here'){
        event.target.addEventListener('click', function(e){
            e.preventDefault();
            e.target.onclick = document.getElementById(e.target.innerHTML).scrollIntoView();
            
            inView();
        });
    }
}, true);

/*This function checks if a content header is below the top of screen and above 50% of viewport height. If so, sets the section as active &additionally changes the background color of corresponding navbar link*/
function inView(){
    let sections = document.querySelectorAll('.section');
    for(section of sections){
        let locationOfSection = section.getBoundingClientRect();
        if(locationOfSection.top >=0 && locationOfSection.top < (window.innerHeight || document.documentElement.clientHeight)/2 ){
            section.setAttribute('style', 'background-color: grey;');
            let idForNav = section.firstElementChild.innerHTML;
            let navs = document.querySelectorAll('.navbar a');
            for(nav of navs){
                if(nav.innerHTML == idForNav){
                    nav.setAttribute('style', 'background-color: blanchedalmond;');
                } else {
                    nav.setAttribute('style', 'background-color: darkkhaki;');
                }
            }
        } else{
            section.setAttribute('style', 'background-color: whitesmoke;');
        }
    }
}