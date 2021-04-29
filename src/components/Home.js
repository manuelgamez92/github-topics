import React, { useState, useEffect,Fragment } from "react";
import { getFromGithubApi } from "../adapters/github-rest-api/index";
import Topic from "./Topic";
import { getTopicInfo } from "../adapters/github-graphql-api/index";
import Title from './Title';

const Home = () => {
  const [topics, updateTopics] = useState([]);

  const [flag, setFlag] = useState("");
  const setTopicInfo = (name) => {
    getTopicInfo(name).then((result) => {
      console.log(result.data);
    });
  };
  const changeFlag = (name) => {
    setFlag(name);
  };
  useEffect(() => {
    async function fetchData() {
      await getFromGithubApi(process.env.REACT_APP_API_URL).then((resp) => {
        const allTopics = resp.data.items;
        updateTopics(allTopics);
      });
    }
    fetchData();
  }, []);

  return (
    <Fragment>
     <Title children={'Github Topics List related with the term react '} />
      {topics.map((item, index) => {
        return (
          <div key={index} onClick={()=>setTopicInfo(item.name)}>
            <Topic
              key={index}
              topic={item}
              id={index}
              changeFlag={changeFlag}
              flag={flag}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default Home;
