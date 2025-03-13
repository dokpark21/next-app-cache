import PostForm from '@/components/post-form';
import { createPost } from '@/actions/posts';

export default function NewPostPage() {
  // 이제 더 이상 server action 함수를 해당 page에서 정의하지 않기 때문에 다시 PostForm을 불러올 수 있다.
  return <PostForm onSubmit={createPost} />;
}
