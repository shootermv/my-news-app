## my-news-app

A cross platform (iOS and Android) React Native news app  
![App In Action](./appInAction.gif)

# About This Project

This project purpose was a tech assignment for one of companies i applyed to

# Requirements

![Image of Requirements](./requirements.PNG)

# Tech Stack

- React-Native - because it is cool (and also it was a requirement)
- Expo - because i wanted to play with this interesting tool
- Yarn - because of popular song "forever yarn"
- [react-query](https://tanstack.com/query/v3/) - because it makes code much shorter and readable

### Installation

you need to have android studio or xcode installed on your machine

- `git clone https://github.com/shootermv/my-news-app.git`
- `yarn install`
- `(cd ios && pod install)`
- `yarn add -g expo-cli`

### How To Run

create `.env` file at root directory  
place following text at the file:

```
API_KEY=your-mediastack-key
FB_APP_KEY=your-fb-app-key
```

run the project on your device
`yarn android` or `yarn ios`

# Basic Look Of Screens

![Image of Screens](./screens.png)

### Varios Branches

1. basic - for functionality built as simple and quick as possible
2. react-query - code is shorter and accurate
3. native-base - totaly different and more beautifull UI

### More Features

- Theme Toggle
- "Favorites" can be protected by facebook login
