import axios from "axios";

const sendSMS = async (mobile, message) => {
  const url = `http://url=${mobile}&message=${message}`; // sms provider url
  // await axios.get(url);
  console.log("message sent to " + mobile);
};

export default sendSMS;
