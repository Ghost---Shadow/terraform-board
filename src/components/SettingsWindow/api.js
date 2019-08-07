// https://stackoverflow.com/a/47177899/1217998
const getBase64 = file => new Promise(
  (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  },
);

const handleUpload = async (file, api) => {
  const base64 = await getBase64(file);
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ base64 }),
  });

  return response.status;
};


export const onAwsCredentialsChange = ({ target }) => handleUpload(target.files[0], '/api/credentials/aws');
export const onGithubCredentialsChange = ({ target }) => handleUpload(target.files[0], '/api/credentials/github');
export const onGitClone = url => console.log(url);
