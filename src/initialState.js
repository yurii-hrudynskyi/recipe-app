export const initialState = [
  {
    id: 1,
    date: 1622043245000,
    img:
      "https://image.freepik.com/free-photo/delicious-lemon-pie-with-fresh-lemons-light_114579-7600.jpg",
    title: "Vegan Pie",
    descr:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque dignissim enim sit amet venenatis urna cursus eget.",
    ing: [
      { id: Math.random(), name: "Carrot", amount: 2, unit: "pcs" },
      { id: Math.random(), name: "Eggs", amount: 5, unit: "pcs" },
      { id: Math.random(), name: "Waffles", amount: 5, unit: "pcs" },
      { id: Math.random(), name: "Creme", amount: 100, unit: "gr" }
    ],
    time: "15",
    isVegan: true,
    comments: [
      {
        id: 1,
        lastAndFirstName: "Joline Adams",
        text: "This is really great",
        avatar:
          "https://image.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg"
      }
    ]
  },
  {
    id: 2,
    date: 1614353645000,
    img:
      "https://image.freepik.com/free-photo/halved-bell-pepper-mixed-vegetable-salad-green-napkin-black-concrete-backdrop_23-2148062468.jpg",
    title: "Vegan Salat",
    descr:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque dignissim enim sit amet venenatis urna cursus eget.",
    ing: [
      { id: Math.random(), name: "Carrot", amount: 2, unit: "pcs" },
      { id: Math.random(), name: "Eggs", amount: 5, unit: "pcs" },
      { id: Math.random(), name: "Waffles", amount: 5, unit: "pcs" },
      { id: Math.random(), name: "Creme", amount: 100, unit: "gr" }
    ],
    time: "40",
    isVegan: false,
    comments: []
  },
  {
    id: 3,
    date: 1610724845000,
    img:
      "https://image.freepik.com/free-photo/traditional-ukrainian-russian-borscht-red-soup-bowl-top-view_2829-11970.jpg",
    title: "Vegan Soup",
    descr:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque dignissim enim sit amet venenatis urna cursus eget.",
    ing: [
      { id: Math.random(), name: "Carrot", amount: 2, unit: "pcs" },
      { id: Math.random(), name: "Eggs", amount: 5, unit: "pcs" },
      { id: Math.random(), name: "Waffles", amount: 5, unit: "pcs" },
      { id: Math.random(), name: "Creme", amount: 100, unit: "gr" }
    ],
    time: "55",
    isVegan: true,
    comments: []
  }
];
