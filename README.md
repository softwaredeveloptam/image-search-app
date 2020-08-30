# Zehitomo Take Home Project

Files needed to run the project
`.env.local`
```
REACT_APP_UNSPLASH_ACCESS_KEY
REACT_APP_UNSPLASH_SECRET_KEY
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**Do you have any strong rationale for why you chose specific development technologies for this project that you would like to share with the team?**

- React and Redux go well together in terms of handling state and reactive components. For me, being able to handle global state and being able to make quick additions to it makes it robust and easy to configure. 

**Do you have any strong rationale for why you chose specific design decisions (software architecture design) over alternatives?**

- I really wanted to create a global state with Redux so that Favorite Photos are saved properly with their lists.
When I create a backend later for this, I would like for it have state management with authentication.

**Do you have any strong rationale for why you made specific implementation decisions over alternatives?**

- At first when I created the project, I wanted to have props passed from top to bottom and global state for the favorited items. I wanted to go with a features/components style so that it's easier to read from a React point of view.

**What else would you like to improve if you have more time? This can be in simple format like a TODO bullet points**

- I would like to add more styling to the entire project. Connecting the components is nice and necessary but I really
want to make sure it looks good and user friendly for others.
- Error Handling
- Code Splitting
- Adding Tests
- Accessibility and Browser Compatibility

**If you feel like there are things you'd like to implement and/or fix, feel free to add a TODO section in your documentation**

- Would love to create a quick backend for this project. MongoDB would be a nice choice for quick prototyping.
- I would like to have added Twitter OAuth as well so it's easier for people to add the pictures in and send
their pictures out to twitter as well.
