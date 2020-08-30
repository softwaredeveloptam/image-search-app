# Zehitomo Take Home Project

Files needed to run the project:

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

---

## QnA for the Take Home Project

**Do you have any strong rationale for why you chose specific development technologies for this project that you would like to share with the team?**

- React and Redux go well together in terms of handling state and reactive components. For me, being able to handle global state and being able to make quick additions to the app makes it robust and easy to configure for future features. It's a very popular framework with a great ecosystem for finding out ways to add features. 

**Do you have any strong rationale for why you chose specific design decisions (software architecture design) over alternatives?**

- I like to sort out the way my files are located so that I can come back at a later time and find out what I did quickly. I hope this translates well for others who are reading my applications as well. I had a features section where
all the particular files for a feature can co-exist together. I also have a utils folder for anything that appears more than once at many different areas of the app. 

**Do you have any strong rationale for why you made specific implementation decisions over alternatives?**

- Some of the other alternatives like Angular and Vue exist, I'm not very good at Angular at all. Vue is nice as well with a great ecosystem. I prefer React over Vue due to it being similar to writing vanilla JavaScript. JSX is easy to understand and it's nice to see familarity. Vue is powerful but the structure of the apps are very different. Every page is styled within it's component and I feel like that might hinder someone who is deep in UI/UX design when they want to make overall changes to the app rather than specific components.

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
