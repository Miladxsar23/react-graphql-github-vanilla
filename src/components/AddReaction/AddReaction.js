import React, { useState } from "react";
const REACTION_CONTENTS = [
  "THUMBS_UP",
  "THUMBS_DOWN",
  "LAUGH",
  "HOORAY",
  "CONFUSED",
  "HEART",
  "ROCKET",
  "EYES",
];
const AddReaction = ({ issueId, onAddReaction, viewerCanReact }) => {
  const [reaction, setReaction] = useState("LAUGH");
  const options = REACTION_CONTENTS.map((content) => {
    return (
      <option value={content} key={issueId + content}>
        {content}
      </option>
    );
  });
  return (
    <select
      value={reaction}
      className="form-select bg-light"
      onChange={(evt) => {
        const value = evt.target.value;
        if (viewerCanReact) {
          setReaction(value);
          onAddReaction(issueId, value);
        }else {
            console.log("this issue has read only now")
        }
      }}
    >
      {options}
    </select>
  );
};

export default AddReaction;
