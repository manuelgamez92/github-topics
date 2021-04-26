import React from 'react';
import { render,cleanup } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import "jest-dom/extend-expect";
import Topic from "./Topic";
import {gql} from '@apollo/client';

afterEach(cleanup);

const mocks = [
    { 
        request: {
            query: gql`
            query {
              topic(name:"react") {
                id
                name
                stargazerCount
                relatedTopics {
                  name
                }
                stargazers{
                    totalCount
                }
              }
            }
          `,
        }
    }
]

it("renders component", async() =>{
    render(
        <MockedProvider>
            <Topic/>
        </MockedProvider>
    );
})