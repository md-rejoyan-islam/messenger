import icon from "../assets/messenger.png";
import { Helmet } from "react-helmet-async";

export default function Requeted() {
  return (
    <>
      <Helmet>
        <title>Requested</title>
        {/* <link rel="canonical" href={icon} /> */}
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <div>Requested</div>
    </>
  );
}
