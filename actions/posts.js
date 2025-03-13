'use server';

import { redirect } from 'next/navigation';
import { storePost } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';
import { updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';

export async function createPost(prevData, formData) {
  // server side, useActionForm에 createPost를 넘겨주기 때문에 더 이상 formData가 첫 번째 인자가 아니다.
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!content || content.trim().length === 0) {
    errors.push('Content is required');
  }

  if (!image || image.size === 0) {
    errors.push('Image is required');
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch {
    throw new Error('Failed to upload image');
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath('/', 'layout');
  redirect('/feed');
}

export async function postLike(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/feed'); // cache page -> update page
}
