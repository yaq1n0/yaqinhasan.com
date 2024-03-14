# Welcome to the source code of yaqinhasan.com

This is the current repository for the source code for yaqinhasan.com. 
The previous repository containing abandoned approaches and alpha versions has been made private and deprecated to avoid confusion. 

# CSS Tree
Most sites have one gigantic `styles.css` file, I didn't want to do this because, while this does improve site performance by reducing HTTP GET requests, this makes the development process much more tedious. 

Having the css split into global and page files means that you can change the css for global components (found on one or more pages) and page components (found in a certain html page) separately. 

Additionally, having separate files means that each file is actually manageable and reduces the amount of code repetition, incentivizing shorter class names, increased used of polymorphism and code modularity. 

Lastly, once the site is done (or in a release stable state), there is a chance of me integrating some pre-deployment processing, using CS and JavaScript aggregators to make a single `styles.css` and `main.js` for deployment. 

### The rest of this readme file is just notes for where I can get the resources used in the site. 
- The .svg Icons of other companies are from https://icons.getbootstrap.com, this is mainly used for the contact box in contact.html and index.html. 

- The favicon was made with a favicon generator using an svg generated from https://danmarshall.github.io/google-font-to-svg-path/

- The font used globally is JetBrains Mono, obtainable from https://www.jetbrains.com/lp/mono/ or through google's font API https://fonts.google.com/specimen/JetBrains+Mono

