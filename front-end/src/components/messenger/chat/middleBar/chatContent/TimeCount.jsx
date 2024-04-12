import moment from "moment";
import PropTypes from "prop-types";

export default function TimeCount({ time }) {
  return (
    <p className="text-[10px] text-zinc-500 text-center">
      {moment(time).startOf("").fromNow()}
    </p>
  );
}

TimeCount.propTypes = {
  time: PropTypes.string.isRequired,
};
