export function UseJokes() {
  const jokesListLol = [
    `"All programming languages are just wrappers for assembly"`,
    `"Users are just testers in production"`,
    `"There are no bugs, only happy little accidental features"`,
    `"Testing is just doubting your code"`,
    `"If it compiles, ship it. If it doesn't, blame the intern."`,
    `"Debugging is just asking your code what the hell it thinks it's doing."`,
    `"OOP was a mistake"`,
    `"VS Code is a text editor in a browser that gaslights you into thinking it's an IDE."`,
    `"LINQ: because regular loops were too emotionally stable"`,
    `"REST is just RPC with commitment issues"`,
    `"Every API is a promise wrapped in a lie"`,
    `"Backend is 90% JSON serialization/deserialization and 10% wondering why it broke in prod"`,
    `"Any is TypeScript's safe word"`
  ];

  const getRandomJoke = () => jokesListLol[Math.floor(Math.random() * jokesListLol.length)];

  const randomJoke = getRandomJoke(); // one time call, on page render

  return { randomJoke };
}
