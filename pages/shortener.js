import React, { useState } from "react";

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function generateSlug() {
  let slug = "";
  // Values allowed in the slug generation
  const alphanumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const slugLength = 7;
  for (let i = 0; i < slugLength; i++) {
    const randomIndex = getRandom(0, alphanumeric.length - 1);
    slug += alphanumeric[randomIndex];
  }

  // This is where I would check if slug is registered in database
  // If slug already registered, re-run function to get new slug

  return slug;
}

function createShortLink(destination) {
  // Assuming user cannot create own slug
  let slug = generateSlug();
  const shortLink = { slug, destination };
  return shortLink;
}

function checkValidUrl(url) {
  const expression = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  const regex = new RegExp(expression);
  return url.match(regex);
}

const ShortenerPage = () => {
  const [initialUrl, setInitialUrl] = useState("");
  const [shortLink, setShortLink] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlIsValid = initialUrl.length > 0 && checkValidUrl(initialUrl);
    if (urlIsValid) {
      setIsError(false);
      const shortLink = createShortLink(initialUrl);
      setShortLink(shortLink);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-6">
      <h3 className="text-3xl">URL Shortener</h3>
      <p>
        Given any URL, shorten it and return a globally unique URL back to the
        user. Make sure to call out any assumptions and / or limitations in your
        solution.
      </p>
      <h4 className="mt-8 text-2xl">Assumptions/Limitations</h4>
      <ul className="list-disc">
        <li>
          Assumes generated slug is checked if it has been registered in
          database
        </li>
        <li>User can not enter own slug</li>
      </ul>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="text"
            value={initialUrl}
            onChange={(e) => setInitialUrl(e.target.value)}
            placeholder="Enter URL to be shortened"
          />
          {isError && (
            <div className="mt-4" style={{ color: "red" }}>
              URL is not valid
            </div>
          )}
          <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Shorten
          </button>
        </form>

        <h4 className="mt-6 text-2xl">Shortened Link</h4>
        {shortLink ? (
          <div className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
            <p>Destination: {shortLink.destination}</p>

            <p>
              Short Link:
              <a className="ml-2" href={shortLink.destination} target="_blank">
                mark.ly/{shortLink.slug}
              </a>
            </p>
          </div>
        ) : (
          <p>Enter a url to shorten</p>
        )}
      </div>
    </div>
  );
};

export default ShortenerPage;
