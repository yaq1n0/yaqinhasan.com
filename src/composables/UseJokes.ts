export function UseJokes() {
  const jokesListLol = [
    `"All programming languages are just elaborate coping mechanisms for not writing assembly."`,

    `"Users are just unpaid QA engineers with better creativity."`,

    `"There are no bugs, only undocumented concurrency features."`,

    `"Testing is just writing code to prove you don't trust yourself."`,

    `"If it compiles, ship it. If it doesn't, add one more generic."`,

    `"Debugging is just printf-driven therapy."`,

    `"OOP was a mistake, but now it's legacy infrastructure."`,

    `"VS Code is a Chromium instance that convinced the world it's an IDE."`,

    `"LINQ: because writing loops manually was too predictable."`,

    `"REST is just RPC pretending to be stateless."`,

    `"Every API is a contract until someone deploys on Friday."`,

    `"Backend is 90% JSON serialization and 10% asking why the dates shifted timezones."`,

    `"'any' is TypeScript's 'trust me bro'."`,

    `"Strong typing is great until you meet production data."`,

    `"There are only two hard problems in CS: cache invalidation, naming things, and off-by-one errors."`,

    `"Microservices: because debugging one process was too easy."`,

    `"Docker works on my machine. That's the problem."`,

    `"The cloud is just someone else's Linux box with a monthly subscription."`,

    `"Async/await: turning race conditions into poetry."`,

    `"Premature optimization is the root of all evil, but so is not benchmarking."`,

    `"Regex is write-only code."`,

    `"CI/CD stands for 'Commit Immediately, Cry During deploy'."`,

    `"Git isn't version control, it's a distributed blame assignment system."`,

    `"Memory leaks are just objects achieving immortality."`,

    `"Undefined is a feature. Null is a lifestyle choice."`,

    `"TypeScript errors aren't bugs — they're future-you saying 'I warned you'."`,

    `"In theory, there's no difference between theory and practice. In practice, there's Kubernetes."`
  ];

  const getRandomJoke = () => jokesListLol[Math.floor(Math.random() * jokesListLol.length)];

  const randomJoke = getRandomJoke(); // one time call, on page render

  return { randomJoke };
}
