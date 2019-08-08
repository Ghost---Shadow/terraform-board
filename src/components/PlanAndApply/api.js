const readStream = async (url, onData, onEnd) => {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const processText = ({ done, value }) => {
    const utf8 = String.fromCharCode.apply(null, value);
    if (done) {
      // console.log('Stream complete');
      onEnd();
      return null;
    }
    // console.log(utf8);
    onData(utf8);

    return reader.read().then(processText);
  };

  return reader.read().then(processText);
};

export const getTerraformInit = (onData, onEnd) => readStream('/api/terraform/init', onData, onEnd);
export const getTerraformPlan = (onData, onEnd) => readStream('/api/terraform/plan', onData, onEnd);
export const getTerraformApply = (onData, onEnd) => readStream('/api/terraform/apply', onData, onEnd);
