# Shopify Image Repo

## Summary

This project was created for Shopify's <a href="https://jobs.smartrecruiters.com/ni/Shopify/1529b84e-da5f-49d4-b408-09f0050732be-backend-developer-intern-remote-summer-2021">Backend Developer Internship Summer 2021. </a>

![](images/shopify_giphy.gif)

## <a name="features"></a>Features

<b>The following features were implemented:</b>

- SEARCH function(from text)
- ADD image(s) to the repository(image by image)

## <a name="installation"></a>Setup/Installation

<b>Obtain the following APIs:</b>

- [Unsplash] (https://unsplash.com/developers)
- [Cloudinary](https://cloudinary.com/documentation/admin_api)

<b>Clone repository:</b>

```
$ git clone https://github.com/sshantel/shopify-image-repo
```

<b>Store API Keys:</b>

- Replace <i>process.env.REACT_APP_API_KEY</i> in the Cloudinary.js file with Cloudinary API keys, or store them in your .env. Do the same for the Unsplash API, located in searchPhotos.js

<b>Run App:</b>

```
$ cd shopify-image-repo
$ npm install
$ npm start
```

Open [http://localhost:3000/](http://localhost:3000/) and boom, you're in!
