import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "./Button";
BackButton.propTypes = {
  onClick: PropTypes.func,
};
function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
