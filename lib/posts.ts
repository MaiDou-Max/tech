import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostMetadata = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
};

export function getSortedPostsData(): PostMetadata[] {
  // 获取posts目录下的所有文件名
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => !fileName.endsWith('.draft'))
    .map(fileName => {
      // 移除文件名中的".mdx"以获取id
      const id = fileName.replace(/\.md$/, '');

      // 读取markdown文件作为字符串
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 使用gray-matter解析文章的元数据
      const matterResult = matter(fileContents);

      // 合并数据与id
      return {
        id,
        ...(matterResult.data as Omit<PostMetadata, 'id'>),
      };
    });

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => !fileName.endsWith('.draft'))
    .map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 使用gray-matter解析文章的元数据
  const matterResult = matter(fileContents);

  // 合并数据与id和内容
  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as Omit<PostMetadata, 'id'>),
  };
}

export function getAllCategories() {
  const posts = getSortedPostsData();
  return Array.from(new Set(posts.map(post => post.category)));
}

export function getAllTags() {
  const posts = getSortedPostsData();
  return Array.from(new Set(posts.map(post => post.tags).flat()));
}
