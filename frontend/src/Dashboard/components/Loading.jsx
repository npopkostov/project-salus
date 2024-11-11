import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = ({ textColor }) => {
  return (
    <div>
      <FontAwesomeIcon className={`h-10 animate-spin text-${textColor}`} icon={faSpinner} />
    </div>
  );
};

export default Loading;
