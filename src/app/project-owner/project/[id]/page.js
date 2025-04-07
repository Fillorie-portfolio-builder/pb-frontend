import PostProject from "../page";


export default function EditProjectPage({ params }) {
  const { id } = params;

  return <PostProject id={id} />;
}