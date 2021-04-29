import { useState } from "react";
import { getTopicInfo } from "../adapters/github-graphql-api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faStar } from "@fortawesome/free-solid-svg-icons";

const Topic = ({ topic, flag, changeFlag }) => {
  const [info, setInfo] = useState({});

  const selectTopic = (name) => {
    const getInfoFromTopic = getTopicInfo(name).then((result) => {
      setInfo(result.data);
      changeFlag(topic.name);
    });
  };

  return (
    <div
      id="flex-row"
      data-testid="flex-row"
      onClick={() => selectTopic(topic.name)}
    >
      <div>
        <p id="topic-name">{topic.name}</p>
      </div>
      <div>
        {flag !== topic.name ? (
          <FontAwesomeIcon
            className="caret-down-icon"
            icon={faCaretDown}
            size="lg"
          />
        ) : null}
        {info.topic && flag === topic.name ? (
          <div id="stars">
            <span className="padding-right-10">
              <FontAwesomeIcon className="star-icon" icon={faStar} />
            </span>
            <span id="stargaze-count">{info.topic.stargazerCount}</span>
          </div>
        ) : null}

        <ul>
          {info.topic && info.topic.relatedTopics && flag === topic.name
            ? info.topic.relatedTopics.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })
            : null}
        </ul>
        {info.topic &&
        info.topic.relatedTopics.length <= 0 &&
        flag === topic.name ? (
          <p className="not-topics-found">No related topic</p>
        ) : null}
      </div>
    </div>
  );
};

export default Topic;
