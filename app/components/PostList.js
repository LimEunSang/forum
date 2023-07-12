import PostItem from "./PostItem";

const PostList = ({ postList, user }) => {
  return (
    <div className="postList">
      {postList.map((object, key) => (
        <PostItem object={object} key={key} user={user} />
      ))}
    </div>
  );
};

export default PostList;
