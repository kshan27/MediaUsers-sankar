
## Goals

- Create a page to show list of users in tabular format.
- User object contains 'name','location', 'hobby' and 'createdAt' fields.
- Connect to backend API to fetch users
- Implement Delete user and Update user location functionality.
- Use Redux for state management
- Use Material UI
- Create Toolbar to show the number of users per location. The content should be updated dynamically.

## API
- Use https://mockapi.io to generate User data.
- Example Users List : https://66644301932baf9032aa8617.mockapi.io/api/users
- User object 
```
{
createdAt: "2024-06-07T23:50:42.069Z",
name: "Marie Witting",
avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/141.jpg",
hobby: "Grocery",
location: "BENGALURU",
id: "11"
}
```
- Use HTTP DELETE method to delete user, refer doc https://github.com/mockapi-io/docs/wiki/Quick-start-guide 
- Use PUT method to update user location


## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
