interface Feedback {
  name: string;
  text: string;
  stars: number;
}

export const feedbacks: Feedback[] = [
  {
    text: 'Mõistlikud hinnad, kiire teenindus ja meeldiv personal. Julgen kindlasti soovitada.',
    name: 'Tiit, Tallinnast',
    stars: 5,
  },
  {
    text: 'Broneerisin rehvivahetuse aja internetis ja sain juba järgmine päev kõik ilusti tehtud.',
    name: 'Katrin, Simunast',
    stars: 5,
  },
  {
    text: 'Pidin päris mitu korda helistame, et telefoni teel kätte saaks kedagi. Muu läks kõik sujuvalt.',
    name: 'Jaagup, Pärnust',
    stars: 4,
  },
];
