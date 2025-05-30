import { Addtweet } from "../../molecules/layouts/Addtweet";
import { TweetsList } from "../../molecules/layouts/TweetsList";
import { Baselayout } from "../../molecules/layouts/Baselayout";

export const HomeTweets = () => {
  return (
    <Baselayout>
      <Addtweet />
      <TweetsList />
    </Baselayout>
  );
};
