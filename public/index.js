//for hiding new file add option :-
function myFunction() {
    //console.log("test");
    var x = document.getElementById("fileupload");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

//back to HOME :-
function clickhere() {
    window.location.href = "http://localhost:3000/csvData";

}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('Playlist');

const url = 'http://localhost:3000/test';

const locUrl = 'http://localhost:3000/loc?ID=';

let ID;
//let ids = [];

fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        let authors = data;
        return authors.map(function (author) {
            let li = createNode('li');

            let span = createNode('span');
            
            ID ="a" + author.ID + "";
            span.className = ID;

            span.innerHTML = `${author.Name}`;
            //span.onclick = "MyFunction()";
           

            append(li, span);
            append(ul, li);
            
            //JQUERY :-
           // $("span").on("click",())
        })
    })
    .catch(function (error) {
        console.log(error);
    });

    







