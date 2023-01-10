const axios = require('axios');

export const getUltimos = async () => {
  const res = await axios.get("http://localhost:8080/ultimos");
  console.log(res.data)

  return res.data.ultimos;

}