//recuperer  les elements du case
let cases = [...document.getElementsByClassName("case")];
let joueur = document.getElementById("joueur");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("scoreNul");

//les initialisations necessaires
let state = {
    joueurEnCours: 1,
    scoreJ1: 0,
    scoreJ2: 0,
    matchNuls: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0,
};

//remettre a zero tous les cases apres une victoire de l'un des joueur
const resetState = () => {
    state.joueurEnCours = 1;
    state.c1 = 0;
    state.c2 = 0;
    state.c3 = 0;
    state.c4 = 0;
    state.c5 = 0;
    state.c6 = 0;
    state.c7 = 0;
    state.c8 = 0;
    state.c9 = 0;
};

//fonction si le coup jouer est synonyme de victoir
const verifierVictoire = () => {
    if(
        (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
        (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
        (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
        (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
        (state.c3 == state.c5 && state.c5 == state.c7 && state.c3 > 0) ||
        (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
        (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
        (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0) 
     
    ) {
        return true;
    } else if(
        state.c1 != 0 &&
        state.c2 != 0 &&
        state.c3 != 0 &&
        state.c4 != 0 &&
        state.c5 != 0 &&
        state.c6 != 0 &&
        state.c7 != 0 &&
        state.c8 != 0 &&
        state.c9 != 0 
    ) { return null; } else {
        return false;
    }
};

//la fonction qui est appeler par l'ecouteur d'evenement
const jouerCase = (e) => {

    //on va cibler l'element html dans lequel l'evenement viens de se produire pour 
    //recuperer la case qui vient d'etre cliquer
    let idCase = e.target.id;
    //on veut verifier si la case a deja ete jouer
    if (state[idCase] != 0) return;

    state[idCase] = state.joueurEnCours;

    let isVictoir = verifierVictoire();

    if(isVictoir == true) {
        alert( "Le gagnant est le joueur" + state.joueurEnCours);
        if(state.joueurEnCours == 1){
            state.scoreJ1++;
            score1.textContent = state.scoreJ1;
        } else {
            state.scoreJ2++;
            score2.textContent = state.scoreJ2;
        };
        
        //on remet à 0 la valeur des cases
        resetState();
        //on efface les dessins sur les cases
        cases.forEach((c) => (c.textContent = ""));

    }
    //ici les 3 egales sont necessaires parce que sinon null ou false c'est du pareille au meme
     else if (isVictoir === null) {
        alert("Match Null");
        state.matchNuls++;
        scoreNul.textContent = state.matchNuls;
        resetState();
        cases.forEach((c) => (c.textContent = ""));
    } else if (isVictoir == false){
        if(state.joueurEnCours == 1) {
            e.target.textContent = "X";
            state.joueurEnCours = 2;
            joueur.textContent = "2";
        } else {
            e.target.textContent = "O";
            state.joueurEnCours = 1;
            joueur.textContent = "1";
        }
    }

   //affiche dans la console ce qui est dans la variable idCase
    console.log(idCase); 
    //afficle l'evenement "e" dans la console
    console.log(e);
};

//il faut ecouter si un joueur a clicker dans une case
cases.forEach((el) => {
    el.addEventListener("click",jouerCase);
    
})