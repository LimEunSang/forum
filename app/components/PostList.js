import PostItem from "./PostItem";

const PostList = ({ result, user }) => {
  return (
    <div className="postList">
      {result.map((object, key) => (
        <PostItem object={object} key={key} user={user} />
      ))}
    </div>
  );
};

export default PostList;
