interface Feedback {
  name: string
  text: string
  stars: number
}

export const feedbacks: Feedback[] = [
  {
    text: 'Käisin rehve vahetamas ja kui autole järele tulin, oli masinale ka viies rehv alla pandud. Lisatasu ei võetud, soovitan!',
    name: 'Tiit, Tallinnast',
    stars: 5
  },
  {
    text: 'Tõin auto hooldusesse ja kui tagasi jõudsin, oli ta saanud täiesti tutika rehvide komplekti, millest üks ei olnud isegi rehv. Põnev!',
    name: 'Katrin, Simunast',
    stars: 5
  },
  {
    text: 'Unustasin oma autole järele minna, seega ei oska kommenteerida. Piltide pealt tundus täitsa ilus olevat.',
    name: 'Jaagup, Pärnust',
    stars: 4
  }
];