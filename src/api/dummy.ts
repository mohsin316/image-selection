const handleDummyApiCall = async () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Now rejecting dummy promise call");
    }, 1000);
  });
};

const handleDummyFetchRequest = async () => {
  return fetch("https://jsonplaceholder.typicode.com/postszz/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Now rejecting dummy fetch request");
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export { handleDummyApiCall, handleDummyFetchRequest };
